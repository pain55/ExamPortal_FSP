package com.exam.service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = this.userService.getUser(username);
		
		if(user==null)
		{
			System.out.println("User not found!");
			throw new UsernameNotFoundException(username);
		}
		
		return (UserDetails)user;
	}

}
