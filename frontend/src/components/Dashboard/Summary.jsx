import { AppointmentFilters } from "./AppointmentFilters";
import { NextAppointments } from "./NextAppointments";

export function Summary() {
  return (
    <div className="summary-section">
      <div className="summary-container"></div>
      <AppointmentFilters />
      <NextAppointments />
    </div>
  );
}
