package com.example.quizmanagement.controller;

import com.example.quizmanagement.dto.quiz.request.CreateQuizRequest;
import com.example.quizmanagement.dto.quiz.response.QuizResponse;
import com.example.quizmanagement.model.Quiz;
import com.example.quizmanagement.service.QuizManagementService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/quiz")
public class QuizManagementController {
    private QuizManagementService quizManagementService;

    @PostMapping
    public QuizResponse createQuiz(@Valid @RequestBody CreateQuizRequest quiz) {
        return quizManagementService.save(quiz);
    }

    @GetMapping("{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable long id) {
        return new ResponseEntity<>(quizManagementService.getQuiz(id), HttpStatus.CREATED);
    }

}
