import { motion } from 'framer-motion'
import HeroSection from './HeroSection'
import BentoGrid from './BentoGrid'
import TechStack from './TechStack'
import EfficiencyChart from './EfficiencyChart'
import BoardList from './BoardList'
import Navigation from './Navigation'
import ScrollProgress from './ScrollProgress'
import AnimatedSection from './AnimatedSection'
import StarField3D from './StarField3D'
export default function MainPage({ onOpenInquiry }) {
  return (
    <div className="min-h-screen bg-deep-black">
      {/* Star Constellation Background */}
      <StarField3D />

      <ScrollProgress />
      <Navigation onOpenInquiry={onOpenInquiry} />

      <HeroSection onOpenInquiry={onOpenInquiry} />

      {/* Core Capabilities Section */}
      <section
        id="services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Core <span className="text-gray-500">Capabilities</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Enterprise infrastructure and AI solutions
          </p>
        </div>

        <BentoGrid onOpenInquiry={onOpenInquiry} />
      </section>

      {/* Tech Stack Section with Parallax */}
      <AnimatedSection
        id="tech-stack"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative"
        direction="fade"
        parallax={false}
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white blur-3xl"
          />
        </div>

        <TechStack />
      </AnimatedSection>

      {/* Efficiency Chart Section */}
      <AnimatedSection
        id="results"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        direction="up"
      >
        <EfficiencyChart />
      </AnimatedSection>

      {/* Board List Section */}
      <AnimatedSection
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        direction="up"
        delay={0.2}
      >
        <BoardList />
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection
        className="border-t border-border-gray mt-20"
        direction="fade"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p className="mb-2 text-sm">© 2025 CloudOps. All rights reserved.</p>
            <p className="text-xs">Enterprise Cloud Infrastructure & AI Solutions</p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
