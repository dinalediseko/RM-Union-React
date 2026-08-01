import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart } from "lucide-react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const timelineItems = [
  {
    id: "how-we-met",
    title: "How We Met",
    icon: Heart,
    content: `We met in the most beautiful and unexpected way — at church, in a place filled with faith, hope, and purpose. What started as a simple encounter grew into something truly special. From the very beginning, there was something about us that felt different, calm, genuine, and full of warmth. Through shared smiles, quiet moments, and conversations that felt effortless, our connection deepened in a way only God could have planned.

Who would have thought that  meeting at church would lead us to our wedding day? Today, we are deeply grateful for that special moment, because it marked the beginning of our forever.`,
  },
  {
    id: "first-date",
    title: "First Date",
    icon: Heart,
    content: `Our first date is something we will never forget. We were both a bit nervous more than we expected but the moment we saw each other, everything else faded. We couldn’t help but be drawn in, captivated by the connection we felt and the quiet ease that settled between us.

There was a natural grace and calm in how we carried ourselves, a gentle confidence that made the moment feel special and rare. Our nerves slowly turned into admiration, and that admiration grew into something deeper as we spent more time together.

That day, even without fully realising it, our hearts had already started choosing each other.`,
  },
  {
    id: "the-proposal",
    title: "The Proposal",
    icon: Heart,
    content: `The wedding proposal took place on a beautiful afternoon at a beach in Durban. Under the guise of taking pictures as we walked along the shore, I walked slightly behind her, after the ring was slipped into my hand. A few strides later, as she turned back, there I was, down on one knee, asking this beautiful soul to marry me.

In utter awe and shock, filled with joyful screams and excitement, I asked her to make me the happiest man alive by marrying me… and she said yes!!!`,
  },
];

export default function TimelineSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <motion.section
      className="px-6 py-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} // smoother trigger
      transition={{ duration: 0.8, ease: premiumEase }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="mx-auto w-10 h-px bg-wedding-accent/40 mb-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: premiumEase }}
        />
        <h2 className="font-script text-4xl text-wedding-text mb-2">
          Our Love Story
        </h2>
        <p className="text-wedding-accent text-xs tracking-[0.2em] uppercase font-serif">
          A journey of love, laughter, and forever
        </p>
        <p className="text-center text-wedding-accent italic mt-6">
          Be part of the next chapter
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {timelineItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
              ease: premiumEase,
            }}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 bg-wedding-cream/60 rounded-xl border border-wedding-taupe/50 hover:bg-wedding-cream transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className="w-4 h-4 text-wedding-accent"
                  strokeWidth={1.5}
                />
                <span className="font-serif text-wedding-text text-sm tracking-wide">
                  {item.title}
                </span>
              </div>

              <motion.div
                animate={{ rotate: openItem === item.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  className="w-4 h-4 text-wedding-accent"
                  strokeWidth={1.5}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: premiumEase }}
                  className="px-4 pb-4 pt-2"
                >
                  {item.content.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-wedding-text/80 text-sm leading-relaxed font-serif mb-3"
                    >
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
