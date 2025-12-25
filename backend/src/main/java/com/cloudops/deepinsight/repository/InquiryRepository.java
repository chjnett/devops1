package com.cloudops.deepinsight.repository;

import com.cloudops.deepinsight.entity.Inquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    /**
     * 처리 여부로 문의 조회
     */
    Page<Inquiry> findByProcessed(boolean processed, Pageable pageable);

    /**
     * 서비스 유형별 문의 조회
     */
    List<Inquiry> findByServiceType(Inquiry.ServiceType serviceType);

    /**
     * 특정 기간 내 문의 조회
     */
    List<Inquiry> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    /**
     * 이메일로 문의 조회
     */
    List<Inquiry> findByEmail(String email);
}
