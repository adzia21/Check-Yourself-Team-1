package com.example.quizmanagement.model;

import com.example.quizmanagement.model.quiz.Quiz;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @JsonIgnore
    @OneToOne
    private Quiz quiz;
    @NonNull
    private Long userId;
    @NonNull
    private String technology;
    @NonNull
    private String title;
    @NonNull
    private Integer maxPoints;
    @NonNull
    private Integer receivedPoints;
}
