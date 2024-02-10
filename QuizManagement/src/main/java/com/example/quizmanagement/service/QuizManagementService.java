package com.example.quizmanagement.service;


import com.example.quizmanagement.dto.request.QuizRequest;
import com.example.quizmanagement.dto.response.QuestionResponse;
import com.example.quizmanagement.dto.response.QuizResponse;
import com.example.quizmanagement.dto.response.QuizResponseWithAnswers;
import com.example.quizmanagement.exceptions.BadRequestException;
import com.example.quizmanagement.mapper.QuizManagementMapper;
import com.example.quizmanagement.model.quiz.Question;
import com.example.quizmanagement.model.quiz.Quiz;
import com.example.quizmanagement.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class QuizManagementService {
    private final QuizRepository quizRepository;
    private final QuizManagementMapper quizManagementMapper;
    private final MessageSource messageSource;

    @Transactional
    public QuizResponseWithAnswers save(QuizRequest quiz) {
        Quiz entity = quizRepository.save(quizManagementMapper.toEntity(quiz));
        return quizManagementMapper.toResponseWithAnswers(entity);
    }

    @Transactional
    public QuizResponseWithAnswers getQuizWithAnswers(long id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new BadRequestException(messageSource
                .getMessage("QUIZ_NOT_FOUND", null, Locale.getDefault())));
        return quizManagementMapper.toResponseWithAnswers(quiz);
    }

    @Transactional
    public QuizResponse getQuizWithoutAnswers(long id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new BadRequestException(messageSource
                .getMessage("QUIZ_NOT_FOUND", null, Locale.getDefault())));

        List<Question> questions = quiz.getQuestions();

        List<QuestionResponse> questionResponses = questions.stream().map(question -> {
            List<String> answers = question.getCorrectAnswers();
            answers.addAll(question.getIncorrectAnswers());
            return quizManagementMapper.toResponseWithoutAnswers(question, answers);
        }).toList();

        return quizManagementMapper.toFullResponseWithoutAnswers(quiz, questionResponses);
    }
}
