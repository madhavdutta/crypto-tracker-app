import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { MarketData } from '../types/crypto';

interface MarketOverviewProps {
  marketData: MarketData | null;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ marketData }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const stats = [
    {
      title: 'Total Market Cap',
      value: marketData?.total_market_cap?.usd || 1750000000000,
      change: marketData?.market_cap_change_percentage_24h_usd || 2.45,
      icon: DollarSign,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: '24h Volume',
      value: marketData?.total_volume?.usd || 65000000000,
      change: 5.23,
      icon: BarChart3,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'BTC Dominance',
      value: (marketData?.market_cap_percentage?.btc || 48.5),
      change: -0.15,
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-600',
      isPercentage: true
    },
    {
      title: 'ETH Dominance',
      value: (marketData?.market_cap_percentage?.eth || 18.2),
      change: 0.32,
      icon: TrendingUp,
      gradient: 'from-indigo-500 to-blue-600',
      isPercentage: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <GlassCard className="p-6" gradient>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} animate-float`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 ${
                stat.change >= 0 ? 'text-crypto-gain' : 'text-crypto-loss'
              }`}>
                {stat.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {formatPercentage(stat.change)}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-white">
                {stat.isPercentage 
                  ? `${stat.value.toFixed(1)}%`
                  : formatCurrency(stat.value)
                }
              </p>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};
