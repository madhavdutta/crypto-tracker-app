import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  gradient = false 
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl
        shadow-xl shadow-black/10
        ${gradient ? 'bg-gradient-to-br from-white/20 to-white/5' : ''}
        ${hover ? 'hover:bg-white/15 hover:border-white/30 transition-all duration-300' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -2, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
