"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Calendar, Building } from "lucide-react";
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
import { partTimeJobFields } from "../config/careerFieldConfigs";
import type { PartTimeJob } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function PartTimeJobSection() {
  const { partTimeJobs } = useCareerData();
  const { isAdmin } = useAdmin();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: partTimeJobs.items,
    reorder: partTimeJobs.reorder,
  });
  const [editingItem, setEditingItem] = useState<
    WithId<PartTimeJob> | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allJobs = partTimeJobs.items;

  return (
    <section id="parttime" className="py-24 bg-white">
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
            Part-time Job Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {allJobs.length}개 파트타임 경력
          </p>
        </motion.div>

        {/* Jobs Grid */}
        <div className="max-w-6xl mx-auto">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={itemIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allJobs.map((job, index) => (
                  <CareerItemCard
                    key={job._id}
                    id={job._id}
                    isAdmin={isAdmin}
                    onEdit={() => {
                      setEditingItem(job);
                      setIsModalOpen(true);
                    }}
                    onDelete={() => {
                      if (confirm("이 파트타임 경력을 삭제하시겠습니까?"))
                        partTimeJobs.remove(job._id);
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 shrink-0">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                            {job.title}
                          </h3>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
                            <Building className="w-4 h-4 shrink-0" />
                            <span className="truncate">
                              {job.organization}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span>
                              {job.startDate} ~ {job.endDate}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                            {job.description}
                          </p>
                        </div>
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
              label="새 파트타임 경력 추가"
            />
          )}
        </div>
      </div>

      <BaseCareerEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={partTimeJobFields}
        onSave={(data) => {
          if (editingItem) partTimeJobs.update(editingItem._id, data);
          else partTimeJobs.add(data as PartTimeJob);
          setIsModalOpen(false);
        }}
        onDelete={
          editingItem
            ? () => {
                partTimeJobs.remove(editingItem._id);
                setIsModalOpen(false);
              }
            : undefined
        }
        itemId={editingItem?._id}
        title={editingItem ? "파트타임 경력 편집" : "파트타임 경력 추가"}
      />
    </section>
  );
}
