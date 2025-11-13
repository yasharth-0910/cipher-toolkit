'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CipherCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
  delay?: number;
}

export default function CipherCard({
  title,
  description,
  icon,
  href,
  gradient,
  delay = 0,
}: CipherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative h-full bg-[#1a1a2e] rounded-2xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`} />
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>

          <div className="relative p-8 h-full flex flex-col">
            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
              {title}
            </h3>

            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex-1">
              {description}
            </p>

            <div className="flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 mt-4">
              <span className="text-sm font-semibold mr-2">Explore</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}
