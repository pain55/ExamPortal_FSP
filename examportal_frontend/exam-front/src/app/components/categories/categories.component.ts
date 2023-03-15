import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/model/category';
import { UpdateCategoryComponent } from 'src/app/pages/admin/update-category/update-category.component';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private _dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  categories: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        console.log('checking whether we are getting data from api' + data);
        this.categories = data;
        console.log(
          'Checking whether the data is copied into categories list' +
            this.categories
        );
      },
      error: (error) => {
        this.snack.open('Failed to load categories. Try again Later', 'X', {
          duration: 3000,
        });
      },
    });
  }

  selected(categoryId: number) {
    console.log('clicked' + categoryId);
  }

  updateDialog(category: Category) {
    console.log(category);
    const dialogRef = this._dialog.open(UpdateCategoryComponent, {
      data: {
        category,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') this.ngOnInit();
    });
  }

  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: (value) => {
        Swal.fire('Successfully Deleted', '', 'success');
        this.ngOnInit();
      },
      error: (err) => {
        this.snack.open('Error occured deleting categories', 'X', {
          duration: 3000,
        });
      },
    });
  }
}
