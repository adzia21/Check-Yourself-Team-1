package com.example.quizmanagement.repository;

import com.example.quizmanagement.model.quiz.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findAllByQuizId(Long quizId);

    Optional<Question> findByQuizIdAndId(Long quizId, Long questionId);


}
