import { useEffect, useRef } from 'react'
import { CalendarPlus, CalendarDays } from 'lucide-react'

// --- EVENT CONFIGURATION ---
// Update these details with your actual wedding information
const eventDetails = {
  title: 'Save the Date',
  description: 'We cannot wait to celebrate our special day with you!',
  // Dates must be in the format YYYYMMDDTHHMMSSZ (UTC time)
  // Example: 20261010T140000Z is Oct 10, 2026 at 14:00 UTC
  startDate: '20260926T000000Z', 
  endDate: '20260926T000000Z',   
}

export default function AddToCalendar() {
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

  // 1. Generate Google Calendar URL
  const googleParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventDetails.title,
    details: eventDetails.description,
    dates: `${eventDetails.startDate}/${eventDetails.endDate}`,
  })
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?${googleParams.toString()}`

  // 2. Generate Apple/Outlook ICS Data URL
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDetails.startDate}
DTEND:${eventDetails.endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
END:VEVENT
END:VCALENDAR`

  const icsUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`

  return (
    <section 
      ref={sectionRef}
      className="fade-in-up max-w-md mx-auto px-4"
    >
      {/* Calendar Card */}
      <div className="relative bg-cream rounded-2xl p-8 shadow-card border-2 border-maroon overflow-hidden">
        {/* Decorative envelope/calendar graphic 
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" className="text-sepedi-blue">
            <path 
              d="M10 30 L50 60 L90 30" 
              stroke="currentColor" 
              strokeWidth="3"
              fill="none"
            />
            <path 
              d="M10 30 L10 80 Q10 90 20 90 L80 90 Q90 90 90 80 L90 30" 
              stroke="currentColor" 
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>
        */}

        {/* Content */}
        <div className="relative z-10">
          {/* Text */}
          <p className="text-cream-dark font-serif text-base leading-relaxed text-center mb-8">
            We can't wait to celebrate our big day! Save the date to your calendar so you don't miss a moment.
          </p>

          {/* Calendar Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Google Calendar Button */}
            <a 
              href={googleCalendarUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn flex items-center gap-2 px-6 py-2 rounded-full bg-orange border-2 border-orange text-cream-light hover:bg-cream-light hover:text-orange transition-all duration-300"
              aria-label="Add to Google Calendar"
            >
              <CalendarPlus className="w-5 h-5" />
              <span className="font-medium text-sm">Google</span>
            </a>

            {/* Apple/Outlook Button */}
            <a 
              href={icsUrl} 
              download="wedding-save-the-date.ics"
              className="social-btn flex items-center gap-2 px-6 py-2 rounded-full bg-orange border-2 border-orange text-cream-light hover:bg-cream-light hover:text-orange transition-all duration-300"
              aria-label="Download Apple/Outlook Calendar Event"
            >
              <CalendarDays className="w-5 h-5" />
              <span className="font-medium text-sm">Apple</span>
            </a>
          </div>
        </div>

        {/* Decorative bottom flourish - Sepedi themed 
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
            <path 
              d="M0 10 Q25 0, 50 10 T100 10" 
              stroke="#FFC107" 
              strokeWidth="2" 
              fill="none"
              opacity="0.7"
            />
          </svg>
        </div>
        */}
      </div>
    </section>
  )
}
