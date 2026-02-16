import { useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  FileText,
  Presentation,
  ExternalLink,
  Calendar,
  Users,
} from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { publicationFields } from "../config/careerFieldConfigs";
import type { Publication } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

const typeConfig: Record<
  string,
  { icon: typeof BookOpen; badge: string; color: string }
> = {
  논문: {
    icon: FileText,
    badge: "논문",
    color: "bg-blue-100 text-blue-700",
  },
  단행본: {
    icon: BookOpen,
    badge: "단행본",
    color: "bg-purple-100 text-purple-700",
  },
  학술발표: {
    icon: Presentation,
    badge: "학술발표",
    color: "bg-green-100 text-green-700",
  },
};

export function PublicationsSection() {
  const { isAdmin } = useAdmin();
  const { publications } = useCareerData();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: publications.items,
    reorder: publications.reorder,
  });

  const [editingItem, setEditingItem] = useState<WithId<Publication> | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (item: WithId<Publication>) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleSave = (data: Publication) => {
    if (editingItem) {
      publications.update(editingItem._id, data);
    } else {
      publications.add(data);
    }
  };

  const handleDelete = (id: string) => {
    publications.remove(id);
  };

  return (
    <section id="publications" className="py-24 bg-gray-50">
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
            Publications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {publications.items.length}개 출판물 및 학술 논문
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="max-w-5xl mx-auto">
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {publications.items.map((pub, index) => {
                  const year = pub.publishedDate.split("-")[0];
                  const config = typeConfig[pub.type] || typeConfig["논문"];
                  const IconComponent = config.icon;

                  return (
                    <motion.div
                      key={pub._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                    >
                      <CareerItemCard
                        id={pub._id}
                        isAdmin={isAdmin}
                        onEdit={() => handleEdit(pub)}
                        onDelete={() => handleDelete(pub._id)}
                      >
                        <div className="flex">
                          {/* Icon Side */}
                          <div className="w-12 shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center rounded-lg mr-3">
                            <IconComponent className="w-6 h-6 text-blue-500" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Type Badge */}
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium mb-2 ${config.color}`}
                            >
                              {config.badge}
                            </span>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                              {pub.title}
                            </h3>

                            <div className="space-y-1 mb-2">
                              {pub.authors && (
                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <Users className="w-3 h-3 shrink-0" />
                                  <span className="truncate">{pub.authors}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <BookOpen className="w-3 h-3 shrink-0" />
                                <span className="truncate">{pub.publisher}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Calendar className="w-3 h-3 shrink-0" />
                                <span>{year}</span>
                              </div>
                            </div>

                            {pub.description && (
                              <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                                {pub.description}
                              </p>
                            )}

                            {pub.url && (
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                <ExternalLink className="w-3 h-3" />
                                View Details
                              </a>
                            )}
                          </div>
                        </div>
                      </CareerItemCard>
                    </motion.div>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>

          {isAdmin && <AddItemButton onClick={handleAdd} label="새 출판물 추가" />}
        </div>
      </div>

      {/* Edit/Add Modal */}
      <BaseCareerEditModal<Publication>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={publicationFields}
        onSave={handleSave}
        onDelete={handleDelete}
        title={editingItem ? "출판물 편집" : "새 출판물 추가"}
        itemId={editingItem?._id}
      />
    </section>
  );
}
