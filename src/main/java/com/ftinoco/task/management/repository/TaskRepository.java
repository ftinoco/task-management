package com.ftinoco.task.management.repository;

import com.ftinoco.task.management.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {

} 