import { useEffect, useState } from "react";
import { ProfileContext } from "./ProfileContext";
import { useAuth } from "../hooks/useAuth";
import { useApi } from "../hooks/useApi";

export const ProfileProvider = ({ children }) => {
  const { userData, getUserData } = useAuth();
  const { endpoints, request } = useApi();
  const [generalData, setGeneralData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData) setGeneralData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralData({ ...generalData, [name]: value });
  };

  const updateUser = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const { success } = await request(endpoints.user.profile, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (success) await getUserData();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    generalData,
    handleChange,
    updateUser,
    loading,
    error,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
