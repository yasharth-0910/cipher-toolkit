'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CipherLayout from '@/components/CipherLayout';
import FrequencyComparison from '@/components/FrequencyComparison';
import StepVisualization, { Step } from '@/components/StepVisualization';
import { encrypt, decrypt } from '@/lib/ciphers/vigenere';

export default function VigenerePage() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [showVisualization, setShowVisualization] = useState(false);

  const generateEncryptionSteps = (text: string, keyword: string, isEncrypt: boolean = true): Step[] => {
    const steps: Step[] = [];
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, '');
    
    if (!cleanKey) return [];
    
    steps.push({
      title: 'Step 1: Prepare Key',
      description: `The keyword "${keyword}" will be repeated to match the text length.`,
      input: text,
      highlight: cleanKey,
    });

    let repeatedKey = '';
    for (let i = 0; i < cleanText.length; i++) {
      repeatedKey += cleanKey[i % cleanKey.length];
    }
    
    steps.push({
      title: 'Step 2: Repeat Keyword',
      description: `Keyword repeated: ${repeatedKey.substring(0, 20)}${repeatedKey.length > 20 ? '...' : ''}`,
      input: cleanText.substring(0, 20),
      output: repeatedKey.substring(0, 20),
    });

    let result = '';
    for (let i = 0; i < Math.min(5, cleanText.length); i++) {
      const char = cleanText[i];
      const keyChar = repeatedKey[i];
      const charCode = char.charCodeAt(0) - 65;
      const keyCode = keyChar.charCodeAt(0) - 65;
      const shift = isEncrypt ? (charCode + keyCode) % 26 : (charCode - keyCode + 26) % 26;
      const newChar = String.fromCharCode(shift + 65);
      result += newChar;
      
      steps.push({
        title: `Step ${i + 3}: ${isEncrypt ? 'Encrypt' : 'Decrypt'} '${char}'`,
        description: `${char}(${charCode}) ${isEncrypt ? '+' : '-'} ${keyChar}(${keyCode}) = ${shift} → ${newChar}`,
        input: `Text: ${char}, Key: ${keyChar}`,
        highlight: `${charCode} ${isEncrypt ? '+' : '-'} ${keyCode} = ${shift}`,
        output: newChar,
      });
    }
    
    steps.push({
      title: 'Final Result',
      description: 'All characters processed!',
      input: text,
      output: isEncrypt ? encrypt(text, keyword) : decrypt(text, keyword),
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
      title="Vigenère Cipher"
      description="A polyalphabetic substitution cipher that uses a keyword to shift letters by different amounts. It's stronger than Caesar cipher as it uses multiple shift values."
      input={input}
      setInput={setInput}
      keyValue={key}
      setKeyValue={setKey}
      keyLabel="Keyword"
      keyPlaceholder="Enter keyword (e.g., SECRET)"
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
        className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>The keyword is repeated to match the length of the plaintext</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Each letter in the keyword determines the shift for that position</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Example: Key "CAT" gives shifts of 2, 0, 19 repeatedly</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-600 mr-2">•</span>
            <span>Resistant to simple frequency analysis attacks</span>
          </li>
        </ul>
      </motion.div>
    </CipherLayout>
  );
}
