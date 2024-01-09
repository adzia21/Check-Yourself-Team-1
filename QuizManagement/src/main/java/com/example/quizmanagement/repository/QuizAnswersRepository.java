package com.example.quizmanagement.repository;

import com.example.quizmanagement.model.result.QuizAnswers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAnswersRepository extends JpaRepository<QuizAnswers, Long> {
}
