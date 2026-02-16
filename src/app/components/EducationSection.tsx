import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { educationFields } from "../config/careerFieldConfigs";
import type { Education } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function EducationSection() {
  const { isAdmin } = useAdmin();
  const { education } = useCareerData();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: education.items,
    reorder: education.reorder,
  });

  const [editingItem, setEditingItem] = useState<WithId<Education> | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (item: WithId<Education>) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleSave = async (data: Education) => {
    if (editingItem) {
      await education.update(editingItem._id, data);
    } else {
      await education.add(data);
    }
  };

  const handleDelete = (id: string) => {
    education.remove(id);
  };

  return (
    <section id="education" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
        </motion.div>

        {/* Education Cards */}
        <div className="max-w-6xl mx-auto">
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              <div className="grid md:grid-cols-2 gap-8">
                {education.items.map((edu, index) => {
                  const isFeatured = index === 0;

                  // Parse school name into Korean and English parts
                  const schoolMatch = edu.school.match(/^(.+?)\s*\((.+?)\)$/);
                  const schoolKorean = schoolMatch ? schoolMatch[1].trim() : edu.school;
                  const schoolEnglish = schoolMatch ? schoolMatch[2].trim() : null;

                  return (
                    <motion.div
                      key={edu._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <CareerItemCard
                        id={edu._id}
                        isAdmin={isAdmin}
                        onEdit={() => handleEdit(edu)}
                        onDelete={() => handleDelete(edu._id)}
                      >
                        <div
                          className={`relative rounded-lg p-2 ${
                            isFeatured
                              ? "bg-gradient-to-br from-blue-50 to-purple-50"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`inline-flex p-3 rounded-full shrink-0 ${
                                isFeatured
                                  ? "bg-gradient-to-br from-blue-100 to-purple-100"
                                  : "bg-gray-100"
                              }`}
                            >
                              <GraduationCap
                                className={`w-6 h-6 ${
                                  isFeatured ? "text-blue-600" : "text-gray-600"
                                }`}
                              />
                            </div>

                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {schoolKorean}
                                {schoolEnglish && (
                                  <span className="text-sm text-gray-500 font-normal ml-2">
                                    ({schoolEnglish})
                                  </span>
                                )}
                              </h3>
                              <p className="text-sm font-medium text-gray-700 mb-0.5">
                                {edu.degree}
                              </p>
                              <p className="text-sm text-gray-600 mb-2">{edu.field}</p>

                              <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>
                                  {edu.startYear} - {edu.endYear}
                                </span>
                              </div>

                              {edu.gpa && (
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                                    GPA {edu.gpa}
                                  </span>
                                </div>
                              )}

                              {edu.honors && (
                                <div className="flex items-start gap-1.5 mb-2">
                                  <Award className="w-3.5 h-3.5 text-yellow-600 shrink-0 mt-0.5" />
                                  <span className="text-xs text-gray-600">
                                    {edu.honors}
                                  </span>
                                </div>
                              )}

                              {edu.notes && (
                                <p className="text-xs text-gray-500 bg-white/60 rounded-lg px-3 py-2">
                                  {edu.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CareerItemCard>
                    </motion.div>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>

          {isAdmin && <AddItemButton onClick={handleAdd} label="새 학력 추가" />}
        </div>
      </div>

      {/* Edit/Add Modal */}
      <BaseCareerEditModal<Education>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={educationFields}
        onSave={handleSave}
        onDelete={handleDelete}
        title={editingItem ? "학력 편집" : "새 학력 추가"}
        itemId={editingItem?._id}
      />
    </section>
  );
}
