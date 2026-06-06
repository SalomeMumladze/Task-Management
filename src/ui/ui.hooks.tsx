import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setSidebarOpenAction } from "./ui.state";

export const useSidebar = () => {
  const dispatch = useDispatch();

  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  const setSidebarOpen = (value: boolean) => {
    dispatch(setSidebarOpenAction(value));
  };

  const toggleSidebar = () => {
    dispatch(setSidebarOpenAction(!sidebarOpen));
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
  };
};
