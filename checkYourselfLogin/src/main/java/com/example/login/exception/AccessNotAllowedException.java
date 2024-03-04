package com.example.login.exception;

public class AccessNotAllowedException extends RuntimeException {
    public AccessNotAllowedException(Long id) {
        super("Cannot access data user with id " + id);
    }
}
