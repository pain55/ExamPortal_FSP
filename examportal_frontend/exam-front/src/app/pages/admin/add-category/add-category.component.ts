import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category = {} as Category;

  constructor(
    private _categoryService: CategoryService,
    private _snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addCategoryForm() {
    console.log(this.category);

    this._categoryService.addCategory(this.category).subscribe({
      next: (value) => {
        console.log(value);
        Swal.fire('Successfully Created', 'New Category Added', 'success');

        // waiting 3s and then redirecting to categories component.
        setTimeout(() => {
          this.router.navigate(['/admin-dashboard/categories']);
        }, 3000);
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Something went wrong ', 'Try Again Later', 'error');
      },
    });
  }
}
