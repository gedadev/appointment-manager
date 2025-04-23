import { useState } from "react";
import "../styles/Login.css";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back!</h1>
        <p>Login to your account to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <MdOutlineEmail />
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <MdOutlineLock />
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
