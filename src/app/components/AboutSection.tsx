import { motion } from "motion/react";
import { GraduationCap, Briefcase, BookOpen, Award, Target, Lightbulb } from "lucide-react";

export function AboutSection() {
  const experiences = [
    {
      period: "2023.05 - Present",
      title: "SK Group - SK Academy",
      role: "Research Fellow",
      description: "Leadership Assessment Team | 리더십 진단 및 분석 연구, People Analytics 기반 조직 효과성 향상, 심리학·데이터 분석 기반 진단 도구 개발"
    },
    {
      period: "2018.08 - 2023.05",
      title: "Samsung Global Research (전 삼성경제연구소)",
      role: "Research Fellow",
      description: "People Analytics Team | HR 데이터 기반 조직 분석 및 인사 의사결정 지원, 심리학·데이터 분석 기반 HR 솔루션 개발"
    },
    {
      period: "2017.03 - 2018.06",
      title: "MIDAS IT",
      role: "Assistant Manager",
      description: "행복기획팀 | 긍정의 조직문화 조성, 경영철학 연구(뇌신경과학·심리학·경영학), 온오프라인 콘텐츠 기획 및 실행, 이론서·대중서 출판(사람경영)"
    },
    {
      period: "2014.03 - 2016.08",
      title: "서울대학교 심리학과",
      role: "대학원 조교 & 연구소 조교",
      description: "학사 및 학술행사 관리, 청소년을 위한 심리학교실 운영, 연구소 행정업무"
    }
  ];

  const expertise = [
    {
      icon: Lightbulb,
      title: "People Analytics",
      description: "데이터 기반 인사 의사결정 및 조직 분석",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "리더십 연구",
      description: "리더십 진단, 평가 및 개발 프로그램 설계",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: GraduationCap,
      title: "HRD 설계",
      description: "학습 경험 설계 및 교육 프로그램 개발",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BookOpen,
      title: "인지심리학",
      description: "학습 과학 및 인지 프로세스 연구 적용",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const achievements = [
    {
      icon: BookOpen,
      title: "『HR테크혁명』 공저",
      description: "HR 분야의 디지털 전환과 기술 활용에 대한 전문서적 집필"
    },
    {
      icon: Award,
      title: "서울대학교 인지심리학 박사 (통합과정)",
      description: "2011-2017 | GPA 4.20/4.30 | 학습자 질문 및 측정 방법론 전문성"
    },
    {
      icon: Briefcase,
      title: "20+ AI/데이터 프로젝트",
      description: "HuggingFace Spaces 및 GitHub를 통한 실전 프로젝트 구현"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            심리학을 베이스로 학습자 질문, 측정 및 분석 방법론, Tech 및 AI 활용에 관심이 많으며
            HRM과 HRD를 교차한 경력으로 데이터 분석 영역을 확대해 나가고 있습니다.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white p-6 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`}></div>
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.color} mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Experience</h3>
          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-[7px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg"></div>

                <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-600">{exp.period}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h4>
                  <p className="text-md text-gray-700 font-medium mb-2">{exp.role}</p>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Achievements</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
                  <achievement.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills & Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tech Stack & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Python", "R", "SQL", "JavaScript", "TypeScript",
              "Pandas", "NumPy", "Scikit-learn", "TensorFlow",
              "Streamlit", "Flask", "React", "Next.js",
              "OpenAI API", "Claude AI", "HuggingFace",
              "PostgreSQL", "Redis", "Docker",
              "Git", "GitHub Actions", "Vercel", "Netlify"
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
