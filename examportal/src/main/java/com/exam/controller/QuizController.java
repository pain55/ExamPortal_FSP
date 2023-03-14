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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.Quiz;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/quiz")
@CrossOrigin
public class QuizController {
	
	@Autowired
	private QuizService quizService;
	
	@PostMapping("/")
	public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz) {
	
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateQuiz(@RequestBody Quiz quiz) {
		return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
	}
	
	@GetMapping("/")
	public Set<Quiz> getAllQuizzes() {
		return new LinkedHashSet<>(this.quizService.getQuizzes());
	}
	
	@GetMapping("/{quizId}")
	public Quiz getQuiz(@PathVariable long quizId) {
		return this.quizService.getQuiz(quizId);
	}
	
	
	@DeleteMapping("/{quizId}")
	public void deleteQuiz(@PathVariable long quizId) {
		this.quizService.deleteQuizById(quizId);
	}
	
}
