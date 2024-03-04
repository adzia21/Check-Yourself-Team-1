package com.example.quizmanagement.model.offer;

import com.example.quizmanagement.enums.ContractTypeEnum;
import com.example.quizmanagement.model.companydetails.CompanyDetails;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String title;
    @ManyToOne
    private CompanyDetails company;
    private String localization;
    private String contractType;
    private LocalDate expirationDate;
    @Column(length = 2000)
    private String description;
    @ElementCollection
    private List<String> technologies;
    @ElementCollection
    private List<String> tools;
    @ElementCollection
    private List<String> platforms;
    @ElementCollection
    private List<String> languages;
    @ElementCollection
    private List<String> mainTasks;
    @ElementCollection
    private List<String> desiredKnowledge;
    @ElementCollection
    private List<String> organizationOfWork;
    @ElementCollection
    private List<String> benefits;
    @ElementCollection
    private List<String> whatWeOffer;
    @ElementCollection
    private List<String> additionalInformation;
}
