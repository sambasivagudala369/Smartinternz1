import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "customer" | "restaurant" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => boolean;
  logout: () => void;
  register: (username: string, email: string, password: string, role: UserRole) => boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const MOCK_USERS: User[] = [
  { id: "1", username: "admin", email: "admin@sbfoods.com", role: "admin" },
  { id: "2", username: "hola", email: "hola@gmail.com", role: "customer" },
  { id: "3", username: "spice_owner", email: "owner@andhaspice.com", role: "restaurant" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string): boolean => {
    const found = MOCK_USERS.find((u) => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, _password: string, role: UserRole): boolean => {
    const newUser: User = { id: Date.now().toString(), username, email, role };
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
