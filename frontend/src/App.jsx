import "./styles/App.css";
import { AuthProvider } from "./context/AuthProvider";
import AppRouter from "./router/Router";
import { Toaster } from "react-hot-toast";
import { AppointmentProvider } from "./context/AppointmentProvider";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <AppointmentProvider>
        <AppRouter />
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
