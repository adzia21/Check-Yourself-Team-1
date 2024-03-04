package com.example.quizmanagement.dto.request;

import java.time.LocalDate;
import java.util.List;

public record EducationDTO(
        String name,
        String localization,
        LocalDate startedDate,
        LocalDate finishedDate,
        List<String> tasks
) {}
