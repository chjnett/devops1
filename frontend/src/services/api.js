import axios from 'axios'

// API Base URL - Vite proxy를 통해 /api 요청은 localhost:8080으로 전달됨
const API_BASE_URL = '/api'

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
})

// 요청 인터셉터 (토큰 추가 등)
apiClient.interceptors.request.use(
  (config) => {
    // 필요시 토큰을 헤더에 추가
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 상태 코드인 경우
      console.error('API Error:', error.response.data)
      throw new Error(error.response.data.message || '서버 요청에 실패했습니다.')
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      console.error('Network Error:', error.request)
      throw new Error('서버와 연결할 수 없습니다. 네트워크를 확인해주세요.')
    } else {
      // 요청 설정 중 에러가 발생한 경우
      console.error('Request Error:', error.message)
      throw new Error('요청 처리 중 오류가 발생했습니다.')
    }
  }
)

/**
 * 문의 제출 API
 * @param {Object} inquiryData - 문의 데이터
 * @param {string} inquiryData.serviceType - 서비스 유형 (CLOUD_RAG, DEVOPS, AIOPS, MLOPS, CLOUD_INFRA, OTHER)
 * @param {string} inquiryData.companyName - 회사명 (선택)
 * @param {string} inquiryData.name - 이름
 * @param {string} inquiryData.email - 이메일
 * @param {string} inquiryData.phone - 전화번호
 * @param {string} inquiryData.message - 문의 내용
 * @returns {Promise<Object>} 생성된 문의 정보
 */
export const submitInquiry = async (inquiryData) => {
  try {
    const response = await apiClient.post('/inquiries', inquiryData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 게시물 목록 조회 API
 * @param {Object} params - 조회 파라미터
 * @param {string} params.category - 카테고리 필터 (NOTICE, RECRUIT)
 * @param {number} params.page - 페이지 번호 (0부터 시작)
 * @param {number} params.size - 페이지 크기
 * @returns {Promise<Array>} 게시물 목록
 */
export const fetchPosts = async (params = { page: 0, size: 10 }) => {
  try {
    const response = await apiClient.get('/posts', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 특정 게시물 조회 API
 * @param {number} postId - 게시물 ID
 * @returns {Promise<Object>} 게시물 상세 정보
 */
export const fetchPostById = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 관리자 로그인 API
 * @param {Object} credentials - 로그인 정보
 * @param {string} credentials.username - 사용자명
 * @param {string} credentials.password - 비밀번호
 * @returns {Promise<Object>} 인증 토큰 및 사용자 정보
 */
export const adminLogin = async (credentials) => {
  try {
    const response = await apiClient.post('/admin/login', credentials)

    // 토큰을 로컬 스토리지에 저장
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
    }

    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 관리자 로그아웃
 */
export const adminLogout = () => {
  localStorage.removeItem('token')
}

/**
 * 문의 목록 조회 (관리자용)
 * @param {Object} params - 조회 파라미터
 * @returns {Promise<Array>} 문의 목록
 */
export const fetchInquiries = async (params = { page: 0, size: 20 }) => {
  try {
    const response = await apiClient.get('/admin/inquiries', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 게시물 생성 (관리자용)
 * @param {Object} postData - 게시물 데이터
 * @returns {Promise<Object>} 생성된 게시물 정보
 */
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/admin/posts', postData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 게시물 수정 (관리자용)
 * @param {number} postId - 게시물 ID
 * @param {Object} postData - 수정할 게시물 데이터
 * @returns {Promise<Object>} 수정된 게시물 정보
 */
export const updatePost = async (postId, postData) => {
  try {
    const response = await apiClient.put(`/admin/posts/${postId}`, postData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 게시물 삭제 (관리자용)
 * @param {number} postId - 게시물 ID
 * @returns {Promise<void>}
 */
export const deletePost = async (postId) => {
  try {
    await apiClient.delete(`/admin/posts/${postId}`)
  } catch (error) {
    throw error
  }
}

/**
 * 이미지 업로드 (관리자용)
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<Object>} 업로드된 이미지 정보 (URL 포함)
 */
export const uploadImage = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export default apiClient
