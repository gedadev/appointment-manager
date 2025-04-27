import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState(false);
  const navigate = useNavigate();
  const { userData, userIsLogged } = useAuth();

  const getName = () => (userData ? userData.name.split(" ")[0] : "pal");

  return (
    <div className="navbar">
      <div className="navbar-branding">Brand</div>
      {userIsLogged ? (
        <>
          <div
            className="user-menu-nav"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <p>{`Welcome, ${getName()}`}</p>
            <IoMdArrowDropdown />
          </div>
          <UserMenu activeMenu={activeMenu} />
        </>
      ) : (
        <button className="login-button-nav" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </div>
  );
}

function UserMenu({ activeMenu }) {
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
        <Link to={"/dashboard"}>
          <li>
            Dashboard <MdDashboard />
          </li>
        </Link>
        <Link to={""}>
          <li>
            Profile <CgProfile />
          </li>
        </Link>
        <Link to={""}>
          <li>
            Logout <CiLogout />
          </li>
        </Link>
      </ul>
    </nav>
  );
}
