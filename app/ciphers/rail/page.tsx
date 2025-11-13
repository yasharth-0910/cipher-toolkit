'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import { encrypt, decrypt } from '@/lib/ciphers/rail';

export default function RailPage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('3');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncrypt = () => {
    try {
      setError('');
      const rails = parseInt(key);
      if (isNaN(rails) || rails < 2) {
        setError('Number of rails must be at least 2');
        return;
      }
      const result = encrypt(input, rails);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      const rails = parseInt(key);
      if (isNaN(rails) || rails < 2) {
        setError('Number of rails must be at least 2');
        return;
      }
      const result = decrypt(input, rails);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    }
  };

  return (
    <CipherLayout
      title="Rail Fence Cipher"
      description="A transposition cipher that writes the message in a zigzag pattern across multiple 'rails' and then reads it off row by row."
      input={input}
      setInput={setInput}
      keyValue={key}
      setKeyValue={setKey}
      keyLabel="Number of Rails"
      keyPlaceholder="Enter number of rails (e.g., 3)"
      output={output}
      error={error}
      onEncrypt={handleEncrypt}
      onDecrypt={handleDecrypt}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl border border-indigo-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-indigo-600 mr-2">•</span>
            <span>Text is written in a zigzag pattern across multiple rails</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-600 mr-2">•</span>
            <span>For 3 rails: first letter on rail 1, second on rail 2, third on rail 3, fourth back on rail 2, etc.</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-600 mr-2">•</span>
            <span>Ciphertext is created by reading each rail from left to right</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-600 mr-2">•</span>
            <span>A transposition cipher - rearranges letters without substitution</span>
          </li>
        </ul>
      </motion.div>
    </CipherLayout>
  );
}
