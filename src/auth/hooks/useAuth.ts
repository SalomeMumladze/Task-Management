import { useAuthContext } from "@/auth/context/AuthProvider";

export const useAuth = () => {
  const { state, login, logout } = useAuthContext();

  return {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    role: state.user?.role,

    login,
    logout,
  };
};
