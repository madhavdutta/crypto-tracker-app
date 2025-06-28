import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Star, Plus } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { CryptoCurrency } from '../types/crypto';
import { MiniChart } from './MiniChart';

interface CryptoTableProps {
  cryptos: CryptoCurrency[];
  loading: boolean;
}

export const CryptoTable: React.FC<CryptoTableProps> = ({ cryptos, loading }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['bitcoin', 'ethereum']));
  const [sortBy, setSortBy] = useState<'market_cap_rank' | 'price_change_percentage_24h'>('market_cap_rank');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: value < 1 ? 6 : 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatMarketCap = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(value);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const sortedCryptos = [...cryptos].sort((a, b) => {
    if (sortBy === 'market_cap_rank') {
      return a.market_cap_rank - b.market_cap_rank;
    }
    return b.price_change_percentage_24h - a.price_change_percentage_24h;
  });

  if (loading) {
    return (
      <GlassCard className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded mb-4"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-4">
              <div className="w-8 h-8 bg-white/10 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-1/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/6"></div>
              </div>
              <div className="w-20 h-4 bg-white/10 rounded"></div>
              <div className="w-16 h-4 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Market Overview</h2>
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="market_cap_rank">Market Cap</option>
              <option value="price_change_percentage_24h">24h Change</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6 text-gray-400 font-medium">#</th>
              <th className="text-left py-4 px-6 text-gray-400 font-medium">Name</th>
              <th className="text-right py-4 px-6 text-gray-400 font-medium">Price</th>
              <th className="text-right py-4 px-6 text-gray-400 font-medium">24h %</th>
              <th className="text-right py-4 px-6 text-gray-400 font-medium">Market Cap</th>
              <th className="text-center py-4 px-6 text-gray-400 font-medium">7d Chart</th>
              <th className="text-center py-4 px-6 text-gray-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedCryptos.slice(0, 20).map((crypto, index) => (
                <motion.tr
                  key={crypto.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(crypto.id)}
                        className={`p-1 rounded transition-colors ${
                          favorites.has(crypto.id)
                            ? 'text-yellow-400 hover:text-yellow-300'
                            : 'text-gray-500 hover:text-gray-400'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${favorites.has(crypto.id) ? 'fill-current' : ''}`} />
                      </button>
                      <span className="text-gray-400 font-medium">
                        {crypto.market_cap_rank}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/32/667eea/ffffff?text=${crypto.symbol.charAt(0)}`;
                        }}
                      />
                      <div>
                        <div className="font-medium text-white">{crypto.name}</div>
                        <div className="text-sm text-gray-400 uppercase">
                          {crypto.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6 text-right">
                    <motion.div
                      className="font-medium text-white"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.3 }}
                      key={crypto.current_price}
                    >
                      {formatCurrency(crypto.current_price)}
                    </motion.div>
                  </td>
                  
                  <td className="py-4 px-6 text-right">
                    <div className={`flex items-center justify-end space-x-1 ${
                      crypto.price_change_percentage_24h >= 0
                        ? 'text-crypto-gain'
                        : 'text-crypto-loss'
                    }`}>
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {formatPercentage(crypto.price_change_percentage_24h)}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6 text-right">
                    <div className="text-white font-medium">
                      {formatMarketCap(crypto.market_cap)}
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <MiniChart
                        data={crypto.sparkline_in_7d.price}
                        color={crypto.price_change_percentage_24h >= 0 ? '#10B981' : '#EF4444'}
                      />
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
