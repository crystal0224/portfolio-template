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
import re
import subprocess
import sys
from pathlib import Path

import pdfplumber
import pandas as pd


CONFIG_TS_TEMPLATE = """\
// ============================================================
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
"""


EXTRACT_PROMPT = """다음은 이력서 내용입니다. 아래 JSON 스키마에 맞게 정보를 추출해주세요.
비어있는 항목은 빈 문자열("") 또는 빈 배열([])로 채워주세요.
반드시 유효한 JSON만 반환하세요. 설명이나 마크다운 코드블록 없이 JSON만.

스키마:
{{
  "profile": {{
    "name": "이름",
    "title": "직함/직무",
    "email": "이메일",
    "github": "GitHub URL (없으면 빈 문자열)",
    "linkedin": "LinkedIn URL (없으면 빈 문자열)",
    "heroDescription": "자기소개 2-3문장"
  }},
  "projects": [
    {{
      "id": "1",
      "title": "프로젝트명",
      "description": "설명",
      "domain": "ai-tools",
      "tags": ["태그1", "태그2"],
      "link": "URL (없으면 빈 문자열)",
      "protected": false
    }}
  ],
  "careerData": {{
    "experience": [
      {{
        "company": "회사명",
        "title": "직함",
        "description": "업무 설명",
        "location": "근무지",
        "startDate": "YYYY-MM",
        "endDate": "YYYY-MM 또는 null (현재 재직 중)",
        "highlights": ["주요 성과1", "주요 성과2"]
      }}
    ],
    "education": [
      {{
        "school": "학교명",
        "degree": "학위",
        "field": "전공",
        "startYear": 2018,
        "endYear": 2022,
        "notes": ""
      }}
    ],
    "certifications": [
      {{
        "name": "자격증명",
        "authority": "발급기관",
        "date": "YYYY-MM",
        "url": ""
      }}
    ],
    "publications": [],
    "awards": [
      {{
        "title": "수상명",
        "organization": "수여기관",
        "date": "YYYY-MM",
        "description": ""
      }}
    ],
    "academicProjects": [],
    "teaching": [],
    "partTimeJobs": [],
    "groupActivities": [],
    "mentoring": []
  }}
}}

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
    try:
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text.strip()
    except Exception as e:
        print(f"❌ PDF 읽기 실패: {e}", file=sys.stderr)
        print("   PDF 파일이 손상되었거나 텍스트 추출이 불가능한 형식일 수 있습니다.", file=sys.stderr)
        sys.exit(1)


def extract_text_from_csv(csv_path: str) -> str:
    try:
        df = pd.read_csv(csv_path)
        return df.to_string(index=False)
    except Exception as e:
        print(f"❌ CSV 읽기 실패: {e}", file=sys.stderr)
        sys.exit(1)


def call_claude(prompt: str) -> str:
    try:
        result = subprocess.run(
            ["claude", "-p", prompt],
            capture_output=True,
            text=True,
            timeout=120,
        )
    except FileNotFoundError:
        print("❌ Claude CLI를 찾을 수 없습니다.", file=sys.stderr)
        print("   Claude Code가 설치·로그인된 환경에서 실행해주세요.", file=sys.stderr)
        print("   설치: https://claude.ai/code", file=sys.stderr)
        sys.exit(1)
    if result.returncode != 0:
        print(f"❌ Claude CLI 오류:\n{result.stderr}", file=sys.stderr)
        sys.exit(1)
    return result.stdout.strip()


def parse_json_from_claude(response: str) -> dict:
    # 코드 블록 추출 시도
    match = re.search(r"```(?:json)?\s*([\s\S]*?)```", response)
    if match:
        response = match.group(1).strip()
    return json.loads(response)


def build_sections(career: dict) -> dict:
    sections = dict(DEFAULT_SECTIONS)
    # 데이터가 있으면 자동으로 true
    mapping = {
        "experience": "experience",
        "education": "education",
        "certifications": "certifications",
        "publications": "publications",
        "awards": "awards",
        "academicProjects": "academicProjects",
        "teaching": "teaching",
        "partTimeJob": "partTimeJobs",
        "groupActivity": "groupActivities",
        "mentoring": "mentoring",
    }
    for section_key, career_key in mapping.items():
        if career.get(career_key):
            sections[section_key] = True
    return sections


def generate_config_ts(data: dict, output_path: Path) -> None:
    career = data.get("careerData", {})
    sections = build_sections(career)

    def fmt(obj):
        return json.dumps(obj, ensure_ascii=False, indent=2)

    content = CONFIG_TS_TEMPLATE.format(
        profile_json=fmt(data.get("profile", {})),
        projects_json=fmt(data.get("projects", [])),
        sections_json=fmt(sections),
        career_json=fmt(career),
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")
    print(f"✅ config.ts 생성 완료: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="이력서 PDF/CSV → config.ts 변환기")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--pdf", help="PDF 이력서 경로")
    group.add_argument("--csv", help="CSV 파일 경로")
    parser.add_argument(
        "--output",
        default="src/config.ts",
        help="출력 파일 경로 (기본값: src/config.ts)",
    )
    args = parser.parse_args()

    if args.pdf:
        print(f"📄 PDF 읽는 중: {args.pdf}")
        resume_text = extract_text_from_pdf(args.pdf)
    else:
        print(f"📊 CSV 읽는 중: {args.csv}")
        resume_text = extract_text_from_csv(args.csv)

    if not resume_text.strip():
        print("❌ 파일에서 텍스트를 추출할 수 없습니다.", file=sys.stderr)
        sys.exit(1)

    MAX_RESUME_CHARS = 8000  # Claude context 제한을 고려한 최대 문자 수
    if len(resume_text) > MAX_RESUME_CHARS:
        print(f"⚠️  이력서가 길어서 앞부분 {MAX_RESUME_CHARS}자만 분석합니다. (전체: {len(resume_text)}자)")
    print("🤖 Claude가 이력서를 분석 중... (30초~1분 소요)")
    prompt = EXTRACT_PROMPT.format(resume_text=resume_text[:MAX_RESUME_CHARS])
    response = call_claude(prompt)

    try:
        data = parse_json_from_claude(response)
    except json.JSONDecodeError as e:
        print(f"❌ JSON 파싱 실패: {e}", file=sys.stderr)
        print("Claude 응답 (처음 500자):", response[:500], file=sys.stderr)
        sys.exit(1)

    if not isinstance(data, dict) or "profile" not in data or "careerData" not in data:
        print("❌ Claude 응답이 예상한 형식이 아닙니다.", file=sys.stderr)
        print("   응답 내용:", str(data)[:300], file=sys.stderr)
        sys.exit(1)

    output_path = Path(args.output)
    generate_config_ts(data, output_path)

    print()
    print("🎉 완료! 다음 단계:")
    print("  1. src/config.ts 열어서 내용 확인·수정")
    print("  2. npm run dev 로 미리보기")
    print("  3. GitHub Pages 배포")


if __name__ == "__main__":
    main()
