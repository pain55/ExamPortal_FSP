package com.exam.exceptions;

public class UserNotFoundException extends Exception{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserNotFoundException() {
		super("User with this username doesn't exist in DB!! Try another username");
	}
	
	public UserNotFoundException(String msg) {
		super(msg);
	}

}
