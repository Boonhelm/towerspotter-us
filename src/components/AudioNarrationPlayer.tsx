import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw } from 'lucide-react';
import { WaterTower } from '../types/tower.ts';

interface AudioNarrationPlayerProps {
  tower: WaterTower;
}

export const AudioNarrationPlayer: React.FC<AudioNarrationPlayerProps> = ({ tower }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  // When tower changes, cancel ongoing narration cleanly
  useEffect(() => {
    handleStop();
    return () => {
      handleStop();
    };
  }, [tower.id]);

  const assembleScript = (): string => {
    const triviaOne = tower.triviaLore[0] || '';
    const triviaTwo = tower.triviaLore[1] || '';
    return `This is ${tower.name}, in ${tower.city}, ${tower.stateFullName}. ` +
      `It was built in ${tower.yearBuilt}. It is ${tower.heightFt} feet tall, and holds ${tower.capacityGallons.toLocaleString()} gallons of water. ` +
      `Fun fact: ${tower.funFact}. ` +
      `Story: ${tower.heritageHistory}. ` +
      `${triviaOne}. ${triviaTwo}.`;
  };

  const handleStartPlay = () => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();

    const scriptText = assembleScript();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    utteranceRef.current = utterance;

    utterance.rate = 0.95; // Clear, comfortable natural reading speed
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePause = () => {
    if (!isSupported) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-sky-50 border-2 border-sky-200">
      {/* Big Friendly Audio Play Button */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {!isPlaying ? (
          <button
            onClick={handleStartPlay}
            className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm sm:text-base lg:text-lg shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            aria-label={`Read story aloud for ${tower.name}`}
          >
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            <span>Read Story Aloud</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleTogglePause}
              className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer"
              aria-label={isPaused ? 'Resume reading' : 'Pause reading'}
            >
              {isPaused ? <Play className="w-4 h-4 sm:w-5 sm:h-5" /> : <Pause className="w-4 h-4 sm:w-5 sm:h-5" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button
              onClick={handleStop}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold text-sm sm:text-base transition-all cursor-pointer"
              aria-label="Stop reading"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Stop</span>
            </button>
          </div>
        )}

        {/* Live Audio Waves */}
        {isPlaying && !isPaused && (
          <div className="flex items-end gap-1.5 h-6 px-1" aria-hidden="true">
            <span className="w-1.5 bg-sky-600 rounded-full animate-bounce [animation-delay:0ms] h-3"></span>
            <span className="w-1.5 bg-sky-600 rounded-full animate-bounce [animation-delay:150ms] h-6"></span>
            <span className="w-1.5 bg-sky-600 rounded-full animate-bounce [animation-delay:300ms] h-4"></span>
            <span className="w-1.5 bg-sky-600 rounded-full animate-bounce [animation-delay:75ms] h-2"></span>
            <span className="w-1.5 bg-sky-600 rounded-full animate-bounce [animation-delay:225ms] h-5"></span>
          </div>
        )}

        <div className="text-xs sm:text-sm lg:text-base font-bold text-sky-950">
          {isPlaying
            ? isPaused
              ? 'Story paused'
              : 'Reading aloud to you...'
            : 'Press button to hear the story'}
        </div>
      </div>
    </div>
  );
};
