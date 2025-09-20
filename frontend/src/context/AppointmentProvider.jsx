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

      fetchAppointments();
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

  const handleAppointmentFilters = (filterName, filterValue, checked) => {
    const updateFilters = () => {
      const keys = Object.keys(appointmentsFilters);
      if (filterName === "search")
        return { ...appointmentsFilters, [filterName]: filterValue };

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

    console.log(newFilters);
    filterAppointments(newFilters);

    setAppointmentsFilters(newFilters);
  };

  const filterAppointments = (filters) => {
    const filtered = appointments.filter((appointment) => {
      const passFilters = Object.entries(filters).reduce(
        (validAppointment, [filterName, filters]) => {
          switch (filterName) {
            case "search":
              if (
                !appointment.customerName
                  .toLowerCase()
                  .includes(filters.toLowerCase())
              )
                return false;
              break;
            case "status":
              if (!filters.includes(appointment.status)) return false;
              break;
            case "date":
              const appointmentDate = new Date(appointment.date).getTime();

              const todayStart = new Date();
              todayStart.setUTCHours(0, 0, 0, 0);
              const todayEnd = new Date();
              todayEnd.setUTCHours(23, 59, 59, 999);

              const dateRanges = filters.map((item) => {
                switch (item) {
                  case "today":
                    return [todayStart.getTime(), todayEnd.getTime()];
                  case "tomorrow":
                    const tomorrowStart = new Date(todayStart);
                    tomorrowStart.setUTCDate(todayStart.getUTCDate() + 1);
                    const tomorrowEnd = new Date(todayEnd);
                    tomorrowEnd.setUTCDate(todayEnd.getUTCDate() + 1);

                    return [tomorrowStart.getTime(), tomorrowEnd.getTime()];
                  case "this-week":
                    const thisWeekStart = new Date(todayStart);
                    thisWeekStart.setUTCDate(todayStart.getUTCDate() + 2);
                    const thisWeekEnd = new Date(todayEnd);
                    thisWeekEnd.setUTCDate(todayEnd.getUTCDate() + 7);

                    return [thisWeekStart.getTime(), thisWeekEnd.getTime()];
                  case "next-week":
                    const nextWeekStart = new Date(todayStart);
                    nextWeekStart.setUTCDate(todayStart.getUTCDate() + 8);
                    const nextWeekEnd = new Date(todayEnd);
                    nextWeekEnd.setUTCDate(todayEnd.getUTCDate() + 14);

                    return [nextWeekStart.getTime(), nextWeekEnd.getTime()];
                  default:
                    break;
                }
              });
              const dateInRange = dateRanges.some(
                ([min, max]) => appointmentDate >= min && appointmentDate <= max
              );
              if (!dateInRange) return false;
              break;
            case "time":
              const timeRanges = filters.map((item) => {
                switch (item) {
                  case "morning":
                    return [0, 11];
                  case "afternoon":
                    return [12, 18];
                  case "evening":
                    return [19, 23];
                  default:
                    break;
                }
              });
              const appointmentHour = appointment.time.split(":")[0];
              const timeInRange = timeRanges.some(
                ([min, max]) => appointmentHour >= min && appointmentHour <= max
              );
              if (!timeInRange) return false;
              break;
            default:
              return validAppointment;
          }

          return validAppointment;
        },
        true
      );

      if (passFilters) return appointment;
    });

    setFilteredAppointments(filtered);
  };

  const getSummaryInfo = () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const lastMonth = new Date(today);
    lastMonth.setUTCDate(today.getUTCDate() - 30);

    const lastMonthAppointments = appointments.filter((appointment) => {
      const date = new Date(appointment.date).getTime();
      return date >= lastMonth.getTime() && date < today.getTime();
    });

    const upcomingAppointments = appointments.filter((appointment) => {
      const date = new Date(appointment.date).getTime();
      return date >= today.getTime();
    });

    const lastMonthRevenue = lastMonthAppointments.reduce(
      (total, appointment) => total + appointment.cost / 100,
      0
    );

    return { lastMonthAppointments, upcomingAppointments, lastMonthRevenue };
  };

  const sortByDate = (appointmentsList) => {
    return appointmentsList.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const value = {
    loading,
    error,
    addAppointment,
    appointments,
    filteredAppointments,
    updateAppointment,
    handleAppointmentFilters,
    appointmentsFilters,
    getSummaryInfo,
    sortByDate,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
