# CloudOps Deep Insight

> **엔터프라이즈급 Cloud 인프라, DevOps, RAG, AIOps, MLOps 구축 전문 솔루션**

다크 벤토 그리드 레이아웃 기반의 프리미엄 Cloud & AI 인프라 솔루션 랜딩 페이지입니다.

---

## 📋 프로젝트 개요

- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion + Three.js
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Email:** EmailJS
- **주요 기능:**
  - 🎨 다크 벤토 그리드 레이아웃
  - 💬 스마트 문의 시스템 (자동 이메일 알림)
  - 📰 게시판 시스템 (공지사항/채용)
  - 🔐 관리자 페이지 (Supabase Auth)
  - 🌐 3D 애니메이션 및 인터랙티브 UI

---

## 🎨 디자인 시스템

- **배경색:** `#0A0A0A` (딥 블랙)
- **카드/섹션:** `#161616` (다크 그레이)
- **포인트 컬러:** `#B6E63A` (라임 그린)
- **스타일:** 24px 이상의 둥근 코너, 은은한 애니메이션

---

## 🚀 시작하기

### 1. Prerequisites

- Node.js 18+ 설치
- Supabase 계정 (무료)
- EmailJS 계정 (무료)

### 2. 클론 및 설치

```bash
git clone https://github.com/chjnett/devops1.git
cd devops1/frontend
npm install
```

### 3. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 `supabase-schema.sql` 실행
3. Project Settings에서 URL과 anon key 복사

### 4. EmailJS 설정

자세한 내용은 [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) 참고

1. [EmailJS](https://www.emailjs.com) 계정 생성
2. Email Service 연결 (Gmail/Outlook)
3. Email Template 생성
4. Service ID, Template ID, Public Key 복사

### 5. 환경 변수 설정

`frontend/.env.example`을 `.env`로 복사 후 값 입력:

```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=your-email@example.com
```

### 6. 개발 서버 실행

```bash
cd frontend
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 📂 프로젝트 구조

```
devops1/
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/         # React 컴포넌트
│   │   │   ├── MainPage.jsx   # 메인 페이지
│   │   │   ├── HeroSection.jsx # 히어로 섹션
│   │   │   ├── BentoGrid.jsx  # 벤토 그리드 레이아웃
│   │   │   ├── TechStack.jsx  # 기술 스택 섹션
│   │   │   ├── BoardList.jsx  # 게시판 목록
│   │   │   ├── PostDetailModal.jsx # 게시물 상세 모달
│   │   │   ├── InquiryModal.jsx # 문의 모달
│   │   │   └── AdminPage.jsx  # 관리자 페이지
│   │   ├── lib/
│   │   │   └── supabase.js    # Supabase 클라이언트
│   │   ├── services/
│   │   │   └── api.js         # Supabase API 서비스
│   │   ├── App.jsx            # 메인 앱 (라우팅)
│   │   └── main.jsx           # 진입점
│   ├── .env.example           # 환경 변수 예시
│   ├── package.json
│   └── vite.config.js
│
├── supabase-schema.sql          # Supabase 데이터베이스 스키마
├── EMAILJS_SETUP.md             # EmailJS 설정 가이드
├── .gitignore
└── README.md                    # 이 파일
```

---

## 🔌 API 엔드포인트

### 공개 API

#### 문의 제출
```http
POST /api/inquiries
Content-Type: application/json

{
  "serviceType": "CLOUD_RAG",
  "companyName": "회사명",
  "name": "홍길동",
  "email": "test@example.com",
  "phone": "010-1234-5678",
  "message": "문의 내용"
}
```

#### 게시물 목록 조회
```http
GET /api/posts?category=NOTICE&page=0&size=10
```

#### 최신 게시물 조회
```http
GET /api/posts/recent
```

### 관리자 API

#### 문의 목록 조회
```http
GET /api/inquiries/admin?page=0&size=20
```

#### 게시물 생성
```http
POST /api/posts/admin
Content-Type: application/json

{
  "title": "공지사항 제목",
  "content": "내용",
  "category": "NOTICE",
  "published": true
}
```

---

## 🎯 주요 기능

### 1. **다크 벤토 그리드 레이아웃**
   - Cloud RAG, DevOps, AIOps, MLOps 핵심 역량을 비대칭 그리드로 시각화
   - Framer Motion 애니메이션으로 부드러운 사용자 경험 제공

### 2. **스마트 문의 시스템**
   - 서비스 유형 선택 기능
   - 실시간 유효성 검사
   - 자동 이메일 알림 (관리자에게 발송)
   - 성공/실패 피드백

### 3. **게시판 시스템**
   - 공지사항 및 채용 정보 관리
   - 카테고리별 필터링
   - 페이징 처리

### 4. **반응형 디자인**
   - 모바일, 태블릿, 데스크탑 완벽 대응
   - 다크 테마 최적화

---

## 🛠️ 기술 스택

### Frontend
- **React 18.3** - UI 라이브러리
- **Vite 5.1** - 빌드 도구
- **Tailwind CSS 3.4** - 유틸리티 CSS 프레임워크
- **Framer Motion 11** - 애니메이션 라이브러리
- **Three.js + React Three Fiber** - 3D 그래픽스
- **React Router DOM 7** - 클라이언트 라우팅
- **Lucide React** - 아이콘 라이브러리
- **React Parallax Tilt** - 인터랙티브 카드 효과

### Backend & Services
- **Supabase** - Backend as a Service
  - PostgreSQL 데이터베이스
  - Row Level Security (RLS)
  - 실시간 구독
  - Authentication
- **EmailJS** - 이메일 알림 서비스

---

## 🚀 Vercel 배포

### 1. Vercel 계정 연결

1. [Vercel](https://vercel.com) 가입 (GitHub 계정으로 로그인)
2. **"Add New Project"** 클릭
3. GitHub 저장소 선택: `devops1`
4. **Import** 클릭

### 2. 프로젝트 설정

**Framework Preset:** Vite
**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `dist`

### 3. 환경 변수 설정

Vercel Dashboard → Settings → Environment Variables에서 다음 변수 추가:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=your-email@example.com
```

**Environment:** Production, Preview, Development 모두 체크

### 4. 배포

**"Deploy"** 버튼 클릭!

배포 완료 후 `https://your-project.vercel.app` 에서 확인 가능합니다.

### 자동 배포

GitHub에 push하면 자동으로 Vercel에 배포됩니다:
- `master` 브랜치 → Production 배포
- 다른 브랜치 → Preview 배포

---

## 🏗️ 로컬 빌드

### Frontend 빌드
```bash
cd frontend
npm run build
```

빌드된 파일은 `frontend/dist/` 디렉토리에 생성됩니다.

### 빌드 미리보기
```bash
npm run preview
```

---

## 📝 향후 추가 기능 (Backlog)

- [ ] 관리자 로그인 및 인증 시스템
- [ ] 이미지 업로드 및 관리
- [ ] 인프라 대시보드 데모
- [ ] PDF 포트폴리오 자동 생성 및 발송
- [ ] 검색 기능
- [ ] 다국어 지원

---

## 📄 라이선스

This project is private and confidential.

---

## 👤 Contact

Cloud-Ops Deep Insight Team
- Email: admin@cloudops-insight.com
- Website: http://localhost:3000

---

## 🎉 완료!

이제 브라우저에서 `http://localhost:3000`에 접속하여 **다크 벤토 그리드 레이아웃** 기반의 **Cloud RAG 전문가 느낌**의 랜딩 페이지를 확인하세요!
