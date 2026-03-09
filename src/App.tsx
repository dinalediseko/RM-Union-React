import { useState, useEffect, useRef } from 'react'
import './App.css'
import Envelope from './sections/Envelope'
import InvitationCard from './sections/InvitationCard'
import WelcomeMessage from './sections/WelcomeMessage'
import Calendar from './sections/Calendar'
import OrganizerContact from './sections/OrganizerContact'
import Countdown from './sections/Countdown'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleEnvelopeOpen = () => {
    setIsOpen(true)
    // Show content after envelope animation
    setTimeout(() => {
      setShowContent(true)
      // Scroll to content
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }, 1200)
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.fade-in-up')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [showContent])

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section with Envelope */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Sepedi Pattern Background */}
        <div 
          className={`absolute inset-0 z-0 transition-transform duration-[1500ms] ${isOpen ? 'scale-110' : 'scale-100'}`}
        >
          <img 
            src="/rm-union-bg.svg"
            alt="Sepedi pattern"
             className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-transparent to-cream" />
        </div>

        {/* Website Title */}
        <div className="relative z-10 mb-12">
          <h1 className="text-2xl md:text-3xl font-serif text-maroon tracking-[0.2em] uppercase">
            Save the Date
          </h1>
        </div>

        {/* Envelope Container */}
        <div className="relative z-10">
          <Envelope isOpen={isOpen} onOpen={handleEnvelopeOpen} />
        </div>

        {/* Scroll indicator */}
        {isOpen && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg 
              className="w-6 h-6 text-maroon" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </section>

      {/* Main Content */}
      {showContent && (
        <div ref={contentRef} className="relative z-10">
          {/* Invitation Card Section */}
          <section className="py-16 px-4">
            <InvitationCard />
          </section>

          {/* Welcome Message Section */}
          <section className="py-16 px-4">
            <WelcomeMessage />
          </section>

          {/* Calendar Section */}
          <section className="py-16 px-4">
            <Calendar />
          </section>

          {/* Countdown Section */}
          <section className="py-16 px-4 pb-24">
            <Countdown />
          </section>

          {/* Organizer Contact Section */}
          <section className="py-16 px-4">
            <OrganizerContact />
          </section>
        </div>
      )}
    </div>
  )
}

export default App
