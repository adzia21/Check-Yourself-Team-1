package com.example.quizmanagement.repository;

import com.example.quizmanagement.model.offer.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Offer, Long> {

    List<Offer> findAllByCompanyId(Long companyId);
}
