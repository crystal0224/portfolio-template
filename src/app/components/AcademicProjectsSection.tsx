"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FlaskConical, Calendar, Building } from "lucide-react";
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
import { academicProjectFields } from "../config/careerFieldConfigs";
import type { AcademicProject } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function AcademicProjectsSection() {
  const { academicProjects } = useCareerData();
  const { isAdmin } = useAdmin();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: academicProjects.items,
    reorder: academicProjects.reorder,
  });
  const [editingItem, setEditingItem] = useState<
    WithId<AcademicProject> | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allProjects = academicProjects.items;

  return (
    <section id="academic" className="py-24 bg-gray-50">
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
            Academic Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {allProjects.length}개 학술 및 연구 프로젝트
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="max-w-5xl mx-auto">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={itemIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {allProjects.map((project, index) => (
                  <CareerItemCard
                    key={project._id}
                    id={project._id}
                    isAdmin={isAdmin}
                    onEdit={() => {
                      setEditingItem(project);
                      setIsModalOpen(true);
                    }}
                    onDelete={() => {
                      if (confirm("이 프로젝트를 삭제하시겠습니까?"))
                        academicProjects.remove(project._id);
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 shrink-0 mt-0.5">
                          <FlaskConical className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2">
                            {project.title}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                            <Building className="w-3 h-3 shrink-0" />
                            <span className="truncate">
                              {project.organization}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                            <Calendar className="w-3 h-3 shrink-0" />
                            <span>
                              {project.startDate} ~ {project.endDate}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 line-clamp-2">
                            {project.description}
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
              label="새 학술 프로젝트 추가"
            />
          )}
        </div>
      </div>

      <BaseCareerEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={academicProjectFields}
        onSave={(data) => {
          if (editingItem)
            academicProjects.update(editingItem._id, data);
          else academicProjects.add(data as AcademicProject);
          setIsModalOpen(false);
        }}
        onDelete={
          editingItem
            ? () => {
                academicProjects.remove(editingItem._id);
                setIsModalOpen(false);
              }
            : undefined
        }
        itemId={editingItem?._id}
        title={editingItem ? "학술 프로젝트 편집" : "학술 프로젝트 추가"}
      />
    </section>
  );
}
