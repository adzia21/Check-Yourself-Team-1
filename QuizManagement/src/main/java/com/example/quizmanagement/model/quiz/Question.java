package com.example.quizmanagement.model.quiz;

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
    private String question;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "answers_id")
    private MultipleChoiceAnswers multipleChoiceAnswer;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "match_to_question", joinColumns = @JoinColumn(name = "match"), inverseJoinColumns = @JoinColumn(name = "question"))
    private List<Sentence> sentences;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "matches_to_question", joinColumns = @JoinColumn(name = "matches"), inverseJoinColumns = @JoinColumn(name = "question"))
    private List<Matches> matches;

}
