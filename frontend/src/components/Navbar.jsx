import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { FiFilePlus } from "react-icons/fi";
import { AppointmentModal } from "./AppointmentModal";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();
  const { userData, userIsLogged } = useAuth();

  const getName = () => (userData ? userData.name.split(" ")[0] : "pal");

  const toggleModal = () => setActiveModal(!activeModal);

  return (
    <div className="navbar">
      <div className="navbar-branding">
        <Link to={"/"}>Brand</Link>
      </div>
      {userIsLogged ? (
        <>
          <div
            className="user-menu-nav"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <p>{`Welcome, ${getName()}`}</p>
            <IoMdArrowDropdown />
          </div>
          <UserMenu activeMenu={activeMenu} toggleModal={toggleModal} />
          <AppointmentModal
            activeModal={activeModal}
            toggleModal={toggleModal}
          />
        </>
      ) : (
        <button className="login-button-nav" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </div>
  );
}

function UserMenu({ activeMenu, toggleModal }) {
  const { logout } = useAuth();

  return (
    <nav
      className="dropdown-menu"
      style={{
        top: `${activeMenu ? "100%" : "-100%"}`,
        opacity: `${activeMenu ? "1" : "0"}`,
        pointerEvents: `${activeMenu ? "all" : "none"}`,
      }}
    >
      <ul>
        <button className="new-appointment-button" onClick={toggleModal}>
          New Appointment <FiFilePlus />
        </button>
        <Link to={"/profile"}>
          <li>
            Profile <CgProfile />
          </li>
        </Link>
        <Link to={"/dashboard"}>
          <li>
            Dashboard <MdDashboard />
          </li>
        </Link>
        <Link to={"/"} onClick={logout}>
          <li>
            Logout <CiLogout />
          </li>
        </Link>
      </ul>
    </nav>
  );
}
