// Stub: drag-drop removed. Will be deleted by Task 5.
export function useCareerDragDrop({ items }: { items: any[]; reorder: any }) {
  return {
    handleDragEnd: () => {},
    itemIds: items.map((_, i) => String(i)),
  };
}
