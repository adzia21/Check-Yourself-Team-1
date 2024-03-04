package com.example.login.service.user;

import com.example.login.model.user.User;
import com.example.login.payload.response.JwtResponse;

import java.util.Set;

public interface AuthenticationService {
    JwtResponse authenticateAndReturnJwt(String username, String password);

    User registerUser(String name, String password, String email, String signUpRequestName, String surname, String companyName,
                      String nip, Set<String> requestedRoles);
}
