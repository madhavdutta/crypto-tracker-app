import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export const NewsSection: React.FC = () => {
  // Mock news data
  const news: NewsItem[] = [
    {
      id: '1',
      title: 'Bitcoin Reaches New Monthly High Amid Institutional Adoption',
      description: 'Major financial institutions continue to embrace Bitcoin as a store of value, driving prices to new monthly highs.',
      url: '#',
      source: 'CryptoNews',
      publishedAt: '2024-01-28T10:30:00Z',
      sentiment: 'positive'
    },
    {
      id: '2',
      title: 'Ethereum 2.0 Staking Rewards Attract More Validators',
      description: 'The Ethereum network sees increased participation in staking as rewards continue to attract new validators.',
      url: '#',
      source: 'BlockchainDaily',
      publishedAt: '2024-01-28T08:15:00Z',
      sentiment: 'positive'
    },
    {
      id: '3',
      title: 'Regulatory Clarity Boosts Crypto Market Confidence',
      description: 'Recent regulatory developments provide clearer guidelines for cryptocurrency operations, boosting market sentiment.',
      url: '#',
      source: 'FinanceToday',
      publishedAt: '2024-01-27T16:45:00Z',
      sentiment: 'positive'
    },
    {
      id: '4',
      title: 'DeFi Protocols Show Resilience Despite Market Volatility',
      description: 'Decentralized finance protocols maintain strong fundamentals even as traditional markets experience turbulence.',
      url: '#',
      source: 'DeFiInsider',
      publishedAt: '2024-01-27T14:20:00Z',
      sentiment: 'neutral'
    }
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-crypto-gain" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-crypto-loss" />;
      default:
        return <Minus className="w-4 h-4 text-crypto-neutral" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <GlassCard className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Latest News</h2>
            <p className="text-gray-400">Stay updated with crypto market</p>
          </div>
        </div>

        <div className="space-y-4">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getSentimentIcon(item.sentiment)}
                  <span className="text-sm text-gray-400">{item.source}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(item.publishedAt)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-gray-400 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
              
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          View All News
        </motion.button>
      </GlassCard>
    </motion.div>
  );
};
