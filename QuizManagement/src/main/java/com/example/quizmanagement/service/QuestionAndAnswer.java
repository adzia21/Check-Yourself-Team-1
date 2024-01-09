package com.example.quizmanagement.service;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

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
    private String answer;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionAndAnswer that = (QuestionAndAnswer) o;
        return Objects.equals(question, that.question) &&
                Objects.equals(answer, that.answer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(question, answer);
    }
}
