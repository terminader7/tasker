package com.example.tasker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.tasker.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
