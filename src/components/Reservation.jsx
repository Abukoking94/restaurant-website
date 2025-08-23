import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useState } from "react";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "1",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email.";
    if (!form.date) newErrors.date = "Date is required.";
    if (!form.time) newErrors.time = "Time is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    console.log("Reservation submitted:", form);
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 11;
    const endHour = 22;
    for (let h = startHour; h <= endHour; h++) {
      ["00", "30"].forEach((m) =>
        slots.push(`${h.toString().padStart(2, "0")}:${m}`)
      );
    }
    return slots;
  };

  const today = new Date().toISOString().split("T")[0];

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <ScrollReveal>
      <section className="py-16  px-6 relative overflow-hidden rounded-3xl shadow-xl text-gray-100">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-indigo-900 to-pink-900 animate-gradient-x opacity-90 rounded-3xl"></div>
        <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Animated header & paragraph */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h2
              variants={{
                hidden: { y: 40, opacity: 0, scale: 0.9 },
                visible: {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    duration: 0.6,
                  },
                },
              }}
              className="text-3xl md:text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
            >
              Reserve Your Table
            </motion.h2>

            <motion.p
              variants={{
                hidden: { x: -30, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { type: "tween", duration: 0.6, ease: "easeOut" },
                },
              }}
              className="text-lg text-yellow-300/90"
            >
              Book your table online and enjoy an unforgettable dining
              experience.
            </motion.p>
          </motion.div>

          {!submitted ? (
            <motion.form
              className="flex flex-col md:flex-row flex-wrap gap-4 justify-center mt-6 backdrop-blur-md bg-black/30 p-6 rounded-3xl shadow-lg border border-white/10"
              onSubmit={handleSubmit}
              initial="hidden"
              animate="visible"
            >
              {[
                { name: "name", type: "text", placeholder: "Your Name" },
                { name: "email", type: "email", placeholder: "Your Email" },
                { name: "date", type: "date", placeholder: "", min: today },
                {
                  name: "time",
                  type: "select",
                  placeholder: "Select Time",
                  options: generateTimeSlots(),
                },
                {
                  name: "guests",
                  type: "select",
                  placeholder: "Guests",
                  options: [...Array(10)].map((_, i) => i + 1),
                },
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  className="flex-1 w-full md:w-auto"
                  custom={i}
                  variants={fieldVariants}
                >
                  {field.type === "select" ? (
                    <motion.select
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(255,255,255,0.6)",
                      }}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none bg-black/50 text-white border border-white/20"
                    >
                      <option value="">
                        {field.placeholder || "Select..."}
                      </option>
                      {field.options.map((opt) =>
                        typeof opt === "string" ? (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ) : (
                          <option key={opt} value={opt}>
                            {opt} Guest{opt > 1 ? "s" : ""}
                          </option>
                        )
                      )}
                    </motion.select>
                  ) : (
                    <motion.input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      min={field.min}
                      onChange={handleChange}
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(255,255,255,0.6)",
                      }}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none bg-black/50 text-white border border-white/20"
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-400 mt-1 text-sm">
                      {errors[field.name]}
                    </p>
                  )}
                </motion.div>
              ))}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-700 via-purple-400 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:brightness-110 transition"
              >
                Book Now
              </motion.button>
            </motion.form>
          ) : (
            <motion.p
              className="mt-6 text-xl font-semibold text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ✅ Your reservation has been submitted!
            </motion.p>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </ScrollReveal>
  );
}
