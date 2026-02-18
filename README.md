# 포트폴리오 템플릿

> 이력서 PDF 또는 CSV 파일 하나로 나만의 포트폴리오 사이트를 만들어보세요.

## 미리보기

홈 페이지(프로젝트 갤러리) + 경력 페이지(Career)로 구성된 정적 포트폴리오 사이트입니다.

## 🚀 시작하기 (5단계)

### 1단계: 이 템플릿으로 내 레포 만들기

이 페이지 우측 상단 **"Use this template"** 버튼 클릭 → **"Create a new repository"**

### 2단계: 내 컴퓨터에 클론

```bash
git clone https://github.com/내아이디/내레포이름.git
cd 내레포이름
npm install
```

### 3단계: 내 이력서로 config.ts 자동 생성

> **필요 조건:** [Claude Code](https://claude.ai/code)가 설치·로그인된 환경

```bash
# 변환기 의존성 설치 (처음 한 번만)
pip install -r converter/requirements.txt

# PDF 이력서로 변환
python converter/convert_resume.py --pdf 내이력서.pdf

# 또는 CSV 파일로 변환
python converter/convert_resume.py --csv 데이터.csv
```

약 30초~1분 후 `src/config.ts`가 자동 생성됩니다.

### 4단계: 미리보기 확인

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 열기

### 5단계: GitHub Pages 배포

1. `vite.config.ts`에서 `base`를 내 레포 이름으로 변경:
   ```ts
   base: '/내레포이름/',
   ```

2. GitHub 레포 → **Settings** → **Pages** → Source: **GitHub Actions** 선택

3. 배포 실행:
   ```bash
   npm run deploy
   ```

라이브 주소: `https://내아이디.github.io/내레포이름/`

---

## ✏️ config.ts 직접 수정하기

변환기 없이 `src/config.ts`를 직접 열어 편집할 수 있습니다.

### 기본 정보

```typescript
export const profile = {
  name: "내 이름",          // ← 수정
  title: "내 직함",
  email: "내@이메일.com",
  github: "https://github.com/내아이디",
  linkedin: "https://linkedin.com/in/내아이디",
  heroDescription: "자기소개를 입력하세요.",
};
```

### 섹션 숨기기 / 보이기

```typescript
export const sections = {
  experience: true,       // 경력
  education: true,        // 교육
  certifications: true,   // 자격증
  publications: false,    // ← false면 Career 페이지에서 사라짐
  awards: true,
  academicProjects: false,
  teaching: false,
  partTimeJob: false,
  groupActivity: false,
  mentoring: false,
};
```

### 프로필 사진 교체

`public/profile.png` 파일을 내 사진으로 교체하세요. (권장 비율 3:4)

---

## 📋 config.ts 필드 설명

| 필드 | 설명 | 예시 |
|---|---|---|
| `profile.name` | 이름 | `"홍길동"` |
| `profile.title` | 직함 | `"데이터 분석가"` |
| `profile.heroDescription` | 히어로 자기소개 | `"안녕하세요..."` |
| `projects[].domain` | 필터 카테고리 | `"AI"`, `"분석"`, `"교육"` |
| `projects[].protected` | 링크 잠금 | `true` / `false` |
| `careerData.experience[].endDate` | 현재 재직 중 표시 | `null` 입력 |

---

## ❓ 자주 묻는 질문

**Q. Claude Code 없이 변환기를 쓸 수 없나요?**
A. 네, 변환기는 Claude Code CLI가 필요합니다. 없으면 `src/config.ts`를 직접 편집해주세요.

**Q. 영어로 사용할 수 있나요?**
A. 네, `config.ts`의 모든 텍스트를 영어로 입력하면 됩니다.

**Q. 프로젝트 필터 카테고리를 바꾸고 싶어요.**
A. `src/app/components/FilterBar.tsx`의 도메인 목록을 수정하세요.

**Q. Career 페이지가 보이지 않아요.**
A. 홈 하단 "상세 경력 보기" 버튼을 클릭하거나 URL에 `#career`를 추가하세요.

---

## 기술 스택

React 18 · Vite 6 · TypeScript · Tailwind CSS v4 · Python 3.10+
