# Portfolio Template - TODO List

## 🎯 프로젝트 목표
누구나 자기 정보로 포트폴리오를 만들 수 있는 GitHub Template Repository 제공.
README 없이 `/portfolio-setup` 스킬 하나로 온보딩 완료.

---

## ✅ 완료된 작업

### 템플릿 변환 (feature/template-conversion)
- [x] Firebase 완전 제거 (Firestore, Admin, MigratePage)
- [x] `src/config.ts` 단일 설정 파일 생성
- [x] Career 섹션 on/off 플래그 (`sections` 객체)
- [x] 어드민 모드 제거, 비밀번호 config.ts로 이동
- [x] App.tsx / HeroSection / PortfolioCard config.ts 연결
- [x] 10개 Career 섹션 컴포넌트 단순화
- [x] 개인정보 제거 (회사 레퍼런스, 비밀번호, Firebase 프로젝트 ID)
- [x] 프로필 이미지 SVG 플레이스홀더로 교체
- [x] `converter/convert_resume.py` — PDF/CSV → config.ts 자동 변환기
- [x] 한국어 README 온보딩 가이드 (5단계)

### 배포
- [x] GitHub Template Repository 설정 (your-username/portfolio-template)
- [x] GitHub Pages 배포 성공
  - 라이브: https://your-username.github.io/portfolio-template/
  - GitHub Actions 자동 배포 (deploy.yml)
  - vite.config.ts base: `/portfolio-template/`

### 온보딩 스킬
- [x] `.claude/skills/portfolio-setup.md` 작성 (625줄)
  - Step 0: 환영 인사
  - Step 1: 이력서 파일 유무 분기 (Path A: 컨버터 / Path B: 수동)
  - Step 2: 프로필 정보 7개 필드 수집
  - Step 3: Career 섹션 on/off 멀티셀렉트
  - Step 4: 프로젝트 입력 루프
  - Step 5: config.ts Write 도구로 자동 작성
  - Step 6: 미리보기 안내 (npm install + npm run dev)
  - Step 7: 수정 가이드 (Cmd+F 검색 안내)
  - Step 8: 배포 안내 (vite.config.ts + GitHub Pages)
- [x] 스펙 검토 통과 (모든 항목 완전 일치)
- [x] 품질 검토 통과 (4개 이슈 수정 완료)
- [x] 스모크 테스트 통과 (vite build ✓, config.ts 정상 생성 확인)

---

## 🔄 남은 작업

### 우선순위 높음

- [ ] **실제 사용자 테스트** — 비개발자 1명에게 템플릿을 fork하고 `/portfolio-setup` 실행해보게 하기
  - 스킬 질문 흐름이 자연스러운지 확인
  - 컨버터 Path A 실제 PDF 파일로 테스트

- [ ] **converter Path A 통합 테스트** — 실제 PDF/CSV 파일로 컨버터 + 스킬 Path A 흐름 검증
  - 컨버터 실행 → config.ts 초안 생성 → 스킬 Path A에서 플레이스홀더 필드만 물어보는지 확인

### 우선순위 중간

- [ ] **프로필 이미지 업로드 안내 추가** — 스킬 또는 README에 `public/profile.svg` 교체 방법 안내
  - 현재 스킬은 사진 업로드 커버 안 함 (Out of Scope)
  - README에 간단한 안내 추가 검토

- [ ] **careerData 입력 가이드** — 스킬이 careerData(경력/학력 상세)는 수동 편집 안내만 하는데,
  컨버터 결과로 careerData가 채워졌을 때 검토/수정 플로우 검토

- [ ] **docs/plans 정리** — 구현 완료 후 내부 설계 문서 삭제 여부 결정
  - `docs/plans/2026-02-18-portfolio-onboarding-skill-design.md`
  - `docs/plans/2026-02-18-portfolio-setup-skill.md`
  - 공개 레포에 내부 문서 노출 여부 판단

### 우선순위 낮음

- [ ] **영어 README 추가** — 한국어 외 글로벌 사용자를 위한 영어 버전
- [ ] **스킬 다국어 지원** — 영어 사용자를 위한 영어 버전 스킬
- [ ] **커스텀 도메인 설정 안내** — Step 8에 GitHub Pages 커스텀 도메인 옵션 추가

---

## 🐛 알려진 이슈

1. **Step 7 라인 번호 안내** — config.ts 라인 번호가 실제 사용 시 달라질 수 있음 (이미 Cmd+F 검색어로 개선됨)
2. **vite.config.ts 주석** — Step 8 base 경로 수정 후 "배포 시 변경하세요" 주석이 남음 (기능상 무해)

---

## 📝 참고

- **레포**: https://github.com/your-username/portfolio-template
- **라이브**: https://your-username.github.io/portfolio-template/
- **스킬 호출**: 템플릿 clone 후 `claude` 실행 → `/portfolio-setup`

---

**마지막 업데이트**: 2026-02-18
**진행률**: 핵심 기능 완료. 실사용자 테스트 및 세부 개선 남음.
