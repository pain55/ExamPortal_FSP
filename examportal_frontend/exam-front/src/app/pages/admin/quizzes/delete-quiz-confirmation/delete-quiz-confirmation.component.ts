import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-delete-quiz-confirmation',
  templateUrl: './delete-quiz-confirmation.component.html',
  styles: [],
})
export class DeleteQuizConfirmationComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteQuizConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {}

  ngOnInit(): void {}

// Simple Confirmation Component to confirm if the user wants to delete quiz or not.
  confirmFunc(){
    this.dialogRef.close(true);
  }



}
