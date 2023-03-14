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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Quiz {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long quizId;
	
	private String quizTitle;
	@Column(length = 2000)
	private String quizDescription;
	private long maxMarks;
	private long totalNumberOfQuestions;
	private boolean isActive = false;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "categoryId")
	private Category category;
	
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "quiz")
	@JsonIgnore
	private Set<Question> questions = new LinkedHashSet<>();
	
	
	public Quiz() {
		// TODO Auto-generated constructor stub
	}
	
	
	
	
	public Quiz(String quizTitle, String quizDescription, long maxMarks, long totalNumberOfQuestions, boolean isActive,
			Category category) {
		this.quizTitle = quizTitle;
		this.quizDescription = quizDescription;
		this.maxMarks = maxMarks;
		this.totalNumberOfQuestions = totalNumberOfQuestions;
		this.isActive = isActive;
		this.category = category;
	}




	public long getQuizId() {
		return quizId;
	}
	public void setQuizId(long quizId) {
		this.quizId = quizId;
	}
	public String getQuizTitle() {
		return quizTitle;
	}
	public void setQuizTitle(String quizTitle) {
		this.quizTitle = quizTitle;
	}
	public String getQuizDescription() {
		return quizDescription;
	}
	public void setQuizDescription(String quizDescription) {
		this.quizDescription = quizDescription;
	}
	public long getMaxMarks() {
		return maxMarks;
	}
	public void setMaxMarks(long maxMarks) {
		this.maxMarks = maxMarks;
	}
	public long getTotalNumberOfQuestions() {
		return totalNumberOfQuestions;
	}
	public void setTotalNumberOfQuestions(long totalNumberOfQuestions) {
		this.totalNumberOfQuestions = totalNumberOfQuestions;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}




	public Category getCategory() {
		return category;
	}




	public void setCategory(Category category) {
		this.category = category;
	}




	public Set<Question> getQuestions() {
		return questions;
	}




	public void setQuestions(Set<Question> questions) {
		this.questions = questions;
	}
	
	
	
	
	
	
	
}
