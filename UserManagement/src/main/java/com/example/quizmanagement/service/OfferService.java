package com.example.quizmanagement.service;

import com.example.quizmanagement.dto.request.OfferRequest;
import com.example.quizmanagement.dto.response.CompanyDetailsResponse;
import com.example.quizmanagement.dto.response.OfferResponse;
import com.example.quizmanagement.dto.response.SimpleOfferResponse;
import com.example.quizmanagement.exceptions.BadRequestException;
import com.example.quizmanagement.jwt.UserDetailsImpl;
import com.example.quizmanagement.mapper.OfferMapper;
import com.example.quizmanagement.model.companydetails.CompanyDetails;
import com.example.quizmanagement.model.offer.Offer;
import com.example.quizmanagement.repository.CompanyDetailsRepository;
import com.example.quizmanagement.repository.CompanyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final CompanyRepository companyRepository;
    private final OfferMapper mapper;
    private final CompanyDetailsRepository companyDetailsRepository;


    @Transactional
    public OfferResponse saveOffer(OfferRequest offerRequest) {
        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        if (!loggedUser.isCompany()) {
            throw new BadRequestException("User is not a company");
        }

        CompanyDetails companyDetails = companyDetailsRepository.findByUserId(loggedUser.getId())
                .orElseThrow(() -> new BadRequestException("User doesn't exist"));

        Offer offer = mapper.toEntity(offerRequest, companyDetails);
        Offer savedOffer = companyRepository.save(offer);
        return mapper.toResponse(savedOffer);
    }

    @Transactional
    public List<SimpleOfferResponse> getAllForCompany(long id) {
        return companyRepository.findAllByCompanyId(id).stream()
                .map(mapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<SimpleOfferResponse> getAll() {
        return companyRepository.findAll().stream()
                .map(mapper::toSimpleResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public OfferResponse getById(long id) {
        Offer offer = companyRepository.findById(id).orElseThrow(() -> new BadRequestException(""));

        return mapper.toResponse(offer);
    }

    @Transactional
    public void delete(long id) {
        companyRepository.deleteById(id);
    }

    @Transactional
    public OfferResponse editOffer(int id, OfferRequest offerRequest) {
        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        if (!loggedUser.isCompany()) {
            throw new BadRequestException("User is not a company");
        }

        CompanyDetails companyDetails = companyDetailsRepository.findByUserId(loggedUser.getId())
                .orElseThrow(() -> new BadRequestException("User doesn't exist"));

        Offer offer = mapper.toEntity(offerRequest, id, companyDetails);
        Offer savedOffer = companyRepository.save(offer);
        return mapper.toResponse(savedOffer);
    }
}
