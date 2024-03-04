package com.example.login.service.user;

import com.example.login.model.user.User;
import com.example.login.model.user.dto.UserProfileInfoRequest;

public interface UserDataService {
    void addProfileDetails(UserProfileInfoRequest request);
    User getLoggedUser();
}
