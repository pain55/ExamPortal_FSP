import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categories:Category[] = [];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any) => {
        console.log(data);
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error.error);
      }

    );
  }

  selected(categoryId:number) {
    console.log("clicked"+categoryId)
  }

  deleteCategory(categoryId:number) {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    })
  }

}

