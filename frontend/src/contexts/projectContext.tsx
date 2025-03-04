import React, { useEffect, useState } from "react";
import { Project } from "../types/project";
import { getProject } from "../api/projectService";

export interface IProjectContext {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  loading: boolean;
  error: string | null;
  projectId: string | undefined;
  setProjectId: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProjects: Project[];
}

const minSearchLength = 2;

export const ProjectContext = React.createContext<IProjectContext>({
  projects: [],
  setProjects: () => null,
  loading: false,
  error: null,
  projectId: "",
  setProjectId: () => null,
  searchQuery: "",
  setSearchQuery: () => null,
  filteredProjects: [],
});

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getProject(parseInt(projectId));
        setProjects((prevProjects) => {
          const existingProjectIndex = prevProjects.findIndex(
            (project) => project.id === data.id
          );
          if (existingProjectIndex !== -1) {
            const updatedProjects = [...prevProjects];
            updatedProjects[existingProjectIndex] = data;
            return updatedProjects;
          } else {
            return [...prevProjects, data];
          }
        });
      } catch (error) {
        console.error("Error fetching project", error);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const searchProjects = projects.filter((project) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    if (lowerCaseSearchQuery.length < minSearchLength) {
      return true;
    }
    if (project.title === lowerCaseSearchQuery) {
      return true;
    }

    let projectSearchQueryIndex = 0;
    for (let i = 0; i < project.title.length; i++) {
      let titleSubString = project.title[i].toLowerCase();

      if (titleSubString === lowerCaseSearchQuery[projectSearchQueryIndex]) {
        projectSearchQueryIndex += 1;
        if (projectSearchQueryIndex === lowerCaseSearchQuery.length) {
          return true;
        }
      } else {
        projectSearchQueryIndex = 0;
      }
    }

    for (let i = 0; i < project.tasks.length; i++) {
      const task = project.tasks[i];
      let taskSearchQueryIndex = 0;
      for (let j = 0; j < task.title.length; j++) {
        let titleSubString = task.title[j].toLocaleUpperCase();

        if (titleSubString === lowerCaseSearchQuery[taskSearchQueryIndex]) {
          taskSearchQueryIndex += 1;
          if (taskSearchQueryIndex === lowerCaseSearchQuery.length) {
            return true;
          }
        } else {
          taskSearchQueryIndex = 0;
        }
      }
    }

    return false;
  });

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        loading,
        error,
        projectId,
        setProjectId,
        searchQuery,
        setSearchQuery,
        filteredProjects: searchProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
