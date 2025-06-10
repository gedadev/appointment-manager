import { useCallback } from "react";

const API_CONFIG = {
  baseUrl: "http://localhost:3000",
  endpoints: {
    auth: {
      login: "/auth/login",
      signup: "/auth/create",
      refresh: "/auth/refresh-token",
      logout: "/auth/logout",
    },
    user: {
      profile: "/user/profile",
    },
  },
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};

export const useApi = () => {
  const getApiUrl = useCallback((endpoint) => {
    let url = `${API_CONFIG.baseUrl}${endpoint}`;
    return url;
  }, []);

  const getHeaders = useCallback((additionalHeaders = {}) => {
    const token = localStorage.getItem("authToken");
    const headers = {
      ...API_CONFIG.defaultHeaders,
      ...additionalHeaders,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }, []);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(getApiUrl(API_CONFIG.endpoints.auth.refresh), {
      method: "POST",
      headers: API_CONFIG.defaultHeaders,
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token);

    return data.token;
  }, [getApiUrl]);

  const request = useCallback(
    async (endpoint, options = {}) => {
      const { headers = {}, ...restOptions } = options;
      const url = getApiUrl(endpoint);
      const requestHeaders = getHeaders(headers);

      try {
        const response = await fetch(url, {
          ...restOptions,
          headers: requestHeaders,
        });

        // 401 status to refresh the token
        if (response.status === 401) {
          const newToken = await refreshToken();
          if (newToken instanceof Error) throw newToken;

          const retryResponse = await fetch(url, {
            ...restOptions,
            headers: {
              ...requestHeaders,
              Authorization: `Bearer ${newToken}`,
            },
          });

          if (!retryResponse.ok) {
            const error = await retryResponse.json();
            throw new Error(error.message || "API request failed");
          }

          return await retryResponse.json();
        }

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "API request failed");
        }

        return await response.json();
      } catch (error) {
        // Forbidden message to delete the session
        if (error.message === "Forbidden") {
          const refreshToken = localStorage.getItem("refreshToken");
          refreshToken &&
            (await fetch(getApiUrl(API_CONFIG.endpoints.auth.logout), {
              method: "DELETE",
              headers: requestHeaders,
              body: JSON.stringify({ refreshToken }),
            }));

          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
        throw error;
      }
    },
    [getApiUrl, getHeaders, refreshToken]
  );

  return {
    request,
    endpoints: API_CONFIG.endpoints,
  };
};
