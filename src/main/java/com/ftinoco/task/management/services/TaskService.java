package com.ftinoco.task.management.services;

import java.util.List; 
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper; 
import org.springframework.beans.factory.annotation.Autowired;

import com.ftinoco.task.management.dtos.TaskDto;
import com.ftinoco.task.management.entities.Task;
import com.ftinoco.task.management.repository.TaskRepository;

import jakarta.persistence.EntityNotFoundException;

public class TaskService {

	@Autowired
	private TaskRepository repository;

	@Autowired
	private ModelMapper mapper;
 
	public TaskDto getTaskById(int id) {
		Task taskEntity = repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(String.format("Task not found with id: %d", id)));
		TaskDto dto = mapper.map(taskEntity, TaskDto.class);
		return dto;
	}

	public TaskDto addTask(TaskDto task) {
		Task taskEntity = new Task();
		taskEntity.setDescription(task.getDescription());
		taskEntity.setTitle(task.getTitle());
		taskEntity.setDueDate(task.getDueDate());
		taskEntity.setStatus(task.getStatus());

		Task newTask = repository.save(taskEntity);

		return mapper.map(newTask, TaskDto.class);
	}

	public Iterable<TaskDto> getAllTasks() {
		List<Task> tasks = repository.findAll();
		return tasks.stream().map(task -> mapper.map(task, TaskDto.class)).collect(Collectors.toList());
	}

	public TaskDto updateTask(TaskDto task) {
		Task taskEntity = repository.findById(task.getId()).orElseThrow(
				() -> new EntityNotFoundException(String.format("Task not found with id: %d", task.getId())));
		taskEntity.setDescription(task.getDescription());
		taskEntity.setTitle(task.getTitle());
		taskEntity.setDueDate(task.getDueDate());
		taskEntity.setStatus(task.getStatus());

		Task updatedEntity = repository.save(taskEntity);

		return mapper.map(updatedEntity, TaskDto.class);
	}

	public void deleteTask(int id) {
		Task taskEntity = repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(String.format("Task not found with id: %d", id)));
		repository.delete(taskEntity);
	}
}