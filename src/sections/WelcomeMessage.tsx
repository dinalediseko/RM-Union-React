import { useEffect, useRef } from "react";

export default function WelcomeMessage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="fade-in-up max-w-lg mx-auto px-4 text-center"
    >
      {/* Heading */}
      <h2 className="font-script text-5xl text-maroon mb-8">
        Dear Family & Friends
      </h2>

      {/* Main message */}
      <p className="text-maroon font-serif text-lg leading-relaxed mb-6">
        Join us to celebrate.
      </p>

      {/* Secondary message */}
      <p className="text-maroon/80 font-serif text-base leading-relaxed">
        More details to follow.
      </p>

      {/* Decorative divider - Sepedi themed */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <div className="w-12 h-1 bg-orange" />
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="text-maroon"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="currentColor"
          />
        </svg>
        <div className="w-12 h-1 bg-orange" />
      </div>
    </section>
  );
}
