import { useState } from "react";
import { motion } from "motion/react";
import { Globe, Calendar, Building } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCareerData } from "../hooks/useCareerData";
import { useCareerDragDrop } from "../hooks/useCareerDragDrop";
import { useAdmin } from "../contexts/AdminContext";
import { CareerItemCard } from "./career/CareerItemCard";
import { BaseCareerEditModal } from "./career/BaseCareerEditModal";
import { AddItemButton } from "./career/AddItemButton";
import { researchExchangeFields } from "../config/careerFieldConfigs";
import type { ResearchExchange } from "../data/detailedCareerData";
import type { WithId } from "../contexts/CareerDataContext";

export function ResearchExchangeSection() {
  const { isAdmin } = useAdmin();
  const { researchExchange } = useCareerData();
  const { handleDragEnd, itemIds } = useCareerDragDrop({
    items: researchExchange.items,
    reorder: researchExchange.reorder,
  });

  const [editingItem, setEditingItem] = useState<WithId<ResearchExchange> | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (item: WithId<ResearchExchange>) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleSave = (data: ResearchExchange) => {
    if (editingItem) {
      researchExchange.update(editingItem._id, data);
    } else {
      researchExchange.add(data);
    }
  };

  const handleDelete = (id: string) => {
    researchExchange.remove(id);
  };

  return (
    <section id="exchange" className="py-24 bg-gray-50">
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
            Research Exchange
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">국제 연구교류 프로그램</p>
        </motion.div>

        {/* Exchange Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              {researchExchange.items.map((exchange, index) => (
                <motion.div
                  key={exchange._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <CareerItemCard
                    id={exchange._id}
                    isAdmin={isAdmin}
                    onEdit={() => handleEdit(exchange)}
                    onDelete={() => handleDelete(exchange._id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex p-3 rounded-full bg-indigo-50 shadow-sm shrink-0">
                        <Globe className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {exchange.institution}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Building className="w-4 h-4 shrink-0" />
                          <span>{exchange.program}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>{exchange.date}</span>
                        </div>
                      </div>
                    </div>
                  </CareerItemCard>
                </motion.div>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {isAdmin && <AddItemButton onClick={handleAdd} label="새 연구교류 추가" />}
      </div>

      {/* Edit/Add Modal */}
      <BaseCareerEditModal<ResearchExchange>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        fieldConfig={researchExchangeFields}
        onSave={handleSave}
        onDelete={handleDelete}
        title={editingItem ? "연구교류 편집" : "새 연구교류 추가"}
        itemId={editingItem?._id}
      />
    </section>
  );
}
