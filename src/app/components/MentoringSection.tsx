import { motion } from "motion/react";
import { UserCheck, Calendar, Building } from "lucide-react";
import { careerData } from "../../config";

export function MentoringSection() {
  const items = careerData.mentoring;
  if (items.length === 0) return null;

  return (
    <section id="mentoring" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            멘토링 & 교육 경험
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            {items.length}개 멘토링 & 교육 경험
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100"
            >
              <div className="inline-flex p-2.5 rounded-lg bg-white/80 mb-3 shadow-sm">
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>

              <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>

              <div className="space-y-1 mb-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Building className="w-3 h-3 shrink-0" />
                  <span className="truncate">{item.organization}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span>{item.period}</span>
                </div>
              </div>

              {item.description && (
                <p className="text-xs text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
