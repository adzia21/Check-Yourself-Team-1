package com.example.login.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type;
    private Long id;
    private String username;
    private boolean isCompany;
    private String email;
    private List<String> roles;
}
