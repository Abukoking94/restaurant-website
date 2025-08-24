import React, { useState } from "react";
import ReservationForm from "../components/Reservation/ReservationForm";
import ReservationConfirmation from "../components/Reservation/ReservationConfirmation";
import { motion, AnimatePresence } from "framer-motion";

export default function Reservations() {
  const [formData, setFormData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Handle form submission
  const handleReservationSubmit = (data) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  // Close confirmation modal
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setFormData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-700 min-h-screen py-12 px-4 md:px-12 lg:px-24"
    >
      {/* Header */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold text-center mb-8 inline-block bg-gradient-to-r from-black/20 via-yellow-400 to-black/10 bg-clip-text text-transparent animate-[shimmer_2s_infinite] tracking-wide"
      >
        Make a Reservation
      </motion.h1>

      {/* Form container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700"
      >
        <ReservationForm onSubmit={handleReservationSubmit} />
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700"
            >
              <ReservationConfirmation
                formData={formData}
                onClose={handleCloseConfirmation}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
