'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import FrequencyComparison from '@/components/FrequencyComparison';
import StepVisualization, { Step } from '@/components/StepVisualization';
import { encrypt, decrypt } from '@/lib/ciphers/hill';

export default function HillPage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [showVisualization, setShowVisualization] = useState(false);

  const generateEncryptionSteps = (text: string, keyStr: string): Step[] => {
    const steps: Step[] = [];
    const keyNums = keyStr.split(',').map(n => parseInt(n.trim()));
    const size = Math.sqrt(keyNums.length);
    
    steps.push({
      title: 'Step 1: Parse Key Matrix',
      description: `Converting key to ${size}×${size} matrix`,
      input: keyStr,
      output: keyNums.join(', '),
    });
    
    // Show matrix
    const matrixRows = [];
    for (let i = 0; i < size; i++) {
      matrixRows.push(keyNums.slice(i * size, (i + 1) * size).join(' '));
    }
    
    steps.push({
      title: 'Step 2: Key Matrix',
      description: 'Matrix for multiplication',
      output: matrixRows.join('\n'),
    });
    
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    steps.push({
      title: 'Step 3: Prepare Text',
      description: `Splitting into blocks of ${size}`,
      input: text,
      output: cleanText.match(new RegExp(`.{1,${size}}`, 'g'))?.join(' ') || cleanText,
    });
    
    // Show first block encryption
    if (cleanText.length >= size) {
      const block = cleanText.substring(0, size);
      const blockNums = block.split('').map(c => c.charCodeAt(0) - 65);
      
      steps.push({
        title: `Step 4: Encrypt Block '${block}'`,
        description: 'Matrix multiplication with key',
        input: block,
        highlight: `[${blockNums.join(', ')}] × Matrix`,
      });
    }
    
    steps.push({
      title: 'Final Result',
      description: 'All blocks encrypted!',
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
      title="Hill Cipher"
      description="A polygraphic substitution cipher based on linear algebra. It encrypts blocks of letters using matrix multiplication with a key matrix."
      input={input}
      setInput={setInput}
      keyValue={key}
      setKeyValue={setKey}
      keyLabel="Key Matrix (comma-separated)"
      keyPlaceholder="Enter 4 or 9 numbers (e.g., 6,24,1,13 for 2×2)"
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
        className="mt-8 p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>Uses matrix multiplication to encrypt blocks of letters</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>Key must be a 2×2 or 3×3 invertible matrix</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>Example: For 2×2, provide 4 numbers like "6,24,1,13"</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>Highly resistant to frequency analysis due to block encryption</span>
          </li>
        </ul>
      </motion.div>
    </CipherLayout>
  );
}
