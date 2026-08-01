import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const options = [
  {
    id: "yuppiechef",
    title: "Yuppiechef Registry",
    content: "View our curated registry online.",
    link: "https://www.yuppiechef.com/registry.htm?action=view&uuid=71439a51-37fe-44a1-a69d-1be8b59d605a",
  },
  {
    id: "lecreuset",
    title: "Le Creuset Registry",
    content: "View our curated registry online.",
    link: "https://www.myregistry.com/wedding-registry/ramy-mashiane-and-mamphara-molepo-midrand-gauteng/5338786/giftlist",
  },
  {
    id: "carrolboyes",
    title: "Carrol Boyes Registry",
    content: "View our curated registry online.",
    link: "https://carrolboyes.com/za/gift-registry/view/gift/2623/weddinggift.html",
  },
  {
    id: "bank",
    title: "Bank Transfer",
    content: `Bank: CAPITEC
Account Name: Ramy & Mamphara
Account Number: 1752548920
Reference: Your Name`,
    suggestions: ["R500", "R1000", "R1500", "R2000"],
  },
  {
    id: "custom",
    title: "Custom Gifts",
    content:
      "If you would prefer to bless us in your own special way, we would be truly grateful.",
  },
];

export default function GiftRegistrySection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="px-6 py-12 text-center">
      <h2 className="font-script text-4xl text-wedding-text mb-4">
        Gift Registry
      </h2>

      <p className="text-wedding-text/80 text-sm font-serif mb-8 max-w-xs mx-auto">
        Your presence is the greatest gift. Should you wish to bless us further,
        you may explore the options below.
      </p>

      <div className="space-y-3">
        {options.map((item) => (
          <div key={item.id}>
            {/* OPTION BUTTON */}
            <button
              onClick={() => setOpen(open === item.id ? null : item.id)}
              className="w-full text-left p-4 rounded-xl border border-wedding-taupe/50 bg-wedding-cream/60"
            >
              <span className="font-serif text-sm text-wedding-text tracking-wide">
                {item.title}
              </span>
            </button>

            {/* EXPAND */}
            <AnimatePresence>
              {open === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: premiumEase }}
                  className="px-4 pt-3 pb-4"
                >
                  <p className="text-sm text-wedding-text/80 font-serif mb-3 whitespace-pre-line">
                    {item.content}
                  </p>

                  {item.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.suggestions.map((amount, i) => (
                        <button
                          key={i}
                          className="px-3 py-1.5 text-xs font-serif text-wedding-accent 
                   border border-wedding-accent/40 rounded-full 
                   bg-transparent hover:bg-wedding-accent/10 
                   transition-colors duration-300"
                        >
                          {amount}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Optional link */}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      className="text-wedding-accent text-sm underline"
                    >
                      Open registry →
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
