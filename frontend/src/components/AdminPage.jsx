import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  adminLogin,
  adminLogout,
  getCurrentUser,
  fetchInquiries,
  updateInquiryStatus,
  fetchPosts,
  createPost,
  updatePost,
  deletePost
} from '../services/api'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('inquiries') // 'inquiries' | 'posts'

  // Login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Inquiries
  const [inquiries, setInquiries] = useState([])
  const [inquiriesPage, setInquiriesPage] = useState(0)

  // Posts
  const [posts, setPosts] = useState([])
  const [postsPage, setPostsPage] = useState(0)
  const [showPostForm, setShowPostForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [postForm, setPostForm] = useState({ title: '', content: '', author: '관리자' })

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    setLoading(false)

    if (currentUser) {
      loadInquiries()
      loadPosts()
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')

    try {
      await adminLogin({ email, password })
      await checkUser()
    } catch (error) {
      setLoginError(error.message)
    }
  }

  const handleLogout = async () => {
    await adminLogout()
    setUser(null)
    setInquiries([])
    setPosts([])
  }

  const loadInquiries = async (page = 0) => {
    try {
      const data = await fetchInquiries({ page, size: 20 })
      setInquiries(data.content)
      setInquiriesPage(page)
    } catch (error) {
      console.error('문의 목록 로드 실패:', error)
    }
  }

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus)
      loadInquiries(inquiriesPage)
    } catch (error) {
      console.error('상태 변경 실패:', error)
    }
  }

  const loadPosts = async (page = 0) => {
    try {
      const data = await fetchPosts({ page, size: 20 })
      setPosts(data.content)
      setPostsPage(page)
    } catch (error) {
      console.error('게시물 목록 로드 실패:', error)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()

    try {
      if (editingPost) {
        await updatePost(editingPost.id, postForm)
      } else {
        await createPost(postForm)
      }

      setShowPostForm(false)
      setEditingPost(null)
      setPostForm({ title: '', content: '', author: '관리자' })
      loadPosts(postsPage)
    } catch (error) {
      console.error('게시물 저장 실패:', error)
    }
  }

  const handleEditPost = (post) => {
    setEditingPost(post)
    setPostForm({
      title: post.title,
      content: post.content,
      author: post.author || '관리자'
    })
    setShowPostForm(true)
  }

  const handleDeletePost = async (postId) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await deletePost(postId)
      loadPosts(postsPage)
    } catch (error) {
      console.error('게시물 삭제 실패:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-white">로딩 중...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-dark-gray border border-border-gray rounded-bento p-8">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              관리자 로그인
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-border-gray rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-border-gray rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {loginError && (
                <div className="text-red-500 text-sm">{loginError}</div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                로그인
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">관리자 페이지</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            로그아웃
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-blue-500 text-white'
                : 'bg-dark-gray text-gray-400 hover:bg-[#2A2A2A]'
            }`}
          >
            문의 관리
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'posts'
                ? 'bg-blue-500 text-white'
                : 'bg-dark-gray text-gray-400 hover:bg-[#2A2A2A]'
            }`}
          >
            게시물 관리
          </button>
        </div>

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="bg-dark-gray border border-border-gray rounded-bento p-6">
            <h2 className="text-2xl font-bold text-white mb-6">문의 목록</h2>

            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="bg-[#1F1F1F] border border-border-gray rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-semibold">{inquiry.name}</h3>
                      <p className="text-gray-400 text-sm">{inquiry.email}</p>
                      {inquiry.company && (
                        <p className="text-gray-500 text-sm">{inquiry.company}</p>
                      )}
                    </div>
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      className="bg-[#2A2A2A] text-white border border-border-gray rounded px-3 py-1 text-sm"
                    >
                      <option value="pending">대기중</option>
                      <option value="in_progress">진행중</option>
                      <option value="completed">완료</option>
                    </select>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{inquiry.message}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(inquiry.created_at).toLocaleString('ko-KR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">게시물 목록</h2>
              <button
                onClick={() => {
                  setShowPostForm(true)
                  setEditingPost(null)
                  setPostForm({ title: '', content: '', author: '관리자' })
                }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                새 게시물
              </button>
            </div>

            {showPostForm && (
              <div className="bg-dark-gray border border-border-gray rounded-bento p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  {editingPost ? '게시물 수정' : '새 게시물 작성'}
                </h3>

                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">제목</label>
                    <input
                      type="text"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      className="w-full bg-[#1F1F1F] border border-border-gray rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">내용</label>
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      rows={6}
                      className="w-full bg-[#1F1F1F] border border-border-gray rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      {editingPost ? '수정' : '작성'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPostForm(false)
                        setEditingPost(null)
                      }}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-dark-gray border border-border-gray rounded-bento p-6">
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#1F1F1F] border border-border-gray rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{post.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">
                          작성자: {post.author || '관리자'} | 조회수: {post.views || 0}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(post.created_at).toLocaleString('ko-KR')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
