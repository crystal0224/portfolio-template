import { useState } from "react";
import { motion } from "motion/react";
import { UserCheck, Calendar, Building } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { mentoringFields } from "../config/careerFieldConfigs";
import type { MentoringExperience } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function MentoringSection() {
  const { isAdmin } = useAdmin();
  const { mentoring } = useCareerData();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: mentoring.items,
    reorder: mentoring.reorder,
  });

  const [editingItem, setEditingItem] = useState<WithId<MentoringExperience> | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (item: WithId<MentoringExperience>) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleSave = async (data: MentoringExperience) => {
    if (editingItem) {
      await mentoring.update(editingItem._id, data);
    } else {
      await mentoring.add(data);
    }
  };

  const handleDelete = async (id: string) => {
    await mentoring.remove(id);
  };

  return (
    <section id="mentoring" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            멘토링 & 교육 경험
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {mentoring.items.length}개 멘토링 & 교육 경험
          </p>
        </motion.div>

        {/* Mentoring Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              {mentoring.items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                >
                  <CareerItemCard
                    id={item._id}
                    isAdmin={isAdmin}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item._id)}
                  >
                    <div className="inline-flex p-2.5 rounded-lg bg-white/80 mb-3 shadow-sm">
                      <UserCheck className="w-5 h-5 text-green-600" />
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="space-y-1 mb-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Building className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.organization}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </CareerItemCard>
                </motion.div>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {isAdmin && <AddItemButton onClick={handleAdd} label="새 멘토링 추가" />}
      </div>

      {/* Edit/Add Modal */}
      <BaseCareerEditModal<MentoringExperience>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={mentoringFields}
        onSave={handleSave}
        onDelete={handleDelete}
        title={editingItem ? "멘토링 편집" : "새 멘토링 추가"}
        itemId={editingItem?._id}
      />
    </section>
  );
}
