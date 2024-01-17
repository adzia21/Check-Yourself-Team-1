package com.example.quizmanagement.dto.simpledto.request;

import java.util.List;

public record MultipleChoiceAnswersRequest(List<String> correct, List<String> incorrect) {
}
