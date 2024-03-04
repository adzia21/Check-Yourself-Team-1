package com.example.quizmanagement.model.companydetails;

import com.example.quizmanagement.model.offer.Offer;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private Long userId;
    private String localization;
    private Integer hiredPeople;
    @Column(length = 2000)
    private String description;
    private String facebookUrl;
    private String twitterUrl;
    private String instagramUrl;
    private String linkedInUrl;
    @ElementCollection
    List<String> technologies;
    @ElementCollection
    List<String> tools;
    @ElementCollection
    List<String> platforms;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "offer_to_company",
            joinColumns = @JoinColumn(name = "company", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "offer_id", referencedColumnName = "id"))
    private List<Offer> offers;
}
