package com.example.tasker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.tasker.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}

