import { FiFileText, FiTrash2 } from "react-icons/fi";
import { useAppointment } from "../../hooks/useAppointment";
import { months } from "../../utils/main";
import { useState } from "react";
import { useFormValidations } from "../../hooks/useFormValidations";

export function AppointmentsManager() {
  const { appointments, sortByDate, formatDate, formatCurrency, formatTime } =
    useAppointment();
  const { validateCustomerName, validateTime, formError } =
    useFormValidations();
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const selectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const getDate = (appointmentDate) => {
    const { month, date, year } = formatDate(appointmentDate);

    return `${year}-${String(Number(month) + 1).padStart(
      2,
      "0"
    )}-${date.padStart(2, "0")}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "customerName":
        validateCustomerName(value);
        break;

      case "time":
        let cleanedTime = value.replace(/\D/g, "");
        while (cleanedTime.startsWith("0")) {
          cleanedTime = cleanedTime.replace("0", "");
        }
        if (cleanedTime.length > 4) return;

        validateTime(cleanedTime);
        setSelectedAppointment({
          ...selectedAppointment,
          [name]: cleanedTime,
        });
        return;

      case "cost":
        const cleanedCost = value.replace(/\D/g, "");
        setSelectedAppointment({
          ...selectedAppointment,
          [name]: cleanedCost,
        });
        return;

      default:
        break;
    }

    setSelectedAppointment({
      ...selectedAppointment,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="edit-panel">
        {!selectedAppointment._id ? (
          <div className="no-appointment">
            <div>
              <FiFileText />
            </div>
            <span>Select an appointment to edit</span>
          </div>
        ) : (
          <div>
            <form className="edit-form" onSubmit={handleSubmit}>
              <h3>Edit appointment</h3>
              <div>
                <label htmlFor="customerName">Customer Name:</label>
                <input
                  id="customerName"
                  type="text"
                  name="customerName"
                  value={selectedAppointment.customerName}
                  onChange={handleChange}
                />
                {formError && formError.input === "customerName" && (
                  <span>{formError.message}</span>
                )}
              </div>
              <div className="short-input">
                <label htmlFor="date">Date:</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={getDate(selectedAppointment.date)}
                  onChange={handleChange}
                />
              </div>
              <div className="short-input">
                <label htmlFor="time">Time:</label>
                <input
                  id="time"
                  type="text"
                  name="time"
                  value={formatTime(selectedAppointment.time)}
                  onChange={handleChange}
                />
                {formError && formError.input === "time" && (
                  <span>{formError.message}</span>
                )}
              </div>
              <div className="short-input">
                <label htmlFor="cost">Cost:</label>
                <input
                  id="cost"
                  type="text"
                  name="cost"
                  value={formatCurrency(selectedAppointment.cost)}
                  onChange={handleChange}
                />
              </div>
              <div className="short-input">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  value={selectedAppointment.status}
                  onChange={handleChange}
                >
                  <option value="pending">pending</option>
                  <option value="confirmed">confirmed</option>
                  <option value="cancelled">cancelled</option>
                  <option value="completed">completed</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Notes:</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={selectedAppointment.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <button>Update</button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="appointments-list">
        <h3>All appointments</h3>
        {sortByDate(appointments).map((appointment) => (
          <AppointmentItem
            key={appointment._id}
            appointment={appointment}
            selectAppointment={selectAppointment}
          />
        ))}
      </div>
    </div>
  );
}

const AppointmentItem = ({ appointment, selectAppointment }) => {
  const { formatDate } = useAppointment();

  const getDate = (appointmentDate) => {
    const { month, date, year } = formatDate(appointmentDate);

    return `${months[month]} ${date}, ${year}`;
  };

  return (
    <div
      className="appointment-item"
      onClick={() => selectAppointment(appointment)}
    >
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
