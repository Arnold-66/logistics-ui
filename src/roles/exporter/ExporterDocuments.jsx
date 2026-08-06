// roles/exporter/ExporterDocuments.jsx
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
  UserCheck,
  SortAsc,
  SortDesc
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
  const [filterCompany, setFilterCompany] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState(null);
  const [sortBy, setSortBy] = useState('company');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const isDark = darkMode;
  const userCompany = user?.companyName || user?.company || '';

  // Document data - Export documents with company association
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
      company: 'ImportFlow Ltd',
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
      company: 'ImportFlow Ltd',
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
      company: 'ImportFlow Ltd',
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
      company: 'ImportFlow Ltd',
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
      company: 'ImportFlow Ltd',
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
      company: 'ImportFlow Ltd',
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
      company: 'ImportFlow Ltd',
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
      company: 'ImportFlow Ltd',
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
      shipmentId: 'EXP-002',
      documentNumber: 'COC-2026-001',
      expiryDate: '2027-07-25',
      tags: ['unbs', 'certificate', 'quality'],
      fileType: 'pdf',
      company: 'Global Importers Inc',
      importer: 'Global Importers Inc',
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
      shipmentId: 'EXP-002',
      documentNumber: 'PVoC-2026-001',
      expiryDate: '2026-10-28',
      tags: ['unbs', 'pvoc', 'verification'],
      fileType: 'pdf',
      company: 'Global Importers Inc',
      importer: 'Global Importers Inc',
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
      shipmentId: 'EXP-002',
      documentNumber: 'CO-2026-001',
      expiryDate: '2027-07-30',
      tags: ['origin', 'certificate', 'export'],
      fileType: 'pdf',
      company: 'Global Importers Inc',
      importer: 'Global Importers Inc',
      previewContent: `CERTIFICATE OF ORIGIN\nCertificate: CO-2026-001\nCountry: Uganda\nIssued by: Uganda Chamber of Commerce`
    },
    {
      id: 12,
      name: 'Commercial Invoice',
      description: 'Commercial invoice for the export shipment',
      type: 'invoice',
      source: 'exporter',
      status: 'completed',
      date: '2026-08-05',
      size: '2.1 MB',
      pages: 3,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-003',
      documentNumber: 'INV-2026-002',
      expiryDate: '2027-02-05',
      tags: ['invoice', 'commercial', 'export'],
      fileType: 'pdf',
      company: 'East Africa Trading Co',
      importer: 'East Africa Trading Co',
      previewContent: `COMMERCIAL INVOICE\nInvoice: INV-2026-002\nSeller: ExportFlow Ltd\nBuyer: East Africa Trading Co\nTotal: 450,000,000 UGX`
    },
    {
      id: 13,
      name: 'Packing List',
      description: 'Detailed packing information for the shipment',
      type: 'list',
      source: 'exporter',
      status: 'in_progress',
      date: '2026-08-06',
      size: '0.9 MB',
      pages: 2,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-003',
      documentNumber: 'PL-2026-002',
      expiryDate: null,
      tags: ['packing', 'list', 'container'],
      fileType: 'pdf',
      company: 'East Africa Trading Co',
      importer: 'East Africa Trading Co',
      previewContent: `PACKING LIST\nContainer: MSKU-458931\nTotal Packages: 2\nTotal Weight: 4.8 tons`
    },
    {
      id: 14,
      name: 'Bill of Lading',
      description: 'Shipping document from the carrier',
      type: 'shipping',
      source: 'carrier',
      status: 'pending',
      date: '2026-08-10',
      size: '2.8 MB',
      pages: 2,
      uploadedBy: 'MV Pacific Voyager',
      shipmentId: 'EXP-004',
      documentNumber: 'BOL-2026-002',
      expiryDate: null,
      tags: ['shipping', 'bill_of_lading', 'carrier'],
      fileType: 'pdf',
      company: 'Nile Imports Ltd',
      importer: 'Nile Imports Ltd',
      previewContent: `BILL OF LADING\nBOL: BOL-2026-002\nVessel: MV Pacific Voyager\nContainer: MSKU-458932`
    },
    {
      id: 15,
      name: 'Sales Contract',
      description: 'Official sales agreement between parties',
      type: 'contract',
      source: 'exporter',
      status: 'completed',
      date: '2026-08-08',
      size: '1.5 MB',
      pages: 4,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-004',
      documentNumber: 'SC-2026-002',
      expiryDate: '2027-02-08',
      tags: ['contract', 'sales', 'agreement'],
      fileType: 'pdf',
      company: 'Nile Imports Ltd',
      importer: 'Nile Imports Ltd',
      previewContent: `SALES CONTRACT\nContract: SC-2026-002\nSeller: ExportFlow Ltd\nBuyer: Nile Imports Ltd\nValue: 325,000,000 UGX`
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

  // Get unique companies
  const uniqueCompanies = ['all', ...new Set(documents.map(d => d.company || d.importer).filter(Boolean))];
  
  // Get company count
  const getCompanyCount = (company) => {
    if (company === 'all') return documents.length;
    return documents.filter(d => (d.company || d.importer) === company).length;
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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.importer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (doc.company && doc.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesSource = filterSource === 'all' || doc.source === filterSource;
    const matchesCompany = filterCompany === 'all' || (doc.company || doc.importer) === filterCompany;
    return matchesSearch && matchesStatus && matchesType && matchesSource && matchesCompany;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let valA, valB;
    
    switch(sortBy) {
      case 'company':
        valA = (a.company || a.importer || '').toLowerCase();
        valB = (b.company || b.importer || '').toLowerCase();
        break;
      case 'date':
        valA = new Date(a.date || 0);
        valB = new Date(b.date || 0);
        break;
      case 'status':
        valA = a.status || '';
        valB = b.status || '';
        break;
      case 'type':
        valA = a.type || '';
        valB = b.type || '';
        break;
      default:
        valA = a.company || a.importer || '';
        valB = b.company || b.importer || '';
    }
    
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Group documents by company
  const groupedDocuments = sortedDocuments.reduce((groups, doc) => {
    const company = doc.company || doc.importer || 'Unknown';
    if (!groups[company]) {
      groups[company] = [];
    }
    groups[company].push(doc);
    return groups;
  }, {});

  const companyNames = Object.keys(groupedDocuments).sort();

  // Stats
  const totalDocs = documents.length;
  const completedDocs = documents.filter(d => d.status === 'completed' || d.status === 'received').length;
  const pendingDocs = documents.filter(d => d.status === 'pending' || d.status === 'in_progress').length;
  const exporterDocs = documents.filter(d => d.source === 'exporter').length;
  const importerDocs = documents.filter(d => d.source === 'importer').length;

  // Render company section
  const renderCompanySection = (company) => {
    const docs = groupedDocuments[company];
    
    return (
      <div key={company} className={`rounded-lg overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`px-4 py-3 flex items-center gap-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <Building className="w-5 h-5" style={{ color: colors.primary }} />
          <div>
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {company}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {docs.length} documents
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                Completed: {docs.filter(d => d.status === 'completed' || d.status === 'received').length}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700`}>
                Pending: {docs.filter(d => d.status === 'pending' || d.status === 'in_progress').length}
              </span>
            </div>
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          {docs.map((doc) => {
            const isExpanded = expandedDoc === doc.id;
            const statusStyle = getStatusBadge(doc.status);
            const sourceStyle = getSourceBadge(doc.source);
            const SourceIcon = sourceStyle.icon;

            return (
              <div
                key={doc.id}
                className={`transition-all duration-300 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
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
        </div>
      </div>
    );
  };

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
              Manage all your export documentation grouped by company
            </p>
            {user && (
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                <Building className="w-3 h-3 inline mr-1" />
                {user.companyName || userCompany || 'Your Company'}
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
                placeholder="Search documents by name, description, shipment, or company..."
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
                <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 appearance-none min-w-[150px] ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Companies ({documents.length})</option>
                  {uniqueCompanies.filter(c => c !== 'all').map(company => (
                    <option key={company} value={company}>
                      {company} ({getCompanyCount(company)})
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
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
                  setFilterCompany('all');
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

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sort by:</span>
          <button
            onClick={() => handleSort('company')}
            className={`text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
              sortBy === 'company' 
                ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') 
                : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')
            }`}
          >
            <Building className="w-3 h-3" />
            Company
            {sortBy === 'company' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
          </button>
          <button
            onClick={() => handleSort('date')}
            className={`text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
              sortBy === 'date' 
                ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') 
                : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')
            }`}
          >
            <Calendar className="w-3 h-3" />
            Date
            {sortBy === 'date' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
          </button>
          <button
            onClick={() => handleSort('status')}
            className={`text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
              sortBy === 'status' 
                ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') 
                : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            Status
            {sortBy === 'status' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
          </button>
          <button
            onClick={() => handleSort('type')}
            className={`text-xs px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
              sortBy === 'type' 
                ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') 
                : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')
            }`}
          >
            <FileText className="w-3 h-3" />
            Type
            {sortBy === 'type' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
          </button>
          <span className={`ml-auto text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {sortedDocuments.length} documents
          </span>
        </div>

        {/* Documents List - Grouped by Company */}
        {sortedDocuments.length === 0 ? (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No documents found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {companyNames.map(company => renderCompanySection(company))}
          </div>
        )}
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