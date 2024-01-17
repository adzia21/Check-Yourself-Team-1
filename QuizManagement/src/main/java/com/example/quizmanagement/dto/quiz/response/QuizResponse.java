package com.example.quizmanagement.dto.quiz.response;

import com.example.quizmanagement.model.quiz.Question;

import java.util.List;

public record QuizResponse(String technology, String title, List<Question> questions) {
}
