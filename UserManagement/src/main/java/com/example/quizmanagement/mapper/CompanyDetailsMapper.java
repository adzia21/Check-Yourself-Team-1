package com.example.quizmanagement.mapper;

import com.example.quizmanagement.dto.request.CompanyDetailsRequest;
import com.example.quizmanagement.dto.response.CompanyDetailsResponse;
import com.example.quizmanagement.model.companydetails.CompanyDetails;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CompanyDetailsMapper {

    CompanyDetailsResponse toDto(CompanyDetails entity);
    void updateEntityFromDto(CompanyDetailsRequest dto, @MappingTarget CompanyDetails entity);
}