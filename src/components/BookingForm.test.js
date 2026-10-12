import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

describe("BookingForm Component", () => {
  test("shows error if fields are empty", () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit booking form/i }));
    expect(screen.getByText(/please fill all fields/i)).toBeTruthy();
  });

  test("shows loading indicator on submit", () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/from city/i), { target: { value: "Delhi" } });
    fireEvent.change(screen.getByLabelText(/to city/i), { target: { value: "Mumbai" } });
    fireEvent.change(screen.getByLabelText(/travel date/i), { target: { value: "2026-10-14" } });
    fireEvent.click(screen.getByRole("button", { name: /submit booking form/i }));
    expect(screen.getByText(/loading... please wait/i)).toBeTruthy();
  });

  test("adds ticket dynamically after submit", async () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/from city/i), { target: { value: "Delhi" } });
    fireEvent.change(screen.getByLabelText(/to city/i), { target: { value: "Mumbai" } });
    fireEvent.change(screen.getByLabelText(/travel date/i), { target: { value: "2026-10-14" } });
    fireEvent.click(screen.getByRole("button", { name: /submit booking form/i }));

    // wait for ticket to appear
    setTimeout(() => {
      expect(screen.getByText(/Delhi → Mumbai/i)).toBeTruthy();
    }, 2000);
  });
});
