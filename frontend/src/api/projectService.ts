import axios from "axios";

import { Project, NewProject } from "../types/project";

const API_URL = "http://localhost:8080/api/projects";

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a project by ID
export const getProject = async (id: number): Promise<Project> => {
  console.log(`Fetching project with ID: ${id}`); // Add this line
  const response = await axios.get(`${API_URL}/${id}`);
  console.log("Fetched project data:", response.data); // Add this line
  return response.data;
};

// Create a new project
export const createProject = async (project: NewProject) => {
  const response = await axios.post(API_URL, project);
  return response.data;
};

// Update a project
export const updateProject = async (id: number, project: Partial<Project>) => {
  const response = await axios.put(`${API_URL}/${id}`, project);
  return response.data;
};

// Delete a project
export const deleteProject = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
