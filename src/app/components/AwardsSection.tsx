"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Trophy, Calendar } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { awardFields } from "../config/careerFieldConfigs";
import type { Award } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function AwardsSection() {
  const { awards } = useCareerData();
  const { isAdmin } = useAdmin();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: awards.items,
    reorder: awards.reorder,
  });
  const [editingItem, setEditingItem] = useState<
    WithId<Award> | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allAwards = awards.items;

  return (
    <section id="awards" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
        </motion.div>

        {/* Awards Grid */}
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={itemIds}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
              {allAwards.map((award, index) => (
                <motion.div
                  key={award._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="h-full"
                >
                  <CareerItemCard
                    id={award._id}
                    isAdmin={isAdmin}
                    onEdit={() => {
                      setEditingItem(award);
                      setIsModalOpen(true);
                    }}
                    onDelete={() => {
                      if (confirm("이 수상 항목을 삭제하시겠습니까?"))
                        awards.remove(award._id);
                    }}
                  >
                    <div className="text-center space-y-2">
                      <div className="inline-flex p-2 rounded-full bg-gradient-to-br from-yellow-50 to-orange-50">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {award.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {award.organization}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{award.date}</span>
                      </div>
                    </div>
                  </CareerItemCard>
                </motion.div>
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
            label="새 수상 추가"
          />
        )}
      </div>

      <BaseCareerEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={awardFields}
        onSave={async (data) => {
          if (editingItem) await awards.update(editingItem._id, data);
          else await awards.add(data as Award);
        }}
        onDelete={
          editingItem
            ? async () => {
                await awards.remove(editingItem._id);
              }
            : undefined
        }
        itemId={editingItem?._id}
        title={editingItem ? "수상 편집" : "수상 추가"}
      />
    </section>
  );
}
