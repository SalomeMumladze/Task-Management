import { createContext, useContext, useEffect, useState } from "react";
import { authStorage } from "@/store/authStorage";
import type { AuthState, User } from "@/auth/types/auth.types";

type AuthContextType = {
  state: AuthState;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();

    if (token && user) {
      setState({
        user,
        token,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (user: User, token: string) => {
    authStorage.setToken(token);
    authStorage.setUser(user);

    setState({
      user,
      token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    authStorage.clear();

    setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
};
