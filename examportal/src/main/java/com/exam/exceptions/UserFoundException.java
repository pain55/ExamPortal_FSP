package com.exam.exceptions;

public class UserFoundException extends Exception{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserFoundException() {
		super("User with this username already exist in DB!! Try another username");
	}
	
	public UserFoundException(String msg) {
		super(msg);
	}

}
