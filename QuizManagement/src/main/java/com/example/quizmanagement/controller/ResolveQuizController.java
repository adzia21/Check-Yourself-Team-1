package com.example.quizmanagement.controller;

import com.example.quizmanagement.model.Result;
import com.example.quizmanagement.model.result.QuizAnswers;
import com.example.quizmanagement.service.ResultService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/resolve")
public class ResolveQuizController {
    private ResultService resultService;

    @PostMapping
    public ResponseEntity<Result> getResult(@Valid @RequestBody QuizAnswers answers) {
        return new ResponseEntity<>(resultService.calculateResults(answers), HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Result>> getUserResults(@PathVariable Long userId) {
        return new ResponseEntity<>(resultService.findByUser(userId), HttpStatus.CREATED);
    }

}
