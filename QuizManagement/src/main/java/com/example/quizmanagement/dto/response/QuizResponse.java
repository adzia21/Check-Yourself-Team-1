package com.example.quizmanagement.dto.response;

import java.util.List;

public record QuizResponse(int quizId,
                           String technology,
                           String title,
                           List<QuestionResponse> questions) {
}
