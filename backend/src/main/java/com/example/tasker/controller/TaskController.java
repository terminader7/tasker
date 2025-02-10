package com.example.tasker.controller;

import com.example.tasker.model.Task;
import com.example.tasker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks") // The path at which these will be found
public class TaskController {
    
    @Autowired
    private TaskService taskService;

    //Create a new task
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
       Task createdTask = taskService.createTask(task);
       return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    //Get all tasks
    @GetMapping
    public List<Task> getAllTasks(@RequestParam Optional<Long> projectId) {
        return taskService.getAllTasks(projectId);
    }

      // Get a task by id
    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long taskId) {
        Optional<Task> task = taskService.getTaskById(taskId);
        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   

    // Update a task
    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(taskId, taskDetails);
        if (updatedTask != null) {
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a task
    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }


    }
