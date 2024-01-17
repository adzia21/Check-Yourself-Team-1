package com.example.quizmanagement.dto.quiz.request;

import com.example.quizmanagement.dto.simpledto.request.SimpleQuestionAnswerRequest;

import java.util.List;

public record ResultQuizRequest(int id, int userId, List<SimpleQuestionAnswerRequest> answers) {
}
