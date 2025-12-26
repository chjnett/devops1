import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Server, Code, Cpu, Database, GitBranch, Network, Brain, Zap } from 'lucide-react'

const capabilities = [
  {
    id: 1,
    title: 'Cloud Infrastructure',
    description: 'AWS, Azure, GCP 플랫폼 전반에 걸친 멀티 클라우드 아키텍처 설계 및 구현.',
    icon: Server,
    size: 'large',
    features: ['Multi-Cloud', 'Auto Scaling', 'HA/DR'],
    action: 'learn_more'
  },
  {
    id: 2,
    title: 'RAG Systems',
    description: '벡터 데이터베이스와 LLM 통합을 통한 엔터프라이즈 AI 지식 베이스 구축.',
    icon: Brain,
    size: 'medium',
    features: ['Vector DB', 'Embeddings', 'LLM Ops']
  },
  {
    id: 3,
    title: 'DevOps Pipeline',
    description: 'IaC(Infrastructure as Code) 기반의 자동화된 CI/CD 워크플로우.',
    icon: GitBranch,
    size: 'medium',
    features: ['CI/CD', 'IaC', 'GitOps']
  },
  {
    id: 4,
    title: 'ML Operations',
    description: '대규모 모델 배포 및 라이프사이클 관리 시스템.',
    icon: Cpu,
    size: 'medium',
    features: ['Model Ops', 'Monitoring', 'A/B Testing']
  },
  {
    id: 5,
    title: 'Custom Solutions',
    description: '비즈니스 요구사항에 최적화된 맞춤형 아키텍처를 설계합니다.',
    icon: Network,
    size: 'medium',
    features: [],
    action: 'contact'
  }
]

export default function BentoGrid({ onOpenInquiry }) {
  const handleCardClick = (capability) => {
    if (capability.action === 'contact') {
      // "Custom Solutions" 카드만 문의하기 모달 열기
      onOpenInquiry()
    } else if (capability.action === 'learn_more') {
      // "Learn more" 카드는 아무 동작 안 함 (또는 향후 상세 페이지로 이동)
      console.log('Learn more:', capability.title)
    }
    // action이 없는 카드는 클릭해도 아무 동작 안 함
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
      {capabilities.map((capability, index) => {
        const Icon = capability.icon
        // Grid span logic: Large items take 2x2, others 1x1
        const gridClass = capability.size === 'large'
          ? 'md:col-span-2 md:row-span-2'
          : 'md:col-span-1 md:row-span-1'

        return (
          <motion.div
            key={capability.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className={gridClass}
          >
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.01}
              transitionSpeed={2000}
              className="h-full"
            >
              <div
                className={`bento-card group h-full relative overflow-hidden flex flex-col justify-between ${
                  capability.action ? 'cursor-pointer' : 'cursor-default'
                }`}
                onClick={() => handleCardClick(capability)}
              >
                <div className="relative z-10 flex-1">
                  {/* Header & Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#1F1F1F] group-hover:bg-[#404040] transition-colors border border-white/5">
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    {capability.action === 'contact' && (
                      <div className="px-2 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20">
                        <span className="text-[10px] text-neon-purple font-bold tracking-wider">CONTACT</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-gray-300 transition-colors">
                    {capability.title}
                  </h3>

                  <p className="text-gray-500 mb-6 text-sm leading-relaxed break-keep">
                    {capability.description}
                  </p>

                  {/* Features Tags */}
                  {capability.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {capability.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#2A2A2A] rounded-full text-xs text-gray-400 border border-border-gray/50 whitespace-nowrap"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="relative z-10 mt-6 pt-4 border-t border-border-gray/50">
                  {capability.action === 'learn_more' ? (
                    <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">Learn more</span>
                      <Zap className="w-4 h-4 text-neon-blue" strokeWidth={1.5} />
                    </div>
                  ) : capability.action === 'contact' ? (
                    <div className="flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">Get Started</span>
                      <span className="text-lg leading-none">→</span>
                    </div>
                  ) : (
                    /* Default spacer or generic action if needed */
                    <div className="h-4" />
                  )}
                </div>

                {/* Animated Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-neon-blue/[0.05] transition-colors duration-500" />

              </div>
            </Tilt>
          </motion.div>
        )
      })}
    </div>
  )
}
