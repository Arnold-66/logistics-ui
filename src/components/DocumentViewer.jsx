// components/DocumentViewer.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/themeContext';
import {
  FileText, FileCheck, FileSignature, CreditCard, Shield, FileBarChart,
  Download, Eye, Share2, Send, CheckCircle, Clock, AlertCircle,
  Calendar, User, Building, Package, ArrowLeft, X, ChevronLeft,
  ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, RotateCw,
  Printer, Home, Link, MessageSquare, Users, Search, Filter,
  Grid, List, ChevronDown, ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentViewer = ({ 
  documents = [], 
  title = 'Documents', 
  backPath = '/',
  shipmentId = null,
  documentType = 'all'
}) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('preview');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');

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

  // Sample document content for preview
  const getDocumentContent = (doc) => {
    const contents = {
      'Commercial Invoice': `COMMERCIAL INVOICE
Invoice Number: INV-2026-00458
Date: 15 July 2026

Seller: TechImport Ltd
Address: 123 Tech Park, Shanghai, China
Phone: +86 21 5555 1234
Email: sales@techimport.cn

Buyer: ImportFlow Ltd
Address: Plot 45, Industrial Area, Kampala, Uganda
Phone: +256 712 345 678
Email: info@importflow.com

----------------------------------------------------------------
Item Description          | Qty | Unit Price (UGX) | Total (UGX)
----------------------------------------------------------------
Electronics Components   | 450 | 468,750          | 210,937,500
Circuit Boards           | 1200| 187,500          | 225,000,000
Power Supplies           | 850 | 234,375          | 199,218,750
----------------------------------------------------------------
Subtotal:                                   635,156,250
Tax (18%):                                  114,328,125
Total Amount:                               749,484,375

Payment Terms: 30 days net from invoice date
Delivery Terms: FOB Shanghai
Shipping Method: Sea Freight
Vessel: MV Star Express

This invoice is for customs clearance purposes only.
All amounts are in Ugandan Shillings (UGX).

Authorized Signature:
__________________
TechImport Ltd`,

      'Bill of Lading': `BILL OF LADING
BL Number: BOL-2026-00458
Date: 25 July 2026

Shipper: TechImport Ltd
Consignee: ImportFlow Ltd
Notify Party: Uganda Shipping Agency

Vessel: MV Star Express
Voyage: SE-2026-078
Port of Loading: Shanghai, China
Port of Discharge: Port of Mombasa

Container: MSKU-458921
Seal Number: SEAL-001
Gross Weight: 12.5 tons
Measurement: 45 CBM

Description of Goods:
Electronics Components, Circuit Boards, Power Supplies

This is a non-negotiable document.

Authorized Signature:
__________________
MV Star Express`,

      'PVoC': `PRE-EXPORT VERIFICATION OF CONFORMITY (PVoC)
Certificate Number: PVoC-2026-00459
Issue Date: 28 July 2026
Expiry Date: 28 October 2026

Product: Electronics Components
Quantity: 450 units
Origin: China
Exporter: TechImport Ltd
Importer: ImportFlow Ltd

Verification Results:
All products meet the required standards.

This verification is valid for the specified shipment only.

Issued By:
__________________
UNBS Authorized Officer`,

      'Commercial Invoice (Exporter)': `COMMERCIAL INVOICE (EXPORTER)
Invoice Number: INV-EXP-2026-001
Date: 20 July 2026

Exporter: ImportFlow Ltd
Address: Kampala, Uganda
Phone: +256 712 345 678

Importer: Global Importers Inc
Address: Nairobi, Kenya
Phone: +254 722 123456

----------------------------------------------------------------
Item Description          | Qty | Unit Price (USD) | Total (USD)
----------------------------------------------------------------
Electronics Components   | 450 | 125.00          | 56,250.00
Circuit Boards           | 1200| 50.00           | 60,000.00
Power Supplies           | 850 | 62.50           | 53,125.00
----------------------------------------------------------------
Total Amount:                                  169,375.00 USD

Payment Terms: 30 days net from invoice date

Authorized Signature:
__________________
ImportFlow Ltd`,

      'Packing List': `PACKING LIST
Date: 25 July 2026
Shipment: #458

Container: MSKU-458921
Seal Number: SEAL-001

----------------------------------------------------------------
Item Description          | Qty | Weight (kg) | Dimensions (cm)
----------------------------------------------------------------
Electronics Components   | 450 | 2,500      | 50x40x30
Circuit Boards           | 1200| 1,800      | 30x20x10
Power Supplies           | 850 | 2,200      | 25x20x15
----------------------------------------------------------------
Total Weight: 6,500 kg
Total Volume: 45 CBM

Packed by: TechImport Ltd
Date: 25 July 2026

Authorized Signature:
__________________
TechImport Ltd`
    };

    // Generate content based on document name or type
    for (const [key, content] of Object.entries(contents)) {
      if (doc.name.toLowerCase().includes(key.toLowerCase()) || 
          (doc.type && key.toLowerCase().includes(doc.type.toLowerCase()))) {
        return content;
      }
    }

    // Default content if no match
    return `DOCUMENT DETAILS
Document: ${doc.name}
Type: ${doc.type || 'General'}
Date: ${doc.date || 'N/A'}
Status: ${doc.status || 'Active'}

This document is associated with shipment ${doc.shipmentId || 'N/A'}.

Please contact your logistics provider for more information.

Generated: ${new Date().toLocaleString()}`;
  };

  const getDocumentIcon = (type) => {
    const iconMap = {
      'invoice': FileText,
      'contract': FileSignature,
      'payment': CreditCard,
      'certificate': Shield,
      'details': Building,
      'list': Package,
      'bl': FileCheck,
      'pvoc': Shield,
    };
    const Icon = iconMap[type] || FileText;
    return <Icon className="w-5 h-5" />;
  };

  const getDocumentColor = (type) => {
    const colorMap = {
      'invoice': 'text-blue-500',
      'contract': 'text-purple-500',
      'payment': 'text-green-500',
      'certificate': 'text-orange-500',
      'details': 'text-indigo-500',
      'list': 'text-pink-500',
      'bl': 'text-teal-500',
      'pvoc': 'text-amber-500',
    };
    return colorMap[type] || 'text-gray-500';
  };

  const getStatusBadge = (status) => {
    if (status === 'completed' || status === 'Approved' || status === 'approved') {
      return {
        backgroundColor: colors.success + '20',
        color: colors.success,
        icon: <CheckCircle className="w-3 h-3" />
      };
    } else if (status === 'pending' || status === 'Pending' || status === 'Pending Review') {
      return {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
        icon: <Clock className="w-3 h-3" />
      };
    } else {
      return {
        backgroundColor: colors.danger + '20',
        color: colors.danger,
        icon: <AlertCircle className="w-3 h-3" />
      };
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (doc.type && doc.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (doc.documentNumber && doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || (doc.type && doc.type.toLowerCase() === filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const getDocumentTypes = () => {
    const types = new Set();
    documents.forEach(doc => {
      if (doc.type) types.add(doc.type);
    });
    return ['all', ...types];
  };

  const handleViewDocument = (doc) => {
    setSelectedDocument(doc);
    setShowPreview(true);
    setCurrentPage(1);
    setZoomLevel(100);
    setRotation(0);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedDocument(null);
  };

  const handleZoomIn = () => setZoomLevel(Math.min(200, zoomLevel + 10));
  const handleZoomOut = () => setZoomLevel(Math.max(50, zoomLevel - 10));
  const handleRotate = () => setRotation((rotation + 90) % 360);

  const handleShare = () => {
    alert(`Document "${selectedDocument?.name}" shared with ${shareEmail || 'application users'}`);
    setShowShareModal(false);
    setShareEmail('');
    setShareMessage('');
  };

  // Render document preview modal
  const renderPreviewModal = () => {
    if (!selectedDocument) return null;

    const statusStyle = getStatusBadge(selectedDocument.status);
    const contentLines = getDocumentContent(selectedDocument).split('\n');

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className={`w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden max-h-[95vh] ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Modal Header */}
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {getDocumentIcon(selectedDocument.type)}
              </div>
              <div className="min-w-0">
                <h3 className={`text-lg font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedDocument.name}
                </h3>
                <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {selectedDocument.documentNumber || selectedDocument.id} • {selectedDocument.date || 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={zoomLevel <= 50}
              >
                <ZoomOut className={`w-4 h-4 ${zoomLevel <= 50 ? 'opacity-50' : ''}`} style={{ color: colors.primary }} />
              </button>
              <span className={`text-sm min-w-[40px] text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {zoomLevel}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={zoomLevel >= 200}
              >
                <ZoomIn className={`w-4 h-4 ${zoomLevel >= 200 ? 'opacity-50' : ''}`} style={{ color: colors.primary }} />
              </button>
              <button
                onClick={handleRotate}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <RotateCw className="w-4 h-4" style={{ color: colors.primary }} />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
              <button
                onClick={() => window.print()}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleClosePreview}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(95vh - 140px)' }}>
            <div 
              className={`p-8 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-inner min-h-[400px] transition-all duration-300`}
              style={{ 
                transform: `scale(${zoomLevel/100}) rotate(${rotation}deg)`, 
                transformOrigin: 'top left',
              }}
            >
              <div className="font-mono text-sm whitespace-pre-wrap break-words">
                {contentLines.map((line, index) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine) return <div key={index} className="h-2" />;
                  
                  const isHeader = trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3 || 
                                  trimmedLine.includes('--------------------------------------------------');
                  const isDivider = trimmedLine.includes('----------------------------------------------------------------');
                  const isSection = trimmedLine.includes(':') && trimmedLine.split(':')[0].length < 30;

                  if (isDivider) {
                    return (
                      <div key={index} className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-300'} my-2`} />
                    );
                  }

                  if (isHeader && !isDivider) {
                    return (
                      <p key={index} className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'} py-2`}>
                        {trimmedLine.replace(/\*\*/g, '').replace(/__/g, '')}
                      </p>
                    );
                  }

                  if (isSection) {
                    const [label, value] = trimmedLine.split(':').map(s => s.trim());
                    return (
                      <p key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} py-0.5`}>
                        <span className="font-semibold">{label}:</span> {value}
                      </p>
                    );
                  }

                  if (trimmedLine.includes('|') && trimmedLine.includes('-')) {
                    return <div key={index} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} my-1`} />;
                  }

                  if (trimmedLine.includes('|')) {
                    const cols = trimmedLine.split('|').map(c => c.trim()).filter(c => c);
                    return (
                      <div key={index} className={`grid grid-cols-4 gap-2 py-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {cols.map((col, ci) => (
                          <span key={ci} className="truncate">{col}</span>
                        ))}
                      </div>
                    );
                  }

                  if (trimmedLine.startsWith('__________________')) {
                    return (
                      <div key={index} className="mt-4">
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {trimmedLine}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} py-0.5`}>
                      {trimmedLine}
                    </p>
                  );
                })}
              </div>

              {/* Document Footer */}
              <div className={`mt-8 pt-4 border-t text-xs ${isDark ? 'border-gray-700 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
                <div className="flex justify-between">
                  <span>Document: {selectedDocument.documentNumber || selectedDocument.id}</span>
                  <span>Generated: {new Date().toLocaleString()}</span>
                  <span>Page 1 of {selectedDocument.pages || 1}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className={`flex items-center justify-between p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2">
              <span 
                className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: statusStyle.backgroundColor,
                  color: statusStyle.color
                }}
              >
                {statusStyle.icon}
                {selectedDocument.status || 'Active'}
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedDocument.size || 'N/A'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const content = getDocumentContent(selectedDocument);
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedDocument.name.replace(/\s+/g, '_')}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleClosePreview}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Share Modal
  const ShareModal = () => {
    if (!selectedDocument) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Share Document
              </h3>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                {getDocumentIcon(selectedDocument.type)}
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedDocument.name}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedDocument.shipmentId || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Share via Email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Share via Application
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <Users className="w-6 h-6" style={{ color: colors.primary }} />
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Team</span>
                  </button>
                  <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <MessageSquare className="w-6 h-6" style={{ color: colors.primary }} />
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Chat</span>
                  </button>
                  <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <Link className="w-6 h-6" style={{ color: colors.primary }} />
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Copy Link</span>
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message (Optional)
                </label>
                <textarea
                  placeholder="Add a message..."
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  rows="3"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: colors.primary }}></div>
        <p className={`ml-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading documents...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Share Modal */}
      {showShareModal && <ShareModal />}

      {/* Document Preview Modal */}
      {showPreview && selectedDocument && renderPreviewModal()}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {documents.length} documents found
            {shipmentId && ` for shipment ${shipmentId}`}
          </p>
        </div>
        <button
          onClick={() => navigate(backPath)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Search and Filter */}
      <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              {getDocumentTypes().map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            <div className={`flex rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1 ${
                  viewMode === 'list' 
                    ? 'text-white' 
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ backgroundColor: viewMode === 'list' ? colors.primary : 'transparent' }}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm transition-all duration-200 flex items-center gap-1 ${
                  viewMode === 'grid' 
                    ? 'text-white' 
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ backgroundColor: viewMode === 'grid' ? colors.primary : 'transparent' }}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents List/Grid */}
      {filteredDocuments.length === 0 ? (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No documents found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            {filteredDocuments.map((doc, index) => {
              const statusStyle = getStatusBadge(doc.status);
              
              return (
                <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => handleViewDocument(doc)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {doc.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {doc.documentNumber || doc.id}
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {doc.date || 'N/A'}
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {doc.size || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
                        style={{
                          backgroundColor: statusStyle.backgroundColor,
                          color: statusStyle.color
                        }}
                      >
                        {statusStyle.icon}
                        {doc.status || 'Active'}
                      </span>
                      <button 
                        className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        onClick={(e) => { e.stopPropagation(); handleViewDocument(doc); }}
                      >
                        <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc, index) => {
            const statusStyle = getStatusBadge(doc.status);
            
            return (
              <div
                key={index}
                className={`rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
                }`}
                onClick={() => handleViewDocument(doc)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {doc.name}
                    </p>
                    <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {doc.documentNumber || doc.id}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {doc.date || 'N/A'}
                  </span>
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {doc.size || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
                    style={{
                      backgroundColor: statusStyle.backgroundColor,
                      color: statusStyle.color
                    }}
                  >
                    {statusStyle.icon}
                    {doc.status || 'Active'}
                  </span>
                  <button 
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={(e) => { e.stopPropagation(); handleViewDocument(doc); }}
                  >
                    <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;