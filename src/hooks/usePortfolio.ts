import { useState, useEffect } from 'react';
import { PortfolioAsset, Transaction } from '../types/crypto';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [totalProfitLossPercentage, setTotalProfitLossPercentage] = useState(0);

  // Mock portfolio data
  useEffect(() => {
    const mockPortfolio: PortfolioAsset[] = [
      {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 0.5,
        averageCost: 40000,
        currentPrice: 43250.50,
        totalValue: 21625.25,
        profitLoss: 1625.25,
        profitLossPercentage: 8.13
      },
      {
        id: 'ethereum',
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 5.2,
        averageCost: 2400,
        currentPrice: 2650.75,
        totalValue: 13783.90,
        profitLoss: 1303.90,
        profitLossPercentage: 10.46
      },
      {
        id: 'cardano',
        symbol: 'ADA',
        name: 'Cardano',
        amount: 1000,
        averageCost: 0.45,
        currentPrice: 0.52,
        totalValue: 520,
        profitLoss: 70,
        profitLossPercentage: 15.56
      }
    ];

    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'buy',
        symbol: 'BTC',
        amount: 0.25,
        price: 38000,
        total: 9500,
        date: '2024-01-15T10:30:00Z',
        fee: 15
      },
      {
        id: '2',
        type: 'buy',
        symbol: 'BTC',
        amount: 0.25,
        price: 42000,
        total: 10500,
        date: '2024-01-20T14:15:00Z',
        fee: 18
      },
      {
        id: '3',
        type: 'buy',
        symbol: 'ETH',
        amount: 3,
        price: 2300,
        total: 6900,
        date: '2024-01-18T09:45:00Z',
        fee: 12
      },
      {
        id: '4',
        type: 'buy',
        symbol: 'ETH',
        amount: 2.2,
        price: 2500,
        total: 5500,
        date: '2024-01-25T16:20:00Z',
        fee: 10
      }
    ];

    setPortfolio(mockPortfolio);
    setTransactions(mockTransactions);

    // Calculate totals
    const total = mockPortfolio.reduce((sum, asset) => sum + asset.totalValue, 0);
    const profitLoss = mockPortfolio.reduce((sum, asset) => sum + asset.profitLoss, 0);
    const profitLossPercentage = (profitLoss / (total - profitLoss)) * 100;

    setTotalValue(total);
    setTotalProfitLoss(profitLoss);
    setTotalProfitLossPercentage(profitLossPercentage);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return {
    portfolio,
    transactions,
    totalValue,
    totalProfitLoss,
    totalProfitLossPercentage,
    addTransaction
  };
};
