package com.example.quizmanagement.model.result;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuizAnswers {
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "quiz_to_question",
            joinColumns = @JoinColumn(name = "question_answer"),
            inverseJoinColumns = @JoinColumn(name = "quiz_answers"))
    List<QuestionAnswer> answers;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long quizId;
    private Long userId;
}
