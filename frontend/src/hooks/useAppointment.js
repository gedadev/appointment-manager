import { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext";

export const useAppointment = () => {
  const context = useContext(AppointmentContext);

  return context;
};
