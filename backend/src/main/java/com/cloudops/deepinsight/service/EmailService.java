package com.cloudops.deepinsight.service;

import com.cloudops.deepinsight.entity.Inquiry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.admin.email}")
    private String adminEmail;

    /**
     * 관리자에게 문의 알림 이메일 발송
     */
    public void sendInquiryNotification(Inquiry inquiry) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(adminEmail);
        message.setSubject("[Cloud-Ops Insight] 새로운 문의가 도착했습니다");
        message.setText(buildInquiryEmailContent(inquiry));

        mailSender.send(message);
    }

    /**
     * 문의 이메일 내용 구성
     */
    private String buildInquiryEmailContent(Inquiry inquiry) {
        return String.format("""
                새로운 문의가 접수되었습니다.

                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                📋 문의 정보

                • 문의 ID: %d
                • 서비스 유형: %s
                • 회사명: %s
                • 이름: %s
                • 이메일: %s
                • 전화번호: %s

                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                📝 문의 내용:

                %s

                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                접수 일시: %s

                관리자 페이지에서 확인하세요.
                """,
                inquiry.getId(),
                inquiry.getServiceType().getDisplayName(),
                inquiry.getCompanyName() != null ? inquiry.getCompanyName() : "-",
                inquiry.getName(),
                inquiry.getEmail(),
                inquiry.getPhone() != null ? inquiry.getPhone() : "-",
                inquiry.getMessage(),
                inquiry.getCreatedAt()
        );
    }
}
