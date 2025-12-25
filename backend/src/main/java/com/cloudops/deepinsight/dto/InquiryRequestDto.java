package com.cloudops.deepinsight.dto;

import com.cloudops.deepinsight.entity.Inquiry;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryRequestDto {

    @NotNull(message = "서비스 유형을 선택해주세요.")
    private Inquiry.ServiceType serviceType;

    private String companyName;

    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;

    private String phone;

    @NotBlank(message = "문의 내용을 입력해주세요.")
    private String message;

    public Inquiry toEntity() {
        return Inquiry.builder()
                .serviceType(serviceType)
                .companyName(companyName)
                .name(name)
                .email(email)
                .phone(phone)
                .message(message)
                .build();
    }
}
