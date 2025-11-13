'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import FrequencyAnalysis from '@/components/FrequencyAnalysis';
import FrequencyComparison from '@/components/FrequencyComparison';
import StepVisualization, { Step } from '@/components/StepVisualization';
import { encrypt, decrypt } from '@/lib/ciphers/caesar';

export default function CaesarPage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('3');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [showVisualization, setShowVisualization] = useState(false);

  const generateEncryptionSteps = (text: string, shift: number): Step[] => {
    const steps: Step[] = [];
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    steps.push({
      title: 'Step 1: Prepare Input',
      description: `Original text: "${text}". We'll shift each letter by ${shift} positions.`,
      input: text,
    });

    let result = '';
    for (let i = 0; i < cleanText.length; i++) {
      const char = cleanText[i];
      const charCode = char.charCodeAt(0) - 65;
      const shifted = (charCode + shift) % 26;
      const newChar = String.fromCharCode(shifted + 65);
      result += newChar;
      
      if (i < 5 || i === cleanText.length - 1) { // Show first 5 and last step
        steps.push({
          title: `Step ${i + 2}: Encrypt '${char}'`,
          description: `${char} (position ${charCode}) + ${shift} = ${shifted} → ${newChar}`,
          input: char,
          highlight: `${charCode} + ${shift} = ${shifted}`,
          output: newChar,
        });
      }
    }
    
    if (cleanText.length > 6) {
      steps.splice(6, 0, {
        title: '...',
        description: `Processing remaining ${cleanText.length - 6} characters...`,
      });
    }
    
    steps.push({
      title: 'Final Result',
      description: 'All characters encrypted!',
      input: text,
      output: encrypt(text, shift),
    });

    return steps;
  };

  const handleEncrypt = () => {
    try {
      setError('');
      const shift = parseInt(key);
      if (isNaN(shift)) {
        setError('Key must be a number');
        return;
      }
      const result = encrypt(input, shift);
      setOutput(result);
      setSteps(generateEncryptionSteps(input, shift));
      setShowVisualization(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      const shift = parseInt(key);
      if (isNaN(shift)) {
        setError('Key must be a number');
        return;
      }
      const result = decrypt(input, shift);
      setOutput(result);
      setSteps(generateEncryptionSteps(input, -shift));
      setShowVisualization(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decryption failed');
    }
  };

  return (
    <CipherLayout
      title="Caesar Cipher"
      description="The Caesar cipher is one of the simplest and most widely known encryption techniques. It shifts each letter by a fixed number of positions in the alphabet."
      input={input}
      setInput={setInput}
      keyValue={key}
      setKeyValue={setKey}
      keyLabel="Shift (0-25)"
      keyPlaceholder="Enter shift value (e.g., 3)"
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
        <FrequencyComparison inputText={input} outputText={output} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Each letter in the plaintext is shifted by a fixed number of positions</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>For example, with a shift of 3: A→D, B→E, C→F, etc.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>The shift wraps around: X→A, Y→B, Z→C (with shift 3)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Non-alphabetic characters remain unchanged</span>
          </li>
        </ul>
      </motion.div>
    </CipherLayout>
  );
}
