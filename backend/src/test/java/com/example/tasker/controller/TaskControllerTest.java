package com.example.tasker.controller;

import com.example.tasker.model.Task;
import com.example.tasker.model.Task.TaskStatus;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerTest {
  @Autowired 
  private MockMvc mockMvc;

  @Autowired
   private ObjectMapper objectMapper;

   private Long createdTaskId;

  @BeforeEach
  public void setup() throws Exception {
    Task task = new Task("Sample Task", "Task description", TaskStatus.TODO, LocalDateTime.now());
    String response = mockMvc.perform(post("/api/tasks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(task)))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

    createdTaskId = objectMapper.readTree(response).get("id").asLong();
}

   @Test
   public void testCreateTask() throws Exception {
    Task task = new Task("New Task", "This is a new task", TaskStatus.TODO, LocalDateTime.now());

    mockMvc.perform(post("/api/tasks", createdTaskId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Task"))
                .andExpect(jsonPath("$.description").value("This is a new task"))
                .andExpect(jsonPath("$.status").value("TODO"));
   }

   @Test
   public void testGetAllTasks() throws Exception {
    mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
   }

   @Test
   public void testGetTaskById() throws Exception {
    mockMvc.perform(get("/api/tasks/{id}", createdTaskId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(createdTaskId));
   }

   @Test 
   public void testUpdateTask() throws Exception {
    Task updatedTask = new Task("Updated Task", "Updated description", TaskStatus.IN_PROGRESS, LocalDateTime.now().plusDays(1));

    mockMvc.perform(put("/api/tasks/{id}", createdTaskId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedTask)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Task"))
                .andExpect(jsonPath("$.status").value("IN_PROGRESS"));
   }

    @Test
    public void testDeleteTask() throws Exception {
        mockMvc.perform(delete("/api/tasks/{id}", createdTaskId))
                .andExpect(status().isOk());
    }
}
