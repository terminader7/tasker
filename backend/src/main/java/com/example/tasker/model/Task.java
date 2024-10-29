package com.example.tasker.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "tasks")
public class Task {

    public enum TaskStatus {
        TODO,
        IN_PROGRESS,
        DONE
    }
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @Column(nullable = true)
    private LocalDateTime dueDate;

    //Constructors
    public Task() {}

    public Task(String title, String description, TaskStatus status , LocalDateTime dueDate) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
    }

    // GETTERS AND SETTERS

    public Long getId() {return id;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TaskStatus getStatus() { return status; }
    public void setStatus(TaskStatus status) { this.status = status; }

    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }

}
