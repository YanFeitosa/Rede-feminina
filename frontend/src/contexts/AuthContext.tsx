import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getUserProfile, loginUser, logoutUser, refreshToken } from "@/api/auth";
import { getAccessToken, setAccessToken } from "@/lib/api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  userType: string;
  phone?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    const res = await loginUser({ email, password });
    const token = res?.data?.accessToken;
    if (token) setAccessToken(token);
    setUser(res.data.user);
  };

  const logout = async () => {
    try { await logoutUser(); } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const refreshUser = async () => {
    const res = await refreshToken();
    if (!res?.accessToken) throw new Error("Falha ao renovar sessão");
    const profile = await getUserProfile();
    setUser(profile.data);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const saved = getAccessToken();
        if (saved) {
          const profile = await getUserProfile();
          setUser(profile.data);
        }
      } catch {
        await logout();
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
