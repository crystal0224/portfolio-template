import { useState } from "react";
import { motion } from "motion/react";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { certificationFields } from "../config/careerFieldConfigs";
import type { Certification } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function CertificationsSection() {
  const { isAdmin } = useAdmin();
  const { certifications } = useCareerData();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: certifications.items,
    reorder: certifications.reorder,
  });

  const [editingItem, setEditingItem] = useState<WithId<Certification> | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (item: WithId<Certification>) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleSave = (data: Certification) => {
    if (editingItem) {
      certifications.update(editingItem._id, data);
    } else {
      certifications.add(data);
    }
  };

  const handleDelete = (id: string) => {
    certifications.remove(id);
  };

  return (
    <section id="certifications" className="py-24 bg-white">
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
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {certifications.items.length}개 자격증 및 수료
          </p>
        </motion.div>

        {/* Certification Grid */}
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
          <SortableContext items={itemIds} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {certifications.items.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <CareerItemCard
                    id={cert._id}
                    isAdmin={isAdmin}
                    onEdit={() => handleEdit(cert)}
                    onDelete={() => handleDelete(cert._id)}
                  >
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-3">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>

                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                        {cert.name}
                      </h3>

                      <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                        {cert.authority}
                      </p>

                      <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{cert.date}</span>
                      </div>

                      {cert.url && (
                        <a
                          href={
                            cert.url.startsWith("http")
                              ? cert.url
                              : `https://${cert.url}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </a>
                      )}
                    </div>
                  </CareerItemCard>
                </motion.div>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {isAdmin && <AddItemButton onClick={handleAdd} label="새 자격증 추가" />}
      </div>

      {/* Edit/Add Modal */}
      <BaseCareerEditModal<Certification>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={certificationFields}
        onSave={handleSave}
        onDelete={handleDelete}
        title={editingItem ? "자격증 편집" : "새 자격증 추가"}
        itemId={editingItem?._id}
      />
    </section>
  );
}
