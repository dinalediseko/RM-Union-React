import { motion } from 'framer-motion';

const premiumEase = [0.22, 1, 0.36, 1] as const;

export default function CoverSection() {
  return (
    <motion.section
      className="relative py-12 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: premiumEase }}
    >
      {/* Decorative top element */}
      <motion.div
        className="mx-auto w-12 h-px bg-wedding-accent/40 mb-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: premiumEase, delay: 0.2 }}
      />

      <motion.p
        className="text-wedding-accent text-xs tracking-[0.3em] uppercase font-serif mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
      >
        Together with our families, we invite you to celebrate our wedding
      </motion.p>

      {/* Names in script */}
      <motion.h1
        className="font-script text-6xl sm:text-7xl text-wedding-text leading-tight mb-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4, ease: premiumEase }}
      >
        Ramy
      </motion.h1>

      <motion.span
        className="font-script text-3xl text-wedding-accent block mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6, ease: premiumEase }}
      >
        &
      </motion.span>

      <motion.h1
        className="font-script text-6xl sm:text-7xl text-wedding-text leading-tight mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: premiumEase }}
      >
        Mamphara
      </motion.h1>

      {/* Date */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7, ease: premiumEase }}
      >
        <div className="w-8 h-px bg-wedding-accent/30" />
        <p className="font-serif text-lg text-wedding-text tracking-wide">
          Saturday, Twenty-Sixth of September
        </p>
        <p className="font-serif text-3xl text-wedding-text font-medium">
          26 Sept 2026
        </p>
        <div className="w-8 h-px bg-wedding-accent/30" />
      </motion.div>
    </motion.section>
  );
}
