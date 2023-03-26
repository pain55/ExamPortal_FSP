import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';
import { DeleteQuizConfirmationComponent } from './delete-quiz-confirmation/delete-quiz-confirmation.component';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css'],
})
export class QuizzesComponent implements OnInit {
  quizzes: any = [];

  constructor(
    private quizService: QuizService,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {}

// Once the view gets instianted we are getting all the quizzes from the database and displaying it.
// if any error occurs we get a error message using snackBar.

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe({
      next: (value: any) => {
        this.quizzes = value;
      },
      error: (err) => {
        console.log(err);
        this.snack.open('Something went wrong, Try Again later', 'ok', {
          duration: 3000,
        });
      },
    });
  }

  // Opening dialog to add a new Quiz

  openAddDialog() {
    const addDialogRef = this.dialog.open(AddQuizComponent);

    addDialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log('dialog result :' + result);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

// dialog to update Quiz and persist it in DB also.

  openUpdateDialog(quiz: Quiz) {
    const updateDialogRef = this.dialog.open(UpdateQuizComponent, {
      data: quiz,
    });

    updateDialogRef.afterClosed().subscribe({
      next: (res) => {
        console.log('Update Dialog ref ' + res);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


// Use to Activate / Disactive a specific Quiz using slide-toggle-button

  activate(quiz: any) {
    quiz.active = !quiz.active;

    this.quizService.updateQuiz(quiz).subscribe({
      next: (value) => {
        console.log('quiz got updated successfully', value);
        // this.ngOnInit();
      },
      error: (err) => {
        this.snack.open('Something went wrong!! Quiz not updated', 'ok');
      },
    });
  }

  deleteQuiz(quizId: number) {
    // console.log("Deleting quiz of id:",quizId);

    // Displaying Confirmatin Dialog to user whether user wants to delete quiz or not.

    const deleteDialogRef = this.dialog.open(DeleteQuizConfirmationComponent, {
      width: '20rem',
      data: { quizId },
    });

    deleteDialogRef.afterClosed().subscribe({
      next: (value) => {
        // if the user clicks on confirm button we get a value==true and then we perform delete operation
        // else we don't do anything
        // console.log(value);


        if (value) {
          this.quizService.deleteQuizById(quizId).subscribe({
            next: () => {
              this.ngOnInit();
            },
          });

        }
      },
    });
  }
}
