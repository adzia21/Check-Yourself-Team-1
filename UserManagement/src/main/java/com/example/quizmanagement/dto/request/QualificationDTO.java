package com.example.quizmanagement.dto.request;

import java.time.LocalDate;

public record QualificationDTO(
        String name,
        String certificateName,
        LocalDate date
) {}
