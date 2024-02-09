package com.example.quizmanagement.exceptions;

import jakarta.validation.constraints.NotNull;

public record ErrorResponse(@NotNull String message) {
}
