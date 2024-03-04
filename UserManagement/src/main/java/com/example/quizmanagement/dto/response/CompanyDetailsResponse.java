package com.example.quizmanagement.dto.response;

import java.util.List;

public record CompanyDetailsResponse(
        int id,
        int userId,
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
