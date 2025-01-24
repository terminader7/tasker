package com.example.tasker.controller;

import com.example.tasker.model.Project;
import com.example.tasker.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    //Get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    //Get all 

    //Get a project by id
    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long proejctId) {
        Optional<Project> project = projectService.getProjectById(proejctId);
        if (project.isPresent()) {
            return ResponseEntity.ok(project.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Update a project
    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable Long projectId, @RequestBody Project projectDetails){
        Project updatedProject = projectService.updateProject(projectId, projectDetails);
        if (updatedProject != null) {
            return ResponseEntity.ok(updatedProject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Delete a project
    @DeleteMapping("/{projectId}")
    public ResponseEntity<Project> deleteProject(@PathVariable Long projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
    

    
    
}
