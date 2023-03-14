package com.exam.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.exam.service.Implementation.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		
		final String requestTokenHeader = request.getHeader("Authorization");
		
		System.out.println("this is header ->"+requestTokenHeader);
		
		String username=null;
		String jwtToken = null;
		
		
		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer "))  {
//			true condition
			
			try {
				jwtToken = requestTokenHeader.substring(7);
				
				username = this.jwtUtil.extractUsername(jwtToken);
				
			}
			catch(ExpiredJwtException e) {
				System.out.println("Jwt token as expired");
				
			}
			catch(Exception e) {
				e.printStackTrace();
				System.out.println("exception");
			}
		}
		else {
			System.out.println("invalid token, not start with bearer string");
		}
		
		
		
//		validated
		
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
		{
			final UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(username);
			
			if(this.jwtUtil.validateToken(jwtToken, userDetails)) {
//				token is valid
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			
				
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		else {
			System.out.println("Invalid Token");
		}
		
		
		filterChain.doFilter(request, response);
		
	}
	
	
	
}
