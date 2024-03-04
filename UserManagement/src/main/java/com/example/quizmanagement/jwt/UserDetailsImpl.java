package com.example.quizmanagement.jwt;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserDetailsImpl implements UserDetails {
    private Long id;
    private String name;
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private String accountNonLocked;
    private String credentialsNonExpired;
    private String accountNonExpired;
    private String enabled;
    private Collection<? extends GrantedAuthority> authorities;
    private boolean isCompany;
    private String companyName;
    private String nip;
    private String surname;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends Map<String, String>> authorities) {
        this.authorities = authorities.stream()
                .map(authMap -> new SimpleGrantedAuthority(authMap.get("authority")))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
