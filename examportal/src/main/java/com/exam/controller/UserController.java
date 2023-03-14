package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.exceptions.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

	
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		
//		Encoding password with BcryptPasswordEncoder 
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		

//		We are setting all user roles as Normal who create Account
//		if we want later we will include more roles to create users

		Role role = new Role(7, "ROLE_USER");

		Set<UserRole> userRoles = new HashSet<>();

		UserRole userRole = new UserRole(user, role);
		userRoles.add(userRole);

		return this.userService.createUser(user, userRoles);
	}

	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return this.userService.getUser(username);

	}

	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") Long userId) {
		this.userService.deleteUser(userId);
	}
	
	
	@PutMapping("/{userId}")
	public User updateUser(@PathVariable("userId") Long userId,@RequestBody User newUserDetails) {
		return this.userService.updateUser(userId,newUserDetails);
	}
	
	
	@ExceptionHandler(UserFoundException.class) 
	public ResponseEntity<?> exceptionHandler(UserFoundException ex) {
		 return new ResponseEntity<>("Username already exist in DB!! Try with another Username", HttpStatus.FOUND);
	}
}
