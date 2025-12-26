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
      const data = await fetchPosts({ page: 0, size: 6 })
      // Supabase API는 { content: [...], totalElements: ... } 형식으로 반환
      setPosts(data.content || [])
    } catch (error) {
      console.error('Failed to load posts:', error)
      // 에러 시 더미 데이터 표시
      setPosts([
        {
          id: 1,
          title: '[Notice] CloudOps Platform Launch',
          content: 'CloudOps Deep Insight 플랫폼이 출시되었습니다. 클라우드 인프라 관리와 AI 기반 분석을 제공합니다.',
          category: 'NOTICE',
          created_at: '2025-01-15'
        },
        {
          id: 2,
          title: '[Hiring] Senior DevOps Engineer',
          content: 'DevOps 엔지니어를 채용합니다. Kubernetes, AWS 경험자 우대.',
          category: 'RECRUIT',
          created_at: '2025-01-10'
        },
        {
          id: 3,
          title: '[Case Study] FinTech RAG Implementation',
          content: '금융권 RAG 시스템 구축 사례를 소개합니다.',
          category: 'NOTICE',
          created_at: '2025-01-05'
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
      {/* Header - Simple Fade In */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Latest <span className="text-gray-500">Updates</span>
        </h2>
        <p className="text-gray-500 text-lg">
          News and announcements
        </p>
      </motion.div>

      {/* Grid Pattern */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          const Icon = getCategoryIcon(post.category)

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2000}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glareBorderRadius="24px"
              >
                <div className="bento-card group cursor-pointer h-full min-h-[220px] flex flex-col justify-between hover:border-gray-500/50 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-[#1F1F1F] group-hover:bg-[#333] transition-colors">
                        <Icon className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-mono text-gray-500 bg-[#1A1A1A] px-2 py-1 rounded">
                        {post.created_at ? new Date(post.created_at).toLocaleDateString('ko-KR') : 'N/A'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-3 group-hover:text-white text-gray-200 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {post.content && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                        {post.content.length > 100
                          ? `${post.content.substring(0, 100)}...`
                          : post.content}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-neon-blue transition-colors mt-4">
                    <span className="font-medium">Read Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Tilt>
            </motion.div>
          )
        })}
      </div>

      <div className="text-center mt-12">
        <button className="text-sm text-gray-500 hover:text-white transition-colors border-b border-gray-800 hover:border-white pb-0.5">
          View All Updates
        </button>
      </div>
    </div>
  )
}

