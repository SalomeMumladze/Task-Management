import { createContext, useContext, useState } from "react";

interface WorkspaceContextType {
  projectId: number | null;
  setProjectId: (id: number) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projectId, setProjectId] = useState<number | null>(1);

  return (
    <WorkspaceContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext);

  if (!ctx) throw new Error("WorkspaceProvider missing");

  return ctx;
};
