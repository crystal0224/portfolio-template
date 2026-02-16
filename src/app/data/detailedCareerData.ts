// ============================================================
// Detailed Career Data - Portfolio Platform
// 경력, 프로젝트, 교육, 자격증, 출판, 스킬 데이터
// Sources: CSV (Table 1-Grid view), LinkedIn Export, PDF 이력서
// ============================================================

// === TypeScript Interfaces ===

export interface WorkProject {
  id: number;
  year: number;
  month: number;
  category: ProjectCategory;
  title: string;
  duration: "단기" | "장기";
  type: "지원" | "연구";
  format: "보고서" | "강의" | "자격증" | "책";
  description?: string;
  url?: string;
}

export type ProjectCategory =
  | "진단"
  | "리더십"
  | "채용/퇴직"
  | "SERI CEO"
  | "CEO/HR브리프"
  | "분석방법론"
  | "강의"
  | "교육이수"
  | "제도"
  | "기타";

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
  gpa?: string;
  honors?: string;
}

export interface Certification {
  name: string;
  authority: string;
  date: string;
  licenseNumber?: string;
  url?: string;
}

export interface Publication {
  title: string;
  publishedDate: string;
  publisher: string;
  description?: string;
  url?: string;
  type: "논문" | "단행본" | "학술발표";
  authors?: string;
}

export interface Skill {
  name: string;
  category: "technical" | "domain" | "soft";
}

export interface Award {
  title: string;
  organization: string;
  date: string;
}

export interface AcademicProject {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface TeachingExperience {
  subject: string;
  institution: string;
  description: string;
  period: string;
}

export interface PartTimeJob {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface GroupActivity {
  title: string;
  date: string;
  description: string;
}

export interface MentoringExperience {
  title: string;
  organization: string;
  period: string;
  description?: string;
}

export interface ResearchExchange {
  institution: string;
  program: string;
  date: string;
}

export interface DetailedCareer {
  positions: Position[];
  education: Education[];
  certifications: Certification[];
  publications: Publication[];
  skills: Skill[];
  workProjects: WorkProject[];
  projectsByCategory: Record<ProjectCategory, WorkProject[]>;
  awards: Award[];
  academicProjects: AcademicProject[];
  teaching: TeachingExperience[];
  partTimeJobs: PartTimeJob[];
  groupActivities: GroupActivity[];
  mentoring: MentoringExperience[];
  researchExchange: ResearchExchange[];
  sgrActivitySummary: SGRActivitySummary;
}

export interface SGRActivitySummary {
  researchProjects: string[];
  diagnosticOperations: string[];
  hrInnovation: string[];
  publications: { category: string; count: number; example: string }[];
  lectures: { category: string; count: number; example: string }[];
}

// === Positions (경력) ===

export const positions: Position[] = [
  {
    company: "SK Group",
    title: "Research Fellow",
    description: "SK아카데미 | 리더십 진단팀",
    location: "서울",
    startDate: "2026-01",
    endDate: null,
  },
  {
    company: "SK Group",
    title: "Research Fellow",
    description: "SK아카데미 | 리더십 연구팀",
    location: "서울",
    startDate: "2025-01",
    endDate: "2025-12",
  },
  {
    company: "SK Group",
    title: "Research Fellow",
    description: "SK mySUNI | 행복College",
    location: "서울",
    startDate: "2024-01",
    endDate: "2024-12",
  },
  {
    company: "SK Group",
    title: "Research Fellow",
    description: "SK mySUNI | 전략기획",
    location: "서울",
    startDate: "2023-05",
    endDate: "2023-12",
  },
  {
    company: "Samsung Global Research (SGR)",
    title: "Research Fellow",
    description: "(전) 삼성경제연구소 | 인재경영연구실 People Analytics 팀",
    location: "서울",
    startDate: "2018-07",
    endDate: "2023-05",
    highlights: [
      "인사·진단 데이터 분석 기반의 인사이트 도출 (연구 7건)",
      "全관계사 리더십 진단 운영 총괄, 통합 보고서 작성, 인사팀장·CEO 보고 (2019~2021)",
      "조직문화 컨설팅 (담당사 직원·인사팀 심층 인터뷰, 인사팀장·CEO 보고, 매년)",
      "인사 제도 혁신안 기획 및 HR 테크 도입 지원",
      "CEO 대상 주간 보고서 5건, 인사팀장 대상 월간 보고서 12건",
      "인사조직 및 HR Tech 관련 영상 19건 제작",
      "관계사 임원 대상 진단 디브리핑 워크샵 강의 15건",
      "드림클래스 면접위원 강의 3건",
    ],
  },
  {
    company: "MIDAS IT Co., Ltd.",
    title: "파트장, 대리",
    description: "행복기획팀 | 경영철학 연구 및 조직문화 기획",
    location: "판교",
    startDate: "2017-03",
    endDate: "2018-06",
    highlights: [
      "마이다스아이티 경영철학 연구 (뇌신경과학, 심리학, 경영학)",
      "경영철학 기반 온오프라인 콘텐츠 기획 및 실행",
      "이론서 및 대중서 출판 (사람경영 1쇄~3쇄 출판)",
      "전사 구성원 대상 조직 문화 기획 및 실행",
    ],
  },
  {
    company: "서울대학교 사회과학대학 심리학과",
    title: "대학원 조교 (총장 발령)",
    description: "대학원 학사 및 주요 행사 진행",
    location: "서울",
    startDate: "2014-03",
    endDate: "2016-08",
    highlights: [
      "신입생 입학 공지, 서류접수, 면접 진행, 오리엔테이션",
      "재학생 학사 및 생활 관리 및 지원, 간담회 및 기타 일정 관리",
      "집담회, 콜로퀴움 등 학술행사 준비 및 진행",
      "논문 예비 발표, 논문제출자격시험, 논문심사 등 서류 관리 및 행사 진행",
    ],
  },
  {
    company: "서울대학교 심리과학연구소",
    title: "조교 (자체 직원)",
    description: "연구소 운영 관리",
    location: "서울",
    startDate: "2014-03",
    endDate: "2016-08",
    highlights: [
      "연구소 내 연구원 / 재물 관리 및 회계",
      "연구소 내 학술 행사 준비 및 진행",
      "'청소년을 위한 심리학 교실' 운영 총괄 (여름/겨울, 2박3일, 회당 450여명 고교생 참여)",
    ],
  },
  {
    company: "위즈덤 센터",
    title: "인턴 연구원",
    description:
      "연희동 소재, 황상민 (전)연세대학교 심리학과 교수 | 연구소 프로젝트 보조 및 관련 자료 정리",
    location: "서울",
    startDate: "2011-01",
    endDate: "2011-04",
    highlights: [
      "두산 인프라코어 조직 관계 개선 프로젝트 (기초 자료 조사)",
      "SK Telecom 기업 인식 개선 프로젝트 (매장 내 설문조사 및 자료 코딩)",
      "연구소 내 저작활동 기초 검토 및 자료조사",
      "홈페이지 관리 및 분석 방법론(Q-방법론) 정리",
    ],
  },
];

// === SGR Activity Summary (삼성글로벌리서치 업무 상세) ===

export const sgrActivitySummary: SGRActivitySummary = {
  researchProjects: [
    "평가공정성 인식 제고방안 연구 ('19년 관계사 성과평가 및 평가공정성 진단 데이터 분석)",
    "진단시 오류 최소 방안 연구 ('21년 아웃라이어 분석, 보정평균, 다국면 라쉬 모형을 활용)",
    "부서장 선발 및 양성을 위한 우수 리더 특성 연구 ('20년 인사·진단 데이터 통합 분석)",
    "파트장 저해행동 유형 분석 및 가이드 도출 연구 ('21년 Q 방법론 적용한 유형 분석)",
    "메타버스의 HR 활용방안 연구 ('21년 인사 각 영역별 메타버스 추천 및 도입 방안 연구)",
    "HR 트렌드 및 연구 동향 분석 연구 ('22년 해외, 국내 저널, 내부 텍스트 데이터 분석)",
    "직원 보이스 조기 센싱 연구 ('22년 관계사 사내외 게시판 고충 분석 및 탐지 모델)",
  ],
  diagnosticOperations: [
    "[리더십 진단] 全관계사 진단 운영 총괄, 통합 보고서 작성, 인사팀장·CEO 보고 ('19~'21년)",
    "진단 연계형 임원 리더십 역량개발 플랫폼 구축('18년), 프로파일 설계('19년)",
    "[조직문화 진단] 조직문화 컨설팅 (담당사 직원·인사팀 심층 인터뷰, 인사팀장·CEO 보고, 매년)",
    "[평가공정성 진단] 평가공정성 진단 결과 프로파일 개발 및 비정형 데이터 분석 사전 고도화('21년)",
    "[명상효과성 진단] 명상효과성 진단 결과 프로파일 개발, 온라인 플랫폼用 진단 도구 개발('20년)",
  ],
  hrInnovation: [
    "[채용] 블라인드 채용 도입시 우수인력 확보 방안 연구 ('18년)",
    "AI 채용 솔루션 도입 검토 및 파일럿, 평가 프로세스 및 평가모델 개발 연구('19년)",
    "비대면 환경·HR 테크 결합한 채용도구 연구('20년)",
    "AI 면접 질문 추천 시스템 개발, 면접 질문 문항 Pool 개발 ('21년)",
    "고용 브랜드 혁신 세부추진 및 관계사 확산 ('22년)",
    "[평가] 평가제도 혁신 세부실행안 설계 ('19년)",
    "[직무역량] 바이오로직스 직무역량모델 개발 및 활용 ('21년)",
  ],
  publications: [
    {
      category: "CEO 대상 주간 보고서",
      count: 5,
      example: "아시아로 확장된 구글의 구직자 교육 外",
    },
    {
      category: "인사팀장 대상 월간 보고서",
      count: 12,
      example: "2019 HR Tech 컨퍼런스: HR 기술, 어디까지 왔는가 外",
    },
  ],
  lectures: [
    {
      category: "인사조직 및 HR Tech 관련 영상",
      count: 19,
      example: "교묘한 심리적 지배 가스라이팅 外",
    },
    {
      category: "특집 영상",
      count: 2,
      example: "성공하고 있는 리더의 특징, 메타버스",
    },
    {
      category: "관계사 임원 대상 진단 디브리핑 워크샵 강의",
      count: 15,
      example: "전자 外",
    },
    {
      category: "드림클래스 면접위원 강의",
      count: 3,
      example: "평가 오류 방지 및 면접 태도 관련, 관계사 인사 담당자 대상",
    },
  ],
};

// === Education (학력) ===

export const education: Education[] = [
  {
    school: "서울대학교 (Seoul National University)",
    degree: "Ph.D",
    field: "심리학과 인지심리전공",
    startYear: 2011,
    endYear: 2017,
    notes: "석박통합과정, 이수학점 60",
    gpa: "4.18/4.30",
    honors: "주전공: 인지심리학 / 부전공: 계량심리학",
  },
  {
    school: "서울대학교 (Seoul National University)",
    degree: "Bachelor's degree",
    field: "국사학/심리학",
    startYear: 2006,
    endYear: 2011,
    notes: "이수학점 148",
    gpa: "4.13/4.30",
    honors: "석차 1/25, 최우등 졸업포상 | 주전공: 국사학 / 복수전공: 심리학",
  },
];

// === Certifications (자격증) ===

export const certifications: Certification[] = [
  {
    name: "SHRM-CP",
    authority: "SHRM",
    date: "2022",
  },
  {
    name: "사회조사분석사 2급",
    authority: "한국산업인력공단(HRD Korea)",
    date: "2020-09",
    licenseNumber: "20202013921G",
  },
  {
    name: "KAC (Korea Associate Coach)",
    authority: "(사)한국코치협회",
    date: "2022-12",
  },
  {
    name: "Global AMCP 코칭 프로그램",
    authority: "AMCP",
    date: "2022-08",
  },
  {
    name: "Facilitation Initiative",
    authority: "KOO FACILITATION GROUP (쿠퍼실리테이션 그룹)",
    date: "2021-12",
  },
  {
    name: "MOS Specialist (Excel, Word, PPT, Outlook)",
    authority: "마이크로소프트",
    date: "2015-12",
  },
  {
    name: "Positive Psychology",
    authority: "Coursera",
    date: "2022-09",
  },
  {
    name: "Managing as a Coach",
    authority: "Coursera",
    date: "2022-10",
  },
  {
    name: "Coaching for Transformational Leadership",
    authority: "The Arbinger Institute",
    date: "2022-09",
    licenseNumber: "ACPK01122",
  },
  {
    name: "The HR Tech Workshop",
    authority: "Josh Bersin Academy",
    date: "2022-11",
  },
  {
    name: "Human-Centered Leadership",
    authority: "Josh Bersin Academy",
    date: "2022-11",
  },
  {
    name: "Heyjoyce MBA Course",
    authority: "heyjoyce",
    date: "2022-12",
  },
  {
    name: "ACT of Compassion 워크샵",
    authority: "서울 수용과 전념 치료 연구소",
    date: "2022-11",
    url: "www.kactcenter.com",
  },
  {
    name: "Zapier로 노코드 업무자동화 인프런 교육 수료",
    authority: "인프런",
    date: "2022-07",
  },
];

// === Publications (출판물 - 논문, 단행본, 학술발표) ===

export const publications: Publication[] = [
  // 박사 학위 논문
  {
    title:
      "학습자가 만든 탐색적 질문에 대한 평가가 질문의 양과 질에 미치는 영향",
    publishedDate: "2017-02-24",
    publisher: "서울대학교",
    description: "박사 학위 논문",
    url: "https://hdl.handle.net/10371/120431",
    type: "논문",
    authors: "배수정",
  },
  // 학술 논문
  {
    title: "학습 방식과 학습 목표가 학습 후 질문과 이해도에 미치는 영향",
    publishedDate: "2016-06-01",
    publisher: "한국심리학회지: 인지 및 생물, 28(3), 517-541",
    url: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002129875",
    type: "논문",
    authors: "배수정, 박주용",
  },
  {
    title:
      "대학 수업에서 누적 동료평가 점수를 활용한 성적 산출 방법의 타당성",
    publishedDate: "2016-03-01",
    publisher: "인지과학, 27(2), 221-245",
    url: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002120781",
    type: "논문",
    authors: "배수정, 박주용",
  },
  // 단행본
  {
    title: "똑똑! 인지과학 문을 열다",
    publishedDate: "2016",
    publisher: "메디치연구소",
    description: "심리학 파트 집필",
    type: "단행본",
    authors: "장병탁 외",
  },
  {
    title: "HR 테크 혁명",
    publishedDate: "2022-08-30",
    publisher: "삼성글로벌리서치",
    description: "People Analytics Team 공동저서, 채용 파트 집필",
    url: "https://www.ypbooks.co.kr/m_detail_view.yp?code=101191112&gubun=NM",
    type: "단행본",
    authors: "People Analytics 팀",
  },
  // 학술발표
  {
    title: "Peer Assessment of Student Generated Questions",
    publishedDate: "2016",
    publisher: "Psychonomic Society: 57th Annual Meeting in Boston",
    type: "학술발표",
    authors: "Soojeong Bae, Jooyong Park",
  },
  {
    title:
      "지식습득 조건에 따른 학습자 질문 생성의 차이: 더 좋은 질문을 만들어내기 위한 조건 탐색",
    publishedDate: "2016",
    publisher:
      "2016학년도 한국 인지및생물 연차학술대회, 한국심리학회:인지및생물",
    type: "학술발표",
    authors: "배수정, 박주용",
  },
  {
    title: "단순화된 논증 검사의 개발과 적용",
    publishedDate: "2015",
    publisher:
      "2015학년도 한국 인지및생물 연차학술대회, 한국심리학회:인지및생물",
    type: "학술발표",
    authors: "배수정, 박주용",
  },
  {
    title: "대학생들의 강의에 대한 생각: S대와 H대를 중심으로",
    publishedDate: "2014",
    publisher: "2014년 한국교육심리학회 4차/연차 학술대회, 한국교육심리학회",
    type: "학술발표",
    authors: "배수정, 박주용",
  },
];

// === Awards (수상) ===

export const awards: Award[] = [
  {
    title: "특별승호",
    organization: "마이다스아이티",
    date: "2018-01",
  },
  {
    title: "최우등 졸업 포상",
    organization: "서울대학교",
    date: "2011-02",
  },
  {
    title: "핵심교양수업 우수리포트 선정",
    organization: "서울대학교 교수학습개발센터",
    date: "2007-02",
  },
];

// === Academic / Research Projects (학술 프로젝트) ===

export const academicProjects: AcademicProject[] = [
  {
    title: "학이사사이학(學而思, 思而學)",
    organization: "아산사회복지재단",
    startDate: "2012-07",
    endDate: "2014-01",
    description: "대학교육의 현황 탐색 및 개선안 모색",
  },
  {
    title: "대학교육과 학습에 대한 연구",
    organization: "서울대학교 사회과학대학",
    startDate: "2013-09",
    endDate: "2014-02",
    description: "설문 구성 및 진행, 연구보조",
  },
  {
    title: "POLLME의 대학수업에의 적용가능성 탐색 연구",
    organization: "SK-Telecom",
    startDate: "2012-09",
    endDate: "2012-11",
    description:
      "보고서명: 스마트폰을 이용한 학생 반응 시스템의 사용가능성 검증. Pollme 교육자료 검토 및 배포, 현장 실습, 교수자 안내",
  },
  {
    title: '태블릿 기반 수학 애플리케이션 개발 "시험으로 공부하기"',
    organization: "SK-Telecom",
    startDate: "2012-01",
    endDate: "2014-04",
    description: "학년별 Big question과 가능한 UI 제안, 관련 정보 탐색",
  },
  {
    title: "Nagoya University Partnership Exchange Program",
    organization:
      "Nagoya University Graduate School of Education and Human Development",
    startDate: "2012-01",
    endDate: "2012-01",
    description: "연구교류 프로그램",
  },
  {
    title: "실험참여시스템(R-point) 도입 및 관리",
    organization: "서울대학교 사회과학대학 심리학과",
    startDate: "2012-07",
    endDate: "2013-02",
    description:
      "초기 시스템 도입 과정 진행, 운영 규칙 및 시스템 셋업, 학생용/관리자용 교육자료 제작 및 홍보, 최종 보고서 작성 및 공유",
  },
];

// === Teaching Experience (강의 경험) ===

export const teaching: TeachingExperience[] = [
  {
    subject: "심리학개론 - 인지와 사고 파트",
    institution: "서울대학교 일반교양",
    description: "총 6회 강의",
    period:
      "14년 2학기, 15년 1학기, 15년 2학기, 16년 1학기, 16년 2학기, 17년 2학기",
  },
  {
    subject: "마음의 탐구 TA",
    institution: "서울대학교 학부 핵심교양",
    description: "좌석배치, 출석체크, 과제채점, 시험진행, 점수화",
    period: "2012-07 ~ 2014-02",
  },
];

// === Part-time Job Experience (파트타임 경력) ===

export const partTimeJobs: PartTimeJob[] = [
  {
    title: "관리자 (상시 업무), 실험참여시스템(R-point)",
    organization: "서울대학교 사회과학대학 심리학과",
    startDate: "2012-07",
    endDate: "2013-02",
    description:
      "초기 시스템 도입 과정 진행, 운영 규칙 및 시스템 셋업, 학생용/관리자용 교육자료 제작 및 홍보, 학생/교수자 시스템 사용 지원 보조, 최종 보고서 작성 및 공유",
  },
  {
    title: "박사급 보조연구원 (주 2회 출근), 한국콘텐츠진흥원 정책연구실 통계정보팀",
    organization: "한국콘텐츠진흥원",
    startDate: "2013-09",
    endDate: "2013-12",
    description:
      "콘텐츠 시장 분석 및 보고 업무 보조. 국내 및 해외콘텐츠시장 동향조사, 원내 통계자료 검토 및 분석, 자료 해외 콘텐츠 보고 자료 번역",
  },
  {
    title: "스토리보드 제작 (재택근무), KT innoedu 전략콘텐츠본부 (이전 Cyber MBA)",
    organization: "KT innoedu",
    startDate: "2012-09",
    endDate: "2013-12",
    description:
      "온종일 MBA 교육을 위한 스토리보드 변환작업 (원교 → PPT 보조직). 관련: 마케팅 / 경영통계 / 인사의 사고 / 경영통계개 2 / 소비트웰라 워드로 작성한 원교를 보면서 이미지 심입 및 맨트 수정 및 프레임 구성하는 역할 (각 과목당 20차시 / 1차시당 약 1시간 수업 분량)",
  },
  {
    title: "논술 1:1 첨삭 강사 (주 1회 학교 방문), Top edu 대일외국어고등학교, 명덕외국어고등학교",
    organization: "Top edu",
    startDate: "2011-06",
    endDate: "2011-12",
    description:
      "논제에 따라 작성된 학생들의 논술 과제를 첨삭 후 1:1 로 학생들을 지도하는 업무. 매주 20명 정도의 학생들 논술과제를 첨삭하고, 온라인으로 해당사항을 제출 후 오프라인으로 학생 면담",
  },
  {
    title: "근로장학생 (사사업무), 서울대학교 인문대학 국사학과 자료실",
    organization: "서울대학교 국사학과",
    startDate: "2009-03",
    endDate: "2010-02",
    description:
      "자료실 역사 고문서 관리 및 도서대출업무. 문헌 입고 및 시각정보 입력, 국사학과 소장 도서 대출 및 반납 업무",
  },
  {
    title: "근로장학생 (전산관리업무), 서울대학교 인문대학 전산실",
    organization: "서울대학교 인문대학",
    startDate: "2007-03",
    endDate: "2009-02",
    description:
      "인문대학 6층 1종 전산실 30 여대 컴퓨터 관리 및 출력 업무 보조. 컴퓨터 전원 및 시스템 관리, 고장 및 장애 처리, 전산실 위생 및 보안 담당",
  },
];

// === Group Activities (그룹 활동) ===

export const groupActivities: GroupActivity[] = [
  {
    title: "McKinsey Korea \"Problem solving Bootcamp\"",
    date: "2016-08",
    description:
      "문제해결 이론 공유 및 컨설팅 케이스 스터디, 마케팅 케이스스터디 팀별 경진 1위",
  },
  {
    title: "CULP 문화마케팅 연합동아리",
    date: "2010-09 ~ 2011-02",
    description: "대학생 문화 컨텐츠 개발을 위한 아이디어 공유 및 팀별 경진",
  },
  {
    title: "여성가족부, 2010 international youth exchange : 한국-베트남 국가간 문화 교류",
    date: "2010-03 ~ 2010-05",
    description:
      "청소년 대표단 12인 중 1명으로 선발되어, 한국문화 소개 및 베트남 문화 체험과 교류활동",
  },
  {
    title: "동북아역사재단, 항일유적지 탐방단 \"인증근장군 항일유적지를 찾아서\"",
    date: "2009-07 ~ 2009-08",
    description:
      "중국, 러시아 지역 안중근 장군 유적지 탐방 및 역사 자료 이해를 위한 자료집 출간",
  },
  {
    title: "서울대학교 인문대학 국사학과, 국사학과 학술답사 준비위원회 총무단",
    date: "2009-03 ~ 2009-04",
    description:
      "학부생 답사를 위한, 유적지 조사 및 일정 계획, 활동 준비, 자료집 출간",
  },
];

// === Mentoring Experience (멘토링 및 첨삭 경험) ===

export const mentoring: MentoringExperience[] = [
  {
    title: "구리시 진로체험 프로그램 멘토링",
    organization: "구리시",
    period: "2012-09",
    description: "심리학 진로 교육자료 제작",
  },
  {
    title: "서울대학교 자유전공학부 12학번 심리학 전공 멘토링",
    organization: "서울대학교",
    period: "2012-07 ~ 2012-08",
    description: "심리학 전공 소개 및 개인별 탐라",
  },
  {
    title: "서울대학교 심리학과 신입생 멘토링",
    organization: "서울대학교",
    period: "2012-03 ~ 2012-06",
    description: "학과 오리엔테이션 및 진로 연구활동 지원",
  },
  {
    title: "중앙일보교육법인 서초구 '공부의 신' 캠프 멘토링",
    organization: "중앙일보교육법인",
    period: "2011-01 ~ 2011-06",
    description: "초중등학생 대상 학습 컨설팅 캠프 활동 지도",
  },
  {
    title: "조선일보 '맛있는 역사캠프' 보조교사",
    organization: "조선일보",
    period: "2010-05 ~ 2010-06",
    description: "역사 유적지 탐방 및 초등학생 대상 설명",
  },
  {
    title: "(주)EBS 고등학교 '사회문화' 교재 최종 학생검수단",
    organization: "EBS",
    period: "2009-08 ~ 2009-09",
    description: "교재 편고 내용 검토 및 오탈자 확인",
  },
  {
    title: "스터디코드: 조남호 대표, studycode.net",
    organization: "studycode.net",
    period: "2008-03 ~ 2008-09",
    description: "학습법 상담 온라인 코치 활동 / 교육 자료 제작",
  },
  {
    title: "(주)이투스 누드교과서 '한국사' 학생저자 집필단",
    organization: "이투스",
    period: "2007-03 ~ 2007-08",
    description: "원교 작성 및 이미지 콘티 작성",
  },
];

// === Research Exchange (연구교류) ===

export const researchExchange: ResearchExchange[] = [];

// === Skills (스킬) ===

export const skills: Skill[] = [
  // AI & Machine Learning (PandasAI, HybridRAG, 토픽모델링 등 AI 프로젝트 다수)
  { name: "GenAI (Claude, OpenAI)", category: "technical" },
  { name: "RAG (Retrieval-Augmented Generation)", category: "technical" },
  { name: "NLP (자연어처리)", category: "technical" },
  { name: "토픽모델링", category: "technical" },
  { name: "텍스트 마이닝", category: "technical" },

  // Programming & Development (GitHub 15개, HuggingFace 10개 프로젝트)
  { name: "Python", category: "technical" },
  { name: "Streamlit", category: "technical" },
  { name: "Gradio", category: "technical" },
  { name: "Flask", category: "technical" },
  { name: "Next.js", category: "technical" },
  { name: "TypeScript", category: "technical" },

  // Data Science & Analytics (통계 분석 및 연구방법론 전문)
  { name: "데이터 분석", category: "technical" },
  { name: "통계 분석", category: "technical" },
  { name: "Q-방법론", category: "technical" },
  { name: "다국면 라쉬 모형", category: "technical" },
  { name: "데이터 시각화", category: "technical" },

  // Tools & Platforms (일상 업무 및 인프라)
  { name: "Tableau", category: "technical" },
  { name: "MS Excel", category: "technical" },
  { name: "PowerPoint", category: "technical" },
  { name: "PostgreSQL", category: "technical" },
  { name: "Redis", category: "technical" },
  { name: "Docker", category: "technical" },

  // HR & People Analytics (SK아카데미 주요 직무)
  { name: "People Analytics", category: "domain" },
  { name: "리더십 진단", category: "domain" },
  { name: "역량 평가", category: "domain" },
  { name: "다면 진단", category: "domain" },
  { name: "조직 효과성 진단", category: "domain" },
  { name: "석세션 플래닝", category: "domain" },
  { name: "HR Analytics", category: "domain" },

  // Psychology & Research (학위 배경: 인지심리학 박사)
  { name: "인지심리학", category: "domain" },
  { name: "계량심리학", category: "domain" },
  { name: "조직심리학", category: "domain" },
  { name: "연구방법론", category: "domain" },

  // Facilitation & Consulting (워크샵 디자인 및 코칭 경험)
  { name: "워크샵 디자인", category: "soft" },
  { name: "퍼실리테이션", category: "soft" },
  { name: "코칭", category: "soft" },
  { name: "인터뷰 기법", category: "soft" },
  { name: "교육 설계", category: "soft" },
];

// === Work Projects (93개 업무 프로젝트 - 연도/월 시간순 정렬) ===
// description 필드에 PDF 이력서에서 추출한 상세 설명 추가

export const workProjects: WorkProject[] = [
  // ── 2018 ──
  {
    id: 1,
    year: 2018,
    month: 9,
    category: "CEO/HR브리프",
    title: "선제적인 대책이 필요한 직장 내 외로움",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 2,
    year: 2018,
    month: 10,
    category: "CEO/HR브리프",
    title: "아마존의 알렉사 펠로우십",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 3,
    year: 2018,
    month: 11,
    category: "채용/퇴직",
    title: "블라인드 채용 도입시 우수인력 확보방안 연구",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "블라인드 채용 도입시 우수인력 확보 방안 연구",
  },
  {
    id: 4,
    year: 2018,
    month: 11,
    category: "진단",
    title: "명상효과성 진단결과 리포트 개발",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "명상효과성 진단 결과 프로파일 개발",
  },
  {
    id: 5,
    year: 2018,
    month: 11,
    category: "진단",
    title: "SCI 진단 (재단, 에스원)",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 6,
    year: 2018,
    month: 11,
    category: "채용/퇴직",
    title: "우수인재 발굴 및 확보 강화",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 7,
    year: 2018,
    month: 11,
    category: "채용/퇴직",
    title: "AI채용 솔루션 도입 검토 및 파일럿",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "AI 채용 솔루션 도입 검토 및 파일럿, 평가 프로세스 및 평가모델 개발 연구",
  },
  {
    id: 8,
    year: 2018,
    month: 11,
    category: "SERI CEO",
    title: "실패로 성장하라! 포스트모템 회의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 9,
    year: 2018,
    month: 12,
    category: "CEO/HR브리프",
    title: "최고 리더급 임원을 양성하는 아마존의 Shadow Advisor",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },

  // ── 2019 ──
  {
    id: 10,
    year: 2019,
    month: 1,
    category: "SERI CEO",
    title: "고충 처리 전담반, AI 챗봇",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 11,
    year: 2019,
    month: 2,
    category: "CEO/HR브리프",
    title: "HR 부서의 AI 사업화 지원을 위한 3대 전략",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 12,
    year: 2019,
    month: 4,
    category: "SERI CEO",
    title: "면접 미투' 조심하세요!",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 13,
    year: 2019,
    month: 4,
    category: "진단",
    title: "그룹 리더십 다면진단 실시 / SDS 전자, 리조트 웰스토리",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "全관계사 진단 운영 총괄, 통합 보고서 작성, 인사팀장·CEO 보고",
  },
  {
    id: 14,
    year: 2019,
    month: 5,
    category: "분석방법론",
    title: "평가공정성 인식의 제고 방안 _평가자의 맥락 분석과 활용을 중심으로",
    duration: "장기",
    type: "연구",
    format: "보고서",
    description: "관계사 성과평가 및 평가공정성 진단 데이터 분석",
  },
  {
    id: 15,
    year: 2019,
    month: 5,
    category: "제도",
    title: "평가제도 혁신 세부실행안 설계",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 16,
    year: 2019,
    month: 5,
    category: "채용/퇴직",
    title: "AI기반 우수인재 채용 증진방안 연구 및 적용",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "AI 채용 솔루션 도입 검토 및 파일럿, 평가 프로세스 및 평가모델 개발 연구",
  },
  {
    id: 17,
    year: 2019,
    month: 5,
    category: "리더십",
    title: "임원 리더십 역량개발 플랫폼 (E-Campus) 구축",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "진단 연계형 임원 리더십 역량개발 플랫폼 구축, 프로파일 설계",
  },
  {
    id: 18,
    year: 2019,
    month: 6,
    category: "SERI CEO",
    title: "부동산 시장, 이제 프롭테크로 통한다",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 19,
    year: 2019,
    month: 6,
    category: "CEO/HR브리프",
    title: "맥킨지가 말하는 3가지 채용 프로세스 개선 포인트",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 20,
    year: 2019,
    month: 7,
    category: "SERI CEO",
    title: "무의미한 회의를 없애려면?",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 21,
    year: 2019,
    month: 8,
    category: "SERI CEO",
    title: "인정'받는 직원이 멋지게 일한다",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 22,
    year: 2019,
    month: 8,
    category: "CEO/HR브리프",
    title: "HR Analytics 트렌드(조직문화)",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 23,
    year: 2019,
    month: 8,
    category: "강의",
    title: "삼성SDS 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 24,
    year: 2019,
    month: 8,
    category: "강의",
    title: "전자 SR 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 25,
    year: 2019,
    month: 8,
    category: "강의",
    title: "전자 SET 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 26,
    year: 2019,
    month: 8,
    category: "강의",
    title: "중공업 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 27,
    year: 2019,
    month: 9,
    category: "강의",
    title: "엔지니어링 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 28,
    year: 2019,
    month: 9,
    category: "강의",
    title: "전자 무선사업부 보직장 대상 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 29,
    year: 2019,
    month: 10,
    category: "강의",
    title: "리조트 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 30,
    year: 2019,
    month: 10,
    category: "강의",
    title: "웰스토리 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 31,
    year: 2019,
    month: 11,
    category: "채용/퇴직",
    title: "관계사 공통 AI 신입채용 평가모델 및 프로세스 개선방안 연구",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 32,
    year: 2019,
    month: 11,
    category: "채용/퇴직",
    title: "전자 신입채용 AI솔루션 도입",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 33,
    year: 2019,
    month: 12,
    category: "SERI CEO",
    title: "직원의 '월급텅장'을 책임지다",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 34,
    year: 2019,
    month: 12,
    category: "CEO/HR브리프",
    title: "2019 HR Tech 콘퍼런스: HR 기술, 어디까지 왔는가",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },

  // ── 2020 ──
  {
    id: 35,
    year: 2020,
    month: 1,
    category: "SERI CEO",
    title: "매력적인 EVP로 인재를 잡아라",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 36,
    year: 2020,
    month: 3,
    category: "SERI CEO",
    title: "힐튼 리더들은 모바일로 OO받는다",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 37,
    year: 2020,
    month: 3,
    category: "진단",
    title: "리더십 다면진단 개선",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 38,
    year: 2020,
    month: 5,
    category: "CEO/HR브리프",
    title: "MS, 오픈 데이터 캠페인에 참여",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 39,
    year: 2020,
    month: 5,
    category: "진단",
    title: "평가공정성 결과리포트 및 비정형사전 고도화",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "평가공정성 진단 결과 프로파일 개발 및 비정형 데이터 분석 사전 고도화",
  },
  {
    id: 40,
    year: 2020,
    month: 5,
    category: "SERI CEO",
    title: "코로나19, 재택근무 기술을 깨우다",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 41,
    year: 2020,
    month: 8,
    category: "CEO/HR브리프",
    title: "아시아로 확장된 구글의 구직자 교육",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 42,
    year: 2020,
    month: 8,
    category: "진단",
    title: "SCI 신모델 구축",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 43,
    year: 2020,
    month: 9,
    category: "진단",
    title: "그룹 리더십 다면진단 실시",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 44,
    year: 2020,
    month: 9,
    category: "SERI CEO",
    title: "인재 활용 최적화 전략, 인터널 모빌리티",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 45,
    year: 2020,
    month: 9,
    category: "강의",
    title: "SDS 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 46,
    year: 2020,
    month: 9,
    category: "강의",
    title: "제일기획 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 47,
    year: 2020,
    month: 9,
    category: "강의",
    title: "전자 네트워크 사업부 리더십 진단 디브리핑 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 48,
    year: 2020,
    month: 9,
    category: "교육이수",
    title: "사회조사분석사2급",
    duration: "단기",
    type: "연구",
    format: "자격증",
  },
  {
    id: 49,
    year: 2020,
    month: 10,
    category: "채용/퇴직",
    title: "직무성향평가(Gamification) 확대",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 50,
    year: 2020,
    month: 10,
    category: "SERI CEO",
    title: "직원들의 코로나 블루를 잡아라!",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 51,
    year: 2020,
    month: 11,
    category: "채용/퇴직",
    title: "비대면 수험환경에 최적화된 차세대 신입채용도구 연구",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "비대면 환경·HR 테크 결합한 채용도구 연구",
  },
  {
    id: 52,
    year: 2020,
    month: 11,
    category: "CEO/HR브리프",
    title: "넷플릭스가 성과급 없이도 혁신을 유지할 수 있는 이유",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 53,
    year: 2020,
    month: 11,
    category: "진단",
    title: "삼성 리더십 다면진단 개선",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 54,
    year: 2020,
    month: 11,
    category: "진단",
    title: "SCI 진단 (패션, 화재)",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 55,
    year: 2020,
    month: 11,
    category: "리더십",
    title: "부서장 선발 및 양성을 위한 우수 리더 특성 연구",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "인사·진단 데이터 통합 분석을 통한 우수 리더 특성 연구",
  },

  // ── 2021 ──
  {
    id: 56,
    year: 2021,
    month: 3,
    category: "CEO/HR브리프",
    title: "코로나19로 인해 달라질 인재 확보 전략",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 57,
    year: 2021,
    month: 4,
    category: "SERI CEO",
    title: "HR에도 역주행이 있다!?",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 58,
    year: 2021,
    month: 4,
    category: "분석방법론",
    title: "진단시 오류 최소 방안에 대한 연구 : 평가자 오류를 중심으로",
    duration: "장기",
    type: "연구",
    format: "보고서",
    description: "아웃라이어 분석, 보정평균, 다국면 라쉬 모형을 활용한 진단 오류 최소화 연구",
  },
  {
    id: 59,
    year: 2021,
    month: 4,
    category: "SERI CEO",
    title: "삼성에서 성공하고 있는 임원/부서장은 무엇이 다른가?",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 60,
    year: 2021,
    month: 5,
    category: "진단",
    title: "온라인 플랫폼용 명상효과성 진단 툴 개발",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "온라인 플랫폼用 진단 도구 개발",
  },
  {
    id: 61,
    year: 2021,
    month: 5,
    category: "제도",
    title: "SBL 직무역량모델 개발 및 활용",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "바이오로직스 직무역량모델 개발 및 활용",
  },
  {
    id: 62,
    year: 2021,
    month: 5,
    category: "진단",
    title: "그룹 평가공정성 진단 도입·지원",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 63,
    year: 2021,
    month: 7,
    category: "SERI CEO",
    title: "교묘한 심리적 지배 가스라이팅, 우리 조직에도?",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 64,
    year: 2021,
    month: 7,
    category: "CEO/HR브리프",
    title: "아마존이 비대면 환경에서 온보딩을 지원하는 방법",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 65,
    year: 2021,
    month: 8,
    category: "SERI CEO",
    title: "신입사원을 사로잡을 버츄얼 온보딩",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 66,
    year: 2021,
    month: 8,
    category: "CEO/HR브리프",
    title: "아마존, 최대 규모의 글로벌 인턴십 진행",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 67,
    year: 2021,
    month: 9,
    category: "채용/퇴직",
    title: "관계사 퇴직현황 분석 및 시사점 도출",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 68,
    year: 2021,
    month: 9,
    category: "진단",
    title: "2021년 그룹 리더십 다면진단 실시 / 중공업 웰스토리 카드 리조트 건설 생명 화재 자산운용",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 69,
    year: 2021,
    month: 9,
    category: "CEO/HR브리프",
    title: "베조스가 남긴 마지막 당부: 2가지 리더십 원칙",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 70,
    year: 2021,
    month: 9,
    category: "SERI CEO",
    title: "마키아벨리즘을 주의하라",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 71,
    year: 2021,
    month: 10,
    category: "분석방법론",
    title: "파트장 저해행동 유형 분석 및 가이드 도출",
    duration: "장기",
    type: "연구",
    format: "보고서",
    description: "Q 방법론 적용한 유형 분석",
  },
  {
    id: 72,
    year: 2021,
    month: 11,
    category: "SERI CEO",
    title: "팬데믹이 불러온 채용 혁신, 글로벌 인재를 잡아라!",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 73,
    year: 2021,
    month: 11,
    category: "제도",
    title: "메타버스의 HR활용방안 연구",
    duration: "장기",
    type: "연구",
    format: "보고서",
    description: "인사 각 영역별 메타버스 추천 및 도입 방안 연구",
  },
  {
    id: 74,
    year: 2021,
    month: 11,
    category: "진단",
    title: "SCI 진단 (로직스)",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 75,
    year: 2021,
    month: 11,
    category: "채용/퇴직",
    title: "AI 면접질문 추천 시스템 개발",
    duration: "장기",
    type: "지원",
    format: "보고서",
    description: "AI 면접 질문 추천 시스템 개발, 면접 질문 문항 Pool 개발",
  },
  {
    id: 76,
    year: 2021,
    month: 12,
    category: "CEO/HR브리프",
    title: "시티가 전망한 주택의 미래, '탄소중립주택'",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 77,
    year: 2021,
    month: 12,
    category: "교육이수",
    title: "퍼실리테이션",
    duration: "단기",
    type: "지원",
    format: "자격증",
  },

  // ── 2022 ──
  {
    id: 78,
    year: 2022,
    month: 1,
    category: "기타",
    title: "재단 사업 사회인식 조사",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 79,
    year: 2022,
    month: 2,
    category: "CEO/HR브리프",
    title: "포스트 코로나 시대의 리더십 방향과 과제",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 80,
    year: 2022,
    month: 2,
    category: "SERI CEO",
    title: "보상, 어디까지 투명해야 할까?",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 81,
    year: 2022,
    month: 3,
    category: "CEO/HR브리프",
    title: "알파벳, 자회사의 HR운영 전략 다각화 시도",
    duration: "단기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 82,
    year: 2022,
    month: 4,
    category: "제도",
    title: "업종별 맞춤형 인사제도 설계",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 83,
    year: 2022,
    month: 5,
    category: "분석방법론",
    title: "HR 트렌드 및 연구 동향 분석",
    duration: "장기",
    type: "연구",
    format: "보고서",
    description: "해외, 국내 저널, 내부 텍스트 데이터 분석",
  },
  {
    id: 84,
    year: 2022,
    month: 5,
    category: "채용/퇴직",
    title: "S/W 우수인재 유실방지를 위한 이직예측 모델 개발",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 85,
    year: 2022,
    month: 5,
    category: "채용/퇴직",
    title: "고용 브랜드 혁신 세부추진 및 관계사 확산",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 86,
    year: 2022,
    month: 5,
    category: "리더십",
    title: "삼성형 리더상 재정비",
    duration: "장기",
    type: "지원",
    format: "보고서",
  },
  {
    id: 87,
    year: 2022,
    month: 7,
    category: "SERI CEO",
    title: "이런 말은 꼭 피하세요! 리더의 대화법",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 88,
    year: 2022,
    month: 7,
    category: "강의",
    title: "삼성중공업 임원 리더십 워크샵 강의",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 89,
    year: 2022,
    month: 7,
    category: "분석방법론",
    title: "직원보이스 조기 센싱",
    duration: "장기",
    type: "연구",
    format: "보고서",
    description: "관계사 사내외 게시판 고충 분석 및 탐지 모델",
  },
  {
    id: 90,
    year: 2022,
    month: 7,
    category: "교육이수",
    title: "Zapier로 노코드 업무자동화 인프런 교육 수료",
    duration: "단기",
    type: "연구",
    format: "자격증",
  },
  {
    id: 91,
    year: 2022,
    month: 8,
    category: "SERI CEO",
    title: "메타버스, 교육을 부탁해",
    duration: "단기",
    type: "지원",
    format: "강의",
  },
  {
    id: 92,
    year: 2022,
    month: 8,
    category: "교육이수",
    title: "Global AMCP 코칭 프로그램",
    duration: "장기",
    type: "연구",
    format: "자격증",
  },
  {
    id: 93,
    year: 2022,
    month: 9,
    category: "기타",
    title: "HR테크혁명",
    duration: "장기",
    type: "연구",
    format: "책",
    url: "http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788976331205&orderClick=LEa&Kc=",
  },
];

// === Category Grouping (카테고리별 프로젝트) ===

function groupByCategory(
  projects: WorkProject[]
): Record<ProjectCategory, WorkProject[]> {
  const categories: ProjectCategory[] = [
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
  ];

  const grouped = {} as Record<ProjectCategory, WorkProject[]>;
  for (const cat of categories) {
    grouped[cat] = projects.filter((p) => p.category === cat);
  }
  return grouped;
}

export const projectsByCategory = groupByCategory(workProjects);

// === Summary Statistics (통계) ===

export const careerSummary = {
  totalProjects: workProjects.length,
  yearRange: {
    start: 2018,
    end: 2022,
  },
  categoryCounts: Object.entries(projectsByCategory).reduce(
    (acc, [cat, projects]) => {
      acc[cat as ProjectCategory] = projects.length;
      return acc;
    },
    {} as Record<ProjectCategory, number>
  ),
  formatCounts: {
    보고서: workProjects.filter((p) => p.format === "보고서").length,
    강의: workProjects.filter((p) => p.format === "강의").length,
    자격증: workProjects.filter((p) => p.format === "자격증").length,
    책: workProjects.filter((p) => p.format === "책").length,
  },
  durationCounts: {
    단기: workProjects.filter((p) => p.duration === "단기").length,
    장기: workProjects.filter((p) => p.duration === "장기").length,
  },
};

// === Combined Export ===

export const detailedCareerData: DetailedCareer = {
  positions,
  education,
  certifications,
  publications,
  skills,
  workProjects,
  projectsByCategory,
  awards,
  academicProjects,
  teaching,
  partTimeJobs,
  groupActivities,
  mentoring,
  researchExchange,
  sgrActivitySummary,
};
