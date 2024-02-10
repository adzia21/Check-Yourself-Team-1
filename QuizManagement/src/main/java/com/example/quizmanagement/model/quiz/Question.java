package com.example.quizmanagement.model.quiz;

import com.example.quizmanagement.enums.QuestionType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Enumerated(value = EnumType.STRING)
    private QuestionType type;
    private String code;
    @NotNull
    private String question;
    @ElementCollection
    private List<String> correctAnswers;
    @ElementCollection
    private List<String> incorrectAnswers;
}
