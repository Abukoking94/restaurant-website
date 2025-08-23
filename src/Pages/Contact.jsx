import ContactForm from "../components/Contact/ContactForm";
import MapEmbed from "../components/Contact/MapEmbed";

export default function ContactSection() {
  return (
    <section className="px-4 py-12 bg-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <div className="flex justify-center">
          <ContactForm />
        </div>

        {/* Map */}
        <div className="flex justify-center">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
