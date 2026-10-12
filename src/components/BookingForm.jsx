import React, { useState } from "react";

function BookingForm() {
  const [formData, setFormData] = useState({ from: "", to: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [showTickets, setShowTickets] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Security: sanitize inputs
  const sanitizeInput = (value) =>
    value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: sanitizeInput(e.target.value) });
  };

  // 🔹 Telemetry logger
  const logTelemetry = (action) => {
    console.log(`[Analytics] User interacted with Frequent Flyer Portal - ${action}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Empty state check
    if (!formData.from || !formData.to || !formData.date) {
  setError("Please fill all fields");
  return;
}


    setLoading(true);

    // ✅ Simulate slow network
    setTimeout(() => {
      logTelemetry("Flight Booking Submit");
      setTickets((prev) => [
        ...prev,
        { id: prev.length + 1, from: formData.from, to: formData.to, date: formData.date },
      ]);
      setFormData({ from: "", to: "", date: "" });
      setLoading(false);
    }, 2000);
  };

  // 🔹 View Tickets handler
  const handleViewTickets = () => {
    logTelemetry("View Tickets");
    setShowTickets(true);
  };

  // 🔹 Logout handler
  const handleLogout = () => {
    logTelemetry("Logout");
    alert("You have been logged out successfully!");
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "32px", backgroundColor: "#f9f9f9", color: "#333" }}>
      <h2>Frequent Flyer Portal ✈️</h2>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} aria-label="Flight booking form">
        <input
          name="from"
          value={formData.from}
          onChange={handleChange}
          aria-label="From city"
          style={{ borderColor: !formData.from ? "red" : "#ccc", marginBottom: "8px" }}
        />
        <input
          name="to"
          value={formData.to}
          onChange={handleChange}
          aria-label="To city"
          style={{ borderColor: !formData.to ? "red" : "#ccc", marginBottom: "8px" }}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          aria-label="Travel date"
          style={{ borderColor: !formData.date ? "red" : "#ccc", marginBottom: "8px" }}
        />
        <button type="submit" aria-label="Submit booking form">Submit</button>
      </form>

      {/* Error + Loading */}
      {error && <p>{error}</p>}
      {loading && <p>Loading... Please wait</p>}

      {/* Extra Buttons */}
      <div style={{ marginTop: "16px" }}>
        <button onClick={handleViewTickets} aria-label="View tickets">View Tickets</button>
        <button onClick={handleLogout} aria-label="Logout from portal">Logout</button>
      </div>

      {/* Tickets Section */}
      {showTickets && (
        <div style={{ marginTop: "16px" }}>
          <h3>Your Tickets</h3>
          {tickets.length === 0 ? (
            <p>No tickets found</p>
          ) : (
            <ul>
              {tickets.map((t) => (
                <li key={t.id}>Ticket #{t.id} — {t.from} → {t.to} — {t.date}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ✅ DoD Checklist Section */}
      <div style={{ marginTop: "32px", padding: "16px", backgroundColor: "#eee", borderRadius: "8px" }}>
      </div>
    </div>
  );
}

export default BookingForm;
