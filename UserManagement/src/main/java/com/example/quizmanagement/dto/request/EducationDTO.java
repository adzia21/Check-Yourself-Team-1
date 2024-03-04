package com.example.quizmanagement.dto.request;

import java.time.LocalDate;
import java.util.List;

public record EducationDTO(
        String name,
        String title,
        String schoolName,
        LocalDate startedDate,
        LocalDate finishedDate
) {}