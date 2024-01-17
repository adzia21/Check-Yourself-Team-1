package com.example.quizmanagement.mapper;

import com.example.quizmanagement.dto.quiz.request.CreateQuizRequest;
import com.example.quizmanagement.dto.quiz.response.QuizResponse;
import com.example.quizmanagement.dto.simpledto.request.FullQuestionRequest;
import com.example.quizmanagement.model.Quiz;
import com.example.quizmanagement.model.quiz.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuizManagementMapper {
    Quiz toEntity(CreateQuizRequest request);

    QuizResponse toResponse(Quiz entity);

    Question toQuestionEntity(FullQuestionRequest request);
}
