"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profile?: object; 
  projects?: object[]; 
  socials?: object[]; 
  links?: object[]; 
  experiences?: object[]; 
  education?: object[]; 
  skills?: string[];
}

interface AuthContextProps {
  user: User | null;
  status: "loggedIn" | "loggedOut" | undefined;
  error: string | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  create: (payload: CreatePayload) => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface CreatePayload {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create Context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<"loggedIn" | "loggedOut" | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const create = useCallback(async (payload: CreatePayload) => {
    try {
      const res = await fetch("/api/auth/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const { user } = await res.json();
        setUser(user);
        setStatus("loggedIn");
        setError(null);
        router.push("/auth/login");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (error: any) {
      setError(error.message);
      console.error("Registration error:", error);
    }
  }, [router]);

  // Login User
  const login = useCallback(async (payload: LoginPayload) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const { user, token } = await res.json();
        cookies.set("token", token, { expires: 7 });
        setUser(user);
        setStatus("loggedIn");
        setError(null);
        router.push("/profile/dashboard");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error: any) {
      setError(error.message);
      console.error("Login error:", error);
    }
  }, [router]);

  // Logout User
  const logout = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        cookies.remove("token");
        setUser(null);
        setStatus("loggedOut");
        window.location.href = "/auth/login";
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  // Fetch Session User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/session");
        const { decoded } = await response.json();
        setUser(decoded);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        error,
        isLoading,
        login,
        create,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
