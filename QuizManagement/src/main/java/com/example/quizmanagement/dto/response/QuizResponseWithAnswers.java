package com.example.quizmanagement.dto.response;

import java.util.List;

public record QuizResponseWithAnswers(int id,
                                      String technology,
                                      String title,
                                      List<QuestionResponseWithAnswers> questions) {
}
