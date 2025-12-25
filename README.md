# Cloud-Ops Deep Insight

> **엔터프라이즈급 Cloud 인프라, DevOps, RAG, AIOps, MLOps 구축 전문 솔루션**

다크 벤토 그리드 레이아웃 기반의 프리미엄 Cloud & AI 인프라 솔루션 랜딩 페이지입니다.

---

## 📋 프로젝트 개요

- **Frontend:** React + Vite + Tailwind CSS + Framer Motion
- **Backend:** Java Spring Boot + Spring Data JPA
- **Database:** PostgreSQL
- **주요 기능:**
  - 🎨 다크 벤토 그리드 레이아웃
  - 💬 스마트 문의 시스템 (자동 이메일 알림)
  - 📰 게시판 시스템 (공지사항/채용)
  - 🔐 관리자 페이지

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
- Java 17+ 설치
- PostgreSQL 15+ 설치
- Maven 설치

### 2. 데이터베이스 설정

PostgreSQL에서 데이터베이스를 생성합니다:

```sql
CREATE DATABASE cloudops_db;
```

### 3. Backend 설정

`backend/src/main/resources/application.yml` 파일을 수정합니다:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/cloudops_db
    username: your_username  # PostgreSQL 사용자명
    password: your_password  # PostgreSQL 비밀번호

  mail:
    username: your-email@gmail.com      # Gmail 주소
    password: your-app-password          # Gmail 앱 비밀번호
```

### 4. Backend 실행

```bash
cd backend
mvn spring-boot:run
```

Backend가 `http://localhost:8080`에서 실행됩니다.

### 5. Frontend 설정 및 실행

```bash
cd frontend

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

Frontend가 `http://localhost:3000`에서 실행됩니다.

---

## 📂 프로젝트 구조

```
my-first-claude/
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/         # React 컴포넌트
│   │   │   ├── MainPage.jsx   # 메인 페이지
│   │   │   ├── HeroSection.jsx # 히어로 섹션
│   │   │   ├── BentoGrid.jsx  # 벤토 그리드 레이아웃
│   │   │   ├── BoardList.jsx  # 게시판 목록
│   │   │   ├── InquiryModal.jsx # 문의 모달
│   │   │   └── Navigation.jsx # 네비게이션
│   │   ├── services/          # API 서비스
│   │   │   └── api.js         # Axios API 클라이언트
│   │   ├── App.jsx            # 메인 앱 컴포넌트
│   │   └── main.jsx           # 진입점
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Spring Boot Backend
│   ├── src/main/java/com/cloudops/deepinsight/
│   │   ├── entity/             # JPA 엔티티
│   │   │   ├── Inquiry.java   # 문의 엔티티
│   │   │   └── Post.java      # 게시물 엔티티
│   │   ├── repository/         # JPA Repository
│   │   │   ├── InquiryRepository.java
│   │   │   └── PostRepository.java
│   │   ├── service/            # 비즈니스 로직
│   │   │   ├── InquiryService.java
│   │   │   ├── PostService.java
│   │   │   └── EmailService.java
│   │   ├── controller/         # REST API Controller
│   │   │   ├── InquiryController.java
│   │   │   └── PostController.java
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── config/             # 설정 클래스
│   │   └── DeepInsightApplication.java
│   └── pom.xml
│
├── PRD.md                       # 프로젝트 요구사항 문서
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
- **Axios 1.6** - HTTP 클라이언트
- **Lucide React** - 아이콘 라이브러리

### Backend
- **Spring Boot 3.2** - Java 프레임워크
- **Spring Data JPA** - ORM
- **PostgreSQL** - 관계형 데이터베이스
- **JavaMailSender** - 이메일 발송
- **Lombok** - 코드 간소화

---

## 📧 이메일 설정 (Gmail)

1. Gmail 계정에서 2단계 인증 활성화
2. 앱 비밀번호 생성: https://myaccount.google.com/apppasswords
3. `application.yml`에 생성된 앱 비밀번호 입력

---

## 🚀 프로덕션 빌드

### Frontend 빌드
```bash
cd frontend
npm run build
```

빌드된 파일은 `frontend/dist/` 디렉토리에 생성됩니다.

### Backend 빌드
```bash
cd backend
mvn clean package
```

JAR 파일은 `backend/target/` 디렉토리에 생성됩니다.

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
