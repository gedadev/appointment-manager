import "../styles/Appointment.css";
import { useAuth } from "../hooks/useAuth";
import { useAppointment } from "../hooks/useAppointment";
import { useState } from "react";
import { FiXCircle } from "react-icons/fi";

export function AppointmentModal({ activeModal, toggleModal }) {
  const { userData } = useAuth();
  const { addAppointment } = useAppointment();
  const [formData, setFormData] = useState({
    businessName: userData.businessName,
    customerName: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment(formData);
    toggleModal();
  };

  return (
    <div
      className="appointment-modal"
      style={{
        opacity: `${activeModal ? "1" : "0"}`,
        pointerEvents: `${activeModal ? "all" : "none"}`,
      }}
    >
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div>
          <div className="close-button" onClick={toggleModal}>
            <FiXCircle />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              onChange={handleChange}
              value={formData.customerName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              onChange={handleChange}
              value={formData.date}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              onChange={handleChange}
              value={formData.notes}
            />
          </div>
          <div className="form-group">
            <button type="submit">Add Appointment</button>
          </div>
        </div>
      </form>
    </div>
  );
}
