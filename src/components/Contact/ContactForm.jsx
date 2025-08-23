import { useState } from "react";
import ScrollReveal from "../ScrollReveal";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-gray-800 text-yellow-400 p-6 rounded-3xl shadow-2xl text-center w-full max-w-lg mx-auto">
        ✅ Thanks! We will get back to you shortly.
      </div>
    );
  }

  return (
    <ScrollReveal>
      <form
        onSubmit={submit}
        className="bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-lg w-full mx-auto space-y-6 border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Contact Us
        </h2>

        <div>
          <label className="block font-semibold text-yellow-300 mb-2">
            Name
          </label>
          <input
            className="w-full p-4 rounded-2xl border border-gray-700 bg-gray-800 text-yellow-100 placeholder-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-yellow-300 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full p-4 rounded-2xl border border-gray-700 bg-gray-800 text-yellow-100 placeholder-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Your email"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-yellow-300 mb-2">
            Message
          </label>
          <textarea
            className="w-full p-4 rounded-2xl border border-gray-700 bg-gray-800 text-yellow-100 placeholder-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all min-h-[140px]"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Write your message here..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all"
        >
          Send Message
        </button>
      </form>
    </ScrollReveal>
  );
}
