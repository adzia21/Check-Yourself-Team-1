package com.example.quizmanagement.service;

import com.example.quizmanagement.model.Result;
import com.example.quizmanagement.model.quiz.QuestionType;
import com.example.quizmanagement.model.quiz.Quiz;
import com.example.quizmanagement.model.result.QuestionAnswer;
import com.example.quizmanagement.model.result.QuizAnswers;
import com.example.quizmanagement.repository.QuizAnswersRepository;
import com.example.quizmanagement.repository.QuizRepository;
import com.example.quizmanagement.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResultService {
    private final QuizRepository quizRepository;
    private final ResultRepository resultRepository;
    private final QuizAnswersRepository quizAnswersRepository;

    public List<Result> findByUser(Long userId) {
        return resultRepository.findAllByUserId(userId);
    }
    public Result calculateResults(QuizAnswers quizAnswers) {
        quizAnswersRepository.save(quizAnswers);

        List<QuestionAnswer> answers = quizAnswers.getAnswers();

        Quiz quiz = quizRepository.findById(quizAnswers.getQuizId()).orElseThrow();
        int maxPoints = quiz.getQuestions().size();

        Integer receivedPoints = quiz.getQuestions().stream().map(question -> {
            if (question.getType().equals(QuestionType.MULTIPLE_CHOICE)) {
                Optional<QuestionAnswer> multipleAnswersOptional = answers.stream().filter(questionAnswer -> questionAnswer.getQuestionId().equals(question.getId())).findFirst();

                if (multipleAnswersOptional.isEmpty()) {
                    return 0;
                }

                QuestionAnswer multipleAnswers = multipleAnswersOptional.get();

                List<String> chosenAnswers = multipleAnswers.getChosenMultipleAnswers().stream().sorted().toList();
                List<String> correctAnswers = question.getMultipleChoiceAnswer().getCorrect().stream().sorted().toList();

                if (chosenAnswers.equals(correctAnswers)) {
                    return 1;
                }
            }
            if (question.getType().equals(QuestionType.MATCH)) {
                Optional<QuestionAnswer> matchAnswerOptional = answers.stream().filter(questionAnswer -> questionAnswer.getQuestionId().equals(question.getId())).findFirst();

                if (matchAnswerOptional.isEmpty()) {
                    return 0;
                }
                QuestionAnswer matchAnswer = matchAnswerOptional.get();

                List<QuestionAndAnswer> chosenAnswers = matchAnswer.getQuestionAndAnswer();
                List<QuestionAndAnswer> correctAnswers = question.getMatches().stream().map(matches -> new QuestionAndAnswer(matches.getQuestion(), matches.getAnswer())).toList();

                if (chosenAnswers.size() == correctAnswers.size() && new HashSet<>(chosenAnswers).containsAll(correctAnswers)) {
                    return 1;
                }
            }
            if (question.getType().equals(QuestionType.FINISH_SENTENCE)) {
                Optional<QuestionAnswer> matchAnswerOptional = answers.stream().filter(questionAnswer -> questionAnswer.getQuestionId().equals(question.getId())).findFirst();

                if (matchAnswerOptional.isEmpty()) {
                    return 0;
                }

                QuestionAnswer matchAnswer = matchAnswerOptional.get();

                List<QuestionAndAnswer> chosenAnswers = matchAnswer.getQuestionAndAnswer();
                List<QuestionAndAnswer> correctAnswers = question.getSentences().stream().map(matches -> new QuestionAndAnswer(matches.getQuestion(), matches.getAnswer())).toList();

                if (chosenAnswers.size() == correctAnswers.size() && new HashSet<>(chosenAnswers).containsAll(correctAnswers)) {
                    return 1;
                }
            }
            return 0;
        }).reduce(0, Integer::sum);


        Result finalResult = new Result(quiz, quizAnswers.getUserId(), quiz.getTechnology(), quiz.getTechnology(), maxPoints, receivedPoints);

        return resultRepository.save(finalResult);
    }
}

