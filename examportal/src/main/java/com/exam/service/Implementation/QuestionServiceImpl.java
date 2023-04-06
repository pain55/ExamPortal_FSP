package com.exam.service.Implementation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.Question;
import com.exam.model.Quiz;
import com.exam.repository.QuestionRepository;
import com.exam.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository questionRepository;
	
	
	
	@Override
	public Question addQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepository.save(question);
		
	}

	@Override
	public Set<Question> getAllQuestions() {
		return new HashSet<>(this.questionRepository.findAll());
	}

	@Override
	public Question getQuestion(Long questionId) {
		return this.questionRepository.findById(questionId).get();
	}
	
	@Override
	public Set<Question> getQuestionsByQuiz(Quiz quiz) {
		
		Set<Question> questions = quiz.getQuestions();
		
		List<Question> list = new ArrayList<>(questions);
		
		if(list.size() > quiz.getTotalNumberOfQuestions()) {
			list = list.subList(0, ((int)quiz.getTotalNumberOfQuestions()));
		}
		Collections.shuffle(list);
		return new HashSet<>(list);
	}

	@Override
	public Set<Question> getAllQuestionsByQuiz(Quiz quiz) {
		return quiz.getQuestions();
	}
	
	@Override
	public void deleteQuestionById(Long questionId) {
		this.questionRepository.deleteById(questionId);
	}



	
	
	
}
