import "../styles/Dashboard.css";
import { useState } from "react";
import { Header } from "../components/Dashboard/Header";
import { useAppointment } from "../hooks/useAppointment";

export function Dashboard() {
  const { appointments, error } = useAppointment();

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
                  <p>{appointment.date}</p>
                  <p>{appointment.time}</p>
                  <p>{appointment.cost}</p>
                  <p>{appointment.notes}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
