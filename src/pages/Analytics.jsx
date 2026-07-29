import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  Ship,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Download,
  RefreshCw,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Analytics = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const colors = {
    primary: '#714b67',
    primaryLight: '#8a5f7e',
    primaryDark: '#5a3a52',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const stats = [
    { label: 'Total Shipments', value: '156', change: '+12%', status: 'positive', icon: Ship },
    { label: 'On-Time Delivery', value: '94%', change: '+5%', status: 'positive', icon: CheckCircle },
    { label: 'Average Clearance', value: '4.2 days', change: '-0.8 days', status: 'positive', icon: Clock },
    { label: 'Total Revenue', value: '$2.4M', change: '+18%', status: 'positive', icon: DollarSign },
  ];

  const monthlyData = [
    { month: 'Jan', shipments: 12, revenue: 180000 },
    { month: 'Feb', shipments: 15, revenue: 210000 },
    { month: 'Mar', shipments: 18, revenue: 245000 },
    { month: 'Apr', shipments: 14, revenue: 195000 },
    { month: 'May', shipments: 20, revenue: 280000 },
    { month: 'Jun', shipments: 22, revenue: 310000 },
  ];

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Analytics
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track your shipping performance and metrics
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>