import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up', // up, down, left, right, fade
  parallax = false,
  ...props
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // 패럴랙스 효과
  const y = useTransform(scrollYProgress, [0, 1], parallax ? [100, -100] : [0, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  // 방향별 초기 위치
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 60 }
      case 'down':
        return { opacity: 0, y: -60 }
      case 'left':
        return { opacity: 0, x: -60 }
      case 'right':
        return { opacity: 0, x: 60 }
      case 'fade':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: 60 }
    }
  }

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      case 'fade':
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      style={parallax ? { y, opacity } : {}}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
