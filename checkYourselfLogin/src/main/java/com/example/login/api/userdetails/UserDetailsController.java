package com.example.login.api.userdetails;

import com.example.login.model.user.User;
import com.example.login.model.user.dto.UserProfileInfoRequest;
import com.example.login.service.user.UserDataService;
import com.example.login.service.user.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/user/details")
public class UserDetailsController {

    private UserDataService userDataService;
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @PutMapping
    public ResponseEntity<Object> setAdditionalFields(@RequestBody @Valid UserProfileInfoRequest request){
        userDataService.addProfileDetails(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/loggedUser")
    public ResponseEntity<User> getLoggedUser(){
        return new ResponseEntity<>(userDetailsServiceImpl.getLoggedUser(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public String getUserFullName(@PathVariable Long userId){
        return userDetailsServiceImpl.getUserFullName(userId);
    }
}
