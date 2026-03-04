import { useEffect, useRef } from 'react'

export default function Calendar() {
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

  // Calendar data for June 2025
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const days = [
    { day: 30 },
    { day: 31 },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26, highlighted: true },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
  ]

  return (
    <section 
      ref={sectionRef}
      className="fade-in-up max-w-sm mx-auto px-4"
    >
      {/* Calendar Container */}
      <div className="bg-sepedi-cream rounded-2xl p-6 shadow-card border-2 border-sepedi-yellow">
        {/* Month and Year */}
        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl text-sepedi-blue font-medium">
            Sept 2026
          </h3>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div 
              key={day} 
              className="text-center text-xs font-sans text-sepedi-pink py-2 font-medium"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((item, index) => (
            <div 
              key={index}
              className={`calendar-day ${
                item.highlighted 
                  ? 'highlighted' 
                  : 'text-sepedi-blue hover:bg-sepedi-yellow/20'
              }`}
            >
              {item.highlighted ? (
                <div className="relative">
                  <span>{item.day}</span>
                  <svg 
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              ) : (
                item.day
              )}
            </div>
          ))}
        </div>

        {/* Decorative bottom - Sepedi themed */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sepedi-pink" />
            <div className="w-16 h-1 bg-sepedi-yellow" />
            <div className="w-3 h-3 rounded-full bg-sepedi-blue" />
          </div>
        </div>
      </div>
    </section>
  )
}
