package com.example.login.repository;

import com.example.login.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByName(String name);

    Boolean existsByEmail(String name);

    Boolean existsByName(String name);

    Optional<User> findUserByUsername(String name);
}
