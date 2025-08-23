"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://picsum.photos/id/1035/1200/800",
  "https://picsum.photos/id/1043/1200/800",
];

const FALLBACK_URL = "https://picsum.photos/seed/fallback/1200/800";

export default function Advanced3DCarousel({
  images = DEFAULT_IMAGES,
  autoPlay = true,
  interval = 3000, // faster auto-slide
  showArrows = true,
  showDots = true,
}) {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const len = images.length || 0;

  const next = () => setCurrent((p) => (p + 1) % len);
  const prev = () => setCurrent((p) => (p - 1 + len) % len);

  // autoplay with smooth transitions
  useEffect(() => {
    if (!autoPlay || paused || len < 2) return;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % len);
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, len]);

  // mouse wheel navigation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) next();
      else if (e.deltaY < 0) prev();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onDrag = (_, info) => setDragX(info.point.x);
  const onDragEnd = (_, info) => {
    const t = 80;
    if (info.offset.x < -t) next();
    else if (info.offset.x > t) prev();
    setDragX(0);
  };

  return (
    <div
      ref={ref}
      className="relative w-full max-w-6xl mx-auto overflow-hidden select-none
                 h-[65vw] max-h-[30rem] md:h-[28rem] rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] 
                 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 "
      style={{ perspective: "1600px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => {
        const offset = i - current;
        const isActive = i === current;
        const dragOffset = offset + dragX / 300;

        return (
          <motion.div
            key={i + src}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            style={{ zIndex: isActive ? 10 : 5, willChange: "transform" }}
            drag="x"
            dragElastic={0.2}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            initial={false}
            animate={{
              x: dragOffset * (isActive ? 330 : 260),
              scale: isActive ? 1 : 0.78,
              rotateY: -20 * dragOffset,
              opacity: Math.abs(offset) > 2 ? 0 : 1,
              filter: isActive ? "brightness(1)" : "brightness(0.75) blur(1px)",
            }}
            transition={{
              type: "spring",
              stiffness: 180, // softer spring
              damping: 25, // smoother settling
              mass: 0.65,
            }}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className="w-[75vw] max-w-[30rem] h-[55vw] max-h-[25rem] md:w-[38rem] md:h-[24rem] object-cover rounded-3xl"
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== FALLBACK_URL) img.src = FALLBACK_URL;
              }}
            />
          </motion.div>
        );
      })}

      {/* Arrows */}
      {showArrows && len > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-3 md:left-6 -translate-y-1/2
                       p-2 md:p-3 rounded-full bg-black/40 backdrop-blur-md
                       text-white hover:bg-white/20 z-20 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-3 md:right-6 -translate-y-1/2
                       p-2 md:p-3 rounded-full bg-black/40 backdrop-blur-md
                       text-white hover:bg-white/20 z-20 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && len > 1 && (
        <div className="absolute bottom-5 w-full flex justify-center gap-3 z-20">
          {images.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3.5 h-3.5 rounded-full transition-all ${
                current === idx
                  ? "bg-yellow-400 scale-110 shadow-md shadow-yellow-500/50"
                  : "bg-gray-500/70 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.4 }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
