import React from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function ReservationConfirmation({ formData, onClose }) {
  if (!formData) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Get window size for confetti
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Confetti effect */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={200}
        recycle={false}
        colors={["#10B981", "#FBBF24", "#F59E0B"]} // Emerald, gold, amber
      />

      {/* Overlay modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.85 }}
          className="bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden border border-gray-700"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
          >
            &times;
          </button>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold mb-4 text-center text-emerald-400 drop-shadow-lg"
          >
            🎉 Reservation Confirmed!
          </motion.h2>

          {/* Details List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 text-gray-100"
          >
            <motion.p variants={itemVariants}>
              <span className="font-semibold text-yellow-400">Name:</span>{" "}
              {formData.name || "N/A"}
            </motion.p>
            <motion.p variants={itemVariants}>
              <span className="font-semibold text-yellow-400">Email:</span>{" "}
              {formData.email || "N/A"}
            </motion.p>
            <motion.p variants={itemVariants}>
              <span className="font-semibold text-yellow-400">Phone:</span>{" "}
              {formData.phone || "N/A"}
            </motion.p>
            <motion.p variants={itemVariants}>
              <span className="font-semibold text-yellow-400">Guests:</span>{" "}
              {formData.guests || 1}
            </motion.p>
            <motion.p variants={itemVariants}>
              <span className="font-semibold text-yellow-400">Date:</span>{" "}
              {formData.date || "N/A"}
            </motion.p>
            <motion.p variants={itemVariants}>
              <span className="font-semibold text-yellow-400">Time:</span>{" "}
              {formData.time || "N/A"}
            </motion.p>
            <motion.p variants={itemVariants}>
              <span className="font-semibold text-yellow-400">Message:</span>{" "}
              {formData.message || "None"}
            </motion.p>
          </motion.div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 w-full bg-emerald-500 text-gray-900 py-2 rounded-lg hover:bg-emerald-600 shadow-lg font-semibold transition-all"
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
