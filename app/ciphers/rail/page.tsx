'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import FrequencyComparison from '@/components/FrequencyComparison';
import StepVisualization, { Step } from '@/components/StepVisualization';
import { encrypt, decrypt } from '@/lib/ciphers/rail';

export default function RailFencePage() {
  const [input, setInput] = useState('');
  const [rails, setRails] = useState('3');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [showVisualization, setShowVisualization] = useState(false);

  const generateEncryptionSteps = (text: string, railsNum: number): Step[] => {
    const steps: Step[] = [];
    
    steps.push({
      title: 'Step 1: Create Rails',
      description: `Setting up ${railsNum} rails in zigzag pattern`,
      highlight: `${railsNum} rails`,
    });
    
    // Build zigzag visualization
    const fence: string[][] = Array(railsNum).fill(null).map(() => []);
    let rail = 0;
    let direction = 1;
    
    for (let i = 0; i < Math.min(text.length, 10); i++) {
      fence[rail].push(text[i]);
      rail += direction;
      if (rail === 0 || rail === railsNum - 1) {
        direction *= -1;
      }
    }
    
    const zigzagDisplay = fence.map((row, idx) => 
      `Rail ${idx + 1}: ${row.join(' ')}`
    ).join('\n');
    
    steps.push({
      title: 'Step 2: Place Characters',
      description: 'Characters placed in zigzag pattern',
      input: text.substring(0, 10),
      output: zigzagDisplay,
    });
    
    steps.push({
      title: 'Step 3: Read Row by Row',
      description: 'Concatenate each rail from top to bottom',
      highlight: 'Read horizontally across each rail',
    });
    
    steps.push({
      title: 'Final Result',
      description: 'All rails combined!',
      input: text,
      output: encrypt(text, railsNum),
    });
    
    return steps;
  };

  const handleEncrypt = () => {
    try {
      setError('');
      const railsNum = parseInt(rails);
      if (isNaN(railsNum) || railsNum < 2) {
        setError('Number of rails must be at least 2');
        return;
      }
      const result = encrypt(input, railsNum);
      setOutput(result);
      setSteps(generateEncryptionSteps(input, railsNum));
      setShowVisualization(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    }
  };

  const handleDecrypt = () => {
    try {
      setError('');
      const railsNum = parseInt(rails);
      const result = decrypt(input, railsNum);
      setOutput(result);
      setSteps(generateEncryptionSteps(input, railsNum));
      setShowVisualization(true);
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
      keyValue={rails}
      setKeyValue={setRails}
      keyLabel="Number of Rails"
      keyPlaceholder="Enter number of rails (e.g., 3)"
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
        className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200"
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
