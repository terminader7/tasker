import React, { useEffect, useState } from "react";
import { Project } from "../types/project";
import { getProject } from "../api/projectService";

export interface IProjectContext {
  project: Project | undefined;
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  loading: boolean;
  error: string | null;
  projectId: string | undefined;
  setProjectId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ProjectContext = React.createContext<IProjectContext>({
  project: undefined,
  setProject: () => null,
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
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // IS THERE A BETTER WAY MASON!?
  const [projectId, setProjectId] = useState<string | undefined>();

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getProject(parseInt(projectId));
        setProject(data);
      } catch (error) {
        console.error("Error fetching project", error);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  console.log("RUNNING");

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
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
