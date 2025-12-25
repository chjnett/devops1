import { motion, AnimatePresence } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { X, Send, CheckCircle, AlertCircle, Cloud, GitBranch, Brain, Cpu, Server, Zap, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { submitInquiry } from '../services/api'

const SERVICE_TYPES = [
  { value: 'CLOUD_RAG', label: '클라우드 RAG 구축', icon: Brain, color: 'from-violet-500/10 to-purple-500/10' },
  { value: 'DEVOPS', label: '데브옵스', icon: GitBranch, color: 'from-blue-500/10 to-cyan-500/10' },
  { value: 'AIOPS', label: 'AI옵스', icon: Cpu, color: 'from-green-500/10 to-emerald-500/10' },
  { value: 'MLOPS', label: 'ML옵스', icon: Server, color: 'from-orange-500/10 to-yellow-500/10' },
  { value: 'CLOUD_INFRA', label: '클라우드 인프라', icon: Cloud, color: 'from-pink-500/10 to-rose-500/10' },
  { value: 'OTHER', label: '기타', icon: Zap, color: 'from-gray-500/10 to-slate-500/10' },
]

export default function InquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    serviceType: [],
    companyName: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      await submitInquiry(formData)
      setStatus('success')

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          serviceType: [],
          companyName: '',
          name: '',
          email: '',
          phone: '',
          message: '',
        })
        setStatus('idle')
        onClose()
      }, 2000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error.message || '문의 전송에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const isFormValid = formData.serviceType.length > 0 && formData.name && formData.email && formData.message

  const toggleServiceType = (value) => {
    setFormData(prev => ({
      ...prev,
      serviceType: prev.serviceType.includes(value)
        ? prev.serviceType.filter(v => v !== value)
        : [...prev.serviceType, value]
    }))
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with macOS-style blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
              className="bg-dark-gray border border-border-gray rounded-bento-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl shadow-black/50"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <motion.h2
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  문의하기
                </motion.h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-[#2A2A2A] rounded-xl transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Success Message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25
                  }}
                  className="mb-6 p-4 bg-white/10 border border-white/30 rounded-bento flex items-center gap-3 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 15,
                      delay: 0.1
                    }}
                  >
                    <CheckCircle className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-white">성공적으로 전달되었습니다!</p>
                    <p className="text-sm text-gray-400">빠른 시일 내에 연락드리겠습니다.</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25
                  }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-bento flex items-center gap-3 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 15,
                      delay: 0.1
                    }}
                  >
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-red-500">전송 실패</p>
                    <p className="text-sm text-gray-400">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1
                    }
                  }
                }}
              >
                {/* Service Type */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <label className="block text-sm font-semibold mb-3">
                    서비스 선택 <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 font-normal ml-2">(중복 선택 가능)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SERVICE_TYPES.map((service) => {
                      const Icon = service.icon
                      const isSelected = formData.serviceType.includes(service.value)

                      return (
                        <Tilt
                          key={service.value}
                          tiltMaxAngleX={5}
                          tiltMaxAngleY={5}
                          scale={1.02}
                          transitionSpeed={2000}
                        >
                          <motion.button
                            type="button"
                            onClick={() => toggleServiceType(service.value)}
                            className={`relative p-4 rounded-bento border-2 transition-all duration-300 w-full text-left ${
                              isSelected
                                ? 'border-white bg-gradient-to-br ' + service.color
                                : 'border-border-gray bg-deep-black hover:border-gray-600'
                            }`}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          >
                            {/* Selected Indicator */}
                            {isSelected && (
                              <motion.div
                                className="absolute top-2 right-2"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                              >
                                <CheckCircle className="w-5 h-5 text-white" strokeWidth={2} />
                              </motion.div>
                            )}

                            {/* Icon */}
                            <div className={`p-2 rounded-lg mb-2 inline-block ${
                              isSelected ? 'bg-white/20' : 'bg-[#1F1F1F]'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                isSelected ? 'text-white' : 'text-gray-400'
                              }`} strokeWidth={1.5} />
                            </div>

                            {/* Label */}
                            <p className={`text-sm font-medium ${
                              isSelected ? 'text-white' : 'text-gray-400'
                            }`}>
                              {service.label}
                            </p>
                          </motion.button>
                        </Tilt>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Company Name (Optional) */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <label className="block text-sm font-semibold mb-3">
                    회사명 <span className="text-gray-500 text-xs">(선택)</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Building2 className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="회사명을 입력하세요"
                      className="w-full bg-deep-black border-2 border-border-gray rounded-bento pl-12 pr-4 py-3.5 focus:outline-none focus:border-white focus:bg-[#1A1A1A] hover:border-gray-600 transition-all duration-200 placeholder:text-gray-600"
                    />
                  </div>
                </motion.div>

                {/* Name & Email */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <User className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="홍길동"
                        className="w-full bg-deep-black border-2 border-border-gray rounded-bento pl-12 pr-4 py-3.5 focus:outline-none focus:border-white focus:bg-[#1A1A1A] hover:border-gray-600 transition-all duration-200 placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@example.com"
                        className="w-full bg-deep-black border-2 border-border-gray rounded-bento pl-12 pr-4 py-3.5 focus:outline-none focus:border-white focus:bg-[#1A1A1A] hover:border-gray-600 transition-all duration-200 placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <label className="block text-sm font-semibold mb-3">
                    전화번호 <span className="text-gray-500 text-xs">(선택)</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Phone className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="010-1234-5678"
                      className="w-full bg-deep-black border-2 border-border-gray rounded-bento pl-12 pr-4 py-3.5 focus:outline-none focus:border-white focus:bg-[#1A1A1A] hover:border-gray-600 transition-all duration-200 placeholder:text-gray-600"
                    />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <label className="block text-sm font-semibold mb-3">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-4 pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="문의하실 내용을 자세히 작성해주세요..."
                      className="w-full bg-deep-black border-2 border-border-gray rounded-bento pl-12 pr-4 py-3.5 focus:outline-none focus:border-white focus:bg-[#1A1A1A] hover:border-gray-600 transition-all duration-200 resize-none placeholder:text-gray-600"
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  type="submit"
                  disabled={!isFormValid || status === 'loading' || status === 'success'}
                  whileHover={isFormValid && status === 'idle' ? { scale: 1.02, y: -3 } : {}}
                  whileTap={isFormValid && status === 'idle' ? { scale: 0.98 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 17
                  }}
                  className={`relative w-full py-4 rounded-bento font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                    isFormValid && status !== 'success'
                      ? 'bg-white text-deep-black hover:shadow-2xl hover:shadow-white/40'
                      : 'bg-[#2A2A2A] text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {/* Shine effect */}
                  {isFormValid && status === 'idle' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: 'linear'
                      }}
                    />
                  )}

                  {status === 'loading' ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-3 border-deep-black/30 border-t-deep-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      전송 중...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </motion.div>
                      전송 완료!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" strokeWidth={2} />
                      문의 전송
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Privacy Notice */}
              <motion.p
                className="text-xs text-gray-500 text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                제출하신 정보는 문의 답변 목적으로만 사용되며, 개인정보 보호법에 따라 안전하게 관리됩니다.
              </motion.p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
