package com.example.quizmanagement.dto.response;

import com.example.quizmanagement.enums.QuestionType;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record QuestionResponseWithAnswers(@NotNull int id,
                                          @NotNull QuestionType type,
                                          @NotNull String question,
                                          String code,
                                          List<String> correctAnswers,
                                          List<String> incorrectAnswers
                                          ) {
}
