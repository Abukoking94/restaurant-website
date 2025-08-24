import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function AboutUs() {
  return (
    <ScrollReveal>
      <section className="bg-gray-900 text-gray-100 py-20 px-6 rounded-3xl shadow-lg relative overflow-hidden mt-0 mb-0">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_#facc15,_transparent_40%),radial-gradient(circle_at_bottom_right,_#10b981,_transparent_40%)]"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
              About Us
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Welcome to{" "}
              <span className="text-emerald-400 font-semibold">
                Golden Eats
              </span>
              ! We blend{" "}
              <span className="text-yellow-400">authentic recipes</span>,
              <span className="text-pink-400"> fresh ingredients</span>, and{" "}
              <span className="text-blue-400">passion</span> to create meals
              that bring people together. Every dish is crafted to spark
              connection, joy, and unforgettable memories.
            </p>

            {/* Highlight Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/70 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-gray-700"
              >
                <h3 className="text-xl font-bold text-emerald-400">
                  Our Mission
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  To serve happiness through food that’s fresh, flavorful, and
                  made with love.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/70 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-gray-700"
              >
                <h3 className="text-xl font-bold text-yellow-400">
                  Our Values
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Quality, authenticity, and community are at the heart of
                  everything we do.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Delicious dish"
              className="rounded-3xl shadow-2xl w-full max-w-md mx-auto object-cover"
              animate={{
                scale: [1, 1.05, 1],
                x: [0, 10, 0], // horizontal float
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </section>
    </ScrollReveal>
  );
}
