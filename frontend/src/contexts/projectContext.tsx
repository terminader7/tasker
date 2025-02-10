import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Project } from "../types/project";
import { getProject } from "../api/projectService";

export interface IProjectContext {
  project: Project | undefined;
  setProject: React.Dispatch<Project | undefined>;
}

export const ProjectContext = React.createContext<IProjectContext>({
  project: undefined,
  setProject: () => null,
});

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project, setProject] = useState<Project>();
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const data = await getProject(parseInt(projectId));
        setProject(data);
      } catch (error) {
        console.error("Error fetching project", error);
      }
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    console.log({ project });
  }, [project]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
