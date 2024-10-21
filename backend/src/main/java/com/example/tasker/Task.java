package com.example.tasker.model;

import javax.persistence.*;

import java.lang.annotation.Inherited;
import java.util.Date;


@Entity
@Table(name = "tasks")
public class Task {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private String status;

    @Column(nullable = true)
    private Date dueDate;

    //Constructors
    public Task() {}

    public Task(String title, String description, String status, Date dueDate) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
    }

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

}
