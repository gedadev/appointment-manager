import { useState } from "react";
import {
  FiClock,
  FiFilePlus,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { AppointmentModal } from "../AppointmentModal";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const [activeModal, setActiveModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  const toggleModal = () => setActiveModal(!activeModal);

  const toggleMenu = () => setActiveMenu(!activeMenu);

  return (
    <header className="header">
      <div>
        <h1>Dashboard</h1>
        <p>Manage your business appointments with ease.</p>
      </div>
      <div className="header-buttons">
        <button className="new-appointment-button" onClick={toggleModal}>
          New Appointment <FiFilePlus />
        </button>
        <button className="settings-button" onClick={toggleMenu}>
          <FiSettings />
        </button>
        <HeaderMenu activeMenu={activeMenu} />
      </div>
      <AppointmentModal activeModal={activeModal} toggleModal={toggleModal} />
    </header>
  );
}

const HeaderMenu = ({ activeMenu }) => {
  const { logout } = useAuth();

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
        <Link to={"/profile"}>
          <li>
            <FiUser />
            My Profile
          </li>
        </Link>
        <Link to={"/profile/hours"}>
          <li>
            <FiClock />
            Manage Working Hours
          </li>
        </Link>
        <Link to={"/"} onClick={logout}>
          <li>
            <FiLogOut />
            Logout
          </li>
        </Link>
      </ul>
    </div>
  );
};
