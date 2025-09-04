import { FiFilter, FiSearch } from "react-icons/fi";
import { useAppointment } from "../../hooks/useAppointment";

export function AppointmentFilters() {
  const { searchCustomer } = useAppointment();

  const handleSearch = (e) => {
    const { value } = e.target;
    searchCustomer(value);
  };

  return (
    <div className="filters-container">
      <div className="search-bar">
        <FiSearch />
        <input
          type="search"
          placeholder="Search customer..."
          onChange={handleSearch}
        />
      </div>
      <div className="filters">
        <FiFilter />
      </div>
    </div>
  );
}
