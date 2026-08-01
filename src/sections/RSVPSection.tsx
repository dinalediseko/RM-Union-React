import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, UserPlus, Mail, User, Send } from "lucide-react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

type RSVPStatus = "idle" | "accepts" | "declines" | "submitted";

export default function RSVPSection() {
  // SET THIS TO FALSE TO CLOSE THE RSVP
  const IS_RSVP_OPEN = false;

  const [status, setStatus] = useState<RSVPStatus>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/.netlify/functions/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          plusOne,
          plusOneName: plusOne ? plusOneName : null,
          status: "accepts",
        }),
      });

      if (res.ok) {
        setStatus("submitted");
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setName("");
    setEmail("");
    setPlusOne(false);
    setPlusOneName("");
  };

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
        <h2 className="font-script text-4xl text-wedding-text mb-2">RSVP</h2>
        <p className="text-wedding-accent text-xs tracking-[0.2em] uppercase font-serif">
          {IS_RSVP_OPEN ? "Please respond by 31 July, 2026" : "RSVPs are now closed"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* RSVP CLOSED MESSAGE */}
        {!IS_RSVP_OPEN ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: premiumEase }}
            className="text-center py-8"
          >
            <p className="font-script text-3xl text-wedding-text mb-3">
              Thank You!
            </p>
            <p className="text-wedding-accent text-sm font-serif leading-relaxed mb-6">
              We are thankful for all the love and support. If you need to make an urgent update to your response, please reach out to our designated points of contact detailed in the FAQ.
            </p>
          </motion.div>
        ) : (
          /* ALL EXISTING FORM LOGIC (Only renders if IS_RSVP_OPEN is true) */
          <>
            {/* Initial choice buttons */}
            {status === "idle" && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="space-y-3"
              >
                <button
                  onClick={() => setStatus("accepts")}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-wedding-cream/80 rounded-xl border border-wedding-taupe/50 hover:bg-wedding-cream hover:border-wedding-accent/40 transition-all duration-300 group"
                >
                  <Check
                    className="w-5 h-5 text-wedding-accent group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <span className="font-serif text-wedding-text tracking-wide">
                    Graciously Accepts
                  </span>
                </button>

                <button
                  onClick={() => setStatus("declines")}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-wedding-cream/60 rounded-xl border border-wedding-taupe/50 hover:bg-wedding-cream hover:border-wedding-accent/40 transition-all duration-300 group"
                >
                  <X
                    className="w-5 h-5 text-wedding-accent/70 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <span className="font-serif text-wedding-text/70 tracking-wide">
                    Respectfully Declines
                  </span>
                </button>
              </motion.div>
            )}

            {/* Accepts form */}
            {status === "accepts" && (
              <motion.form
                key="accepts-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name input */}
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wedding-accent"
                    strokeWidth={1.5}
                  />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-wedding-cream/60 rounded-xl border border-wedding-taupe/50 text-wedding-text placeholder:text-wedding-accent/50 font-serif text-sm focus:outline-none focus:border-wedding-accent/60 transition-colors"
                  />
                </div>

                {/* Email input */}
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wedding-accent"
                    strokeWidth={1.5}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-wedding-cream/60 rounded-xl border border-wedding-taupe/50 text-wedding-text placeholder:text-wedding-accent/50 font-serif text-sm focus:outline-none focus:border-wedding-accent/60 transition-colors"
                  />
                </div>

                {/* Plus One toggle */}
                <button
                  type="button"
                  onClick={() => setPlusOne(!plusOne)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                    plusOne
                      ? "bg-wedding-cream border-wedding-accent/50"
                      : "bg-wedding-cream/40 border-wedding-taupe/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserPlus
                      className="w-4 h-4 text-wedding-accent"
                      strokeWidth={1.5}
                    />
                    <span className="font-serif text-sm text-wedding-text">
                      Bringing a plus one?
                    </span>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full transition-colors duration-300 ${plusOne ? "bg-wedding-accent" : "bg-wedding-taupe/50"} relative`}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ left: plusOne ? "20px" : "4px" }}
                      transition={{ duration: 0.3, ease: premiumEase }}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {plusOne && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: premiumEase }}
                      className="overflow-hidden"
                    >
                      <input
                        type="text"
                        placeholder="Plus one name"
                        value={plusOneName}
                        onChange={(e) => setPlusOneName(e.target.value)}
                        className="w-full px-4 py-3 bg-wedding-cream/60 rounded-xl border border-wedding-taupe/50 text-wedding-text placeholder:text-wedding-accent/50 font-serif text-sm focus:outline-none focus:border-wedding-accent/60 transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-wedding-text rounded-xl text-wedding-cream font-serif tracking-wide hover:bg-wedding-dark transition-colors duration-300 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                  {loading ? "Sending..." : "Send RSVP"}
                </button>

                {/* Back button */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full text-wedding-accent text-xs font-serif tracking-wide hover:text-wedding-text transition-colors"
                >
                  Go back
                </button>
              </motion.form>
            )}

            {/* Declines message */}
            {status === "declines" && (
              <motion.div
                key="declines"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="text-center py-8"
              >
                <p className="font-script text-3xl text-wedding-text mb-3">
                  We&apos;ll miss you!
                </p>
                <p className="text-wedding-accent text-sm font-serif leading-relaxed mb-6">
                  Thank you for letting us know. We appreciate your love and support
                  from afar, and we&apos;ll raise a glass to you on our special day.
                </p>
                <button
                  onClick={handleReset}
                  className="text-wedding-accent text-xs font-serif tracking-wide hover:text-wedding-text transition-colors underline underline-offset-4"
                >
                  Change your response
                </button>
              </motion.div>
            )}

            {/* Success state */}
            {status === "submitted" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: premiumEase }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-wedding-cream border border-wedding-taupe/50 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Check
                    className="w-7 h-7 text-wedding-accent"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h3 className="font-script text-3xl text-wedding-text mb-2">
                  Thank You!
                </h3>
                <p className="text-wedding-accent text-sm font-serif leading-relaxed">
                  Your RSVP has been received. We can&apos;t wait to celebrate with
                  you!
                </p>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
}