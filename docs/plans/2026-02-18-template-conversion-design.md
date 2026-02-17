# Portfolio Template 변환 설계

**날짜**: 2026-02-18
**브랜치**: feature/template-conversion
**목표**: Crystal의 포트폴리오를 누구나 자기 정보로 쓸 수 있는 GitHub Template Repo로 변환

---

## 핵심 결정사항

| 항목 | 결정 |
|---|---|
| 대상 사용자 | 비개발자 위주 |
| 데이터 방식 | config.ts 자동 생성 (변환기 사용) |
| Firebase | 완전 제거 |
| Admin 모드 | 완전 제거 |
| 섹션 관리 | sections 설정으로 on/off |
| 레포 형태 | GitHub Template Repository |
| 변환기 AI | claude CLI subprocess (구독 환경) |

---

## 레포 구조

```
portfolio-template/
├── src/
│   ├── config.ts                  ← 변환기가 자동 생성
│   └── app/
│       ├── App.tsx
│       ├── components/
│       └── pages/CareerPage.tsx
├── converter/
│   ├── convert_resume.py          ← PDF/CSV → config.ts
│   └── requirements.txt           (pdfplumber, pandas)
├── package.json                   (firebase 제거)
└── README.md
```

---

## config.ts 구조

```typescript
// 👤 기본 정보
export const profile = {
  name: "홍길동",
  title: "데이터 분석가",
  email: "hong@example.com",
  github: "https://github.com/...",
  linkedin: "https://linkedin.com/in/...",
  heroDescription: "안녕하세요...",
};

// 📁 프로젝트 목록
export const projects = [
  {
    id: "1",
    title: "프로젝트 이름",
    description: "설명",
    domain: "AI",
    tags: ["Python", "RAG"],
    link: "https://...",
    protected: false,
  },
];

// 📋 섹션 on/off (false면 페이지에서 사라짐)
export const sections = {
  experience: true,
  education: true,
  certifications: true,
  publications: false,
  awards: true,
  academicProjects: false,
  teaching: false,
  partTimeJob: false,
  groupActivity: false,
  mentoring: false,
};

// 💼 Career 데이터
export const careerData = {
  experience: [...],
  education: [...],
  certifications: [...],
  awards: [...],
};
```

---

## 변환기 동작

```bash
# PDF 이력서
python converter/convert_resume.py --pdf 이력서.pdf

# CSV 데이터
python converter/convert_resume.py --csv 데이터.csv

# 결과: src/config.ts 자동 생성
```

- `claude` CLI subprocess 호출 (API 키 불필요, 구독 환경 그대로)
- PDF: pdfplumber로 텍스트 추출 → Claude로 구조화
- CSV: pandas로 읽기 → Claude로 구조화
- 결과를 config.ts 형식으로 파일 저장

---

## 제거 목록

- `src/app/lib/firebase.ts`
- `src/app/hooks/useFirestore.ts`
- `src/app/hooks/useCareerDragDrop.ts`
- `src/app/contexts/AdminContext.tsx`
- `src/app/components/AdminLoginModal.tsx`
- `src/app/components/EditProjectModal.tsx`
- `src/app/components/SyncProjectsModal.tsx`
- `src/app/pages/MigratePage.tsx`
- `firebase` npm 패키지
- Admin 관련 코드 (App.tsx 내 admin 분기 전부)

---

## README 구성 (5단계)

1. "Use this template" 클릭
2. 로컬 클론 후 `npm install`
3. 변환기 실행: `python converter/convert_resume.py --pdf 이력서.pdf`
4. `npm run dev`로 확인
5. GitHub Pages 배포

---

## 구현 태스크 (팀 분배용)

| 태스크 | 내용 |
|---|---|
| T1: Firebase/Admin 제거 | 삭제 목록 실행, App.tsx 정리 |
| T2: config.ts 생성 | 타입 정의 + 샘플 데이터 |
| T3: 컴포넌트 config 연결 | hardcoded 데이터 → config import로 교체 |
| T4: 섹션 on/off 구현 | sections 설정에 따라 조건부 렌더링 |
| T5: 변환기 작성 | convert_resume.py + requirements.txt |
| T6: README 작성 | 한국어 온보딩 가이드 |
