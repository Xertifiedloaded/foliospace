"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
const Context = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(undefined);
  const [error, setError] = useState(null);
  const router = useRouter();

  const create = useCallback(async (payload) => {
    try {
      const res = await fetch("/api/auth/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(res);
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
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    }
  }, []);

  const login = useCallback(async (payload) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(res);
      if (res.ok) {
        const { user, token } = await res.json();
        console.log(token);
        console.log(user);
        cookies.set("token", token, { expires: 7 });
        setUser(user);
        setStatus("loggedIn");
        setError(null);
        router.push("/profile/dashboard");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    }
  }, []);


  // Logout User
  const handleLogout = useCallback(async () => {
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

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("/api/auth/session");
      console.log(response);
      const { decoded } = await response.json();
      setUser(decoded);
    }
    fetchUser();
  }, []);
  return (
    <Context.Provider
      value={{
        user,
        status,
        error,
        login,
        create,
        handleLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
