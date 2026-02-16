"use client";

import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";

export interface CareerItemCardProps {
  id: string;
  children: ReactNode;
  onEdit: () => void;
  onDelete: () => void;
  isAdmin: boolean;
}

export function CareerItemCard({
  id,
  children,
  onEdit,
  onDelete,
  isAdmin,
}: CareerItemCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isAdmin });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    scale: isDragging ? "1.02" : "1",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-lg border bg-white transition-shadow h-full ${
        isDragging
          ? "border-blue-400 shadow-lg z-10"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-2 p-3 h-full">
        {/* Drag Handle */}
        {isAdmin && (
          <button
            {...attributes}
            {...listeners}
            className="mt-1 p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing rounded hover:bg-gray-100 flex-shrink-0"
            aria-label="드래그하여 순서 변경"
          >
            <GripVertical className="w-4 h-4" />
          </button>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors"
              aria-label="편집"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
              aria-label="삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
