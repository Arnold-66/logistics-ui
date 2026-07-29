import React, { useState, useContext } from 'react';
import {
  FileText,
  FileCheck,
  FileSignature,
  CreditCard,
  Shield,
  FileBarChart,
  Search,
  Filter,
  X,
  Download,
  Eye,
  Share2,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Upload,
  Calendar,
  User,
  Building,
  Package,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit,
  Link,
  MessageSquare,
  Users,
  Globe,
  Ship,
  Box,
  Send,
  UserCheck
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ExporterDocuments = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState(null);

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
    indigo: '#6366f1',
    orange: '#f97316',
    teal: '#14b8a6'
  };

  const isDark = darkMode

  // Document data - Export documents
  const documents = [
    {
      id: 1,
      name: 'Exporter Details',
      description: 'Company Name, Business Address, Contact Person Details',
      type: 'details',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-05',
      size: '0.5 MB',
      pages: 2,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'ED-2026-001',
      expiryDate: null,
      tags: ['exporter', 'details', 'registration'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `EXPORTER DETAILS\nCompany: ExportFlow Ltd\nAddress: 123 Trade Center, Kampala, Uganda\nTIN: 9876543210`
    },
    {
      id: 2,
      name: 'Importer Details',
      description: 'Information about the importing company',
      type: 'details',
      source: 'importer',
      status: 'received',
      date: '2026-07-06',
      size: '0.6 MB',
      pages: 2,
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'EXP-001',
      documentNumber: 'ID-2026-001',
      expiryDate: null,
      tags: ['importer', 'details', 'registration'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `IMPORTER DETAILS\nCompany: ImportFlow Ltd\nAddress: Plot 45, Industrial Area, Kampala, Uganda\nTIN: 1234567890`
    },
    {
      id: 3,
      name: 'Export Items List',
      description: 'Items & Quantities being exported',
      type: 'list',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-08',
      size: '0.8 MB',
      pages: 1,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'EIL-2026-001',
      expiryDate: null,
      tags: ['items', 'export', 'quantity'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `EXPORT ITEMS LIST\nItem: Electronics Components\nQuantity: 450\nHS Code: 8542.31`
    },
    {
      id: 4,
      name: 'Packing List',
      description: 'Detailed packing information for the shipment',
      type: 'list',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-10',
      size: '1.2 MB',
      pages: 3,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'PL-2026-001',
      expiryDate: null,
      tags: ['packing', 'list', 'container'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `PACKING LIST\nContainer: MSKU-458921\nTotal Packages: 3\nTotal Weight: 6.5 tons`
    },
    {
      id: 5,
      name: 'Commercial Invoice',
      description: 'Commercial invoice for the export shipment',
      type: 'invoice',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-12',
      size: '2.4 MB',
      pages: 3,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'INV-2026-001',
      expiryDate: '2026-12-31',
      tags: ['invoice', 'commercial', 'export'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `COMMERCIAL INVOICE\nInvoice: INV-2026-001\nSeller: ExportFlow Ltd\nBuyer: ImportFlow Ltd\nTotal: 749,484,375 UGX`
    },
    {
      id: 6,
      name: 'Bill of Lading',
      description: 'Shipping document from the carrier',
      type: 'shipping',
      source: 'carrier',
      status: 'pending',
      date: '2026-07-15',
      size: '3.2 MB',
      pages: 2,
      uploadedBy: 'MV Star Express',
      shipmentId: 'EXP-001',
      documentNumber: 'BOL-2026-001',
      expiryDate: null,
      tags: ['shipping', 'bill_of_lading', 'carrier'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `BILL OF LADING\nBOL: BOL-2026-001\nVessel: MV Star Express\nContainer: MSKU-458921`
    },
    {
      id: 7,
      name: 'Sales Contract',
      description: 'Official sales agreement between parties',
      type: 'contract',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-14',
      size: '1.8 MB',
      pages: 5,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'SC-2026-001',
      expiryDate: '2026-12-31',
      tags: ['contract', 'sales', 'agreement'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `SALES CONTRACT\nContract: SC-2026-001\nSeller: ExportFlow Ltd\nBuyer: ImportFlow Ltd\nValue: 749,484,375 UGX`
    },
    {
      id: 8,
      name: 'Proof of Payments',
      description: 'Payment confirmation from importer',
      type: 'payment',
      source: 'importer',
      status: 'received',
      date: '2026-07-20',
      size: '3.1 MB',
      pages: 2,
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'EXP-001',
      documentNumber: 'POP-2026-001',
      expiryDate: null,
      tags: ['payment', 'receipt', 'proof'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `PROOF OF PAYMENT\nAmount: 749,484,375 UGX\nMethod: Wire Transfer\nStatus: COMPLETED`
    },
    {
      id: 9,
      name: 'UNBS Certificate of Conformity',
      description: 'Product quality certification (from importer)',
      type: 'certificate',
      source: 'importer',
      status: 'pending',
      date: '2026-07-25',
      size: '1.2 MB',
      pages: 4,
      uploadedBy: 'Jane Smith (Importer)',
      shipmentId: 'EXP-001',
      documentNumber: 'COC-2026-001',
      expiryDate: '2027-07-25',
      tags: ['unbs', 'certificate', 'quality'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `UNBS CERTIFICATE OF CONFORMITY\nProduct: Electronics Components\nStandards: US 234:2020\nValid until: 25 July 2027`
    },
    {
      id: 10,
      name: 'UNBS PVoC Certificate',
      description: 'Pre-export verification (from importer)',
      type: 'certificate',
      source: 'importer',
      status: 'pending',
      date: '2026-07-28',
      size: '0.9 MB',
      pages: 3,
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'EXP-001',
      documentNumber: 'PVoC-2026-001',
      expiryDate: '2026-10-28',
      tags: ['unbs', 'pvoc', 'verification'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `UNBS PVoC CERTIFICATE\nProduct: Electronics Components\nStatus: Verified\nValid until: 28 October 2026`
    },
    {
      id: 11,
      name: 'Certificate of Origin',
      description: 'Certificate of origin for the goods',
      type: 'certificate',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-30',
      size: '0.7 MB',
      pages: 2,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'CO-2026-001',
      expiryDate: '2027-07-30',
      tags: ['origin', 'certificate', 'export'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `CERTIFICATE OF ORIGIN\nCertificate: CO-2026-001\nCountry: Uganda\nIssued by: Uganda Chamber of Commerce`
    }
  ];

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'invoice': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'contract': return <FileSignature className="w-5 h-5 text-purple-500" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'certificate': return <Shield className="w-5 h-5 text-orange-500" />;
      case 'details': return <Building className="w-5 h-5 text-indigo-500" />;
      case 'list': return <Package className="w-5 h-5 text-pink-500" />;
      case 'shipping': return <Ship className="w-5 h-5 text-cyan-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSourceBadge = (source) => {
    const sourceMap = {
      'exporter': {
        backgroundColor: colors.primaryBg,
        color: colors.primary,
        icon: <User className="w-3 h-3" />,
        label: 'You uploaded'
      },
      'importer': {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
        icon: <Building className="w-3 h-3" />,
        label: 'From Importer'
      },
      'carrier': {
        backgroundColor: colors.info + '20',
        color: colors.info,
        icon: <Ship className="w-3 h-3" />,
        label: 'From Carrier'
      }
    };
    return sourceMap[source] || sourceMap['exporter'];
  };

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return {
        backgroundColor: colors.success + '20',
        color: colors.success,
        icon: <CheckCircle className="w-3 h-3" />,
        label: 'Completed'
      };
    } else if (status === 'received') {
      return {
        backgroundColor: colors.teal + '20',
        color: colors.teal,
        icon: <CheckCircle className="w-3 h-3" />,
        label: 'Received'
      };
    } else if (status === 'pending') {
      return {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
        icon: <Clock className="w-3 h-3" />,
        label: 'Pending'
      };
    } else if (status === 'in_progress') {
      return {
        backgroundColor: colors.info + '20',
        color: colors.info,
        icon: <Clock className="w-3 h-3" />,
        label: 'In Progress'
      };
    } else {
      return {
        backgroundColor: colors.danger + '20',
        color: colors.danger,
        icon: <AlertCircle className="w-3 h-3" />,
        label: 'Rejected'
      };
    }
  };

  const documentTypes = ['all', ...new Set(documents.map(d => d.type))];
  const statusOptions = ['all', 'completed', 'received', 'pending', 'in_progress', 'rejected'];
  const sourceOptions = ['all', 'exporter', 'importer', 'carrier'];

  const toggleExpand = (docId) => {
    if (expandedDoc === docId) {
      setExpandedDoc(null);
    } else {
      setExpandedDoc(docId);
    }
  };

  const viewDocument = (doc) => {
    navigate(`/exporter-documents/${doc.id}`);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.importer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesSource = filterSource === 'all' || doc.source === filterSource;
    return matchesSearch && matchesStatus && matchesType && matchesSource;
  });

  // Stats
  const totalDocs = documents.length;
  const completedDocs = documents.filter(d => d.status === 'completed' || d.status === 'received').length;
  const pendingDocs = documents.filter(d => d.status === 'pending' || d.status === 'in_progress').length;
  const exporterDocs = documents.filter(d => d.source === 'exporter').length;
  const importerDocs = documents.filter(d => d.source === 'importer').length;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Export Documents
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all your export documentation
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
              onClick={() => navigate('/new-export')}
            >
              <Plus className="w-4 h-4" />
              New Export
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalDocs}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{completedDocs}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{pendingDocs}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your Docs</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exporterDocs}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>From Importer</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{importerDocs}</p>
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
                placeholder="Search documents by name, description, or shipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
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
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {sourceOptions.map((source) => (
                    <option key={source} value={source}>
                      {source === 'all' ? 'All Sources' : source.charAt(0).toUpperCase() + source.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterType('all');
                  setFilterSource('all');
                }}
                className={`px-4 py-2.5 rounded-lg border ${
                  isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocuments.map((doc) => {
            const isExpanded = expandedDoc === doc.id;
            const statusStyle = getStatusBadge(doc.status);
            const sourceStyle = getSourceBadge(doc.source);
            const SourceIcon = sourceStyle.icon;

            return (
              <div
                key={doc.id}
                className={`rounded-lg transition-all duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(doc.id)}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 
                            className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              viewDocument(doc);
                            }}
                          >
                            {doc.name}
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{
                            backgroundColor: statusStyle.backgroundColor,
                            color: statusStyle.color
                          }}>
                            {statusStyle.icon}
                            {statusStyle.label}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{
                            backgroundColor: sourceStyle.backgroundColor,
                            color: sourceStyle.color
                          }}>
                            {SourceIcon}
                            {sourceStyle.label}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {doc.shipmentId}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {doc.importer}
                          </span>
                        </div>
                        <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewDocument(doc)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="View Document"
                    >
                      <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => toggleExpand(doc.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      style={{ color: colors.primary }}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Number</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.documentNumber}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Size</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.size}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pages</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.pages}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Uploaded By</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.uploadedBy}</p>
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Upload Date</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {new Date(doc.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" style={{ color: colors.primary }} />
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expiry Date</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              }) : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Source Info */}
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {doc.source === 'exporter' && 'This document was uploaded by you as the exporter.'}
                          {doc.source === 'importer' && 'This document needs to be obtained from the importer. Use the "Request" button to request it.'}
                          {doc.source === 'carrier' && 'This document needs to be obtained from the carrier/shipping line.'}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tags</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {doc.tags.map((tag, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => viewDocument(doc)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: colors.primary,
                          color: 'white'
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View Document
                      </button>
                      {doc.source === 'importer' && doc.status !== 'received' && (
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            backgroundColor: colors.warning + '20',
                            color: colors.warning
                          }}
                        >
                          <Send className="w-4 h-4" />
                          Request from Importer
                        </button>
                      )}
                      {doc.source === 'carrier' && doc.status !== 'received' && (
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            backgroundColor: colors.info + '20',
                            color: colors.info
                          }}
                        >
                          <Send className="w-4 h-4" />
                          Request from Carrier
                        </button>
                      )}
                      {doc.source === 'exporter' && doc.status === 'pending' && (
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            backgroundColor: colors.primaryBg,
                            color: colors.primary
                          }}
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </button>
                      )}
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredDocuments.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No documents found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Info icon component
const Info = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default ExporterDocuments;