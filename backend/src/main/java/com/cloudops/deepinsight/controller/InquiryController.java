package com.cloudops.deepinsight.controller;

import com.cloudops.deepinsight.dto.InquiryRequestDto;
import com.cloudops.deepinsight.entity.Inquiry;
import com.cloudops.deepinsight.service.InquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
@Slf4j
public class InquiryController {

    private final InquiryService inquiryService;

    /**
     * 문의 제출 엔드포인트
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> submitInquiry(@Valid @RequestBody InquiryRequestDto requestDto) {
        log.info("문의 접수 요청 - 이름: {}, 서비스: {}", requestDto.getName(), requestDto.getServiceType());

        Inquiry inquiry = inquiryService.createInquiry(requestDto.toEntity());

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "문의가 성공적으로 접수되었습니다.",
                "inquiryId", inquiry.getId()
        ));
    }

    /**
     * 문의 목록 조회 (관리자용)
     */
    @GetMapping("/admin")
    public ResponseEntity<Page<Inquiry>> getAllInquiries(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Page<Inquiry> inquiries = inquiryService.getAllInquiries(pageable);
        return ResponseEntity.ok(inquiries);
    }

    /**
     * 미처리 문의 조회 (관리자용)
     */
    @GetMapping("/admin/unprocessed")
    public ResponseEntity<Page<Inquiry>> getUnprocessedInquiries(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Page<Inquiry> inquiries = inquiryService.getUnprocessedInquiries(pageable);
        return ResponseEntity.ok(inquiries);
    }

    /**
     * 문의 처리 완료 처리 (관리자용)
     */
    @PutMapping("/admin/{inquiryId}/process")
    public ResponseEntity<Map<String, Object>> markAsProcessed(@PathVariable Long inquiryId) {
        Inquiry inquiry = inquiryService.markAsProcessed(inquiryId);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "문의가 처리 완료되었습니다.",
                "inquiryId", inquiry.getId()
        ));
    }
}
