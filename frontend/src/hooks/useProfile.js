import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

export const useProfile = () => {
  const context = useContext(ProfileContext);

  return context;
};
