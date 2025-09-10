import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { FiArrowRight, FiCalendar, FiFilePlus, FiMenu } from "react-icons/fi";
import { AppointmentModal } from "./AppointmentModal";

export function Navbar() {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);

    setIsMobile(window.innerWidth <= 640 ? true : false);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-branding">
        <div className="brand">
          <span>
            <FiCalendar />
          </span>
          <h3>AppointmentPro</h3>
        </div>
      </div>
      {isMobile ? <MobileMenu /> : <NavbarMenu />}
    </div>
  );
}

const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <>
      <div
        className="mobile-menu-button"
        onClick={() => setActiveMenu(!activeMenu)}
      >
        <FiMenu />
      </div>
      <div
        className="navbar-mobile-menu"
        style={{
          top: `${activeMenu ? "100%" : "-20%"}`,
          opacity: `${activeMenu ? "1" : "0"}`,
          pointerEvents: `${activeMenu ? "all" : "none"}`,
        }}
      >
        <NavbarMenu />
      </div>
    </>
  );
};

const NavbarMenu = () => {
  const { userData, userIsLogged } = useAuth();
  const [activeModal, setActiveModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const navigate = useNavigate();

  const getName = () => (userData ? userData.name.split(" ")[0] : "pal");

  const toggleModal = () => setActiveModal(!activeModal);

  return (
    <div className="navbar-menu">
      <div className="navbar-menu-links">
        <ul>
          <Link>
            <li>Features</li>
          </Link>
          <Link>
            <li>Pricing</li>
          </Link>
          <Link>
            <li>View Demo</li>
          </Link>
        </ul>
      </div>
      <div className="menu-button">
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
          <button
            className="login-button-nav"
            onClick={() => navigate("/login")}
          >
            Welcome back <FiArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

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
