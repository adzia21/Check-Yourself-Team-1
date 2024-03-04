package com.example.quizmanagement.dto.response;

import com.example.quizmanagement.enums.QuestionType;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record QuestionResponse(@NotNull int questionId,
                               @NotNull QuestionType type,
                               @NotNull String question,
                               String code,
                               @NotNull List<String> answers) {
}
