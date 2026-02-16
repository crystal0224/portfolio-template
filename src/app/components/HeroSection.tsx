import { motion } from "motion/react";
import { Briefcase, GraduationCap, Linkedin, Mail } from "lucide-react";

const profileImage = import.meta.env.BASE_URL + "profile.png";

interface HeroSectionProps {
  onTitleDoubleClick?: () => void;
}

export function HeroSection({ onTitleDoubleClick }: HeroSectionProps = {}) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Profile Image - Left Side */}
          <motion.div
            className="order-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ width: '90%' }}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 lg:max-w-full">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-2xl"></div>

              {/* Main image */}
              <div className="relative h-full rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img
                  src={profileImage}
                  alt="배수정 프로필"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    console.error('Profile image failed to load:', profileImage);
                  }}
                />

                {/* Status badge */}
                <div className="absolute bottom-6 right-6 z-20 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-gray-900">Available for collaboration</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Info - Right Side */}
          <div className="space-y-8 order-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-block">
                <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-gray-500 mb-4">
                  <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <span>Research Fellow</span>
                </div>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight cursor-pointer select-none"
                onDoubleClick={onTitleDoubleClick}
                title="관리자 로그인: 더블클릭"
              >
                배수정
                <span className="block text-xl sm:text-2xl lg:text-3xl font-light text-gray-600 mt-4">
                  Psychologist & People Analyst
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl tracking-tight">
                심리학을 베이스로 학습자 질문, 측정 및 분석 방법론, Tech 및 AI 활용에 관심이 많으며
                HRM과 HRD를 교차한 경력으로 데이터 분석 영역을 확대해 나가고 있습니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Credentials */}
              <div className="grid gap-4">
                <div className="group">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">Current Position</div>
                      <div className="font-medium text-gray-900 mb-2">SK아카데미 리더십진단팀</div>
                      <div className="text-sm text-gray-500 mb-0.5">Past</div>
                      <div className="text-sm text-gray-700">삼성경제연구소 People Analytics 팀</div>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 group-hover:from-purple-100 group-hover:to-pink-100 transition-colors">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Education</div>
                      <div className="font-medium text-gray-900">서울대학교 인지심리학 박사</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6 flex items-center gap-6"
            >
              <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                </div>
                <a
                  href="https://linkedin.com/in/crystal0224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  linkedin.com/in/crystal0224
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Mail className="w-4 h-4 text-purple-600" />
                </div>
                <a
                  href="mailto:aaaaa124@naver.com"
                  className="text-sm"
                >
                  aaaaa124@naver.com
                </a>
              </div>
            </motion.div>

            {/* Expertise Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8 border-t border-gray-200"
            >
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">Expertise</div>
              <div className="flex flex-wrap gap-2">
                {["People Analytics", "리더십 연구", "HRD 설계", "인지심리학", "AI 활용"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}