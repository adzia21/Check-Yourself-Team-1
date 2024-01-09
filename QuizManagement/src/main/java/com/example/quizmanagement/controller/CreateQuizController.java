package com.example.quizmanagement.controller;

import com.example.quizmanagement.model.quiz.Quiz;
import com.example.quizmanagement.service.QuizManagementService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/quiz")
public class CreateQuizController {
    private QuizManagementService quizManagementService;

    @PostMapping
    public ResponseEntity<Quiz> getQuiz(@Valid @RequestBody Quiz quiz) {
        return new ResponseEntity<>(quizManagementService.save(quiz), HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable long id) {
        return new ResponseEntity<>(quizManagementService.getQuiz(id), HttpStatus.CREATED);
    }

}
