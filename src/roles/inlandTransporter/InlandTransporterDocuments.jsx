// roles/inlandTransporter/InlandTransporterDocuments.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  FileText, FileCheck, FileSignature, FileBarChart, FileSpreadsheet,
  Download, Eye, Search, Filter, Plus, RefreshCw, X, ChevronDown,
  ChevronUp, Calendar, Clock, CheckCircle, AlertCircle, Users,
  Building, Package, Ship, Container, Truck, Edit, SortAsc, SortDesc
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const InlandTransporterDocuments = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
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
    teal: '#14b8a6',
    indigo: '#6366f1',
    orange: '#f97316',
  };

  const isDark = darkMode;
  const userCompany = user?.companyName || user?.company || '';

  const [documents, setDocuments] = useState([
    {
      id: 'DOC-001',
      name: 'Dispatch Order',
      type: 'Dispatch Document',
      documentNo: 'DO-12345',
      orderNo: 'DO-12345',
      company: 'ImportFlow Logistics',
      transporter: 'ImportFlow Logistics',
      consignee: 'Global Importers Inc',
      status: 'Approved',
      uploadedDate: '2026-08-08',
      expiryDate: '2026-09-08',
      size: '2.4 MB',
      icon: FileSignature,
      color: colors.indigo
    },
    {
      id: 'DOC-002',
      name: 'Delivery Order',
      type: 'Delivery Document',
      documentNo: 'DLV-001',
      orderNo: 'DO-12345',
      company: 'ImportFlow Logistics',
      transporter: 'ImportFlow Logistics',
      consignee: 'Global Importers Inc',
      status: 'Pending Review',
      uploadedDate: '2026-08-10',
      expiryDate: '2026-09-10',
      size: '1.8 MB',
      icon: FileText,
      color: colors.warning
    },
    {
      id: 'DOC-003',
      name: 'Waybill',
      type: 'Transport Document',
      documentNo: 'WB-2026-001',
      orderNo: 'DO-12346',
      company: 'East Africa Transport',
      transporter: 'East Africa Transport',
      consignee: 'Rwanda Importers Ltd',
      status: 'Approved',
      uploadedDate: '2026-08-11',
      expiryDate: '2026-09-11',
      size: '1.2 MB',
      icon: FileSpreadsheet,
      color: colors.success
    },
    {
      id: 'DOC-004',
      name: 'Insurance Certificate',
      type: 'Insurance Document',
      documentNo: 'INS-2026-001',
      orderNo: 'DO-12347',
      company: 'Global Logistics Ltd',
      transporter: 'Global Logistics Ltd',
      consignee: 'Nairobi Distributors',
      status: 'Approved',
      uploadedDate: '2026-08-03',
      expiryDate: '2026-09-03',
      size: '3.1 MB',
      icon: FileCheck,
      color: colors.teal
    },
    {
      id: 'DOC-005',
      name: 'Proof of Delivery',
      type: 'Delivery Document',
      documentNo: 'POD-2026-001',
      orderNo: 'DO-12345',
      company: 'ImportFlow Logistics',
      transporter: 'ImportFlow Logistics',
      consignee: 'Global Importers Inc',
      status: 'Pending',
      uploadedDate: '2026-08-12',
      expiryDate: '2026-09-12',
      size: '4.2 MB',
      icon: FileBarChart,
      color: colors.orange
    }
  ]);

  // Get unique companies
  const uniqueCompanies = ['all', ...new Set(documents.map(d => d.company || d.transporter).filter(Boolean))];
  
  const getCompanyCount = (company) => {
    if (company === 'all') return documents.length;
    return documents.filter(d => (d.company || d.transporter) === company).length;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Approved': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Pending Review': { bg: colors.warning + '20', color: colors.warning, icon: Clock },
      'Pending': { bg: colors.warning + '20', color: colors.warning, icon: Clock },
      'Rejected': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle },
      'Expired': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle }
    };
    return statusMap[status] || { bg: colors.primary + '20', color: colors.primary, icon: FileText };
  };

  const getTypeIcon = (type) => {
    const typeMap = {
      'Dispatch Document': FileSignature,
      'Delivery Document': FileText,
      'Transport Document': FileSpreadsheet,
      'Insurance Document': FileCheck,
      'Customs Document': FileBarChart
    };
    return typeMap[type] || FileText;
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
  let filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.transporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.company && doc.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesCompany = companyFilter === 'all' || (doc.company || doc.transporter) === companyFilter;
    return matchesSearch && matchesType && matchesCompany;
  });

  // Sort documents
  filteredDocuments.sort((a, b) => {
    let valA, valB;
    
    switch(sortBy) {
      case 'company':
        valA = (a.company || a.transporter || '').toLowerCase();
        valB = (b.company || b.transporter || '').toLowerCase();
        break;
      case 'date':
        valA = new Date(a.uploadedDate || 0);
        valB = new Date(b.uploadedDate || 0);
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
        valA = a.company || a.transporter || '';
        valB = b.company || b.transporter || '';
    }
    
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Group by company
  const groupedDocuments = filteredDocuments.reduce((groups, doc) => {
    const company = doc.company || doc.transporter || 'Unknown';
    if (!groups[company]) {
      groups[company] = [];
    }
    groups[company].push(doc);
    return groups;
  }, {});

  const companyNames = Object.keys(groupedDocuments).sort();

  const documentTypes = ['all', ...new Set(documents.map(d => d.type))];

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
                Approved: {docs.filter(d => d.status === 'Approved').length}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700`}>
                Pending: {docs.filter(d => d.status === 'Pending' || d.status === 'Pending Review').length}
              </span>
            </div>
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          {docs.map((doc) => {
            const statusStyle = getStatusBadge(doc.status);
            const StatusIcon = statusStyle.icon;
            const DocIcon = doc.icon || getTypeIcon(doc.type);
            const isExpanded = expandedDoc === doc.id;

            return (
              <div key={doc.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1 cursor-pointer" onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg`} style={{ backgroundColor: doc.color + '20' }}>
                        <DocIcon className="w-5 h-5" style={{ color: doc.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {doc.name}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                            <StatusIcon className="w-3 h-3" />
                            {doc.status}
                          </span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {doc.documentNo} • Order: {doc.orderNo}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Truck className="w-3 h-3 inline mr-1" />
                        {doc.transporter}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Package className="w-3 h-3 inline mr-1" />
                        {doc.consignee}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar className="w-3 h-3 inline mr-1" />
                        Uploaded: {doc.uploadedDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadDocument(doc)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Download Document"
                    >
                      <Download className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => handlePreviewDocument(doc.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Preview Document"
                    >
                      <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => handleViewDocument(doc.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="View Details"
                    >
                      <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => handleEditDocument(doc.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Edit Document"
                    >
                      <Edit className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      style={{ color: colors.primary }}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t space-y-3" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Type</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.type}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>File Size</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.size}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expiry Date</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.expiryDate}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order No</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.orderNo}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => handleViewDocument(doc.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                        style={{ backgroundColor: colors.primary, color: 'white' }}
                      >
                        <FileText className="w-4 h-4" />
                        View Full Details
                      </button>
                      <button
                        onClick={() => handlePreviewDocument(doc.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleEditDocument(doc.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        <Edit className="w-4 h-4" />
                        Edit Details
                      </button>
                      <button
                        onClick={() => handleDownloadDocument(doc)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                        style={{ borderColor: colors.primary, color: colors.primary }}
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

  // Navigation Handlers
  const handleViewDocument = (docId) => {
    navigate(`/inland-transporter/document/${docId}`);
  };

  const handleEditDocument = (docId) => {
    navigate(`/inland-transporter/document/edit/${docId}`);
  };

  const handlePreviewDocument = (docId) => {
    navigate(`/inland-transporter/document/${docId}?preview=true`);
  };

  const handleDownloadDocument = (doc) => {
    alert(`Downloading ${doc.name} (${doc.size})`);
  };

  const handleUploadDocument = () => {
    navigate('/inland-transporter/document/upload');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading documents...</p>
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
              Transport Documents
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all transport and dispatch documents grouped by company
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
              style={{ backgroundColor: colors.primary, color: 'white' }}
              onClick={handleUploadDocument}
            >
              <Plus className="w-4 h-4" />
              Upload Document
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
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Documents</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{documents.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Approved</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {documents.filter(d => d.status === 'Approved').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {documents.filter(d => d.status === 'Pending' || d.status === 'Pending Review').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: colors.danger }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Issues</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {documents.filter(d => d.status === 'Rejected' || d.status === 'Expired').length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search by document name, number, order no, transporter, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className={`pl-10 pr-8 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none min-w-[150px] ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
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
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={`pl-10 pr-8 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  {documentTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setCompanyFilter('all');
                }}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
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
          <span className={`ml-auto text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {filteredDocuments.length} documents
          </span>
        </div>

        {/* Documents List - Grouped by Company */}
        {filteredDocuments.length === 0 ? (
          <div className={`text-center py-12 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No documents found
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filters
            </p>
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

export default InlandTransporterDocuments;