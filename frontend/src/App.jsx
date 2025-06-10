import "./styles/App.css";
import { AuthProvider } from "./context/AuthProvider";
import AppRouter from "./router/Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
