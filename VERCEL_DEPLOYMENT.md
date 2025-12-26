# Vercel 배포 가이드

CloudOps Deep Insight를 Vercel에 배포하는 상세 가이드입니다.

## 📋 사전 준비

### 필수 계정
- ✅ GitHub 계정
- ✅ Vercel 계정 (GitHub으로 가입 가능)
- ✅ Supabase 프로젝트 설정 완료
- ✅ EmailJS 설정 완료

### 환경 변수 확인

로컬 `frontend/.env` 파일의 다음 값들이 준비되어 있어야 합니다:
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
VITE_ADMIN_EMAIL=your-email@example.com
```

---

## 🚀 Vercel 배포 단계

### 1단계: Vercel 계정 연결

1. **[Vercel](https://vercel.com)** 접속
2. **"Sign Up"** 또는 **"Login"** 클릭
3. **"Continue with GitHub"** 선택
4. GitHub 권한 승인

### 2단계: 프로젝트 Import

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. **"Import Git Repository"** 섹션에서 GitHub 저장소 검색
3. **`devops1`** 저장소 찾기
4. **"Import"** 버튼 클릭

### 3단계: 프로젝트 설정

#### Configure Project 화면에서:

**Project Name:**
```
cloudops-deep-insight
```
또는 원하는 이름 입력 (도메인 주소가 됩니다)

**Framework Preset:**
```
Vite
```
자동으로 감지됩니다.

**Root Directory:**
```
frontend
```
⚠️ **중요!** 반드시 `frontend` 폴더를 루트로 설정해야 합니다.

**Build Command:**
```
npm run build
```
(자동 입력됨)

**Output Directory:**
```
dist
```
(자동 입력됨)

**Install Command:**
```
npm install
```
(자동 입력됨)

### 4단계: 환경 변수 설정

**Environment Variables** 섹션에서 다음 변수들을 추가합니다:

#### 1. VITE_SUPABASE_URL
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://xxx.supabase.co` (본인의 Supabase URL)
- **Environment:** Production, Preview, Development 모두 체크

#### 2. VITE_SUPABASE_ANON_KEY
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJxxx...` (본인의 Supabase Anon Key)
- **Environment:** 모두 체크

#### 3. VITE_EMAILJS_SERVICE_ID
- **Name:** `VITE_EMAILJS_SERVICE_ID`
- **Value:** `service_xxx`
- **Environment:** 모두 체크

#### 4. VITE_EMAILJS_TEMPLATE_ID
- **Name:** `VITE_EMAILJS_TEMPLATE_ID`
- **Value:** `template_xxx`
- **Environment:** 모두 체크

#### 5. VITE_EMAILJS_PUBLIC_KEY
- **Name:** `VITE_EMAILJS_PUBLIC_KEY`
- **Value:** `xxx`
- **Environment:** 모두 체크

#### 6. VITE_ADMIN_EMAIL
- **Name:** `VITE_ADMIN_EMAIL`
- **Value:** `your-email@example.com`
- **Environment:** 모두 체크

### 5단계: 배포

모든 설정을 완료한 후:
1. **"Deploy"** 버튼 클릭
2. 빌드 로그 확인 (약 1-2분 소요)
3. 배포 완료 대기

---

## ✅ 배포 확인

### 배포 성공 시:

✅ **"Congratulations!"** 메시지와 함께 도메인 표시
✅ 도메인 예시: `https://cloudops-deep-insight.vercel.app`

### 사이트 확인:

1. 제공된 도메인 클릭
2. 메인 페이지 로딩 확인
3. 기능 테스트:
   - ✅ 히어로 섹션 애니메이션
   - ✅ 게시판 목록 표시
   - ✅ 문의하기 폼 동작
   - ✅ 관리자 페이지 접근 (`/admin`)

---

## 🔄 자동 배포 (CI/CD)

### GitHub Push 시 자동 배포

이제부터 GitHub에 코드를 push하면 자동으로 배포됩니다:

```bash
git add .
git commit -m "Update feature"
git push origin master
```

- **`master` 브랜치** → Production 배포 (실제 도메인)
- **다른 브랜치** → Preview 배포 (테스트용 임시 도메인)

### 배포 로그 확인

Vercel Dashboard → Deployments에서:
- 배포 상태 확인
- 빌드 로그 확인
- 에러 디버깅

---

## 🎯 커스텀 도메인 설정 (선택사항)

### 자신의 도메인 연결

1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Domains** 클릭
3. **Add Domain** 클릭
4. 도메인 입력 (예: `cloudops.example.com`)
5. DNS 레코드 설정 안내 따라하기

#### DNS 설정 예시:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🐛 배포 문제 해결

### 빌드 실패

#### 문제: "Build failed"
**원인:**
- Node.js 버전 불일치
- 환경 변수 누락
- 의존성 설치 실패

**해결:**
1. Vercel Dashboard → Settings → General
2. **Node.js Version:** `18.x` 확인
3. Environment Variables 모두 설정되었는지 확인
4. **Redeploy** 클릭

#### 문제: "Cannot find module"
**원인:** package.json에 의존성 누락

**해결:**
```bash
cd frontend
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### 런타임 에러

#### 문제: 빈 화면 또는 "Failed to fetch"
**원인:** 환경 변수가 제대로 설정되지 않음

**해결:**
1. 브라우저 DevTools (F12) → Console 확인
2. Vercel Dashboard → Settings → Environment Variables
3. 모든 `VITE_` 변수 확인
4. **Redeploy** 필요

#### 문제: Supabase 연결 실패
**원인:**
- Supabase URL 또는 Anon Key 오류
- RLS 정책 미설정

**해결:**
1. Supabase Dashboard → Settings → API
2. URL과 Anon Key 재확인
3. RLS 정책 확인:
   ```sql
   -- inquiries 테이블 INSERT 허용
   CREATE POLICY "Allow public insert on inquiries"
   ON inquiries FOR INSERT TO anon WITH CHECK (true);
   ```
4. Vercel에서 환경 변수 재설정 후 Redeploy

#### 문제: EmailJS 이메일 전송 실패
**원인:** EmailJS 설정 오류

**해결:**
1. EmailJS Dashboard → Email Services → Connected 확인
2. Template ID 확인
3. Public Key 확인
4. Vercel 환경 변수 재확인

---

## 📊 성능 모니터링

### Vercel Analytics (무료)

1. Vercel Dashboard → Analytics 탭
2. 페이지 뷰, 성능 메트릭 확인
3. Core Web Vitals 확인

### 권장 성능 지표:
- ✅ **LCP (Largest Contentful Paint):** < 2.5s
- ✅ **FID (First Input Delay):** < 100ms
- ✅ **CLS (Cumulative Layout Shift):** < 0.1

---

## 🔐 보안 설정

### 환경 변수 보안

⚠️ **절대 커밋하지 말 것:**
- `.env` 파일
- API 키
- 비밀번호

✅ **안전한 방법:**
- Vercel Dashboard에서만 환경 변수 설정
- `.env.example`에는 예시 값만 포함
- `.gitignore`에 `.env` 포함 (이미 설정됨)

### Supabase RLS 활성화

```sql
-- 테이블별 RLS 활성화 확인
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

---

## 📝 체크리스트

배포 전 최종 확인:

- [ ] GitHub 저장소에 최신 코드 push
- [ ] `.env.example` 파일 생성 완료
- [ ] `.gitignore`에 `.env` 포함
- [ ] Supabase 데이터베이스 스키마 실행 완료
- [ ] Supabase RLS 정책 설정 완료
- [ ] EmailJS 서비스 연결 및 템플릿 생성
- [ ] 모든 환경 변수 값 준비 완료
- [ ] 로컬에서 빌드 테스트 (`npm run build`) 성공
- [ ] Vercel 계정 생성 및 GitHub 연결

배포 후 확인:

- [ ] 배포 성공 메시지 확인
- [ ] 도메인 접속 확인
- [ ] 모든 페이지 로딩 확인
- [ ] 문의 폼 테스트 (실제 이메일 수신 확인)
- [ ] 게시판 목록 표시 확인
- [ ] 관리자 페이지 접근 확인
- [ ] 모바일 반응형 확인

---

## 🎉 완료!

축하합니다! CloudOps Deep Insight가 성공적으로 배포되었습니다.

**다음 단계:**
1. 도메인을 팀원들과 공유
2. 실제 콘텐츠 추가 (관리자 페이지에서)
3. 문의 폼 테스트
4. 성능 모니터링

**도움이 필요하면:**
- [Vercel 문서](https://vercel.com/docs)
- [Supabase 문서](https://supabase.com/docs)
- [EmailJS 문서](https://www.emailjs.com/docs)

Good luck! 🚀
