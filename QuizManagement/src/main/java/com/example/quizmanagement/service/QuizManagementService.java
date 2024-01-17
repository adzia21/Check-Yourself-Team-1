package com.example.quizmanagement.service;


import com.example.quizmanagement.dto.quiz.request.CreateQuizRequest;
import com.example.quizmanagement.dto.quiz.response.QuizResponse;
import com.example.quizmanagement.mapper.QuizManagementMapper;
import com.example.quizmanagement.model.Quiz;
import com.example.quizmanagement.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuizManagementService {
    private final QuizRepository quizRepository;
    private final QuizManagementMapper quizManagementMapper;

    @Transactional
    public QuizResponse save(CreateQuizRequest quiz) {
        return quizManagementMapper.toResponse(quizRepository.save(quizManagementMapper.toEntity(quiz)));
    }

    @Transactional
    public QuizResponse getQuiz(long id){
        Quiz quiz = quizRepository.findById(id).orElseThrow(RuntimeException::new);
        return quizManagementMapper.toResponse(quiz);
    }
}
