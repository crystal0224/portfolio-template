import { motion } from "motion/react";
import { Users, Calendar } from "lucide-react";
import { groupActivities } from "../data/detailedCareerData";

export function GroupActivitySection() {
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
            {groupActivities.length}개 그룹 활동
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {groupActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
