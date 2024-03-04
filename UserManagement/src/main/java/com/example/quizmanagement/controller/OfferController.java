package com.example.quizmanagement.controller;

import com.example.quizmanagement.dto.request.OfferRequest;
import com.example.quizmanagement.dto.response.OfferResponse;
import com.example.quizmanagement.dto.response.SimpleOfferResponse;
import com.example.quizmanagement.service.OfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/offers")
public class OfferController {

    private final OfferService offerService;

    @PostMapping
    public OfferResponse createOffer(@Valid @RequestBody OfferRequest offerRequest) {
        return offerService.saveOffer(offerRequest);
    }

    @PutMapping("/{id}")
    public OfferResponse editOffer(@PathVariable int id, @Valid @RequestBody OfferRequest offerRequest) {
        return offerService.editOffer(id, offerRequest);
    }

    @GetMapping("/company/{id}")
    public List<SimpleOfferResponse> getAllForCompany(@PathVariable int id) {
        return offerService.getAllForCompany(id);
    }

    @GetMapping("/{id}")
    public OfferResponse getDetailsById(@PathVariable int id) {
        return offerService.getById(id);
    }

    @GetMapping
    public List<SimpleOfferResponse> getAll() {
        return offerService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        offerService.delete(id);
    }
}
