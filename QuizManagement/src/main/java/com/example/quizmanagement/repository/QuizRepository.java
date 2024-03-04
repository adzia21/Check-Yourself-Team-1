package com.example.quizmanagement.repository;

import com.example.quizmanagement.model.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findAllByCreatorId(Long creatorId);

}
