package com.example.quizmanagement.service;


import com.example.quizmanagement.model.quiz.Quiz;
import com.example.quizmanagement.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuizManagementService {
    private final QuizRepository quizRepository;

    @Transactional
    public Quiz save(Quiz quiz){
        return quizRepository.save(quiz);
    }

    public Quiz getQuiz(long id){
        return quizRepository.findById(id).orElseThrow(RuntimeException::new);
    }
}
