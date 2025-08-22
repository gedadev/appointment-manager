import { useEffect, useState } from "react";
import { ProfileContext } from "./ProfileContext";
import { useAuth } from "../hooks/useAuth";
import { useApi } from "../hooks/useApi";
import { useFormValidations } from "../hooks/useFormValidations";
import { workingHoursMock } from "../utils/main";
import toast from "react-hot-toast";

export const ProfileProvider = ({ children }) => {
  const { userData, getUserData } = useAuth();
  const { endpoints, request } = useApi();
  const {
    validateBusinessName,
    validateEmail,
    validatePhone,
    formError,
    validateGeneralInfo,
  } = useFormValidations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generalData, setGeneralData] = useState();
  const [hoursData, setHoursData] = useState();
  const [formChanged, setFormChanged] = useState(false);
  const [validHours, setValidHours] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  useEffect(() => {
    const formData = { ...generalData, workingHours: { ...hoursData } };
    const isFormChanged = JSON.stringify(formData) !== JSON.stringify(userData);

    setFormChanged(isFormChanged);
  }, [generalData, hoursData, userData]);

  useEffect(() => {
    if (userData) {
      setGeneralData(userData);
      setHoursData(
        userData.workingHours ? userData.workingHours : workingHoursMock
      );
    }
  }, [userData]);

  useEffect(() => {
    const validateHours = () => {
      const hoursAreValid = Object.entries(hoursData).map(([day, hours]) => {
        const { start, end } = hours;
        const timeToMinutes = (timeStr) => {
          const [hours, minutes] = timeStr.split(":").map(Number);
          return hours * 60 + minutes;
        };

        if (!start) return [day, true];
        if (timeToMinutes(start) >= timeToMinutes(end)) return [day, false];
        return [day, true];
      });

      setValidHours(Object.fromEntries(hoursAreValid));
    };

    hoursData && validateHours();
  }, [hoursData]);

  const getHoursObject = (e) => {
    const form = e.target.closest("form");

    const inputs = [...form.elements].filter(
      (input) => input.tagName === "SELECT"
    );

    const reducedValues = inputs.reduce((object, input) => {
      const day = input.name.split("-")[0];
      const hours = Object.hasOwn(object, day)
        ? [...object[day], input.value]
        : [input.value];

      return { ...object, [day]: hours };
    }, {});

    const formattedValues = Object.entries(reducedValues).map(
      ([day, values]) => {
        const startHour = values.slice(0, 3);
        const endHour = values.slice(3, 6);

        const formatTo24 = ([hour, minute, period]) => {
          const hour24 = period === "AM" ? hour : Number(hour) + 12;
          return `${hour24}:${minute}`;
        };

        const hours = {
          start: formatTo24(startHour),
          end: formatTo24(endHour),
        };
        return [day, hours];
      }
    );

    const hoursObject = Object.fromEntries(formattedValues);

    return { ...workingHoursMock, ...hoursObject };
  };

  const resetDay = (day) =>
    setHoursData({ ...hoursData, [day]: { start: null, end: null } });

  const handleHoursChange = (e) => {
    const hoursObject = getHoursObject(e);
    setHoursData(hoursObject);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const location = userData && userData.location;

    switch (name) {
      case "businessEmail":
        validateEmail(value);
        break;
      case "phone":
        validatePhone(value, location);
        break;
      case "businessName":
        validateBusinessName(value);
        break;
      default:
        break;
    }
    setGeneralData({ ...generalData, [name]: value });
  };

  const updateUser = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const { success } = await request(endpoints.user.profile, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (success) await getUserData();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = userData && userData.location;
    const formIsValid = validateGeneralInfo(generalData, location);
    const hoursAreValid = Object.values(validHours).reduce(
      (isValid, hour) => isValid && hour,
      true
    );
    if (!formIsValid || !hoursAreValid) {
      toast.error("Invalid data");
      return;
    }

    const data = { ...generalData, workingHours: { ...hoursData } };
    const { success } = await updateUser(data);

    if (success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(error);
    }
  };

  const value = {
    generalData,
    hoursData,
    validHours,
    handleSubmit,
    handleChange,
    handleHoursChange,
    resetDay,
    updateUser,
    getHoursObject,
    formChanged,
    loading,
    error,
    formError: formError,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
