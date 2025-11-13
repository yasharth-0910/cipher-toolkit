'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FrequencyAnalysisProps {
  text: string;
  title?: string;
}

export default function FrequencyAnalysis({ text, title = 'Frequency Analysis' }: FrequencyAnalysisProps) {
  const analysis = useMemo(() => {
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    const frequency: Record<string, number> = {};
    
    for (const char of cleanText) {
      frequency[char] = (frequency[char] || 0) + 1;
    }
    
    const total = cleanText.length;
    const sorted = Object.entries(frequency)
      .map(([letter, count]) => ({
        letter,
        count,
        percentage: ((count / total) * 100).toFixed(2),
      }))
      .sort((a, b) => b.count - a.count);
    
    const maxCount = sorted[0]?.count || 1;
    
    return { sorted, total, maxCount };
  }, [text]);

  if (!text || analysis.total === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        {title}
      </h3>
      
      <div className="mb-4 text-sm text-gray-600">
        Total Letters: <span className="font-semibold">{analysis.total}</span>
      </div>

      <div className="space-y-2">
        {analysis.sorted.map((item, index) => (
          <motion.div
            key={item.letter}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 text-center font-bold text-indigo-600 text-lg">
              {item.letter}
            </div>
            <div className="flex-1">
              <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / analysis.maxCount) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="absolute h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
                <div className="absolute inset-0 flex items-center px-3 text-sm font-medium text-gray-700">
                  <span className="z-10">{item.count} ({item.percentage}%)</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <strong className="text-blue-700">💡 Tip:</strong> In English, the most common letters are E, T, A, O, I, N, S, H, R. 
          Frequency analysis can help crack substitution ciphers!
        </p>
      </div>
    </motion.div>
  );
}
