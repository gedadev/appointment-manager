import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-branding">Brand</div>
      <button className="login-button-nav" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
}
