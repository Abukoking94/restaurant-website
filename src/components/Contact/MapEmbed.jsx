export default function MapEmbed() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-3xl mx-auto">
      <div className="relative h-80 md:h-96">
        <iframe
          title="Map"
          className="absolute inset-0 w-full h-full rounded-2xl"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.039979730884!2d38.787!3d9.010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b2b2b2b2b2%3A0x0!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1680000000000"
        ></iframe>
      </div>
    </div>
  );
}
