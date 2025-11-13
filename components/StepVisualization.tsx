'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export interface Step {
  title: string;
  description: string;
  input?: string;
  output?: string;
  highlight?: string;
}

interface StepVisualizationProps {
  steps: Step[];
  isPlaying: boolean;
  onComplete?: () => void;
}

export default function StepVisualization({ steps, isPlaying, onComplete }: StepVisualizationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && isAutoPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1 && isAutoPlaying) {
      setIsAutoPlaying(false);
      onComplete?.();
    }
  }, [currentStep, isAutoPlaying, isPlaying, steps.length, onComplete]);

  const handlePlayPause = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAutoPlaying(false);
  };

  if (!steps.length) {
    return null;
  }

  const step = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Step-by-Step Visualization
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={handlePlayPause}
            className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#ff6b6b] transition-colors border border-[#3a3a3a]"
            title={isAutoPlaying ? 'Pause' : 'Auto Play'}
          >
            {isAutoPlaying ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#4ecdc4] transition-colors border border-[#3a3a3a]"
            title="Reset"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
          <span>Step {currentStep + 1} / {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-3 bg-[#0f0f0f] rounded-full overflow-hidden border border-[#2a2a2a]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#4ecdc4]"
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl p-6 mb-4">
            <h4 className="text-xl font-bold text-[#ff6b6b] mb-2">{step.title}</h4>
            <p className="text-gray-400 mb-4">{step.description}</p>
            
            {step.input && (
              <div className="mb-3">
                <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Input:</div>
                <div className="font-mono text-lg bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-[#4ecdc4] text-white">
                  {step.input}
                </div>
              </div>
            )}
            
            {step.highlight && (
              <div className="mb-3">
                <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Processing:</div>
                <div className="font-mono text-lg bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-[#ffe66d] text-[#ffe66d]">
                  {step.highlight}
                </div>
              </div>
            )}
            
            {step.output && (
              <div>
                <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Output:</div>
                <div className="font-mono text-lg bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-[#ff6b6b] text-white">
                  {step.output}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="flex-1 px-4 py-3 bg-[#2a2a2a] hover:bg-[#4ecdc4] hover:text-[#0f0f0f] text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-bold transition-all border border-[#3a3a3a] font-mono uppercase text-sm"
        >
          ← Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="flex-1 px-4 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-bold transition-all font-mono uppercase text-sm"
        >
          Next →
        </button>
      </div>
    </motion.div>
  );
}
