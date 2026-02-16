import { motion } from "motion/react";
import { Trophy, Calendar } from "lucide-react";
import { awards } from "../data/detailedCareerData";

export function AwardsSection() {
  return (
    <section id="awards" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Awards Timeline */}
        <div className="max-w-2xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 pb-10 last:pb-0"
            >
              {/* Timeline line */}
              {index < awards.length - 1 && (
                <div className="absolute left-[7px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 to-orange-400" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg" />

              {/* Card */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 border border-yellow-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="inline-flex p-2 rounded-full bg-white/80 shrink-0">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {award.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {award.organization}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{award.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
