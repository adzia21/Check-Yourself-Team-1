package com.example.login.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Size(min = 10, max = 60)
    @NonNull
    private String name;
    private String username;
    private String surname;
    @JsonIgnore
    private String password;
    private String email;
    private boolean isCompany;
    private String companyName;
    private String nip;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_userId"),
            inverseJoinColumns = @JoinColumn(name = "role_roleId"))
    private Set<Role> roles = new HashSet<>();

    @Size(min = 10, max = 380)
    @Column(columnDefinition = "TEXT")
    private String description;

    public User(String password, String email) {
        this.username = email;
        this.password = password;
        this.email = email;
    }


}
