package com.example.quizmanagement.dto.response;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record QuizResponse(int quizId,
                           String technology,
                           String title,
                           int time,
                           List<QuestionResponse> questions) {
}
