import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroEnvelopeProps {
  onReveal: () => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

export default function HeroEnvelope({
  onReveal,
  audioRef,
}: HeroEnvelopeProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // 🎞 Preload video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }

    const img = new Image();
    img.src = "/couple-photo.jpg";
  }, []);

  const handleStart = useCallback(() => {
    if (hasStarted) return;

    setHasStarted(true);

    // ▶️ Play video
    videoRef.current?.play();

    // 🎵 Play global audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1;

      audioRef.current.play().catch((err) => {
        console.log("Audio blocked:", err);
      });
    }

    // ⏳ Show card
    setTimeout(() => {
      setShowCard(true);
    }, 2500);

    // ⏳ Reveal full invite
    setTimeout(() => {
      onReveal();
    }, 7500);

  }, [hasStarted, onReveal, audioRef]);

  return (
    <div
      onClick={handleStart}
      className="fixed inset-0 z-50 bg-[#faf8f5] flex items-center justify-center cursor-pointer overflow-hidden"
    >
      {/* 🎬 VIDEO */}
      <motion.video
        ref={videoRef}
        src="/hero-video.mov"
        muted
        playsInline
        preload="auto"
        initial={{ opacity: 1 }}
        animate={{ opacity: showCard ? 0 : 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 💌 CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: showCard ? 1 : 0,
          y: showCard ? 0 : 40,
        }}
        transition={{
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute z-10 w-[85%] max-w-xs bg-[#dfdacf] rounded-xl shadow-lg p-6 text-center"
      >
        <p className="text-sm text-[#4d403a] mb-4 leading-relaxed">
          Together with our families, we invite you to celebrate our wedding
        </p>

        <h2 className="font-script text-3xl text-[#4d403a]">Ramy</h2>
        <span className="font-script text-xl text-[#a3968d]">&</span>
        <h2 className="font-script text-3xl text-[#4d403a] mb-4">
          Mamphara
        </h2>

        <p className="text-sm text-[#4d403a] mb-2">
          Saturday, Twenty-Sixth of September
        </p>

        <p className="text-sm text-[#4d403a] font-semibold">
          26 Sept 2026
        </p>
      </motion.div>

      {/* ↓ ARROW */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showCard ? 1 : 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-5 h-5 border-b-2 border-r-2 border-[#4d403a]/70 rotate-45"
        />
      </motion.div>

      {/* TAP */}
      {!hasStarted && (
        <div className="absolute bottom-10 text-[#4d403a] text-sm tracking-widest uppercase">
          Tap to open
        </div>
      )}
    </div>
  );
}