package com.example.quizmanagement.dto.request;

import java.time.LocalDate;
import java.util.List;

public record ExperienceDTO(
        String name,
        LocalDate startedDate,
        LocalDate finishedDate,
        List<String> tasks
) {}
