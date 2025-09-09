import { useState } from "react";
import { useAppointment } from "../../hooks/useAppointment";
import { FiFilter, FiSearch } from "react-icons/fi";

export function AppointmentFilters() {
  const { handleAppointmentFilters } = useAppointment();
  const [activeFilters, setActiveFilters] = useState(false);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    handleAppointmentFilters(name, value);
  };

  return (
    <div className="filters-container">
      <div className="search-bar">
        <FiSearch />
        <input
          type="search"
          placeholder="Search customer..."
          name="search"
          onChange={handleSearch}
        />
      </div>
      <div className="filters" onClick={() => setActiveFilters(!activeFilters)}>
        <FiFilter />
      </div>
      <FiltersMenu activeFilters={activeFilters} />
    </div>
  );
}

const FiltersMenu = ({ activeFilters }) => {
  const { handleAppointmentFilters } = useAppointment();

  const handleFilters = (e) => {
    const { type, name, checked } = e.target;

    if (type !== "checkbox") return;

    const filterName = e.target.closest(".filter-name").id;
    handleAppointmentFilters(filterName, name, checked);
  };

  return (
    <div
      className="filters-menu"
      style={
        activeFilters
          ? { opacity: "1", transform: "translateY(0)", pointerEvents: "all" }
          : {
              opacity: "0",
              transform: "translateY(-20%)",
              pointerEvents: "none",
            }
      }
      onClick={handleFilters}
    >
      <div className="filter-name" id="status">
        <span>Status:</span>
        <div>
          <input type="checkbox" id="pending" name="pending" />
          <label htmlFor="pending">Pending</label>
        </div>
        <div>
          <input type="checkbox" id="confirmed" name="confirmed" />
          <label htmlFor="confirmed">Confirmed</label>
        </div>
        <div>
          <input type="checkbox" id="cancelled" name="cancelled" />
          <label htmlFor="cancelled">Cancelled</label>
        </div>
        <div>
          <input type="checkbox" id="completed" name="completed" />
          <label htmlFor="completed">Completed</label>
        </div>
      </div>
      <div className="filter-name" id="date">
        <span>Date:</span>
        <div>
          <input type="checkbox" id="today" name="today" />
          <label htmlFor="today">Today</label>
        </div>
        <div>
          <input type="checkbox" id="tomorrow" name="tomorrow" />
          <label htmlFor="tomorrow">Tomorrow</label>
        </div>
        <div>
          <input type="checkbox" id="this-week" name="this-week" />
          <label htmlFor="this-week">This week</label>
        </div>
        <div>
          <input type="checkbox" id="next-week" name="next-week" />
          <label htmlFor="next-week">Next week</label>
        </div>
      </div>
      <div className="filter-name" id="time">
        <span>Time:</span>
        <div>
          <input type="checkbox" id="morning" name="morning" />
          <label htmlFor="morning">Morning</label>
        </div>
        <div>
          <input type="checkbox" id="afternoon" name="afternoon" />
          <label htmlFor="afternoon">Afternoon</label>
        </div>
        <div>
          <input type="checkbox" id="evening" name="evening" />
          <label htmlFor="evening">Evening</label>
        </div>
      </div>
    </div>
  );
};
