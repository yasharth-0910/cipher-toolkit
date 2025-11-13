'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import FrequencyComparison from '@/components/FrequencyComparison';
import StepVisualization, { Step } from '@/components/StepVisualization';
import { encrypt, decrypt } from '@/lib/ciphers/mono';

export default function MonoPage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [showVisualization, setShowVisualization] = useState(false);

  const generateEncryptionSteps = (text: string, substitutionKey: string, isEncrypt: boolean = true): Step[] => {
    const steps: Step[] = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cleanKey = substitutionKey.toUpperCase();
    
    if (cleanKey.length !== 26) return [];
    
    steps.push({
      title: 'Step 1: Substitution Mapping',
      description: 'Each letter maps to its substitute in the key',
      input: alphabet.substring(0, 13),
      output: cleanKey.substring(0, 13),
    });
    
    steps.push({
      title: 'Step 2: Complete Mapping',
      description: 'Full alphabet substitution',
      input: alphabet.substring(13),
      output: cleanKey.substring(13),
    });

    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let i = 0; i < Math.min(5, cleanText.length); i++) {
      const char = cleanText[i];
      const index = alphabet.indexOf(char);
      const newChar = isEncrypt ? cleanKey[index] : alphabet[cleanKey.indexOf(char)];
      
      steps.push({
        title: `Step ${i + 3}: ${isEncrypt ? 'Encrypt' : 'Decrypt'} '${char}'`,
        description: `${char} → ${newChar} (position ${index})`,
        input: char,
        highlight: isEncrypt ? `${char} maps to ${newChar}` : `${char} maps back to ${newChar}`,
        output: newChar,
      });
    }
    
    steps.push({
      title: 'Final Result',
      description: 'Complete substitution applied!',
      input: text,
      output: isEncrypt ? encrypt(text, substitutionKey) : decrypt(text, substitutionKey),
    });

    return steps;
  };

  const handleEncrypt = () => {
    try {
      setError('');
      const result = encrypt(input, key);
      setOutput(result);
      setSteps(generateEncryptionSteps(input, key, true));
      setShowVisualization(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      const result = decrypt(input, key);
      setOutput(result);
      setSteps(generateEncryptionSteps(input, key, false));
      setShowVisualization(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    }
  };

  return (
    <CipherLayout
      title="Monoalphabetic Cipher"
      description="A substitution cipher where each letter is replaced with another letter from a scrambled alphabet. The key is a 26-letter permutation of the alphabet."
      input={input}
      setInput={setInput}
      keyValue={key}
      setKeyValue={setKey}
      keyLabel="Substitution Key (26 letters)"
      keyPlaceholder="Enter 26 unique letters (e.g., QWERTYUIOPASDFGHJKLZXCVBNM)"
      output={output}
      error={error}
      onEncrypt={handleEncrypt}
      onDecrypt={handleDecrypt}
    >
      {/* Step-by-Step Visualization */}
      {showVisualization && steps.length > 0 && (
        <StepVisualization 
          steps={steps} 
          isPlaying={true}
          onComplete={() => console.log('Visualization complete')}
        />
      )}

      {/* Frequency Analysis */}
      {input && output && (
        <>
          <FrequencyComparison inputText={input} outputText={output} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200"
          >
            <p className="text-sm text-gray-700">
              <strong className="text-purple-700">💡 Cryptanalysis Tip:</strong> Compare the frequency 
              distribution of the ciphertext with English letter frequencies. The most common letter in 
              your ciphertext likely corresponds to 'E', the second most common to 'T', and so on.
            </p>
          </motion.div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Each letter of the alphabet is mapped to a unique substitute letter</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>The key must contain exactly 26 unique letters</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Example: If key is "QWERTY...", then A→Q, B→W, C→E, etc.</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>More secure than Caesar cipher due to larger key space</span>
          </li>
        </ul>
      </motion.div>
    </CipherLayout>
  );
}
