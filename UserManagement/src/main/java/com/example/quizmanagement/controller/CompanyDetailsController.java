
package com.example.quizmanagement.controller;

import com.example.quizmanagement.dto.request.CompanyDetailsRequest;
import com.example.quizmanagement.dto.response.CompanyDetailsResponse;
import com.example.quizmanagement.dto.response.UserDetailsResponse;
import com.example.quizmanagement.service.CompanyDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company-details")
@RequiredArgsConstructor
public class CompanyDetailsController {

    private final CompanyDetailsService companyDetailsService;

    @GetMapping("/empty/{id}/{name}")
    public void createEmptyDetails(@PathVariable String name, @PathVariable long id) {
        companyDetailsService.createEmptyIfNotExist(id, name);
    }

    @PostMapping
    public CompanyDetailsResponse createDetails(@RequestBody CompanyDetailsRequest request) {
        return companyDetailsService.createCompanyDetails(request);
    }

    @PutMapping
    public CompanyDetailsResponse updateDetails(@RequestBody CompanyDetailsRequest request) {
        return companyDetailsService.createCompanyDetails(request);
    }

    @GetMapping
    public CompanyDetailsResponse getLoggedUserDetails() {
        return companyDetailsService.getLoggedCompanyDetails();
    }

    @GetMapping("{id}")
    public CompanyDetailsResponse getCompanyDetailsById(@PathVariable Long id) {
        return companyDetailsService.getUserDetailsById(id);
    }

    @GetMapping("/all")
    public List<CompanyDetailsResponse> getCompanyDetailsById() {
        return companyDetailsService.getAllUserDetails();
    }
}
