import { FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";
import { useAppointment } from "../../hooks/useAppointment";
import { AppointmentFilters } from "./AppointmentFilters";
import { NextAppointments } from "./NextAppointments";

export function Summary() {
  return (
    <div className="summary-section">
      <AppointmentSummary />
      <AppointmentFilters />
      <NextAppointments />
    </div>
  );
}

const AppointmentSummary = () => {
  const { getSummaryInfo } = useAppointment();
  const { lastMonthAppointments, upcomingAppointments, lastMonthRevenue } =
    getSummaryInfo();

  return (
    <div className="summary-container">
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
  );
};
