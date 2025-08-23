import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReservationConfirmation from "./ReservationConfirmation";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    if (!formData.phone.trim()) errs.phone = "Phone is required";
    if (!formData.date) errs.date = "Select a date";
    if (!formData.time) errs.time = "Select a time";
    if (formData.guests < 1) errs.guests = "Guests must be at least 1";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setShowConfirmation(true);
    }
  };

  return (
    <section
      className="py-16 px-6 md:px-12 lg:px-24 bg-gray-900 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10">
        <h2 className="text-5xl md:text-4xl font-bold text-yellow-400 mb-10 text-center drop-shadow-lg">
          Book Your Table
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-700"
        >
          {[
            { label: "Name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
            { label: "Phone", type: "tel", name: "phone" },
            { label: "Guests", type: "number", name: "guests", min: 1 },
            { label: "Date", type: "date", name: "date" },
            { label: "Time", type: "time", name: "time" },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="mb-1 font-medium text-yellow-300">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                min={field.min}
                value={formData[field.name]}
                onChange={handleChange}
                className="border border-gray-600 rounded-3xl p-3 bg-gray-900 text-gray-100 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none"
              />
              {errors[field.name] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium text-yellow-400">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="border border-gray-600 rounded-2xl p-3 bg-gray-900 text-gray-100 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="text-gray-700 py-3 px-8 rounded-4xl bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-300
             hover:from-emerald-500 hover:via-yellow-500 hover:to-amber-400
             shadow-lg font-semibold transition-all"
            >
              Reserve Table
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <ReservationConfirmation
            formData={formData}
            onClose={() => setShowConfirmation(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
