import React from 'react';
import MysticScrambleText from './MysticScrambleText';
import { historicalNames } from '../../data/historicalNames';

// Shuffle the array to create different sequences for each row
const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// We create a few shuffled sets so rows don't look identical
const rowDataSets = [
  shuffleArray(historicalNames),
  shuffleArray(historicalNames),
  shuffleArray(historicalNames),
  shuffleArray(historicalNames),
  shuffleArray(historicalNames),
  shuffleArray(historicalNames),
  shuffleArray(historicalNames),
  shuffleArray(historicalNames)
];

export default function CrypticBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-around bg-transparent">
      {/* 
        We define a style tag for the CSS marquee animations to ensure they are available
        and performant via CSS transforms.
      */}
      <style>
        {`
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-l {
            display: flex;
            width: max-content;
            animation: marquee-left 400s linear infinite;
            will-change: transform;
          }
          .animate-marquee-r {
            display: flex;
            width: max-content;
            animation: marquee-right 400s linear infinite;
            will-change: transform;
          }
        `}
      </style>

      {/* Dark gradient mask on left and right edges for a fade-in/fade-out effect */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      {rowDataSets.map((dataset, rowIndex) => {
        const isEven = rowIndex % 2 === 0;
        const animationClass = isEven ? 'animate-marquee-l' : 'animate-marquee-r';

        return (
          <div key={rowIndex} className="w-full overflow-hidden opacity-[0.04]">
            <div className={animationClass}>
              {/* Render the list twice to create an infinite scroll illusion */}
              {[1, 2].map((groupIndex) => (
                <div key={groupIndex} className="flex whitespace-nowrap">
                  {dataset.map((name, index) => (
                    <React.Fragment key={`${groupIndex}-${index}`}>
                      <MysticScrambleText 
                        text={name} 
                        className="font-display uppercase text-3xl sm:text-4xl tracking-[0.5em] text-gold-400 font-bold mx-8"
                      />
                      <span className="font-display text-3xl text-gold-600/50 mx-4">·</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
