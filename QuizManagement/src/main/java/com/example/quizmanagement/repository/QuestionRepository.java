package com.example.quizmanagement.repository;

import com.example.quizmanagement.model.quiz.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
