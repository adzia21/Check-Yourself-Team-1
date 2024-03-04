package com.example.quizmanagement.dto.request;

import java.util.List;

public record ResultQuizRequest(int id,
                                int userId,
                                List<SimpleQuestionAnswerRequest> answers) {
}
