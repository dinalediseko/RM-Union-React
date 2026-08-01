import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const premiumEase = [0.22, 1, 0.36, 1] as const;

// Target: September 26, 2026
const WEDDING_DATE = new Date('2026-09-26T00:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <motion.section
      className="px-6 py-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: premiumEase }}
    >
      {/* Section header */}
      <div className="text-center mb-8">
        <motion.div
          className="mx-auto w-10 h-px bg-wedding-accent/40 mb-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: premiumEase }}
        />
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-wedding-accent" strokeWidth={1.5} />
          <p className="text-wedding-accent text-xs tracking-[0.2em] uppercase font-serif">
            Counting down to forever
          </p>
        </div>
        <h2 className="font-script text-4xl text-wedding-text">The Big Day</h2>
      </div>

      {/* Countdown grid */}
      <div className="grid grid-cols-4 gap-2">
        {timeBlocks.map((block, index) => (
          <motion.div
            key={block.label}
            className="bg-wedding-cream/60 rounded-xl p-3 text-center border border-wedding-taupe/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: premiumEase }}
          >
            <motion.span
              className="block font-serif text-2xl sm:text-3xl text-wedding-text font-medium"
              key={block.value}
              initial={{ opacity: 0.6, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {String(block.value).padStart(2, '0')}
            </motion.span>
            <span className="text-wedding-accent text-[10px] tracking-wider uppercase font-serif">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Date reminder */}
      <motion.p
        className="text-center mt-6 text-wedding-text/70 text-sm font-serif"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: premiumEase }}
      >
        26 September 2026
      </motion.p>
    </motion.section>
  );
}
