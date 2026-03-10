import { useEffect, useRef, useState } from 'react'
import './App.css'
import Envelope from './sections/Envelope'
import InvitationCard from './sections/InvitationCard'
import WelcomeMessage from './sections/WelcomeMessage'
import Calendar from './sections/Calendar'
import OrganizerContact from './sections/OrganizerContact'
import Countdown from './sections/Countdown'

function App() {
  const envelopeImg = '/rm-envelope.png'
  const sealImg = '/rm-wax-seal.png'

  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleEnvelopeOpen = () => {
    if (isOpen) return

    setIsOpen(true)

    window.setTimeout(() => {
      setShowContent(true)
    }, 900)
  }

  useEffect(() => {
    ;[envelopeImg, sealImg].forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (!showContent) return

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
    <div className="app-shell">
      <div className="invite-frame">
        {!showContent ? (
          <section className="hero-screen">
            <div
              className={`hero-bg ${isOpen ? 'hero-bg-open' : ''}`}
              aria-hidden="true"
            >
              <img
                src="/rm-union-bg.svg"
                alt=""
                className="hero-bg-image"
              />
              <div className="hero-bg-overlay" />
            </div>

            <div className="hero-title-wrap">
              <h1 className="hero-title">Save the Date</h1>
            </div>

            <div className="hero-envelope-wrap">
              <Envelope isOpen={isOpen} onOpen={handleEnvelopeOpen} />
            </div>

            {isOpen && (
              <div className="hero-scroll-indicator" aria-hidden="true">
                <svg
                  className="hero-scroll-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            )}
          </section>
        ) : (
          <div ref={contentRef} className="invite-content invite-scroll">
            <section className="content-section">
              <InvitationCard />
            </section>

            <section className="content-section">
              <WelcomeMessage />
            </section>

            <section className="content-section">
              <Calendar />
            </section>

            <section className="content-section">
              <Countdown />
            </section>

            <section className="content-section content-section-last">
              <OrganizerContact />
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
