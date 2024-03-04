package com.example.quizmanagement.dto.request;

import com.example.quizmanagement.enums.ContractTypeEnum;

import java.time.LocalDate;
import java.util.List;

public record OfferRequest(
        String localization,
        String contractType,
        String title,
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
