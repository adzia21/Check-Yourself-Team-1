package com.example.quizmanagement.dto.request;

import com.example.quizmanagement.enums.QuestionType;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SimpleQuestionAnswerRequest(@NotNull int questionId,
                                          @NotNull QuestionType questionType,
                                          List<String> answers) {
}
