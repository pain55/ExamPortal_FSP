import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  quizId:any;
  quizTitle:any;

  snackDuration:number=2500

  public questions:Question[]=[];

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _questionService:QuestionService,
    private _snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.quizId = this._activatedRoute.snapshot.params['quizId'];
    this.quizTitle = this._activatedRoute.snapshot.params['quizTitle'];

    this._questionService.getAllQuestionsAdminByQuiz(this.quizId).subscribe({
      next:(value) => {
        this.questions = value;
        console.log("Checking if Quesitons are getting retrived",this.questions);
      },
      error:(err) => {
        this._snack.open("Error retriving the questions, Try Later!!","ok",{
          duration:this.snackDuration
        })
      }
    })


  }

  deleteQuestion(question:Question) {
    this._questionService.deleteQuestion(question.questionId).subscribe({
      next:(value)=>{
        Swal.fire("Success","Question deleted successfully","success");
        this.ngOnInit();
      },
      error:(err)=>{
        this._snack.open("Unable to delete Question, Try Again later!!","ok",{
          duration: this.snackDuration
        })
      }
    })
  }



}
