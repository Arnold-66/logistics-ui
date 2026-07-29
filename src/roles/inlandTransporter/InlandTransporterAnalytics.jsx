// roles/inlandTransporter/InlandTransporterAnalytics.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  BarChart3, TrendingUp, TrendingDown, Package, Truck, MapPin,
  Calendar, Clock, CheckCircle, AlertCircle, Users, Building,
  DollarSign, ArrowUp, ArrowDown, Download, RefreshCw, Filter
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const InlandTransporterAnalytics = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('month');

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
    teal: '#14b8a6',
    indigo: '#6366f1',
    orange: '#f97316',
  };

  const isDark = darkMode

  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalOrders: 156,
      activeOrders: 23,
      completedOrders: 133,
      totalVehicles: 12,
      totalRevenue: '1,247,500,000 UGX',
      growth: 12.5
    },
    monthlyData: [
      { month: 'Jan', orders: 12, vehicles: 8, revenue: 98000000 },
      { month: 'Feb', orders: 15, vehicles: 9, revenue: 112000000 },
      { month: 'Mar', orders: 18, vehicles: 10, revenue: 145000000 },
      { month: 'Apr', orders: 14, vehicles: 9, revenue: 108000000 },
      { month: 'May', orders: 20, vehicles: 11, revenue: 165000000 },
      { month: 'Jun', orders: 22, vehicles: 12, revenue: 182000000 },
      { month: 'Jul', orders: 25, vehicles: 12, revenue: 210000000 },
      { month: 'Aug', orders: 30, vehicles: 12, revenue: 327500000 }
    ],
    topRoutes: [
      { route: 'Kampala → Mombasa', orders: 45, revenue: 385000000 },
      { route: 'Kampala → Kigali', orders: 32, revenue: 267000000 },
      { route: 'Entebbe → Nairobi', orders: 28, revenue: 215000000 },
      { route: 'Kampala → Jinja', orders: 20, revenue: 168000000 }
    ],
    statusDistribution: [
      { status: 'In Transit', count: 12 },
      { status: 'Scheduled', count: 8 },
      { status: 'Delivered', count: 6 },
      { status: 'Pending', count: 5 },
      { status: 'Delayed', count: 2 }
    ]
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Analytics Dashboard
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track performance metrics and insights
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Orders</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {analyticsData.overview.totalOrders}
                </p>
              </div>
              <div className={`p-2 rounded-lg`} style={{ backgroundColor: colors.primary + '20' }}>
                <Package className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500 font-medium">+{analyticsData.overview.growth}%</span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Orders</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {analyticsData.overview.activeOrders}
                </p>
              </div>
              <div className={`p-2 rounded-lg`} style={{ backgroundColor: colors.info + '20' }}>
                <Truck className="w-5 h-5" style={{ color: colors.info }} />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Vehicles</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {analyticsData.overview.totalVehicles}
                </p>
              </div>
              <div className={`p-2 rounded-lg`} style={{ backgroundColor: colors.teal + '20' }}>
                <MapPin className="w-5 h-5" style={{ color: colors.teal }} />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Revenue</p>
                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {analyticsData.overview.totalRevenue}
                </p>
              </div>
              <div className={`p-2 rounded-lg`} style={{ backgroundColor: colors.success + '20' }}>
                <DollarSign className="w-5 h-5" style={{ color: colors.success }} />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Performance Chart */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} mb-6`}>
          <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Monthly Performance
            </h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.primary }}></div>
                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.info }}></div>
                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Vehicles</span>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-64 flex items-end gap-2">
              {analyticsData.monthlyData.map((data, index) => {
                const maxOrders = Math.max(...analyticsData.monthlyData.map(d => d.orders));
                const maxVehicles = Math.max(...analyticsData.monthlyData.map(d => d.vehicles));
                const maxValue = Math.max(maxOrders, maxVehicles);
                const heightPercentage = (value) => (value / maxValue) * 100;

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex justify-center gap-1">
                      <div 
                        className="w-3 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{ 
                          height: `${heightPercentage(data.orders)}%`,
                          backgroundColor: colors.primary,
                          minHeight: '4px'
                        }}
                      />
                      <div 
                        className="w-3 rounded-t transition-all duration-500 hover:opacity-80"
                        style={{ 
                          height: `${heightPercentage(data.vehicles)}%`,
                          backgroundColor: colors.info,
                          minHeight: '4px'
                        }}
                      />
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <div className="flex items-center justify-between text-sm">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total Revenue: <span className="font-bold" style={{ color: colors.primary }}>
                    {analyticsData.monthlyData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()} UGX
                  </span>
                </span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Avg. {Math.round(analyticsData.monthlyData.reduce((sum, d) => sum + d.revenue, 0) / analyticsData.monthlyData.length).toLocaleString()} UGX/month
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Routes */}
          <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Top Routes
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {analyticsData.topRoutes.map((route, index) => (
                  <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {route.route}
                        </p>
                        <div className="flex gap-3 mt-1">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {route.orders} orders
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {route.revenue.toLocaleString()} UGX
                        </p>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          revenue
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Status Distribution
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {analyticsData.statusDistribution.map((item, index) => {
                  const total = analyticsData.statusDistribution.reduce((sum, i) => sum + i.count, 0);
                  const percentage = (item.count / total) * 100;
                  const colors_map = {
                    'In Transit': colors.info,
                    'Scheduled': colors.teal,
                    'Delivered': colors.success,
                    'Pending': colors.warning,
                    'Delayed': colors.danger
                  };
                  const color = colors_map[item.status] || colors.primary;

                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.status}
                          </span>
                        </div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.count} ({Math.round(percentage)}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? '#374151' : '#e5e7eb' }}>
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlandTransporterAnalytics;