import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { map, retry } from 'rxjs';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  addQuestion(question: Question) {
    return this.http.post(`${baseUrl}/question/`, question);
  }

  // We are trying to retrive questions for two times if failed
  // and then throw error
  // This method is only for user module

  getAllQuestionsByQuiz(quizId: number) {
    return this.http
    .get<Question[]>(`${baseUrl}/question/quiz/${quizId}`)
    .pipe(retry(2));
  }

  // We are trying to retrive questions for three times if failed
  // and then throw error
  // This method is only for admin module

  getAllQuestionsAdminByQuiz(quizId: number) {
    return this.http
      .get<Question[]>(`${baseUrl}/question/quiz/all/${quizId}`)
      .pipe(retry(3));
  }

  updateQuestion(question: Question) {
    return this.http.post(`${baseUrl}/question/`, question);
  }

  deleteQuestion(quizId: number) {
    return this.http.delete(`${baseUrl}/question/${quizId}`);
  }
}
