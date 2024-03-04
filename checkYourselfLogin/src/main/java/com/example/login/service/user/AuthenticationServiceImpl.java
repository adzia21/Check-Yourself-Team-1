package com.example.login.service.user;

import com.example.login.exception.EmailAlreadyTakenException;
import com.example.login.exception.RoleNotFoundException;
import com.example.login.jwt.JwtUtils;
import com.example.login.model.user.Role;
import com.example.login.model.user.User;
import com.example.login.payload.response.JwtResponse;
import com.example.login.repository.RoleRepository;
import com.example.login.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.login.model.user.ERole.ADMIN;
import static com.example.login.model.user.ERole.USER;

@RequiredArgsConstructor
@Service
class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final  UserRepository userRepository;
    private final   RoleRepository roleRepository;
    private final  PasswordEncoder encoder;
    private final  JwtUtils jwtUtils;
    private final RestTemplate restTemplate;

    @Override
    public JwtResponse authenticateAndReturnJwt(String username, String password) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return new JwtResponse(jwt, "Bearer", userDetails.getId(), userDetails.getEmail(), userDetails.isCompany(), userDetails.getEmail(), roles);
    }

    @Override
    public User registerUser(String name, String password, String email, String signUpRequestName, String surname,
                             String companyName, String nip, Set<String> requestedRoles) {
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyTakenException(email);
        }

        User user = new User(encoder.encode(password), email);

        if (companyName != null) {
            user.setCompany(true);
            user.setCompanyName(companyName);
            user.setNip(nip);
        } else {
            user.setCompany(false);
            user.setName(name);
            user.setSurname(surname);
        }

        Set<Role> roles = getRoles(requestedRoles);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        String url = "http://localhost:8282";

        if (savedUser.isCompany()) {
            url = url + "/api/company-details/empty/" + savedUser.getId() + "/" + savedUser.getCompanyName();
        } else {
            url = url + "/api/user-details/empty/" + savedUser.getId() + "/" + savedUser.getName() + "/" + savedUser.getSurname() + "/" + savedUser.getEmail();
        }

        restTemplate.getForObject(url, Void.class);

        return savedUser;
    }

    private Set<Role> getRoles(Set<String> requestedRoles) {
        Set<Role> roles = new HashSet<>();

        if (requestedRoles == null) {
            Role userRole = roleRepository.findByName(USER).orElseThrow(RoleNotFoundException::new);
            roles.add(userRole);
        } else {
            requestedRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    Role adminRole = roleRepository.findByName(ADMIN).orElseThrow(RoleNotFoundException::new);
                    roles.add(adminRole);
                } else {
                    Role userRole = roleRepository.findByName(USER).orElseThrow(RoleNotFoundException::new);
                    roles.add(userRole);
                }
            });
        }
        return roles;
    }
}
