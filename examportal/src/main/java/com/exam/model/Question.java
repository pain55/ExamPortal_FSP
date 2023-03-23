package com.exam.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long questionId;
	@Column(length = 1200)
	private String questionContent;
	
	@Column(length = 1200)
	private String questionImage;
	@Column(length = 1200)
	private String option1;
	@Column(length = 1200)
	private String option2;
	@Column(length = 1200)
	private String option3;
	@Column(length = 1200)
	private String option4;
	
	@Column(length = 1200)
	private String answer;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "quizId")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Quiz quiz;

	
	
	
	
	public Question() {
	}





	public Question(String questionContent, String questionImage, String option1, String option2, String option3,
			String option4, String answer) {
		this.questionContent = questionContent;
		this.questionImage = questionImage;
		this.option1 = option1;
		this.option2 = option2;
		this.option3 = option3;
		this.option4 = option4;
		this.answer = answer;
	}





	public long getQuestionId() {
		return questionId;
	}





	public void setQuestionId(long questionId) {
		this.questionId = questionId;
	}





	public String getQuestionContent() {
		return questionContent;
	}





	public void setQuestionContent(String questionContent) {
		this.questionContent = questionContent;
	}





	public String getQuestionImage() {
		return questionImage;
	}





	public void setQuestionImage(String questionImage) {
		this.questionImage = questionImage;
	}





	public String getOption1() {
		return option1;
	}





	public void setOption1(String option1) {
		this.option1 = option1;
	}





	public String getOption2() {
		return option2;
	}





	public void setOption2(String option2) {
		this.option2 = option2;
	}





	public String getOption3() {
		return option3;
	}





	public void setOption3(String option3) {
		this.option3 = option3;
	}





	public String getOption4() {
		return option4;
	}





	public void setOption4(String option4) {
		this.option4 = option4;
	}





	public String getAnswer() {
		return answer;
	}





	public void setAnswer(String answer) {
		this.answer = answer;
	}





	public Quiz getQuiz() {
		return quiz;
	}





	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}
	
	
	
	
	
}
