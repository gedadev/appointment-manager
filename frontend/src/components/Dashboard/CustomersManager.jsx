import { useAppointment } from "../../hooks/useAppointment";

export function CustomersManager() {
  const { customers } = useAppointment();

  return <>{console.log(customers)}</>;
}
