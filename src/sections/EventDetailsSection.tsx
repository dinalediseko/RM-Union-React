import { motion } from 'framer-motion';
import { MapPin, Shirt, Calendar, Clock } from 'lucide-react';

const premiumEase = [0.22, 1, 0.36, 1] as const;

const eventDetails = [
  {
    icon: Calendar,
    label: 'Date',
    value: 'Saturday, 26 September 2026',
  },
  {
    icon: Clock,
    label: 'Time',
    value: 'Ceremony begins at 12:00',
  },
  {
    icon: MapPin,
    label: 'Venue',
    value: 'Sebjeng, Ga-Molepo',
    subtext: 'The exact location will be disclosed to confirmed guests',
  },
  {
    icon: Shirt,
    label: 'Dress Code',
    value: 'Modern Tradition',
    subtext: 'Elegant fusion of contemporary and cultural attire',
  },
];

export default function EventDetailsSection() {
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
        <h2 className="font-script text-4xl text-wedding-text mb-2">Event Details</h2>
        <p className="text-wedding-accent text-xs tracking-[0.2em] uppercase font-serif">
          Everything you need to know
        </p>
      </div>

      {/* Details grid */}
      <div className="space-y-4">
        {eventDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            className="flex items-start gap-4 p-4 bg-wedding-cream/60 rounded-xl border border-wedding-taupe/40"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: premiumEase }}
          >
            <div className="w-10 h-10 rounded-lg bg-wedding-taupe/50 flex items-center justify-center flex-shrink-0">
              <detail.icon className="w-4 h-4 text-wedding-accent" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-wedding-accent text-[10px] tracking-[0.2em] uppercase font-serif mb-1">
                {detail.label}
              </p>
              <p className="text-wedding-text font-serif text-sm font-medium">
                {detail.value}
              </p>
              {detail.subtext && (
                <p className="text-wedding-accent/80 text-xs font-serif mt-0.5">
                  {detail.subtext}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
