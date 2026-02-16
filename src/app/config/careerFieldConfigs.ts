export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "month" | "date" | "select";
  required?: boolean;
  options?: string[];
}

// === Positions (경력) ===
export const positionFields: FieldConfig[] = [
  { name: "company", label: "회사명", type: "text", required: true },
  { name: "title", label: "직책", type: "text", required: true },
  { name: "description", label: "설명", type: "textarea" },
  { name: "location", label: "위치", type: "text" },
  { name: "startDate", label: "시작일", type: "month", required: true },
  { name: "endDate", label: "종료일", type: "month" },
];

// === Education (학력) ===
export const educationFields: FieldConfig[] = [
  { name: "school", label: "학교명", type: "text", required: true },
  { name: "degree", label: "학위", type: "text", required: true },
  { name: "field", label: "전공", type: "text", required: true },
  { name: "startYear", label: "입학년도", type: "number", required: true },
  { name: "endYear", label: "졸업년도", type: "number", required: true },
  { name: "notes", label: "비고", type: "text" },
  { name: "gpa", label: "학점", type: "text" },
  { name: "honors", label: "우수사항", type: "text" },
];

// === Certifications (자격증) ===
export const certificationFields: FieldConfig[] = [
  { name: "name", label: "자격증명", type: "text", required: true },
  { name: "authority", label: "발급기관", type: "text", required: true },
  { name: "date", label: "취득일", type: "month", required: true },
  { name: "licenseNumber", label: "자격번호", type: "text" },
  { name: "url", label: "URL", type: "text" },
];

// === Publications (출판물) ===
export const publicationFields: FieldConfig[] = [
  { name: "title", label: "제목", type: "text", required: true },
  { name: "publishedDate", label: "발행일", type: "text", required: true },
  { name: "publisher", label: "출판사/학회", type: "text", required: true },
  {
    name: "type",
    label: "유형",
    type: "select",
    required: true,
    options: ["논문", "단행본", "학술발표"],
  },
  { name: "authors", label: "저자", type: "text" },
  { name: "description", label: "설명", type: "textarea" },
  { name: "url", label: "URL", type: "text" },
];

// === Skills (스킬) ===
export const skillFields: FieldConfig[] = [
  { name: "name", label: "스킬명", type: "text", required: true },
  {
    name: "category",
    label: "카테고리",
    type: "select",
    required: true,
    options: ["technical", "domain", "soft"],
  },
];

// === Awards (수상) ===
export const awardFields: FieldConfig[] = [
  { name: "title", label: "수상명", type: "text", required: true },
  { name: "organization", label: "수여기관", type: "text", required: true },
  { name: "date", label: "수상일", type: "month", required: true },
];

// === Academic Projects (학술 프로젝트) ===
export const academicProjectFields: FieldConfig[] = [
  { name: "title", label: "프로젝트명", type: "text", required: true },
  { name: "organization", label: "기관", type: "text", required: true },
  { name: "startDate", label: "시작일", type: "month", required: true },
  { name: "endDate", label: "종료일", type: "month", required: true },
  { name: "description", label: "설명", type: "textarea", required: true },
];

// === Teaching Experience (강의 경험) ===
export const teachingFields: FieldConfig[] = [
  { name: "subject", label: "과목명", type: "text", required: true },
  { name: "institution", label: "교육기관", type: "text", required: true },
  { name: "description", label: "설명", type: "textarea" },
  { name: "period", label: "기간", type: "text", required: true },
];

// === Part-time Jobs (파트타임 경력) ===
export const partTimeJobFields: FieldConfig[] = [
  { name: "title", label: "직무명", type: "text", required: true },
  { name: "organization", label: "기관", type: "text", required: true },
  { name: "startDate", label: "시작일", type: "month", required: true },
  { name: "endDate", label: "종료일", type: "month", required: true },
  { name: "description", label: "설명", type: "textarea", required: true },
];

// === Group Activities (그룹 활동) ===
export const groupActivityFields: FieldConfig[] = [
  { name: "title", label: "활동명", type: "text", required: true },
  { name: "date", label: "기간", type: "text", required: true },
  { name: "description", label: "설명", type: "textarea", required: true },
];

// === Mentoring Experience (멘토링 경험) ===
export const mentoringFields: FieldConfig[] = [
  { name: "title", label: "멘토링명", type: "text", required: true },
  { name: "organization", label: "기관", type: "text", required: true },
  { name: "period", label: "기간", type: "text", required: true },
  { name: "description", label: "설명", type: "textarea" },
];

// === Research Exchange (연구교류) ===
export const researchExchangeFields: FieldConfig[] = [
  { name: "institution", label: "기관명", type: "text", required: true },
  { name: "program", label: "프로그램명", type: "text", required: true },
  { name: "date", label: "날짜", type: "month", required: true },
];

// === Work Projects (업무 프로젝트) ===
export const workProjectFields: FieldConfig[] = [
  { name: "year", label: "연도", type: "number", required: true },
  { name: "month", label: "월", type: "number", required: true },
  {
    name: "category",
    label: "카테고리",
    type: "select",
    required: true,
    options: [
      "진단",
      "리더십",
      "채용/퇴직",
      "SERI CEO",
      "CEO/HR브리프",
      "분석방법론",
      "강의",
      "교육이수",
      "제도",
      "기타",
    ],
  },
  { name: "title", label: "제목", type: "text", required: true },
  {
    name: "duration",
    label: "기간유형",
    type: "select",
    required: true,
    options: ["단기", "장기"],
  },
  {
    name: "type",
    label: "유형",
    type: "select",
    required: true,
    options: ["지원", "연구"],
  },
  {
    name: "format",
    label: "형식",
    type: "select",
    required: true,
    options: ["보고서", "강의", "자격증", "책"],
  },
  { name: "description", label: "설명", type: "textarea" },
  { name: "url", label: "URL", type: "text" },
];

// Map of section keys to their field configs
export const careerFieldConfigMap: Record<string, FieldConfig[]> = {
  positions: positionFields,
  education: educationFields,
  certifications: certificationFields,
  publications: publicationFields,
  skills: skillFields,
  awards: awardFields,
  academicProjects: academicProjectFields,
  teaching: teachingFields,
  partTimeJobs: partTimeJobFields,
  groupActivities: groupActivityFields,
  mentoring: mentoringFields,
  researchExchange: researchExchangeFields,
  workProjects: workProjectFields,
};
