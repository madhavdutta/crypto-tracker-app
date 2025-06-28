import { useState, useEffect } from 'react';
import axios from 'axios';
import { CryptoCurrency, MarketData } from '../types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const useCryptoData = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      
      // Fetch top cryptocurrencies
      const cryptoResponse = await axios.get(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`
      );
      
      // Fetch global market data
      const globalResponse = await axios.get(`${COINGECKO_API}/global`);
      
      setCryptos(cryptoResponse.data);
      setMarketData(globalResponse.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching crypto data:', err);
      setError('Failed to fetch cryptocurrency data');
      
      // Fallback mock data for demo purposes
      const mockCryptos: CryptoCurrency[] = [
        {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
          current_price: 43250.50,
          market_cap: 847234567890,
          market_cap_rank: 1,
          fully_diluted_valuation: 908765432100,
          total_volume: 23456789012,
          high_24h: 44100.25,
          low_24h: 42800.75,
          price_change_24h: 1250.30,
          price_change_percentage_24h: 2.98,
          market_cap_change_24h: 24567890123,
          market_cap_change_percentage_24h: 2.99,
          circulating_supply: 19587234,
          total_supply: 21000000,
          max_supply: 21000000,
          ath: 69045,
          ath_change_percentage: -37.4,
          ath_date: '2021-11-10T14:24:11.849Z',
          atl: 67.81,
          atl_change_percentage: 63689.1,
          atl_date: '2013-07-06T00:00:00.000Z',
          roi: null,
          last_updated: new Date().toISOString(),
          sparkline_in_7d: {
            price: Array.from({ length: 168 }, (_, i) => 42000 + Math.sin(i / 10) * 2000 + Math.random() * 1000)
          }
        },
        {
          id: 'ethereum',
          symbol: 'eth',
          name: 'Ethereum',
          image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
          current_price: 2650.75,
          market_cap: 318765432100,
          market_cap_rank: 2,
          fully_diluted_valuation: 318765432100,
          total_volume: 15678901234,
          high_24h: 2720.50,
          low_24h: 2580.25,
          price_change_24h: 85.25,
          price_change_percentage_24h: 3.32,
          market_cap_change_24h: 10234567890,
          market_cap_change_percentage_24h: 3.32,
          circulating_supply: 120280396,
          total_supply: 120280396,
          max_supply: null,
          ath: 4878.26,
          ath_change_percentage: -45.7,
          ath_date: '2021-11-10T14:24:19.604Z',
          atl: 0.432979,
          atl_change_percentage: 612087.2,
          atl_date: '2015-10-20T00:00:00.000Z',
          roi: null,
          last_updated: new Date().toISOString(),
          sparkline_in_7d: {
            price: Array.from({ length: 168 }, (_, i) => 2500 + Math.sin(i / 8) * 300 + Math.random() * 200)
          }
        }
      ];
      
      setCryptos(mockCryptos);
      setMarketData({
        total_market_cap: { usd: 1750000000000 },
        total_volume: { usd: 65000000000 },
        market_cap_percentage: { btc: 48.5, eth: 18.2 },
        market_cap_change_percentage_24h_usd: 2.45
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { cryptos, marketData, loading, error, refetch: fetchCryptoData };
};
