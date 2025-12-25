import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FileText, Briefcase, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fetchPosts } from '../services/api'

export default function BoardList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await fetchPosts()
      setPosts(data)
    } catch (error) {
      console.error('Failed to load posts:', error)
      setPosts([
        {
          id: 1,
          title: '[Notice] CloudOps Platform Launch',
          category: 'NOTICE',
          createdAt: '2025-01-15'
        },
        {
          id: 2,
          title: '[Hiring] Senior DevOps Engineer',
          category: 'RECRUIT',
          createdAt: '2025-01-10'
        },
        {
          id: 3,
          title: '[Case Study] FinTech RAG Implementation',
          category: 'NOTICE',
          createdAt: '2025-01-05'
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category) => {
    return category === 'RECRUIT' ? Briefcase : FileText
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-gray-700 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div id="board">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Latest <span className="text-gray-500">Updates</span>
        </h2>
        <p className="text-gray-500 text-lg">
          News and announcements
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => {
          const Icon = getCategoryIcon(post.category)

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.02}
                transitionSpeed={2000}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#ffffff"
                glareBorderRadius="24px"
              >
                <div className="bento-card group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-[#1F1F1F]">
                      <Icon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs text-gray-600">{post.createdAt}</span>
                  </div>

                  <h3 className="text-base font-semibold mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-gray-400 transition-colors text-sm">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>
              </Tilt>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <button className="btn-secondary">
          View All
        </button>
      </motion.div>
    </div>
  )
}
