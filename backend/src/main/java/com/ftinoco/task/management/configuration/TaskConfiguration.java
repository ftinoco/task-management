package com.ftinoco.task.management.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ftinoco.task.management.services.TaskService;

@Configuration
public class TaskConfiguration {

    @Bean
    TaskService taskBean() {
		return new TaskService();
	}

    @Bean
    ModelMapper modelMapperBean() {
        return new ModelMapper();
	} 
}