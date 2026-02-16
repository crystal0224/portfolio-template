"use client";

import { useState } from "react";
import { motion } from "motion/react";
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
import { skillFields } from "../config/careerFieldConfigs";
import type { Skill } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

const categoryLabels: Record<string, string> = {
  technical: "Technical",
  domain: "Domain Expertise",
  soft: "Soft Skills",
};

const categoryGradients: Record<string, string> = {
  technical: "from-blue-500 to-cyan-500",
  domain: "from-purple-500 to-pink-500",
  soft: "from-green-500 to-emerald-500",
};

export function SkillsSection() {
  const { skills } = useCareerData();
  const { isAdmin } = useAdmin();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: skills.items,
    reorder: skills.reorder,
  });
  const [editingItem, setEditingItem] = useState<
    WithId<Skill> | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allSkills = skills.items;

  // Group skills by category
  const grouped = allSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, WithId<Skill>[]>
  );

  const categoryOrder = ["technical", "domain", "soft"];

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {allSkills.length}개 스킬 (카테고리별)
          </p>
        </motion.div>

        {/* Skill Groups - admin mode uses drag-and-drop flat list */}
        {isAdmin ? (
          <div className="max-w-3xl mx-auto">
            <DndContext
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={itemIds}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {allSkills.map((skill) => (
                    <CareerItemCard
                      key={skill._id}
                      id={skill._id}
                      isAdmin={isAdmin}
                      onEdit={() => {
                        setEditingItem(skill);
                        setIsModalOpen(true);
                      }}
                      onDelete={() => {
                        if (confirm("이 스킬을 삭제하시겠습니까?"))
                          skills.remove(skill._id);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                            categoryGradients[skill.category] ||
                            "from-gray-500 to-gray-600"
                          }`}
                        />
                        <span className="font-medium text-gray-900">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {categoryLabels[skill.category] || skill.category}
                        </span>
                      </div>
                    </CareerItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <AddItemButton
              onClick={() => {
                setEditingItem(undefined);
                setIsModalOpen(true);
              }}
              label="새 스킬 추가"
            />
          </div>
        ) : (
          /* Non-admin: original grouped view */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {categoryOrder.map((cat, catIndex) => {
              const catSkills = grouped[cat];
              if (!catSkills) return null;

              const gradient =
                categoryGradients[cat] || "from-gray-500 to-gray-600";

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient}`}
                    />
                    <h3 className="text-lg font-bold text-gray-900">
                      {categoryLabels[cat] || cat}
                    </h3>
                    <span className="text-xs text-gray-400 ml-auto">
                      {catSkills.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill, index) => (
                      <motion.span
                        key={skill._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.1 + index * 0.03,
                        }}
                        className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <BaseCareerEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={skillFields}
        onSave={(data) => {
          if (editingItem) skills.update(editingItem._id, data);
          else skills.add(data as Skill);
          setIsModalOpen(false);
        }}
        onDelete={
          editingItem
            ? () => {
                skills.remove(editingItem._id);
                setIsModalOpen(false);
              }
            : undefined
        }
        itemId={editingItem?._id}
        title={editingItem ? "스킬 편집" : "스킬 추가"}
      />
    </section>
  );
}
