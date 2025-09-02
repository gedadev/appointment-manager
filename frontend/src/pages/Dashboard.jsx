import "../styles/Dashboard.css";
import { Header } from "../components/Dashboard/Header";
import { useAppointment } from "../hooks/useAppointment";
import { days, months } from "../utils/main";
import { FiCalendar, FiClock, FiDollarSign, FiFileText } from "react-icons/fi";

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
                  <span>{appointment.status}</span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
