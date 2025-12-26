import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Tag } from 'lucide-react'

export default function PostDetailModal({ post, isOpen, onClose }) {
  if (!post) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#1A1A1A] border border-border-gray rounded-bento max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#1A1A1A] border-b border-border-gray p-6 flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {post.title}
                  </h2>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span className="px-2 py-1 bg-[#2A2A2A] rounded text-xs">
                        {post.category === 'RECRUIT' ? '채용' : '공지'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {post.content || '내용이 없습니다.'}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-[#1A1A1A] border-t border-border-gray p-6">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-[#2A2A2A] hover:bg-[#333] text-white rounded-lg transition-colors"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
