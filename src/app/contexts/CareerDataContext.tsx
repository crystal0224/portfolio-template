// Stub: Firebase career data removed. Will be replaced by Task 5.
import { careerData } from "../../config";
import type {
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

export type WithId<T> = T & { _id: string };

interface CollectionOps<T> {
  items: WithId<T>[];
  reorder: (ids: string[]) => void;
  add: (item: T) => Promise<void>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  remove: (id: string) => void;
}

function makeCollection<T>(data: T[]): CollectionOps<T> {
  const items = data.map((d, i) => ({ ...d, _id: String(i) })) as WithId<T>[];
  return {
    items,
    reorder: () => {},
    add: async () => {},
    update: async () => {},
    remove: () => {},
  };
}

export interface CareerDataContextType {
  positions: CollectionOps<Position>;
  education: CollectionOps<Education>;
  certifications: CollectionOps<Certification>;
  awards: CollectionOps<Award>;
  publications: CollectionOps<Publication>;
  academicProjects: CollectionOps<AcademicProject>;
  teaching: CollectionOps<TeachingExperience>;
  partTimeJobs: CollectionOps<PartTimeJob>;
  groupActivities: CollectionOps<GroupActivity>;
  mentoring: CollectionOps<MentoringExperience>;
  workProjects: CollectionOps<any>;
  skills: CollectionOps<any>;
  researchExchanges: CollectionOps<any>;
}

export function useCareerDataContext(): CareerDataContextType {
  return {
    positions: makeCollection(careerData.experience),
    education: makeCollection(careerData.education),
    certifications: makeCollection(careerData.certifications),
    awards: makeCollection(careerData.awards),
    publications: makeCollection(careerData.publications),
    academicProjects: makeCollection(careerData.academicProjects),
    teaching: makeCollection(careerData.teaching),
    partTimeJobs: makeCollection(careerData.partTimeJobs),
    groupActivities: makeCollection(careerData.groupActivities),
    mentoring: makeCollection(careerData.mentoring),
    workProjects: makeCollection([]),
    skills: makeCollection([]),
    researchExchanges: makeCollection([]),
  };
}
