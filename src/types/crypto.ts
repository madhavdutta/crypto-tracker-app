export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  averageCost: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  total: number;
  date: string;
  fee: number;
}

export interface MarketData {
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap_percentage: { [key: string]: number };
  market_cap_change_percentage_24h_usd: number;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}
