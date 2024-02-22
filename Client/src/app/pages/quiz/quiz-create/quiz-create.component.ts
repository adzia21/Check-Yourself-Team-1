import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.scss'],
})
export class QuizCreateComponent implements AfterViewInit {
  public quizCreationForm: FormGroup;
  public questionForm: FormGroup;
  public incorrectAnswerArray: FormGroup;
  public correctAnswerArray: FormGroup;

  public quizTypes = ['MULTIPLE_CHOICE', 'FINISH_SENTANCE'];

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) {
    this.incorrectAnswerArray = this.fb.group({
      incorrectAnswer: new FormControl('', [Validators.required]),
    });

    this.correctAnswerArray = this.fb.group({
      correctAnswer: new FormControl('', [Validators.required]),
    });

    this.questionForm = this.fb.group({
      type: new FormControl('', []),
      code: new FormControl('', []),
      questionName: new FormControl('', []),
      sentence: this.fb.array([]),
      correctAnswers: this.fb.array([]),
      incorrectAnswers: this.fb.array([]),
    });

    this.quizCreationForm = this.fb.group({
      technology: new FormControl('', []),
      title: new FormControl('', []),
      time: new FormControl('', []),
      questions: this.fb.array([this.questionForm]),
    });
  }

  ngAfterViewInit(): void {
    this.addCorrectAnswer(0);
    this.addIncorrectAnswer(0);
    this.ref.detectChanges();
  }

  public get questions() {
    return this.quizCreationForm.get('questions') as FormArray;
  }

  public correctAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('correctAnswers') as FormArray;
  }

  public incorrectAnswers(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('incorrectAnswers') as FormArray;
  }

  public sentence(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('sentence') as FormArray;
  }

  public addIncorrectAnswer(questionIndex: number) {
    this.incorrectAnswers(questionIndex).push(
      this.fb.group({
        incorrectAnswer: new FormControl('', [Validators.required]),
      })
    );
  }

  public addCorrectAnswer(questionIndex: number) {
    this.correctAnswers(questionIndex).push(
      this.fb.group({
        correctAnswer: new FormControl('', [Validators.required]),
      })
    );
  }

  public addNewQuestion() {
    this.questions.push(
      this.fb.group({
        type: new FormControl('', []),
        code: new FormControl('', []),
        questionName: new FormControl('', []),
        correctAnswers: this.fb.array([this.correctAnswerArray]),
        incorrectAnswers: this.fb.array([this.incorrectAnswerArray]),
      })
    );
  }

  public removeAtIndex(
    form: string,
    questionIndex: number,
    answerIndex: number = 0
  ) {
    switch (form) {
      case 'incorrectAnswer':
        return this.incorrectAnswers(questionIndex).removeAt(answerIndex);
      case 'correctAnswer':
        return this.correctAnswers(questionIndex).removeAt(answerIndex);
      case 'question':
        return this.questions.removeAt(questionIndex);
    }
  }
}
