---
name: portfolio-setup
description: >
  포트폴리오 템플릿 셋업 마법사. 사용자가 /portfolio-setup을 실행하거나
  포트폴리오 설정을 요청할 때 사용. README를 읽지 않아도 단계별로 안내.
---

# Portfolio Setup 마법사

이 스킬을 실행하면 아래의 순서대로 진행합니다. **단계를 건너뛰지 마세요.**
모든 사용자 입력은 `AskUserQuestion` 도구를 사용합니다. 한 번에 하나씩만 질문합니다.

## 중요 규칙

- 질문은 **반드시 하나씩** AskUserQuestion으로 수행
- 수집한 값을 대화 메모리에 유지하면서 다음 단계로 이동
- `src/config.ts` 작성 시 Write 도구 사용 (코드만 출력하면 안 됨)
- `vite.config.ts` 수정 시 Edit 도구 사용
- 사용자에게 실행할 터미널 명령어를 텍스트로 안내 (직접 실행 X)

---

## Step 0: 환영 인사

다음 내용을 응답 메시지로 출력하세요 (어떤 도구도 사용하지 않습니다):

```
안녕하세요! 포트폴리오 셋업 마법사를 시작합니다.

이 스킬이 단계별로 질문을 하고 자동으로 config.ts를 작성해드립니다.
README를 읽지 않아도 됩니다.

시작 전 확인사항:
  1. Node.js가 설치되어 있어야 합니다.
     → 터미널에서 node --version 으로 확인하세요.
  2. 이 포트폴리오 템플릿 폴더 안에서 claude를 실행 중이어야 합니다.

준비가 되었으면 다음 질문에 답해주세요.
```

---

## Step 1: 이력서 파일 확인

AskUserQuestion으로 질문합니다:

**질문:** "이력서나 경력 정보가 담긴 파일이 있나요?"
**header:** "이력서 파일"
**options:**
- A. "있어요 (PDF 또는 CSV)" — description: "파일을 converter/ 폴더에 복사하면 자동으로 config.ts 초안을 만들어드립니다."
- B. "없어요 (직접 입력할게요)" — description: "질문에 답하면서 하나씩 입력합니다."

### Path A (파일 있음)

사용자에게 다음 안내를 출력합니다:

```
이력서 파일을 converter/ 폴더로 복사해주세요.
그 다음 아래 명령어를 터미널에서 실행하세요:

PDF인 경우:
  python converter/convert_resume.py --pdf converter/이력서파일명.pdf

CSV인 경우:
  python converter/convert_resume.py --csv converter/이력서파일명.csv

실행이 완료되면 "완료"라고 알려주세요.
(처음 실행 시 pip install -r converter/requirements.txt 가 필요할 수 있습니다.)
```

그 다음 AskUserQuestion으로 확인합니다:

**질문:** "컨버터 실행이 완료됐나요?"
**header:** "컨버터 완료"
**options:**
- "완료됐어요" — description: "config.ts가 생성되었습니다."
- "오류가 났어요" — description: "오류 메시지를 알려주세요."

오류가 난 경우: AskUserQuestion으로 오류 내용을 확인합니다:

**질문:** "어떤 오류가 발생했나요?"
**header:** "오류 내용"
**options:**
- "ModuleNotFoundError (모듈 없음)" — description: "pip install -r converter/requirements.txt 를 실행하세요."
- "FileNotFoundError (파일 없음)" — description: "파일 경로를 다시 확인하세요. converter/ 폴더 안에 있어야 합니다."
- "기타 오류" — description: "수동 입력으로 전환합니다."

"기타 오류" 선택 시:
→ **converter_used = false** 로 기억하고 Step 2 Path B로 이동합니다.

컨버터 완료 후: `Read` 도구로 `src/config.ts`를 읽어서 현재 값을 파악합니다.
→ **converter_used = true** 로 기억하고 Step 2 Path A로 이동합니다.

### Path B (파일 없음)

→ **converter_used = false** 로 기억하고 Step 2 Path B로 이동합니다.

## Step 2: 프로필 정보 수집

**converter_used = true (Path A):**

`src/config.ts`를 읽어서 아직 플레이스홀더 값인 필드를 찾습니다.
플레이스홀더 판별 기준:
- name이 "홍길동" 이면 플레이스홀더
- email이 "hong@example.com" 또는 "@example.com"을 포함하면 플레이스홀더
- github가 "your-id"를 포함하면 플레이스홀더
- linkedin이 "your-id"를 포함하면 플레이스홀더

플레이스홀더인 필드만 아래 질문 목록에서 골라서 물어봅니다.

**converter_used = false (Path B):**

아래 모든 질문을 순서대로 진행합니다.

---

아래 질문들을 하나씩 AskUserQuestion으로 물어봅니다.
각 답변을 내부 변수로 기억합니다.

### 질문 2-1: 이름

**질문:** "이름이 무엇인가요? (포트폴리오에 표시될 이름)"
**header:** "이름"
**options:**
- "직접 입력할게요" — description: "Other 선택 후 이름을 입력하세요."

→ 답변을 `profile_name`으로 저장

### 질문 2-2: 직함

**질문:** "직함 또는 포지션을 입력해주세요. (예: 데이터 분석가, 프론트엔드 개발자, UX 디자이너)"
**header:** "직함"
**options:**
- "데이터 분석가"
- "개발자 / 엔지니어"
- "디자이너"
- "직접 입력할게요"

→ 답변을 `profile_title`으로 저장

### 질문 2-3: 이메일

**질문:** "연락받을 이메일 주소를 입력해주세요."
**header:** "이메일"
**options:**
- "직접 입력할게요" — description: "Other 선택 후 이메일 주소를 입력하세요."

→ 답변을 `profile_email`으로 저장

### 질문 2-4: GitHub

**질문:** "GitHub 프로필 URL을 입력해주세요. (없으면 건너뛰어도 됩니다)"
**header:** "GitHub URL"
**options:**
- "있어요 (직접 입력)" — description: "Other 선택 후 https://github.com/아이디 형식으로 입력"
- "없어요, 건너뜁니다" — description: "GitHub 링크가 표시되지 않습니다."

→ 있으면 `profile_github`으로 저장, 없으면 빈 문자열 `""`

### 질문 2-5: LinkedIn

**질문:** "LinkedIn 프로필 URL을 입력해주세요. (없으면 건너뛰어도 됩니다)"
**header:** "LinkedIn URL"
**options:**
- "있어요 (직접 입력)" — description: "Other 선택 후 https://linkedin.com/in/아이디 형식으로 입력"
- "없어요, 건너뜁니다"

→ 있으면 `profile_linkedin`으로 저장, 없으면 빈 문자열 `""`

### 질문 2-6: 한 줄 소개

**질문:** "포트폴리오 메인 화면에 표시될 한 줄 소개를 입력해주세요. (예: 데이터로 세상을 읽는 분석가입니다.)"
**header:** "한줄 소개"
**options:**
- "직접 입력할게요" — description: "Other 선택 후 소개글을 입력하세요."

→ 답변을 `profile_hero`으로 저장

### 질문 2-7: 비밀번호

**질문:** "보호된 프로젝트 링크의 비밀번호를 설정하세요. (모르는 사람이 볼 수 없는 프로젝트 링크 보호용)"
**header:** "비밀번호"
**options:**
- "기본값 사용 (1234)" — description: "나중에 config.ts에서 변경 가능합니다."
- "직접 설정할게요" — description: "Other 선택 후 원하는 비밀번호 입력"

→ 답변을 `profile_password`으로 저장 (기본값이면 `"1234"`)

---

## Step 3: Career 섹션 on/off 선택

AskUserQuestion으로 물어봅니다 (multiSelect: true):

**질문:** "Career 페이지에 어떤 섹션을 표시할까요? (여러 개 선택 가능)"
**header:** "Career 섹션"
**multiSelect: true**
**options:**
- "경력 (experience)" — description: "직장 경력, 인턴십 등"
- "학력 (education)" — description: "대학교, 대학원 등"
- "자격증 (certifications)" — description: "취득한 자격증"
- "수상 (awards)" — description: "수상 경력"
- "논문/출판 (publications)" — description: "논문, 기고문 등"
- "학술 프로젝트 (academicProjects)" — description: "연구 프로젝트"
- "강의/튜터링 (teaching)"
- "아르바이트/파트타임 (partTimeJob)"
- "동아리/단체 활동 (groupActivity)"
- "멘토링 (mentoring)"

선택된 항목을 `sections_selected` 배열로 저장합니다.
각 섹션의 true/false 값은 다음 규칙으로 결정합니다:
- 선택된 항목 → `true`
- 선택되지 않은 항목 → `false`

섹션 키 매핑:
- "경력 (experience)" → `experience`
- "학력 (education)" → `education`
- "자격증 (certifications)" → `certifications`
- "수상 (awards)" → `awards`
- "논문/출판 (publications)" → `publications`
- "학술 프로젝트 (academicProjects)" → `academicProjects`
- "강의/튜터링 (teaching)" → `teaching`
- "아르바이트/파트타임 (partTimeJob)" → `partTimeJob`
- "동아리/단체 활동 (groupActivity)" → `groupActivity`
- "멘토링 (mentoring)" → `mentoring`

---

## Step 4: 프로젝트 입력

### converter_used = true (Path A)

`src/config.ts`의 `projects` 배열을 읽어서 현재 내용을 보여줍니다.

사용자에게 안내합니다:
```
컨버터가 자동으로 프로젝트를 추출했습니다.
현재 프로젝트 목록:
[현재 config.ts의 projects 내용을 요약해서 표시]

추가하거나 수정할 프로젝트가 있나요?
```

AskUserQuestion:
**질문:** "프로젝트를 추가할까요?"
**header:** "프로젝트 추가"
**options:**
- "추가할 프로젝트가 있어요" → Path B의 프로젝트 수 질문부터 시작해서 1개씩 추가
- "괜찮아요, 넘어갈게요" → `projects` 배열은 컨버터 결과 유지

### converter_used = false (Path B)

AskUserQuestion:

**질문:** "몇 개의 프로젝트를 추가할까요?"
**header:** "프로젝트 수"
**options:**
- "0개 (나중에 직접 추가할게요)" — description: "config.ts에서 직접 추가 가능"
- "1개"
- "2개"
- "3개 이상" — description: "Other 선택 후 숫자 입력"

답변이 0이면 빈 배열 `[]`로 `projects_list`를 저장하고 Step 5로 이동합니다.

1개 이상이면 N번 반복합니다. 각 반복마다 아래 질문들을 순서대로 진행합니다.
수집한 각 프로젝트를 `projects_list` 배열에 추가합니다.

#### 프로젝트 1개 입력 사이클:

**질문 A: 프로젝트 제목**
"프로젝트 이름을 입력해주세요." (header: "프로젝트 제목")
→ `proj_title`

**질문 B: 프로젝트 설명**
"프로젝트를 한 줄로 설명해주세요." (header: "프로젝트 설명")
→ `proj_desc`

**질문 C: 도메인**
"프로젝트 분야를 선택해주세요." (header: "도메인")
options: "AI/ML", "데이터 분석", "웹 개발", "디자인", "기타"
→ `proj_domain`

**질문 D: 태그**
"사용한 기술이나 키워드를 입력해주세요. (쉼표로 구분, 예: Python, Tableau, SQL)" (header: "태그")
→ `proj_tags` (쉼표로 split해서 배열로 저장)

**질문 E: 링크**
"프로젝트 링크가 있나요?" (header: "링크")
options:
- "라이브 링크 있어요" → Other로 URL 입력, `proj_live`로 저장
- "GitHub 링크 있어요" → Other로 URL 입력, `proj_github`로 저장
- "없어요" → 빈 links 객체

**질문 F: 보호 여부**
"이 프로젝트를 비밀번호로 보호할까요?" (header: "보호 여부")
options:
- "공개" — description: "누구나 링크 접근 가능"
- "보호" — description: "비밀번호 입력해야 링크 접근 가능"
→ `proj_protected` (true/false)

---

## Step 5: config.ts 작성

수집된 모든 값을 사용해서 `src/config.ts`를 **Write 도구로 완전히 덮어씁니다**.
절대로 코드만 출력하지 마세요. 반드시 Write 도구를 사용해야 합니다.

아래 템플릿에서 `[변수명]`을 수집한 값으로 교체한 후 Write 도구로 씁니다.

`profile_github`이 빈 문자열이면 `github: "",`으로,
`profile_linkedin`이 빈 문자열이면 `linkedin: "",`으로 씁니다.

`projects_list`가 비어있으면 `projects` 배열에 아래 예시 항목 하나를 포함합니다:

  {
    id: "1",
    title: "예시 프로젝트",
    description: "프로젝트 설명을 입력하세요.",
    domain: "AI",
    tags: ["Python", "Claude"],
    links: { live: "https://example.com" },
    protected: false,
    date: "2025.01",
  },

`sections_selected`에서 선택된 항목은 `true`, 나머지는 `false`로 씁니다.

---

**Write 도구에 넣을 완성된 config.ts 내용 (템플릿):**

```typescript
// ============================================================
// config.ts — 포트폴리오 설정 파일
// 이 파일만 수정하면 포트폴리오가 업데이트됩니다.
// convert_resume.py를 실행하면 자동으로 채워집니다.
// ============================================================

// ============================================================
// 👤 기본 정보
// ============================================================
export const profile = {
  name: "[profile_name]",
  title: "[profile_title]",
  email: "[profile_email]",
  github: "[profile_github]",
  linkedin: "[profile_linkedin]",
  heroDescription: "[profile_hero]",
  protectedPassword: "[profile_password]",
};

// ============================================================
// 📁 프로젝트 목록
// ============================================================
export interface Project {
  id: string;
  code?: string;
  title: string;
  description: string;
  domain: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
    external?: string;
  };
  protected: boolean;
  image?: string;
  date?: string;
  problemStatement?: string;
  technicalDetails?: string[];
  impact?: string;
  futureImprovements?: string[];
}

export const projects: Project[] = [
[projects_list의 각 항목을 아래 형식으로 삽입:]
  {
    id: "[순번]",
    title: "[proj_title]",
    description: "[proj_desc]",
    domain: "[proj_domain]",
    tags: [proj_tags 배열을 "tag1", "tag2" 형식으로],
    links: { [proj_live가 있으면 live: "url", proj_github가 있으면 github: "url"] },
    protected: [proj_protected],
  },
];

// ============================================================
// 📋 섹션 on/off 설정
// false로 바꾸면 해당 섹션이 Career 페이지에서 사라집니다.
// ============================================================
export const sections = {
  experience: [sections.experience],       // true 또는 false
  education: [sections.education],
  certifications: [sections.certifications],
  publications: [sections.publications],
  awards: [sections.awards],
  academicProjects: [sections.academicProjects],
  teaching: [sections.teaching],
  partTimeJob: [sections.partTimeJob],
  groupActivity: [sections.groupActivity],
  mentoring: [sections.mentoring],
};

// ============================================================
// 💼 Career 데이터 타입 정의
// ============================================================
export interface Position {
  company: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string | null;
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
  date: string;
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

// ============================================================
// 💼 Career 데이터 — sections에서 true인 항목만 표시됩니다
// ============================================================
export const careerData = {
  experience: [] as Position[],
  education: [] as Education[],
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

---

Write 도구 실행 후, 다음 메시지를 출력합니다:

✅ config.ts 작성이 완료됐습니다!

이제 포트폴리오 미리보기를 실행해볼 수 있습니다.

---

## Step 6: 미리보기

사용자에게 다음을 안내합니다 (응답 메시지로 출력, 도구 사용 없음):

이제 포트폴리오를 로컬에서 미리볼 수 있습니다.

터미널에서 아래 명령어를 순서대로 실행해주세요:

  npm install
  npm run dev

완료되면 브라우저에서 http://localhost:5173 을 열어주세요.

AskUserQuestion으로 확인합니다:

**질문:** "미리보기 화면이 잘 보이나요?"
**header:** "미리보기 확인"
**options:**
- "잘 보여요!" → Step 7로 이동
- "오류가 났어요" — description: "오류 메시지를 알려주세요."
- "아직 실행 중이에요" → 잠시 기다렸다가 다시 확인 요청

오류가 난 경우: AskUserQuestion으로 오류 유형을 확인합니다:

**질문:** "어떤 오류가 발생했나요?"
**header:** "오류 유형"
**options:**
- "vite not found / command not found" — description: "npm install을 먼저 실행했는지 확인하세요."
- "포트 이미 사용 중" — description: "npm run dev -- --port 3000 으로 실행하세요."
- "TypeScript 오류" — description: "config.ts 문법을 확인합니다. Read 도구로 파일을 읽어서 오류 위치를 찾아드립니다."
- "기타 오류" — description: "오류 메시지를 알려주세요."

---

## Step 7: 미리보기 후 수정 가이드

사용자에게 다음을 안내합니다 (응답 메시지로 출력):

미리보기가 잘 보이면, 내용을 더 수정하고 싶을 때는
src/config.ts 파일을 직접 열어서 수정하면 됩니다.

주요 수정 위치 (파일에서 Ctrl+F 또는 Cmd+F로 검색하세요):
  • 이름/직함/이메일 등 기본 정보: `export const profile` 검색
  • 프로젝트 추가/수정:           `export const projects` 검색
  • Career 섹션 표시 여부:        `export const sections` 검색

💡 파일을 저장하면 브라우저가 자동으로 새로고침됩니다.
   npm run dev를 다시 실행할 필요 없습니다.

Career 상세 데이터(직장 경력, 학력 등)를 추가하려면:
  • config.ts 하단 careerData 객체를 직접 수정하거나
  • 이력서 파일로 convert_resume.py를 다시 실행하세요.

AskUserQuestion으로 확인합니다:

**질문:** "수정이 완료됐나요? 배포를 진행할까요?"
**header:** "배포 준비"
**options:**
- "네, 배포하고 싶어요" → Step 8로 이동
- "아직 수정 중이에요" → "수정 완료 후 언제든지 /portfolio-setup 을 다시 실행하세요" 안내
- "지금은 배포 안 할게요" → 아래 완료 메시지 출력 후 종료

---

## Step 8: 배포 안내

AskUserQuestion으로 GitHub 레포 이름을 확인합니다:

**질문:** "GitHub 레포지토리 이름을 입력해주세요. (예: my-portfolio)"
**header:** "GitHub 레포 이름"
**options:**
- "직접 입력할게요" — description: "Other 선택 후 레포 이름만 입력 (URL 아닌 이름만)"

→ `repo_name`으로 저장

그 다음, `Edit` 도구로 `vite.config.ts`의 base 경로를 수정합니다:

- 찾을 문자열: `base: '/portfolio-template/',`
- 교체할 문자열: `base: '/[repo_name]/',`

수정 후 사용자에게 다음을 안내합니다 (응답 메시지로 출력):

vite.config.ts가 업데이트됐습니다.

이제 GitHub Pages에 배포하려면:

1. 변경사항을 커밋하고 푸시하세요:
   git add .
   git commit -m "feat: set up my portfolio"
   git push

2. GitHub에서 레포지토리 → Settings → Pages로 이동

3. "Build and deploy" 소스를 "GitHub Actions"로 선택

4. 저장하면 자동으로 배포가 시작됩니다.
   (1~3분 소요)

5. 배포 완료 후 주소:
   https://[GitHub아이디].github.io/[repo_name]/

🎉 포트폴리오 설정이 완료됐습니다!

---

## 완료

설정이 끝났습니다. 이 스킬을 다시 실행하고 싶으면 `/portfolio-setup`을 입력하세요.

추가로 도움이 필요하면:
- 개별 필드 수정: `src/config.ts` 직접 편집
- 이력서 재변환: `python converter/convert_resume.py --pdf 파일명.pdf`
- 배포 문제: `.github/workflows/deploy.yml` 확인
