import "../styles/Dashboard.css";
import { useState } from "react";
import { Header } from "../components/Dashboard/Header";
import { useAppointment } from "../hooks/useAppointment";
import { days, months } from "../utils/main";

export function Dashboard() {
  const { appointments, error } = useAppointment();

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

  return (
    <main className="dashboard">
      <section className="appointment-section">
        <Header />
        <div className="summary-section">
          <div className="summary-container"></div>
          <div className="next-appointments-container">
            {appointments.length > 0 &&
              appointments.map((appointment) => (
                <div className="appointment-card" key={appointment._id}>
                  <p>{appointment.customerName}</p>
                  <p>{formatDate(appointment.date)}</p>
                  <p>{appointment.time}</p>
                  <p>{formatCurrency(appointment.cost)}</p>
                  <p>{appointment.notes}</p>
                  <span>{appointment.status}</span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
