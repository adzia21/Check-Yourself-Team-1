package com.example.quizmanagement.model.userdetails;

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
public class UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private Long userId;
    @NotNull
    private String mail;
    private String title;
    private String localization;
    private String githubUrl;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String siteUrl;
    private String cashRequirements;
    private String timeRequirements;
    private String typeOfContract;
    @Column(length = 2000)
    private String aboutMe;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Experience> experience;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Education> education;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Qualification> qualification;
    @OneToMany(cascade = CascadeType.ALL)
    private Map<String, Skill> skills;
    @ElementCollection
    List<String> organizations;
    @ElementCollection
    List<String> softSkills;
    @ElementCollection
    List<String> hobbies;
}
