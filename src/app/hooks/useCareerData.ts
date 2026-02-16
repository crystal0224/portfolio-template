import { useCareerDataContext } from "../contexts/CareerDataContext";
import type { CareerDataContextType } from "../contexts/CareerDataContext";

export function useCareerData(): CareerDataContextType {
  return useCareerDataContext();
}
