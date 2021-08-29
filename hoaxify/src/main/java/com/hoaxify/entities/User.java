package com.hoaxify.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


import lombok.Data;

@Data
@Entity
public class User {
		
	@Id
	@GeneratedValue
	private long id; 
	
	// max letters is 255 because in database userName will have varchar(255) size. 
	@NotNull
	@Size(min = 4, max = 255)
	private String userName;
	
	@NotNull
	@Size(min = 4, max = 255)
	private String displayName;
	
	@NotNull
	@Size(min = 8, max = 255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
	private String password; 
	
}
