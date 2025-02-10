package com.example.tasker.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "projects")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;


    //Constructors
    public Project() {}

    public Project(String title, String description, List<Task> tasks) {
        this.title = title;
        this.description = description;
        this.tasks = tasks;
    }

    //Getters and Setters

    public Long getId() {return id;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    
    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}

    public LocalDateTime getUpdatedAt() {return updatedAt;}
    public void setUpdatedAt(LocalDateTime updatedAt) {this.updatedAt = updatedAt;}

    public List<Task> getTasks() {return tasks;}


    //Pre persist will automatically set created at and updated at before the record is saved
    @PrePersist
    protected void OnCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now(); // Just to give an initial set up to updated at
        }
    
    // PreUpdate updates the upedatedat time whenever the record is modified
    @PreUpdate
    protected void OnUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
