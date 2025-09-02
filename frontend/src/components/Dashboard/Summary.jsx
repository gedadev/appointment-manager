import { useState } from "react";
import { useAppointment } from "../../hooks/useAppointment";
import { days, months } from "../../utils/main";
import { FiCalendar, FiClock, FiDollarSign, FiFileText } from "react-icons/fi";

export function Summary() {
  const { appointments, error } = useAppointment();

  return (
    <div className="summary-section">
      <div className="summary-container"></div>
      <div className="next-appointments-container">
        {appointments.length > 0 &&
          appointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} />
          ))}
      </div>
    </div>
  );
}

const AppointmentCard = ({ appointment }) => {
  const [activeStatusSelector, setActiveStatusSelector] = useState(false);

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
