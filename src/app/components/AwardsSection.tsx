import { motion } from "motion/react";
import { Trophy, Calendar } from "lucide-react";
import { careerData } from "../../config";

export function AwardsSection() {
  const awards = careerData.awards;

  return (
    <section id="awards" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="h-full"
            >
              <div className="rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow p-3 h-full">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-2 rounded-full bg-gradient-to-br from-yellow-50 to-orange-50">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{award.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-1">{award.organization}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{award.date}</span>
                  </div>
                  {award.description && (
                    <p className="text-xs text-gray-500">{award.description}</p>
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
