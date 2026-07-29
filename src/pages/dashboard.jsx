import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  Package,
  Ship,
  Truck,
  Clock,
  Calendar,
  MapPin,
  AlertCircle,
  FileText,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Eye,
  FileCheck,
  Shield,
  Anchor,
  Box,
  AlertOctagon,
  Navigation,
  Map,
  User,
  ClipboardList,
  Flag,
  CheckSquare,
  XCircle,
  Info,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  HelpCircle,
  Settings,
  LayoutDashboard,
  Users,
  Moon,
  Sun,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ThemeContext } from '../context/themeContext';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Filter states
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);

  // Color theme
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

  // Dashboard Stats
  const stats = [
    { label: 'Active Shipments', value: '3', icon: Ship, change: '+1', status: 'positive' },
    { label: 'Pending Documents', value: '4', icon: FileText, change: '-2', status: 'negative' },
    { label: 'Customs Issues', value: '2', icon: AlertCircle, change: '+1', status: 'negative' },
    { label: 'Delivered Shipments', value: '12', icon: CheckCircle, change: '+3', status: 'positive' },
  ];

  // Shipments Data with dates for filtering
  const allShipments = [
    {
      id: '#458',
      origin: 'Shanghai, China',
      destination: 'Port of Mombasa',
      status: 'In Transit',
      progress: 70,
      eta: '12 Aug 2026',
      etaDate: new Date(2026, 7, 12),
      items: 450,
      weight: '12.5 tons',
      container: 'MSKU-458921',
      currentLocation: 'Indian Ocean',
      lastUpdate: '2 hours ago',
      statusIcon: '🚢',
      statusColor: colors.primary,
      milestones: [
        { stage: 'Supplier dispatched goods', date: '15 Jul 2026', completed: true },
        { stage: 'Vessel departed', date: '25 Jul 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '10 Aug 2026', completed: false },
        { stage: 'Customs inspection', date: '12 Aug 2026', completed: false },
        { stage: 'Delivery', date: '15 Aug 2026', completed: false },
      ]
    },
    {
      id: '#459',
      origin: 'Mumbai, India',
      destination: 'Kampala, Uganda',
      status: 'Customs Clearance',
      progress: 45,
      eta: '18 Aug 2026',
      etaDate: new Date(2026, 7, 18),
      items: 280,
      weight: '8.2 tons',
      container: 'IN-782341',
      currentLocation: 'Customs Checkpoint',
      lastUpdate: '5 hours ago',
      statusIcon: '📋',
      statusColor: colors.warning,
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Aug 2026', completed: true },
        { stage: 'Vessel departed', date: '08 Aug 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '12 Aug 2026', completed: true },
        { stage: 'Customs inspection', date: '14 Aug 2026', completed: false },
        { stage: 'Delivery', date: '18 Aug 2026', completed: false },
      ]
    },
    {
      id: '#460',
      origin: 'Durban, South Africa',
      destination: 'Nairobi, Kenya',
      status: 'Delivered',
      progress: 100,
      eta: '05 Aug 2026',
      etaDate: new Date(2026, 7, 5),
      items: 320,
      weight: '10.8 tons',
      container: 'SA-456732',
      currentLocation: 'Nairobi Warehouse',
      lastUpdate: '2 days ago',
      statusIcon: '✅',
      statusColor: colors.success,
      milestones: [
        { stage: 'Supplier dispatched goods', date: '10 Jul 2026', completed: true },
        { stage: 'Vessel departed', date: '20 Jul 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Jul 2026', completed: true },
        { stage: 'Customs inspection', date: '28 Jul 2026', completed: true },
        { stage: 'Delivery', date: '05 Aug 2026', completed: true },
      ]
    },
    {
      id: '#461',
      origin: 'Tokyo, Japan',
      destination: 'Port of Mombasa',
      status: 'In Transit',
      progress: 25,
      eta: '28 Sep 2026',
      etaDate: new Date(2026, 8, 28),
      items: 150,
      weight: '4.5 tons',
      container: 'JP-893421',
      currentLocation: 'Pacific Ocean',
      lastUpdate: '1 day ago',
      statusIcon: '🚢',
      statusColor: colors.primary,
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Sep 2026', completed: true },
        { stage: 'Vessel departed', date: '05 Sep 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Sep 2026', completed: false },
        { stage: 'Customs inspection', date: '28 Sep 2026', completed: false },
        { stage: 'Delivery', date: '30 Sep 2026', completed: false },
      ]
    },
    {
      id: '#462',
      origin: 'Hamburg, Germany',
      destination: 'Kampala, Uganda',
      status: 'Customs Clearance',
      progress: 60,
      eta: '15 Sep 2026',
      etaDate: new Date(2026, 8, 15),
      items: 200,
      weight: '6.8 tons',
      container: 'DE-782341',
      currentLocation: 'Mombasa Port',
      lastUpdate: '3 hours ago',
      statusIcon: '📋',
      statusColor: colors.warning,
      milestones: [
        { stage: 'Supplier dispatched goods', date: '20 Aug 2026', completed: true },
        { stage: 'Vessel departed', date: '25 Aug 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '10 Sep 2026', completed: true },
        { stage: 'Customs inspection', date: '12 Sep 2026', completed: false },
        { stage: 'Delivery', date: '15 Sep 2026', completed: false },
      ]
    }
  ];

  // Filter functions
  const getFilteredShipments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch(selectedFilter) {
      case 'today':
        return allShipments.filter(s => {
          const etaDate = new Date(s.etaDate);
          etaDate.setHours(0, 0, 0, 0);
          return etaDate.getTime() === today.getTime();
        });
      case 'this-week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return allShipments.filter(s => {
          const etaDate = new Date(s.etaDate);
          return etaDate >= weekStart && etaDate <= weekEnd;
        });
      case 'this-month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return allShipments.filter(s => {
          const etaDate = new Date(s.etaDate);
          return etaDate >= monthStart && etaDate <= monthEnd;
        });
      case 'last-month':
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        return allShipments.filter(s => {
          const etaDate = new Date(s.etaDate);
          return etaDate >= lastMonthStart && etaDate <= lastMonthEnd;
        });
      case 'custom':
        if (filterStartDate && filterEndDate) {
          const start = new Date(filterStartDate);
          const end = new Date(filterEndDate);
          return allShipments.filter(s => {
            const etaDate = new Date(s.etaDate);
            return etaDate >= start && etaDate <= end;
          });
        }
        return allShipments;
      default:
        return allShipments;
    }
  };

  const filteredShipments = getFilteredShipments();

  // Quick filter options
  const filterOptions = [
    { id: 'all', label: 'All Shipments' },
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
    { id: 'last-month', label: 'Last Month' },
    { id: 'custom', label: 'Custom Range' },
  ];

  // Handle custom date range
  const handleCustomDateRange = () => {
    if (filterStartDate && filterEndDate) {
      setSelectedFilter('custom');
      setShowDatePicker(false);
    }
  };

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Get days in month for calendar
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Documentation Status
  const documents = [
    { name: 'Importer Details', status: 'complete', icon: User },
    { name: 'Import Items List', status: 'complete', icon: ClipboardList },
    { name: 'Commercial Invoice', status: 'complete', icon: FileText },
    { name: 'Sales Contract', status: 'complete', icon: FileCheck },
    { name: 'Proof of Payment', status: 'complete', icon: CheckCircle },
    { name: 'UNBS CoC', status: 'pending', icon: Shield },
    { name: 'UNBS PVoC', status: 'pending', icon: Shield },
    { name: 'Freight Invoice', status: 'complete', icon: FileText },
  ];

  const completedDocs = documents.filter(d => d.status === 'complete').length;
  const totalDocs = documents.length;

  // Container Tracking
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
    },
  ];

  // Alerts/Warnings
  const alerts = [
    {
      id: 1,
      shipmentId: '#462',
      issue: 'Missing UNBS CoC Certificate',
      severity: 'critical',
      daysInBond: 18,
      action: 'Upload certificate immediately'
    },
    {
      id: 2,
      shipmentId: '#461',
      issue: 'Commercial Invoice vs Packing List mismatch',
      severity: 'high',
      daysInBond: 12,
      action: 'Submit corrected invoice'
    },
    {
      id: 3,
      shipmentId: '#463',
      issue: 'Port congestion - Processing delay',
      severity: 'medium',
      daysInBond: 8,
      action: 'Monitor status'
    },
  ];

  // Imported Goods
  const importedGoods = [
    { name: 'Premium Electronics', quantity: 450, status: 'In Transit', container: 'MSKU-458921' },
    { name: 'Textile Fabrics', quantity: 280, status: 'Customs Clearance', container: 'IN-782341' },
    { name: 'Industrial Machinery', quantity: 120, status: 'Delivered', container: 'SA-456732' },
    { name: 'Packaging Materials', quantity: 340, status: 'In Transit', container: 'PK-893421' },
    { name: 'Raw Chemicals', quantity: 90, status: 'Port Processing', container: 'CH-672134' },
  ];

  // Stat Card Component
  const StatCard = ({ icon: Icon, label, value, change, status }) => (
    <div className={`p-4 md:p-6 rounded-lg transition-all duration-300 hover:shadow-xl ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
    }`}>
      <div className="flex items-center justify-between">
        <div className={`p-2 md:p-3 rounded-lg`} style={{ backgroundColor: colors.primaryBg }}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: colors.primary }} />
        </div>
        {change && (
          <span className={`text-xs md:text-sm font-medium flex items-center gap-1 ${
            status === 'positive' ? 'text-green-500' : 'text-red-500'
          }`}>
            {status === 'positive' ? <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" /> : <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4" />}
            {change}
          </span>
        )}
      </div>
      <h3 className={`text-xl md:text-2xl font-bold mt-3 md:mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </h3>
      <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
    </div>
  );

  // Shipment Card
  const ShipmentCard = ({ shipment }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusColor = () => {
      switch(shipment.status) {
        case 'Delivered': return colors.success;
        case 'In Transit': return colors.primary;
        case 'Customs Clearance': return colors.warning;
        default: return colors.info;
      }
    };

    return (
      <div className={`rounded-lg transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                <Ship className="w-4 h-4 md:w-5 md:h-5" style={{ color: colors.primary }} />
              </div>
              <div className="min-w-0">
                <h4 className={`font-bold text-sm md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Shipment {shipment.id}
                </h4>
                <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {shipment.origin} → {shipment.destination}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs md:text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {shipment.statusIcon} {shipment.status}
                </span>
                <span className={`text-xs md:text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {shipment.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${shipment.progress}%`,
                    backgroundColor: getStatusColor()
                  }}
                ></div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs hover:underline flex items-center gap-1 flex-shrink-0 self-start sm:self-center"
            style={{ color: colors.primary }}
          >
            <Eye className="w-3 h-3" />
            {isExpanded ? 'Hide' : 'View'}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
                <p className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.items}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
                <p className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.weight}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container</p>
                <p className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipment.container}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Shipment Timeline
              </p>
              <div className="space-y-2">
                {shipment.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-6">
                      {milestone.completed ? (
                        <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                      ) : (
                        <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                      )}
                      {index < shipment.milestones.length - 1 && (
                        <div className={`absolute top-6 w-0.5 h-4 ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${milestone.completed ? 'line-through' : ''} ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {milestone.stage}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {milestone.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} />
                <div className="min-w-0">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Location</p>
                  <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {shipment.currentLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} />
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expected Arrival</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {shipment.eta}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Container Card
  const ContainerCard = ({ container }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusColor = () => {
      switch(container.status) {
        case 'Delivered': return colors.success;
        case 'At Sea': return colors.primary;
        case 'At Port': return colors.warning;
        default: return colors.info;
      }
    };

    return (
      <div className={`rounded-lg transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                <Anchor className="w-4 h-4 md:w-5 md:h-5" style={{ color: colors.primary }} />
              </div>
              <div className="min-w-0">
                <h4 className={`font-bold text-sm md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {container.id}
                </h4>
                <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Voyage: {container.voyage}
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span 
                className={`text-xs font-medium px-2 py-1 rounded-full`}
                style={{ 
                  backgroundColor: getStatusColor() + '20',
                  color: getStatusColor()
                }}
              >
                {container.status}
              </span>
              <span className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {container.location}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs hover:underline flex items-center gap-1 flex-shrink-0 self-start sm:self-center"
            style={{ color: colors.primary }}
          >
            <Eye className="w-3 h-3" />
            {isExpanded ? 'Hide' : 'View'}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Days at Sea</p>
                <p className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {container.daysAtSea} days
                </p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
                <p className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {container.eta}
                </p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Items</p>
                <p className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {container.items.length} types
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Items in Container
              </p>
              <div className="space-y-1">
                {container.items.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-2 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.name}
                    </span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Qty: {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Alert Card
  const AlertCard = ({ alert }) => {
    const getSeverityColor = () => {
      switch(alert.severity) {
        case 'critical': return colors.danger;
        case 'high': return colors.warning;
        case 'medium': return colors.info;
        default: return colors.primary;
      }
    };

    return (
      <div className={`p-3 md:p-4 rounded-lg transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'
      } border-l-4`} style={{ borderLeftColor: getSeverityColor() }}>
        <div className="flex items-start gap-3">
          <AlertOctagon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" style={{ color: getSeverityColor() }} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {alert.shipmentId}
              </h4>
              <span 
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ 
                  backgroundColor: getSeverityColor() + '20',
                  color: getSeverityColor()
                }}
              >
                {alert.severity.toUpperCase()}
              </span>
            </div>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {alert.issue}
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 text-xs">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Days in Bond: {alert.daysInBond}
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Action: {alert.action}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {/* Welcome Header */}
        {/* <div className="max-w-7xl mx-auto"> */}

      {/* <div className="w-full px-4 md:px-6"> */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, John! 👋
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Here's your shipment overview and tracking status.
          </p>
        </div>

        {/* Stats Cards - Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - 2/3 width */}
          <div className="xl:col-span-2 space-y-4 md:space-y-6">
            {/* Current Shipments with Filters */}
            <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Ship className="w-5 h-5" style={{ color: colors.primary }} />
                  <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Current Shipments
                  </h2>
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: colors.primaryBg,
                      color: colors.primary
                    }}
                  >
                    {filteredShipments.length} {filteredShipments.length === 1 ? 'Shipment' : 'Shipments'}
                  </span>
                </div>
                
                {/* Filter Dropdown */}
                <div className="flex items-center gap-2">
                  <div className="relative" ref={datePickerRef}>
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Filter className="w-4 h-4" />
                      <span>
                        {selectedFilter === 'all' && 'All Shipments'}
                        {selectedFilter === 'today' && 'Today'}
                        {selectedFilter === 'this-week' && 'This Week'}
                        {selectedFilter === 'this-month' && 'This Month'}
                        {selectedFilter === 'last-month' && 'Last Month'}
                        {selectedFilter === 'custom' && 'Custom Range'}
                      </span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {showDatePicker && (
                      <div className={`absolute right-0 mt-2 w-72 rounded-lg shadow-xl border z-50 ${
                        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}>
                        <div className="p-3">
                          {/* Quick Filters */}
                          <div className="grid grid-cols-3 gap-1.5 mb-3">
                            {filterOptions.slice(0, 5).map((option) => (
                              <button
                                key={option.id}
                                onClick={() => {
                                  setSelectedFilter(option.id);
                                  if (option.id !== 'custom') {
                                    setShowDatePicker(false);
                                  }
                                }}
                                className={`px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
                                  selectedFilter === option.id
                                    ? 'text-white'
                                    : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                style={{
                                  backgroundColor: selectedFilter === option.id ? colors.primary : 'transparent'
                                }}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>

                          {/* Custom Date Range */}
                          <div className={`border-t pt-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                            <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              Custom Date Range
                            </p>
                            <div className="flex items-center gap-2">
                              <input
                                type="date"
                                value={filterStartDate}
                                onChange={(e) => setFilterStartDate(e.target.value)}
                                className={`flex-1 px-2 py-1.5 rounded text-xs border focus:outline-none focus:ring-2 ${
                                  isDark 
                                    ? 'bg-gray-700 border-gray-600 text-white' 
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                                style={{ focusRingColor: colors.primary }}
                                onFocus={(e) => {
                                  e.currentTarget.style.borderColor = colors.primary;
                                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              />
                              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>to</span>
                              <input
                                type="date"
                                value={filterEndDate}
                                onChange={(e) => setFilterEndDate(e.target.value)}
                                className={`flex-1 px-2 py-1.5 rounded text-xs border focus:outline-none focus:ring-2 ${
                                  isDark 
                                    ? 'bg-gray-700 border-gray-600 text-white' 
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                                style={{ focusRingColor: colors.primary }}
                                onFocus={(e) => {
                                  e.currentTarget.style.borderColor = colors.primary;
                                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              />
                              <button
                                onClick={handleCustomDateRange}
                                className="px-3 py-1.5 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                                style={{ backgroundColor: colors.primary }}
                              >
                                Apply
                              </button>
                            </div>
                            {filterStartDate && filterEndDate && selectedFilter === 'custom' && (
                              <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Showing: {formatDate(filterStartDate)} - {formatDate(filterEndDate)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Clear Filter */}
                  {selectedFilter !== 'all' && (
                    <button
                      onClick={() => {
                        setSelectedFilter('all');
                        setFilterStartDate('');
                        setFilterEndDate('');
                      }}
                      className={`p-1.5 rounded-lg text-xs transition-all duration-200 ${
                        isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Shipments List */}
              {filteredShipments.length > 0 ? (
                <div className="space-y-3 md:space-y-4">
                  {filteredShipments.map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
                </div>
              ) : (
                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No shipments found</p>
                  <p className="text-xs">Try adjusting your filters</p>
                </div>
              )}
            </div>

            {/* Container Tracking */}
            <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Anchor className="w-5 h-5" style={{ color: colors.primary }} />
                  <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Container Tracking
                  </h2>
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: colors.primaryBg,
                      color: colors.primary
                    }}
                  >
                    {containers.length} Containers
                  </span>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                {containers.map((container) => (
                  <ContainerCard key={container.id} container={container} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-4 md:space-y-6">
            {/* Documentation Status */}
            <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Documents
                  </h3>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: completedDocs === totalDocs ? colors.success + '20' : colors.warning + '20',
                      color: completedDocs === totalDocs ? colors.success : colors.warning
                    }}
                  >
                    {completedDocs}/{totalDocs}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      {doc.status === 'complete' ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      )}
                      <span className={`text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {doc.name}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      doc.status === 'complete' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" style={{ color: colors.danger }} />
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Alerts
                  </h3>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: colors.danger + '20',
                      color: colors.danger
                    }}
                  >
                    {alerts.length}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Imported Goods Summary */}
            <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5" style={{ color: colors.primary }} />
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Imported Goods
                </h3>
                <span 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: colors.primaryBg,
                    color: colors.primary
                  }}
                >
                  {importedGoods.length}
                </span>
              </div>
              <div className="space-y-2">
                {importedGoods.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.quantity} units
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2" style={{
                      backgroundColor: item.status === 'Delivered' ? colors.success + '20' :
                                     item.status === 'In Transit' ? colors.primary + '20' :
                                     item.status === 'Customs Clearance' ? colors.warning + '20' :
                                     colors.info + '20',
                      color: item.status === 'Delivered' ? colors.success :
                             item.status === 'In Transit' ? colors.primary :
                             item.status === 'Customs Clearance' ? colors.warning :
                             colors.info
                    }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;