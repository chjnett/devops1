import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Cloud, GitBranch, Server, Code, Brain, Database, Container, Workflow } from 'lucide-react'

const techStacks = [
  {
    id: 1,
    category: 'Cloud Infra',
    icon: Cloud,
    technologies: ['AWS', 'Google Cloud', 'Azure'],
    description: '엔터프라이즈 인프라 구축의 필수 요소',
    color: 'from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 2,
    category: 'DevOps',
    icon: GitBranch,
    technologies: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform'],
    description: '자동화 및 컨테이너 오케스트레이션 전문성 강조',
    color: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 3,
    category: 'Backend',
    icon: Database,
    technologies: ['Spring Boot', 'PostgreSQL', 'FastAPI'],
    description: '안정적인 웹 서비스와 고성능 AI API 통신에 최적화',
    color: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    id: 4,
    category: 'Frontend',
    icon: Code,
    technologies: ['React', 'TypeScript', 'Vite'],
    description: '빠르고 견고한 동적 UI 구현',
    color: 'from-orange-500/10 to-yellow-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    id: 5,
    category: 'AI / RAG',
    icon: Brain,
    technologies: ['Claude 3.5', 'LangChain', 'Pinecone'],
    description: '차세대 AI 시스템 구축 및 벡터 데이터베이스 통합',
    color: 'from-violet-500/10 to-fuchsia-500/10',
    borderColor: 'border-violet-500/20',
  },
]

export default function TechStack() {
  return (
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Tech <span className="text-gray-500">Stack</span>
        </h2>
        <p className="text-gray-500 text-lg">
          검증된 기술로 안정적이고 확장 가능한 시스템 구축
        </p>
      </motion.div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStacks.map((stack, index) => {
          const Icon = stack.icon

          return (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.03}
                transitionSpeed={2000}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="24px"
              >
                {/* Card */}
                <div className={`group relative h-full bg-dark-gray border ${stack.borderColor} rounded-bento p-6 overflow-hidden transition-all duration-300`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stack.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Category */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-[#1F1F1F] rounded-xl group-hover:bg-[#404040] transition-colors">
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{stack.category}</h3>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {stack.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[#2A2A2A] rounded-lg text-sm text-gray-300 border border-border-gray group-hover:border-gray-600/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                    {stack.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/[0.02] rounded-full group-hover:scale-150 transition-transform duration-500" />
              </div>
              </Tilt>
            </motion.div>
          )
        })}

        {/* Additional Expertise Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.03}
            transitionSpeed={2000}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#ffffff"
            glareBorderRadius="24px"
          >
            <div className="group h-full bg-gradient-to-br from-[#161616] to-[#1F1F1F] border border-gray-600/30 rounded-bento p-6 flex flex-col justify-center items-center text-center">
            <Workflow className="w-12 h-12 text-white/40 mb-4 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
            <h3 className="text-lg font-bold mb-2">And More</h3>
            <p className="text-gray-500 text-sm mb-4">
              지속적으로 최신 기술을 학습하고<br />프로젝트에 적용합니다
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-2.5 py-1 bg-[#2A2A2A] rounded text-xs text-gray-400">Redis</span>
              <span className="px-2.5 py-1 bg-[#2A2A2A] rounded text-xs text-gray-400">MongoDB</span>
              <span className="px-2.5 py-1 bg-[#2A2A2A] rounded text-xs text-gray-400">Nginx</span>
              <span className="px-2.5 py-1 bg-[#2A2A2A] rounded text-xs text-gray-400">GraphQL</span>
            </div>
          </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Technologies', value: '20+' },
          { label: 'Cloud Platforms', value: '3' },
          { label: 'Years Experience', value: '5+' },
          { label: 'Projects', value: '150+' },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-dark-gray border border-border-gray rounded-bento p-4 text-center"
          >
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
