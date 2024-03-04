package com.example.login.service.user;

import com.example.login.exception.UserNotFoundException;
import com.example.login.model.user.User;
import com.example.login.model.user.dto.UserProfileInfoRequest;
import com.example.login.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService, UserDataService{
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username)); //TODO CHANGE
        return UserDetailsImpl.build(user);
    }

    public UserDetails findUserById(Long id) throws UsernameNotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return UserDetailsImpl.build(user);
    }

    @Override
    public void addProfileDetails(UserProfileInfoRequest request) {
        Long loggedUserId = getLoggedUserId();
        User user = userRepository.findById(loggedUserId).orElseThrow(() -> new UserNotFoundException(loggedUserId));
        if (request.getDescription() != null) {
            user.setDescription(request.getDescription());
        }
        userRepository.save(user);
    }

    @Override
    public User getLoggedUser() {
        Long loggedUserId = getLoggedUserId();
        return userRepository.findById(loggedUserId).orElseThrow(() -> new UserNotFoundException(loggedUserId));
    }

    private static Long getLoggedUserId() {
        UserDetailsImpl loggedUser = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return loggedUser.getId();
    }

    public String getUserFullName(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        return user.getName() + " " + user.getSurname();
    }
}
