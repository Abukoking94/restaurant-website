import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventCard({ event }) {
  const [quickView, setQuickView] = useState(false);

  const imageUrl =
    event.image ||
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80";

  // Lock scroll when modal is open
  useEffect(() => {
    if (quickView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // reset on unmount
    };
  }, [quickView]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-yellow-400/30"
      >
        {/* Event Image */}
        <div
          className="relative cursor-pointer"
          onClick={() => setQuickView(true)}
        >
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-52 object-cover rounded-t-3xl transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center text-yellow-400 font-semibold text-lg rounded-t-3xl">
            Quick View
          </div>
        </div>

        {/* Event Info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-yellow-400">
              {event.title}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {event.date} | {event.time}
            </p>
            <p className="text-gray-300 mt-2 line-clamp-2">
              {event.description}
            </p>
          </div>
          <button
            onClick={() => setQuickView(true)}
            className="mt-4 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-gray-900 py-2 px-4 rounded-2xl hover:from-yellow-300 hover:via-amber-200 hover:to-yellow-400 transition-all shadow-lg font-semibold"
          >
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setQuickView(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gray-900 text-gray-100 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-yellow-400/30 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setQuickView(false)}
                className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300 text-2xl font-bold"
              >
                &times;
              </button>
              <img
                src={imageUrl}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-yellow-400">
                  {event.title}
                </h2>
                <p className="text-gray-400">
                  {event.date} | {event.time}
                </p>
                <p className="text-gray-300">{event.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-gray-900 py-2 px-6 rounded-2xl shadow-lg font-semibold hover:from-yellow-300 hover:via-amber-200 hover:to-yellow-400 transition-all"
                  onClick={() => {
                    alert(`You have RSVP'd for "${event.title}"!`);
                    setQuickView(false);
                  }}
                >
                  RSVP / Book Event
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
