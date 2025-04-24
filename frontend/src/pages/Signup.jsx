import { SignupForm } from "../components/SignupForm";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Create Account</h1>
        <p>Sign up to get started with your business</p>
        <SignupForm />
        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
