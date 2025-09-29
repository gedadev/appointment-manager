import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiFilePlus,
  FiFileText,
  FiLogOut,
  FiSettings,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { AppointmentModal } from "../AppointmentModal";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MdDashboard } from "react-icons/md";

export function Header() {
  const [activeModal, setActiveModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  const toggleModal = () => setActiveModal(!activeModal);

  const toggleMenu = () => setActiveMenu(!activeMenu);

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === "Escape") {
        setActiveMenu(false);
        setActiveModal(false);
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <header className="header">
      <Link to={"/"}>
        <div className="brand">
          <span>
            <FiCalendar />
          </span>
          <h3>AppointmentPro</h3>
        </div>
      </Link>
      <div className="header-buttons">
        <button className="new-appointment-button" onClick={toggleModal}>
          New Appointment <FiFilePlus />
        </button>
        <button className="settings-button" onClick={toggleMenu}>
          <FiSettings />
        </button>
        <HeaderMenu activeMenu={activeMenu} toggleMenu={toggleMenu} />
      </div>
      <AppointmentModal activeModal={activeModal} toggleModal={toggleModal} />
    </header>
  );
}

const HeaderMenu = ({ activeMenu, toggleMenu }) => {
  const { logout } = useAuth();

  const menuItems = [
    { url: "/profile", icon: <FiUser />, label: "My Profile" },
    { url: "/dashboard", icon: <MdDashboard />, label: "Dashboard" },
    { url: "/profile/hours", icon: <FiClock />, label: "Manage Working Hours" },
    {
      url: "/dashboard/appointments",
      icon: <FiFileText />,
      label: "Manage Appointments",
    },
    {
      url: "/dashboard/customers",
      icon: <FiUsers />,
      label: "Manage Customers",
    },
    { url: "/", icon: <FiLogOut />, label: "Logout" },
  ];

  const handleClick = (e) => {
    const { target } = e;

    if (target.textContent === "Logout") logout();
    toggleMenu();
  };

  return (
    <div
      className="header-menu"
      style={
        activeMenu
          ? { opacity: "1", transform: "translateY(0)", pointerEvents: "all" }
          : {
              opacity: "0",
              transform: "translateY(-10%)",
              pointerEvents: "none",
            }
      }
    >
      <span>Your Settings</span>
      <ul>
        {menuItems.map((item) => (
          <Link key={item.label} to={item.url} onClick={handleClick}>
            <li>
              {item.icon}
              {item.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
