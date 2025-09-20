import "../styles/Dashboard.css";
import { Header } from "../components/Dashboard/Header";
import { Outlet } from "react-router-dom";
import { Summary } from "../components/Dashboard/Summary";

export function Dashboard() {
  return (
    <main className="dashboard">
      <section className="appointment-section">
        <Header />
        <Summary />
        <Outlet />
      </section>
    </main>
  );
}
