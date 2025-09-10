import { useState } from "react";
import { useAppointment } from "../../hooks/useAppointment";
import { days, months } from "../../utils/main";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFilePlus,
  FiFileText,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { AppointmentModal } from "../AppointmentModal";

export function NextAppointments() {
  const [activeModal, setActiveModal] = useState(false);
  const { appointments, filteredAppointments, appointmentsFilters } =
    useAppointment();

  const toggleModal = () => setActiveModal(!activeModal);

  const getAppointments = () => {
    const sortByDate = (appointmentsList) => {
      return appointmentsList.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    };

    if (
      Object.keys(appointmentsFilters).length > 0 ||
      filteredAppointments.length > 0
    ) {
      return sortByDate(filteredAppointments);
    }

    return sortByDate(appointments);
  };

  return (
    <div className="next-appointments-container">
      {appointments.length > 0 ? (
        getAppointments().map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))
      ) : (
        <div className="first-appointment">
          <h1>Add your first appointment</h1>
          <button className="new-appointment-button" onClick={toggleModal}>
            New Appointment <FiFilePlus />
          </button>
          <AppointmentModal
            activeModal={activeModal}
            toggleModal={toggleModal}
          />
        </div>
      )}
    </div>
  );
}

const AppointmentCard = ({ appointment }) => {
  const [activeStatusSelector, setActiveStatusSelector] = useState(false);
  const { updateAppointment, error } = useAppointment();

  const formatDate = (appDate) => {
    const dateObj = new Date(appDate);
    const [day, month, date, year] = [
      String(dateObj.getUTCDay()),
      String(dateObj.getUTCMonth()),
      String(dateObj.getUTCDate()),
      String(dateObj.getUTCFullYear()),
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
