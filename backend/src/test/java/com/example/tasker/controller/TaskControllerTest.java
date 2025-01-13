import com.example.tasker.model.Task;
import com.example.tasker.model.TaskStatus;
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
    private Long projectId; // Add a field for projectId

    @BeforeEach
    public void setup() throws Exception {
        // Assuming you have a project setup before creating tasks
        // For simplicity, let's assume projectId is set or you can create a new project in the setup
        projectId = 1L; // Replace with a valid projectId from your system if necessary

        Task task = new Task("Sample Task", "Task description", TaskStatus.TODO, LocalDateTime.now());
        String response = mockMvc.perform(post("/api/projects/" + projectId + "/tasks") // Pass projectId in the path
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isCreated()) // Expecting CREATED status
                .andReturn().getResponse().getContentAsString();

        createdTaskId = objectMapper.readTree(response).get("id").asLong();
    }

    @Test
    public void testCreateTask() throws Exception {
        Task task = new Task("New Task", "This is a new task", TaskStatus.TODO, LocalDateTime.now());

        mockMvc.perform(post("/api/projects/" + projectId + "/tasks") // Pass projectId in the path
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isCreated()) // Expecting CREATED status
                .andExpect(jsonPath("$.title").value("New Task"))
                .andExpect(jsonPath("$.description").value("This is a new task"))
                .andExpect(jsonPath("$.status").value("TODO"));
    }

    @Test
    public void testGetAllTasks() throws Exception {
        mockMvc.perform(get("/api/projects/" + projectId + "/tasks")) // Pass projectId in the path
                .andExpect(status().isOk()) // Expecting OK status
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetTaskById() throws Exception {
        mockMvc.perform(get("/api/projects/" + projectId + "/tasks/" + createdTaskId)) // Pass projectId and taskId in the path
                .andExpect(status().isOk()) // Expecting OK status
                .andExpect(jsonPath("$.id").value(createdTaskId));
    }

    @Test
    public void testUpdateTask() throws Exception {
        Task updatedTask = new Task("Updated Task", "Updated description", TaskStatus.IN_PROGRESS, LocalDateTime.now());

        mockMvc.perform(put("/api/projects/" + projectId + "/tasks/" + createdTaskId) // Pass projectId and taskId in the path
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedTask)))
                .andExpect(status().isOk()) // Expecting OK status
                .andExpect(jsonPath("$.title").value("Updated Task"))
                .andExpect(jsonPath("$.description").value("Updated description"))
                .andExpect(jsonPath("$.status").value("IN_PROGRESS"));
    }

    @Test
    public void testDeleteTask() throws Exception {
        mockMvc.perform(delete("/api/projects/" + projectId + "/tasks/" + createdTaskId)) // Pass projectId and taskId in the path
                .andExpect(status().isNoContent()); // Expecting NO_CONTENT status
    }
}