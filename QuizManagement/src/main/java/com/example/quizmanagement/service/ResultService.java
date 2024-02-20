package com.example.quizmanagement.service;

import com.example.quizmanagement.dto.request.ResultFromUserRequest;
import com.example.quizmanagement.dto.response.ResultForUserResponse;
import com.example.quizmanagement.exceptions.BadRequestException;
import com.example.quizmanagement.mapper.QuizManagementMapper;
import com.example.quizmanagement.model.quiz.Question;
import com.example.quizmanagement.model.quiz.Quiz;
import com.example.quizmanagement.repository.QuestionRepository;
import com.example.quizmanagement.repository.QuizRepository;
import com.example.quizmanagement.repository.ResultRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicInteger;


@Service
@RequiredArgsConstructor
public class ResultService {
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final MessageSource messageSource;
    private final QuizManagementMapper mapper;


    @Transactional
    public ResultForUserResponse calculateResultsForUser(@Valid List<ResultFromUserRequest> request, Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new BadRequestException(messageSource
                .getMessage("QUIZ_NOT_FOUND", null, Locale.getDefault())));

        AtomicInteger amountOfGoodPoints = new AtomicInteger();
        AtomicInteger amountOfBadPoints = new AtomicInteger();

        request.forEach(resultFromUserRequest -> {

            Question question = questionRepository
                    .findByQuizIdAndId(quizId, resultFromUserRequest.questionId())
                    .orElseThrow(() -> new BadRequestException(messageSource
                            .getMessage("Lama", null, Locale.getDefault())));

            List<String> correctAnswers = question.getCorrectAnswers();

            List<String> userAnswers = resultFromUserRequest.answers();

            boolean areAllCorrectAnswers = userAnswers.equals(correctAnswers);
            if (areAllCorrectAnswers) {
                amountOfGoodPoints.getAndIncrement();
            } else {
                amountOfBadPoints.getAndIncrement();
            }
        });

        double percentOfGoodAnswers = (double) amountOfGoodPoints.get() / request.size() * 100;

        boolean isPassed = percentOfGoodAnswers > 70;

        return mapper.toResponseWithResult(quiz, amountOfGoodPoints.get(), amountOfBadPoints.get(),
                percentOfGoodAnswers, isPassed);
    }
}

