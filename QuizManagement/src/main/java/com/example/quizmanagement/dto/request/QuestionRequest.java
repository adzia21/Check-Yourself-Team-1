package com.example.quizmanagement.dto.request;

import com.example.quizmanagement.enums.QuestionType;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record QuestionRequest(@NotNull QuestionType type,
                              @NotNull String question,
                              String code,
                              List<String> correctAnswers,
                              List<String> incorrectAnswers) {
}
