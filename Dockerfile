# 1. 빌드 단계
FROM node:lts-alpine AS build-stage
WORKDIR /app


# frontend 폴더 안의 package.json을 복사하도록 경로 지정
COPY frontend/package*.json ./

#빌드 시점에 변수를 받기 위한 설정
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_ADMIN_EMAIL
#ARDG를 실제 환경 변수로 전환하여 Vite 빌드 시 인식하게 됨

ENV VITE_SUPABASE_URL=https://svlpcfhudquotcqcyomp.supabase.co
ENV VITE_SUPABASE_ANON_KEY=sb_publishable_S4P9lTfeNLxmSh3udCCxAA_z__1PPwo
ENV VITE_EMAILJS_SERVICE_ID=service_n2u3v4j
ENV VITE_EMAILJS_TEMPLATE_ID=template_qvbpfxa
ENV VITE_EMAILJS_PUBLIC_KEY=pb4C8vuHDEkrpQc2X
ENV VITE_ADMIN_EMAIL=chenhyeonjun583@gmail.com 


RUN npm install

# 소스 코드 전체 복사 (frontend 폴더 내용 전체)
COPY frontend/ .

RUN npm run build

# 2. 실행 단계
FROM nginx:stable-alpine AS production-stage
# Vite 결과물인 build 폴더를 복사
COPY --from=build-stage /app/dist /usr/share/nginx/html
#로컬의 설정 파일을 nginx 기본 설정 결로에 덮어쓰기
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]