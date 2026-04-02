'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

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
    <main className="min-h-screen bg-background overflow-x-hidden">
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-to-b from-secondary via-background to-background overflow-hidden"
        style={{
          backgroundPosition: `0px ${scrollY * 0.5}px`,
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Foundation-Gala-Dinner-e53somFent0GlSU7dHvnTEqM1wQQWu.png?height=1080&width=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="mb-8 opacity-0 animate-fade-in flex flex-col items-center">
            <p className="text-sm sm:text-base tracking-widest text-primary mb-4">
              PRESENTED BY
            </p>
            <img 
              src="/bg-gold-logo-refined.png" 
              alt="BG Gold Logo" 
              className="h-20 sm:h-28 mb-4"
            />
          </div>

          <h1
            className="text-7xl sm:text-8xl lg:text-9xl font-light text-foreground mb-2 animate-fade-in-delayed leading-tight"
            style={{
              animationDelay: '0.2s',
              fontFamily: 'var(--font-display)',
              fontWeight: '400',
            }}
          >
            Gala Dinner
          </h1>

          <p className="text-sm sm:text-base text-primary mb-8 tracking-wider animate-fade-in-delayed leading-relaxed max-w-2xl mx-auto font-semibold"
            style={{
              animationDelay: '0.4s',
            }}
          >
            SAVE THE DATE
          </p>

          <div
            className="animate-fade-in-delayed flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            style={{
              animationDelay: '0.6s',
            }}
          >
            <div className="text-center">
              <p className="text-sm sm:text-base tracking-widest text-muted-foreground uppercase">Saturday</p>
              <p className="text-4xl sm:text-5xl font-bold text-primary">11</p>
              <p className="text-xs sm:text-sm text-muted-foreground uppercase">April</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-primary/30"></div>
            <div className="text-center">
              <p className="text-sm sm:text-base text-muted-foreground mb-2">At</p>
              <p className="text-xl sm:text-2xl font-semibold text-primary">6:30 PM</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mt-8 tracking-widest uppercase">
            Fine Dining • Celebration • Elegance
          </p>
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

      {/* Timeline Section */}
      <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 bg-secondary relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
              Evening Schedule
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="h-px w-8 bg-primary"></div>
            </div>
          </div>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {[
              { time: '6:30 PM', event: 'Arrival & Cocktails', description: 'Grand Entrance Hall' },
              { time: '7:15 PM', event: 'Formal Dinner Service', description: 'Main Ballroom' },
              { time: '8:30 PM', event: 'Toasts & Remarks', description: 'Business Excellence Celebration' },
              { time: '9:00 PM', event: 'Evening Entertainment', description: 'Live Music & Networking' },
            ].map((item, index) => (
              <div 
                key={index}
                id={`timeline-${index}`}
                data-scroll-animate
                className="flex gap-6 sm:gap-8 transition-all duration-1000"
                style={{
                  opacity: visibleElements.has(`timeline-${index}`) ? 1 : 0,
                  transform: visibleElements.has(`timeline-${index}`) ? 'translateX(0) translateY(0)' : 'translateX(-40px) translateY(20px)',
                }}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-primary mb-4"></div>
                  {index < 3 && <div className="w-0.5 h-20 sm:h-24 bg-border"></div>}
                </div>
                <div className="pb-4 sm:pb-6">
                  <p className="font-serif text-lg sm:text-xl text-primary font-semibold">{item.time}</p>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mt-3 mb-2">{item.event}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative butterflies */}
        <img 
          src="/butterfly-gold.png" 
          alt="Butterfly decoration" 
          className="absolute top-20 left-0 w-16 sm:w-24 opacity-30"
        />
        <img 
          src="/butterfly-gold.png" 
          alt="Butterfly decoration" 
          className="absolute bottom-32 right-0 w-20 sm:w-32 opacity-30"
        />
      </section>

      {/* Details Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Venue */}
            <div 
              id="details-0"
              data-scroll-animate
              className="transition-all duration-1000"
              style={{
                opacity: visibleElements.has('details-0') ? 1 : 0,
                transform: visibleElements.has('details-0') ? 'translateX(0) translateY(0)' : 'translateX(-40px) translateY(20px)',
              }}
            >
              <div className="mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Venue</h3>
                <div className="h-0.5 w-12 bg-primary mb-4"></div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                <span className="font-semibold text-foreground">The Platinum Ballroom</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                1200 Prestige Avenue<br />
                Metropolitan District, State 45678<br />
                <a href="tel:+1-555-0199" className="text-primary hover:underline">+1 (555) 0199</a>
              </p>
            </div>

            {/* Dress Code */}
            <div 
              id="details-1"
              data-scroll-animate
              className="transition-all duration-1000"
              style={{
                opacity: visibleElements.has('details-1') ? 1 : 0,
                transform: visibleElements.has('details-1') ? 'translateX(0) translateY(0)' : 'translateX(40px) translateY(20px)',
              }}
            >
              <div className="mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Dress Code</h3>
                <div className="h-0.5 w-12 bg-primary mb-4"></div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Black Tie Optional</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                Formal or business black-tie attire. Embrace the evening's elegance and sophistication with refined style.
              </p>
            </div>

            {/* Cuisine */}
            <div 
              id="details-2"
              data-scroll-animate
              className="transition-all duration-1000"
              style={{
                opacity: visibleElements.has('details-2') ? 1 : 0,
                transform: visibleElements.has('details-2') ? 'translateX(0) translateY(0)' : 'translateX(-40px) translateY(20px)',
              }}
            >
              <div className="mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Culinary Experience</h3>
                <div className="h-0.5 w-12 bg-primary mb-4"></div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                A prestigious four-course dinner with premium selections, complemented by fine wines and champagne. Crafted to celebrate excellence.
              </p>
            </div>

            {/* Contact */}
            <div 
              id="details-3"
              data-scroll-animate
              className="transition-all duration-1000"
              style={{
                opacity: visibleElements.has('details-3') ? 1 : 0,
                transform: visibleElements.has('details-3') ? 'translateX(0) translateY(0)' : 'translateX(40px) translateY(20px)',
              }}
            >
              <div className="mb-6">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Questions?</h3>
                <div className="h-0.5 w-12 bg-primary mb-4"></div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Email: <a href="mailto:events@bggold.com" className="text-primary hover:underline">events@bggold.com</a><br />
                Phone: <a href="tel:+1-555-0199" className="text-primary hover:underline">+1 (555) 0199</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 bg-gradient-to-b from-background via-secondary to-background relative">
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
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-8">
              Join Us
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-16 max-w-xl mx-auto leading-relaxed">
              We cordially invite you to an unforgettable evening. Please confirm your attendance by April 1st to ensure your place at this distinguished gathering.
            </p>

            <Button
              onClick={handleRsvp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 sm:px-16 py-8 sm:py-6 rounded-full text-lg sm:text-xl font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            >
              RSVP NOW
            </Button>

            <p className="text-xs sm:text-sm text-muted-foreground mt-12">
              Or visit: <span className="text-primary font-semibold">forms.gle/placeholder</span>
            </p>
          </div>
        </div>

        {/* Decorative butterflies */}
        <img 
          src="/butterfly-gold.png" 
          alt="Butterfly decoration" 
          className="absolute top-0 right-4 w-16 sm:w-24 opacity-30"
        />
        <img 
          src="/butterfly-gold.png" 
          alt="Butterfly decoration" 
          className="absolute bottom-0 left-4 w-20 sm:w-32 opacity-30"
        />
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-secondary border-t border-primary/30">
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
