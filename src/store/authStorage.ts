const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authStorage = {
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),

  getToken: () => localStorage.getItem(TOKEN_KEY),

  setUser: (user: unknown) =>
    localStorage.setItem(USER_KEY, JSON.stringify(user)),

  getUser: () => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
