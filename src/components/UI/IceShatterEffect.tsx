import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const IceShatterEffect: React.FC = () => {
  // Generate premium floating golden dust motes
  const [motes] = useState(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const size = 1.5 + Math.random() * 3;
      const initialX = (Math.random() - 0.5) * 100;
      const initialY = (Math.random() - 0.5) * 100;
      const duration = 12 + Math.random() * 15;
      const delay = Math.random() * 5;
      const targetX = (initialX * 4) + (Math.random() > 0.5 ? 40 : -40);
      return { id: i, size, initialX, initialY, duration, delay, targetX };
    });
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden rounded-3xl">
      {/* 1. White Studio Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_0%,#f3f4f6_60%,#e5e7eb_100%)]" />
      
      {/* 2. Soft Natural Studio Lights (Warm & Cool Balance) */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-orange-100/40 blur-[90px]"
        animate={{
          x: [-30, 30, -30],
          y: [-20, 20, -20],
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute w-[600px] h-[400px] rounded-full bg-blue-50/50 blur-[100px]"
        animate={{
          x: [40, -40, 40],
          y: [30, -30, 30],
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* 3. Subtle Sweeping Light Rays (Bright God Rays) */}
      <div className="absolute inset-0 overflow-hidden opacity-40 mix-blend-overlay">
        <motion.div 
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_0%,transparent_0deg,rgba(255,255,255,0.8)_45deg,rgba(255,255,255,1)_90deg,rgba(255,255,255,0.8)_135deg,transparent_180deg)]"
          animate={{
            rotate: [-10, 10, -10]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: 'top center' }}
        />
      </div>

      {/* 4. Cinematic Dust Motes (Floating Gold particles) */}
      {motes.map((mote) => (
        <motion.div
          key={mote.id}
          className="absolute rounded-full bg-gold-400 opacity-60 mix-blend-multiply"
          initial={{
            x: mote.initialX * 4,
            y: 200,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: -200,
            x: mote.targetX,
            scale: [0, 1, 1, 0],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: mote.duration,
            repeat: Infinity,
            ease: "linear",
            delay: mote.delay,
          }}
          style={{
            width: mote.size,
            height: mote.size,
            boxShadow: '0 0 10px rgba(197, 165, 90, 0.4)',
            filter: 'blur(0.3px)',
          }}
        />
      ))}
    </div>
  );
};

export default IceShatterEffect;
