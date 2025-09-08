import "../styles/Appointment.css";
import { useAuth } from "../hooks/useAuth";
import { useAppointment } from "../hooks/useAppointment";
import { useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { useFormValidations } from "../hooks/useFormValidations";

const getLocalDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
};

export function AppointmentModal({ activeModal, toggleModal }) {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    businessName: userData ? userData.businessName : "",
    customerName: "",
    date: getLocalDate(),
    time: "00:00",
    cost: "",
    notes: "",
  });
  const { addAppointment } = useAppointment();
  const { validateCustomerName, validateDate, formError, validateForm } =
    useFormValidations();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "customerName":
        validateCustomerName(value);
        break;
      case "date":
        const date = value.split("T")[0];
        const time = value.split("T")[1];
        validateDate(date);
        setFormData({ ...formData, date, time });
        return;
      case "cost":
        const cleanedValue = value.replace(/\D/g, "");
        setFormData({ ...formData, [name]: cleanedValue });
        return;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName) formData.businessName = userData.businessName;
    const formIsValid = validateForm(formData);

    if (!formIsValid) return;

    addAppointment(formData);
    setFormData({
      businessName: formData.businessName,
      customerName: "",
      date: getLocalDate(),
      time: "00:00",
      cost: "",
      notes: "",
    });
    toggleModal();
  };

  const formatCurrency = (value) => {
    return `$${(value / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
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
            <label htmlFor="customerName">Customer:</label>
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
              type="datetime-local"
              id="date"
              name="date"
              onChange={handleChange}
              value={`${formData.date}T${formData.time}`}
            />
            {formError && formError.input === "date" && (
              <span>{formError.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cost">Cost:</label>
            <input
              type="text"
              id="cost"
              name="cost"
              onChange={handleChange}
              value={formatCurrency(formData.cost)}
            />
            {formError && formError.input === "cost" && (
              <span>{formError.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
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
