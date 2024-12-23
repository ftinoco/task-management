package com.ftinoco.task.management.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ftinoco.task.management.dtos.TaskDto;
import com.ftinoco.task.management.services.TaskService;

import jakarta.persistence.EntityNotFoundException;

@RestController
public class TaskController {

	@Autowired
	private TaskService service;

	Logger logger = LoggerFactory.getLogger(TaskController.class);

	@GetMapping("/task/{id}")
	private ResponseEntity<TaskDto> getTask(@PathVariable int id) {
		try {
			TaskDto dto = service.getTaskById(id);
			return ResponseEntity.status(HttpStatus.OK).body(dto);
		} catch (Exception e) {
			logger.error("Something went wrong!", e);
			if (e instanceof EntityNotFoundException) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}
		}
	}

	@GetMapping("/task")
	private ResponseEntity<Iterable<TaskDto>> getTask() {
		try {
			Iterable<TaskDto> tasks = service.getAllTasks();
			return ResponseEntity.status(HttpStatus.OK).body(tasks);
		} catch (Exception e) {
			logger.error("Something went wrong!", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/task")
	private ResponseEntity<TaskDto> createTask(@RequestBody TaskDto dto) {
		try {
			var task = service.addTask(dto);
			return ResponseEntity.status(HttpStatus.OK).body(task);
		} catch (Exception e) {
			logger.error("Something went wrong!", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/task")
	private ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto dto) {
		try {
			var task = service.updateTask(dto);
			return ResponseEntity.status(HttpStatus.OK).body(task);
		} catch (Exception e) {
			logger.error("Something went wrong!", e);
			if (e instanceof EntityNotFoundException) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}
		}
	}

	@DeleteMapping("/task/{id}")
	public ResponseEntity<Void> deleteTask(@PathVariable int id) {
		try {
			service.deleteTask(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			logger.error("Something went wrong!", e);
			if (e instanceof EntityNotFoundException) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		}
	}
}