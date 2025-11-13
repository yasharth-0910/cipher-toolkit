'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import FrequencyComparison from '@/components/FrequencyComparison';
import StepVisualization, { Step } from '@/components/StepVisualization';
import { encrypt, decrypt } from '@/lib/ciphers/playfair';

export default function PlayfairPage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [showVisualization, setShowVisualization] = useState(false);

  const generateEncryptionSteps = (text: string, keyword: string): Step[] => {
    const steps: Step[] = [];
    
    // Build the 5x5 matrix
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // J is combined with I
    const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let matrix = '';
    const used = new Set<string>();
    
    for (const char of cleanKey) {
      if (!used.has(char)) {
        matrix += char;
        used.add(char);
      }
    }
    
    for (const char of alphabet) {
      if (!used.has(char)) {
        matrix += char;
      }
    }
    
    steps.push({
      title: 'Step 1: Build 5×5 Matrix',
      description: `Creating matrix from keyword "${keyword}"`,
      input: keyword,
      output: matrix.match(/.{1,5}/g)?.join('\n') || matrix,
    });
    
    // Prepare text
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let prepared = '';
    for (let i = 0; i < cleanText.length; i++) {
      prepared += cleanText[i];
      if (i + 1 < cleanText.length && cleanText[i] === cleanText[i + 1]) {
        prepared += 'X';
      }
    }
    if (prepared.length % 2 !== 0) prepared += 'X';
    
    steps.push({
      title: 'Step 2: Prepare Text',
      description: 'Split into digraphs, add X between doubles',
      input: cleanText,
      output: prepared.match(/.{1,2}/g)?.join(' ') || prepared,
    });
    
    // Show first few digraph encryptions
    const pairs = prepared.match(/.{1,2}/g) || [];
    for (let i = 0; i < Math.min(3, pairs.length); i++) {
      const pair = pairs[i];
      steps.push({
        title: `Step ${i + 3}: Encrypt '${pair}'`,
        description: `Processing digraph using matrix rules`,
        input: pair,
        highlight: 'Finding positions in 5×5 matrix',
      });
    }
    
    steps.push({
      title: 'Final Result',
      description: 'All digraphs encrypted!',
      input: text,
      output: encrypt(text, keyword),
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
      title="Playfair Cipher"
      description="A digraph substitution cipher that encrypts pairs of letters using a 5×5 matrix constructed from a keyword. It was the first practical digraph substitution cipher."
      input={input}
      setInput={setInput}
      keyValue={key}
      setKeyValue={setKey}
      keyLabel="Keyword"
      keyPlaceholder="Enter keyword (e.g., MONARCHY)"
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
            <span className="text-green-600 mr-2">•</span>
            <span>Creates a 5×5 matrix from the keyword (I and J share a cell)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Text is divided into pairs (digraphs) and encrypted together</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>If both letters are in the same row/column, shift is applied</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Otherwise, they form a rectangle and are swapped accordingly</span>
          </li>
        </ul>
      </motion.div>
    </CipherLayout>
  );
}
