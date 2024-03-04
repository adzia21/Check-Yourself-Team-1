package com.example.quizmanagement.dto.response;

import com.example.quizmanagement.enums.ContractTypeEnum;

import java.time.LocalDate;
import java.util.List;

public record SimpleOfferResponse(
        Long id,
        String companyName,
        String title,
        String localization,
        List<String> technologies
) {
}
