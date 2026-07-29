// roles/inlandTransporter/InlandTransporterDashboard.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Truck, Package, MapPin, Calendar, Clock, Eye, CheckCircle, AlertCircle,
  TrendingUp, Users, FileText, ClipboardList, ArrowRight, Search,
  Filter, Download, RefreshCw, Plus, X, ChevronRight, ChevronDown, ChevronUp,
  Home, Building, Phone, Mail, User, BarChart3, Activity, Layers,
  Navigation, Fuel, Wrench, AlertTriangle, CheckSquare, DollarSign,
  Award, Gauge, Zap, PieChart, LineChart, BarChart, TrendingDown
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const InlandTransporterDashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'line'

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
    pink: '#ec4899'
  };

  const isDark = darkMode

  // Analytics Data
  const analyticsData = {
    overview: {
      totalOrders: 156,
      activeOrders: 23,
      completedOrders: 133,
      totalVehicles: 12,
      totalRevenue: '1,247,500,000 UGX',
      growth: 12.5,
      onTimeDelivery: 94,
      avgTripDuration: '2.5 days'
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
      { status: 'In Transit', count: 12, color: colors.info },
      { status: 'Scheduled', count: 8, color: colors.teal },
      { status: 'Delivered', count: 6, color: colors.success },
      { status: 'Pending', count: 5, color: colors.warning },
      { status: 'Delayed', count: 2, color: colors.danger }
    ],
    vehicleStatus: [
      { status: 'Active', count: 8, color: colors.success },
      { status: 'In Transit', count: 4, color: colors.info },
      { status: 'Maintenance', count: 3, color: colors.warning },
      { status: 'Inactive', count: 1, color: colors.danger }
    ],
    recentActivity: [
      { time: '2 mins ago', event: 'Order DO-12345 delivered', type: 'delivery' },
      { time: '15 mins ago', event: 'Vehicle UAB 1234 started trip', type: 'trip' },
      { time: '1 hour ago', event: 'New dispatch order created', type: 'order' },
      { time: '3 hours ago', event: 'Vehicle KAB 9012 completed maintenance', type: 'maintenance' }
    ]
  };

  // Sample dispatch orders
  const dispatchOrders = [
    {
      id: 'DO-2026-001',
      orderNo: 'DO-12345',
      companyName: 'ImportFlow Logistics',
      contactPerson: 'John Mukasa',
      dispatchDate: '2026-08-10',
      deliveryOrder: 'DLV-001',
      consignee: 'Global Importers Inc',
      deliveryAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
      truckDetails: {
        plateNo: 'UAB 1234',
        driverName: 'Robert Ssali',
        driverPhone: '+256 700 123456'
      },
      eta: '2026-08-12 14:30',
      status: 'In Transit',
      priority: 'High',
      cargoDescription: 'Electronics and Machinery',
      declaredValue: '450,000,000 UGX',
      submittedDate: '2026-08-08',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'DO-2026-002',
      orderNo: 'DO-12346',
      companyName: 'East Africa Transport',
      contactPerson: 'Peter Habimana',
      dispatchDate: '2026-08-12',
      deliveryOrder: 'DLV-002',
      consignee: 'Rwanda Importers Ltd',
      deliveryAddress: 'KG 7 Ave, Kigali, Rwanda',
      truckDetails: {
        plateNo: 'RAB 5678',
        driverName: 'Jean Pierre',
        driverPhone: '+250 788 123456'
      },
      eta: '2026-08-14 09:00',
      status: 'Pending Dispatch',
      priority: 'Medium',
      cargoDescription: 'Agricultural Equipment',
      declaredValue: '120,000,000 UGX',
      submittedDate: '2026-08-11',
      lastUpdate: '1 day ago'
    },
    {
      id: 'DO-2026-003',
      orderNo: 'DO-12347',
      companyName: 'Global Logistics Ltd',
      contactPerson: 'Sarah Kamau',
      dispatchDate: '2026-08-05',
      deliveryOrder: 'DLV-003',
      consignee: 'Nairobi Distributors',
      deliveryAddress: 'Mombasa Road, Nairobi, Kenya',
      truckDetails: {
        plateNo: 'KAB 9012',
        driverName: 'Michael Ochieng',
        driverPhone: '+254 722 123456'
      },
      eta: '2026-08-08',
      status: 'Delivered',
      priority: 'Low',
      cargoDescription: 'Consumer Goods',
      declaredValue: '75,000,000 UGX',
      submittedDate: '2026-08-03',
      lastUpdate: '3 days ago'
    },
    {
      id: 'DO-2026-004',
      orderNo: 'DO-12348',
      companyName: 'ImportFlow Logistics',
      contactPerson: 'John Mukasa',
      dispatchDate: '2026-08-15',
      deliveryOrder: 'DLV-004',
      consignee: 'Uganda Manufacturers',
      deliveryAddress: 'Plot 45, Bweyogerere, Kampala, Uganda',
      truckDetails: {
        plateNo: 'UAB 7890',
        driverName: 'David Okello',
        driverPhone: '+256 700 789012'
      },
      eta: '2026-08-16 16:00',
      status: 'Scheduled',
      priority: 'High',
      cargoDescription: 'Raw Materials',
      declaredValue: '280,000,000 UGX',
      submittedDate: '2026-08-13',
      lastUpdate: '5 hours ago'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending Dispatch': { bg: colors.warning + '20', color: colors.warning, icon: Clock },
      'In Transit': { bg: colors.info + '20', color: colors.info, icon: Truck },
      'Scheduled': { bg: colors.teal + '20', color: colors.teal, icon: Calendar },
      'Delivered': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Delayed': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle }
    };
    return statusMap[status] || { bg: colors.primary + '20', color: colors.primary, icon: Clock };
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'High': { bg: colors.danger + '20', color: colors.danger },
      'Medium': { bg: colors.warning + '20', color: colors.warning },
      'Low': { bg: colors.success + '20', color: colors.success }
    };
    return priorityMap[priority] || { bg: colors.primary + '20', color: colors.primary };
  };

  const stats = {
    total: dispatchOrders.length,
    pending: dispatchOrders.filter(o => o.status === 'Pending Dispatch' || o.status === 'Scheduled').length,
    inTransit: dispatchOrders.filter(o => o.status === 'In Transit').length,
    delivered: dispatchOrders.filter(o => o.status === 'Delivered').length
  };

  // Render Bar Chart
  const renderBarChart = () => {
    const maxOrders = Math.max(...analyticsData.monthlyData.map(d => d.orders));
    const maxVehicles = Math.max(...analyticsData.monthlyData.map(d => d.vehicles));
    const maxRevenue = Math.max(...analyticsData.monthlyData.map(d => d.revenue));
    const maxValue = Math.max(maxOrders, maxVehicles, maxRevenue / 1000000);
    const heightPercentage = (value, max) => (value / max) * 100;

    return (
      <div className="h-64 flex items-end gap-2">
        {analyticsData.monthlyData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex justify-center gap-0.5">
              <div 
                className="w-2 rounded-t transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${heightPercentage(data.orders, maxValue)}%`,
                  backgroundColor: colors.primary,
                  minHeight: '4px'
                }}
                title={`Orders: ${data.orders}`}
              />
              <div 
                className="w-2 rounded-t transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${heightPercentage(data.vehicles, maxValue)}%`,
                  backgroundColor: colors.info,
                  minHeight: '4px'
                }}
                title={`Vehicles: ${data.vehicles}`}
              />
              <div 
                className="w-2 rounded-t transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${heightPercentage(data.revenue / 1000000, maxValue)}%`,
                  backgroundColor: colors.success,
                  minHeight: '4px'
                }}
                title={`Revenue: ${(data.revenue / 1000000).toFixed(1)}M UGX`}
              />
            </div>
            <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {data.month}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Render Line Chart
  const renderLineChart = () => {
    const maxOrders = Math.max(...analyticsData.monthlyData.map(d => d.orders));
    const maxVehicles = Math.max(...analyticsData.monthlyData.map(d => d.vehicles));
    const maxRevenue = Math.max(...analyticsData.monthlyData.map(d => d.revenue));
    const maxValue = Math.max(maxOrders, maxVehicles, maxRevenue / 1000000);
    const heightPercentage = (value, max) => (value / max) * 100;

    const points = (dataKey, max) => {
      return analyticsData.monthlyData.map((d, i) => {
        const value = dataKey === 'revenue' ? d.revenue / 1000000 : d[dataKey];
        const x = (i / (analyticsData.monthlyData.length - 1)) * 100;
        const y = 100 - heightPercentage(value, max);
        return `${x},${y}`;
      }).join(' ');
    };

    return (
      <div className="h-64 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="100" y2="20" stroke={isDark ? '#374151' : '#e5e7eb'} strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="40" x2="100" y2="40" stroke={isDark ? '#374151' : '#e5e7eb'} strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="60" x2="100" y2="60" stroke={isDark ? '#374151' : '#e5e7eb'} strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="80" x2="100" y2="80" stroke={isDark ? '#374151' : '#e5e7eb'} strokeWidth="0.5" strokeDasharray="2,2" />
          
          {/* Orders Line */}
          <polyline
            points={points('orders', maxValue)}
            fill="none"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Orders Area */}
          <polygon
            points={`${points('orders', maxValue)} 100,0 100,0`}
            fill={`${colors.primary}20`}
          />
          
          {/* Vehicles Line */}
          <polyline
            points={points('vehicles', maxValue)}
            fill="none"
            stroke={colors.info}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Vehicles Area */}
          <polygon
            points={`${points('vehicles', maxValue)} 100,0 100,0`}
            fill={`${colors.info}20`}
          />
          
          {/* Revenue Line */}
          <polyline
            points={points('revenue', maxValue)}
            fill="none"
            stroke={colors.success}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Revenue Area */}
          <polygon
            points={`${points('revenue', maxValue)} 100,0 100,0`}
            fill={`${colors.success}20`}
          />

          {/* Data points */}
          {analyticsData.monthlyData.map((data, i) => {
            const x = (i / (analyticsData.monthlyData.length - 1)) * 100;
            const yOrders = 100 - heightPercentage(data.orders, maxValue);
            const yVehicles = 100 - heightPercentage(data.vehicles, maxValue);
            const yRevenue = 100 - heightPercentage(data.revenue / 1000000, maxValue);
            return (
              <g key={i}>
                <circle cx={x} cy={yOrders} r="1.5" fill={colors.primary} />
                <circle cx={x} cy={yVehicles} r="1.5" fill={colors.info} />
                <circle cx={x} cy={yRevenue} r="1.5" fill={colors.success} />
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between px-1 mt-1">
          {analyticsData.monthlyData.map((data, index) => (
            <span key={index} className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {data.month}
            </span>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading dashboard...</p>
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
              Inland Transporter Dashboard
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage your dispatch orders, deliveries, and fleet
            </p>
            {user && (
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                <Building className="w-3 h-3 inline mr-1" />
                {user.companyName || 'Your Company'}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
              onClick={() => navigate('/inland-transporter/dispatch/new')}
            >
              <Plus className="w-4 h-4" />
              New Dispatch Order
            </button>
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
              onClick={() => navigate('/inland-transporter/analytics')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>

        {/* Analytics Overview Stats */}
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
                <Navigation className="w-5 h-5" style={{ color: colors.teal }} />
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

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>On-Time Delivery</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.overview.onTimeDelivery}%
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg Trip Duration</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.overview.avgTripDuration}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed Orders</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.overview.completedOrders}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fleet Utilization</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Math.round((analyticsData.vehicleStatus.filter(v => v.status === 'Active' || v.status === 'In Transit').reduce((sum, v) => sum + v.count, 0) / analyticsData.overview.totalVehicles) * 100)}%
            </p>
          </div>
        </div>

        {/* Monthly Performance Chart */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} mb-6`}>
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="flex items-center gap-3">
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Monthly Performance
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    chartType === 'bar' 
                      ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900')
                      : (isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')
                  }`}
                  title="Bar Chart"
                >
                  <BarChart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    chartType === 'line' 
                      ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900')
                      : (isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')
                  }`}
                  title="Line Chart"
                >
                  <LineChart className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={`px-3 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
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
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.success }}></div>
                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Revenue (M UGX)</span>
                </div>
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {chartType === 'bar' ? 'Bar Chart' : 'Line Chart'}
              </div>
            </div>

            {/* Chart */}
            {chartType === 'bar' ? renderBarChart() : renderLineChart()}

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

        {/* Bottom Section - Analytics and Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Status Distribution */}
          <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Order Status
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {analyticsData.statusDistribution.map((item, index) => {
                  const total = analyticsData.statusDistribution.reduce((sum, i) => sum + i.count, 0);
                  const percentage = (item.count / total) * 100;
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
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
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Vehicle Status */}
          <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vehicle Status
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {analyticsData.vehicleStatus.map((item, index) => {
                  const total = analyticsData.vehicleStatus.reduce((sum, i) => sum + i.count, 0);
                  const percentage = (item.count / total) * 100;
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
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
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h3>
            </div>
            <div className="p-4 max-h-60 overflow-y-auto">
              <div className="space-y-3">
                {analyticsData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      {activity.type === 'delivery' && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {activity.type === 'trip' && <Truck className="w-4 h-4 text-blue-500" />}
                      {activity.type === 'order' && <Package className="w-4 h-4 text-purple-500" />}
                      {activity.type === 'maintenance' && <Wrench className="w-4 h-4 text-yellow-500" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {activity.event}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => navigate('/inland-transporter/dispatch-orders')}
            className={`p-4 rounded-lg text-center transition-all duration-200 hover:shadow-lg ${
              isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
            }`}
          >
            <ClipboardList className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>All Orders</span>
          </button>
          <button
            onClick={() => navigate('/inland-transporter/deliveries')}
            className={`p-4 rounded-lg text-center transition-all duration-200 hover:shadow-lg ${
              isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
            }`}
          >
            <MapPin className="w-6 h-6 mx-auto mb-2" style={{ color: colors.info }} />
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Deliveries</span>
          </button>
          <button
            onClick={() => navigate('/inland-transporter/vehicles')}
            className={`p-4 rounded-lg text-center transition-all duration-200 hover:shadow-lg ${
              isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
            }`}
          >
            <Truck className="w-6 h-6 mx-auto mb-2" style={{ color: colors.warning }} />
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Vehicles</span>
          </button>
          <button
            onClick={() => navigate('/inland-transporter/documents')}
            className={`p-4 rounded-lg text-center transition-all duration-200 hover:shadow-lg ${
              isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
            }`}
          >
            <FileText className="w-6 h-6 mx-auto mb-2" style={{ color: colors.teal }} />
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Documents</span>
          </button>
        </div>

        {/* Recent Dispatch Orders */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Dispatch Orders
              </h2>
              <button
                onClick={() => navigate('/inland-transporter/dispatch-orders')}
                className="flex items-center gap-1 text-sm font-medium hover:underline"
                style={{ color: colors.primary }}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            {dispatchOrders.slice(0, 3).map((order) => {
              const statusStyle = getStatusBadge(order.status);
              const priorityStyle = getPriorityBadge(order.priority);
              const StatusIcon = statusStyle.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <div key={order.id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 cursor-pointer" onClick={() => setExpandedOrder(isExpanded ? null : order.id)}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {order.orderNo}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                              style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                              <StatusIcon className="w-3 h-3" />
                              {order.status}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full`}
                              style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.color }}>
                              {order.priority}
                            </span>
                          </div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {order.companyName} → {order.consignee}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {order.deliveryAddress}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Truck className="w-3 h-3 inline mr-1" />
                          {order.truckDetails.plateNo}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          ETA: {order.eta}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/inland-transporter/dispatch/${order.id}`)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                      </button>
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        style={{ color: colors.primary }}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t space-y-3" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.companyName}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.contactPerson}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Dispatch Date</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.dispatchDate}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivery Order</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.deliveryOrder}</p>
                        </div>
                      </div>

                      <div>
                        <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Truck Details
                        </p>
                        <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              Plate: {order.truckDetails.plateNo}
                            </span>
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              Driver: {order.truckDetails.driverName}
                            </span>
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              Phone: {order.truckDetails.driverPhone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.cargoDescription}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => navigate(`/inland-transporter/dispatch/${order.id}`)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                          style={{ backgroundColor: colors.primary, color: 'white' }}
                        >
                          <Eye className="w-4 h-4" />
                          View Full Details
                        </button>
                        {order.status === 'Pending Dispatch' && (
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{ backgroundColor: colors.success, color: 'white' }}
                          >
                            <CheckSquare className="w-4 h-4" />
                            Start Dispatch
                          </button>
                        )}
                        {order.status === 'In Transit' && (
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{ backgroundColor: colors.success, color: 'white' }}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Mark as Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlandTransporterDashboard;