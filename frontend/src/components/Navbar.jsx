import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IoMdArrowDropdown } from "react-icons/io";

export function Navbar() {
  const navigate = useNavigate();
  const { userData, userIsLogged } = useAuth();

  const getName = () => (userData ? userData.name.split(" ")[0] : null);

  return (
    <div className="navbar">
      <div className="navbar-branding">Brand</div>
      {userIsLogged ? (
        <div className="user-menu-nav">
          <p>{`Welcome, ${getName()}`}</p>
          <IoMdArrowDropdown />
        </div>
      ) : (
        <button className="login-button-nav" onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </div>
  );
}
