import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { usePortfolio } from '../hooks/usePortfolio';
import { PortfolioChart } from './PortfolioChart';

export const PortfolioOverview: React.FC = () => {
  const { 
    portfolio, 
    totalValue, 
    totalProfitLoss, 
    totalProfitLossPercentage 
  } = usePortfolio();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Portfolio Summary */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2"
      >
        <GlassCard className="p-6" gradient>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Portfolio Overview</h2>
                <p className="text-gray-400">Your crypto investments</p>
              </div>
            </div>
          </div>

          {/* Total Value */}
          <div className="mb-6">
            <motion.div
              className="text-4xl font-bold text-white mb-2"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5 }}
            >
              {formatCurrency(totalValue)}
            </motion.div>
            <div className={`flex items-center space-x-2 ${
              totalProfitLoss >= 0 ? 'text-crypto-gain' : 'text-crypto-loss'
            }`}>
              {totalProfitLoss >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="text-lg font-semibold">
                {formatCurrency(Math.abs(totalProfitLoss))} ({formatPercentage(totalProfitLossPercentage)})
              </span>
            </div>
          </div>

          {/* Holdings */}
          <div className="space-y-4">
            {portfolio.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {asset.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{asset.name}</div>
                    <div className="text-sm text-gray-400">
                      {asset.amount} {asset.symbol}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-white">
                    {formatCurrency(asset.totalValue)}
                  </div>
                  <div className={`text-sm ${
                    asset.profitLoss >= 0 ? 'text-crypto-gain' : 'text-crypto-loss'
                  }`}>
                    {formatPercentage(asset.profitLossPercentage)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Portfolio Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GlassCard className="p-6" gradient>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Allocation</h3>
              <p className="text-gray-400">Asset distribution</p>
            </div>
          </div>
          
          <PortfolioChart portfolio={portfolio} />
        </GlassCard>
      </motion.div>
    </div>
  );
};
