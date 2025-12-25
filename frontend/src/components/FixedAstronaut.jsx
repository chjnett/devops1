import { motion, useScroll, useTransform } from 'framer-motion'

export default function FixedAstronaut() {
  const { scrollY } = useScroll()

  // 메인 페이지(Hero Section) 이후부터 나타나도록 설정
  // Hero Section 높이를 고려하여 약 800px 이후부터 표시
  const opacity = useTransform(scrollY, [700, 900], [0, 1])

  return (
    <motion.div
      className="fixed left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
      style={{ opacity }}
    >
      {/* 우주인 이미지 */}
      <motion.img
        src="/images/second.png"
        alt="Fixed Astronaut"
        className="w-40 h-auto drop-shadow-2xl"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(100, 200, 255, 0.3))',
        }}
        // 미세한 떠있는 효과
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 은은한 글로우 효과 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-2xl -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}
