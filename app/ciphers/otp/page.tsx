'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import FrequencyComparison from '@/components/FrequencyComparison';
import StepVisualization, { Step } from '@/components/StepVisualization';
import { encrypt, decrypt } from '@/lib/ciphers/otp';

export default function OTPPage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [showVisualization, setShowVisualization] = useState(false);

  const generateEncryptionSteps = (text: string, keyStr: string): Step[] => {
    const steps: Step[] = [];
    
    steps.push({
      title: 'Step 1: Convert to Binary',
      description: 'Converting text and key to binary representation',
      input: text.substring(0, 8),
      highlight: 'Each character → 8-bit binary',
    });
    
    // Show first character XOR
    if (text.length > 0 && keyStr.length > 0) {
      const textBin = text.charCodeAt(0).toString(2).padStart(8, '0');
      const keyBin = keyStr.charCodeAt(0).toString(2).padStart(8, '0');
      const xorBin = (text.charCodeAt(0) ^ keyStr.charCodeAt(0)).toString(2).padStart(8, '0');
      
      steps.push({
        title: `Step 2: XOR Operation '${text[0]}'`,
        description: 'Bitwise XOR with key',
        input: `${text[0]}: ${textBin}`,
        highlight: `${keyStr[0]}: ${keyBin}`,
        output: `Result: ${xorBin}`,
      });
      
      steps.push({
        title: 'Step 3: Convert Back',
        description: 'Binary to character',
        input: xorBin,
        output: String.fromCharCode(parseInt(xorBin, 2)),
      });
    }
    
    steps.push({
      title: 'Step 4: Repeat for All',
      description: 'XOR each character with corresponding key character',
      highlight: 'Text ⊕ Key = Ciphertext',
    });
    
    steps.push({
      title: 'Final Result',
      description: 'All characters encrypted!',
      input: text,
      output: encrypt(text, keyStr),
    });
    
    return steps;
  };

  const handleEncrypt = () => {
    try {
      setError('');
      const result = encrypt(input, key);
      setOutput(result);
      setSteps(generateEncryptionSteps(input, key));
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
      setSteps(generateEncryptionSteps(input, key));
      setShowVisualization(true);
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
        className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
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
