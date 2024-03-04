package com.example.quizmanagement.controller;

import com.example.quizmanagement.dto.request.ResultFromUserRequest;
import com.example.quizmanagement.dto.response.ResultForUserResponse;
import com.example.quizmanagement.dto.response.SimpleQuizResponse;
import com.example.quizmanagement.service.ResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/resolve")
public class ResolveQuizController {
    private final ResultService resultService;

    @PostMapping("/{quizId}")
    public ResultForUserResponse getResult(@Valid @RequestBody List<ResultFromUserRequest> request, @PathVariable Long quizId) {
        return resultService.calculateResultsForUser(request, quizId);
    }

    @GetMapping("/get-all")
    public List<ResultForUserResponse> getAllQuizByCompany() {
        return resultService.getAllQuizByCompany();
    }
}
