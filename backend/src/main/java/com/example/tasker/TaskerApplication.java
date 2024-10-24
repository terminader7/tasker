package com.example.tasker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.example.tasker.model")
public class TaskerApplication { 
    public static void main(String[] args) {
        SpringApplication.run(TaskerApplication.class, args);
    }
}
