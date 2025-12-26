import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Cloud, GitBranch, Server, Code, Brain, Database, Container, Workflow } from 'lucide-react'

const techStacks = [
  {
    id: 1,
    category: 'Cloud Infrastructure',
    icon: Cloud,
    technologies: ['Multi-Cloud', 'Auto Scaling', 'HA/DR'],
    description: 'AWS, Azure, GCP 플랫폼 전반에 걸친 멀티 클라우드 아키텍처 설계 및 구현',
    color: 'from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 2,
    category: 'RAG Systems',
    icon: Brain,
    technologies: ['Vector DB', 'Embeddings', 'LLM Ops'],
    description: '벡터 데이터베이스와 LLM 통합을 활용한 엔터프라이즈 AI 지식 베이스 구축',
    color: 'from-violet-500/10 to-fuchsia-500/10',
    borderColor: 'border-violet-500/20',
  },
  {
    id: 3,
    category: 'DevOps Pipeline',
    icon: GitBranch,
    technologies: ['CI/CD', 'IaC', 'GitOps'],
    description: '인프라스트럭처 코드(IaC)를 활용한 자동화된 CI/CD 워크플로우 구축',
    color: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 4,
    category: 'ML Operations',
    icon: Server,
    technologies: ['Model Ops', 'Monitoring', 'A/B Testing'],
    description: '대규모 모델 배포 및 라이프사이클 관리 시스템 구현',
    color: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    id: 5,
    category: 'Custom Solutions',
    icon: Code,
    technologies: ['Architecture', 'Consulting', 'Integration'],
    description: '비즈니스 요구사항에 맞춤화된 아키텍처 설계 및 구현',
    color: 'from-orange-500/10 to-yellow-500/10',
    borderColor: 'border-orange-500/20',
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {techStacks.map((stack, index) => {
          const Icon = stack.icon

          return (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
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
      </div>


    </div>
  )
}
