import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFormValidations } from "../hooks/useFormValidations";
import { MdError } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { signup, loading, error } = useAuth();
  const {
    validateName,
    validateBusinessName,
    validateEmail,
    validatePassword,
    validateForm,
    formError,
  } = useFormValidations();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIsValid = validateForm(formData);

    if (formIsValid) {
      const { success } = await signup(formData);
      if (success) navigate("/dashboard");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        validateName(value);
        break;
      case "businessName":
        validateBusinessName(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "password":
        validatePassword(value);
        break;
      default:
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          disabled={loading}
        />
        {formError && formError.input === "name" && (
          <span>{formError.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="businessName">Business Name:</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Enter your business name"
          disabled={loading}
        />
        {formError && formError.input === "businessName" && (
          <span>{formError.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={loading}
        />
        {formError && formError.input === "email" && (
          <span>{formError.message}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type={visiblePassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          disabled={loading}
        />
        <div className="toggle-password" onClick={togglePassword}>
          {visiblePassword ? <FaEyeSlash /> : <FaEye />}
        </div>
        {formError && formError.input === "password" && (
          <span>{formError.message}</span>
        )}
      </div>
      <button type="submit" className="signup-button" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
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
