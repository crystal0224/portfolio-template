// ============================================================
// config.ts — 포트폴리오 설정 파일
// 이 파일만 수정하면 포트폴리오가 업데이트됩니다.
// convert_resume.py를 실행하면 자동으로 채워집니다.
// ============================================================

// ============================================================
// 👤 기본 정보 — 여기를 내 정보로 바꾸세요
// ============================================================
export const profile = {
  name: "홍길동",
  title: "데이터 분석가",
  email: "hong@example.com",
  github: "https://github.com/your-id",
  linkedin: "https://linkedin.com/in/your-id",
  heroDescription: "안녕하세요! 데이터와 사람을 연결하는 분석가입니다.",
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
];

// ============================================================
// 📋 섹션 on/off 설정
// false로 바꾸면 해당 섹션이 Career 페이지에서 사라집니다.
// ============================================================
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
  experience: [
    {
      company: "예시 회사",
      title: "시니어 분석가",
      description: "데이터 분석 및 리포트 작성",
      location: "서울",
      startDate: "2022-03",
      endDate: null,
      highlights: ["주요 성과 1", "주요 성과 2"],
    },
  ] as Position[],

  education: [
    {
      school: "예시 대학교",
      degree: "석사",
      field: "경영학",
      startYear: 2020,
      endYear: 2022,
    },
  ] as Education[],

  certifications: [] as Certification[],
  publications: [] as Publication[],
  awards: [] as Award[],
  academicProjects: [] as AcademicProject[],
  teaching: [] as TeachingExperience[],
  partTimeJobs: [] as PartTimeJob[],
  groupActivities: [] as GroupActivity[],
  mentoring: [] as MentoringExperience[],
};
