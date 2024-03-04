package com.example.quizmanagement.mapper;

import com.example.quizmanagement.dto.request.UserDetailsRequest;
import com.example.quizmanagement.dto.response.UserDetailsResponse;
import com.example.quizmanagement.model.userdetails.UserDetails;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserDetailsMapper {

    UserDetailsResponse toDto(UserDetails entity);
    void updateEntityFromDto(UserDetailsRequest dto, @MappingTarget UserDetails entity);
}