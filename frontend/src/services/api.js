import { supabase } from '../lib/supabase'

/**
 * 문의 제출 API
 * @param {Object} inquiryData - 문의 데이터
 * @param {string} inquiryData.name - 이름
 * @param {string} inquiryData.email - 이메일
 * @param {string} inquiryData.company - 회사명 (선택)
 * @param {string} inquiryData.message - 문의 내용
 * @returns {Promise<Object>} 생성된 문의 정보
 */
export const submitInquiry = async (inquiryData) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: inquiryData.name,
          email: inquiryData.email,
          company: inquiryData.company || null,
          message: inquiryData.message,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('문의 제출 오류:', error)
    throw new Error(error.message || '문의 제출에 실패했습니다.')
  }
}

/**
 * 게시물 목록 조회 API
 * @param {Object} params - 조회 파라미터
 * @param {number} params.page - 페이지 번호 (0부터 시작)
 * @param {number} params.size - 페이지 크기
 * @returns {Promise<Array>} 게시물 목록
 */
export const fetchPosts = async (params = { page: 0, size: 10 }) => {
  try {
    const { page = 0, size = 10 } = params
    const from = page * size
    const to = from + size - 1

    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    return {
      content: data,
      totalElements: count,
      totalPages: Math.ceil(count / size),
      size: size,
      number: page
    }
  } catch (error) {
    console.error('게시물 목록 조회 오류:', error)
    throw new Error(error.message || '게시물을 불러오는데 실패했습니다.')
  }
}

/**
 * 특정 게시물 조회 API
 * @param {string} postId - 게시물 ID (UUID)
 * @returns {Promise<Object>} 게시물 상세 정보
 */
export const fetchPostById = async (postId) => {
  try {
    // 조회수 증가
    const { error: updateError } = await supabase.rpc('increment_views', {
      post_id: postId
    })

    // 게시물 조회
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('게시물 조회 오류:', error)
    throw new Error(error.message || '게시물을 불러오는데 실패했습니다.')
  }
}

/**
 * 관리자 로그인 API
 * @param {Object} credentials - 로그인 정보
 * @param {string} credentials.email - 이메일
 * @param {string} credentials.password - 비밀번호
 * @returns {Promise<Object>} 인증 정보
 */
export const adminLogin = async (credentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error('로그인 오류:', error)
    throw new Error(error.message || '로그인에 실패했습니다.')
  }
}

/**
 * 관리자 로그아웃
 */
export const adminLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error('로그아웃 오류:', error)
    throw new Error(error.message || '로그아웃에 실패했습니다.')
  }
}

/**
 * 현재 로그인한 사용자 정보 가져오기
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error)
    return null
  }
}

/**
 * 문의 목록 조회 (관리자용)
 * @param {Object} params - 조회 파라미터
 * @returns {Promise<Object>} 문의 목록
 */
export const fetchInquiries = async (params = { page: 0, size: 20 }) => {
  try {
    const { page = 0, size = 20 } = params
    const from = page * size
    const to = from + size - 1

    const { data, error, count } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    return {
      content: data,
      totalElements: count,
      totalPages: Math.ceil(count / size),
      size: size,
      number: page
    }
  } catch (error) {
    console.error('문의 목록 조회 오류:', error)
    throw new Error(error.message || '문의 목록을 불러오는데 실패했습니다.')
  }
}

/**
 * 문의 상태 업데이트 (관리자용)
 * @param {string} inquiryId - 문의 ID
 * @param {string} status - 상태 (pending, in_progress, completed)
 * @returns {Promise<Object>} 업데이트된 문의 정보
 */
export const updateInquiryStatus = async (inquiryId, status) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', inquiryId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('문의 상태 업데이트 오류:', error)
    throw new Error(error.message || '문의 상태 업데이트에 실패했습니다.')
  }
}

/**
 * 게시물 생성 (관리자용)
 * @param {Object} postData - 게시물 데이터
 * @returns {Promise<Object>} 생성된 게시물 정보
 */
export const createPost = async (postData) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title: postData.title,
          content: postData.content,
          author: postData.author || '관리자'
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('게시물 생성 오류:', error)
    throw new Error(error.message || '게시물 생성에 실패했습니다.')
  }
}

/**
 * 게시물 수정 (관리자용)
 * @param {string} postId - 게시물 ID
 * @param {Object} postData - 수정할 게시물 데이터
 * @returns {Promise<Object>} 수정된 게시물 정보
 */
export const updatePost = async (postId, postData) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: postData.title,
        content: postData.content,
        author: postData.author
      })
      .eq('id', postId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('게시물 수정 오류:', error)
    throw new Error(error.message || '게시물 수정에 실패했습니다.')
  }
}

/**
 * 게시물 삭제 (관리자용)
 * @param {string} postId - 게시물 ID
 * @returns {Promise<void>}
 */
export const deletePost = async (postId) => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error) throw error
  } catch (error) {
    console.error('게시물 삭제 오류:', error)
    throw new Error(error.message || '게시물 삭제에 실패했습니다.')
  }
}

/**
 * 이미지 업로드 (관리자용)
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<Object>} 업로드된 이미지 정보 (URL 포함)
 */
export const uploadImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (error) throw error

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return {
      url: publicUrl,
      path: filePath
    }
  } catch (error) {
    console.error('이미지 업로드 오류:', error)
    throw new Error(error.message || '이미지 업로드에 실패했습니다.')
  }
}

export default supabase
