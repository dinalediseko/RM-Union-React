import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Baby,
  Home,
  Utensils,
  Hotel,
  Phone,
  Hash,
} from "lucide-react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

const faqItems = [
  {
    id: "kids",
    question: "Are children welcome?",
    icon: Baby,
    answer:
      "While we love your little ones, our wedding will be an adults-only celebration. We hope this gives parents a well-deserved evening off to dance and celebrate with us.",
  },
  {
    id: "venue",
    question: "What type of venue is it?",
    icon: Home,
    answer:
      "Sebjeng is an open-air rural venue surrounded by the beautiful landscapes of Ga-Molepo. The ceremony and reception will take place outdoors under a elegant marquee, so please dress accordingly.",
  },
  {
    id: "food",
    question: "What will be served?",
    icon: Utensils,
    answer:
      "We will be serving a traditional South African feast with a modern twist. A variety of dietary needs can be accommodated — please let us know in your RSVP if you have any requirements.",
  },
  {
    id: "hashtag",
    question: "What is the hashtag we can use?",
    icon: Hash,
    answer:
      `Share your moments with us using #RamyWedsMamps.

      We can’t wait to see your memories.`,
  },
  {
    id: "accommodation",
    question: "Where can I stay?",
    icon: Hotel,
    answer: `SleepOver Moria — Boyne Moria (17 min, 18.4 km)

Reros Apartments — Mankweng (Turfloop) (27 min, 30.8 km)

Sea Water Boutique Lodge — Mankweng Unit G (27 min, 30.8 km)

Park Inn by Radisson Polokwane — Polokwane (52 min, 56.3 km)

Garden Court Polokwane — Polokwane (52 min, 56.3 km)

Polokwane Royal — Polokwane (52 min, 56.3 km)`,
  },
  {
    id: "contact",
    question: "Who can I reach out to for further questions?",
    icon: Phone,
    contacts: [
      {
        name: "Ramy",
        number: "27617431172",
        display: "+27 61 743 1172",
      },
      {
        name: "Mamphara",
        number: "27648028009",
        display: "+27 64 802 8009",
      },
    ],
  },
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <motion.section
      className="px-6 py-10 pb-16"
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
        <h2 className="font-script text-4xl text-wedding-text mb-2">
          Questions?
        </h2>
        <p className="text-wedding-accent text-xs tracking-[0.2em] uppercase font-serif">
          A few things you might be wondering
        </p>
      </div>

      {/* FAQ items */}
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-wedding-cream/60 rounded-xl border border-wedding-taupe/40 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: premiumEase,
            }}
          >
      

            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-wedding-cream/40 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className="w-4 h-4 text-wedding-accent flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="font-serif text-wedding-text text-sm text-left">
                  {item.question}
                </span>
              </div>
              <motion.div
                animate={{ rotate: openItem === item.id ? 180 : 0 }}
                transition={{ duration: 0.3, ease: premiumEase }}
              >
                <ChevronDown
                  className="w-4 h-4 text-wedding-accent flex-shrink-0"
                  strokeWidth={1.5}
                />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openItem === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: premiumEase }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0 pl-11">
                    {/* ✅ CONTACTS */}
                    {item.contacts ? (
                      <div className="space-y-2 text-sm font-serif text-wedding-text/80">
                        {item.contacts.map((person, i) => (
                          <p key={i}>
                            {person.name}:{" "}
                            <a
                              href={`https://wa.me/${person.number}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-wedding-accent underline"
                            >
                              {person.display}
                            </a>
                          </p>
                        ))}
                      </div>
                    ) : (
                      /* ✅ DEFAULT ANSWER */
                      <p className="text-wedding-text/80 text-sm leading-relaxed font-serif whitespace-pre-line">
                        {item.answer}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
      >
        <div className="mx-auto w-8 h-px bg-wedding-accent/30 mb-4" />
        <p className="font-script text-2xl text-wedding-text mb-2">
          See you there!
        </p>
        <p className="text-wedding-accent text-xs tracking-[0.15em] uppercase font-serif">
          Ramy & Mamphara
        </p>
      </motion.div>
    </motion.section>
  );
}
