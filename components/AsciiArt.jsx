'use client';

import { useEffect, useState } from 'react';

export default function AsciiArt({ art, animate = true }) {
  const [displayedArt, setDisplayedArt] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!art || !animate) {
      setDisplayedArt(art || '');
      return;
    }

    // Animate ASCII art appearing character by character
    setDisplayedArt('');
    setCurrentIndex(0);
  }, [art, animate]);

  useEffect(() => {
    if (!animate || !art || currentIndex >= art.length) {
      if (currentIndex >= art.length && art) {
        setDisplayedArt(art);
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedArt(art.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, 2); // Fast animation

    return () => clearTimeout(timer);
  }, [currentIndex, art, animate]);

  if (!art) return null;

  return (
    <pre className="text-green-400 font-mono text-xs sm:text-sm leading-tight my-2">
      {animate ? displayedArt : art}
    </pre>
  );
}
