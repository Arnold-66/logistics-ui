// roles/freightForwarder/FreightForwarderContainers.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Container, Package, Ship, Calendar, Clock, Eye, CheckCircle, AlertCircle,
  Search, Filter, Download, RefreshCw, Plus, X, ChevronDown, ChevronUp,
  Truck, Anchor, Globe, Flag, BarChart3, Layers, Box, Weight, Ruler,
  FileText, Edit, Trash2, MoreVertical, Building, Users
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const FreightForwarderContainers = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [expandedContainer, setExpandedContainer] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState({});
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
    teal: '#14b8a6',
    indigo: '#6366f1',
    orange: '#f97316',
  };

  const isDark = darkMode;

  const [containers, setContainers] = useState([
    {
      id: 'MSKU-458921',
      size: '20ft',
      type: 'Dry Container',
      sealNo: 'SEAL-001',
      packages: 450,
      grossWeight: '12.5 tons',
      volume: '25 CBM',
      measurement: '5.9 x 2.35 x 2.39m',
      cargoDescription: 'Electronics and Machinery',
      bookingNo: 'BKG-12345678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      status: 'In Transit',
      eta: '2026-08-12 14:30',
      shippingDate: '2026-07-25',
      consignee: 'Global Importers Inc',
      consigneeContact: 'Sarah Kamau',
      consigneeEmail: 'sarah@globalimporters.com',
      declaredValue: '749,484,375 UGX',
      lastUpdate: '2 hours ago',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com'
    },
    {
      id: 'MSKU-458922',
      size: '40ft HC',
      type: 'Refrigerated Container',
      sealNo: 'SEAL-002',
      packages: 320,
      grossWeight: '4.5 tons',
      volume: '65 CBM',
      measurement: '12.0 x 2.35 x 2.69m',
      cargoDescription: 'Perishable Goods',
      bookingNo: 'BKG-12345678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      status: 'In Transit',
      eta: '2026-08-12 14:30',
      shippingDate: '2026-07-25',
      consignee: 'Global Importers Inc',
      consigneeContact: 'Sarah Kamau',
      consigneeEmail: 'sarah@globalimporters.com',
      declaredValue: '749,484,375 UGX',
      lastUpdate: '2 hours ago',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com'
    },
    {
      id: 'JP-893421',
      size: '20ft',
      type: 'Dry Container',
      sealNo: 'SEAL-003',
      packages: 150,
      grossWeight: '1.2 tons',
      volume: '12 CBM',
      measurement: '5.9 x 2.35 x 2.39m',
      cargoDescription: 'Agricultural Equipment',
      bookingNo: 'BKG-23456789',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      status: 'Delivered',
      eta: '2026-08-18 09:00',
      shippingDate: '2026-07-29',
      consignee: 'Rwanda Importers Ltd',
      consigneeContact: 'Grace Mukamana',
      consigneeEmail: 'grace@rwandaimporters.com',
      declaredValue: '325,000,000 UGX',
      lastUpdate: '4 hours ago',
      shipper: 'East Africa Trading Co',
      shipperContact: 'Peter Habimana',
      shipperEmail: 'peter@eastafricatrading.com'
    },
    {
      id: 'SA-456732',
      size: '40ft',
      type: 'Dry Container',
      sealNo: 'SEAL-004',
      packages: 320,
      grossWeight: '10.8 tons',
      volume: '55 CBM',
      measurement: '12.0 x 2.35 x 2.39m',
      cargoDescription: 'Consumer Goods',
      bookingNo: 'BKG-34567890',
      vessel: 'MV African Trader',
      voyage: 'AT-2026-067',
      portOfLoading: 'Entebbe, Uganda',
      portOfDischarge: 'Nairobi, Kenya',
      status: 'Delivered',
      eta: '2026-08-05',
      shippingDate: '2026-07-10',
      consignee: 'Nairobi Distributors',
      consigneeContact: 'David Mbeki',
      consigneeEmail: 'david@nairobidistributors.com',
      declaredValue: '187,500,000 UGX',
      lastUpdate: '2 days ago',
      shipper: 'Global Importers Inc',
      shipperContact: 'Sarah Kamau',
      shipperEmail: 'sarah@globalimporters.com'
    },
    {
      id: 'MSKU-458923',
      size: '20ft',
      type: 'Dry Container',
      sealNo: 'SEAL-005',
      packages: 280,
      grossWeight: '3.2 tons',
      volume: '18 CBM',
      measurement: '5.9 x 2.35 x 2.39m',
      cargoDescription: 'Raw Materials',
      bookingNo: 'BKG-45678901',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      status: 'In Customs',
      eta: '2026-09-22 16:00',
      shippingDate: '2026-09-05',
      consignee: 'Uganda Manufacturers',
      consigneeContact: 'Mary Atim',
      consigneeEmail: 'mary@ugandamanufacturers.com',
      declaredValue: '1,200,000,000 UGX',
      lastUpdate: '3 days ago',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com'
    },
    {
      id: 'MSKU-458924',
      size: '20ft',
      type: 'Dry Container',
      sealNo: 'SEAL-006',
      packages: 200,
      grossWeight: '2.8 tons',
      volume: '15 CBM',
      measurement: '5.9 x 2.35 x 2.39m',
      cargoDescription: 'Medical Supplies',
      bookingNo: 'BKG-45678901',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      status: 'In Customs',
      eta: '2026-09-22 16:00',
      shippingDate: '2026-09-05',
      consignee: 'Uganda Manufacturers',
      consigneeContact: 'Mary Atim',
      consigneeEmail: 'mary@ugandamanufacturers.com',
      declaredValue: '1,200,000,000 UGX',
      lastUpdate: '3 days ago',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com'
    },
    {
      id: 'TZ-782341',
      size: '20ft',
      type: 'Dry Container',
      sealNo: 'SEAL-007',
      packages: 200,
      grossWeight: '3.8 tons',
      volume: '20 CBM',
      measurement: '5.9 x 2.35 x 2.39m',
      cargoDescription: 'Construction Materials',
      bookingNo: 'BKG-78901234',
      vessel: 'MV Indian Trader',
      voyage: 'IT-2026-024',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Dar es Salaam, Tanzania',
      status: 'In Transit',
      eta: '2026-09-10 12:00',
      shippingDate: '2026-08-20',
      consignee: 'Dar es Salaam Importers',
      consigneeContact: 'James Ochieng',
      consigneeEmail: 'james@darimporters.com',
      declaredValue: '680,000,000 UGX',
      lastUpdate: '2 days ago',
      shipper: 'East Africa Trading Co',
      shipperContact: 'Grace Akello',
      shipperEmail: 'grace@eastafricatrading.com'
    },
    {
      id: 'TZ-782342',
      size: '20ft',
      type: 'Dry Container',
      sealNo: 'SEAL-008',
      packages: 180,
      grossWeight: '2.2 tons',
      volume: '12 CBM',
      measurement: '5.9 x 2.35 x 2.39m',
      cargoDescription: 'Packaging Materials',
      bookingNo: 'BKG-78901234',
      vessel: 'MV Indian Trader',
      voyage: 'IT-2026-024',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Dar es Salaam, Tanzania',
      status: 'In Transit',
      eta: '2026-09-10 12:00',
      shippingDate: '2026-08-20',
      consignee: 'Dar es Salaam Importers',
      consigneeContact: 'James Ochieng',
      consigneeEmail: 'james@darimporters.com',
      declaredValue: '680,000,000 UGX',
      lastUpdate: '2 days ago',
      shipper: 'East Africa Trading Co',
      shipperContact: 'Grace Akello',
      shipperEmail: 'grace@eastafricatrading.com'
    },
    {
      id: 'SA-456733',
      size: '20ft',
      type: 'Dry Container',
      sealNo: 'SEAL-009',
      packages: 250,
      grossWeight: '5.2 tons',
      volume: '22 CBM',
      measurement: '5.9 x 2.35 x 2.39m',
      cargoDescription: 'Electronics',
      bookingNo: 'BKG-89012345',
      vessel: 'MV African Trader',
      voyage: 'AT-2026-068',
      portOfLoading: 'Entebbe, Uganda',
      portOfDischarge: 'Nairobi, Kenya',
      status: 'Delivered',
      eta: '2026-08-20',
      shippingDate: '2026-07-28',
      consignee: 'Nairobi Distributors',
      consigneeContact: 'David Mbeki',
      consigneeEmail: 'david@nairobidistributors.com',
      declaredValue: '320,000,000 UGX',
      lastUpdate: '5 days ago',
      shipper: 'Global Importers Inc',
      shipperContact: 'Sarah Kamau',
      shipperEmail: 'sarah@globalimporters.com'
    }
  ]);

  // Get unique companies for filter
  const uniqueCompanies = [...new Set(containers.map(c => c.shipper))];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'In Transit': { bg: colors.info + '20', color: colors.info, icon: Ship, label: 'In Transit' },
      'In Customs': { bg: colors.orange + '20', color: colors.orange, icon: AlertCircle, label: 'In Customs' },
      'Delivered': { bg: colors.success + '20', color: colors.success, icon: CheckCircle, label: 'Delivered' },
      'Pending': { bg: colors.warning + '20', color: colors.warning, icon: Clock, label: 'Pending' },
      'Stored': { bg: colors.teal + '20', color: colors.teal, icon: Package, label: 'Stored' }
    };
    return statusMap[status] || { bg: colors.primary + '20', color: colors.primary, icon: Container, label: status };
  };

  // Filter containers
  const filteredContainers = containers.filter(container => {
    const matchesSearch = 
      container.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.bookingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.consignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.cargoDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.shipper.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || container.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || container.shipper === companyFilter;
    return matchesSearch && matchesStatus && matchesCompany;
  });

  // Group containers by shipper
  const groupedContainers = filteredContainers.reduce((groups, container) => {
    const key = container.shipper;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(container);
    return groups;
  }, {});

  // Sort groups alphabetically
  const sortedGroupKeys = Object.keys(groupedContainers).sort();

  const toggleGroupExpand = (groupName) => {
    setExpandedGroup(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const toggleContainerExpand = (containerId) => {
    setExpandedContainer(expandedContainer === containerId ? null : containerId);
  };

  // Get group statistics
  const getGroupStats = (groupContainers) => {
    const total = groupContainers.length;
    const inTransit = groupContainers.filter(c => c.status === 'In Transit').length;
    const inCustoms = groupContainers.filter(c => c.status === 'In Customs').length;
    const delivered = groupContainers.filter(c => c.status === 'Delivered').length;
    const totalPackages = groupContainers.reduce((sum, c) => sum + c.packages, 0);
    return { total, inTransit, inCustoms, delivered, totalPackages };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading containers...</p>
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
              Container Management
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track and manage all containers across shipments
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
              onClick={() => navigate('/freight-forwarder/booking/new')}
            >
              <Plus className="w-4 h-4" />
              New Booking
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
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Container className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Containers</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{containers.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Transit</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containers.filter(c => c.status === 'In Transit').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: colors.orange }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Customs</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containers.filter(c => c.status === 'In Customs').length}
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

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by container ID, booking no, shipper, consignee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Status</option>
              <option value="In Transit">In Transit</option>
              <option value="In Customs">In Customs</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Stored">Stored</option>
            </select>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 min-w-[150px] ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Companies</option>
              {uniqueCompanies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            <button
              className={`p-2 rounded-lg border transition-colors ${
                isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCompanyFilter('all');
              }}
            >
              <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>

        {/* Group by Company */}
        {companyFilter === 'all' ? (
          <div className="space-y-4">
            {sortedGroupKeys.map((groupName) => {
              const groupContainers = groupedContainers[groupName];
              const groupStats = getGroupStats(groupContainers);
              const isGroupExpanded = expandedGroup[groupName] !== false;

              return (
                <div key={groupName} className={`rounded-lg overflow-hidden ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                }`}>
                  {/* Group Header */}
                  <div
                    className={`p-4 cursor-pointer flex items-center justify-between hover:bg-opacity-50 transition-colors ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleGroupExpand(groupName)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                        <Building className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {groupName}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            {groupStats.total} containers
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            {groupStats.totalPackages} packages
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                          <span className="text-blue-600 dark:text-blue-400">
                            In Transit: {groupStats.inTransit}
                          </span>
                          <span className="text-orange-600 dark:text-orange-400">
                            In Customs: {groupStats.inCustoms}
                          </span>
                          <span className="text-green-600 dark:text-green-400">
                            Delivered: {groupStats.delivered}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {groupContainers.filter(c => c.status !== 'Delivered').length} active
                      </span>
                      {isGroupExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Group Content */}
                  {isGroupExpanded && (
                    <div className={`p-4 border-t space-y-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      {groupContainers.map((container) => {
                        const statusStyle = getStatusBadge(container.status);
                        const StatusIcon = statusStyle.icon;
                        const isExpanded = expandedContainer === container.id;

                        return (
                          <div
                            key={container.id}
                            className={`rounded-lg transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'
                            } ${isExpanded ? 'p-4' : 'p-3'}`}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div className="flex-1 cursor-pointer" onClick={() => toggleContainerExpand(container.id)}>
                                <div className="flex items-center gap-3">
                                  <div className={`p-1.5 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                                    <Container className="w-4 h-4" style={{ color: colors.primary }} />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {container.id}
                                      </h4>
                                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                        <StatusIcon className="w-3 h-3" />
                                        {statusStyle.label}
                                      </span>
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                                        {container.size}
                                      </span>
                                    </div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {container.bookingNo} • {container.vessel}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 ml-10 mt-1">
                                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Package className="w-3 h-3 inline mr-1" />
                                    {container.packages} packages
                                  </span>
                                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Weight className="w-3 h-3 inline mr-1" />
                                    {container.grossWeight}
                                  </span>
                                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Calendar className="w-3 h-3 inline mr-1" />
                                    ETA: {container.eta}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                               <button
                                  onClick={() => navigate(`/freight-forwarder/container/${container.id}`)}
                                  className={`p-1.5 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-600`}
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                                </button>
                                <button
                                  onClick={() => toggleContainerExpand(container.id)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                                  style={{ color: colors.primary }}
                                >
                                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                              <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                  <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Seal No.</p>
                                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.sealNo}</p>
                                  </div>
                                  <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
                                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.volume}</p>
                                  </div>
                                  <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Measurement</p>
                                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.measurement}</p>
                                  </div>
                                  <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.consignee}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{container.cargoDescription}</p>
                                </div>
                                <div>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Value</p>
                                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.declaredValue}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Single company view
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContainers.map((container) => {
              const statusStyle = getStatusBadge(container.status);
              const StatusIcon = statusStyle.icon;
              const isExpanded = expandedContainer === container.id;

              return (
                <div
                  key={container.id}
                  className={`rounded-lg transition-all duration-200 hover:shadow-lg ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                  }`}
                >
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Container className="w-5 h-5" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {container.id}
                          </h3>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {container.size} • {container.type}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                        <StatusIcon className="w-3 h-3" />
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* Quick Info */}
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-3 h-3" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {container.packages} packages
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Weight className="w-3 h-3" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {container.grossWeight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3 h-3" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          ETA: {container.eta}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Ship className="w-3 h-3" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {container.vessel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="w-3 h-3" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          Shipper: {container.shipper}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t flex items-center justify-between"
                      style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      <div className="flex gap-1">
                        <button
                          onClick={() => navigate(`/freight-forwarder/container/${container.id}`)}
                          className={`p-1.5 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-600`}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                      </div>
                      <button
                        onClick={() => toggleContainerExpand(container.id)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        style={{ color: colors.primary }}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t space-y-2"
                        style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Seal No.</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.sealNo}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.volume}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Measurement</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.measurement}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.portOfLoading}</p>
                          </div>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{container.cargoDescription}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Value</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.declaredValue}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredContainers.length === 0 && (
          <div className={`p-8 text-center rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <Container className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
            <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No containers found
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreightForwarderContainers;