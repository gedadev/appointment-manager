import { useAppointment } from "../../hooks/useAppointment";
import { months } from "../../utils/main";

export function CustomersManager() {
  const { customers } = useAppointment();

  return (
    <div>
      <div className="customers-list">
        <h3>All customers</h3>
        {customers.map((customer) => (
          <CustomerItem key={customer._id} customer={customer}></CustomerItem>
        ))}
      </div>
    </div>
  );
}

const CustomerItem = ({ customer }) => {
  const { formatDate } = useAppointment();

  const getDate = (appointmentDate) => {
    const { month, date, year } = formatDate(appointmentDate);

    return `${months[month]} ${date}, ${year}`;
  };

  return (
    <div className="customer-item">
      <div className="customer-data">
        <div>
          <h4>Name</h4>
          <p>{customer.customerName}</p>
        </div>
        <div>
          <h4>Client since</h4>
          <p>{getDate(customer.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
