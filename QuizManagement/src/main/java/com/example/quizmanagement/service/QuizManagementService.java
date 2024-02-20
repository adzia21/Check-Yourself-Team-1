package com.example.quizmanagement.service;


import com.example.quizmanagement.dto.request.QuizRequest;
import com.example.quizmanagement.dto.response.QuestionResponse;
import com.example.quizmanagement.dto.response.QuizResponse;
import com.example.quizmanagement.dto.response.QuizResponseWithAnswers;
import com.example.quizmanagement.dto.response.SimpleQuizResponse;
import com.example.quizmanagement.exceptions.BadRequestException;
import com.example.quizmanagement.jwt.UserDetailsImpl;
import com.example.quizmanagement.mapper.QuizManagementMapper;
import com.example.quizmanagement.model.quiz.Question;
import com.example.quizmanagement.model.quiz.Quiz;
import com.example.quizmanagement.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class QuizManagementService {
    private final QuizRepository quizRepository;
    private final QuizManagementMapper quizManagementMapper;
    private final MessageSource messageSource;

    @Transactional
    public QuizResponseWithAnswers save(QuizRequest request) {
        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        if (!loggedUser.isCompany()) {
            throw new BadRequestException(messageSource.getMessage("USER_IS_NOT_VALID", null,
                    Locale.getDefault()));
        }

        Quiz entity = quizManagementMapper.toEntity(request);

        entity.setCreatorId(loggedUser.getId());
        entity.setTime(request.time());
        entity.getQuestions().forEach(q -> q.setQuiz(entity));

        Quiz savedEntity = quizRepository.save(entity);

        return quizManagementMapper.toResponseWithAnswers(savedEntity);
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

    @Transactional
    public QuizResponseWithAnswers editQuiz(QuizRequest request, long id) {

        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new BadRequestException(messageSource
                .getMessage("QUIZ_NOT_FOUND", null, Locale.getDefault())));

        if (!Objects.equals(quiz.getCreatorId(), loggedUser.getId())) {
            throw new BadRequestException(messageSource.getMessage("USER_IS_NOT_VALID", null,
                    Locale.getDefault()));
        }

        quiz.setTechnology(request.technology());
        quiz.setTitle(request.title());
        Quiz savedEntity = quizRepository.save(quiz);
        return quizManagementMapper.toResponseWithAnswers(savedEntity);
    }

    @Transactional
    public void deleteQuiz(long id) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new BadRequestException(messageSource
                .getMessage("QUIZ_NOT_FOUND", null, Locale.getDefault())));
        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        if (!Objects.equals(quiz.getCreatorId(), loggedUser.getId())) {
            throw new BadRequestException(messageSource.getMessage("USER_IS_NOT_VALID", null,
                    Locale.getDefault()));
        }
        quizRepository.delete(quiz);
    }

    public List<SimpleQuizResponse> getAllQuizByCompany() {
        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        List<Quiz> allByCreatorId = quizRepository.findAllByCreatorId(loggedUser.getId());

        return allByCreatorId.stream().map(quizManagementMapper::toSimpleResponse).toList();
    }
}
