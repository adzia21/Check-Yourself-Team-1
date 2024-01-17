package com.example.quizmanagement.controller;

import com.example.quizmanagement.dto.quiz.request.CreateQuizRequest;
import com.example.quizmanagement.dto.quiz.response.QuizResponse;
import com.example.quizmanagement.service.QuizManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/quiz")
public class QuizManagementController {
    private final QuizManagementService quizManagementService;

    @PostMapping
    public QuizResponse createQuiz(@Valid @RequestBody CreateQuizRequest quiz) {
        return quizManagementService.save(quiz);
    }

    @GetMapping("/{id}")
    public QuizResponse getQuiz(@PathVariable long id) {
        return quizManagementService.getQuiz(id);
    }

}
