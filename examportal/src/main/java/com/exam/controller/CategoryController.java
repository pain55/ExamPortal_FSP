package com.exam.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.Category;
import com.exam.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/")
	public ResponseEntity<?> addCategory(@RequestBody Category category) {
		if(category == null) {
			return null;
		}
		
		return ResponseEntity.ok( this.categoryService.addCategory(category) );
	}
	
	
	@PutMapping("/")
	public ResponseEntity<?> updateCateory(@RequestBody Category category) {
		if(category == null)
			return null;
		return ResponseEntity.ok(this.categoryService.updateCategory(category));
	}
	
	
	@GetMapping("/{categoryId}")
	public Category getCategory(@PathVariable Long categoryId) {
		return this.categoryService.getCategory(categoryId);
	}
	
	@GetMapping("/")
	public Set<Category> getCategory() {
		return this.categoryService.getCategories();
	}
	
	
	@DeleteMapping("/{categoryId}")
	public void deleteCategory(@PathVariable Long categoryId) {
		this.categoryService.deleteCategory(categoryId);
	}
}
