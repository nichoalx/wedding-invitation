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
      Array.from({ length: 1000 }, () => ({
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
    const handleScroll = () => setScrollY(window.scrollY)
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
    return () => elements.forEach((element) => observer.unobserve(element))
  }, [])

  const handleRsvp = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfc_ZVXIt5orp3hUdJiMqadgRAy8vDufigUBa_b7XM5M9zP7g/viewform?usp=publish-editor', '_blank')
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

      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary via-background to-background overflow-hidden"
        style={{ backgroundPosition: `0px ${scrollY * 0.5}px` }}
      >
        <video
          autoPlay loop muted playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <source src="/goldanimation2.webm" type="video/webm" />
          <source src="/goldanimation2.mp4" type="video/mp4" />
        </video>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.45) 0%, transparent 100%)' }}
        />

        <div className="relative z-20 text-center py-12 px-4 sm:px-6 max-w-4xl mx-auto">

          {/* Intro text */}
          <div className="mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0s' }}>
            <p className="text-sm sm:text-base text-white white-glow-text hero-text leading-relaxed italic tracking-wide">
              Dengan penuh kehormatan,
            </p>
            <p className="text-lg text-white white-glow-text hero-text leading-relaxed italic tracking-wide">
              kami mengundang Anda untuk hadir dalam
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="h-px w-12 bg-white/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
            <div className="h-px w-12 bg-white/40"></div>
          </div>

          {/* ── GOLDEN LEGACY + GALA DINNER as one block ── */}
          <div className="opacity-0 animate-fade-in mb-2" style={{ animationDelay: '0.8s' }}>
            
            <h1
              className="leading-tight italic text-white text-4xl sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: 'var(--font-serif)',
                filter: 'drop-shadow(1px 2px 8px rgba(0,0,0,0.8))',
              }}
            >
              Golden Legacy: Carried Through Generations
            </h1>

            {/* SUBTITLE */}
            <p className="text-7xl sm:text-7xl drop-shadow-lg font-display text-white font-light gold-shine-text tracking-widest italic mt-5 mb-10">
              Gala Dinner
            </p>

          </div>

          {/* ── LOGO under Gala Dinner ── */}
          <div className="opacity-0 animate-fade-in flex flex-col items-center mb-7" style={{ animationDelay: '1.1s' }}>
            <p className="text-xs sm:text-sm hero-text tracking-widest text-white white-glow-text mt-1 uppercase">
              Presented by 
            </p>
            <img
              src="/bg-gold-logo-refined.png"
              alt="BG Gold Logo"
              className="h-35 drop-shadow-lg"
            />
          </div>

          {/* SAVE THE DATE */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <p className="text-lg sm:text-lg text-white white-glow-text hero-text mb-4 tracking-wider">
              SAVE THE DATE
            </p>
          </div>

          {/* Date + Time */}
          <div
            className="opacity-0 animate-fade-in flex flex-row items-center justify-center gap-4 sm:gap-4"
            style={{ animationDelay: '1.8s' }}
          >
            <div className="text-center">
              <p className="text-xs sm:text-base tracking-widest text-white white-glow-text uppercase">Senin</p>
              <p className="text-3xl sm:text-5xl font-bold gold-shine-text" style={{ textShadow: '0 0 20px rgba(0,0,0,0.9)' }}>13</p>
              <p className="text-xs sm:text-sm text-white white-glow-text uppercase">April</p>
            </div>
            <div className="w-px h-12 sm:h-16 bg-white/30"></div>
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-semibold gold-shine-text" style={{ textShadow: '0 0 20px rgba(0,0,0,0.9)' }}>18:00 WITA</p>
            </div>
          </div>
        </div>

      <div
        className="relative z-10 h-32 pointer-events-none -mt-32"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
      />
      </section>

      {/* ─── DETAILS SECTION ─── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-background relative z-10">
        
        {/* Gold wave pattern — top left */}
        <img
          src="/golden-wave.png"
          alt=""
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0"
        />

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
            <p className="font-serif text-3xl gold-shine-text sm:text-4xl text-foreground italic leading-relaxed max-w-xl mx-auto">
              Sebuah perayaan elegan yang mempertemukan rasa syukur, keindahan, dan momen berharga dalam satu malam istimewa.
            </p>
            <div className="flex items-center justify-center gap-2 mt-8 mb-12">
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
              <div className="mb-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Venue</h3>
                <div className="h-0.5 w-12 bg-primary mb-4 mx-auto md:mx-0"></div>
              </div>
              <p className="text-sm sm:text-base  mb-2 leading-relaxed">
                <span className="font-semibold text-foreground">Crystal Ballroom, Mercure Hotel Samarinda Lt.3</span>
              </p>
              <p className="text-xs sm:text-sm  leading-relaxed">
                Jl. Mulawarman No.171, Pelabuhan, Kec. Samarinda Kota,<br />
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
              <div className="mb-4">
                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">Dress Code</h3>
                <div className="h-0.5 w-12 bg-primary mb-4 mx-auto md:mx-0"></div>
              </div>
              <p className="text-sm sm:text-base  leading-relaxed">
                <span className="font-semibold text-foreground">Formal & Elegan</span>
              </p>
              <p className="text-xs sm:text-sm break-words max-w-md  mt-3 leading-relaxed">
                Kenakan busana formal terbaik Anda <br />
                Tampil memukau dan cerminkan keanggunan dalam malam penuh kenangan ini.
              </p>
            </div>
          </div>
        </div>

        {/* Butterflies + gold wave decoration */}
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

      {/* Fade into timeline */}
      <div
        className="relative z-10 h-32 pointer-events-none -mt-32"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
      />

      {/* ─── PERSEMBAHAN ISTIMEWA ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-lg mx-auto bg-secondary/90 backdrop-blur-md rounded-xl shadow-2xl p-8 sm:p-12 gold-glow-card relative overflow-hidden">
          <div className="text-center mb-6">
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-3">
              Persembahan Istimewa
            </h2>
            <div className="flex flex-col items-center mb-8">
              <p className="text-xs tracking-widest text-primary uppercase ">
                by
              </p>
              <img
                src="/bg-gold-logo-refined.png"
                alt="BG Gold Logo"
                className="h-22 sm:h-22 object-contain"
              />
            </div>
          </div>

          <div className="space-y-2 flex flex-col items-center relative">
            {[
              { title: 'Gala Dinner Experience', description: 'Sajian makan malam istimewa dalam suasana elegan' },
              { title: 'Special Performance by Hatim Rahmat', description: 'Penampilan spesial yang akan menyempurnakan malam Anda' },
              { title: 'Pengundian Door Prize', description: 'Pengundian hadiah eksklusif bagi tamu undangan' },
              { title: 'Appreciation Token Ceremony', description: 'Momen penghargaan sebagai bentuk apresiasi' },
            ].map((item, index) => (
              <div
                key={index}
                id={`timeline-${index}`}
                data-scroll-animate
                className="flex flex-col items-center transition-all duration-1000 w-full max-w-sm"
                style={{
                  opacity: visibleElements.has(`timeline-${index}`) ? 1 : 0,
                  transform: visibleElements.has(`timeline-${index}`) ? 'translateX(0) translateY(0)' : 'translateX(-40px) translateY(20px)',
                }}
              >
                <div className="flex flex-col items-center relative">
                  <div className="w-4 h-4 rounded-full bg-primary mb-2 relative z-10 shadow-[0_0_8px_rgba(212,160,23,0.8)]"></div>
                  {index < 4 && <div className="w-0.5 h-8 bg-primary/30"></div>}
                </div>
                <div className="pb-2 text-center">
                  <p className="font-serif text-lg sm:text-2xl white-glow-text max-w-[300px] font-semibold">{item.title}</p>
                  <p className="text-sm sm:text-base white-glow-text mt-1 max-w-[250px] mx-auto text-center">{item.description}</p>
                </div>
              </div>
            ))}

            {/* Decorative side lines */}
            <div className="absolute right-0 top-1/4 w-px h-64 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0"></div>
            <div className="absolute left-0 top-1/4 w-px h-64 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0"></div>
          </div>
        </div>
      </section>

      {/* Fade into RSVP */}
      <div
        className="relative z-10 h-64 sm:h-80 pointer-events-none -mb-64 sm:-mb-80"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 70%, black 100%)'
        }}
      />

      {/* ─── RSVP SECTION ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/60 to-transparent z-10 pointer-events-none" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          >
            <source src="/rsvpvid.mp4" type="video/mp4" />
          </video>

          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/60"></div>

        <div className="max-w-2xl mx-auto text-center pt-20 sm:pt-20">
          <div
            id="rsvp-section"
            data-scroll-animate
            className="transition-all duration-1000"
            style={{
              opacity: visibleElements.has('rsvp-section') ? 1 : 0,
              transform: visibleElements.has('rsvp-section') ? 'translateY(0)' : 'translateY(40px)',
            }}
          >
            <p className="text-xs tracking-widest font-bold gold-label-glow uppercase mt-1 mb-2">✦ Konfirmasi Kehadiran Anda ✦</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4">
              RSVP
            </h2>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-12 bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="h-px w-12 bg-primary"></div>
            </div>

            {/* Deadline box */}
            <div className="inline-block border border-primary/50 rounded-lg px-6 py-4 mb-8 bg-primary/10 gold-glow-card">
              <p className="text-xs tracking-widest text-primary uppercase mb-1">Konfirmasi Sebelum</p>
              <p className="font-serif text-2xl sm:text-3xl text-foreground">Selasa, 7 April 2025</p>
              <p className="text-sm  mt-1">pukul 20.00 WITA</p>
            </div>

            <p className="font-serif text-lg sm:text-xl text-foreground italic mb-10 max-w-md mx-auto leading-relaxed">
              Sampai jumpa dalam malam yang hangat dan berkesan.
            </p>

            <Button
              onClick={handleRsvp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-16 py-10 rounded-full text-lg sm:text-xl font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/50 hover:shadow-2xl"
            >
              RSVP SEKARANG
            </Button>

            <p className="text-xs  mt-6 tracking-widest uppercase">
              ✦ Tempat terbatas · Konfirmasi diperlukan ✦
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-4 px-4 sm:px-6 bg-secondary border-t border-primary/30 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm  opacity-75">
            © PT Bagong Sejahtera Abadi. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}