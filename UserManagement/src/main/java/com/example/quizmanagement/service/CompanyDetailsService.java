package com.example.quizmanagement.service;

import com.example.quizmanagement.dto.request.CompanyDetailsRequest;
import com.example.quizmanagement.dto.response.CompanyDetailsResponse;
import com.example.quizmanagement.dto.response.UserDetailsResponse;
import com.example.quizmanagement.exceptions.BadRequestException;
import com.example.quizmanagement.jwt.UserDetailsImpl;
import com.example.quizmanagement.mapper.CompanyDetailsMapper;
import com.example.quizmanagement.model.companydetails.CompanyDetails;
import com.example.quizmanagement.model.userdetails.UserDetails;
import com.example.quizmanagement.repository.CompanyDetailsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyDetailsService {

    private final CompanyDetailsRepository companyDetailsRepository;
    private final CompanyDetailsMapper mapper;

    @Transactional
    public CompanyDetailsResponse createCompanyDetails(CompanyDetailsRequest request) {
        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        if (!loggedUser.isCompany()) {
            throw new BadRequestException("User is not a company");
        }

        Optional<CompanyDetails> optionalUserDetails = companyDetailsRepository.findByUserId(loggedUser.getId());
        CompanyDetails userDetails = null;

        if (optionalUserDetails.isEmpty()) {
            userDetails = createEmptyIfNotExist(loggedUser.getId(), loggedUser.getCompanyName());
        } else {
            userDetails = optionalUserDetails.get();
        }


        mapper.updateEntityFromDto(request, userDetails);

        return mapper.toDto(companyDetailsRepository.save(userDetails));
    }

    public CompanyDetails createEmptyIfNotExist(long id, String name) {
        if (companyDetailsRepository.existsByUserId(id)) {
            return null;
        }

        CompanyDetails userDetails = CompanyDetails.builder()
                .userId(id)
                .name(name)
                .build();
        return companyDetailsRepository.save(userDetails);
    }

    @Transactional
    public CompanyDetailsResponse getLoggedCompanyDetails() {

        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        CompanyDetails userDetails = companyDetailsRepository.findByUserId(loggedUser.getId())
                .orElseThrow(() -> new BadRequestException(""));

        return mapper.toDto(userDetails);

    }

    public CompanyDetailsResponse getUserDetailsById(Long id) {
        CompanyDetails userDetails = companyDetailsRepository.findById(id).orElseThrow();

        return mapper.toDto(userDetails);
    }

    public List<CompanyDetailsResponse> getAllUserDetails() {
        List<CompanyDetails> userDetails = companyDetailsRepository.findAll();

        return userDetails.stream().map(mapper::toDto).toList();
    }
}
