import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useApi } from "../hooks/useApi";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const { endpoints, request } = useApi();

  const getUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await request(endpoints.user.profile, {
        method: "GET",
      });
      if (data instanceof Error) throw data;

      setUserData(data);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [endpoints, request]);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setUserData(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      logout();
      return;
    }

    const { success } = getUserData(token);
    if (!success) setUserData(null);
  }, [getUserData, logout]);

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
      getUserData(data.token);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const data = await request(endpoints.auth.signup, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data instanceof Error) throw data;

      localStorage.setItem("authToken", data.token);
      getUserData(data.token);
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
    signup,
    logout,
    userData,
    userIsLogged: !!userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
