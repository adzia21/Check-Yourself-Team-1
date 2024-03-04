package com.example.login.payload.request;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;


@Setter
@Getter
public class LoginRequest {
    @NonNull
    @NotEmpty
    @NotBlank
    @Size(min = 4, max = 20)
    private String mail;

    @NonNull
    @NotEmpty
    @NotBlank
    @Size(min = 4, max = 20)
    private String password;
}
