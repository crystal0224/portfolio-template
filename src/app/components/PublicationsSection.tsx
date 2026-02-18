import { motion } from "motion/react";
import { BookOpen, ExternalLink } from "lucide-react";
import { careerData } from "../../config";

export function PublicationsSection() {
  const publications = careerData.publications;

  return (
    <section id="publications" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Publications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">{publications.length}개 출판물 및 학술 논문</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="h-full"
              >
                <div className="rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow p-3 h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-xs text-gray-400 ml-auto">{pub.date}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{pub.title}</h3>
                    {pub.journal && (
                      <p className="text-xs text-gray-500 line-clamp-1">{pub.journal}</p>
                    )}
                    {pub.description && (
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 pt-1 border-t border-gray-100">
                        {pub.description}
                      </p>
                    )}
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Details</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
