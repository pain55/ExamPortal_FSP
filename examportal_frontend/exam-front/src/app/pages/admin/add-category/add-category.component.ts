import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {} as Category;

  constructor(private _categoryService : CategoryService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  addCategoryForm() {
    console.log(this.category);

    this._categoryService.addCategory(this.category).subscribe({
      next(value) {
        console.log(value);
        Swal.fire("Successfully Created","New Category Added","success");
      },
      error(err) {
        
      },
    }
    )

  }

}
