import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, TrendingUp, Wallet, Settings, Bell } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 rounded-xl bg-gradient-to-r from-crypto-bitcoin to-yellow-500 animate-glow">
              <Bitcoin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CryptoGlass
              </h1>
              <p className="text-xs text-gray-400">Professional Tracker</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { icon: TrendingUp, label: 'Markets', active: true },
              { icon: Wallet, label: 'Portfolio', active: false },
              { icon: Settings, label: 'Settings', active: false }
            ].map((item, index) => (
              <motion.button
                key={item.label}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300
                  ${item.active 
                    ? 'bg-white/20 text-white border border-white/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <GlassCard className="p-2" hover={false}>
              <Bell className="w-5 h-5 text-gray-300" />
            </GlassCard>
            <GlassCard className="px-4 py-2" hover={false}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
