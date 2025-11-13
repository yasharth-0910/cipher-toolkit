'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import { encrypt, decrypt } from '@/lib/ciphers/otp';

export default function OTPPage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncrypt = () => {
    try {
      setError('');
      const result = encrypt(input, key);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      const result = decrypt(input, key);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    }
  };

  return (
    <CipherLayout
      title="One-Time Pad"
      description="The only theoretically unbreakable cipher. It uses a random key that is as long as the message and is used only once."
      input={input}
      setInput={setInput}
      keyValue={key}
      setKeyValue={setKey}
      keyLabel="Key (same length as text)"
      keyPlaceholder="Enter random key (must be same length as message)"
      output={output}
      error={error}
      onEncrypt={handleEncrypt}
      onDecrypt={handleDecrypt}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-cyan-600 mr-2">•</span>
            <span>Key must be truly random and as long as the message</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-600 mr-2">•</span>
            <span>Each character is XORed with the corresponding key character</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-600 mr-2">•</span>
            <span>The key must never be reused (hence "one-time")</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-600 mr-2">•</span>
            <span>Mathematically proven to be unbreakable when used correctly</span>
          </li>
        </ul>
      </motion.div>
    </CipherLayout>
  );
}
