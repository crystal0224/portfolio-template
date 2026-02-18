import { motion } from "motion/react";
import { GraduationCap, Calendar, Building } from "lucide-react";
import { careerData } from "../../config";

export function TeachingSection() {
  const items = careerData.teaching;
  if (items.length === 0) return null;

  return (
    <section id="teaching" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Teaching</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">강의 경험</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <div className="inline-flex p-3 rounded-full bg-white/80 mb-4 shadow-sm">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.course}
                  </h3>

                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Building className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.institution}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
