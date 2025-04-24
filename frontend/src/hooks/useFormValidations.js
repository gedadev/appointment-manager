import { useState } from "react";

export const useFormValidations = () => {
  const [formError, setFormError] = useState(null);

  const validateName = (name) => {
    if (!name) {
      setFormError({ message: "Enter your full name", input: "name" });
      return false;
    } else {
      setFormError(null);
      return true;
    }
  };

  const validateBusinessName = (businessName) => {
    if (!businessName) {
      setFormError({
        message: "Enter your business name",
        input: "businessName",
      });
      return false;
    } else {
      setFormError(null);
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;

    if (!email) {
      setFormError({ message: "Enter your email", input: "email" });
      return false;
    } else if (!emailRegex.test(email)) {
      setFormError({ message: "Enter a valid email", input: "email" });
      return false;
    } else {
      setFormError(null);
      return true;
    }
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const noSpaces = !/\s/.test(password);

    if (!password) {
      setFormError({ message: "Enter your password", input: "password" });
      return false;
    } else if (!noSpaces) {
      setFormError({
        message: "Password can't contain spaces",
        input: "password",
      });
      return false;
    } else if (!hasUpper || !hasLower || !hasNumber) {
      setFormError({
        message:
          "Password must contain a lower case letter, an upper case letter and a number",
        input: "password",
      });
      return false;
    } else if (!minLength) {
      setFormError({
        message: "Password must have at least 8 characters",
        input: "password",
      });
      return false;
    } else {
      setFormError(null);
      return true;
    }
  };

  const validateForm = (formData) => {
    const formIsValid = Object.entries(formData).reduce(
      (formIsValid, [name, value]) => {
        const entryIsValid = () => {
          switch (name) {
            case "name":
              return validateName(value);
            case "businessName":
              return validateBusinessName(value);
            case "email":
              return validateEmail(value);
            case "password":
              return validatePassword(value);
            default:
              break;
          }
        };

        return formIsValid && entryIsValid();
      },
      true
    );

    return formIsValid;
  };

  return {
    validateForm,
    validateEmail,
    validatePassword,
    validateName,
    validateBusinessName,
    formError,
  };
};
