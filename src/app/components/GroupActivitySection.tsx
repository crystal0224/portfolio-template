import { motion } from "motion/react";
import { Users, Calendar } from "lucide-react";
import { careerData } from "../../config";

export function GroupActivitySection() {
  const items = careerData.groupActivities;
  if (items.length === 0) return null;

  return (
    <section id="groups" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {items.length}개 그룹 활동
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {items.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2">
                    {activity.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <span className="font-medium text-gray-600">{activity.role}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3 h-3 shrink-0" />
                    <span>{activity.period}</span>
                  </div>

                  {activity.description && (
                    <p className="text-xs text-gray-600 line-clamp-3">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
