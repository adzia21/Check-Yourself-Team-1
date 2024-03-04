package com.example.quizmanagement.dto.request;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record CompanyDetailsRequest(
        String name,
        String description,
        String localization,
        Integer hiredPeople,
        String facebookUrl,
        String twitterUrl,
        String instagramUrl,
        String linkedInUrl,
        List<String> technologies,
        List<String> tools,
        List<String> platforms
) {}
