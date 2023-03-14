package com.exam.model;

import java.util.LinkedHashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long categoryId;
	
	private String categoryTitle;
	@Column(length = 2000)
	private String categoryDescription;
	
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "category")
	@JsonIgnore
	private Set<Quiz> quizzes = new LinkedHashSet<Quiz>();
	
	

	public Category() {
		// TODO Auto-generated constructor stub
	}



	public Category(String categoryTitle, String categoryDescription) {
		this.categoryTitle = categoryTitle;
		this.categoryDescription = categoryDescription;
	}
	
	
	
	public long getCategoryId() {
		return categoryId;
	}


	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}


	public String getCategoryTitle() {
		return categoryTitle;
	}
	public void setCategoryTitle(String categoryTitle) {
		this.categoryTitle = categoryTitle;
	}
	public String getCategoryDescription() {
		return categoryDescription;
	}
	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}



	public Set<Quiz> getQuizzes() {
		return quizzes;
	}



	public void setQuizzes(Set<Quiz> quizzes) {
		this.quizzes = quizzes;
	}
	
	
	
	
	
	
	
	
}
