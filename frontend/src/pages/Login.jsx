import "../styles/Login.css";
import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back!</h1>
        <p>Login to your account to continue</p>
        <LoginForm />
        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
