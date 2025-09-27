import { FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";
import { useAppointment } from "../../hooks/useAppointment";
import { Link } from "react-router-dom";

export const Summary = () => {
  const { getSummaryInfo } = useAppointment();
  const { lastMonthAppointments, upcomingAppointments, lastMonthRevenue } =
    getSummaryInfo();

  return (
    <div className="summary-container">
      <div className="summary-cards">
        <div className="summary-card">
          <div>
            Last Month Appointments <FiCalendar />
          </div>
          <span>{lastMonthAppointments.length}</span>
        </div>
        <div className="summary-card">
          <div>
            Last Month Revenue <FiDollarSign />
          </div>
          <span>$ {lastMonthRevenue}</span>
        </div>
        <div className="summary-card">
          <div>
            Upcoming appointments <FiClock />
          </div>
          <span>{upcomingAppointments.length}</span>
        </div>
      </div>
    </div>
  );
};
