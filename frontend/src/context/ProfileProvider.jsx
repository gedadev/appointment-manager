import { ProfileContext } from "./ProfileContext";

export const ProfileProvider = ({ children }) => {
  const value = {
    value: "ok",
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
