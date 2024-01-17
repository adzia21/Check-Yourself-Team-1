package com.example.quizmanagement.model;

import com.example.quizmanagement.model.quiz.Question;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
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
    private String technology;
    private String title;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "question_to_quiz", joinColumns = @JoinColumn(name = "question"), inverseJoinColumns = @JoinColumn(name = "quiz"))
    private List<Question> questions;
}
