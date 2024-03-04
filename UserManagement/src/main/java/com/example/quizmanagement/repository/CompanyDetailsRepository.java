package com.example.quizmanagement.repository;

import com.example.quizmanagement.model.companydetails.CompanyDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyDetailsRepository extends JpaRepository<CompanyDetails, Long> {
    Optional<CompanyDetails> findByUserId(Long userId);
    boolean existsByUserId(Long userId);
}
