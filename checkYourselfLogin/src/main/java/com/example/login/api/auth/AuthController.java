package com.example.login.api.auth;


import com.example.login.model.user.User;
import com.example.login.payload.request.LoginRequest;
import com.example.login.payload.request.SignupRequest;
import com.example.login.payload.response.JwtResponse;
import com.example.login.service.user.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authenticationService.authenticateAndReturnJwt(loginRequest.getMail(), loginRequest.getPassword());
        return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        User user = authenticationService.registerUser(signUpRequest.getName(), signUpRequest.getPassword(), signUpRequest.getEmail(),
                signUpRequest.getName(), signUpRequest.getSurname(), signUpRequest.getCompanyName(), signUpRequest.getNip(),
                signUpRequest.getRole());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
