package com.example.quizmanagement.mapper;

import com.example.quizmanagement.dto.request.QuizRequest;
import com.example.quizmanagement.dto.response.*;
import com.example.quizmanagement.model.quiz.Question;
import com.example.quizmanagement.model.quiz.Quiz;
import com.example.quizmanagement.model.result.UserResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizManagementMapper {
    Quiz toEntity(QuizRequest request);

    QuizResponseWithAnswers toResponseWithAnswers(Quiz entity);

    QuestionResponseWithAnswers toQuestionResponseWithAnswers(Question entity);

    // RESOLVE QUIZ - GET QUIZ TO RESOLVE FOR USER
    @Mapping(source = "entity.id", target = "quizId")
    @Mapping(source = "entity.technology", target = "technology")
    @Mapping(source = "entity.title", target = "title")
    @Mapping(source = "questions", target = "questions")
    QuizResponse toFullResponseWithoutAnswers(Quiz entity, List<QuestionResponse> questions);

    @Mapping(source = "entity.id", target = "questionId")
    @Mapping(source = "entity.type", target = "type")
    @Mapping(source = "entity.code", target = "code")
    @Mapping(source = "entity.questionName", target = "question")
    @Mapping(source = "answers", target = "answers")
    QuestionResponse toResponseWithoutAnswers(Question entity, List<String> answers);

    @Mapping(source = "quiz.id", target = "quizId")
    @Mapping(source = "quiz.title", target = "quizName")
    @Mapping(source = "userResult.correctAnswer", target = "correctAnswer")
    @Mapping(source = "userResult.incorrectAnswer", target = "incorrectAnswer")
    @Mapping(source = "userResult.passed", target = "isPassed")
    @Mapping(source = "userResult.percentOfCorrectAnswers", target = "percentOfCorrectAnswers")
    ResultForUserResponse toResponseWithResult(Quiz quiz, UserResult userResult);

    SimpleQuizResponse toSimpleResponse(Quiz quiz);

}
