package com.example.quizmanagement.model.result;

import com.example.quizmanagement.enums.QuestionType;
import com.example.quizmanagement.model.quiz.QuestionAndAnswer;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuestionAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long questionId;
    private QuestionType questionType;

    @ElementCollection
    private List<String> chosenMultipleAnswers;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "question_to_answer", joinColumns = @JoinColumn(name = "question_answer"), inverseJoinColumns = @JoinColumn(name = "question_and_answer"))
    private List<QuestionAndAnswer> questionAndAnswer;
}
