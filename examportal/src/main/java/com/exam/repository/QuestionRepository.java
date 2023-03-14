package com.exam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.Question;
import com.exam.model.Quiz;

public interface QuestionRepository extends JpaRepository<Question, Long>{
	public List<Question> findAllByQuiz(Quiz quiz);
}
