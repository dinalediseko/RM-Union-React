import { useState } from 'react'

interface EnvelopeProps {
  isOpen: boolean
  onOpen: () => void
}

export default function Envelope({ isOpen, onOpen }: EnvelopeProps) {
  const [sealClicked, setSealClicked] = useState(false)

  const handleSealClick = () => {
    if (isOpen) return
    setSealClicked(true)
    setTimeout(() => {
      onOpen()
    }, 300)
  }

  return (
    <div className="relative">
      {/* Envelope Container */}
      <div className="envelope">
        {/* Envelope Body (Bottom part) */}
        <div className="envelope-body" />
        
        {/* Envelope Flap (Top part - opens) */}
        <div 
          className={`envelope-flap ${isOpen ? 'open' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        />

        {/* Inner envelope shadow/depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%)',
            opacity: isOpen ? 0 : 1,
            transition: 'opacity 0.5s ease'
          }}
        />

        {/* Wax Seal */}
        {!isOpen && (
          <div 
            className={`wax-seal ${sealClicked ? 'clicked' : 'pulse'}`}
            onClick={handleSealClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSealClick()}
            aria-label="Open invitation"
          >
            <span className="text-cream text-xs font-script font-bold tracking-wider uppercase">
              R&M
            </span>
          </div>
        )}

        {/* Invitation Preview (visible when opening) */}
        <div
  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[160px] bg-cream rounded-lg shadow-xl border-2 border-maroon/20 transition-all duration-700 ${
    isOpen ? 'opacity-100 -translate-y-[80%]' : 'opacity-0 translate-y-0'
  }`}
  style={{
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }}
>
          <div className="w-full h-full flex flex-col items-center justify-center p-4 border-2 border-maroon/30 rounded-lg">
            <span className="font-script text-2xl text-cream-dark">Ramy</span>
            <span className="font-script text-xl text-cream-dark">&</span>
            <span className="font-script text-2xl text-cream-dark">Mamphara</span>
          </div>
        </div>
      </div>

      {/* Decorative elements around envelope - Sepedi themed 
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-40">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          <path 
            d="M30 0 L30 120" 
            stroke="#E91E63" 
            strokeWidth="2" 
            strokeDasharray="6 4"
          />
          <circle cx="30" cy="20" r="4" fill="#FFC107" />
          <circle cx="30" cy="100" r="4" fill="#1976D2" />
        </svg>
      </div>

      <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-40">
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
          <path 
            d="M30 0 L30 120" 
            stroke="#1976D2" 
            strokeWidth="2" 
            strokeDasharray="6 4"
          />
          <circle cx="30" cy="20" r="4" fill="#FFC107" />
          <circle cx="30" cy="100" r="4" fill="#E91E63" />
        </svg>
      </div>
      */}

      {/* Hint text */}
      {!isOpen && (
        <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-maroon/60 text-sm font-sans whitespace-nowrap">
          Click the seal to open
        </p>
      )}
    </div>
  )
}
