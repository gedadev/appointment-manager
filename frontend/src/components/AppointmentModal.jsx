import "../styles/Appointment.css";
import { useAuth } from "../hooks/useAuth";
import { useAppointment } from "../hooks/useAppointment";
import { useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { useFormValidations } from "../hooks/useFormValidations";

export function AppointmentModal({ activeModal, toggleModal }) {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    businessName: userData.businessName,
    customerName: "",
    date: "",
    notes: "",
  });
  const { validateCustomerName, validateDate, formError, validateForm } =
    useFormValidations();
  const { addAppointment } = useAppointment();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "customerName":
        validateCustomerName(value);
        break;
      case "date":
        validateDate(value);
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formIsValid = validateForm(formData);

    if (!formIsValid) return;

    addAppointment(formData);
    setFormData({
      businessName: formData.businessName,
      customerName: "",
      date: "",
      notes: "",
    });
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
              name="customerName"
              onChange={handleChange}
              value={formData.customerName}
            />
            {formError && formError.input === "customerName" && (
              <span>{formError.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleChange}
              value={formData.date}
            />
            {formError && formError.input === "date" && (
              <span>{formError.message}</span>
            )}
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
