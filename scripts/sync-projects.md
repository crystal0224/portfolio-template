# 프로젝트 동기화 가이드

## 사용 방법

관리자 모드에서 "🔄 동기화" 버튼을 클릭하면, Claude에게 동기화를 요청하라는 안내가 표시됩니다.

채팅창에서 다음과 같이 요청하세요:

```
프로젝트 동기화해줘
```

## Claude가 자동으로 하는 일

1. **마지막 동기화 시간 확인**
   - LocalStorage의 `portfolio_last_sync` 읽기
   - 없으면 전체 스캔, 있으면 그 이후만 스캔

2. **GitHub 프로젝트 스캔**
   ```bash
   gh repo list crystal0224 --limit 100 --json name,description,url,pushedAt,stargazerCount
   ```

3. **HuggingFace Spaces 스캔**
   ```bash
   huggingface-cli list-spaces soojeongcrystal
   ```

4. **Vercel 프로젝트 스캔**
   ```bash
   vercel project ls
   ```

5. **새 프로젝트 필터링**
   - 기존 portfolioData의 ID와 비교
   - 마지막 동기화 이후 업데이트된 것만 선택

6. **portfolioData.ts 업데이트**
   - 새 프로젝트 추가
   - README 내용 가져와서 description 생성

7. **자동 커밋**
   ```bash
   git add src/app/data/portfolioData.ts
   git commit -m "Sync: Add N new projects from [platforms]"
   git push
   ```

## 마지막 동기화 시간 관리

LocalStorage에 저장:
```javascript
localStorage.setItem("portfolio_last_sync", Date.now().toString());
```

확인:
```javascript
const lastSync = localStorage.getItem("portfolio_last_sync");
const date = new Date(parseInt(lastSync));
console.log("마지막 동기화:", date.toLocaleString("ko-KR"));
```

초기화 (전체 재스캔):
```javascript
localStorage.removeItem("portfolio_last_sync");
```

## 수동 동기화 명령어

### GitHub
```bash
gh repo list crystal0224 --limit 100 --json name,description,url,pushedAt,stargazerCount --jq '.[] | select(.pushedAt > "2026-02-16")'
```

### HuggingFace
```python
from huggingface_hub import HfApi
api = HfApi()
spaces = api.list_spaces(author="soojeongcrystal")
for space in spaces:
    print(f"{space.id}: {space.lastModified}")
```

### Vercel
```bash
vercel project ls --format json
```

## 주의사항

- 동기화 후 반드시 로컬에서 확인
- 자동 생성된 description 검토
- 불필요한 프로젝트는 관리자 모드에서 삭제
- 정기적으로 동기화 (주 1회 권장)
