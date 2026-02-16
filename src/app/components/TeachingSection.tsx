"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Calendar, Building } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { teachingFields } from "../config/careerFieldConfigs";
import type { TeachingExperience } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function TeachingSection() {
  const { teaching } = useCareerData();
  const { isAdmin } = useAdmin();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: teaching.items,
    reorder: teaching.reorder,
  });
  const [editingItem, setEditingItem] = useState<
    WithId<TeachingExperience> | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allTeaching = teaching.items;

  return (
    <section id="teaching" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Teaching</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">강의 경험</p>
        </motion.div>

        {/* Teaching Cards */}
        <div className="max-w-4xl mx-auto">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={itemIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allTeaching.map((item, index) => (
                  <CareerItemCard
                    key={item._id}
                    id={item._id}
                    isAdmin={isAdmin}
                    onEdit={() => {
                      setEditingItem(item);
                      setIsModalOpen(true);
                    }}
                    onDelete={() => {
                      if (confirm("이 강의 항목을 삭제하시겠습니까?"))
                        teaching.remove(item._id);
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                        <div className="inline-flex p-3 rounded-full bg-white/80 mb-4 shadow-sm">
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.subject}
                        </h3>

                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Building className="w-3.5 h-3.5 shrink-0" />
                            <span>{item.institution}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>{item.period}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </CareerItemCard>
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {isAdmin && (
            <AddItemButton
              onClick={() => {
                setEditingItem(undefined);
                setIsModalOpen(true);
              }}
              label="새 강의 추가"
            />
          )}
        </div>
      </div>

      <BaseCareerEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={teachingFields}
        onSave={(data) => {
          if (editingItem) teaching.update(editingItem._id, data);
          else teaching.add(data as TeachingExperience);
          setIsModalOpen(false);
        }}
        onDelete={
          editingItem
            ? () => {
                teaching.remove(editingItem._id);
                setIsModalOpen(false);
              }
            : undefined
        }
        itemId={editingItem?._id}
        title={editingItem ? "강의 편집" : "강의 추가"}
      />
    </section>
  );
}
