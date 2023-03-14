package com.exam.controller;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.Question;
import com.exam.model.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@CrossOrigin
@RequestMapping("/question")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	
	@Autowired 
	private QuizService quizService;
	

	@PostMapping("/")
	public ResponseEntity<?> addQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}

	@PutMapping("/")
	public ResponseEntity<?> updateQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}

	@GetMapping("/")
	public Set<Question> getAllQuestions() {
		return new LinkedHashSet<>( this.questionService.getAllQuestions());
	
	}

	@GetMapping("/{questionId}")
	public Question getQuestion(@PathVariable Long questionId) {
		return this.questionService.getQuestion(questionId);
	}
	
	@GetMapping("/quiz/{quizId}")
	public Set<Question> getAllQuestionsByQuiz(@PathVariable Long quizId) {
		Quiz quiz = this.quizService.getQuiz(quizId);
		return this.questionService.getQuestionsByQuiz(quiz);
	}
	

	@DeleteMapping("/{questionId}")
	public void deleteQuestion(@PathVariable long questionId) {
		this.questionService.deleteQuestionById(questionId);
	}

}
