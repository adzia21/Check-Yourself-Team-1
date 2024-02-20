package com.example.quizmanagement.repository;

import com.example.quizmanagement.model.result.UserResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<UserResult, Long> {

    UserResult findUserResultByUserIdAndAndQuizId(long userId, Long quizId);
}
