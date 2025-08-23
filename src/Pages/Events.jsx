import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const eventsData = [
  {
    id: 1,
    title: "Live Jazz Night",
    date: "Aug 25, 2025",
    time: "7:00 PM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhfDJ8fGphemp8ZW58MHx8fHwxNjg4NTQwNDAy&ixlib=rb-4.0.3&q=80&w=600",
    description:
      "Enjoy a night of smooth jazz with our live band while savoring gourmet dishes. Perfect for music lovers.",
  },
  {
    id: 2,
    title: "Wine Tasting Evening",
    date: "Sep 10, 2025",
    time: "6:00 PM - 9:00 PM",
    image:
      "https://plus.unsplash.com/premium_photo-1682097091093-dd18b37764a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Sample premium wines paired with selected appetizers. Learn from expert sommeliers and enjoy exclusive wine selections.",
  },
  {
    id: 3,
    title: "Chef’s Special Dinner",
    date: "Sep 20, 2025",
    time: "7:30 PM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhfDJ8fGZpbmUgZGVzaG58ZW58MHx8fHwxNjg4NTQwNTU1&ixlib=rb-4.0.3&q=80&w=600",
    description:
      "Indulge in our chef’s exclusive menu crafted with seasonal ingredients. Each course is thoughtfully designed to delight.",
  },
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-gray-900 relative text-gray-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
        Upcoming Events
      </h2>

      {/* Golden Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, idx) => (
          <motion.div
            key={idx}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: "linear-gradient(45deg, #FFD700, #FFA500)",
              boxShadow: "0 0 10px #FFD700",
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {eventsData.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
          >
            <div
              className="relative cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 via-transparent to-transparent w-full p-4">
                <h3 className="text-xl text-yellow-400 font-bold">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {event.date} | {event.time}
                </p>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <p className="text-gray-300 mb-4 line-clamp-3">
                {event.description}
              </p>
              <button
                onClick={() => setSelectedEvent(event)}
                className="mt-auto bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-gray-900 py-2 px-4 rounded-lg hover:from-yellow-500 hover:via-amber-500 hover:to-yellow-600 transition-all shadow-md font-semibold"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-800 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl relative text-gray-100"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 text-gray-300 hover:text-yellow-400 text-2xl font-bold"
              >
                &times;
              </button>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-yellow-400">
                  {selectedEvent.title}
                </h2>
                <p className="text-gray-300">
                  {selectedEvent.date} | {selectedEvent.time}
                </p>
                <p className="text-gray-200">{selectedEvent.description}</p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-gray-900 py-2 px-6 rounded-lg shadow-lg font-semibold hover:from-yellow-500 hover:via-amber-500 hover:to-yellow-600 transition-all"
                  onClick={() => {
                    alert(`You have RSVP'd for "${selectedEvent.title}"!`);
                    setSelectedEvent(null);
                  }}
                >
                  RSVP / Book Event
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
