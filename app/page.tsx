'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

function GoldParticles() {
  const [particles, setParticles] = useState<Array<{
    width: number; height: number; color: string;
    left: number; opacity: number; duration: number; delay: number; drift: number;
  }>>([])

  useEffect(() => {
    const colors = ['#ffd700', '#fffacd', '#b8860b', '#f5c842']
    setParticles(
      Array.from({ length: 30 }, () => ({
        width: Math.random() * 4 + 1,
        height: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        opacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 8,
        drift: Math.random() * 60 - 30,
      }))
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            left: `${p.left}%`,
            bottom: '-10px',
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function GalaDinner() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          } else {
            setVisibleElements((prev) => {
              const newSet = new Set(prev)
              newSet.delete(entry.target.id)
              return newSet
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    const elements = document.querySelectorAll('[data-scroll-animate]')
    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) => observer.unobserve(element))
    }
  }, [])

  const handleRsvp = () => {
    window.open('https://forms.gle/placeholder', '_blank')
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
       <GoldParticles />
      {/* Corner decorations */}
      <img 
        src="/corner-decoration.png" 
        alt="Corner decoration" 
        className="fixed bottom-0 left-0 w-48 sm:w-64 lg:w-80 opacity-40 pointer-events-none z-0"
      />
      <img 
        src="/corner-decoration.png" 
        alt="Corner decoration" 
        className="fixed top-0 right-0 w-48 sm:w-64 lg:w-80 opacity-40 pointer-events-none z-0 transform -scale-x-100 -scale-y-100"
      />
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-to-b from-secondary via-background to-background overflow-hidden"
        style={{
          backgroundPosition: `0px ${scrollY * 0.5}px`,
        }}
      >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <source src="/goldanimation2.webm" type="video/webm" />
        <source src="/goldanimation2.mp4" type="video/mp4" />
      </video>

        <div
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--background))',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.45) 0%, transparent 100%)',
          }}
        />
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto">
  
        {/* Indonesian intro text */}
        <div
          className="mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: '0s' }}
        >
          <p className="text-sm sm:text-base text-white/80 hero-text leading-relaxed italic tracking-wide">
            Dengan penuh kehormatan,
          </p>
          <p className="text-sm sm:text-base text-white/80 hero-text leading-relaxed italic tracking-wide">
            kami mengundang Anda untuk hadir dalam
          </p>
          <p className="text-sm sm:text-base text-white font-semibold hero-text leading-relaxed tracking-widest uppercase mt-1">
            "Golden Legacy: Carried Through Generations"
          </p>
        </div>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-2 mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="h-px w-12 bg-white/40"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
          <div className="h-px w-12 bg-white/40"></div>
        </div>

        {/* PRESENTED BY */}
        <div
          className="mb-2 opacity-0 animate-fade-in flex flex-col items-center"
          style={{ animationDelay: '0.8s' }}
        >
          <p className="text-sm sm:text-base hero-text tracking-widest text-white font-bold mb-2">
            PRESENTED BY
          </p>
          <img
            src="/bg-gold-logo-refined.png"
            alt="BG Gold Logo"
            className="h-20 sm:h-28 mb-1"
          />
        </div>

        {/* Gala Dinner */}
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '1.2s' }}
        >
          <h1
            className="text-8xl font-light sparkle-text mb-4 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))',
            }}
          >
            Gala Dinner
          </h1>
        </div>

        {/* SAVE THE DATE */}
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '1.6s' }}
        >
          <p className="text-lg sm:text-xl text-white font-bold hero-text mb-8 tracking-wider leading-relaxed max-w-2xl mx-auto">
            SAVE THE DATE
          </p>
        </div>

        {/* Date + Time */}
        <div
          className="opacity-0 animate-fade-in flex flex-row items-center justify-center gap-4 sm:gap-6"
          style={{ animationDelay: '2.0s' }}
        >
          <div className="text-center">
            <p className="text-xs sm:text-base tracking-widest text-white/80 uppercase">Senin</p>
            <p className="text-3xl sm:text-5xl font-bold text-primary" style={{ textShadow: '0 0 20px rgba(0,0,0,0.9)' }}>13</p>
            <p className="text-xs sm:text-sm text-white/80 uppercase">April</p>
          </div>
          <div className="w-px h-12 sm:h-16 bg-white/30"></div>
          <div className="text-center">
            <p className="text-sm sm:text-base text-white/80 mb-1">At</p>
            <p className="text-lg sm:text-2xl font-semibold text-primary" style={{ textShadow: '0 0 20px rgba(0,0,0,0.9)' }}>18:00 WITA</p>
          </div>
        </div>

        {/* Fine Dining */}
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '2.4s' }}
        >
          <p className="text-sm sm:text-lg hero-text text-white/90 mt-8 tracking-widest uppercase">
            Fine Dining • Celebration • Elegance
          </p>
        </div>

      </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-bounce"
          style={{
            animationDelay: '1s',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs sm:text-sm text-muted-foreground tracking-widest">SCROLL</p>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
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
        </div>
      </section>


      {/* Details Section */}
      <section className="py-20 sm:py-30 lg:py-34 px-4 sm:px-6 bg-background relative z-10">
        <div className="max-w-2xl mx-auto">
            {/* Intro quote */}
            <div
              id="details-intro"
              data-scroll-animate
              className="text-center mb-10 sm:mb-14 transition-all duration-1000"
              style={{
                opacity: visibleElements.has('details-intro') ? 1 : 0,
                transform: visibleElements.has('details-intro') ? 'translateY(0)' : 'translateY(24px)',
              }}
            >
              <p className="font-serif text-lg sm:text-2xl text-foreground italic leading-relaxed max-w-xl mx-auto">
                "Sebuah perayaan elegan yang mempertemukan rasa syukur, keindahan, dan momen berharga dalam satu malam istimewa."
              </p>
              <div className="flex items-center justify-center gap-2 mt-12 mb-20">
                <div className="h-px w-8 bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="h-px w-8 bg-primary"></div>
              </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 justify-items-center md:justify-items-start">
            {/* Venue */}
            <div 
              id="details-0"
              data-scroll-animate
              className="transition-all duration-1000 text-center md:text-left"
              style={{
                opacity: visibleElements.has('details-0') ? 1 : 0,
                transform: visibleElements.has('details-0') ? 'translateX(0) translateY(0)' : 'translateX(-40px) translateY(20px)',
              }}
            >
              <div className="mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Venue</h3>
                <div className="h-0.5 w-12 bg-primary mb-4 mx-auto md:mx-0"></div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                <span className="font-semibold text-foreground">Crystal Ballroom, Mercure Hotel Samarinda Lt.3</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Jl. Mulawarman No.171, Pelabuhan, Kec. Samarinda Kota, <br />
                Kota Samarinda, Kalimantan Timur 75112 
              </p>
            </div>

            {/* Dress Code */}
            <div 
              id="details-1"
              data-scroll-animate
              className="transition-all duration-1000 text-center md:text-left"
              style={{
                opacity: visibleElements.has('details-1') ? 1 : 0,
                transform: visibleElements.has('details-1') ? 'translateX(0) translateY(0)' : 'translateX(40px) translateY(20px)',
              }}
            >
              <div className="mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Dress Code</h3>
                <div className="h-0.5 w-12 bg-primary mb-4 mx-auto md:mx-0"></div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Formal & Elegant</span>
              </p>
              <p className="text-xs sm:text-sm break-words max-w-md text-muted-foreground mt-3 leading-relaxed">
                  Kenakan busana formal terbaik Anda. <br/>
                  Tampil memukau dan cerminkan keanggunan dalam malam penuh kenangan ini.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative butterflies */}
        <img 
          src="/butterfly-gold.png" 
          alt="Butterfly decoration" 
          className="absolute top-6 left-8 w-12 sm:w-20 opacity-45 drop-shadow-xl"
        />
        <img 
          src="/butterfly-gold.png" 
          alt="Butterfly decoration" 
          className="absolute bottom-3 right-8 w-16 sm:w-28 opacity-45 drop-shadow-xl"
        />

      </section>


      {/* Fade transition into Details */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--background))',
        }}
      />

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative">
        <div className="max-w-xl mx-auto bg-secondary/90 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 gold-glow-card">
          <div className="text-center mb-6 sm:mb-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl text-foreground mb-2">
              Persembahan Istimewa
            </h2>
            <h3 className="text-lg sm:text-xl font-light italic text-muted-foreground mb-4">
              by BG Gold
            </h3>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="h-px w-8 bg-primary"></div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-16 flex flex-col items-center relative">
            {[
              { time: 'Gala Dinner Experience', event: '', description: 'Sajian makan malam istimewa dalam suasana elegan', symbol: '✦' },
              { time: 'Special Performance by Hatim Rahmat', event: '', description: 'Penampilan spesial yang akan menyempurnakan malam Anda', symbol: '✦' },
              { time: 'Pengundian Door Prize', event: '', description: 'Pengundian hadiah eksklusif bagi tamu undangan', symbol: '✦' },
              { time: 'Appreciation Token Ceremony', event: '', description: 'Momen penghargaan sebagai bentuk apresiasi', symbol: '✦' },
            ].map((item, index) => (
              <div 
                key={index}
                id={`timeline-${index}`}
                data-scroll-animate
                className="flex flex-col items-center gap-6 sm:gap-8 transition-all duration-1000 w-full max-w-sm"
                style={{
                  opacity: visibleElements.has(`timeline-${index}`) ? 1 : 0,
                  transform: visibleElements.has(`timeline-${index}`) ? 'translateX(0) translateY(0)' : 'translateX(-40px) translateY(20px)',
                }}
              >
                <div className="flex flex-col items-center relative">
                  <div className="w-4 h-4 rounded-full bg-primary mb-4 relative z-10"></div>
                  <span className="absolute -top-2 -left-6 text-primary/40 text-xs">✧</span>
                  <span className="absolute -top-2 -right-6 text-primary/40 text-xs">✧</span>
                  {index < 3 && <div className="w-0.5 h-12 sm:h-16 bg-border"></div>}
                </div>
                <div className="pb-4 sm:pb-6 text-center">
                  <p className="font-serif text-lg sm:text-3xl text-primary font-semibold">{item.time}</p>
                  <h3 className="text-base sm:text-2xl font-semibold text-foreground mt-3 mb-2">{item.event}</h3>
                  <p className="text-lg">{item.description}</p>
                </div>
              </div>
            ))}
            {/* Decorative border elements */}
            <div className="absolute right-12 top-1/4 w-px h-32 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0"></div>
            <div className="absolute left-12 top-1/4 w-px h-32 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0"></div>
          </div>
        </div>
      </section>

      {/* Fade transition into Details */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--background))',
        }}
      />

      {/* RSVP Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-background via-secondary to-background relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div
            id="rsvp-section"
            data-scroll-animate
            className="transition-all duration-1000"
            style={{
              opacity: visibleElements.has('rsvp-section') ? 1 : 0,
              transform: visibleElements.has('rsvp-section') ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
            RSVP
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-12 bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="h-px w-12 bg-primary"></div>
          </div>

          {/* Deadline box */}
          <div className="inline-block border border-primary/40 rounded-lg px-6 py-4 mb-8 bg-primary/5">
            <p className="text-xs tracking-widest text-primary uppercase mb-1">Konfirmasi Sebelum</p>
            <p className="font-serif text-2xl sm:text-3xl text-foreground">Selasa, 7 April 2025</p>
            <p className="text-sm text-muted-foreground mt-1">pukul 20.00 WITA</p>
          </div>

          <p className="font-serif text-lg sm:text-xl text-foreground italic mb-10 max-w-md mx-auto leading-relaxed">
            "Sampai jumpa dalam malam yang hangat dan berkesan."
          </p>

          <Button
            onClick={handleRsvp}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-16 py-6 rounded-full text-lg sm:text-xl font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/40 hover:shadow-xl"
          >
            RSVP SEKARANG
          </Button>

          <p className="text-xs text-muted-foreground mt-6 tracking-widest uppercase">
            Tempat terbatas · Konfirmasi diperlukan
          </p>
          </div>
        </div>


      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-secondary border-t border-primary/30 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-foreground opacity-75">
            © PT Bagong Sejahtera Abadi. All Rights Reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDelayed {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-delayed {
          animation: fadeInDelayed 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-12px);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  )
}
