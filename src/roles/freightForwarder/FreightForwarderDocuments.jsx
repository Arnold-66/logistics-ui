// roles/freightForwarder/FreightForwarderDocuments.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  FileText, FileCheck, FileSignature, FileBarChart, FileSpreadsheet,
  Download, Eye, Search, Filter, Plus, RefreshCw, X, ChevronDown,
  ChevronUp, Calendar, Clock, CheckCircle, AlertCircle, Users,
  Building, Package, Ship, Container, Truck
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
    teal: '#14b8a6',
    indigo: '#6366f1',
    orange: '#f97316',
  };

  const isDark = darkMode

  const [documents, setDocuments] = useState([
    {
      id: 'DOC-001',
      name: 'Bill of Lading',
      type: 'Bill of Lading',
      documentNo: 'BL-2026-001',
      bookingNo: 'BKG-12345678',
      shipper: 'ImportFlow Ltd',
      consignee: 'Global Importers Inc',
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
      vessel: 'MV Pacific Voyager',
      status: 'Pending',
      uploadedDate: '2026-08-28',
      expiryDate: '2026-09-28',
      size: '4.2 MB',
      icon: FileBarChart,
      color: colors.orange
    }
  ]);

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
      'Customs Document': FileBarChart
    };
    return typeMap[type] || FileText;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.bookingNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.shipper.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const documentTypes = ['all', ...new Set(documents.map(d => d.type))];

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
              Manage all shipping and freight documents
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
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by document name, number, booking..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              {documentTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            <button
              className={`p-2 rounded-lg border transition-colors ${
                isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          {filteredDocuments.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No documents found
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              {filteredDocuments.map((doc) => {
                const statusStyle = getStatusBadge(doc.status);
                const StatusIcon = statusStyle.icon;
                const DocIcon = doc.icon || getTypeIcon(doc.type);
                const isExpanded = expandedDoc === doc.id;

                return (
                  <div key={doc.id} className="p-4">
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
                              {doc.documentNo} • {doc.bookingNo}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Users className="w-3 h-3 inline mr-1" />
                            {doc.shipper}
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
      </div>
    </div>
  );
};

export default FreightForwarderDocuments;