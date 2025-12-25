package com.cloudops.deepinsight.service;

import com.cloudops.deepinsight.entity.Inquiry;
import com.cloudops.deepinsight.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final EmailService emailService;

    /**
     * 문의 저장 및 이메일 발송
     */
    @Transactional
    public Inquiry createInquiry(Inquiry inquiry) {
        // 1. 데이터베이스 저장
        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        log.info("문의 저장 완료 - ID: {}, 이름: {}, 서비스: {}",
                savedInquiry.getId(),
                savedInquiry.getName(),
                savedInquiry.getServiceType().getDisplayName());

        // 2. 관리자에게 이메일 알림 발송
        try {
            emailService.sendInquiryNotification(savedInquiry);
            log.info("관리자 이메일 알림 발송 완료 - 문의 ID: {}", savedInquiry.getId());
        } catch (Exception e) {
            log.error("이메일 발송 실패 - 문의 ID: {}", savedInquiry.getId(), e);
            // 이메일 실패해도 문의는 저장되도록 예외를 던지지 않음
        }

        return savedInquiry;
    }

    /**
     * 문의 목록 조회 (관리자용)
     */
    @Transactional(readOnly = true)
    public Page<Inquiry> getAllInquiries(Pageable pageable) {
        return inquiryRepository.findAll(pageable);
    }

    /**
     * 미처리 문의 조회
     */
    @Transactional(readOnly = true)
    public Page<Inquiry> getUnprocessedInquiries(Pageable pageable) {
        return inquiryRepository.findByProcessed(false, pageable);
    }

    /**
     * 문의 처리 상태 변경
     */
    @Transactional
    public Inquiry markAsProcessed(Long inquiryId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new IllegalArgumentException("문의를 찾을 수 없습니다. ID: " + inquiryId));

        inquiry.setProcessed(true);
        return inquiryRepository.save(inquiry);
    }
}
