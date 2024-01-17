package com.example.quizmanagement.dto.simpledto.request;

import com.example.quizmanagement.enums.QuestionType;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record SimpleQuestionAnswerRequest(@NotNull int questionId,
                                          @NotNull QuestionType questionType,
                                          @NotNull List<MultipleChoiceAnswersRequest> chosenMultipleAnswers) {
}
