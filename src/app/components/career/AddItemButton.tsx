"use client";

import { Plus } from "lucide-react";

interface AddItemButtonProps {
  onClick: () => void;
  label?: string;
}

export function AddItemButton({ onClick, label = "새 항목 추가" }: AddItemButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-3 py-2.5 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
    >
      <Plus className="w-4 h-4" />
      {label}
    </button>
  );
}
