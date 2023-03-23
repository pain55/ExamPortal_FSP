import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import baseUrl from './helper';
import { Quiz } from '../model/quiz';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }


  addQuiz(quiz:Quiz) {
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  updateQuiz(quiz:Quiz) {
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  getQuizzes() {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  getQuizById(quizId:number) {
    return this.http.get(`${baseUrl}/quiz/${quizId}`);
  }

  deleteQuizById(quizId:number) {
    return this.http.delete(`${baseUrl}/quiz/${quizId}`);
  }

}
