package com.example.quizmanagement.model.result;

import com.example.quizmanagement.model.quiz.Quiz;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private boolean isPassed;
    @ManyToOne(cascade = CascadeType.ALL)
    private Quiz quiz;
    private double percentOfCorrectAnswers;
    private int correctAnswerNumber;
    private int incorrectAnswerNumber;
}
