import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PortfolioAsset } from '../types/crypto';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioChartProps {
  portfolio: PortfolioAsset[];
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ portfolio }) => {
  const chartRef = useRef<ChartJS<'doughnut'>>(null);

  const colors = [
    'rgba(247, 147, 26, 0.8)',   // Bitcoin orange
    'rgba(98, 126, 234, 0.8)',   // Ethereum blue
    'rgba(16, 185, 129, 0.8)',   // Green
    'rgba(139, 92, 246, 0.8)',   // Purple
    'rgba(236, 72, 153, 0.8)',   // Pink
    'rgba(245, 158, 11, 0.8)',   // Amber
  ];

  const borderColors = [
    'rgba(247, 147, 26, 1)',
    'rgba(98, 126, 234, 1)',
    'rgba(16, 185, 129, 1)',
    'rgba(139, 92, 246, 1)',
    'rgba(236, 72, 153, 1)',
    'rgba(245, 158, 11, 1)',
  ];

  const data = {
    labels: portfolio.map(asset => asset.symbol),
    datasets: [
      {
        data: portfolio.map(asset => asset.totalValue),
        backgroundColor: colors.slice(0, portfolio.length),
        borderColor: borderColors.slice(0, portfolio.length),
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      },
    },
    cutout: '60%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  return (
    <div className="h-64">
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};
