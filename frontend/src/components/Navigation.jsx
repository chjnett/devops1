import { motion, useScroll, useTransform } from 'framer-motion'
import { Server, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navigation({ onOpenInquiry }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0.5)', 'rgba(10, 10, 10, 0.95)']
  )

  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0.3, 1]
  )

  // 스크롤에 따라 로고 회전
  const rotate = useTransform(scrollY, (value) => value * 0.5)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backgroundColor,
        borderBottomColor: useTransform(
          borderOpacity,
          (value) => `rgba(38, 38, 38, ${value})`
        )
      }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.div
              style={{ rotate }}
            >
              <Server className="w-6 h-6 text-white" strokeWidth={1.5} />
            </motion.div>
            <span className="text-lg font-semibold tracking-tight">
              CloudOps
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Tech Stack', 'News'].map((item, index) => {
              const href = item === 'Services' ? '#services' : item === 'Tech Stack' ? '#tech-stack' : '#board'

              return (
                <motion.a
                  key={item}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors text-sm relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </motion.a>
              )
            })}
            <motion.button
              onClick={onOpenInquiry}
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-4 border-t border-border-gray overflow-hidden"
          >
            {[
              { name: 'Services', href: '#services' },
              { name: 'Tech Stack', href: '#tech-stack' },
              { name: 'News', href: '#board' }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-gray-400 hover:text-white text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <button onClick={onOpenInquiry} className="btn-primary w-full">
              Contact
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
