package com.example.quizmanagement.dto.simpledto.response;

import com.example.quizmanagement.dto.simpledto.request.MultipleChoiceAnswersRequest;
import com.example.quizmanagement.enums.QuestionType;
import jakarta.validation.constraints.NotNull;

public record FullQuestionResponse(@NotNull int questionId,
                                   @NotNull QuestionType questionType,
                                   @NotNull String question,
                                   String code,
                                   //TODO picture
                                   //TODO film
                                   @NotNull MultipleChoiceAnswersRequest chosenMultipleAnswers) {
}
