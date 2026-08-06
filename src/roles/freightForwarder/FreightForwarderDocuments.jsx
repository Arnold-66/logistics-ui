// roles/freightForwarder/FreightForwarderDocuments.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  FileText, FileCheck, FileSignature, FileBarChart, FileSpreadsheet,
  Download, Eye, Search, Filter, Plus, RefreshCw, X, ChevronDown,
  ChevronUp, Calendar, Clock, CheckCircle, AlertCircle, Users,
  Building, Package, Ship, Container, Truck, SortAsc, SortDesc,
  ChevronRight
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const FreightForwarderDocuments = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCompanies, setExpandedCompanies] = useState({});

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

  // Sample documents data with more variety
  const [documents, setDocuments] = useState([
    {
      id: 'DOC-001',
      name: 'Bill of Lading',
      type: 'Bill of Lading',
      documentNo: 'BL-2026-001',
      bookingNo: 'BKG-12345678',
      shipper: 'ImportFlow Ltd',
      consignee: 'Global Importers Inc',
      company: 'ImportFlow Ltd',
      vessel: 'MV Star Express',
      status: 'Approved',
      uploadedDate: '2026-07-22',
      expiryDate: '2026-08-22',
      size: '2.4 MB',
      icon: FileSignature,
      color: colors.indigo
    },
    {
      id: 'DOC-002',
      name: 'Commercial Invoice',
      type: 'Invoice',
      documentNo: 'INV-2026-001',
      bookingNo: 'BKG-12345678',
      shipper: 'ImportFlow Ltd',
      consignee: 'Global Importers Inc',
      company: 'ImportFlow Ltd',
      vessel: 'MV Star Express',
      status: 'Pending Review',
      uploadedDate: '2026-07-20',
      expiryDate: '2026-08-20',
      size: '1.8 MB',
      icon: FileText,
      color: colors.warning
    },
    {
      id: 'DOC-003',
      name: 'Packing List',
      type: 'Packing List',
      documentNo: 'PL-2026-001',
      bookingNo: 'BKG-12345678',
      shipper: 'ImportFlow Ltd',
      consignee: 'Global Importers Inc',
      company: 'ImportFlow Ltd',
      vessel: 'MV Star Express',
      status: 'Approved',
      uploadedDate: '2026-07-21',
      expiryDate: '2026-08-21',
      size: '1.2 MB',
      icon: FileSpreadsheet,
      color: colors.success
    },
    {
      id: 'DOC-004',
      name: 'Certificate of Origin',
      type: 'Certificate',
      documentNo: 'CO-2026-001',
      bookingNo: 'BKG-23456789',
      shipper: 'East Africa Trading Co',
      consignee: 'Rwanda Importers Ltd',
      company: 'East Africa Trading Co',
      vessel: 'MV Pacific Voyager',
      status: 'Approved',
      uploadedDate: '2026-07-24',
      expiryDate: '2026-08-24',
      size: '3.1 MB',
      icon: FileCheck,
      color: colors.teal
    },
    {
      id: 'DOC-005',
      name: 'Customs Declaration',
      type: 'Customs Document',
      documentNo: 'CD-2026-001',
      bookingNo: 'BKG-45678901',
      shipper: 'ImportFlow Ltd',
      consignee: 'Uganda Manufacturers',
      company: 'ImportFlow Ltd',
      vessel: 'MV Pacific Voyager',
      status: 'Pending',
      uploadedDate: '2026-08-28',
      expiryDate: '2026-09-28',
      size: '4.2 MB',
      icon: FileBarChart,
      color: colors.orange
    },
    {
      id: 'DOC-006',
      name: 'Shipping Instructions',
      type: 'Instruction',
      documentNo: 'SI-2026-001',
      bookingNo: 'BKG-56789012',
      shipper: 'Transworld Logistics',
      consignee: 'South Sudan Trading Co',
      company: 'Transworld Logistics',
      vessel: 'MV Ocean Queen',
      status: 'Approved',
      uploadedDate: '2026-07-19',
      expiryDate: '2026-08-19',
      size: '0.8 MB',
      icon: FileText,
      color: colors.info
    },
    {
      id: 'DOC-007',
      name: 'Insurance Certificate',
      type: 'Certificate',
      documentNo: 'IC-2026-001',
      bookingNo: 'BKG-56789012',
      shipper: 'Transworld Logistics',
      consignee: 'South Sudan Trading Co',
      company: 'Transworld Logistics',
      vessel: 'MV Ocean Queen',
      status: 'Rejected',
      uploadedDate: '2026-07-25',
      expiryDate: '2026-08-25',
      size: '1.5 MB',
      icon: FileCheck,
      color: colors.danger
    },
    {
      id: 'DOC-008',
      name: 'Warehouse Receipt',
      type: 'Receipt',
      documentNo: 'WR-2026-001',
      bookingNo: 'BKG-78901234',
      shipper: 'Uganda Agro Exports',
      consignee: 'European Food Imports',
      company: 'Uganda Agro Exports',
      vessel: 'MV Green Harvest',
      status: 'Approved',
      uploadedDate: '2026-07-28',
      expiryDate: '2026-08-28',
      size: '2.1 MB',
      icon: FileSpreadsheet,
      color: colors.success
    },
    {
      id: 'DOC-009',
      name: 'Dangerous Goods Declaration',
      type: 'Declaration',
      documentNo: 'DGD-2026-001',
      bookingNo: 'BKG-89012345',
      shipper: 'East Africa Trading Co',
      consignee: 'Asian Chemicals Ltd',
      company: 'East Africa Trading Co',
      vessel: 'MV Pacific Voyager',
      status: 'Pending Review',
      uploadedDate: '2026-07-30',
      expiryDate: '2026-08-30',
      size: '3.8 MB',
      icon: FileBarChart,
      color: colors.warning
    },
    {
      id: 'DOC-010',
      name: 'Delivery Order',
      type: 'Order',
      documentNo: 'DO-2026-001',
      bookingNo: 'BKG-90123456',
      shipper: 'Transworld Logistics',
      consignee: 'Kenya Distributors Ltd',
      company: 'Transworld Logistics',
      vessel: 'MV Ocean Queen',
      status: 'Approved',
      uploadedDate: '2026-08-01',
      expiryDate: '2026-09-01',
      size: '1.3 MB',
      icon: FileSignature,
      color: colors.teal
    }
  ]);

  // Extract unique companies and statuses for filters
  const companies = ['all', ...new Set(documents.map(d => d.company || d.shipper).filter(Boolean))];
  const statuses = ['all', ...new Set(documents.map(d => d.status).filter(Boolean))];
  const documentTypes = ['all', ...new Set(documents.map(d => d.type).filter(Boolean))];

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
      'Bill of Lading': FileSignature,
      'Invoice': FileText,
      'Packing List': FileSpreadsheet,
      'Certificate': FileCheck,
      'Customs Document': FileBarChart,
      'Instruction': FileText,
      'Receipt': FileSpreadsheet,
      'Declaration': FileBarChart,
      'Order': FileSignature
    };
    return typeMap[type] || FileText;
  };

  const getFilteredDocuments = () => {
    let filtered = [...documents];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.documentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.bookingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.shipper.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.consignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.company && doc.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(doc => doc.type === typeFilter);
    }

    // Apply company filter
    if (companyFilter !== 'all') {
      filtered = filtered.filter(doc => (doc.company || doc.shipper) === companyFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }

    return filtered;
  };

  const filteredDocuments = getFilteredDocuments();

  // Group documents by company
  const getGroupedDocuments = () => {
    const grouped = {};
    filteredDocuments.forEach(doc => {
      const company = doc.company || doc.shipper || 'Unknown';
      if (!grouped[company]) {
        grouped[company] = [];
      }
      grouped[company].push(doc);
    });
    return grouped;
  };

  const groupedDocuments = getGroupedDocuments();
  const companyNames = Object.keys(groupedDocuments).sort();

  const clearAllFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setCompanyFilter('all');
    setStatusFilter('all');
  };

  // Get company count for display
  const getCompanyCount = (company) => {
    if (company === 'all') return documents.length;
    return documents.filter(d => (d.company || d.shipper) === company).length;
  };

  const toggleCompany = (company) => {
    setExpandedCompanies(prev => ({
      ...prev,
      [company]: !prev[company]
    }));
  };

  // Auto-expand companies when filtering
  useEffect(() => {
    const newExpanded = {};
    Object.keys(groupedDocuments).forEach(company => {
      newExpanded[company] = true;
    });
    setExpandedCompanies(newExpanded);
  }, [filteredDocuments.length]);

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
              Document Management
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all shipping and freight documents grouped by company
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
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
              <Building className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Companies</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {Object.keys(groupedDocuments).length}
            </p>
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
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search by document name, number, booking, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isDark ? 'border-gray-700 hover:bg-gray-800 text-gray-300' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {(typeFilter !== 'all' || companyFilter !== 'all' || statusFilter !== 'all') && (
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                )}
              </button>
              {(typeFilter !== 'all' || companyFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
                <button
                  onClick={clearAllFilters}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Company / Exporter
                  </label>
                  <select
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">All Companies ({documents.length})</option>
                    {companies.filter(c => c !== 'all').map(company => (
                      <option key={company} value={company}>
                        {company} ({getCompanyCount(company)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">All Status</option>
                    {statuses.filter(s => s !== 'all').map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Document Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">All Types</option>
                    {documentTypes.filter(t => t !== 'all').map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(companyFilter !== 'all' || statusFilter !== 'all' || typeFilter !== 'all') && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Filters:</span>
                  {companyFilter !== 'all' && (
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      Company: {companyFilter}
                      <button onClick={() => setCompanyFilter('all')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {statusFilter !== 'all' && (
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      Status: {statusFilter}
                      <button onClick={() => setStatusFilter('all')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {typeFilter !== 'all' && (
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      Type: {typeFilter}
                      <button onClick={() => setTypeFilter('all')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-4">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {filteredDocuments.length} documents found in {Object.keys(groupedDocuments).length} companies
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const allExpanded = {};
                Object.keys(groupedDocuments).forEach(company => {
                  allExpanded[company] = true;
                });
                setExpandedCompanies(allExpanded);
              }}
              className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              Expand All
            </button>
            <button
              onClick={() => setExpandedCompanies({})}
              className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Grouped Documents List */}
        {filteredDocuments.length === 0 ? (
          <div className={`p-12 text-center rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
            <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No documents found
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {companyNames.map((company) => {
              const docs = groupedDocuments[company];
              const isExpanded = expandedCompanies[company] !== false;
              const statusCounts = docs.reduce((acc, doc) => {
                acc[doc.status] = (acc[doc.status] || 0) + 1;
                return acc;
              }, {});

              return (
                <div key={company} className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
                  {/* Company Header */}
                  <div
                    className={`p-4 cursor-pointer flex items-center justify-between transition-colors ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleCompany(company)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                        <Building className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {company}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {docs.length} document{docs.length !== 1 ? 's' : ''}
                          </span>
                          {Object.entries(statusCounts).map(([status, count]) => {
                            const statusStyle = getStatusBadge(status);
                            return (
                              <span key={status} className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                {count}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {isExpanded ? 'Hide' : 'Show'} documents
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" style={{ color: colors.primary }} />
                      ) : (
                        <ChevronDown className="w-5 h-5" style={{ color: colors.primary }} />
                      )}
                    </div>
                  </div>

                  {/* Company Documents */}
                  {isExpanded && (
                    <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      {docs.map((doc) => {
                        const statusStyle = getStatusBadge(doc.status);
                        const StatusIcon = statusStyle.icon;
                        const DocIcon = doc.icon || getTypeIcon(doc.type);
                        const isDocExpanded = expandedDoc === doc.id;

                        return (
                          <div key={doc.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div className="flex-1 cursor-pointer" onClick={() => setExpandedDoc(isDocExpanded ? null : doc.id)}>
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg`} style={{ backgroundColor: doc.color + '20' }}>
                                    <DocIcon className="w-5 h-5" style={{ color: doc.color }} />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {doc.name}
                                      </h4>
                                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                        <StatusIcon className="w-3 h-3" />
                                        {doc.status}
                                      </span>
                                    </div>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {doc.documentNo} • {doc.bookingNo}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Package className="w-3 h-3 inline mr-1" />
                                    {doc.consignee}
                                  </span>
                                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Calendar className="w-3 h-3 inline mr-1" />
                                    Uploaded: {doc.uploadedDate}
                                  </span>
                                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <FileText className="w-3 h-3 inline mr-1" />
                                    {doc.type}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                  title="Download"
                                >
                                  <Download className="w-4 h-4" style={{ color: colors.primary }} />
                                </button>
                                <button
                                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                  title="View"
                                >
                                  <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                                </button>
                                <button
                                  onClick={() => setExpandedDoc(isDocExpanded ? null : doc.id)}
                                  className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                  style={{ color: colors.primary }}
                                >
                                  {isDocExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </button>
                              </div>
                            </div>

                            {/* Expanded Details */}
                            {isDocExpanded && (
                              <div className="mt-3 pt-3 border-t space-y-3"
                                style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
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
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.vessel}</p>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                  <button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                                    style={{ backgroundColor: colors.primary, color: 'white' }}
                                  >
                                    <Download className="w-4 h-4" />
                                    Download
                                  </button>
                                  <button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                                    style={{ borderColor: colors.primary, color: colors.primary }}
                                  >
                                    <Eye className="w-4 h-4" />
                                    Preview
                                  </button>
                                  <button
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                                    style={{ borderColor: colors.primary, color: colors.primary }}
                                  >
                                    <FileText className="w-4 h-4" />
                                    Edit Details
                                  </button>
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
        )}
      </div>
    </div>
  );
};

export default FreightForwarderDocuments;