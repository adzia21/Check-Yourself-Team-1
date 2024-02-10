package com.example.quizmanagement.mapper;

import com.example.quizmanagement.dto.request.QuizRequest;
import com.example.quizmanagement.dto.response.QuestionResponse;
import com.example.quizmanagement.dto.response.QuestionResponseWithAnswers;
import com.example.quizmanagement.dto.response.QuizResponse;
import com.example.quizmanagement.dto.response.QuizResponseWithAnswers;
import com.example.quizmanagement.model.quiz.Quiz;
import com.example.quizmanagement.model.quiz.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizManagementMapper {
    Quiz toEntity(QuizRequest request);

    // CREATE QUIZ - FROM REQUEST TO ENTITY - WITH ANSWERS
    QuizResponseWithAnswers toResponseWithAnswers(Quiz entity);

    // CREATE QUIZ - FROM REQUEST TO ENTITY - WITH ANSWERS
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
    @Mapping(source = "entity.question", target = "question")
    @Mapping(source = "answers", target = "answers")
    QuestionResponse toResponseWithoutAnswers(Question entity, List<String> answers);
}
