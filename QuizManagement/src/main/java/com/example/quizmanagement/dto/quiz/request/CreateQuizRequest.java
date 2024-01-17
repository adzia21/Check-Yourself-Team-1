package com.example.quizmanagement.dto.quiz.request;

import com.example.quizmanagement.dto.simpledto.request.FullQuestionRequest;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateQuizRequest(@NotNull String technology,
                                @NotNull String title,
                                @NotNull List<FullQuestionRequest> questions) {
}
