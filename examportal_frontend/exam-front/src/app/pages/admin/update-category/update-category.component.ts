import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {

  updateForm!: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogCategory: any,
    private categoryService: CategoryService,
    private snack:MatSnackBar
  ) {}

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
      categoryId : ["",Validators.required],
      categoryTitle : ["",Validators.required],
      categoryDescription : ["",Validators.required],

    })

    if(this.dialogCategory) {
      this.updateForm.controls['categoryId'].setValue(this.dialogCategory.category.categoryId);
      this.updateForm.controls['categoryTitle'].setValue(this.dialogCategory.category.categoryTitle);
      this.updateForm.controls['categoryDescription'].setValue(this.dialogCategory.category.categoryDescription);
    }

  }

  updateFormFunc() {

    this.categoryService.updateCategory(this.updateForm.value).subscribe({
      next:(value) => {
        // console.log("updated category ",value);
        Swal.fire("Category Updated Successfully","","success");
        this.updateForm.reset;
        this.dialogRef.close("updated");

      },
      error:(err)=> {
        this.snack.open(err.error.message,"X",{
          duration:3000
        });
      }
    });
  }

}
