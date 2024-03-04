package com.example.quizmanagement.mapper;

import com.example.quizmanagement.dto.request.OfferRequest;
import com.example.quizmanagement.dto.response.OfferResponse;
import com.example.quizmanagement.dto.response.SimpleOfferResponse;
import com.example.quizmanagement.model.companydetails.CompanyDetails;
import com.example.quizmanagement.model.offer.Offer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OfferMapper {
    @Mapping(source = "companyDetails", target = "company")
    @Mapping(source = "request.localization", target = "localization")
    @Mapping(source = "request.title", target = "title")
    @Mapping(source = "request.contractType", target = "contractType")
    @Mapping(source = "request.expirationDate", target = "expirationDate")
    @Mapping(source = "request.description", target = "description")
    @Mapping(source = "request.technologies", target = "technologies")
    @Mapping(source = "request.tools", target = "tools")
    @Mapping(source = "request.platforms", target = "platforms")
    @Mapping(source = "request.languages", target = "languages")
    @Mapping(source = "request.mainTasks", target = "mainTasks")
    @Mapping(source = "request.desiredKnowledge", target = "desiredKnowledge")
    @Mapping(source = "request.organizationOfWork", target = "organizationOfWork")
    @Mapping(source = "request.benefits", target = "benefits")
    @Mapping(source = "request.whatWeOffer", target = "whatWeOffer")
    @Mapping(source = "request.additionalInformation", target = "additionalInformation")
    @Mapping(target = "id", ignore = true)
    Offer toEntity(OfferRequest request, CompanyDetails companyDetails);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "companyDetails", target = "company")
    @Mapping(source = "request.title", target = "title")
    @Mapping(source = "request.localization", target = "localization")
    @Mapping(source = "request.contractType", target = "contractType")
    @Mapping(source = "request.expirationDate", target = "expirationDate")
    @Mapping(source = "request.description", target = "description")
    @Mapping(source = "request.technologies", target = "technologies")
    @Mapping(source = "request.tools", target = "tools")
    @Mapping(source = "request.platforms", target = "platforms")
    @Mapping(source = "request.languages", target = "languages")
    @Mapping(source = "request.mainTasks", target = "mainTasks")
    @Mapping(source = "request.desiredKnowledge", target = "desiredKnowledge")
    @Mapping(source = "request.organizationOfWork", target = "organizationOfWork")
    @Mapping(source = "request.benefits", target = "benefits")
    @Mapping(source = "request.whatWeOffer", target = "whatWeOffer")
    @Mapping(source = "request.additionalInformation", target = "additionalInformation")
    Offer toEntity(OfferRequest request, int id, CompanyDetails companyDetails);

    @Mapping(source = "entity.company.name", target = "companyName")
    OfferResponse toResponse(Offer entity);
    @Mapping(source = "entity.company.name", target = "companyName")
    SimpleOfferResponse toSimpleResponse(Offer entity);
}
