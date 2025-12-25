-- ============================================
-- Supabase 데이터베이스 스키마
-- ============================================

-- 1. 게시판 테이블 (posts)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 문의 테이블 (inquiries)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(200),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, in_progress, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 관리자 테이블 (admins) - 선택사항
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS) 정책
-- ============================================

-- posts 테이블 RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 게시글 읽기 가능
CREATE POLICY "Anyone can read posts"
  ON posts FOR SELECT
  USING (true);

-- 인증된 사용자만 게시글 작성 가능 (관리자)
CREATE POLICY "Authenticated users can insert posts"
  ON posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 인증된 사용자만 게시글 수정 가능 (관리자)
CREATE POLICY "Authenticated users can update posts"
  ON posts FOR UPDATE
  USING (auth.role() = 'authenticated');

-- 인증된 사용자만 게시글 삭제 가능 (관리자)
CREATE POLICY "Authenticated users can delete posts"
  ON posts FOR DELETE
  USING (auth.role() = 'authenticated');

-- inquiries 테이블 RLS 활성화
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 문의 작성 가능
CREATE POLICY "Anyone can insert inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- 인증된 사용자만 문의 읽기 가능 (관리자)
CREATE POLICY "Authenticated users can read inquiries"
  ON inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

-- 인증된 사용자만 문의 수정 가능 (관리자)
CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================
-- 인덱스 생성
-- ============================================

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- ============================================
-- 트리거: updated_at 자동 업데이트
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 조회수 증가 함수
-- ============================================

CREATE OR REPLACE FUNCTION increment_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
