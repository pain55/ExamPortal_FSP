import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient ) { }

  public getCategories() {
    return this.http.get(`${baseUrl}/category/`);
  }

  public addCategory(category:Category) {
    return this.http.post(`${baseUrl}/category/`,category);
  }


  public deleteCategory(categoryId:number) {
   return this.http.delete(`${baseUrl}/category/${categoryId}`);
  }
}

