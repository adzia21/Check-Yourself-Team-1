package com.example.quizmanagement.dto.response;

import com.example.quizmanagement.dto.request.EducationDTO;
import com.example.quizmanagement.dto.request.ExperienceDTO;
import com.example.quizmanagement.dto.request.QualificationDTO;
import com.example.quizmanagement.dto.request.SkillDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public record UserDetailsResponse(
        Long id,
        String name,
        String surname,
        Long userId,
        String mail,
        String title,
        String localization,
        String githubUrl,
        String phoneNumber,
        LocalDate dateOfBirth, // Assuming you've converted this to LocalDate in the entity
        String siteUrl,
        String cashRequirements,
        String timeRequirements,
        String typeOfContract,
        String aboutMe,
        List<ExperienceDTO> experience, // Assuming these DTOs are used for response as well
        List<EducationDTO> education,
        List<QualificationDTO> qualification,
        Map<String, SkillDTO> skills,
        List<String> organizations,
        List<String> softSkills,
        List<String> hobbies
) {}