'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FrequencyComparisonProps {
  inputText: string;
  outputText: string;
}

export default function FrequencyComparison({ inputText, outputText }: FrequencyComparisonProps) {
  const analysis = useMemo(() => {
    const getFrequency = (text: string) => {
      const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
      const frequency: Record<string, number> = {};
      
      for (const char of cleanText) {
        frequency[char] = (frequency[char] || 0) + 1;
      }
      
      const total = cleanText.length;
      return Object.entries(frequency)
        .map(([letter, count]) => ({
          letter,
          count,
          percentage: ((count / total) * 100).toFixed(1),
        }))
        .sort((a, b) => b.count - a.count);
    };

    return {
      input: getFrequency(inputText),
      output: getFrequency(outputText),
    };
  }, [inputText, outputText]);

  if (!inputText || !outputText) {
    return null;
  }

  const maxCount = Math.max(
    analysis.input[0]?.count || 1,
    analysis.output[0]?.count || 1
  );

  // English letter frequencies for reference
  const englishFreq = {
    E: 12.7, T: 9.1, A: 8.2, O: 7.5, I: 7.0, N: 6.7, S: 6.3, H: 6.1,
    R: 6.0, D: 4.3, L: 4.0, C: 2.8, U: 2.8, M: 2.4, W: 2.4, F: 2.2,
    G: 2.0, Y: 2.0, P: 1.9, B: 1.5, V: 1.0, K: 0.8, J: 0.2, X: 0.2, Q: 0.1, Z: 0.1
  };

  const topInputLetters = analysis.input.slice(0, 5);
  const topOutputLetters = analysis.output.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a]"
    >
      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
        <span className="text-3xl">📊</span>
        <span>Frequency Analysis</span>
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Input Frequencies */}
        <div>
          <h4 className="font-bold text-white mb-4 flex items-center gap-2 font-mono uppercase tracking-wider text-sm">
            <span className="w-3 h-3 bg-[#4ecdc4] rounded-full"></span>
            Input Text
          </h4>
          <div className="space-y-2">
            {topInputLetters.map((item, index) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 text-center font-black text-[#4ecdc4] text-lg font-mono">{item.letter}</div>
                <div className="flex-1">
                  <div className="relative h-8 bg-[#0f0f0f] rounded-lg overflow-hidden border border-[#2a2a2a]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="absolute h-full bg-gradient-to-r from-[#4ecdc4] to-[#3db5ad]"
                    />
                    <div className="absolute inset-0 flex items-center px-3 text-xs font-bold text-white font-mono">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Output Frequencies */}
        <div>
          <h4 className="font-bold text-white mb-4 flex items-center gap-2 font-mono uppercase tracking-wider text-sm">
            <span className="w-3 h-3 bg-[#ff6b6b] rounded-full"></span>
            Output Text
          </h4>
          <div className="space-y-2">
            {topOutputLetters.map((item, index) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 text-center font-black text-[#ff6b6b] text-lg font-mono">{item.letter}</div>
                <div className="flex-1">
                  <div className="relative h-8 bg-[#0f0f0f] rounded-lg overflow-hidden border border-[#2a2a2a]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="absolute h-full bg-gradient-to-r from-[#ff6b6b] to-[#ff5252]"
                    />
                    <div className="absolute inset-0 flex items-center px-3 text-xs font-bold text-white font-mono">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* English Reference */}
      <div className="p-5 bg-[#0f0f0f] rounded-xl border-l-4 border-[#ffe66d]">
        <h4 className="font-bold text-[#ffe66d] mb-3 flex items-center gap-2">
          <span>�</span>
          <span>English Letter Frequency Reference</span>
        </h4>
        <div className="text-sm text-gray-400 space-y-2 font-mono">
          <p><strong className="text-white">Most common:</strong> E (12.7%), T (9.1%), A (8.2%), O (7.5%), I (7.0%)</p>
          <p className="text-xs leading-relaxed">
            <strong className="text-[#ffe66d]">Cryptanalysis Tip:</strong> If output maintains similar frequency patterns, 
            the cipher is vulnerable to frequency analysis attacks!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
