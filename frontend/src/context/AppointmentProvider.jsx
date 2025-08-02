import { AppointmentContext } from "./AppointmentContext";

export const AppointmentProvider = ({ children }) => {
  const value = {};

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
