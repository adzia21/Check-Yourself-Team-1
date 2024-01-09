package com.example.quizmanagement.repository;

import com.example.quizmanagement.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findAllByUserId(Long userId);
}
