package com.example.quizmanagement.model.quiz;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class QuestionAndAnswer {
    @NonNull
    private String question;
    @NonNull
    @ElementCollection
    private List<String> answer;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof QuestionAndAnswer that)) return false;
        return getQuestion().equals(that.getQuestion()) && getAnswer().equals(that.getAnswer()) && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getQuestion(), getAnswer(), getId());
    }
}
