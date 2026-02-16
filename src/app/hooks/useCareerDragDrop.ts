import { useCallback } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import type { WithId } from "../contexts/CareerDataContext";

interface UseCareerDragDropOptions<T> {
  items: WithId<T>[];
  reorder: (oldIndex: number, newIndex: number) => void;
}

export function useCareerDragDrop<T>({ items, reorder }: UseCareerDragDropOptions<T>) {
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorder(oldIndex, newIndex);
      }
    },
    [items, reorder]
  );

  const itemIds = items.map((item) => item._id);

  return { handleDragEnd, itemIds };
}
