import { Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { resolve } from 'dns';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {



  quizzes:any = [];

  quizStatus = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(this.quizzes);
    },2000)
  })

  constructor(private quizService:QuizService, private snack:MatSnackBar, public dialog:MatDialog) { }

  ngOnInit(): void {

    this.quizService.getQuizzes().subscribe({
      next:(value:any)=> {
        this.quizzes = value;
        console.log(this.quizzes[0].isActive);

      },
      error:(err)=> {
        console.log(err);
        this.snack.open("Something went wrong, Try Again later","ok",{
          duration:3000
        })
      },
    })

  }


  openUpdateDialog(quiz:Quiz) {
    const updateDialogRef = this.dialog.open(UpdateQuizComponent,{
      data: quiz
    });

    updateDialogRef.afterClosed().subscribe({
      next:(res) => {
        console.log("Update Dialog ref "+ res);
        this.ngOnInit();
      },
      error:(err)=> {
        console.log(err);
      }
    })
  }


  openAddDialog() {
    const addDialogRef = this.dialog.open(AddQuizComponent);

    addDialogRef.afterClosed().subscribe({
      next:(result)=> {
        console.log("dialog result :"+  result);
        this.ngOnInit();
      },
      error:(err)=> {
        console.log(err);
      }

    })
  }

  deleteQuiz(quizId:number){
    console.log(quizId);
    this.quizService.deleteQuizById(quizId).subscribe({
      next:()=>{
        this.ngOnInit();

      }
    });
  }

}
