package com.example.tasker.service;

import com.example.tasker.model.Project;
import com.example.tasker.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found for id:" + id));
        if (projectDetails.getTitle() != null) {
            project.setTitle(projectDetails.getTitle());
        } 
        if (projectDetails.getDescription() != null) {
            project.setDescription(projectDetails.getDescription());
        }
        if (projectDetails.getDueDate() != null) {
            project.setDueDate(projectDetails.getDueDate());
        }
            project.setIsPinned(projectDetails.getIsPinned());
            project.setIsClosed(projectDetails.getIsClosed());

        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    
}
