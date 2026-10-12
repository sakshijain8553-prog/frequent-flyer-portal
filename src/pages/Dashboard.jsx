import React, { useState } from "react";
import BookingForm from "../components/BookingForm";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h2>Welcome, Sakshi 👋</h2>
      <button onClick={() => setShowForm(true)}>Book Flight</button>

      {showForm && <BookingForm />}
    </div>
  );
}

export default Dashboard;
