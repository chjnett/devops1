import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Server, Code, Cpu, Database, GitBranch, Network, Brain, Zap } from 'lucide-react'

const capabilities = [
  {
    id: 1,
    title: 'Cloud Infrastructure',
    description: 'Multi-cloud architecture design and implementation across AWS, Azure, and GCP platforms.',
    icon: Server,
    size: 'large',
    features: ['Multi-Cloud', 'Auto Scaling', 'HA/DR']
  },
  {
    id: 2,
    title: 'RAG Systems',
    description: 'Enterprise AI knowledge bases with vector databases and LLM integration.',
    icon: Brain,
    size: 'medium',
    features: ['Vector DB', 'Embeddings', 'LLM Ops']
  },
  {
    id: 3,
    title: 'DevOps Pipeline',
    description: 'Automated CI/CD workflows with infrastructure as code.',
    icon: GitBranch,
    size: 'medium',
    features: ['CI/CD', 'IaC', 'GitOps']
  },
  {
    id: 4,
    title: 'ML Operations',
    description: 'Model deployment and lifecycle management at scale.',
    icon: Cpu,
    size: 'medium',
    features: ['Model Ops', 'Monitoring', 'A/B Testing']
  },
]

export default function BentoGrid({ onOpenInquiry }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {capabilities.map((capability, index) => {
        const Icon = capability.icon
        const gridClass = capability.size === 'large'
          ? 'md:col-span-2 md:row-span-2'
          : 'md:col-span-1'

        return (
          <motion.div
            key={capability.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={gridClass}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              scale={1.02}
              transitionSpeed={2500}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#ffffff"
              glarePosition="all"
              glareBorderRadius="24px"
            >
              <div
                className="bento-card group cursor-pointer h-full relative overflow-hidden"
                onClick={onOpenInquiry}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#1F1F1F] group-hover:bg-[#404040] transition-colors">
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-gray-300 transition-colors">
                    {capability.title}
                  </h3>

                  <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                    {capability.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {capability.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#2A2A2A] rounded-full text-xs text-gray-400 border border-border-gray"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {capability.size === 'large' && (
                    <div className="mt-6 pt-6 border-t border-border-gray">
                      <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                        <span className="text-sm font-medium">Learn more</span>
                        <Zap className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
              </div>
            </Tilt>
          </motion.div>
        )
      })}

      {/* Additional Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          scale={1.02}
          transitionSpeed={2500}
          glareEnable={true}
          glareMaxOpacity={0.15}
          glareColor="#ffffff"
          glareBorderRadius="24px"
        >
          <div className="bento-card border-gray-600/30 h-full">
            <Network className="w-10 h-10 text-white/40 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-bold mb-2">Custom Solutions</h3>
            <p className="text-gray-500 text-sm mb-4">
              Tailored architecture for your business needs
            </p>
            <button onClick={onOpenInquiry} className="text-white text-sm font-medium hover:text-gray-300 transition-colors">
              Contact us →
            </button>
          </div>
        </Tilt>
      </motion.div>
    </div>
  )
}
