import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { AppointmentContext } from "./AppointmentContext";
import { useAuth } from "../hooks/useAuth";

export const AppointmentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointmentsFilters, setAppointmentsFilters] = useState({});
  const { endpoints, request } = useApi();
  const { userData } = useAuth();

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

  useEffect(() => {
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

  const updateAppointment = async (id, data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await request(`${endpoints.appointment.update}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (response instanceof Error) throw response;

      fetchAppointments();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const searchCustomer = (name) => {
    const filteredAppointments = appointments.filter((appointment) => {
      return appointment.customerName
        .toLowerCase()
        .includes(name.toLowerCase());
    });
    setFilteredAppointments(filteredAppointments);
  };

  const handleAppointmentFilters = (filterName, filterValue, checked) => {
    const updateFilters = () => {
      const keys = Object.keys(appointmentsFilters);

      if (!keys.includes(filterName) && checked)
        return { ...appointmentsFilters, [filterName]: [filterValue] };

      if (!checked) {
        const newFilter = appointmentsFilters[filterName].filter(
          (item) => item !== filterValue
        );

        if (newFilter.length === 0) {
          const { [filterName]: _, ...rest } = appointmentsFilters;
          return rest;
        }

        return {
          ...appointmentsFilters,
          [filterName]: appointmentsFilters[filterName].filter(
            (item) => item !== filterValue
          ),
        };
      }

      return {
        ...appointmentsFilters,
        [filterName]: [...appointmentsFilters[filterName], filterValue],
      };
    };

    const newFilters = updateFilters();

    if (Object.keys(newFilters).length === 0)
      setFilteredAppointments(appointments);

    setAppointmentsFilters(newFilters);
  };

  const value = {
    loading,
    error,
    addAppointment,
    appointments,
    filteredAppointments,
    updateAppointment,
    searchCustomer,
    handleAppointmentFilters,
    appointmentsFilters,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
