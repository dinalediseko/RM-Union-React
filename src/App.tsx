import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import HeroEnvelope from "./sections/HeroEnvelope";
import PhotoSection from "./sections/PhotoSection";
import TimelineSection from "./sections/TimelineSection";
import CountdownSection from "./sections/CountdownSection";
import RSVPSection from "./sections/RSVPSection";
import EventDetailsSection from "./sections/EventDetailsSection";
import GiftRegistrySection from "./sections/GiftRegistrySection";
import FAQSection from "./sections/FAQSection";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function App() {
  const [revealed, setRevealed] = useState(false);

  // 🎵 GLOBAL AUDIO (persists across entire app)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const photoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (revealed) {
      const timer = setTimeout(() => {
        photoRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [revealed]);

  return (
    <div className="min-h-screen bg-wedding-cream">
      {/* 🎵 GLOBAL AUDIO ELEMENT */}
      <audio ref={audioRef} src="/reveal-song.mp3" preload="auto" />

      {/* Hero */}
      <AnimatePresence>
        {!revealed && (
          <HeroEnvelope onReveal={handleReveal} audioRef={audioRef} />
        )}
      </AnimatePresence>

      {/* Main Invite */}
      <AnimatePresence>
        {revealed && (
          <motion.main
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: premiumEase,
            }}
            className="min-h-screen flex justify-center"
          >
            <div className="w-full max-w-md sm:w-[92%] bg-wedding-taupe min-h-screen sm:min-h-0 sm:rounded-2xl sm:my-8 sm:shadow-soft-md overflow-hidden">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
              >
                <PhotoSection ref={photoRef} />
                <TimelineSection />
                <CountdownSection />
                <RSVPSection />
                <EventDetailsSection />
                <GiftRegistrySection />
                <FAQSection />
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
