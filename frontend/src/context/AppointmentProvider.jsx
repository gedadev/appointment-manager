import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { AppointmentContext } from "./AppointmentContext";

export const AppointmentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { endpoints, request } = useApi();

  const addAppointment = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await request(endpoints.appointment.new, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response instanceof Error) throw response;

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    addAppointment,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
