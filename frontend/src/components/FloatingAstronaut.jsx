import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function FloatingAstronaut() {
  const { scrollY } = useScroll()
  const [hasAppeared, setHasAppeared] = useState(false)
  const [bounceY, setBounceY] = useState(0)

  // 스크롤 위치에 따라 우주인이 나타나는 애니메이션
  const opacity = useTransform(scrollY, [100, 400], [0, 1])
  const scale = useTransform(scrollY, [100, 400], [0.5, 1])
  const x = useTransform(scrollY, [100, 400], [600, 0])
  const rotateY = useTransform(scrollY, [100, 400], [90, 0])
  const z = useTransform(scrollY, [100, 400], [200, 0])

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (latest > 400 && !hasAppeared) {
        setHasAppeared(true)
      }
    })

    return () => unsubscribe()
  }, [scrollY, hasAppeared])

  // 통통 튀는 애니메이션
  useEffect(() => {
    if (!hasAppeared) return

    let direction = 1
    let currentY = 0
    let velocity = 0
    const gravity = 0.5
    const bounceDamping = 0.7
    const ground = 0

    const animate = () => {
      velocity += gravity * direction
      currentY += velocity

      // 바닥에 닿으면 튕김
      if (currentY >= ground) {
        currentY = ground
        velocity = -velocity * bounceDamping

        // 속도가 너무 작으면 다시 큰 속도로
        if (Math.abs(velocity) < 2) {
          velocity = -15
        }
      }

      // 천장에 닿으면 튕김
      if (currentY <= -300) {
        currentY = -300
        velocity = -velocity * bounceDamping
      }

      setBounceY(currentY)
      requestAnimationFrame(animate)
    }

    const animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [hasAppeared])

  return (
    <motion.div
      className="fixed left-8 top-1/2 z-40 pointer-events-none"
      style={{
        opacity,
        scale,
        x,
        rotateY,
        z,
        y: hasAppeared ? bounceY : 0,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="relative"
        animate={hasAppeared ? {
          rotate: [0, -5, 5, -5, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* 우주인 이미지 */}
        <motion.img
          src="/images/second.png"
          alt="Floating Astronaut"
          className="w-32 h-auto drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(100, 200, 255, 0.5))',
          }}
        />

        {/* 3D 효과를 위한 그림자 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* 별 파티클 효과 */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full blur-sm" />
        </motion.div>
        <motion.div
          className="absolute -bottom-3 -left-3"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full blur-sm" />
        </motion.div>
      </motion.div>

      {/* 바운스 임팩트 효과 */}
      {hasAppeared && Math.abs(bounceY) < 5 && (
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-2 bg-white/30 rounded-full blur-md"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}
