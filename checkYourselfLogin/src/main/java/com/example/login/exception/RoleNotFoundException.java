package com.example.login.exception;

public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException() {
        super("Role not found");
    }
}
