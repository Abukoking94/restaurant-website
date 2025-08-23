import React from "react";
import EventCard from "./EventCard";
import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";

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

export default function EventList() {
  return (
    <ScrollReveal>
      <section className="relative py-12 px-6 md:px-12 lg:px-24 bg-gray-900 overflow-hidden">
        {/* Floating Golden Particles */}
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute w-3 h-3 bg-yellow-400 rounded-full opacity-30"
              animate={{
                x: [0, Math.random() * 500 - 250, 0],
                y: [0, Math.random() * 200 - 100, 0],
                scale: [1, Math.random() + 0.5, 1],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(2px) drop-shadow(0 0 4px #fbbf24)",
              }}
            />
          ))}
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-10 text-center relative z-10">
          Upcoming Events
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {eventsData.map((event) => (
            <motion.div
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </ScrollReveal>
  );
}
