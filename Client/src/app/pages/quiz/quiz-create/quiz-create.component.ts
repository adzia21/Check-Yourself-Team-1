import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';

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

  public quizTypes = ['MULTIPLE_CHOICE', 'FINISH_SENTENCE'];

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private quizService: QuizService, private toastr: ToastrService) {
    this.incorrectAnswerArray = this.fb.group({
      incorrectAnswer: new FormControl('', [Validators.required]),
    });

    this.correctAnswerArray = this.fb.group({
      correctAnswer: new FormControl('', [Validators.required]),
    });

    this.questionForm = this.fb.group({
      type: new FormControl('', []),
      questionName: new FormControl('', []),
      correctAnswers: this.fb.array([]),
      incorrectAnswers: this.fb.array([]),
      code: new FormControl('')
    });

    this.quizCreationForm = this.fb.group({
      technology: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      questions: this.fb.array([]),
    });
  }

  ngAfterViewInit(): void {
    this.addNewQuestion(true);
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

  public addNewQuestion(isFirst: boolean) {
    if (isFirst) {
      this.questions.push(
        this.fb.group({
          type: new FormControl('', [Validators.required]),
          code: new FormControl('', []),
          questionName: new FormControl('', [Validators.required]),
          correctAnswers: this.fb.array([]),
          incorrectAnswers: this.fb.array([]),
        })
      );
      this.addCorrectAnswer(0);
      this.addIncorrectAnswer(0);
    } else {
      this.validate();
      this.questions.push(
        this.fb.group({
          type: new FormControl('', [Validators.required]),
          code: new FormControl('', []),
          questionName: new FormControl('', [Validators.required]),
          correctAnswers: this.fb.array([]),
          incorrectAnswers: this.fb.array([]),
        })
      );
      // this.addCorrectAnswer(this.questions.length);
      // this.addIncorrectAnswer(this.questions.length);
    }
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

  public save() {
    if (this.quizCreationForm.value.questions.length === 0) 
      return this.toastr.error('Quiz musi mieć minimum jedno pytanie');

    this.validate();
    this.quizCreationForm.value.questions.forEach((question: any) => {
      console.log(question.correctAnswers.length === 0 || question.incorrectAnswers.length === 0)
      if(question.correctAnswers.length === 0 || question.incorrectAnswers.length === 0) return;
    });

    return this.quizService.creataQuiz(this.quizCreationForm.value).subscribe(res => console.log(res));
  }

  public validate() {
    this.quizCreationForm.value?.questions.forEach((question: any) => {
      let correctArray: string[] = [];
      question.correctAnswers.forEach((answer: any) => {
        if(answer.correctAnswer != '') correctArray.push(answer.correctAnswer);
      });
      question.correctAnswers = correctArray;

      let incorrectArray: string[] = [];
      question.incorrectAnswers.forEach((answer: any) => {
        console.log(answer)
        if(answer.incorrectAnswer != '') incorrectArray.push(answer.incorrectAnswer);
      });
      question.incorrectAnswers = incorrectArray;
    });
    this.quizCreationForm.value.questions.forEach((question: any) => {
      console.log(question.correctAnswers.length === 0 || question.incorrectAnswers.length === 0)
      if (question.correctAnswers.length === 0 || question.incorrectAnswers.length === 0) {
        this.toastr.error('Każdy pytanie musi miec minimum jedną poprawną i niepoprawną odpowiedź');
      };
    });
  }
}
