import { useEffect, useRef } from 'react';
import { getRandomMysticChar } from '../../data/historicalNames';

interface MysticScrambleTextProps {
  text: string;
  className?: string;
}

export default function MysticScrambleText({ text, className = '' }: MysticScrambleTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let frameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    // Scramble state
    let isScrambling = false;
    let scrambleFrameCount = 0;
    const MAX_SCRAMBLE_FRAMES = 30; // How many frames it stays scrambled (shorter = faster)
    const SCRAMBLE_SPEED = 2; // Update every N frames
    
    const animate = () => {
      if (!textRef.current) return;
      
      if (isScrambling) {
        if (scrambleFrameCount % SCRAMBLE_SPEED === 0) {
          // Generate scrambled string of same length
          let scrambled = '';
          for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
              scrambled += ' ';
            } else {
              scrambled += getRandomMysticChar();
            }
          }
          textRef.current.innerText = scrambled;
        }
        
        scrambleFrameCount++;
        
        if (scrambleFrameCount > MAX_SCRAMBLE_FRAMES) {
          // Stop scrambling, revert to original
          isScrambling = false;
          textRef.current.innerText = text;
          
          // Schedule next scramble (fast random interval since user requested "fast")
          scheduleNextScramble();
        }
      }
      
      frameId = requestAnimationFrame(animate);
    };
    
    const scheduleNextScramble = () => {
      // Random interval between 2s and 6s
      const delay = 2000 + Math.random() * 4000;
      timeoutId = setTimeout(() => {
        isScrambling = true;
        scrambleFrameCount = 0;
      }, delay);
    };
    
    // Start initial delay randomly so they don't all scramble at once
    timeoutId = setTimeout(() => {
      isScrambling = true;
      scrambleFrameCount = 0;
    }, Math.random() * 5000);
    
    frameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [text]);
  
  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
}
