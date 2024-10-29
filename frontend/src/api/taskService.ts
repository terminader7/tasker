import axios from "axios";
import { Task } from "../types/task";

const API_URL = "http://localhost:8080/api/tasks";

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a task by ID
export const getTask = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (task: Task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update a task
export const updateTask = async (id: number, task: Task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};