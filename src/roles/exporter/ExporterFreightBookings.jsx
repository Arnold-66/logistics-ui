// roles/exporter/ExporterFreightBookings.jsx
import React, { useState, useContext } from 'react';
import {
  Ship,
  Package,
  Container,
  Calendar,
  Clock,
  Eye,
  CheckCircle,
  AlertCircle,
  X,
  Search,
  Filter,
  Plus,
  Download,
  RefreshCw,
  MoreVertical,
  Home,
  Building,
  Phone,
  Mail,
  User,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  MapPin,
  Truck,
  Anchor,
  Globe,
  Flag,
  Weight,
  Ruler,
  Box,
  FileSignature,
  CreditCard,
  Shield,
  Printer,
  Send,
  Edit,
  Trash2,
  Info,
  Layers,
  BarChart3,
  Activity,
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar as CalendarIcon,
  UserCheck,
  UserX,
  Ship as ShipIcon,
  Truck as TruckIcon,
  Users,
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ExporterFreightBookings = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterVessel, setFilterVessel] = useState('all');
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  // Sample freight bookings data
  const bookingsData = [
    {
      id: 'FRT-2026-001',
      bookingNo: 'BKG-12345678',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com',
      shipperPhone: '+256 712 345 678',
      consignee: 'Global Importers Inc',
      consigneeContact: 'Sarah Kamau',
      consigneeEmail: 'sarah@globalimporters.com',
      consigneePhone: '+254 722 345 678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Mombasa Port',
      finalDelivery: 'Kampala, Uganda',
      containers: [
        { id: 'MSKU-458921', size: '20ft', packages: 450, weight: '12.5 tons', sealNo: 'SEAL-001' },
        { id: 'MSKU-458922', size: '40ft', packages: 320, weight: '4.5 tons', sealNo: 'SEAL-002' }
      ],
      status: 'In Transit',
      declaredValue: '749,484,375 UGX',
      shippingDate: '2026-07-25',
      eta: '2026-08-12 14:30',
      submittedDate: '2026-07-20',
      lastUpdate: '2 hours ago',
      priority: 'High',
      color: colors.info,
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '2026-07-22' },
        { name: 'Packing List', status: 'completed', date: '2026-07-22' },
        { name: 'Bill of Lading', status: 'pending', date: '2026-07-25' },
        { name: 'Certificate of Origin', status: 'pending', date: '2026-07-28' }
      ],
      tracking: [
        { location: 'Kampala, Uganda', date: '2026-07-25', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Indian Ocean', date: '2026-08-01', status: 'In Transit', description: 'Crossing Indian Ocean' },
        { location: 'Port of Mombasa', date: '2026-08-12', status: 'Expected', description: 'Expected arrival at port' }
      ],
      milestones: [
        { stage: 'Booking Submitted', date: '2026-07-20', completed: true },
        { stage: 'Documentation Verified', date: '2026-07-22', completed: true },
        { stage: 'Container Loaded', date: '2026-07-25', completed: true },
        { stage: 'Vessel Departed', date: '2026-07-26', completed: true },
        { stage: 'Arrived at Port', date: '2026-08-12', completed: false },
        { stage: 'Customs Clearance', date: '2026-08-13', completed: false },
        { stage: 'Delivery', date: '2026-08-15', completed: false }
      ],
      freightTerms: 'Collect',
      insuranceRequired: true,
      dangerousGoods: false,
      temperatureControlled: false,
      specialInstructions: 'Handle with care. Fragile items.'
    },
    {
      id: 'FRT-2026-002',
      bookingNo: 'BKG-23456789',
      shipper: 'East Africa Trading Co',
      shipperContact: 'Peter Habimana',
      shipperEmail: 'peter@eastafricatrading.com',
      shipperPhone: '+250 788 345 678',
      consignee: 'Rwanda Importers Ltd',
      consigneeContact: 'Alice Uwimana',
      consigneeEmail: 'alice@rwandaimporters.com',
      consigneePhone: '+250 788 456 789',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Mombasa Port',
      finalDelivery: 'Kigali, Rwanda',
      containers: [
        { id: 'JP-893421', size: '20ft', packages: 150, weight: '1.2 tons', sealNo: 'SEAL-003' }
      ],
      status: 'Pending Approval',
      declaredValue: '325,000,000 UGX',
      shippingDate: '2026-07-29',
      eta: '2026-08-18 09:00',
      submittedDate: '2026-07-22',
      lastUpdate: '4 hours ago',
      priority: 'Medium',
      color: colors.warning,
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '2026-07-23' },
        { name: 'Packing List', status: 'completed', date: '2026-07-23' },
        { name: 'Bill of Lading', status: 'pending', date: '2026-07-29' }
      ],
      tracking: [
        { location: 'Kampala, Uganda', date: '2026-07-29', status: 'Loaded', description: 'Container loaded onto vessel' }
      ],
      milestones: [
        { stage: 'Booking Submitted', date: '2026-07-22', completed: true },
        { stage: 'Documentation Verified', date: '2026-07-23', completed: true },
        { stage: 'Container Loaded', date: '2026-07-29', completed: true },
        { stage: 'Vessel Departed', date: '2026-07-30', completed: false },
        { stage: 'Arrived at Port', date: '2026-08-18', completed: false }
      ],
      freightTerms: 'Prepaid',
      insuranceRequired: false,
      dangerousGoods: false,
      temperatureControlled: false,
      specialInstructions: ''
    },
    {
      id: 'FRT-2026-003',
      bookingNo: 'BKG-34567890',
      shipper: 'Global Importers Inc',
      shipperContact: 'Sarah Kamau',
      shipperEmail: 'sarah@globalimporters.com',
      shipperPhone: '+254 722 345 678',
      consignee: 'Nairobi Distributors',
      consigneeContact: 'James Mwangi',
      consigneeEmail: 'james@nairobidistributors.com',
      consigneePhone: '+254 733 456 789',
      vessel: 'MV African Trader',
      voyage: 'AT-2026-067',
      portOfLoading: 'Entebbe, Uganda',
      portOfDischarge: 'Nairobi, Kenya',
      placeOfDelivery: 'Nairobi Inland Depot',
      finalDelivery: 'Nairobi, Kenya',
      containers: [
        { id: 'SA-456732', size: '40ft', packages: 320, weight: '10.8 tons', sealNo: 'SEAL-004' }
      ],
      status: 'Delivered',
      declaredValue: '187,500,000 UGX',
      shippingDate: '2026-07-10',
      eta: '2026-08-05',
      submittedDate: '2026-07-05',
      lastUpdate: '2 days ago',
      priority: 'Low',
      color: colors.success,
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '2026-07-08' },
        { name: 'Packing List', status: 'completed', date: '2026-07-08' },
        { name: 'Bill of Lading', status: 'completed', date: '2026-07-12' },
        { name: 'Certificate of Origin', status: 'completed', date: '2026-07-15' },
        { name: 'Proof of Payment', status: 'completed', date: '2026-07-20' }
      ],
      tracking: [
        { location: 'Entebbe, Uganda', date: '2026-07-10', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Indian Ocean', date: '2026-07-20', status: 'In Transit', description: 'Crossing Indian Ocean' },
        { location: 'Nairobi, Kenya', date: '2026-08-05', status: 'Delivered', description: 'Delivered to destination' }
      ],
      milestones: [
        { stage: 'Booking Submitted', date: '2026-07-05', completed: true },
        { stage: 'Documentation Verified', date: '2026-07-08', completed: true },
        { stage: 'Container Loaded', date: '2026-07-10', completed: true },
        { stage: 'Vessel Departed', date: '2026-07-12', completed: true },
        { stage: 'Arrived at Port', date: '2026-08-02', completed: true },
        { stage: 'Customs Clearance', date: '2026-08-03', completed: true },
        { stage: 'Delivery', date: '2026-08-05', completed: true }
      ],
      freightTerms: 'Collect',
      insuranceRequired: true,
      dangerousGoods: false,
      temperatureControlled: false,
      specialInstructions: 'Priority delivery required.'
    },
    {
      id: 'FRT-2026-004',
      bookingNo: 'BKG-45678901',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com',
      shipperPhone: '+256 712 345 678',
      consignee: 'Uganda Manufacturers',
      consigneeContact: 'Robert Senyonga',
      consigneeEmail: 'robert@ugandamanufacturers.com',
      consigneePhone: '+256 772 345 678',
      vessel: 'MV Pacific Voyager',
      voyage: 'PV-2026-045',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Mombasa Port',
      finalDelivery: 'Kampala, Uganda',
      containers: [
        { id: 'MSKU-458923', size: '20ft', packages: 280, weight: '3.2 tons', sealNo: 'SEAL-005' },
        { id: 'MSKU-458924', size: '20ft', packages: 150, weight: '4.5 tons', sealNo: 'SEAL-006' }
      ],
      status: 'In Customs',
      declaredValue: '1,200,000,000 UGX',
      shippingDate: '2026-09-05',
      eta: '2026-09-22 16:00',
      submittedDate: '2026-08-28',
      lastUpdate: '3 days ago',
      priority: 'High',
      color: colors.orange,
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '2026-08-30' },
        { name: 'Packing List', status: 'completed', date: '2026-08-30' },
        { name: 'Bill of Lading', status: 'completed', date: '2026-09-06' },
        { name: 'Certificate of Origin', status: 'pending', date: '2026-09-10' },
        { name: 'UNBS CoC', status: 'pending', date: '2026-09-15' }
      ],
      tracking: [
        { location: 'Kampala, Uganda', date: '2026-09-05', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Indian Ocean', date: '2026-09-15', status: 'In Transit', description: 'Crossing Indian Ocean' },
        { location: 'Port of Mombasa', date: '2026-09-20', status: 'Arrived', description: 'Arrived at port' },
        { location: 'Customs Bond', date: '2026-09-22', status: 'Customs', description: 'Under customs clearance' }
      ],
      milestones: [
        { stage: 'Booking Submitted', date: '2026-08-28', completed: true },
        { stage: 'Documentation Verified', date: '2026-08-30', completed: true },
        { stage: 'Container Loaded', date: '2026-09-05', completed: true },
        { stage: 'Vessel Departed', date: '2026-09-06', completed: true },
        { stage: 'Arrived at Port', date: '2026-09-20', completed: true },
        { stage: 'Customs Clearance', date: '2026-09-22', completed: false },
        { stage: 'Delivery', date: '2026-09-25', completed: false }
      ],
      freightTerms: 'Third Party',
      insuranceRequired: true,
      dangerousGoods: true,
      temperatureControlled: false,
      specialInstructions: 'Dangerous goods - handle with extreme care. UN Class 9.'
    },
    {
      id: 'FRT-2026-005',
      bookingNo: 'BKG-56789012',
      shipper: 'Rwanda Exporters',
      shipperContact: 'Grace Mukamana',
      shipperEmail: 'grace@rwandaexporters.com',
      shipperPhone: '+250 788 567 890',
      consignee: 'Global Importers Inc',
      consigneeContact: 'Sarah Kamau',
      consigneeEmail: 'sarah@globalimporters.com',
      consigneePhone: '+254 722 345 678',
      vessel: 'MV Indian Trader',
      voyage: 'IT-2026-023',
      portOfLoading: 'Kigali, Rwanda',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Mombasa Port',
      finalDelivery: 'Kigali, Rwanda',
      containers: [
        { id: 'IN-782341', size: '20ft', packages: 280, weight: '2.5 tons', sealNo: 'SEAL-007' },
        { id: 'IN-782342', size: '20ft', packages: 150, weight: '4.5 tons', sealNo: 'SEAL-008' }
      ],
      status: 'Pending Documentation',
      declaredValue: '450,000,000 UGX',
      shippingDate: '2026-08-15',
      eta: '2026-09-15 10:00',
      submittedDate: '2026-08-10',
      lastUpdate: '1 day ago',
      priority: 'Medium',
      color: colors.warning,
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '2026-08-12' },
        { name: 'Packing List', status: 'completed', date: '2026-08-12' },
        { name: 'Bill of Lading', status: 'pending', date: '2026-08-15' }
      ],
      tracking: [
        { location: 'Kigali, Rwanda', date: '2026-08-15', status: 'Loaded', description: 'Container loaded onto vessel' }
      ],
      milestones: [
        { stage: 'Booking Submitted', date: '2026-08-10', completed: true },
        { stage: 'Documentation Verified', date: '2026-08-12', completed: true },
        { stage: 'Container Loaded', date: '2026-08-15', completed: true },
        { stage: 'Vessel Departed', date: '2026-08-16', completed: false },
        { stage: 'Arrived at Port', date: '2026-09-15', completed: false }
      ],
      freightTerms: 'Collect',
      insuranceRequired: false,
      dangerousGoods: false,
      temperatureControlled: true,
      specialInstructions: 'Temperature controlled cargo. Maintain 2-8°C throughout transit.'
    },
    {
      id: 'FRT-2026-006',
      bookingNo: 'BKG-67890123',
      shipper: 'Uganda Exports Ltd',
      shipperContact: 'Robert Mwangi',
      shipperEmail: 'robert@ugandaexports.com',
      shipperPhone: '+256 772 456 789',
      consignee: 'Tanzania Distributors',
      consigneeContact: 'Mohammed Juma',
      consigneeEmail: 'mohammed@tanzaniadistributors.com',
      consigneePhone: '+255 712 345 678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-079',
      portOfLoading: 'Kampala, Uganda',
      portOfDischarge: 'Dar es Salaam, Tanzania',
      placeOfDelivery: 'Dar es Salaam Port',
      finalDelivery: 'Dar es Salaam, Tanzania',
      containers: [
        { id: 'MSKU-458925', size: '20ft', packages: 500, weight: '15.5 tons', sealNo: 'SEAL-009' },
        { id: 'MSKU-458926', size: '40ft', packages: 250, weight: '8.2 tons', sealNo: 'SEAL-010' }
      ],
      status: 'Scheduled',
      declaredValue: '890,000,000 UGX',
      shippingDate: '2026-10-01',
      eta: '2026-10-15 08:00',
      submittedDate: '2026-09-20',
      lastUpdate: '2 days ago',
      priority: 'Low',
      color: colors.info,
      documents: [
        { name: 'Commercial Invoice', status: 'pending', date: '2026-09-25' },
        { name: 'Packing List', status: 'pending', date: '2026-09-25' },
        { name: 'Bill of Lading', status: 'pending', date: '2026-10-01' }
      ],
      tracking: [
        { location: 'Kampala, Uganda', date: '2026-10-01', status: 'Scheduled', description: 'Container scheduled for loading' }
      ],
      milestones: [
        { stage: 'Booking Submitted', date: '2026-09-20', completed: true },
        { stage: 'Documentation Verified', date: '2026-09-25', completed: false },
        { stage: 'Container Loaded', date: '2026-10-01', completed: false },
        { stage: 'Vessel Departed', date: '2026-10-02', completed: false },
        { stage: 'Arrived at Port', date: '2026-10-15', completed: false }
      ],
      freightTerms: 'Prepaid',
      insuranceRequired: true,
      dangerousGoods: false,
      temperatureControlled: false,
      specialInstructions: 'Priority shipment for urgent delivery.'
    }
  ];

  // Get unique vessels for filter
  const vessels = ['all', ...new Set(bookingsData.map(b => b.vessel))];
  const statusOptions = ['all', 'Pending Approval', 'Pending Documentation', 'Scheduled', 'In Transit', 'In Customs', 'Delivered'];
  const priorityOptions = ['all', 'High', 'Medium', 'Low'];

  // Filter bookings
  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = booking.bookingNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.shipper.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.consignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.vessel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || booking.priority === filterPriority;
    const matchesVessel = filterVessel === 'all' || booking.vessel === filterVessel;
    return matchesSearch && matchesStatus && matchesPriority && matchesVessel;
  });

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusMap = {
      'Pending Approval': { backgroundColor: colors.warning + '20', color: colors.warning, icon: Clock, label: 'Pending Approval' },
      'Pending Documentation': { backgroundColor: colors.warning + '20', color: colors.warning, icon: FileText, label: 'Pending Documentation' },
      'Scheduled': { backgroundColor: colors.info + '20', color: colors.info, icon: Calendar, label: 'Scheduled' },
      'In Transit': { backgroundColor: colors.info + '20', color: colors.info, icon: Ship, label: 'In Transit' },
      'In Customs': { backgroundColor: colors.orange + '20', color: colors.orange, icon: Shield, label: 'In Customs' },
      'Delivered': { backgroundColor: colors.success + '20', color: colors.success, icon: CheckCircle, label: 'Delivered' }
    };
    return statusMap[status] || { backgroundColor: colors.primary + '20', color: colors.primary, icon: Clock, label: status };
  };

  // Get priority badge style
  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'High': { backgroundColor: colors.danger + '20', color: colors.danger, icon: TrendingUp },
      'Medium': { backgroundColor: colors.warning + '20', color: colors.warning, icon: Activity },
      'Low': { backgroundColor: colors.success + '20', color: colors.success, icon: TrendingDown }
    };
    return priorityMap[priority] || { backgroundColor: colors.primary + '20', color: colors.primary, icon: Activity };
  };

  // Get document status color
  const getDocumentStatusColor = (status) => {
    const statusMap = {
      'completed': colors.success,
      'pending': colors.warning,
      'rejected': colors.danger
    };
    return statusMap[status] || colors.warning;
  };

  // Toggle expansion
  const toggleExpand = (id) => {
    if (expandedBooking === id) {
      setExpandedBooking(null);
    } else {
      setExpandedBooking(id);
    }
  };

  // Navigate to booking details
  const viewBookingDetails = (id) => {
    navigate(`/freight-bookings/${id}`);
  };

  // Stats
  const totalBookings = bookingsData.length;
  const pendingBookings = bookingsData.filter(b => b.status === 'Pending Approval' || b.status === 'Pending Documentation').length;
  const activeBookings = bookingsData.filter(b => b.status === 'In Transit' || b.status === 'In Customs' || b.status === 'Scheduled').length;
  const deliveredBookings = bookingsData.filter(b => b.status === 'Delivered').length;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Freight Bookings
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track and manage all your freight bookings
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
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
              onClick={() => navigate('/book-freight/')}
            >
              <Plus className="w-4 h-4" />
              New Freight Booking
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
              <FileText className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Bookings</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalBookings}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{pendingBookings}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeBookings}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivered</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{deliveredBookings}</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-lg p-4 mb-6 transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search by booking number, shipper, consignee, or vessel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority === 'all' ? 'All Priority' : priority}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterVessel}
                  onChange={(e) => setFilterVessel(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {vessels.map((vessel) => (
                    <option key={vessel} value={vessel}>
                      {vessel === 'all' ? 'All Vessels' : vessel}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterPriority('all');
                  setFilterVessel('all');
                }}
                className={`px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                  isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-3">
          {filteredBookings.map((booking) => {
            const isExpanded = expandedBooking === booking.id;
            const statusStyle = getStatusBadge(booking.status);
            const priorityStyle = getPriorityBadge(booking.priority);
            const StatusIcon = statusStyle.icon;
            const PriorityIcon = priorityStyle.icon;

            return (
              <div
                key={booking.id}
                className={`rounded-lg transition-all duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
              >
                {/* Main Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(booking.id)}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                        <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 
                            className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              viewBookingDetails(booking.id);
                            }}
                          >
                            {booking.bookingNo}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                            style={{ backgroundColor: statusStyle.backgroundColor, color: statusStyle.color }}>
                            <StatusIcon className="w-3 h-3" />
                            {statusStyle.label}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                            style={{ backgroundColor: priorityStyle.backgroundColor, color: priorityStyle.color }}>
                            <PriorityIcon className="w-3 h-3" />
                            {booking.priority}
                          </span>
                        </div>
                        <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {booking.shipper} → {booking.consignee}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Ship className="w-3 h-3 inline mr-1" />
                        {booking.vessel}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Container className="w-3 h-3 inline mr-1" />
                        {booking.containers.length} containers
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar className="w-3 h-3 inline mr-1" />
                        ETA: {booking.eta}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {booking.portOfDischarge}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Wallet className="w-3 h-3 inline mr-1" />
                        {booking.declaredValue}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewBookingDetails(booking.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => toggleExpand(booking.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      style={{ color: colors.primary }}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Booking No</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.bookingNo}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipping Date</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.shippingDate}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Submitted</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.submittedDate}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last Update</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.lastUpdate}</p>
                      </div>
                    </div>

                    {/* Shipper & Consignee Info */}
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipper</p>
                          <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.shipper}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.shipperContact}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.shipperEmail}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.shipperPhone}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                          <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.consignee}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.consigneeContact}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.consigneeEmail}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{booking.consigneePhone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Vessel & Route Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.vessel}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.voyage}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.portOfLoading}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.portOfDischarge}</p>
                      </div>
                    </div>

                    {/* Containers */}
                    <div>
                      <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Containers ({booking.containers.length})
                      </p>
                      <div className="space-y-1">
                        {booking.containers.map((container, idx) => (
                          <div key={idx} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div>
                              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {container.id}
                              </span>
                              <span className={`text-xs ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Seal: {container.sealNo}
                              </span>
                            </div>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {container.size} • {container.packages} packages • {container.weight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Documents ({booking.documents.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {booking.documents.map((doc, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <CheckCircle className="w-3 h-3" style={{ color: getDocumentStatusColor(doc.status) }} />
                            {doc.name}
                            <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              ({doc.status})
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestones */}
                    <div>
                      <p className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Milestones
                      </p>
                      <div className="space-y-1">
                        {booking.milestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            {milestone.completed ? (
                              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                            ) : (
                              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                            )}
                            <span className={`${milestone.completed ? 'line-through' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {milestone.stage}
                            </span>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {milestone.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Freight Terms</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.freightTerms}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Insurance</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {booking.insuranceRequired ? 'Required' : 'Not Required'}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Dangerous Goods</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {booking.dangerousGoods ? 'Yes' : 'No'}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Temperature Controlled</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {booking.temperatureControlled ? 'Yes' : 'No'}
                          </p>
                        </div>
                      </div>
                      {booking.specialInstructions && (
                        <div className="mt-2 pt-2 border-t" style={{ borderColor: isDark ? '#4b5563' : '#e5e7eb' }}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Special Instructions</p>
                          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{booking.specialInstructions}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => viewBookingDetails(booking.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: colors.primary,
                          color: 'white'
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View Full Details
                      </button>
                      {(booking.status === 'Pending Approval' || booking.status === 'Pending Documentation') && (
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                          style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                          <Edit className="w-4 h-4" />
                          Edit Booking
                        </button>
                      )}
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                      <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        <Printer className="w-4 h-4" />
                        Print
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredBookings.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No freight bookings found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
              <button
                onClick={() => navigate('/book-freight')}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg mx-auto"
                style={{
                  backgroundColor: colors.primary,
                  color: 'white'
                }}
              >
                <Plus className="w-4 h-4" />
                Create New Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExporterFreightBookings;