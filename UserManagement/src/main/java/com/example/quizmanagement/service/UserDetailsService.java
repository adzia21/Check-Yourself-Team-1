package com.example.quizmanagement.service;

import com.example.quizmanagement.dto.request.UserDetailsRequest;
import com.example.quizmanagement.dto.response.UserDetailsResponse;
import com.example.quizmanagement.exceptions.BadRequestException;
import com.example.quizmanagement.jwt.UserDetailsImpl;
import com.example.quizmanagement.mapper.UserDetailsMapper;
import com.example.quizmanagement.model.userdetails.UserDetails;
import com.example.quizmanagement.repository.UserDetailsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsService {

    private final UserDetailsRepository userDetailsRepository;
    private final UserDetailsMapper mapper;

    @Transactional
    public UserDetailsResponse createUserDetails(UserDetailsRequest request) {
        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        if (loggedUser.isCompany()) {
            throw new BadRequestException("User is a company");
        }

        Optional<UserDetails> optionalUserDetails = userDetailsRepository.findByUserId(loggedUser.getId());
        UserDetails userDetails = null;

        if (optionalUserDetails.isEmpty()) {
            userDetails = createEmptyIfNotExist(loggedUser.getId(), loggedUser.getName(), loggedUser.getSurname(), loggedUser.getEmail());
        } else {
            userDetails = optionalUserDetails.get();
        }


        mapper.updateEntityFromDto(request, userDetails);

        return mapper.toDto(userDetailsRepository.save(userDetails));
    }

    public UserDetails createEmptyIfNotExist(long id, String name, String surname, String email) {
        if (userDetailsRepository.existsByUserId(id)) {
            return null;
        }

        UserDetails userDetails = UserDetails.builder()
                .userId(id)
                .name(name)
                .surname(surname)
                .mail(email)
                .build();
        return userDetailsRepository.save(userDetails);
    }

    @Transactional
    public UserDetailsResponse getLoggedUserDetails() {

        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        UserDetails userDetails = userDetailsRepository.findByUserId(loggedUser.getId())
                .orElseThrow(() -> new BadRequestException(""));

        return mapper.toDto(userDetails);

    }

    public UserDetailsResponse getUserDetailsById(Long id) {
        UserDetails userDetails = userDetailsRepository.findById(id).orElseThrow();

        return mapper.toDto(userDetails);
    }

    public List<UserDetailsResponse> getAllUserDetails() {
        List<UserDetails> userDetails = userDetailsRepository.findAll();

        return userDetails.stream().map(mapper::toDto).toList();
    }
}
