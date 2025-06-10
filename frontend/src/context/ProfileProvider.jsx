import { useEffect, useState } from "react";
import { ProfileContext } from "./ProfileContext";
import { useAuth } from "../hooks/useAuth";

export const ProfileProvider = ({ children }) => {
  const { userData } = useAuth();
  const [generalData, setGeneralData] = useState();

  useEffect(() => {
    if (userData) setGeneralData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralData({ ...generalData, [name]: value });
  };

  const value = {
    generalData,
    handleChange,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
