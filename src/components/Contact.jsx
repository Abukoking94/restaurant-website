import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
    return (
      <ScrollReveal>
    <section className="bg-gray-900 text-gray-100 py-16 px-6 rounded-3xl shadow-lg mt-0 mb-0">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400"
        >
          Contact Us
        </motion.h2>
        <p className="text-gray-300 text-lg">
          📍 Addis Ababa, Ethiopia ☎ +251 900 000 000 ✉ hello@deliciousbites.com
        </p>
        <iframe
          src="https://maps.google.com/maps?q=Addis%20Ababa&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-64 rounded-2xl shadow-md"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
            </section>
            </ScrollReveal>
  );
}
