package com.ftinoco.task.management.entities;

import java.util.Date;

import jakarta.persistence.*; 
 
@Entity
@Table(name = "task")
public class Task {
	
	@Id
	@SequenceGenerator(name="task_generator", sequenceName = "seq_task_id", allocationSize = 1 )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_generator")
	private int id;

	private String title;
	
	private String description;

    @Column(name = "due_date")
	private Date dueDate;
    
    @Enumerated(EnumType.STRING)
	private Status status;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
}
