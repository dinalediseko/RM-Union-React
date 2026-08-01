import { motion } from "framer-motion";
import { forwardRef } from "react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const PhotoSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <motion.section
      ref={ref}
      className="px-4 py-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: premiumEase }}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-soft">
        <motion.img
          src="/couple-photo.jpeg"
          alt="Ramy and Mamphara"
          className="w-full h-auto object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: premiumEase }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-wedding-taupe/30 to-transparent pointer-events-none" />
      </div>

      <motion.p
        className="text-center mt-4 text-wedding-accent text-sm italic font-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
      >
        "Love is composed of a single soul inhabiting two bodies."
      </motion.p>
    </motion.section>
  );
});

PhotoSection.displayName = "PhotoSection"; // fixes devtools + TS quirks

export default PhotoSection;