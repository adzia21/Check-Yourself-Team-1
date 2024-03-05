import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  public correctArray: string[] = [];
  public incorrectArray: string[] = [];

  public quizTypes = ['MULTIPLE_CHOICE', 'FINISH_SENTENCE'];

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef, private quizService: QuizService, private toastr: ToastrService, private router: Router) {
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
      if(question.correctAnswers.length === 0 || question.incorrectAnswers.length === 0) {
        return this.quizCreationForm.markAllAsTouched();
      };
    });

    if(!this.quizCreationForm.valid) return this.quizCreationForm.markAllAsTouched();

    this.quizCreationForm.value?.questions.forEach((question: any) => {

      let arr1: any = [];
      question.correctAnswers.forEach((answer: any) => {
        if(answer.correctAnswer?.trim() != '' && answer.correctAnswer != undefined) arr1.push(answer.correctAnswer);
      });
      question.correctAnswers =  arr1;

      let arr2: any = [];
      question.incorrectAnswers.forEach((answer: any) => {
        if(answer.incorrectAnswer?.trim() != '' && answer.incorrectAnswer != undefined) arr2.push(answer.incorrectAnswer);
      });
      question.incorrectAnswers = arr2;
    });

    

    return this.quizService.creataQuiz(this.quizCreationForm.value).subscribe(res => {
      this.router.navigate([`quiz/${res.id}`])
    });
  }

  public validate() {
    this.quizCreationForm.value?.questions.forEach((question: any) => {
      this.correctArray = [];
      question.correctAnswers.forEach((answer: any) => {
        if(answer.correctAnswer?.trim() != '' && answer.correctAnswer != undefined) this.correctArray.push(answer.correctAnswer);
      });

      this.incorrectArray = [];
      question.incorrectAnswers.forEach((answer: any) => {
        if(answer.incorrectAnswer?.trim() != '' && answer.incorrectAnswer != undefined) this.incorrectArray.push(answer.incorrectAnswer);
      });
    });
    
      if (this.correctArray.length === 0 || this.incorrectArray.length === 0) {
        return this.toastr.error('Każdy pytanie musi miec minimum jedną poprawną i niepoprawną odpowiedź');
      };

      return;
  }
}
