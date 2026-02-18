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
