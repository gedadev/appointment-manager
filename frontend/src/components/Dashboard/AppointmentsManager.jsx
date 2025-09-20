import { FiTrash2 } from "react-icons/fi";
import { useAppointment } from "../../hooks/useAppointment";
import { months } from "../../utils/main";

export function AppointmentsManager() {
  const { appointments, sortByDate } = useAppointment();

  return (
    <div>
      <div className="appointments-list">
        <h3>All appointments</h3>
        {sortByDate(appointments).map((appointment) => (
          <AppointmentItem key={appointment._id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}

const AppointmentItem = ({ appointment }) => {
  const { formatDate } = useAppointment();

  const getDate = (appointmentDate) => {
    const { month, date, year } = formatDate(appointmentDate);

    return `${months[month]} ${date}, ${year}`;
  };

  return (
    <div className="appointment-item">
      <div className="appointment-data">
        <h4>{appointment.customerName}</h4>
        <p>{getDate(appointment.date)}</p>
        <div className="status-container">
          <span className={appointment.status}>{appointment.status}</span>
        </div>
      </div>
      <div className="delete-appointment">
        <FiTrash2 />
      </div>
    </div>
  );
};
