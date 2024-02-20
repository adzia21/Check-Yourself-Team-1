package com.example.quizmanagement.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record QuizRequest(@NotNull String technology,
                          @NotNull String title,
                          @NotNull int time,
                          List<QuestionRequest> questions) {
}
