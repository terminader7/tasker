package com.example.tasker.service;

import com.example.tasker.model.Task;
import com.example.tasker.model.Project;
import com.example.tasker.repository.ProjectRepository;
import com.example.tasker.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Task createTask(Task task, Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found for id: " + projectId));

        task.setProject(project);

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(Long taskId, Task taskDetails, Long projectId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found for id: " + taskId));
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found for id: " + projectId));
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setDueDate(taskDetails.getDueDate());
        task.setProject(project);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

}
