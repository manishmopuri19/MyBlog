import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function decodeToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function userFromToken(token) {
  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload) return null;
  return { id: payload.sub, role: payload.role };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => userFromToken(localStorage.getItem("token")));

  const login = (tokenData) => {
    localStorage.setItem("token", tokenData.access_token);
    setToken(tokenData.access_token);
    const decoded = userFromToken(tokenData.access_token);
    setUser(decoded);
    return decoded;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
