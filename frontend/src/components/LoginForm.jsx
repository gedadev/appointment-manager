import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFormValidations } from "../hooks/useFormValidations";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { MdError } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { login, loading, error } = useAuth();
  const { validateEmail, validatePassword, formError, validateForm } =
    useFormValidations();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIsValid = validateForm({ email, password });

    if (formIsValid) {
      const { success } = await login(email, password);
      if (success) navigate("/dashboard");
    }
  };

  const handleEmail = (e) => {
    const email = e.target.value;
    validateEmail(email);
    setEmail(email);
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    validatePassword(password);
    setPassword(password);
  };

  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="email">
          <MdOutlineEmail />
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmail}
          placeholder="Enter your email"
        />
        {formError && formError.input === "email" && (
          <span>{formError.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">
          <MdOutlineLock />
        </label>
        <input
          type={visiblePassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={handlePassword}
          placeholder="Enter your password"
        />
        <div className="toggle-password" onClick={togglePassword}>
          {visiblePassword ? <FaEyeSlash /> : <FaEye />}
        </div>
        {formError && formError.input === "password" && (
          <span>{formError.message}</span>
        )}
      </div>
      <button type="submit" className="login-button" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && (
        <span>
          <MdError />
          {error}
        </span>
      )}
    </form>
  );
}
