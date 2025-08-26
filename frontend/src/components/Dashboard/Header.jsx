import { useState } from "react";
import { FiFilePlus } from "react-icons/fi";
import { AppointmentModal } from "../AppointmentModal";

export function Header() {
  const [activeModal, setActiveModal] = useState(false);

  const toggleModal = () => setActiveModal(!activeModal);

  return (
    <header className="header">
      <div>
        <h1>Dashboard</h1>
        <p>Manage your business appointments with ease.</p>
      </div>
      <button className="new-appointment-button" onClick={toggleModal}>
        New Appointment <FiFilePlus />
      </button>
      <AppointmentModal activeModal={activeModal} toggleModal={toggleModal} />
    </header>
  );
}
