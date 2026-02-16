import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
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
  positions as originalPositions,
  education as originalEducation,
  certifications as originalCertifications,
  publications as originalPublications,
  skills as originalSkills,
  awards as originalAwards,
  academicProjects as originalAcademicProjects,
  teaching as originalTeaching,
  partTimeJobs as originalPartTimeJobs,
  groupActivities as originalGroupActivities,
  mentoring as originalMentoring,
  researchExchange as originalResearchExchange,
  workProjects as originalWorkProjects,
} from "../data/detailedCareerData";

// Items with string IDs for CRUD operations
export type WithId<T> = T & { _id: string };

// Section keys for localStorage
type SectionKey =
  | "positions"
  | "education"
  | "certifications"
  | "publications"
  | "skills"
  | "awards"
  | "academicProjects"
  | "teaching"
  | "partTimeJobs"
  | "groupActivities"
  | "mentoring"
  | "researchExchange"
  | "workProjects";

// CRUD functions type for a section
interface SectionCRUD<T> {
  items: WithId<T>[];
  add: (item: T) => void;
  update: (id: string, data: Partial<T>) => void;
  remove: (id: string) => void;
  reorder: (oldIndex: number, newIndex: number) => void;
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

// localStorage helpers
function loadFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to load ${key} from localStorage:`, e);
  }
  return null;
}

function saveToStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage:`, e);
  }
}

// Generate unique ID
function generateId(): string {
  return `new-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Assign stable IDs to original items based on index
function assignIds<T>(items: T[], prefix: string): WithId<T>[] {
  return items.map((item, index) => ({
    ...item,
    _id: `${prefix}-${index}`,
  }));
}

// Merge localStorage data with original data
function mergeData<T>(
  original: WithId<T>[],
  sectionKey: SectionKey
): WithId<T>[] {
  const edits = loadFromStorage<Record<string, Partial<T>>>(`career_${sectionKey}_edits`) || {};
  const deleted = loadFromStorage<string[]>(`career_${sectionKey}_deleted`) || [];
  const order = loadFromStorage<string[]>(`career_${sectionKey}_order`) || [];
  const added = loadFromStorage<WithId<T>[]>(`career_${sectionKey}_added`) || [];

  // 1. Remove deleted items
  let items = original.filter((item) => !deleted.includes(item._id));

  // 2. Apply edits
  items = items.map((item) =>
    edits[item._id] ? { ...item, ...edits[item._id] } : item
  );

  // 3. Merge added items
  items = [...items, ...added];

  // 4. Apply order (if exists)
  if (order.length > 0) {
    const ordered = order
      .map((id) => items.find((item) => item._id === id))
      .filter((item): item is WithId<T> => item != null);
    // Include any items not in the order list (newly added after order was saved)
    const remaining = items.filter((item) => !order.includes(item._id));
    items = [...ordered, ...remaining];
  }

  return items;
}

// Hook for managing a single section's data
function useSectionData<T>(
  originalItems: T[],
  sectionKey: SectionKey,
  idPrefix: string
): SectionCRUD<T> {
  const original = assignIds(originalItems, idPrefix);

  const [items, setItems] = useState<WithId<T>[]>(() =>
    mergeData(original, sectionKey)
  );

  const persistState = useCallback(
    (
      edits: Record<string, Partial<T>>,
      deleted: string[],
      order: string[],
      added: WithId<T>[]
    ) => {
      saveToStorage(`career_${sectionKey}_edits`, edits);
      saveToStorage(`career_${sectionKey}_deleted`, deleted);
      saveToStorage(`career_${sectionKey}_order`, order);
      saveToStorage(`career_${sectionKey}_added`, added);
    },
    [sectionKey]
  );

  const add = useCallback(
    (item: T) => {
      const newItem: WithId<T> = { ...item, _id: generateId() };
      setItems((prev) => {
        const next = [...prev, newItem];
        // Save added item
        const added = loadFromStorage<WithId<T>[]>(`career_${sectionKey}_added`) || [];
        added.push(newItem);
        saveToStorage(`career_${sectionKey}_added`, added);
        // Update order
        saveToStorage(`career_${sectionKey}_order`, next.map((i) => i._id));
        return next;
      });
    },
    [sectionKey]
  );

  const update = useCallback(
    (id: string, data: Partial<T>) => {
      setItems((prev) => {
        const next = prev.map((item) =>
          item._id === id ? { ...item, ...data } : item
        );

        // Check if it's an added item or original item
        const added = loadFromStorage<WithId<T>[]>(`career_${sectionKey}_added`) || [];
        const addedIndex = added.findIndex((a) => a._id === id);

        if (addedIndex >= 0) {
          // Update in added array
          added[addedIndex] = { ...added[addedIndex], ...data };
          saveToStorage(`career_${sectionKey}_added`, added);
        } else {
          // Save as edit for original item
          const edits = loadFromStorage<Record<string, Partial<T>>>(`career_${sectionKey}_edits`) || {};
          edits[id] = { ...(edits[id] || {}), ...data };
          saveToStorage(`career_${sectionKey}_edits`, edits);
        }

        return next;
      });
    },
    [sectionKey]
  );

  const remove = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = prev.filter((item) => item._id !== id);

        // Check if it's an added item
        const added = loadFromStorage<WithId<T>[]>(`career_${sectionKey}_added`) || [];
        const addedIndex = added.findIndex((a) => a._id === id);

        if (addedIndex >= 0) {
          // Remove from added array
          added.splice(addedIndex, 1);
          saveToStorage(`career_${sectionKey}_added`, added);
        } else {
          // Add to deleted list for original items
          const deleted = loadFromStorage<string[]>(`career_${sectionKey}_deleted`) || [];
          deleted.push(id);
          saveToStorage(`career_${sectionKey}_deleted`, deleted);
        }

        // Update order
        saveToStorage(`career_${sectionKey}_order`, next.map((i) => i._id));
        return next;
      });
    },
    [sectionKey]
  );

  const reorder = useCallback(
    (oldIndex: number, newIndex: number) => {
      setItems((prev) => {
        const next = [...prev];
        const [moved] = next.splice(oldIndex, 1);
        next.splice(newIndex, 0, moved);
        // Save new order
        saveToStorage(`career_${sectionKey}_order`, next.map((i) => i._id));
        return next;
      });
    },
    [sectionKey]
  );

  return { items, add, update, remove, reorder };
}

export function CareerDataProvider({ children }: { children: ReactNode }) {
  const positions = useSectionData(originalPositions, "positions", "pos");
  const education = useSectionData(originalEducation, "education", "edu");
  const certifications = useSectionData(originalCertifications, "certifications", "cert");
  const publications = useSectionData(originalPublications, "publications", "pub");
  const skills = useSectionData(originalSkills, "skills", "skill");
  const awards = useSectionData(originalAwards, "awards", "award");
  const academicProjects = useSectionData(originalAcademicProjects, "academicProjects", "acad");
  const teaching = useSectionData(originalTeaching, "teaching", "teach");
  const partTimeJobs = useSectionData(originalPartTimeJobs, "partTimeJobs", "part");
  const groupActivities = useSectionData(originalGroupActivities, "groupActivities", "group");
  const mentoring = useSectionData(originalMentoring, "mentoring", "mentor");
  const researchExchange = useSectionData(originalResearchExchange, "researchExchange", "research");
  const workProjects = useSectionData(originalWorkProjects, "workProjects", "wp");

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
