export interface QuizSolve {
    quizId: number,
    technology: string,
    title: string,
    time: number,
    questions: QuizQuestionsModel[]
}

export interface QuizQuestionsModel {
    questionId: number,
    type: string,
    question: string,
    answers: string[]
}

export interface CreateQuiz {
    technology: string,
    title: string,
    time: number,
    questions: QuizCreateQuestionsModel[]
}

export interface CreateQuizResponse {
    id: number,
    technology: string,
    title: string,
    questions: QuizCreateQuestionsModel[]
}

export interface QuizCreateQuestionsModel {
    type: string,
    questionName: string,
    correctAnswers: string[]
    incorrectAnswers: string[]
}

export interface QuizResolve {
    questionId: number,
    answers: string[]
}

export interface QuizResult {
    quizId: number,
    quizName: string,
    userFullName: string,
    correctAnswer: number,
    incorrectAnswer: number,
    isPassed: boolean,
    percentOfCorrectAnswers: number
}

export interface UserQuizView {
    id: number,
    technology: string,
    title: string
}

export interface CompanyQuizView {
    correctAnswer: number; 
    incorrectAnswer: number;
    isPassed: boolean;
    percentOfCorrectAnswers: number;
    quizId: number;
    quizName: string;
    userFullName: string;
}
