'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function WeddingInvitation() {
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
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/herogif.gif?height=1080&width=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`, // might delete
          }}
        />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="mb-6 opacity-0 animate-fade-in">
            <p className="text-sm sm:text-base tracking-widest text-primary mb-2">
              TOGETHER WITH
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Their Parents
            </p>
          </div>

          <h1
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-in-delayed leading-tight"
            style={{
              animationDelay: '0.2s',
            }}
          >
            Emma & James
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground mb-8 tracking-wide animate-fade-in-delayed leading-relaxed max-w-2xl mx-auto"
            style={{
              animationDelay: '0.4s',
            }}
          >
            REQUEST THE HONOR OF YOUR PRESENCE AT THE CELEBRATION OF THEIR MARRIAGE
          </p>

          <div
            className="animate-fade-in-delayed"
            style={{
              animationDelay: '0.6s',
            }}
          >
            <p className="text-lg sm:text-xl font-serif text-primary font-semibold mb-2">
              Saturday, June 14th
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              2025
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

      {/* Love Story Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
              Our Love Story
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-8 bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="h-px w-8 bg-primary"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div 
              id="story-1"
              data-scroll-animate
              className="flex flex-col gap-4 transition-all duration-1000"
              style={{
                opacity: visibleElements.has('story-1') ? 1 : 0,
                transform: visibleElements.has('story-1') ? 'translateX(0) translateY(0)' : 'translateX(-40px) translateY(20px)',
              }}
            >
              <img
                src="/placeholder1.jpg?height=400&width=300"
                alt="Our story"
                className="w-full h-64 sm:h-80 object-cover rounded-lg bg-muted"
              />
              <h3 className="font-serif text-xl sm:text-2xl text-foreground">Where It Began</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div 
              id="story-2"
              data-scroll-animate
              className="flex flex-col gap-4 transition-all duration-1000"
              style={{
                opacity: visibleElements.has('story-2') ? 1 : 0,
                transform: visibleElements.has('story-2') ? 'translateX(0) translateY(0)' : 'translateX(40px) translateY(20px)',
              }}
            >
              <img
                src="/placeholder2.jpeg?height=400&width=300"
                alt="Our journey"
                className="w-full h-64 sm:h-80 object-cover rounded-lg bg-muted"
              />
              <h3 className="font-serif text-xl sm:text-2xl text-foreground">The Journey</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-secondary/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
              Wedding Timeline
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="h-px w-8 bg-primary"></div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              { time: '4:00 PM', event: 'Ceremony', description: 'Main Hall' },
              { time: '5:30 PM', event: 'Cocktail Hour', description: 'Terrace' },
              { time: '6:30 PM', event: 'Reception & Dinner', description: 'Ballroom' },
              { time: '8:00 PM', event: 'Toasts & Dancing', description: "Let's Celebrate!" },
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
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary mb-4 flex-shrink-0"></div>
                  {index < 3 && <div className="w-0.5 h-16 sm:h-20 bg-border"></div>}
                </div>
                <div className="pb-4 sm:pb-6">
                  <p className="font-serif text-lg sm:text-xl text-primary font-semibold">{item.time}</p>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mt-2">{item.event}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                <span className="font-semibold text-foreground">The Grand Garden Estate</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                123 Roadname Here<br />
                Cityname, State 12345<br />
                <a href="tel:+6287832033520" className="text-primary hover:underline">+62 87832033520</a>
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
                <span className="font-semibold text-foreground">Black Tie</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                We request guests to dress in semi-formal or cocktail attire. Feel free to express your personal style while maintaining an elegant look.
              </p>
            </div>

            {/* Lodging */}
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
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Lodging</h3>
                <div className="h-0.5 w-12 bg-primary mb-4"></div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                A block of rooms has been reserved under the name "Emma & James Wedding" at the Hotel. 
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
                Email: <a href="mailto:nicholasalexanderjosia@gmail.com" className="text-primary hover:underline">dontemailme@gmail.com</a><br />
                Phone: <a href="tel:+6287832033520" className="text-primary hover:underline">+62 87832033520</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/30">
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
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
              Celebrate With Us
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
              We would be delighted to share this special day with you. Please RSVP by May 30th to confirm your attendance.
            </p>

            <Button
              onClick={handleRsvp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-105"
            >
              RSVP NOW
            </Button>

            <p className="text-xs sm:text-sm text-muted-foreground mt-8">
              Or visit: <span className="text-primary font-semibold">forms.gle/placeholder</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-foreground text-background border-t border-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-lg sm:text-xl mb-2">Sponsors (?)</p>
          <p className="text-xs sm:text-sm opacity-75">
            June 14, 2025
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
