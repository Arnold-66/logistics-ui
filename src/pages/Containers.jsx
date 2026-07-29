import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Ship,
  Package,
  MapPin,
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  X,
  Anchor,
  Box,
  CheckCircle,
  AlertCircle,
  Grid,
  List
} from 'lucide-react';

const Containers = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedContainer, setExpandedContainer] = useState(null);
  const [viewMode, setViewMode] = useState('list');

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

  const isDark = theme === 'dark';

  const containers = [
    {
      id: 'MSKU-458921',
      status: 'At Sea',
      location: 'Indian Ocean',
      voyage: 'MV Star Express',
      eta: '12 Aug 2026',
      daysAtSea: 8,
      items: [
        { name: 'Electronics Components', quantity: 450 },
        { name: 'Circuit Boards', quantity: 1200 },
        { name: 'Power Supplies', quantity: 850 }
      ]
    },
    {
      id: 'IN-782341',
      status: 'At Port',
      location: 'Mombasa Port - Customs Bond',
      voyage: 'MV Indian Trader',
      eta: '18 Aug 2026',
      daysAtSea: 4,
      items: [
        { name: 'Textile Fabrics', quantity: 280 },
        { name: 'Dyeing Agents', quantity: 150 }
      ]
    },
    {
      id: 'SA-456732',
      status: 'Delivered',
      location: 'Nairobi Warehouse',
      voyage: 'MV African Trader',
      eta: 'Delivered 05 Aug 2026',
      daysAtSea: 12,
      items: [
        { name: 'Industrial Machinery', quantity: 120 },
        { name: 'Spare Parts', quantity: 450 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return colors.success;
      case 'At Sea': return colors.primary;
      case 'At Port': return colors.warning;
      default: return colors.info;
    }
  };

  const getStatusBadge = (status) => {
    const color = getStatusColor(status);
    return {
      backgroundColor: color + '20',
      color: color
    };
  };

  const toggleExpand = (id) => {
    setExpandedContainer(expandedContainer === id ? null : id);
  };

  const viewContainerDetails = (id) => {
    navigate(`/container/${id}`);
  };

  const filteredContainers = containers.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Containers
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track all your containers across the fleet
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Container className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{containers.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>At Sea</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containers.filter(c => c.status === 'At Sea').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>At Port</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containers.filter(c => c.status === 'At Port').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivered</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containers.filter(c => c.status === 'Delivered').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search containers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="At Sea">At Sea</option>
                  <option value="At Port">At Port</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
                className={`px-4 py-2.5 rounded-lg border ${isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-500 hover:bg-gray-100'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-4">
          <div className={`flex rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1 ${
                viewMode === 'list' ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ backgroundColor: viewMode === 'list' ? colors.primary : 'transparent' }}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1 ${
                viewMode === 'grid' ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ backgroundColor: viewMode === 'grid' ? colors.primary : 'transparent' }}
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {/* Containers List */}
        <div className="space-y-3">
          {filteredContainers.map((container) => {
            const isExpanded = expandedContainer === container.id;
            const statusStyle = getStatusBadge(container.status);

            return (
              <div key={container.id} className={`rounded-lg transition-all duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
              } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(container.id)}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                        <Container className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {container.id}
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={statusStyle}>
                            {container.status}
                          </span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {container.voyage} • {container.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {container.daysAtSea} days at sea
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar className="w-3 h-3 inline mr-1" />
                        ETA: {container.eta}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Package className="w-3 h-3 inline mr-1" />
                        {container.items.length} item types
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewContainerDetails(container.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => toggleExpand(container.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      style={{ color: colors.primary }}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Items in Container
                    </p>
                    <div className="space-y-1">
                      {container.items.map((item, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Qty: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Containers;