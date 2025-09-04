import { useState } from "react";
import { useAppointment } from "../../hooks/useAppointment";
import { days, months } from "../../utils/main";
import { FiCalendar, FiClock, FiDollarSign, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";
import { AppointmentFilters } from "./AppointmentFilters";

export function Summary() {
  const { appointments, filteredAppointments } = useAppointment();

  const getAppointments = () => {
    if (filteredAppointments.length > 0) {
      return filteredAppointments;
    }

    return appointments;
  };

  return (
    <div className="summary-section">
      <div className="summary-container"></div>
      <AppointmentFilters />
      <div className="next-appointments-container">
        {appointments.length > 0 &&
          getAppointments().map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} />
          ))}
      </div>
    </div>
  );
}

const AppointmentCard = ({ appointment }) => {
  const [activeStatusSelector, setActiveStatusSelector] = useState(false);
  const { updateAppointment } = useAppointment();

  const formatDate = (appDate) => {
    const dateObj = new Date(appDate);
    const [day, month, date, year] = [
      String(dateObj.getDay()),
      String(dateObj.getMonth()),
      String(dateObj.getDate()),
      String(dateObj.getFullYear()),
    ];

    return `${days[day]}, ${months[month]} ${date}`;
  };

  const formatCurrency = (value) => {
    return `$ ${(value / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleStatusChange = () => {
    setActiveStatusSelector(!activeStatusSelector);
  };

  const handleStatusSelection = async (e) => {
    const newStatus = e.target.className;
    setActiveStatusSelector(false);

    const success = await updateAppointment(appointment._id, {
      status: newStatus,
    });

    if (success) {
      toast.success("Status updated successfully");
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="appointment-card" key={appointment._id}>
      <h1>{appointment.customerName}</h1>
      <div className="appointment-details">
        <div>
          <FiCalendar /> {formatDate(appointment.date)}
        </div>
        <div>
          <FiClock /> {appointment.time}
        </div>
        <div>
          <FiDollarSign /> {formatCurrency(appointment.cost)}
        </div>
        <div>
          <FiFileText /> {appointment.notes}
        </div>
      </div>
      <div className="status-container" onClick={handleStatusChange}>
        <span
          className={`${appointment.status} active`}
          style={
            activeStatusSelector
              ? {
                  opacity: "0",
                  pointerEvents: "none",
                }
              : {
                  opacity: "1",
                  pointerEvents: "all",
                }
          }
        >
          {appointment.status}
        </span>

        <div
          className="status-selector"
          onClick={handleStatusSelection}
          style={
            activeStatusSelector
              ? {
                  opacity: "1",
                  pointerEvents: "all",
                }
              : {
                  opacity: "0",
                  pointerEvents: "none",
                }
          }
        >
          <span className="pending">pending</span>
          <span
            className="confirmed"
            style={
              activeStatusSelector
                ? { transform: "translateY(2rem)" }
                : { transform: "translateY(0)" }
            }
          >
            confirmed
          </span>
          <span
            className="cancelled"
            style={
              activeStatusSelector
                ? { transform: "translateY(4rem)" }
                : { transform: "translateY(0)" }
            }
          >
            cancelled
          </span>
          <span
            className="completed"
            style={
              activeStatusSelector
                ? { transform: "translateY(6rem)" }
                : { transform: "translateY(0)" }
            }
          >
            completed
          </span>
        </div>
      </div>
    </div>
  );
};
