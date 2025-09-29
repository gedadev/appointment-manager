import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { useAppointment } from "../../hooks/useAppointment";
import { months } from "../../utils/main";
import { useState } from "react";

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
  const [activeDetails, setActiveDetails] = useState(false);

  const getDate = (appointmentDate) => {
    const { month, date, year } = formatDate(appointmentDate);

    return `${months[month]} ${date}, ${year}`;
  };

  return (
    <div className="customer-item">
      <div className="customer-data">
        <div>
          <h4>{customer.customerName}</h4>
        </div>
        <div>
          <h4>Client since</h4>
          <p>{getDate(customer.createdAt)}</p>
        </div>
      </div>
      <div
        className="see-details"
        onClick={() => setActiveDetails(!activeDetails)}
      >
        {activeDetails ? (
          <span>
            Hide customer details <FiChevronsUp />
          </span>
        ) : (
          <span>
            See customer details <FiChevronsDown />
          </span>
        )}
      </div>
      <div
        className="customer-details"
        style={{
          opacity: activeDetails ? "1" : "0",
          transform: activeDetails ? "scaleY(1)" : "scaleY(0)",
          maxHeight: activeDetails ? "100rem" : "0",
          marginTop: activeDetails ? "0.5rem" : "0",
        }}
      >
        <form>
          <div className="short-input">
            <label>Email:</label>
            <input type="text" name="email" value={customer.email} />
          </div>
          <div className="short-input">
            <label>Phone:</label>
            <input type="text" name="phone" value={customer.phone} />
          </div>
          <div>
            <label>Notes:</label>
            <textarea name="notes">{customer.notes}</textarea>
          </div>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};
