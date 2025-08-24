import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <ScrollReveal>
      <section className="relative h-[90vh] md:h-[95vh] flex items-center justify-center overflow-hidden mt-0 mb-0">
        {/* Background Image with darker gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            y: y1,
            backgroundImage:
              "url('https://source.unsplash.com/1600x900/?gourmet,food,restaurant')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/90 to-black/50"></div>
        </motion.div>

        {/* Floating Food Icons */}
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(15)].map((_, idx) => {
            const size = Math.random() * 24 + 24; // 24px–48px
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const foodIcons = [
              "https://img.icons8.com/color/48/plate.png",
              "https://img.icons8.com/color/48/burger.png",
              "https://img.icons8.com/color/48/pizza.png",
              "https://img.icons8.com/color/48/sushi.png",
              "https://img.icons8.com/color/48/cake.png",
            ];

            return (
              <motion.img
                key={idx}
                src={foodIcons[idx % foodIcons.length]}
                className="absolute"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  bottom: 0,
                }}
                animate={{
                  y: [-20, -120, -20],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-0">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg "
          >
            🍽️ Welcome to Golden Eats
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-100 mb-8 max-w-2xl drop-shadow-md"
          >
            Experience the best traditional and modern dishes crafted with love
            and the freshest ingredients.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <Link
              to="/menu"
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-red-600 transition shadow-lg transform hover:scale-105 motion-reduce:transform-none"
            >
              View Menu
            </Link>
            <Link
              to="/reservations"
              className="px-6 py-3 bg-white text-yellow-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg transform hover:scale-105 motion-reduce:transform-none"
            >
              Book a Table
            </Link>
          </motion.div>
        </div>

        {/* Decorative Steam/Glow at bottom */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
          {[...Array(8)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute w-2 h-12 rounded-full bg-gradient-to-t from-yellow-400 via-yellow-200/70 to-transparent"
              style={{
                left: `${10 + idx * 12}%`,
                bottom: 0,
                opacity: Math.random() * 0.6 + 0.4,
              }}
              animate={{
                y: [0, -80, 0],
                scaleX: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: idx * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
