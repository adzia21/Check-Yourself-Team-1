package com.example.quizmanagement.model.quiz;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String technology;
    @NotNull
    private String title;
    @NotNull
    private Long creatorId;
    @NotNull
    private int time;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "question_to_quiz",
            joinColumns = @JoinColumn(name = "quiz", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"))
    private List<Question> questions;
    @NotNull
    private int percentageNeededToPass;
}
