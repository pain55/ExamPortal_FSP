package com.exam.service;

import java.util.Set;

import com.exam.model.Category;

public interface CategoryService{
	
	public Category addCategory(Category category);
	
	public Category updateCategory(Category category);
	
	public Category getCategory(Long categoryId);
	
	public Set<Category> getCategories();
	
	public void deleteCategory(Long categoryId);
	
}
