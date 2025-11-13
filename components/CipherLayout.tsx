'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TextArea from './TextArea';
import Input from './Input';
import Button from './Button';

interface CipherLayoutProps {
  title: string;
  description: string;
  input: string;
  setInput: (value: string) => void;
  keyValue: string;
  setKeyValue: (value: string) => void;
  keyLabel: string;
  keyPlaceholder: string;
  output: string;
  error: string;
  onEncrypt: () => void;
  onDecrypt: () => void;
  children?: ReactNode;
}

export default function CipherLayout({
  title,
  description,
  input,
  setInput,
  keyValue,
  setKeyValue,
  keyLabel,
  keyPlaceholder,
  output,
  error,
  onEncrypt,
  onDecrypt,
  children,
}: CipherLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] cipher-grid relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#ff6b6b]30 text-gray-300 hover:text-[#ff6b6b] hover:border-[#ff6b6b] transition-all duration-300 group"
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: -3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </motion.svg>
            <span className="font-mono text-sm">Back</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            {title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4] rounded-full mb-4" />
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
            {description}
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] mb-6"
        >
          <TextArea
            label="Input Text"
            value={input}
            onChange={setInput}
            placeholder="Enter text to encrypt or decrypt..."
          />

          <Input
            label={keyLabel}
            value={keyValue}
            onChange={setKeyValue}
            placeholder={keyPlaceholder}
          />

          <div className="flex flex-wrap gap-4">
            <Button onClick={onEncrypt}>Encrypt</Button>
            <Button onClick={onDecrypt} variant="secondary">
              Decrypt
            </Button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-[#2a1a1a] border-l-4 border-[#ff6b6b] rounded-lg text-[#ff6b6b] flex items-start gap-3"
            >
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Output Section */}
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] mb-6"
          >
            <TextArea
              label="Output"
              value={output}
              onChange={() => {}}
              placeholder="Result will appear here..."
              readOnly
            />
          </motion.div>
        )}

        {children}
      </div>
    </div>
  );
}
