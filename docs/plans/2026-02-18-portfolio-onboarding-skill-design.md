# Portfolio Onboarding Skill Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:writing-plans to create the implementation plan.

**Goal:** Create a Claude Code skill (`portfolio-setup`) that guides non-developers through setting up their portfolio site step by step — without reading the README.

**Architecture:** A linear wizard skill embedded in the portfolio template repo (`.claude/skills/portfolio-setup.md`). It collects user info via `AskUserQuestion`, optionally uses the converter for resume parsing, writes `config.ts` directly, and guides through preview and deployment.

**Tech Stack:** Claude Code skill (Markdown), `AskUserQuestion` tool, `Read`/`Edit` tools for config.ts, Bash for converter execution guidance.

---

## Target User

Non-developer who has:
1. Forked/cloned `crystal0224/portfolio-template`
2. Claude Code installed and running in the repo directory
3. Has a resume (PDF or CSV) or knows their info manually

---

## Skill Location

```
portfolio-template/
└── .claude/
    └── skills/
        └── portfolio-setup.md   ← the skill file
```

Invoked as `/portfolio-setup` from within the cloned repo.

---

## 8-Step Flow

### Step 0: Welcome
- Greet the user and explain what the skill will do
- Mention prerequisites: Node.js installed, running inside the cloned repo

### Step 1: Resume File Check (Branch Point)
- Ask if the user has a resume/career file (PDF or CSV)
- **Path A (file exists):**
  - Instruct user to copy file into `converter/` folder
  - Show exact terminal command: `python converter/convert_resume.py --pdf yourfile.pdf`
  - Wait for user to confirm converter ran → read generated `config.ts` for next steps
- **Path B (no file):**
  - Proceed with manual step-by-step entry

### Step 2: Profile Info Confirmation / Collection
- **Path A:** Read current `config.ts`, identify fields still containing placeholder values, ask only about those
- **Path B:** Ask one by one:
  1. 이름 (name)
  2. 직함 (title)
  3. 이메일 (email)
  4. GitHub URL
  5. LinkedIn URL (skip 가능)
  6. 한 줄 소개 (heroDescription)
  7. 비밀번호 (protectedPassword — protected 프로젝트 링크용)

### Step 3: Career Section On/Off
- Multi-select: which sections to show?
  - experience, education, certifications, awards, publications, academicProjects, teaching, partTimeJob, groupActivity, mentoring
- Update `sections` object in config.ts accordingly

### Step 4: Project Input / Review
- **Path A:** Show converter-generated projects, ask if any need editing/adding
- **Path B:** Ask how many projects to add, then loop:
  - 제목, 설명, 도메인, 태그(쉼표 구분), 링크(live/github), protected 여부

### Step 5: Write config.ts
- Use Edit tool to overwrite `src/config.ts` with all collected data
- Confirm write succeeded

### Step 6: Preview
- Instruct: `npm install` then `npm run dev`
- Tell user to open `http://localhost:5173`

### Step 7: Post-Preview Edit Guide
- Explain which lines in `config.ts` to edit for common changes:
  - Profile: lines ~10-18
  - Projects: lines ~44-55 (add objects to the array)
  - Sections on/off: lines ~61-72
- Remind: browser hot-reloads on save, no restart needed

### Step 8: Deployment
- Ask for GitHub repo name (e.g., `my-portfolio`)
- Auto-modify `vite.config.ts` base to `'/<repo-name>/'`
- Step-by-step GitHub Pages setup:
  1. Push to GitHub
  2. Settings → Pages → Source: GitHub Actions
  3. GitHub Actions will auto-deploy on push

---

## Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Skill location | `.claude/skills/` in template repo | Users get it automatically when they clone |
| Resume flow | Optional, merges into manual flow | Converter may miss fields; questions fill gaps |
| config.ts write | Edit tool (overwrite) | Single source of truth, no partial states |
| Career data | Only sections on/off, not full entry | Career data entry is complex; converter or manual edit handles it |
| Deployment | Guide vite.config.ts + Pages UI | No direct GitHub API calls needed from skill |

---

## Out of Scope

- Uploading profile photo (too binary-heavy for CLI)
- Entering full career timeline data via skill (too many fields; converter or README covers it)
- Automatic `git push` / `npm run deploy` execution
