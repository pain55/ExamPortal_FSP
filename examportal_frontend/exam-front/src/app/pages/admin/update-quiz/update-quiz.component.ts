import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  updateForm !: FormGroup;

  toggle:boolean = true;

  constructor(
    private updateFormBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateQuizComponent> ,
    @Inject(MAT_DIALOG_DATA) public quizData:any,
    private quizService:QuizService,
    private _snack:MatSnackBar
    ) {

      console.log("Update Quiz Data ", quizData);
    }

  ngOnInit(): void {

    this.updateForm = this.updateFormBuilder.group({
      "quizId":["",Validators.required],
      "quizTitle":["",Validators.required],
      "quizDescription":["",Validators.required],
      "maxMarks":["",Validators.required],
      "totalNumberOfQuestions":["",Validators.required],
      "active":["",Validators.required],
      "category": this.updateFormBuilder.group({
        "categoryId":["",Validators.required]
      })
    })


    if(this.updateForm) {
      this.updateForm.controls["quizId"].setValue(this.quizData.quizId);
      this.updateForm.controls["quizTitle"].setValue(this.quizData.quizTitle);
      this.updateForm.controls["quizDescription"].setValue(this.quizData.quizDescription);
      this.updateForm.controls["maxMarks"].setValue(this.quizData.maxMarks);
      this.updateForm.controls["totalNumberOfQuestions"].setValue(this.quizData.totalNumberOfQuestions);
      this.updateForm.get(['category','categoryId'])?.setValue(this.quizData.category.categoryId);

      this.toggle = this.quizData.active;
    }

  }


  updateQuizFormSubmit() {
    this.quizService.updateQuiz(this.updateForm.value).subscribe({
      next:(value)=> {
        console.log(value);
        Swal.fire("Quiz Updated Successfully","",'success');
          this.updateForm.reset;
          this.dialogRef.close("Quiz Updated");
      },
      error:(err) => {
        console.log(err);
      }
    })
  }



}
