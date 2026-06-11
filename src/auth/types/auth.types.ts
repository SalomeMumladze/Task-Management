export interface RegisterFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: "owner" | "admin" | "viewer";
  createdAt: string;
  avatar?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
