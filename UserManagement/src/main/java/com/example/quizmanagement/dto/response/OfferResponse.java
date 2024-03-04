package com.example.quizmanagement.dto.response;

import com.example.quizmanagement.enums.ContractTypeEnum;

import java.time.LocalDate;
import java.util.List;

public record OfferResponse(
        Long id,
        String companyName,
        String title,
        String localization,
        String contractType,
        LocalDate expirationDate,
        String description,
        List<String> technologies,
        List<String> tools,
        List<String> platforms,
        List<String> languages,
        List<String> mainTasks,
        List<String> desiredKnowledge,
        List<String> organizationOfWork,
        List<String> benefits,
        List<String> whatWeOffer,
        List<String> additionalInformation
) {
}
