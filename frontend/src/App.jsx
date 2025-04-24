import "./styles/App.css";
import { AuthProvider } from "./context/AuthProvider";
import AppRouter from "./router/Router";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
