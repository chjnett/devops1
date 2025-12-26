# EmailJS 설정 가이드

문의 폼 제출 시 자동으로 이메일을 받기 위한 EmailJS 설정 방법입니다.

## 1. EmailJS 계정 생성

1. [EmailJS 웹사이트](https://www.emailjs.com/)에 접속
2. "Sign Up Free" 클릭하여 무료 계정 생성
3. 이메일 인증 완료

## 2. Email Service 추가

1. EmailJS 대시보드에서 **"Email Services"** 탭 클릭
2. **"Add New Service"** 버튼 클릭
3. 이메일 제공자 선택:
   - **Gmail** (추천 - 가장 쉬움)
   - Outlook
   - Yahoo
   - 기타 SMTP 서버

### Gmail 설정 방법 (추천):

1. **Gmail** 선택
2. **"Connect Account"** 클릭
3. Google 계정으로 로그인 및 권한 승인
4. Service ID가 자동으로 생성됨 (예: `service_abc123`)
service_oalve51
service_n2u3v4j
5. 이 **Service ID를 복사**해두세요

## 3. Email Template 생성

1. EmailJS 대시보드에서 **"Email Templates"** 탭 클릭
2. **"Create New Template"** 버튼 클릭
3. 아래 템플릿 내용을 복사하여 붙여넣기:

### 템플릿 제목:
```
새 문의: {{service_type}} - {{from_name}}
```

### 템플릿 본문 (Content):
```
=================================
🔔 새로운 문의가 접수되었습니다
=================================

📅 접수 일시: {{submission_date}}

👤 고객 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 이름: {{from_name}}
• 이메일: {{from_email}}
• 회사명: {{company_name}}
• 전화번호: {{phone}}

🛠️ 요청 서비스
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{service_type}}

💬 문의 내용
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
답변: {{from_email}} 로 회신하세요.
```

### 설정:

4. **To Email** 필드에 `{{to_email}}` 입력 (또는 고정 이메일 주소)
5. **From Name**에 `CloudOps Deep Insight` 입력
6. **Reply To**에 `{{from_email}}` 입력 (고객 이메일로 바로 답장 가능)
7. **"Save"** 클릭
8. Template ID가 생성됨 (예: `template_xyz789`)
9. 이 **Template ID를 복사**해두세요

## 4. Public Key 확인

1. EmailJS 대시보드에서 **"Account"** 탭 클릭
2. **"General"** 섹션에서 **Public Key** 확인
3. 이 **Public Key를 복사**해두세요 (예: `abcD123EfgHI456`)

## 5. .env 파일 업데이트

`frontend/.env` 파일을 열고 다음 값들을 업데이트하세요:

```env
# EmailJS Configuration (문의 이메일 전송)
VITE_EMAILJS_SERVICE_ID=service_abc123          # 2단계에서 복사한 Service ID
VITE_EMAILJS_TEMPLATE_ID=template_xyz789        # 3단계에서 복사한 Template ID
VITE_EMAILJS_PUBLIC_KEY=abcD123EfgHI456        # 4단계에서 복사한 Public Key
VITE_ADMIN_EMAIL=your-email@gmail.com          # 문의를 받을 이메일 주소
```

## 6. 개발 서버 재시작

환경 변수를 변경했으므로 개발 서버를 재시작해야 합니다:

```bash
# 기존 서버 종료 (Ctrl+C)
# 서버 재시작
cd frontend
npm run dev
```

## 7. 테스트

1. 브라우저에서 `http://localhost:5173` 접속
2. "문의하기" 버튼 클릭
3. 폼 작성 후 전송
4. 설정한 이메일 주소로 이메일이 도착하는지 확인

## 무료 플랜 제한사항

EmailJS 무료 플랜:
- ✅ 월 200개 이메일 무료
- ✅ 2개 Email Service
- ✅ 무제한 템플릿
- ✅ 기본 지원

더 많은 이메일이 필요하면 유료 플랜 고려 ($15/월부터)

## 문제 해결

### 이메일이 도착하지 않는 경우:

1. **Gmail Spam 확인**: 스팸 폴더 확인
2. **Service 연결 확인**: EmailJS 대시보드에서 Service가 "Connected" 상태인지 확인
3. **환경 변수 확인**: .env 파일의 값이 정확한지 확인
4. **브라우저 콘솔 확인**: F12 → Console에서 에러 메시지 확인
5. **EmailJS Dashboard**: "Logs" 탭에서 전송 기록 확인

### Gmail "Less secure apps" 경고:

- EmailJS는 OAuth2를 사용하므로 별도 설정 불필요
- "Connect Account" 버튼으로 안전하게 연결됨

## 대안: Resend (더 전문적인 방법)

더 많은 이메일 전송이 필요하거나 더 전문적인 서비스를 원한다면:

1. [Resend](https://resend.com/) - 무료 플랜: 월 3,000개 이메일
2. Supabase Edge Function 사용
3. SendGrid, Mailgun 등

필요시 가이드를 제공해드립니다!
