import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { useAppointment } from "../../hooks/useAppointment";
import { countries, months } from "../../utils/main";
import { useEffect, useState } from "react";
import { useFormValidations } from "../../hooks/useFormValidations";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

export function CustomersManager() {
  const { customers } = useAppointment();
  const [sortedCustomers, setSortedCustomers] = useState([]);

  useEffect(() => {
    sortCustomers("name-a");
  }, [customers]);

  const sortCustomers = (sortType) => {
    switch (sortType) {
      case "name-a":
        const sortedA = customers.toSorted((a, b) =>
          a.customerName.localeCompare(b.customerName)
        );
        setSortedCustomers(sortedA);
        break;

      case "name-z":
        const sortedZ = customers.toSorted((a, b) =>
          b.customerName.localeCompare(a.customerName)
        );
        setSortedCustomers(sortedZ);
        break;

      case "recent-date":
        const sortedRecent = customers.toSorted(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSortedCustomers(sortedRecent);
        break;

      case "oldest-date":
        const sortedOldest = customers.toSorted(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        setSortedCustomers(sortedOldest);
        break;

      default:
        setSortedCustomers(customers);
        break;
    }
  };

  return (
    <div>
      <div className="customers-list">
        <div className="customers-header">
          <h3>All customers</h3>
          <div>
            <label htmlFor="">Sort by:</label>
            <select
              name="sort-customers"
              defaultValue={"name-a"}
              onChange={(e) => sortCustomers(e.target.value)}
            >
              <option value="name-a">Name [A - Z]</option>
              <option value="name-z">Name [Z - A]</option>
              <option value="recent-date">Recent joined</option>
              <option value="oldest-date">Oldest joined</option>
            </select>
          </div>
        </div>
        {sortedCustomers.map((customer) => (
          <CustomerItem key={customer._id} customer={customer}></CustomerItem>
        ))}
      </div>
    </div>
  );
}

const CustomerItem = ({ customer }) => {
  const { formatDate, updateCustomer } = useAppointment();
  const [activeDetails, setActiveDetails] = useState(false);
  const [customerData, setCustomerData] = useState({
    phone: customer.phone ? customer.phone : "",
    email: customer.email ? customer.email : "",
    notes: customer.notes ? customer.notes : "",
  });
  const { validateCustomerEmail, validatePhone, validateForm, formError } =
    useFormValidations();
  const { userData } = useAuth();

  const getDate = (appointmentDate) => {
    const { month, date, year } = formatDate(appointmentDate);

    return `${months[month]} ${date}, ${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const container = e.target.parentNode;

    switch (name) {
      case "email":
        validateCustomerEmail(value);
        break;

      case "phone":
        const cleanedValue = value.replace(/\D/g, "");
        const location = container.querySelector("select")?.value;
        validatePhone(cleanedValue, location);
        setCustomerData({
          ...customerData,
          [name]: cleanedValue,
        });
        return;

      case "code":
        const phone = container.querySelector("input")?.value;
        validatePhone(phone, value);
        break;

      default:
        break;
    }

    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formIsValid = validateForm({
      customerEmail: customerData.email,
      phone: customerData.phone,
    });

    if (!formIsValid) return;

    const success = updateCustomer(customer._id, customerData);

    if (success) {
      toast.success("Customer updated successfully");
    } else {
      toast.error(error);
    }
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
        <form onSubmit={handleSubmit}>
          <div className="short-input">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={customerData.email}
              onChange={handleChange}
            />
            {formError && formError.input === "email" && (
              <span>{formError.message}</span>
            )}
          </div>
          <div className="short-input">
            <label>Phone:</label>
            <select
              id="code"
              name="code"
              defaultValue={userData?.location}
              onChange={handleChange}
            >
              {countries.map(
                (country) =>
                  country.code && (
                    <option key={country.code} value={country.code}>
                      {`${country.emoji} (${country.phoneCode})`}
                    </option>
                  )
              )}
            </select>
            <input
              id="phone"
              type="text"
              name="phone"
              value={customerData.phone}
              onChange={handleChange}
            />
            {formError && formError.input === "phone" && (
              <span>{formError.message}</span>
            )}
          </div>
          <div>
            <label>Notes:</label>
            <textarea
              name="notes"
              value={customerData.notes}
              onChange={handleChange}
            />
          </div>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};
