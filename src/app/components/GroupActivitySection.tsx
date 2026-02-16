import { useState } from "react";
import { motion } from "motion/react";
import { Users, Calendar } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { groupActivityFields } from "../config/careerFieldConfigs";
import type { GroupActivity } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function GroupActivitySection() {
  const { isAdmin } = useAdmin();
  const { groupActivities } = useCareerData();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: groupActivities.items,
    reorder: groupActivities.reorder,
  });

  const [editingItem, setEditingItem] = useState<WithId<GroupActivity> | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (item: WithId<GroupActivity>) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleSave = (data: GroupActivity) => {
    if (editingItem) {
      groupActivities.update(editingItem._id, data);
    } else {
      groupActivities.add(data);
    }
  };

  const handleDelete = (id: string) => {
    groupActivities.remove(id);
  };

  return (
    <section id="groups" className="py-24 bg-gray-50">
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
            Group Activities
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {groupActivities.items.length}개 그룹 활동
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              {groupActivities.items.map((activity, index) => (
                <motion.div
                  key={activity._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                >
                  <CareerItemCard
                    id={activity._id}
                    isAdmin={isAdmin}
                    onEdit={() => handleEdit(activity)}
                    onDelete={() => handleDelete(activity._id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 shrink-0 mt-0.5">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2">
                          {activity.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>{activity.date}</span>
                        </div>

                        <p className="text-xs text-gray-600 line-clamp-3">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </CareerItemCard>
                </motion.div>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {isAdmin && <AddItemButton onClick={handleAdd} label="새 그룹 활동 추가" />}
      </div>

      {/* Edit/Add Modal */}
      <BaseCareerEditModal<GroupActivity>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={groupActivityFields}
        onSave={handleSave}
        onDelete={handleDelete}
        title={editingItem ? "그룹 활동 편집" : "새 그룹 활동 추가"}
        itemId={editingItem?._id}
      />
    </section>
  );
}
