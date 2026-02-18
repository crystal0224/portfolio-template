# Portfolio Template Conversion — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Crystal의 포트폴리오를 누구나 자기 PDF/CSV 이력서로 자동 생성할 수 있는 GitHub Template Repo로 변환

**Architecture:** Firebase·Admin을 완전 제거하고, 모든 데이터를 `src/config.ts` 하나에서 읽는 정적 SPA로 단순화한다. Python 변환기(claude CLI subprocess)가 PDF/CSV를 받아 config.ts를 자동 생성하며, 섹션 on/off는 `sections` 플래그 하나로 제어된다.

**Tech Stack:** React 18, Vite 6, TypeScript, Tailwind CSS v4, Python 3.10+, pdfplumber, pandas, claude CLI

**병렬 실행 지도:**
```
[Task 1: 파일 삭제]  ──────────┐
                                ├──▶ [Task 3: config.ts 생성] ──▶ [Task 4: 컴포넌트 연결] ──▶ [Task 5: 섹션 on/off] ──▶ [Task 6: README]
[Task 2: 변환기 작성] ─────────┘
```
Task 1 + Task 2 는 동시에 실행 가능.

---

## Task 1: Firebase·Admin 파일 삭제 및 package.json 정리

**담당:** 에이전트 A

**Files:**
- Delete: `src/app/lib/firebase.ts`
- Delete: `src/app/hooks/useFirestore.ts`
- Delete: `src/app/hooks/useCareerDragDrop.ts`
- Delete: `src/app/contexts/AdminContext.tsx`
- Delete: `src/app/contexts/CareerDataContext.tsx`
- Delete: `src/app/components/AdminLoginModal.tsx`
- Delete: `src/app/components/EditProjectModal.tsx`
- Delete: `src/app/components/SyncProjectsModal.tsx`
- Delete: `src/app/components/career/BaseCareerEditModal.tsx`
- Delete: `src/app/components/career/AddItemButton.tsx`
- Delete: `src/app/pages/MigratePage.tsx`
- Modify: `package.json`

**Step 1: 파일 삭제**
```bash
cd "Portfolio platform creation/.worktrees/template"
rm src/app/lib/firebase.ts
rm src/app/hooks/useFirestore.ts
rm src/app/hooks/useCareerDragDrop.ts
rm src/app/contexts/AdminContext.tsx
rm src/app/contexts/CareerDataContext.tsx
rm src/app/components/AdminLoginModal.tsx
rm src/app/components/EditProjectModal.tsx
rm src/app/components/SyncProjectsModal.tsx
rm src/app/components/career/BaseCareerEditModal.tsx
rm src/app/components/career/AddItemButton.tsx
rm src/app/pages/MigratePage.tsx
```

**Step 2: package.json에서 firebase 제거**

`package.json`의 `dependencies`에서 `"firebase"` 항목 삭제.

```bash
npm uninstall firebase
```

**Step 3: 빌드 오류 확인 (오류 있어야 정상)**
```bash
npm run build 2>&1 | head -30
```
Expected: TypeScript 오류 다수 — 삭제된 모듈 import 에러. 이후 Task 3~5에서 해결됨.

**Step 4: 커밋**
```bash
git add -A
git commit -m "chore: remove Firebase, Admin, and CRUD infrastructure"
```

---

## Task 2: Python 변환기 작성

**담당:** 에이전트 B (Task 1과 병렬 실행)

**Files:**
- Create: `converter/convert_resume.py`
- Create: `converter/requirements.txt`
- Create: `converter/sample_output/config.ts` (변환 결과 예시)

**Step 1: requirements.txt 생성**

```
pdfplumber==0.11.4
pandas==2.2.3
openpyxl==3.1.2
```

**Step 2: convert_resume.py 작성**

```python
#!/usr/bin/env python3
"""
포트폴리오 config.ts 자동 생성기
사용법:
  python converter/convert_resume.py --pdf 이력서.pdf
  python converter/convert_resume.py --csv 데이터.csv
요구사항: Claude Code가 설치·로그인된 환경에서 실행
"""

import argparse
import json
import subprocess
import sys
import textwrap
from pathlib import Path

import pdfplumber
import pandas as pd


CONFIG_TS_TEMPLATE = '''// ============================================================
// config.ts — 포트폴리오 설정 파일
// 이 파일은 convert_resume.py가 자동 생성했습니다.
// 수정이 필요하면 직접 편집하거나 변환기를 다시 실행하세요.
// ============================================================

// ============================================================
// 👤 기본 정보
// ============================================================
export const profile = {profile_json};

// ============================================================
// 📁 프로젝트 목록
// ============================================================
export const projects = {projects_json};

// ============================================================
// 📋 섹션 on/off 설정
// false로 바꾸면 해당 섹션이 페이지에서 사라집니다.
// ============================================================
export const sections = {sections_json};

// ============================================================
// 💼 Career 데이터
// ============================================================
export const careerData = {career_json};
'''


EXTRACT_PROMPT = """다음은 이력서 내용입니다. 아래 JSON 스키마에 맞게 정보를 추출해주세요.
비어있는 항목은 빈 문자열("") 또는 빈 배열([])로 채워주세요.
반드시 유효한 JSON만 반환하세요. 설명이나 마크다운 없이 JSON만.

스키마:
{
  "profile": {
    "name": "이름",
    "title": "직함/직무",
    "email": "이메일",
    "github": "GitHub URL (없으면 빈 문자열)",
    "linkedin": "LinkedIn URL (없으면 빈 문자열)",
    "heroDescription": "자기소개 2-3문장"
  },
  "projects": [
    {
      "id": "1",
      "title": "프로젝트명",
      "description": "설명",
      "domain": "ai-tools",
      "tags": ["태그1", "태그2"],
      "link": "URL (없으면 빈 문자열)",
      "protected": false
    }
  ],
  "careerData": {
    "experience": [
      {
        "company": "회사명",
        "title": "직함",
        "description": "업무 설명",
        "location": "근무지",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM 또는 null (현재 재직 중)",
        "highlights": ["주요 성과1", "주요 성과2"]
      }
    ],
    "education": [
      {
        "school": "학교명",
        "degree": "학위",
        "field": "전공",
        "startYear": 2018,
        "endYear": 2022,
        "notes": "비고 (없으면 빈 문자열)"
      }
    ],
    "certifications": [
      {
        "name": "자격증명",
        "authority": "발급기관",
        "date": "YYYY-MM",
        "url": "URL (없으면 빈 문자열)"
      }
    ],
    "publications": [],
    "awards": [
      {
        "title": "수상명",
        "organization": "수여기관",
        "date": "YYYY-MM",
        "description": "설명 (없으면 빈 문자열)"
      }
    ],
    "academicProjects": [],
    "teaching": [],
    "partTimeJobs": [],
    "groupActivities": [],
    "mentoring": []
  }
}

이력서 내용:
{resume_text}
"""

DEFAULT_SECTIONS = {
    "experience": True,
    "education": True,
    "certifications": True,
    "publications": False,
    "awards": True,
    "academicProjects": False,
    "teaching": False,
    "partTimeJob": False,
    "groupActivity": False,
    "mentoring": False,
}


def extract_text_from_pdf(pdf_path: str) -> str:
    """PDF에서 텍스트 추출"""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()


def extract_text_from_csv(csv_path: str) -> str:
    """CSV를 읽어 텍스트로 변환"""
    df = pd.read_csv(csv_path)
    return df.to_string(index=False)


def call_claude(prompt: str) -> str:
    """claude CLI subprocess 호출"""
    result = subprocess.run(
        ["claude", "-p", prompt],
        capture_output=True,
        text=True,
        timeout=120,
    )
    if result.returncode != 0:
        print(f"Claude CLI 오류:\n{result.stderr}", file=sys.stderr)
        sys.exit(1)
    return result.stdout.strip()


def parse_json_from_claude(response: str) -> dict:
    """Claude 응답에서 JSON 파싱"""
    # JSON 블록이 있으면 추출
    if "```json" in response:
        start = response.index("```json") + 7
        end = response.index("```", start)
        response = response[start:end].strip()
    elif "```" in response:
        start = response.index("```") + 3
        end = response.index("```", start)
        response = response[start:end].strip()
    return json.loads(response)


def generate_config_ts(data: dict, output_path: Path) -> None:
    """config.ts 생성"""
    # 섹션 활성화 여부: 데이터가 있으면 true, 없으면 false
    career = data.get("careerData", {})
    sections = {
        key: bool(career.get(key if key != "partTimeJob" else "partTimeJobs", []))
        for key in DEFAULT_SECTIONS
    }
    # 항상 true인 기본 섹션
    sections["experience"] = True
    sections["education"] = True

    def fmt(obj):
        return json.dumps(obj, ensure_ascii=False, indent=2)

    content = CONFIG_TS_TEMPLATE.format(
        profile_json=fmt(data.get("profile", {})),
        projects_json=fmt(data.get("projects", [])),
        sections_json=fmt(sections),
        career_json=fmt(career),
    )

    output_path.write_text(content, encoding="utf-8")
    print(f"✅ config.ts 생성 완료: {output_path}")


def main():
    parser = argparse.ArgumentParser(
        description="이력서 PDF/CSV → config.ts 변환기"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--pdf", help="PDF 이력서 경로")
    group.add_argument("--csv", help="CSV 파일 경로")
    parser.add_argument(
        "--output",
        default="src/config.ts",
        help="출력 파일 경로 (기본값: src/config.ts)",
    )
    args = parser.parse_args()

    # 텍스트 추출
    if args.pdf:
        print(f"📄 PDF 읽는 중: {args.pdf}")
        resume_text = extract_text_from_pdf(args.pdf)
    else:
        print(f"📊 CSV 읽는 중: {args.csv}")
        resume_text = extract_text_from_csv(args.csv)

    if not resume_text.strip():
        print("❌ 파일에서 텍스트를 추출할 수 없습니다.", file=sys.stderr)
        sys.exit(1)

    # Claude로 구조화
    print("🤖 Claude가 이력서를 분석 중... (30초~1분 소요)")
    prompt = EXTRACT_PROMPT.format(resume_text=resume_text[:8000])  # 토큰 제한
    response = call_claude(prompt)

    # JSON 파싱
    try:
        data = parse_json_from_claude(response)
    except json.JSONDecodeError as e:
        print(f"❌ JSON 파싱 실패: {e}", file=sys.stderr)
        print("Claude 응답:", response[:500], file=sys.stderr)
        sys.exit(1)

    # config.ts 생성
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    generate_config_ts(data, output_path)

    print()
    print("🎉 완료! 다음 단계:")
    print("  1. src/config.ts 열어서 내용 확인·수정")
    print("  2. npm run dev 로 미리보기")
    print("  3. GitHub Pages 배포")


if __name__ == "__main__":
    main()
```

**Step 3: 동작 테스트 (Claude CLI 있는 환경)**
```bash
cd "Portfolio platform creation/.worktrees/template"
pip install -r converter/requirements.txt
# 테스트: 실제 PDF로 실행
python converter/convert_resume.py --pdf docs/sample_resume.pdf
```
Expected: `src/config.ts` 생성됨

**Step 4: 커밋**
```bash
git add converter/
git commit -m "feat: add PDF/CSV to config.ts converter using claude CLI"
```

---

## Task 3: src/config.ts 샘플 파일 생성

**담당:** Task 1 완료 후 에이전트 A (또는 메인)

**Files:**
- Create: `src/config.ts`
- Delete: `src/app/data/portfolioData.ts`
- Delete: `src/app/data/detailedCareerData.ts` (타입만 config.ts로 이전)

**Step 1: src/config.ts 작성**

```typescript
// ============================================================
// config.ts — 포트폴리오 설정 파일
// 이 파일만 수정하면 포트폴리오가 업데이트됩니다.
// convert_resume.py를 실행하면 자동으로 채워집니다.
// ============================================================

// ============================================================
// 👤 기본 정보 — 여기를 내 정보로 바꾸세요
// ============================================================
export const profile = {
  name: "홍길동",                       // 이름
  title: "데이터 분석가",               // 직함
  email: "hong@example.com",            // 이메일
  github: "https://github.com/your-id", // GitHub 주소
  linkedin: "https://linkedin.com/in/your-id", // LinkedIn 주소
  heroDescription: "안녕하세요! 데이터와 사람을 연결하는 분석가입니다.", // 자기소개
};

// ============================================================
// 📁 프로젝트 목록
// ============================================================
export interface Project {
  id: string;
  title: string;
  description: string;
  domain: string;       // 필터 카테고리 (예: "AI", "분석", "교육")
  tags: string[];
  link: string;         // 프로젝트 링크
  protected: boolean;   // true면 링크 클릭 시 비밀번호 요청
  image?: string;       // 썸네일 이미지 URL (없으면 기본 이미지)
  date?: string;        // 날짜 (예: "2024.09")
  problemStatement?: string;
  technicalDetails?: string[];
  impact?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "예시 프로젝트",
    description: "프로젝트 설명을 입력하세요.",
    domain: "AI",
    tags: ["Python", "Claude"],
    link: "https://example.com",
    protected: false,
    date: "2025.01",
  },
];

// ============================================================
// 📋 섹션 on/off 설정
// false로 바꾸면 해당 섹션이 Career 페이지에서 사라집니다.
// ============================================================
export const sections = {
  experience: true,       // 경력
  education: true,        // 교육
  certifications: true,   // 자격증
  publications: false,    // 출판/논문
  awards: true,           // 수상
  academicProjects: false,// 학술 프로젝트
  teaching: false,        // 강의 경험
  partTimeJob: false,     // 파트타임
  groupActivity: false,   // 동아리/활동
  mentoring: false,       // 멘토링
};

// ============================================================
// 💼 Career 데이터
// sections에서 true인 항목만 페이지에 표시됩니다.
// ============================================================

export interface Position {
  company: string;
  title: string;
  description: string;
  location: string;
  startDate: string;   // "YYYY-MM" 형식
  endDate: string | null; // null이면 현재 재직 중
  highlights?: string[];
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  notes?: string;
}

export interface Certification {
  name: string;
  authority: string;
  date: string;   // "YYYY-MM"
  url?: string;
}

export interface Award {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export interface Publication {
  title: string;
  journal?: string;
  date: string;
  url?: string;
  description?: string;
}

export interface AcademicProject {
  title: string;
  institution: string;
  period: string;
  description: string;
  role?: string;
}

export interface TeachingExperience {
  course: string;
  institution: string;
  period: string;
  description?: string;
}

export interface PartTimeJob {
  company: string;
  role: string;
  period: string;
  description?: string;
}

export interface GroupActivity {
  name: string;
  role: string;
  period: string;
  description?: string;
}

export interface MentoringExperience {
  title: string;
  organization: string;
  period: string;
  description?: string;
}

export const careerData = {
  experience: [
    {
      company: "예시 회사",
      title: "시니어 분석가",
      description: "데이터 분석 및 리포트 작성",
      location: "서울",
      startDate: "2022-03",
      endDate: null,
      highlights: ["주요 성과 1", "주요 성과 2"],
    },
  ] as Position[],

  education: [
    {
      school: "예시 대학교",
      degree: "석사",
      field: "경영학",
      startYear: 2020,
      endYear: 2022,
    },
  ] as Education[],

  certifications: [] as Certification[],
  publications: [] as Publication[],
  awards: [] as Award[],
  academicProjects: [] as AcademicProject[],
  teaching: [] as TeachingExperience[],
  partTimeJobs: [] as PartTimeJob[],
  groupActivities: [] as GroupActivity[],
  mentoring: [] as MentoringExperience[],
};
```

**Step 2: 기존 data 파일 삭제**
```bash
rm src/app/data/portfolioData.ts
rm src/app/data/detailedCareerData.ts
```

**Step 3: 커밋**
```bash
git add src/config.ts
git rm src/app/data/portfolioData.ts src/app/data/detailedCareerData.ts
git commit -m "feat: add config.ts with types and sample data"
```

---

## Task 4: App.tsx 및 컴포넌트 config 연결

**담당:** Task 3 완료 후

**Files:**
- Modify: `src/app/App.tsx`
- Modify: `src/app/components/HeroSection.tsx`
- Modify: `src/app/components/PortfolioCard.tsx`
- Modify: `src/app/components/FilterBar.tsx`

**Step 1: App.tsx 전면 교체**

Firebase 없이 config에서 직접 데이터 읽는 단순 버전:

```tsx
import { useState, useMemo } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { HeroSection } from "./components/HeroSection";
import { FilterBar } from "./components/FilterBar";
import { PortfolioCard } from "./components/PortfolioCard";
import { CareerPage } from "./pages/CareerPage";
import { ArrowRight } from "lucide-react";
import { projects, sections } from "../config";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<"home" | "career">(() => {
    const hash = window.location.hash.slice(1);
    return hash === "career" ? "career" : "home";
  });
  const [activeDomain, setActiveDomain] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Hash 기반 라우팅
  useState(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash === "career" ? "career" : "home");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  });

  const filteredItems = useMemo(() => {
    return projects.filter((item) => {
      const matchesDomain = activeDomain === "all" || item.domain === activeDomain;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDomain && matchesSearch;
    });
  }, [activeDomain, searchQuery]);

  if (currentPage === "career") return <CareerPage />;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showNavLinks={false} />
      <HeroSection />

      <section id="tech-projects" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          </div>
          <FilterBar
            activeDomain={activeDomain}
            onDomainChange={setActiveDomain}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <div className="mt-8">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {filteredItems.map((item, index) => (
                  <PortfolioCard key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {sections.experience || sections.education ? (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">전체 경력 보기</h2>
            <a
              href="#career"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <span>상세 경력 보기</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      ) : null}

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-xs">
            Last Updated: {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
```

**Step 2: HeroSection.tsx — profile config 연결**

`import { profile } from "../../config";` 추가 후 하드코딩된 이름·소개글·링크를 `profile.xxx`로 교체.

**Step 3: PortfolioCard.tsx — Admin/EditModal 제거**

- `import { useAdmin }` 삭제
- `import { EditProjectModal }` 삭제
- `onEdit`, `onDelete` prop 삭제
- 편집 버튼 UI 삭제
- `PortfolioItem` 타입은 `config.ts`의 `Project`로 교체

**Step 4: 빌드 확인**
```bash
npm run build
```
Expected: ✓ built in X.XXs (오류 없음)

**Step 5: 커밋**
```bash
git add -A
git commit -m "feat: wire components to config.ts, remove Admin/Firebase dependencies"
```

---

## Task 5: Career 섹션 컴포넌트 단순화

**담당:** Task 4 완료 후

**Files:**
- Modify: `src/app/pages/CareerPage.tsx`
- Modify: `src/app/components/ExperienceSection.tsx`
- Modify: `src/app/components/EducationSection.tsx`
- Modify: `src/app/components/CertificationsSection.tsx`
- Modify: `src/app/components/AwardsSection.tsx`
- Modify: `src/app/components/PublicationsSection.tsx`
- Modify: `src/app/components/AcademicProjectsSection.tsx`
- Modify: `src/app/components/TeachingSection.tsx`
- Modify: `src/app/components/PartTimeJobSection.tsx`
- Modify: `src/app/components/GroupActivitySection.tsx`
- Modify: `src/app/components/MentoringSection.tsx`

**각 섹션 컴포넌트의 변환 패턴 (ExperienceSection 예시):**

BEFORE:
```tsx
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { DndContext } from "@dnd-kit/core";
// ...
const { positions } = useCareerData();
const { isAdmin } = useAdmin();
```

AFTER:
```tsx
import { careerData } from "../../config";
// ...
const positions = careerData.experience;
// DndContext, isAdmin, edit modal 관련 코드 전부 제거
```

**CareerPage.tsx — 섹션 on/off 적용:**

```tsx
import { sections } from "../../config";
// ...
{sections.experience && <ExperienceSection />}
{sections.education && <EducationSection />}
{sections.certifications && <CertificationsSection />}
{sections.publications && <PublicationsSection />}
{sections.awards && <AwardsSection />}
{sections.academicProjects && <AcademicProjectsSection />}
{sections.teaching && <TeachingSection />}
{sections.partTimeJob && <PartTimeJobSection />}
{sections.groupActivity && <GroupActivitySection />}
{sections.mentoring && <MentoringSection />}
```

**Step 1: 각 섹션 컴포넌트에서 useCareerData, useAdmin, DndContext, 편집 모달 제거, config에서 직접 읽기로 교체**

**Step 2: CareerPage.tsx에 섹션 on/off 조건부 렌더링 적용**

**Step 3: 빌드 확인**
```bash
npm run build
```
Expected: ✓ built (오류 없음)

**Step 4: 커밋**
```bash
git add -A
git commit -m "feat: simplify career sections - remove Firebase CRUD, wire to config"
```

---

## Task 6: README 작성 및 GitHub Template 설정

**담당:** Task 5 완료 후

**Files:**
- Modify: `README.md`
- Modify: `vite.config.ts` (base 경로 안내)
- Create: `public/profile.png` (placeholder 이미지)

**Step 1: README.md 작성**

```markdown
# 포트폴리오 템플릿

> 이력서 PDF 또는 CSV 파일 하나로 나만의 포트폴리오 사이트를 만들어보세요.

## 🚀 시작하기 (5단계)

### 1단계: 이 템플릿으로 내 레포 만들기
이 페이지 우측 상단 **"Use this template"** → **"Create a new repository"** 클릭

### 2단계: 내 컴퓨터에 클론
```bash
git clone https://github.com/내아이디/내레포이름.git
cd 내레포이름
npm install
```

### 3단계: 변환기 실행 (이력서 → config.ts 자동 생성)
```bash
pip install -r converter/requirements.txt
python converter/convert_resume.py --pdf 내이력서.pdf
```
> **요구사항:** Claude Code가 설치·로그인된 환경에서 실행하세요.
> CSV 파일도 지원합니다: `--csv 데이터.csv`

### 4단계: 미리보기
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` 열기

### 5단계: GitHub Pages 배포
1. `vite.config.ts`에서 `base`를 내 레포 이름으로 변경
   ```ts
   base: '/내레포이름/',
   ```
2. GitHub 레포 → Settings → Pages → Source: **GitHub Actions** 선택
3. 아래 명령으로 배포:
   ```bash
   npm run deploy
   ```

---

## ✏️ 수동으로 정보 수정하기

변환기 없이 직접 수정하려면 `src/config.ts` 파일을 열어주세요.

### 기본 정보 수정
```typescript
export const profile = {
  name: "내 이름",        // ← 여기 수정
  title: "내 직함",
  email: "내@이메일.com",
  // ...
};
```

### 섹션 숨기기/보이기
```typescript
export const sections = {
  publications: false,  // ← false면 페이지에서 사라짐
  teaching: false,
  // ...
};
```

### 프로필 사진 교체
`public/profile.png` 파일을 내 사진으로 교체하세요. (권장 비율: 3:4)

---

## 📋 config.ts 필드 설명

| 필드 | 설명 | 예시 |
|---|---|---|
| `profile.name` | 이름 | `"홍길동"` |
| `profile.title` | 직함 | `"데이터 분석가"` |
| `profile.heroDescription` | 히어로 자기소개 | `"안녕하세요..."` |
| `projects[].domain` | 필터 카테고리 | `"AI"`, `"분석"`, `"교육"` |
| `projects[].protected` | 링크 잠금 여부 | `true` / `false` |
| `careerData.experience[].endDate` | 현재 재직 중 | `null` 로 입력 |

---

## ❓ FAQ

**Q. Claude Code가 없으면 변환기를 쓸 수 없나요?**
A. 네, 변환기는 Claude Code CLI가 필요합니다. Claude Code 없이 사용하려면 `src/config.ts`를 직접 수정해주세요.

**Q. 영어로도 사용할 수 있나요?**
A. 네, `config.ts`의 모든 텍스트를 영어로 입력하면 됩니다.

**Q. 프로젝트 필터 카테고리를 바꾸고 싶어요.**
A. `src/app/components/FilterBar.tsx`의 `domains` 배열을 수정하세요.
```

**Step 2: vite.config.ts base 경로 기본값을 '/'로 변경**
```ts
base: '/', // 배포 시 '/내레포이름/'으로 변경
```

**Step 3: 최종 빌드 확인**
```bash
npm run build
```
Expected: ✓ built (오류 없음)

**Step 4: 커밋**
```bash
git add -A
git commit -m "docs: add README onboarding guide and finalize template"
```

**Step 5: GitHub Template Repository 설정 안내**
GitHub 레포 → Settings → General → **"Template repository"** 체크박스 활성화
(이 단계는 Crystal이 GitHub 웹에서 직접 수행)

---

## 완료 기준

- [ ] `npm run build` 오류 없음
- [ ] `src/config.ts` 샘플 데이터로 화면 정상 렌더링
- [ ] `python converter/convert_resume.py --pdf X` 실행 시 `src/config.ts` 생성
- [ ] `sections.publications = false` 시 Career 페이지에서 해당 섹션 미표시
- [ ] Firebase 관련 import 없음 (`grep -r "firebase" src/` 결과 없음)
- [ ] README 5단계 안내 완비
