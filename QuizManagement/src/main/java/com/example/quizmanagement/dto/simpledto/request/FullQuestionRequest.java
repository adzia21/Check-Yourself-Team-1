package com.example.quizmanagement.dto.simpledto.request;

import com.example.quizmanagement.enums.QuestionType;
import jakarta.validation.constraints.NotNull;

public record FullQuestionRequest(@NotNull QuestionType type,
                                  @NotNull String question,
                                  String code,
                                  //TODO picture
                                  //TODO film
                                  @NotNull MultipleChoiceAnswersRequest multipleChoiceAnswer) {
}
