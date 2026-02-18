import { motion } from "motion/react";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { careerData } from "../../config";

export function CertificationsSection() {
  const certifications = careerData.certifications;

  return (
    <section id="certifications" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600">{certifications.length}개 자격증 및 수료</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="h-full"
            >
              <div className="rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow p-3 h-full">
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-3">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{cert.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{cert.authority}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url.startsWith("http") ? cert.url : `https://${cert.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View
                    </a>
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
