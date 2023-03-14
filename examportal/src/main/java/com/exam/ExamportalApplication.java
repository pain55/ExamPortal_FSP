package com.exam;



import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamportalApplication implements CommandLineRunner {
	
	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(ExamportalApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code");
		
//		Creating a User to check whether create User func works and data is persistent in the DB
		
		
//		User user = new User("sai",new BCryptPasswordEncoder().encode("minato"),"Sai","Kiran","sai@gmail.com","2345677213",true);
//		
//		Role role = new Role();
//		role.setRoleId(5L);
//		role.setRoleName("ROLE_ADMIN");
//		
//		UserRole userRole = new UserRole();
//		userRole.setRole(role);
//		userRole.setUser(user);
//		
//		Set<UserRole> userRoleSet = new HashSet<>();
//		
//		userRoleSet.add(userRole);
//	
//		userService.createUser(user, userRoleSet);
//		
		
	}

}
