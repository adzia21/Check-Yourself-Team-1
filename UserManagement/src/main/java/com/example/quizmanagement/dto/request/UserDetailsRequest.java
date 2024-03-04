package com.example.quizmanagement.dto.request;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record UserDetailsRequest(
        String title,
        String localization,
        String githubUrl,
        String phoneNumber,
        LocalDate dateOfBirth,
        String siteUrl,
        String cashRequirements,
        String timeRequirements,
        String typeOfContract,
        String aboutMe,
        List<ExperienceDTO> experience,
        List<EducationDTO> education,
        List<QualificationDTO> qualification,
        Map<String, SkillDTO> skills,
        List<String> organizations,
        List<String> softSkills,
        List<String> hobbies
) {}
