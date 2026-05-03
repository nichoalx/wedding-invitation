'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

// Pre-defined particles — avoids hydration mismatch from Math.random()
const PARTICLES = [
  { id: 1,  left: '8%',  top: '18%', size: 2.4, dur: 3.2, delay: 0.0 },
  { id: 2,  left: '92%', top: '10%', size: 1.8, dur: 4.1, delay: 0.8 },
  { id: 3,  left: '23%', top: '72%', size: 3.0, dur: 2.8, delay: 1.2 },
  { id: 4,  left: '67%', top: '82%', size: 2.2, dur: 5.0, delay: 0.3 },
  { id: 5,  left: '45%', top: '12%', size: 1.5, dur: 3.7, delay: 1.8 },
  { id: 6,  left: '78%', top: '55%', size: 2.6, dur: 4.5, delay: 0.6 },
  { id: 7,  left: '12%', top: '88%', size: 1.9, dur: 3.1, delay: 2.1 },
  { id: 8,  left: '55%', top: '38%', size: 3.2, dur: 6.0, delay: 0.9 },
  { id: 9,  left: '88%', top: '68%', size: 1.7, dur: 3.8, delay: 1.5 },
  { id: 10, left: '33%', top: '93%', size: 2.4, dur: 4.2, delay: 0.2 },
  { id: 11, left: '62%', top: '25%', size: 2.0, dur: 5.5, delay: 1.1 },
  { id: 12, left: '18%', top: '50%', size: 2.7, dur: 3.9, delay: 2.5 },
  { id: 13, left: '75%', top: '42%', size: 1.6, dur: 4.8, delay: 0.7 },
  { id: 14, left: '42%', top: '65%', size: 3.0, dur: 2.9, delay: 1.9 },
  { id: 15, left: '5%',  top: '35%', size: 2.2, dur: 5.2, delay: 0.4 },
  { id: 16, left: '95%', top: '30%', size: 2.5, dur: 3.4, delay: 2.3 },
  { id: 17, left: '50%', top: '78%', size: 1.8, dur: 4.6, delay: 1.3 },
  { id: 18, left: '30%', top: '22%', size: 2.8, dur: 3.6, delay: 0.5 },
  { id: 19, left: '85%', top: '88%', size: 2.1, dur: 4.9, delay: 1.7 },
  { id: 20, left: '15%', top: '5%',  size: 1.6, dur: 3.3, delay: 2.8 },
  { id: 21, left: '38%', top: '8%',  size: 2.0, dur: 4.0, delay: 1.6 },
  { id: 22, left: '70%', top: '18%', size: 2.3, dur: 5.3, delay: 2.4 },
  { id: 23, left: '3%',  top: '60%', size: 1.7, dur: 3.6, delay: 0.1 },
  { id: 24, left: '98%', top: '48%', size: 2.1, dur: 4.4, delay: 1.0 },
  { id: 25, left: '52%', top: '88%', size: 2.5, dur: 5.8, delay: 2.6 },
  { id: 26, left: '37%', top: '45%', size: 1.9, dur: 3.5, delay: 0.6 },
  { id: 27, left: '63%', top: '72%', size: 2.7, dur: 4.7, delay: 1.4 },
  { id: 28, left: '8%',  top: '78%', size: 1.8, dur: 5.1, delay: 2.0 },
  { id: 29, left: '90%', top: '78%', size: 2.2, dur: 3.7, delay: 0.4 },
  { id: 30, left: '48%', top: '52%', size: 3.1, dur: 6.2, delay: 1.7 },
  { id: 31, left: '20%', top: '38%', size: 1.9, dur: 4.3, delay: 2.7 },
  { id: 32, left: '80%', top: '12%', size: 2.4, dur: 5.0, delay: 0.5 },
  { id: 33, left: '57%', top: '5%',  size: 1.7, dur: 3.9, delay: 1.2 },
  { id: 34, left: '27%', top: '58%', size: 2.6, dur: 4.6, delay: 2.2 },
  { id: 35, left: '72%', top: '95%', size: 2.0, dur: 5.7, delay: 0.8 },
  { id: 36, left: '40%', top: '28%', size: 2.8, dur: 3.3, delay: 1.5 },
  { id: 37, left: '11%', top: '15%', size: 2.1, dur: 4.4, delay: 2.4 },
  { id: 38, left: '83%', top: '60%', size: 2.3, dur: 5.5, delay: 0.7 },
  { id: 39, left: '60%', top: '50%', size: 1.8, dur: 3.7, delay: 1.9 },
  { id: 40, left: '25%', top: '85%', size: 2.9, dur: 4.8, delay: 2.6 },
]


const TIMELINE_ITEMS = [
  { title: 'Gala Dinner Experience',          description: 'Sajian makan malam istimewa dalam suasana elegan' },
  { title: 'Special Performance', description: 'Penampilan spesial yang akan menyempurnakan malam Anda' },
  { title: 'Pengundian Door Prize',            description: 'Pengundian hadiah eksklusif bagi tamu undangan' },
  { title: 'Appreciation Token Ceremony',      description: 'Momen penghargaan sebagai bentuk apresiasi' },
]

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const inView = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.85, ease: EASE } },
}


export default function GalaDinner() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 700], [0, 180])
  const [introDismissed, setIntroDismissed] = useState(false)
  const [featherLanded, setFeatherLanded] = useState(false)
  // Force-play all muted videos as soon as they're mounted (bypasses mobile autoplay gate)
  React.useEffect(() => {
    heroVideoRef.current?.play().catch(() => {})
    bgVideoRef.current?.play().catch(() => {})
  }, [])

  // Fallback: if feather image is slow/broken, force-show UI after 4 s
  React.useEffect(() => {
    const t = setTimeout(() => setFeatherLanded(true), 2500)
    return () => clearTimeout(t)
  }, [])

  const handleDismissIntro = () => {
    setIntroDismissed(true)
    // Re-trigger play after user gesture — satisfies strict mobile autoplay policies
    heroVideoRef.current?.play().catch(() => {})
    bgVideoRef.current?.play().catch(() => {})
  }

  const handleRsvp = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSegXPyQMz-74owi1-dhmCKGEh7MMBnfuGLUjU1s4ALgMBgT7A/viewform?usp=publish-editor',
      '_blank',
    )
  }

  return (
    <>
    {/* ─── INTRO ─── */}
    <AnimatePresence>
      {!introDismissed && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          onClick={handleDismissIntro}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {/* Subtle glitter */}
          <div className="absolute inset-0 pointer-events-none">
            {PARTICLES.slice(0, 15).map(p => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: p.left, top: p.top, width: p.size, height: p.size, background: '#f5c842',
                  boxShadow: `0 0 ${p.size * 4}px rgba(245,200,66,0.8)`,
                }}
                animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 2, 1] }}
                transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
              />
            ))}
          </div>

          {/* Feather falls from top-right, stops dead center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.img
              src="/gold-feather.webp"
              alt="" aria-hidden="true"
              style={{
                width: 'clamp(140px, 32vw, 240px)',
                filter: 'drop-shadow(0 0 30px rgba(245,200,66,0.7)) drop-shadow(0 0 60px rgba(212,160,23,0.4))',
                mixBlendMode: 'screen',
              }}
              initial={{ y: '-60vh', x: 100, rotate: -18, opacity: 0 }}
              animate={{ y: 0, x: 0, rotate: 10, opacity: 0.9 }}
              transition={{ duration: 2.6, ease: [0.15, 0.8, 0.2, 1] }}
              onAnimationComplete={() => setFeatherLanded(true)}
            />
          </div>

          {/* Logo + tagline — pinned above the feather, fades in after landing */}
          <AnimatePresence>
            {featherLanded && (
              <motion.div
                className="absolute top-[7%] sm:top-[10%] left-1/2 -translate-x-1/2 z-10 text-center px-6 w-full"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
              >
                <img src="/bg-gold-logo-refined.png" alt="BG Gold" className="h-32 sm:h-40 mx-auto opacity-90 drop-shadow-lg" />
                <p className="text-white white-glow-text italic text-lg sm:text-xl tracking-wide"
                   style={{ fontFamily: 'var(--font-serif)' }}>
                  Sebuah undangan spesial untuk Anda...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tap to continue — shifted up for visibility */}
          <AnimatePresence>
            {featherLanded && (
              <motion.div
                className="absolute bottom-35 sm:bottom-55 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5 }}
              >
                <p className="gold-label-glow tracking-[0.35em] uppercase text-xs sm:text-sm">
                  Ketuk untuk melanjutkan
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>

    <main className="min-h-screen bg-background overflow-x-hidden relative">

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax video */}
        <motion.video
          ref={heroVideoRef}
          autoPlay loop muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
          style={{ y: videoY }}
        >
          <source src="/gold-feather-hero.mp4" type="video/mp4" />
        </motion.video>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
        />

        {/* Gold glitter particles */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left, top: p.top, width: p.size + 1, height: p.size + 1, background: '#f5c842',
                boxShadow: `0 0 ${p.size * 3.5}px rgba(245,200,66,0.9), 0 0 ${p.size * 7}px rgba(245,200,66,0.45)`,
              }}
              animate={{ opacity: [0.1, 1, 0.1], scale: [1, 2.2, 1] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            />
          ))}
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
        />

        <div className="relative z-20 text-center py-12 px-4 sm:px-6 max-w-4xl mx-auto">

          {/* Invitation text */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <p className="text-2xl text-white white-glow-text leading-relaxed italic tracking-wide"
               style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Dengan penuh kehormatan,
            </p>
            <p className="text-3xl text-white white-glow-text leading-relaxed italic tracking-wide"
               style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              kami mengundang Anda untuk hadir dalam
            </p>
          </motion.div>

          {/* Ornamental divider */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-5"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="h-px w-14 bg-white/35" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/55" />
            <div className="h-px w-14 bg-white/35" />
          </motion.div>

          {/* Main title */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <h1
              className="leading-tight text-white text-4xl sm:text-5xl lg:text-6xl"
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                fontStyle: 'italic',
                filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.85))',
                letterSpacing: '0.01em',
              }}
            >
              Golden Legacy: A Journey That Brings Us Closer
            </h1>

            {/* Script display word */}
            <p
              className="drop-shadow-lg static-gold font-light italic mt-4 mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 12vw, 7rem)',
                lineHeight: 1.1,
              }}
            >
              Gala Dinner
            </p>
          </motion.div>

          {/* Logo */}
          <motion.div
            className="flex flex-col items-center mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
          >
            <p className="text-xs sm:text-sm hero-text tracking-[0.25em] text-white white-glow-text uppercase mb-2">
              Presented by
            </p>
            <img src="/bg-gold-logo-refined.png" alt="BG Gold Logo" className="h-28 sm:h-32 drop-shadow-lg" />
          </motion.div>

          {/* Save the date */}
          <motion.p
            className="text-sm sm:text-base text-white white-glow-text hero-text mb-5 tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.5 }}
          >
            Save the Date
          </motion.p>

          {/* Date / time pill */}
          <motion.div
            className="flex flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.9 }}
          >
            <div className="text-center">
              <p className="text-xs sm:text-sm tracking-[0.2em] text-white white-glow-text font-bold uppercase"
                 style={{ fontFamily: 'var(--font-serif)' }}>Selasa</p>
              <p className="text-4xl sm:text-5xl font-bold static-gold leading-none mb-4"
                 style={{ fontFamily: 'var(--font-serif)' }}>19</p>
              <p className="text-xs sm:text-sm text-white white-glow-text uppercase font-bold tracking-widest mt-1">May 2026</p>
            </div>
            <div className="w-px h-14 sm:h-18 bg-white/25" />
            <div className="text-center">
              <p className="text-2xl sm:text-4xl font-semibold static-gold"
                 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>18:00</p>
              <p className="text-xs sm:text-sm text-white white-glow-text font-bold tracking-widest mt-1">WITA</p>
            </div>
          </motion.div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }}
        />
      </section>

      {/* ─── DETAILS + PERSEMBAHAN — shared video background ─── */}
      <div className="relative bg-background">

        {/* Single feather video shared across both sections */}
        <video
          ref={bgVideoRef}
          autoPlay loop muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-30 z-0"
        >
          <source src="/gold-feather3.mp4" type="video/mp4" />
        </video>

      {/* ─── DETAILS ─── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative z-10 overflow-hidden">

        <img
          src="/golden-wave.png" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-0 object-cover"
        />

        {/* Gold glitter particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left, top: p.top, width: p.size, height: p.size, background: '#f5c842',
                boxShadow: `0 0 ${p.size * 3}px rgba(245,200,66,0.85), 0 0 ${p.size * 6}px rgba(245,200,66,0.4)`,
              }}
              animate={{ opacity: [0.1, 0.85, 0.1], scale: [1, 2, 1] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            />
          ))}
        </div>
        <div className="max-w-2xl mx-auto relative z-10">

          {/* Quote */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={inView}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-15%' }}
          >
            <p
              className="text-2xl sm:text-3xl lg:text-4xl static-gold italic leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
            >
              Sebuah perayaan elegan yang mempertemukan rasa syukur, keindahan, dan momen berharga dalam satu malam istimewa.
            </p>
            <div className="flex items-center justify-center gap-2 mt-8 mb-4">
              <div className="h-px w-8 bg-primary/60" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="h-px w-8 bg-primary/60" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 justify-items-center md:justify-items-start">

            {/* Venue */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ duration: 0.85 }}
            >
              <h3
                className="text-2xl sm:text-3xl text-foreground mb-2"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
              >
                Venue
              </h3>
              <div className="h-0.5 w-12 bg-primary mb-4 mx-auto md:mx-0" />
              <p className="text-sm sm:text-base mb-2 leading-relaxed font-semibold text-foreground">
                Neptunus Ballroom, Galaxy Hotel, Banjarmasin
              </p>
              <p className="text-xs sFm:text-sm leading-relaxed text-muted-foreground">
                Jalan A. Yani KM 2,5 No. 138, Sungai Baru, Banjarmasin,<br />
                Kota Banjarmasin, Kalimantan Selatan 70233
              </p>
            </motion.div>

            {/* Dress Code */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, x: 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, margin: '-10%' }}
              transition={{ duration: 0.85 }}
            >
              <h3
                className="text-2xl sm:text-3xl text-foreground mb-2"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
              >
                Dress Code
              </h3>
              <div className="h-0.5 w-12 bg-primary mb-4 mx-auto md:mx-0" />
              <p className="text-sm sm:text-base font-semibold text-foreground mb-2">
                Formal & Elegan
              </p>
              <p className="text-xs sm:text-sm max-w-md mt-1 leading-relaxed text-muted-foreground">
                Kenakan busana formal terbaik Anda.<br />
                Tampil memukau dan cerminkan keanggunan dalam malam penuh kenangan ini.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PERSEMBAHAN ISTIMEWA ─── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 overflow-hidden">

        {/* Corner decorations */}
        <img src="/corner-decoration.png" alt="" aria-hidden="true"
          className="absolute bottom-0 left-0 w-24 sm:w-36 pointer-events-none z-10 opacity-40"
          style={{ mixBlendMode: 'screen' }}
        />
        <img src="/corner-decoration.png" alt="" aria-hidden="true"
          className="absolute bottom-0 right-0 w-24 sm:w-36 pointer-events-none z-10 opacity-40"
          style={{ mixBlendMode: 'screen', transform: 'scaleX(-1)' }}
        />
        <img src="/corner-decoration.png" alt="" aria-hidden="true"
          className="absolute top-0 left-0 w-24 sm:w-36 pointer-events-none z-10 opacity-40"
          style={{ mixBlendMode: 'screen', transform: 'scaleY(-1)' }}
        />
        <img src="/corner-decoration.png" alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-24 sm:w-36 pointer-events-none z-10 opacity-40"
          style={{ mixBlendMode: 'screen', transform: 'scale(-1)' }}
        />

        {/* Gold glitter particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left, top: p.top, width: p.size, height: p.size, background: '#f5c842',
                boxShadow: `0 0 ${p.size * 3}px rgba(245,200,66,0.7), 0 0 ${p.size * 6}px rgba(245,200,66,0.35)`,
              }}
              animate={{ opacity: [0.1, 0.85, 0.1], scale: [1, 2, 1] }}
              transition={{ duration: p.dur * 1.3, repeat: Infinity, ease: 'easeInOut', delay: p.delay + 0.5 }}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto">

          <motion.div
            className="text-center mb-16 sm:mb-20"
            variants={inView}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-10%' }}
          >
            <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4">Agenda Malam</p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl text-foreground italic"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
            >
              Persembahan Istimewa
            </h2>
            <div className="flex flex-col items-center mt-5">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">by</p>
              <img src="/bg-gold-logo-refined.png" alt="BG Gold Logo" className="h-14 object-contain mt-2 opacity-80" />
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,160,23,0.35) 8%, rgba(212,160,23,0.35) 92%, transparent)' }}
            />

            <div className="space-y-14 sm:space-y-16">
              {TIMELINE_ITEMS.map((item, index) => {
                const isRight = index % 2 === 0
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRight ? 36 : -36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: '-5%' }}
                    transition={{ duration: 0.7, delay: index * 0.07 }}
                  >
                    {/* Mobile */}
                    <div className="md:hidden text-center px-4">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-px w-10 bg-primary/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(212,160,23,0.9)]" />
                        <div className="h-px w-10 bg-primary/40" />
                      </div>
                      <p className="text-xl text-foreground leading-snug mb-1"
                         style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>{item.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    {/* Desktop alternating */}
                    <div className="hidden md:grid grid-cols-[1fr_32px_1fr] items-center">
                      <div className="pr-8 text-right">
                        {!isRight && (
                          <>
                            <p className="text-xl lg:text-2xl text-foreground leading-snug"
                               style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>{item.title}</p>
                            <p className="text-sm text-muted-foreground mt-1.5">{item.description}</p>
                          </>
                        )}
                      </div>
                      <div className="flex justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary relative z-10 shadow-[0_0_10px_rgba(212,160,23,0.8)]" />
                      </div>
                      <div className="pl-8">
                        {isRight && (
                          <>
                            <p className="text-xl lg:text-2xl text-foreground leading-snug"
                               style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>{item.title}</p>
                            <p className="text-sm text-muted-foreground mt-1.5">{item.description}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      </div>{/* end shared video wrapper */}

      {/* ─── RSVP ─── */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 relative z-10 overflow-hidden">

        {/* 4-panel B&W photo mosaic background */}
        <div className="absolute inset-0 grid grid-cols-2 pointer-events-none">
          {(['/rsvppic1.webp', '/rsvppic2.webp', '/rsvppic3.webp', '/rsvppic4.webp'] as const).map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img
                src={src} alt="" aria-hidden="true"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) brightness(0.75) contrast(1.1)' }}
              />
            </div>
          ))}
        </div>

        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Glowing gold orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute rounded-full"
            style={{ width: 700, height: 700, left: '50%', top: '50%', marginLeft: -350, marginTop: -350, background: 'radial-gradient(circle, rgba(212,160,23,0.2) 0%, transparent 65%)', filter: 'blur(70px)' }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 450, height: 450, left: '-6%', top: '5%', background: 'radial-gradient(circle, rgba(212,160,23,0.15) 0%, transparent 65%)', filter: 'blur(80px)' }}
            animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 500, height: 500, right: '-8%', bottom: '-5%', background: 'radial-gradient(circle, rgba(245,200,66,0.15) 0%, transparent 65%)', filter: 'blur(80px)' }}
            animate={{ x: [0, -40, 0], y: [0, 28, 0], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* Twinkling gold particles */}
          {PARTICLES.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left, top: p.top, width: p.size, height: p.size, background: '#f5c842',
                boxShadow: `0 0 ${p.size * 3.5}px rgba(245,200,66,0.9), 0 0 ${p.size * 7}px rgba(245,200,66,0.45)`,
              }}
              animate={{ opacity: [0.15, 1, 0.15], scale: [1, 2.2, 1] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            />
          ))}
        </div>

        {/* Gold border lines */}
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.5) 20%, rgba(245,200,66,0.8) 50%, rgba(212,160,23,0.5) 80%, transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,160,23,0.5) 20%, rgba(245,200,66,0.8) 50%, rgba(212,160,23,0.5) 80%, transparent)' }} />

        {/* Content */}
        <motion.div
          className="relative z-20 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-10%' }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-xs tracking-[0.3em] font-semibold gold-label-glow uppercase mb-3">
            ✦ Konfirmasi Kehadiran Anda ✦
          </p>

          <h2
            className="text-6xl sm:text-7xl lg:text-8xl static-gold mb-3"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '0.06em' }}
          >
            RSVP
          </h2>

          {/* Elaborate divider */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="h-px w-16 bg-primary/60" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-4 bg-primary/40" />
            <div className="w-1 h-1 rounded-full bg-primary/60" />
            <div className="h-px w-4 bg-primary/40" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-px w-16 bg-primary/60" />
          </div>

          <motion.div
            className="inline-block rounded-xl px-8 py-5 mb-8 gold-glow-card"
            style={{ background: 'rgba(212,160,23,0.07)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <p className="text-xs tracking-[0.25em] text-primary uppercase mb-2">Konfirmasi Sebelum</p>
            <p
              className="text-2xl sm:text-3xl text-foreground"
              style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}
            >
              Minggu, 10 Mei 2026
            </p>
            <p className="text-sm mt-1 text-muted-foreground tracking-wide">pukul 20.00 WITA</p>
          </motion.div>

          <p
            className="text-xl sm:text-2xl text-white white-glow-text italic mb-10 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
          >
            Sampai jumpa dalam malam yang hangat dan berkesan.
          </p>

          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleRsvp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-16 py-7 rounded-full text-base sm:text-lg font-bold tracking-[0.15em] uppercase transition-colors duration-300 shadow-xl hover:shadow-primary/40 hover:shadow-2xl"
              style={{ letterSpacing: '0.15em' }}
            >
              RSVP Sekarang
            </Button>
          </motion.div>

          <p className="text-xs mt-7 tracking-[0.25em] uppercase text-white white-glow-text">
            ✦ Tempat terbatas · Konfirmasi diperlukan ✦
          </p>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-4 px-4 sm:px-6 bg-secondary border-t border-primary/30 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © PT Bagong Sejahtera Abadi. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
    </>
  )
}
