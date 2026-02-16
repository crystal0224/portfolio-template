import { motion } from "motion/react";
import {
  BookOpen,
  FileText,
  Presentation,
  ExternalLink,
  Calendar,
  Users,
} from "lucide-react";
import { publications } from "../data/detailedCareerData";

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
            {publications.length}개 출판물 및 학술 논문
          </p>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {publications.map((pub, index) => {
            const year = pub.publishedDate.split("-")[0];
            const config = typeConfig[pub.type] || typeConfig["논문"];
            const IconComponent = config.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex">
                  {/* Icon Side */}
                  <div className="w-16 shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <IconComponent className="w-7 h-7 text-blue-500" />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 min-w-0">
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
