'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CipherCard from '@/components/CipherCard';
import { useState, useEffect } from 'react';

const ciphers = [
  {
    title: 'Caesar Cipher',
    description: 'Simple substitution cipher with fixed shift',
    href: '/ciphers/caesar',
    icon: '🔄',
    gradient: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Monoalphabetic Cipher',
    description: 'Substitution cipher with custom alphabet mapping',
    href: '/ciphers/mono',
    icon: '🔤',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Playfair Cipher',
    description: 'Digraph substitution using a 5×5 grid',
    href: '/ciphers/playfair',
    icon: '📊',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Hill Cipher',
    description: 'Matrix-based polygraphic substitution cipher',
    href: '/ciphers/hill',
    icon: '🔢',
    gradient: 'bg-gradient-to-br from-red-500/20 to-orange-500/20',
  },
  {
    title: 'Vigenère Cipher',
    description: 'Polyalphabetic cipher using a keyword',
    href: '/ciphers/vigenere',
    icon: '🔑',
    gradient: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20',
  },
  {
    title: 'One-Time Pad',
    description: 'Unbreakable cipher with random key',
    href: '/ciphers/otp',
    icon: '🎲',
    gradient: 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20',
  },
  {
    title: 'Rail Fence Cipher',
    description: 'Transposition cipher using zigzag pattern',
    href: '/ciphers/rail',
    icon: '⚡',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0f0f] relative overflow-hidden cipher-grid">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(78,205,196,0.1) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,230,109,0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 border border-[#ff6b6b] rounded-full text-[#ff6b6b] text-sm font-mono uppercase tracking-wider">
              🔐 Classical Cryptography
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 relative inline-block">
            <span className="text-white">Cipher</span>
            <span className="text-[#ff6b6b]"> Lab</span>
            <motion.span
              className="absolute -top-4 -right-12 text-4xl"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡
            </motion.span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Decrypt the secrets of classical cryptography. 
            <span className="text-[#4ecdc4]"> Visualize</span>, 
            <span className="text-[#ffe66d]"> analyze</span>, and 
            <span className="text-[#ff6b6b]"> master</span> ancient encryption techniques.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {ciphers.map((cipher, index) => (
            <CipherCard
              key={cipher.title}
              title={cipher.title}
              description={cipher.description}
              href={cipher.href}
              icon={cipher.icon}
              gradient={cipher.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-20 text-gray-500 text-sm"
        >
        </motion.div>
      </div>
    </main>
  )
}
