import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { AppointmentContext } from "./AppointmentContext";
import { useAuth } from "../hooks/useAuth";

export const AppointmentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const { endpoints, request } = useApi();
  const { userData } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await request(endpoints.appointment.all, {
          method: "GET",
        });

        if (response instanceof Error) throw response;
        setAppointments(response);
        return { success: true };
      } catch (error) {
        setError(error.message);
        return { success: false };
      } finally {
        setLoading(false);
      }
    };

    userData && fetchAppointments();
  }, [userData]);

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
    appointments,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
