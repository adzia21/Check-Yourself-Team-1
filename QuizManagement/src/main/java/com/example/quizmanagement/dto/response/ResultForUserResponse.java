package com.example.quizmanagement.dto.response;

public record ResultForUserResponse(
        int quizId,
        String quizName,
        int correctAnswer,
        int incorrectAnswer,
        boolean isPassed,
        double percentOfCorrectAnswers
) {
}
