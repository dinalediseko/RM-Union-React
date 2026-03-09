import { useEffect, useRef } from 'react'

export default function InvitationCard() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="fade-in-up max-w-md mx-auto px-4"
    >
      {/* Decorative Frame Card */}
      <div className="decorative-frame bg-cream">
        {/* Monogram
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full border-3 border-sepedi-yellow flex items-center justify-center bg-sepedi-cream">
            <span className="font-script text-2xl text-sepedi-blue">R&M</span>
          </div>
        </div> 
        */}

        {/* Names */}
        <div className="text-center mb-6">
          <h2 className="font-script text-5xl text-maroon mb-1">
            Ramy
          </h2>
          <span className="font-script text-3xl text-maroon block my-1">
            &
          </span>
          <h2 className="font-script text-5xl text-maroon">
            Mamphara
          </h2>
        </div>

        {/* Announcement Text */}
        <p className="text-center text-cream-dark font-serif text-sm leading-relaxed mb-8 px-4">
          We're getting married!<br />
          Save the date for our special day
        </p>

        {/* Date */}
        <div className="flex justify-center items-center gap-4">
          <div className="text-center">
            <span className="block font-serif text-2xl text-maroon font-medium">26</span>
          </div>
          <div className="w-px h-12 bg-maroon" />
          <div className="text-center">
            <span className="block font-serif text-2xl text-maroon font-medium">September</span>
          </div>
          <div className="w-px h-12 bg-maroon" />
          <div className="text-center">
            <span className="block font-serif text-2xl text-maroon font-medium">2026</span>
          </div>
        </div>

        {/* Decorative bottom element - Sepedi themed */}
        <div className="flex justify-center mt-6">
          <svg width="100" height="24" viewBox="0 0 100 24" fill="none">
            <path 
              d="M0 12 Q25 0, 50 12 T100 12" 
              stroke="#5e2a25" 
              strokeWidth="2" 
              fill="none"
            />
            <circle cx="50" cy="12" r="5" fill="#5e2a25" />
            <circle cx="25" cy="8" r="3" fill="#a85530" />
            <circle cx="75" cy="16" r="3" fill="#5e2a25" />
          </svg>
        </div>
      </div>
    </section>
  )
}
