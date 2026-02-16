import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { positionFields } from "../config/careerFieldConfigs";
import type { Position } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function ExperienceSection() {
  const { isAdmin } = useAdmin();
  const { positions } = useCareerData();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: positions.items,
    reorder: positions.reorder,
  });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<WithId<Position> | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPeriod = (start: string, end: string | null) => {
    const s = start.replace("-", ".");
    const e = end ? end.replace("-", ".") : "Present";
    return `${s} - ${e}`;
  };

  const handleEdit = (item: WithId<Position>) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleSave = (data: Position) => {
    if (editingItem) {
      positions.update(editingItem._id, data);
    } else {
      positions.add(data);
    }
  };

  const handleDelete = (id: string) => {
    positions.remove(id);
  };

  return (
    <section id="experience" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            심리학과 데이터 분석 전문성을 기반으로 한 경력
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              {positions.items.map((pos, index) => {
                const hasHighlights =
                  pos.highlights && pos.highlights.length > 0;
                const isExpanded = expandedIndex === index;

                return (
                  <motion.div
                    key={pos._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-8 pb-12 last:pb-0"
                  >
                    {/* Timeline line */}
                    {index < positions.items.length - 1 && (
                      <div className="absolute left-[7px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
                    )}

                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg" />

                    {/* Content Card */}
                    <CareerItemCard
                      id={pos._id}
                      isAdmin={isAdmin}
                      onEdit={() => handleEdit(pos)}
                      onDelete={() => handleDelete(pos._id)}
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatPeriod(pos.startDate, pos.endDate)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {pos.location}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {pos.company}
                      </h3>
                      <p className="text-sm text-gray-700 font-medium mb-1">
                        {pos.title}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {pos.description}
                      </p>

                      {/* Highlights toggle */}
                      {hasHighlights && (
                        <>
                          <button
                            onClick={() =>
                              setExpandedIndex(isExpanded ? null : index)
                            }
                            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium mb-2"
                          >
                            <span>
                              주요 활동 ({pos.highlights!.length}건)
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden space-y-1.5"
                              >
                                {pos.highlights!.map((item, i) => (
                                  <li
                                    key={i}
                                    className="text-sm text-gray-600 flex items-start gap-2"
                                  >
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </CareerItemCard>
                  </motion.div>
                );
              })}
            </SortableContext>
          </DndContext>

          {isAdmin && <AddItemButton onClick={handleAdd} label="새 경력 추가" />}
        </div>
      </div>

      {/* Edit/Add Modal */}
      <BaseCareerEditModal<Position>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={positionFields}
        onSave={handleSave}
        onDelete={handleDelete}
        title={editingItem ? "경력 편집" : "새 경력 추가"}
        itemId={editingItem?._id}
      />
    </section>
  );
}
