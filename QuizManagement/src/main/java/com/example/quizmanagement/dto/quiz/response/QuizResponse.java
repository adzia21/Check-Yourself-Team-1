package com.example.quizmanagement.dto.quiz.response;

import com.example.quizmanagement.dto.simpledto.response.FullQuestionResponse;

import java.util.List;

public record QuizResponse(String technology,
                           String title,
                           List<FullQuestionResponse> questions) {
}
