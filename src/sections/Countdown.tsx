import { useState, useEffect, useRef } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown() {
  const sectionRef = useRef<HTMLElement>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Wedding date: June 15, 2025
  const weddingDate = new Date('2026-09-26T00:00:00')

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  return (
    <section 
      ref={sectionRef}
      className="fade-in-up max-w-lg mx-auto px-4 text-center"
    >
      {/* Heading */}
      <h2 className="font-script text-4xl text-sepedi-blue mb-2">
        We say
      </h2>
      <p className="font-script text-3xl text-sepedi-pink mb-8">
        "I Do" in...
      </p>

      {/* Countdown Timer */}
      <div className="flex justify-center items-start gap-4 md:gap-6 mb-10">
        {/* Days */}
        <div className="text-center">
          <div className="countdown-number">{formatNumber(timeLeft.days)}</div>
          <div className="countdown-label mt-1">days</div>
        </div>

        {/* Separator */}
        <div className="countdown-number text-sepedi-pink">:</div>

        {/* Hours */}
        <div className="text-center">
          <div className="countdown-number">{formatNumber(timeLeft.hours)}</div>
          <div className="countdown-label mt-1">hours</div>
        </div>

        {/* Separator */}
        <div className="countdown-number text-sepedi-pink">:</div>

        {/* Minutes */}
        <div className="text-center">
          <div className="countdown-number">{formatNumber(timeLeft.minutes)}</div>
          <div className="countdown-label mt-1">mins</div>
        </div>

        {/* Separator */}
        <div className="countdown-number text-sepedi-pink">:</div>

        {/* Seconds */}
        <div className="text-center">
          <div className="countdown-number">{formatNumber(timeLeft.seconds)}</div>
          <div className="countdown-label mt-1">secs</div>
        </div>
      </div>

      {/* Wedding Rings Image 
      <div className="flex justify-center">
        <img 
          src="/rings.png" 
          alt="Wedding Rings" 
          className="w-48 h-auto opacity-80"
        />
      </div>
      */}

      {/* Decorative bottom element - Sepedi themed */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <div className="w-10 h-1 bg-sepedi-yellow" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-sepedi-pink">
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill="currentColor"
          />
        </svg>
        <div className="w-10 h-1 bg-sepedi-yellow" />
      </div>
    </section>
  )
}
