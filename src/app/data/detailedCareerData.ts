// Stub: re-exports types from config.ts. Will be deleted by Task 5.
export type {
  Position,
  Education,
  Certification,
  Award,
  Publication,
  AcademicProject,
  TeachingExperience,
  PartTimeJob,
  GroupActivity,
  MentoringExperience,
} from "../../config";

// Types not in config.ts yet - stub definitions
export interface WorkProject {
  id: string;
  title: string;
  company: string;
  period: string;
  category: string;
  description: string;
  tags?: string[];
  highlights?: string[];
}

export interface Skill {
  name: string;
  category: string;
  level?: number;
}

export interface ResearchExchange {
  title: string;
  organization: string;
  period: string;
  description?: string;
}

export type ProjectCategory = string;

export const sgrActivitySummary: any = {};
