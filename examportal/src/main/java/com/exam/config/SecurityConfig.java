package com.exam.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.exam.service.Implementation.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

//	@Bean
//	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
//	    return http.getSharedObject(AuthenticationManagerBuilder.class)
//	            .build();
//	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

//	@Override 
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(this.userDetailsServiceImpl).passwordEncoder(passwordEncoder());
//	}

	@Bean
	public DaoAuthenticationProvider authenticationnProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

		authProvider.setUserDetailsService(userDetailsServiceImpl);
		authProvider.setPasswordEncoder(passwordEncoder());
		System.out.println("dao   "+authProvider);
		return authProvider;
	}

//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		
//		http
//			.csrf()
//			.disable()
//			.cors()
//			.disable()
//			.authorizeRequests()
//			.antMatchers("/generate-token",'/user/').permitAll()
//			.antMatchers(HttpMethod.OPTIONS).permitAll()
//			.anyRequest().authenticated()
//			.and()
//			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
//			.and()
//			.sessionManagement().sessionAuthenticationErrorUrl(SessionCreationPolicy.STATELESS);
//		
//		
//		
//		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//		
//	}

	
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		http.cors().disable().csrf().disable()
//				.authorizeHttpRequests().requestMatchers("/generate-token").permitAll()
//				.and().authorizeHttpRequests().requestMatchers("/user/").permitAll().anyRequest().authenticated().and()
//				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//				
//
//		http.authenticationProvider(authenticationnProvider());
//
//		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
//		return http.build();
//	}
	
	
	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .cors()
                .disable()
                .authorizeHttpRequests().requestMatchers("/generate-token", "/user/").permitAll()
                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
	
	
	 @Bean
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**")
	                        .allowedMethods("*");
	            }
	        };
	 }

}
