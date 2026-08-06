// roles/freightForwarder/FreightForwarderContainerDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  ArrowLeft,
  Container,
  Package,
  Ship,
  Calendar,
  Clock,
  MapPin,
  Weight,
  Ruler,
  Box,
  FileText,
  CheckCircle,
  AlertCircle,
  Edit,
  Download,
  Printer,
  Share2,
  Truck,
  Anchor,
  Globe,
  Building,
  User,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Layers,
  FileCheck,
  Shield,
  CreditCard,
  FileSignature,
  AlertTriangle,
  Info,
  Eye,
  X,
  Save,
  RefreshCw,
  Link,
  MessageSquare,
  Users,
  Briefcase,
  Flag,
  Navigation,
  Compass,
  Wind,
  Waves,
  Coffee,
  Utensils,
  Wifi,
  Home,
  Edit as EditIcon,
  Trash2,
  Plus
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';

const FreightForwarderContainerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [container, setContainer] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);

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

  const isDark = darkMode;

  // Container data - in real app, this would come from an API
  const containersData = {
    'MSKU-458921': {
      id: 'MSKU-458921',
      size: '20ft',
      type: 'Dry Container',
      sealNo: 'SEAL-001',
      packages: 450,
      grossWeight: '12.5 tons',
      volume: '25 CBM',
      measurement: '5.9 x 2.35 x 2.39m',
      cargoDescription: 'Electronics Components, Circuit Boards, Power Supplies',
      bookingNo: 'BKG-12345678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      portOfLoading: 'Shanghai, China',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Kampala, Uganda',
      status: 'In Transit',
      eta: '2026-08-12 14:30',
      shippingDate: '2026-07-25',
      consignee: 'Global Importers Inc',
      consigneeContact: 'Sarah Kamau',
      consigneeEmail: 'sarah@globalimporters.com',
      consigneePhone: '+254 722 345 678',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com',
      shipperPhone: '+256 712 345 678',
      declaredValue: '749,484,375 UGX',
      lastUpdate: '2 hours ago',
      typeOfMovement: 'FCL',
      countryFlag: '🇨🇳',
      documents: [
        { name: 'Commercial Invoice', status: 'approved', date: '2026-07-20' },
        { name: 'Bill of Lading', status: 'approved', date: '2026-07-22' },
        { name: 'Packing List', status: 'pending', date: '2026-07-25' },
        { name: 'COC', status: 'pending', date: '2026-07-28' }
      ],
      timeline: [
        { stage: 'Container Loaded', date: '2026-07-25 08:00', status: 'completed' },
        { stage: 'Vessel Departed', date: '2026-07-26 14:30', status: 'completed' },
        { stage: 'In Transit', date: '2026-07-27 - Present', status: 'in_progress' },
        { stage: 'Arrival at Port', date: '2026-08-12 14:30', status: 'pending' },
        { stage: 'Customs Clearance', date: '2026-08-13', status: 'pending' },
        { stage: 'Final Delivery', date: '2026-08-15', status: 'pending' }
      ],
      items: [
        { name: 'Electronics Components', quantity: 450, unit: 'pcs', weight: '2.5 tons', value: '210,937,500 UGX' },
        { name: 'Circuit Boards', quantity: 1200, unit: 'pcs', weight: '1.8 tons', value: '225,000,000 UGX' },
        { name: 'Power Supplies', quantity: 850, unit: 'pcs', weight: '2.2 tons', value: '199,218,750 UGX' }
      ],
      tracking: [
        { location: 'Shanghai Port', date: '2026-07-25 08:00', status: 'Loaded' },
        { location: 'South China Sea', date: '2026-07-27 14:30', status: 'In Transit' },
        { location: 'Indian Ocean', date: '2026-08-01 09:00', status: 'In Transit' },
        { location: 'Port of Mombasa', date: '2026-08-12 14:30', status: 'ETA' }
      ]
    },
    'MSKU-458922': {
      id: 'MSKU-458922',
      size: '40ft HC',
      type: 'Refrigerated Container',
      sealNo: 'SEAL-002',
      packages: 320,
      grossWeight: '4.5 tons',
      volume: '65 CBM',
      measurement: '12.0 x 2.35 x 2.69m',
      cargoDescription: 'Perishable Goods, Fruits and Vegetables',
      bookingNo: 'BKG-12345678',
      vessel: 'MV Star Express',
      voyage: 'SE-2026-078',
      portOfLoading: 'Shanghai, China',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Kampala, Uganda',
      status: 'In Transit',
      eta: '2026-08-12 14:30',
      shippingDate: '2026-07-25',
      consignee: 'Global Importers Inc',
      consigneeContact: 'Sarah Kamau',
      consigneeEmail: 'sarah@globalimporters.com',
      consigneePhone: '+254 722 345 678',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com',
      shipperPhone: '+256 712 345 678',
      declaredValue: '749,484,375 UGX',
      lastUpdate: '2 hours ago',
      typeOfMovement: 'FCL',
      countryFlag: '🇨🇳',
      documents: [
        { name: 'Commercial Invoice', status: 'approved', date: '2026-07-20' },
        { name: 'Bill of Lading', status: 'approved', date: '2026-07-22' },
        { name: 'Packing List', status: 'pending', date: '2026-07-25' }
      ],
      timeline: [
        { stage: 'Container Loaded', date: '2026-07-25 08:00', status: 'completed' },
        { stage: 'Vessel Departed', date: '2026-07-26 14:30', status: 'completed' },
        { stage: 'In Transit', date: '2026-07-27 - Present', status: 'in_progress' },
        { stage: 'Arrival at Port', date: '2026-08-12 14:30', status: 'pending' }
      ],
      items: [
        { name: 'Fruits (Assorted)', quantity: 200, unit: 'kg', weight: '2.5 tons', value: '150,000,000 UGX' },
        { name: 'Vegetables (Mixed)', quantity: 120, unit: 'kg', weight: '2.0 tons', value: '100,000,000 UGX' }
      ],
      tracking: [
        { location: 'Shanghai Port', date: '2026-07-25 08:00', status: 'Loaded' },
        { location: 'South China Sea', date: '2026-07-27 14:30', status: 'In Transit' },
        { location: 'Indian Ocean', date: '2026-08-01 09:00', status: 'In Transit' },
        { location: 'Port of Mombasa', date: '2026-08-12 14:30', status: 'ETA' }
      ]
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const containerData = containersData[id] || containersData['MSKU-458921'];
      setContainer(containerData);
      setLoading(false);
    }, 500);
  }, [id]);

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

  const getDocumentStatusBadge = (status) => {
    const statusMap = {
      'approved': { bg: colors.success + '20', color: colors.success, label: '✅ Approved' },
      'pending': { bg: colors.warning + '20', color: colors.warning, label: '⏳ Pending' },
      'rejected': { bg: colors.danger + '20', color: colors.danger, label: '❌ Rejected' }
    };
    return statusMap[status] || statusMap['pending'];
  };

  const getTimelineStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading container details...</p>
        </div>
      </div>
    );
  }

  if (!container) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <Container className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Container Not Found</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>The container you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/freight-forwarder/containers')}
            className="mt-4 px-4 py-2 rounded-lg text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            Back to Containers
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(container.status);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/freight-forwarder/containers')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Containers
            </button>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {container.id}
              </h1>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium`}
                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                <StatusIcon className="w-4 h-4" />
                {statusStyle.label}
              </span>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {container.size} • {container.type}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {container.shipper} • {container.vessel} • {container.voyage}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => window.print()}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} mb-6`}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'overview' ? colors.primary : 'transparent' }}
            >
              <Container className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'items'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'items' ? colors.primary : 'transparent' }}
            >
              <Package className="w-4 h-4 inline mr-2" />
              Items
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'documents' ? colors.primary : 'transparent' }}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Documents
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'timeline' ? colors.primary : 'transparent' }}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Timeline
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Shipper & Consignee Info */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Users className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                      Parties Involved
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipper</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.shipper}</p>
                        <div className="text-xs space-y-1 mt-1">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" style={{ color: colors.primary }} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{container.shipperContact}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" style={{ color: colors.primary }} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{container.shipperEmail}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" style={{ color: colors.primary }} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{container.shipperPhone}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.consignee}</p>
                        <div className="text-xs space-y-1 mt-1">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" style={{ color: colors.primary }} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{container.consigneeContact}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" style={{ color: colors.primary }} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{container.consigneeEmail}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" style={{ color: colors.primary }} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{container.consigneePhone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Details */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Box className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                      Cargo Details
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Packages</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.packages}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Gross Weight</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.grossWeight}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.volume}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Measurement</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.measurement}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{container.cargoDescription}</p>
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <MapPin className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                      Route Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.portOfLoading}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.portOfDischarge}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Place of Delivery</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.placeOfDelivery}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type of Movement</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.typeOfMovement}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Quick Info */}
                <div className="space-y-6">
                  {/* Status Card */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Info className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                      Status Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status</span>
                        <span className={`font-medium inline-flex items-center gap-1`}
                          style={{ color: statusStyle.color }}>
                          <StatusIcon className="w-3 h-3" />
                          {statusStyle.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Shipping Date</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.shippingDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Seal No.</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.sealNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Last Update</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.lastUpdate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Value Card */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <CreditCard className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                      Value Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Declared Value</span>
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.declaredValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Items Count</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.items.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Documents</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {container.documents.filter(d => d.status === 'approved').length}/{container.documents.length} approved
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                        isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}>
                        <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Track</span>
                      </button>
                      <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                        isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}>
                        <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Documents</span>
                      </button>
                      <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                        isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}>
                        <Share2 className="w-5 h-5" style={{ color: colors.primary }} />
                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Share</span>
                      </button>
                      <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                        isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}>
                        <MessageSquare className="w-5 h-5" style={{ color: colors.primary }} />
                        <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Items Tab */}
            {activeTab === 'items' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Items in Container ({container.items.length})
                    </h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: colors.primary }}>
                      <Plus className="w-3 h-3" />
                      Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {container.items.map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                            <div className="flex flex-wrap gap-3 text-xs">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Qty: {item.quantity} {item.unit}
                              </span>
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Weight: {item.weight}
                              </span>
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Value: {item.value}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              <Edit className="w-3 h-3" style={{ color: colors.primary }} />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Documents ({container.documents.length})
                    </h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: colors.primary }}>
                      <Plus className="w-3 h-3" />
                      Upload Document
                    </button>
                  </div>
                  <div className="space-y-2">
                    {container.documents.map((doc, index) => {
                      const docStatus = getDocumentStatusBadge(doc.status);
                      return (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                            <div>
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded-full" style={docStatus}>
                              {docStatus.label}
                            </span>
                            <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              <Eye className="w-3 h-3" style={{ color: colors.primary }} />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              <Download className="w-3 h-3" style={{ color: colors.primary }} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Shipment Timeline
                  </h3>
                  <div className="space-y-4">
                    {container.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primaryBg }}>
                            {getTimelineStatusIcon(event.status)}
                          </div>
                          {index < container.timeline.length - 1 && (
                            <div className={`w-0.5 h-8 ${event.status === 'completed' ? 'bg-green-500' : event.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{event.stage}</p>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{event.date}</span>
                          </div>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {event.status === 'completed' ? '✅ Completed' : 
                             event.status === 'in_progress' ? '⏳ In Progress' : 
                             '⏰ Pending'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightForwarderContainerDetails;