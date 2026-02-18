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
