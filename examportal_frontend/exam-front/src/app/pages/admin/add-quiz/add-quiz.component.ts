import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  addQuizForm!: FormGroup;

  categories:Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddQuizComponent>,
    private quizService:QuizService,
    private categoryService:CategoryService
  ) {}

  ngOnInit(): void {
    this.addQuizForm = this.formBuilder.group({
      quizTitle: ['', Validators.required],
      quizDescription: ['', Validators.required],
      maxMarks: ['', Validators.required],
      totalNumberOfQuestions: ['', Validators.required],
      active: ['',Validators.required],
      category: this.formBuilder.group({
        categoryId:['',Validators.required],
      })
    });


    this.categoryService.getCategories().subscribe({
      next:(value:any)=> {
        console.log(value);
        this.categories = value;
      },
      error:(err)=> {
        console.log(err);
      }
    })

  }

  addQuiz() {
      // console.log(this.addQuizForm.value);
      this.quizService.addQuiz(this.addQuizForm.value).subscribe({
        next:(value)=> {
          console.log(value);
          Swal.fire("Quiz Added Successfully","",'success');
          this.addQuizForm.reset;
          this.dialogRef.close("Quiz Added");
        },
        error:(err)=> {
          console.log(err);
        }
      })
  }
}
