import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios.js";
import { clearToken, getToken, setToken } from "@/utils/authStorage.js";
import { UNAUTHORIZED_EVENT } from "@/utils/authEvents.js";

const AuthContext = createContext(null);

async function loadSession(setUser, setInitializing) {
  const token = getToken();
  if (!token) {
    setUser(null);
    setInitializing(false);
    return;
  }
  setInitializing(true);
  try {
    const { data } = await api.get("/auth/me");
    setUser(data.data);
  } catch {
    clearToken();
    setUser(null);
  } finally {
    setInitializing(false);
  }
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    loadSession(setUser, setInitializing);
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);
      navigate("/login", { replace: true });
    }

    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () =>
      window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [navigate]);

  async function login({ email, password }) {
    const { data } = await api.post("/auth/login", { email, password });
    setToken(data.token);
    await loadSession(setUser, setInitializing);
  }

  async function register({ name, email, password, password_confirmation }) {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      password_confirmation,
    });
    setToken(data.token);
    await loadSession(setUser, setInitializing);
  }

  function logout() {
    clearToken();
    setUser(null);
    navigate("/login", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{ user, initializing, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
