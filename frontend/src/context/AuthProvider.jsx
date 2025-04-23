import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../hooks/useApi";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { endpoints, request } = useApi();

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const data = await request(endpoints.auth.login, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data instanceof Error) throw data;

      localStorage.setItem("authToken", data.token);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
