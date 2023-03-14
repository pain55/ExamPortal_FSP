package com.exam.service.Implementation;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.exceptions.UserFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;
	
	

//	Creating a User 
	@Override
	public User createUser(User user, Set<UserRole> userRoles)  throws Exception {

//		Checking whether user already exist in db
		User localUser = this.userRepository.findByUsername(user.getUsername());
		if (localUser != null) {
			System.out.println("User already Exist");	
			throw new UserFoundException();
			
		} else {
//			If User doesn't exist then we are creating a new User
//			First we are taking roles from each userRole and adding it Role Entity
			for (UserRole urs : userRoles)
				roleRepository.save(urs.getRole());

//			Adding all userRoles to user
			user.getUserRoles().addAll(userRoles);

//			Now Saving the user
			localUser = userRepository.save(user);

		}
		return localUser;

	}

	@Override
	public User getUser(String username) {
//		finding user by username
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long userId) {
//		deleting user by userID
		this.userRepository.deleteById(userId);
	}

	@Override
	public User updateUser(Long userId, User newUserDetails) {
		User user = userRepository.findById(userId)
				.orElseThrow();
		if(user==null) {
			try {
				throw new Exception("User doesn't Exist!");
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}
		else {
			user.setFirstName(newUserDetails.getFirstName());
			user.setLastName(newUserDetails.getLastName());
			userRepository.save(user);
		}
		
		return user;
	}

}
