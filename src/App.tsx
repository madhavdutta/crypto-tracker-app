import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { MarketOverview } from './components/MarketOverview';
import { PortfolioOverview } from './components/PortfolioOverview';
import { CryptoTable } from './components/CryptoTable';
import { NewsSection } from './components/NewsSection';
import { useCryptoData } from './hooks/useCryptoData';

function App() {
  const { cryptos, marketData, loading } = useCryptoData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Market Overview */}
            <MarketOverview marketData={marketData} />
            
            {/* Portfolio Overview */}
            <PortfolioOverview />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Crypto Table */}
              <div className="xl:col-span-2">
                <CryptoTable cryptos={cryptos} loading={loading} />
              </div>
              
              {/* News Section */}
              <div className="xl:col-span-1">
                <NewsSection />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;
