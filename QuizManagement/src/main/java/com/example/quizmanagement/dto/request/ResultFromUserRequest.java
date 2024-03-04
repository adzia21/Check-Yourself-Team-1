package com.example.quizmanagement.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ResultFromUserRequest(@NotNull Long questionId,
                                    @NotNull List<String> answers) {
}
