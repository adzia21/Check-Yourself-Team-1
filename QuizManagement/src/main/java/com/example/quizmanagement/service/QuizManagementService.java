package com.example.quizmanagement.service;


import com.example.quizmanagement.dto.quiz.request.CreateQuizRequest;
import com.example.quizmanagement.dto.quiz.response.QuizResponse;
import com.example.quizmanagement.exceptions.BadRequestException;
import com.example.quizmanagement.mapper.QuizManagementMapper;
import com.example.quizmanagement.model.Quiz;
import com.example.quizmanagement.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class QuizManagementService {
    private final QuizRepository quizRepository;
    private final QuizManagementMapper quizManagementMapper;
    private final MessageSource messageSource;

    @Transactional
    public QuizResponse save(CreateQuizRequest quiz) {
        return quizManagementMapper.toResponse(quizRepository.save(quizManagementMapper.toEntity(quiz)));
    }

    @Transactional
    public QuizResponse getQuiz(long id){
        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new BadRequestException(messageSource
                .getMessage("QUIZ_NOT_FOUND", null, Locale.getDefault())));
        return quizManagementMapper.toResponse(quiz);
    }
}
