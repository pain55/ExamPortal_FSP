package com.exam.service;

import java.util.Set;

import com.exam.model.Question;
import com.exam.model.Quiz;

public interface QuestionService {
	
	public Question addQuestion(Question question);
	
	public Question updateQuestion(Question question);
	
	public Set<Question> getAllQuestions();
	
	public Set<Question> getQuestionsByQuiz(Quiz quiz);
	
	public Set<Question> getAllQuestionsByQuiz(Quiz quiz);
	
	public Question getQuestion(Long questionId);
	
	public void deleteQuestionById(Long questionId);
}
