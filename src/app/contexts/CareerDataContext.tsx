"use client";

import { createContext, useContext, useCallback, ReactNode } from "react";
import {
  Position,
  Education,
  Certification,
  Publication,
  Skill,
  Award,
  AcademicProject,
  TeachingExperience,
  PartTimeJob,
  GroupActivity,
  MentoringExperience,
  ResearchExchange,
  WorkProject,
} from "../data/detailedCareerData";
import { useFirestore } from "../hooks/useFirestore";

// Items with string IDs for CRUD operations
export type WithId<T> = T & { _id: string };

// CRUD functions type for a section
interface SectionCRUD<T> {
  items: WithId<T>[];
  add: (item: T) => Promise<void>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  reorder: (oldIndex: number, newIndex: number) => Promise<void>;
}

export interface CareerDataContextType {
  positions: SectionCRUD<Position>;
  education: SectionCRUD<Education>;
  certifications: SectionCRUD<Certification>;
  publications: SectionCRUD<Publication>;
  skills: SectionCRUD<Skill>;
  awards: SectionCRUD<Award>;
  academicProjects: SectionCRUD<AcademicProject>;
  teaching: SectionCRUD<TeachingExperience>;
  partTimeJobs: SectionCRUD<PartTimeJob>;
  groupActivities: SectionCRUD<GroupActivity>;
  mentoring: SectionCRUD<MentoringExperience>;
  researchExchange: SectionCRUD<ResearchExchange>;
  workProjects: SectionCRUD<WorkProject>;
}

const CareerDataContext = createContext<CareerDataContextType | undefined>(undefined);

// Adapter hook: wraps useFirestore to match the SectionCRUD interface
function useFirestoreSection<T extends Record<string, any>>(
  collectionName: string
): SectionCRUD<T> {
  const firestore = useFirestore<WithId<T>>(collectionName, { orderByField: "order" });

  const add = useCallback(
    async (item: T) => {
      const order = firestore.items.length;
      await firestore.addItem({ ...item, order } as any);
    },
    [firestore]
  );

  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      await firestore.updateItem(id, data as any);
    },
    [firestore]
  );

  const remove = useCallback(
    async (id: string) => {
      await firestore.deleteItem(id);
    },
    [firestore]
  );

  const reorder = useCallback(
    async (oldIndex: number, newIndex: number) => {
      const reordered = [...firestore.items];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);
      await firestore.reorderItems(reordered);
    },
    [firestore]
  );

  return {
    items: firestore.items,
    add,
    update,
    remove,
    reorder,
  };
}

export function CareerDataProvider({ children }: { children: ReactNode }) {
  const positions = useFirestoreSection<Position>("positions");
  const education = useFirestoreSection<Education>("education");
  const certifications = useFirestoreSection<Certification>("certifications");
  const publications = useFirestoreSection<Publication>("publications");
  const skills = useFirestoreSection<Skill>("skills");
  const awards = useFirestoreSection<Award>("awards");
  const academicProjects = useFirestoreSection<AcademicProject>("academicProjects");
  const teaching = useFirestoreSection<TeachingExperience>("teaching");
  const partTimeJobs = useFirestoreSection<PartTimeJob>("partTimeJobs");
  const groupActivities = useFirestoreSection<GroupActivity>("groupActivities");
  const mentoring = useFirestoreSection<MentoringExperience>("mentoring");
  const researchExchange = useFirestoreSection<ResearchExchange>("researchExchange");
  const workProjects = useFirestoreSection<WorkProject>("workProjects");

  return (
    <CareerDataContext.Provider
      value={{
        positions,
        education,
        certifications,
        publications,
        skills,
        awards,
        academicProjects,
        teaching,
        partTimeJobs,
        groupActivities,
        mentoring,
        researchExchange,
        workProjects,
      }}
    >
      {children}
    </CareerDataContext.Provider>
  );
}

export function useCareerDataContext() {
  const context = useContext(CareerDataContext);
  if (context === undefined) {
    throw new Error("useCareerDataContext must be used within CareerDataProvider");
  }
  return context;
}
