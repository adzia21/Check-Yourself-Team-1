package com.example.quizmanagement.controller;

import com.example.quizmanagement.dto.request.UserDetailsRequest;
import com.example.quizmanagement.dto.response.UserDetailsResponse;
import com.example.quizmanagement.service.UserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-details")
@RequiredArgsConstructor
public class UserDetailsController {

    private final UserDetailsService userDetailsService;

    @GetMapping("/empty/{id}/{name}/{surname}/{email}")
    public void createEmptyDetails(@PathVariable String name, @PathVariable String surname, @PathVariable String email, @PathVariable long id) {
        userDetailsService.createEmptyIfNotExist(id, name, surname, email);
    }

    @PostMapping
    public UserDetailsResponse createDetails(@RequestBody UserDetailsRequest request) {
        return userDetailsService.createUserDetails(request);
    }

    @PutMapping
    public UserDetailsResponse updateDetails(@RequestBody UserDetailsRequest request) {
        return userDetailsService.createUserDetails(request);
    }

    @GetMapping
    public UserDetailsResponse getLoggedUserDetails() {
        return userDetailsService.getLoggedUserDetails();
    }

    @GetMapping("{id}")
    public UserDetailsResponse getUserDetailsById(@PathVariable Long id) {
        return userDetailsService.getUserDetailsById(id);
    }

    @GetMapping("all")
    public List<UserDetailsResponse> getUserDetailsById() {
        return userDetailsService.getAllUserDetails();
    }
}
