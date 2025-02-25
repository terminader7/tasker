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
}

export const ProjectContext = React.createContext<IProjectContext>({
  projects: [],
  setProjects: () => null,
  loading: false,
  error: null,
  projectId: "",
  setProjectId: () => null,
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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        loading,
        error,
        projectId,
        setProjectId,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
