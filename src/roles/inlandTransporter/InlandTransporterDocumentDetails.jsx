// roles/inlandTransporter/InlandTransporterDocumentDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, FileText, FileCheck, FileSignature, FileBarChart, FileSpreadsheet,
  Download, Eye, Edit, Printer, Share2, Trash2, Calendar, Clock,
  User, Building, Truck, Package, MapPin, CheckCircle, AlertCircle,
  X, Save, Plus, Minus, ZoomIn, ZoomOut, RotateCw, Maximize, Minimize,
  Ship, Container, ClipboardList, Users, Wrench, Fuel, Navigation,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const InlandTransporterDocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTab, setActiveTab] = useState('details');
  const [relatedDocuments, setRelatedDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getDocumentType = () => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type) return type;
    if (location.pathname.includes('/dispatch/')) return 'dispatch';
    if (location.pathname.includes('/delivery/')) return 'delivery';
    if (location.pathname.includes('/vehicle/')) return 'vehicle';
    return 'general';
  };

  const documentType = getDocumentType();

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

  const documentTemplates = {
    dispatch: {
      icon: FileSignature,
      color: colors.indigo,
      type: 'Dispatch Document',
      backPath: '/inland-transporter/dispatch-orders',
      title: 'Dispatch Order',
    },
    delivery: {
      icon: FileText,
      color: colors.teal,
      type: 'Delivery Document',
      backPath: '/inland-transporter/deliveries',
      title: 'Delivery Document',
    },
    vehicle: {
      icon: Truck,
      color: colors.primary,
      type: 'Vehicle Document',
      backPath: '/inland-transporter/vehicles',
      title: 'Vehicle Document',
    },
    general: {
      icon: FileText,
      color: colors.info,
      type: 'Document',
      backPath: '/inland-transporter/documents',
      title: 'Document',
    }
  };

  const currentTemplate = documentTemplates[documentType] || documentTemplates.general;

  useEffect(() => {
    setTimeout(() => {
      const documentData = {
        id: id || 'DOC-001',
        name: `${currentTemplate.title} - ${id || 'DOC-001'}`,
        type: currentTemplate.type,
        documentNo: id || 'DOC-001',
        orderNo: 'DO-12345',
        transporter: 'ImportFlow Logistics',
        transporterAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        consignee: 'Global Importers Inc',
        consigneeAddress: 'Nairobi, Kenya',
        status: 'Approved',
        uploadedDate: '2026-08-08',
        expiryDate: '2026-09-08',
        size: '2.4 MB',
        pages: 3,
        format: 'PDF',
        description: `This document serves as the official ${currentTemplate.type.toLowerCase()} for the transportation of goods.`,
        uploadedBy: 'John Mukasa',
        department: 'Logistics',
        version: '1.0',
        tags: [currentTemplate.type.split(' ')[0], 'Transport', 'Import'],
        color: currentTemplate.color,
        icon: currentTemplate.icon,
        previewUrl: '/sample-document.pdf',
        moduleData: {
          dispatch: {
            orderDate: '2026-08-08',
            deliveryDate: '2026-08-12',
            route: 'Kampala → Mombasa',
            distance: '380 km',
            vehicle: 'UAB 1234',
            driver: 'Robert Ssali'
          },
          delivery: {
            scheduledDate: '2026-08-12 14:30',
            actualDate: '2026-08-12 13:45',
            recipient: 'Jane Smith',
            signature: 'John Doe',
            rating: 5
          },
          vehicle: {
            plateNo: 'UAB 1234',
            model: 'Mercedes Actros',
            year: 2022,
            mileage: '45,230 km',
            fuelType: 'Diesel',
            capacity: '25 tons'
          }
        },
        history: [
          { date: '2026-08-08 10:30', action: 'Document Uploaded', user: 'John Mukasa', details: 'Initial upload' },
          { date: '2026-08-08 14:00', action: 'Status Changed', user: 'Sarah Kamau', details: 'Changed from Pending to Approved' },
          { date: '2026-08-09 09:15', action: 'Viewed', user: 'Jane Smith', details: 'Document previewed' }
        ],
        // Document content for preview
        documentContent: {
          title: `${currentTemplate.title.toUpperCase()}`,
          reference: id || 'DOC-001',
          date: '2026-08-08',
          sections: [
            {
              title: '1. TRANSPORTER DETAILS',
              content: [
                { label: 'Company Name', value: 'ImportFlow Logistics' },
                { label: 'Business Address', value: 'Plot 123, Industrial Area, Kampala, Uganda' },
                { label: 'Contact Person', value: 'John Mukasa' },
                { label: 'Contact Phone', value: '+256 700 123456' },
                { label: 'Contact Email', value: 'john@importflow.com' }
              ]
            },
            {
              title: '2. CONSIGNEE DETAILS',
              content: [
                { label: 'Consignee Name', value: 'Global Importers Inc' },
                { label: 'Address', value: 'Nairobi, Kenya' },
                { label: 'Contact Person', value: 'Jane Smith' },
                { label: 'Phone', value: '+254 722 123456' },
                { label: 'Email', value: 'jane@globalimporters.com' }
              ]
            },
            {
              title: '3. VEHICLE INFORMATION',
              content: [
                { label: 'License Plate', value: 'UAB 1234' },
                { label: 'Vehicle Type', value: '40ft Flatbed' },
                { label: 'Driver Name', value: 'Robert Ssali' },
                { label: 'Driver Phone', value: '+256 700 123456' },
                { label: 'Capacity', value: '25 tons' }
              ]
            },
            {
              title: '4. CARGO DETAILS',
              content: [
                { label: 'Description', value: 'Electronics and Machinery' },
                { label: 'Declared Value', value: '450,000,000 UGX' },
                { label: 'Route', value: 'Kampala → Mombasa' },
                { label: 'Distance', value: '380 km' },
                { label: 'ETA', value: '2026-08-12 14:30' }
              ]
            }
          ],
          footer: 'This document is electronically generated and does not require a physical signature.'
        }
      };

      const relatedDocs = [
        { id: 'REL-001', name: `Related ${currentTemplate.type} 1`, date: '2026-08-07', size: '1.2 MB' },
        { id: 'REL-002', name: `Related ${currentTemplate.type} 2`, date: '2026-08-06', size: '0.8 MB' },
        { id: 'REL-003', name: `Supporting Document`, date: '2026-08-05', size: '3.4 MB' }
      ];

      setDocument(documentData);
      setRelatedDocuments(relatedDocs);
      setLoading(false);
    }, 500);
  }, [id, documentType, currentTemplate]);

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
      'Vehicle Document': Truck,
      'Customs Document': FileBarChart
    };
    return typeMap[type] || FileText;
  };

  const handleEdit = () => {
    navigate(`/inland-transporter/document/edit/${document.id}?type=${documentType}`);
  };

  const handleDownload = () => {
    alert(`Downloading ${document.name} (${document.size})`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      navigate(currentTemplate.backPath);
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
    setCurrentPage(1);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 200) setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) setZoomLevel(zoomLevel - 10);
  };

  const handleNextPage = () => {
    if (currentPage < document.pages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderModuleSpecificData = () => {
    if (!document || !document.moduleData) return null;
    const data = document.moduleData[documentType];
    if (!data) return null;

    return (
      <div>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Info className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
          {documentType.charAt(0).toUpperCase() + documentType.slice(1)} Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {value || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Document Preview Content
  const renderDocumentPreview = () => {
    if (!document || !document.documentContent) return null;
    
    const content = document.documentContent;
    
    return (
      <div className="bg-white dark:bg-white p-8 rounded-lg shadow-lg" style={{ minHeight: '400px' }}>
        {/* Document Header */}
        <div className="text-center border-b pb-4 mb-6" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: document.color + '20' }}>
              <DocIcon className="w-6 h-6" style={{ color: document.color }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{content.title}</h2>
              <p className="text-sm text-gray-500">Reference: {content.reference}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Date: {content.date}</p>
              <span className={`text-xs px-2 py-1 rounded-full`}
                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                {document.status}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <span className="mx-2">•</span>
            {document.transporter}
            <span className="mx-2">•</span>
            {document.consignee}
          </div>
        </div>

        {/* Document Sections */}
        <div className="space-y-6">
          {content.sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 border-b pb-1" style={{ borderColor: '#e5e7eb' }}>
                {section.title}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {section.content.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex">
                    <span className="text-xs text-gray-500 w-1/2">{item.label}:</span>
                    <span className="text-xs text-gray-800 font-medium w-1/2">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Document Footer */}
        <div className="mt-6 pt-4 border-t text-center" style={{ borderColor: '#e5e7eb' }}>
          <p className="text-xs text-gray-400">{content.footer}</p>
          <div className="mt-3 flex justify-center gap-6">
            <div>
              <p className="text-xs text-gray-400">Generated By</p>
              <p className="text-xs text-gray-700 font-medium">{document.uploadedBy}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Department</p>
              <p className="text-xs text-gray-700 font-medium">{document.department}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Version</p>
              <p className="text-xs text-gray-700 font-medium">{document.version}</p>
            </div>
          </div>
        </div>

        {/* Page Number */}
        <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: '#e5e7eb' }}>
          <p className="text-xs text-gray-400">
            Page {currentPage} of {document.pages}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  const DocIcon = document.icon || getTypeIcon(document.type);
  const statusStyle = getStatusBadge(document.status);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(currentTemplate.backPath)}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentTemplate.title} Details
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {document.documentNo} • {document.name}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        {/* Document Type Badge */}
        <div className={`p-3 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2`}
              style={{ backgroundColor: document.color + '20', color: document.color }}>
              <DocIcon className="w-4 h-4" />
              {document.type}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {documentType.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">|</span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              ID: {document.documentNo}
            </span>
          </div>
        </div>

        {/* Preview Modal - Full Document View */}
        {showPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className={`w-full max-w-4xl rounded-lg shadow-2xl p-4 max-h-[95vh] ${
              isDark ? 'bg-gray-900' : 'bg-white'
            }`}>
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <DocIcon className="w-5 h-5" style={{ color: document.color }} />
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {document.name}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Page {currentPage} of {document.pages} • {document.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <button
                    onClick={handleZoomOut}
                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    disabled={zoomLevel <= 50}
                  >
                    <ZoomOut className={`w-4 h-4 ${zoomLevel <= 50 ? 'opacity-50' : ''}`} style={{ color: colors.primary }} />
                  </button>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    disabled={zoomLevel >= 200}
                  >
                    <ZoomIn className={`w-4 h-4 ${zoomLevel >= 200 ? 'opacity-50' : ''}`} style={{ color: colors.primary }} />
                  </button>
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                  {/* Page Navigation */}
                  <button
                    onClick={handlePrevPage}
                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className={`w-4 h-4 ${currentPage <= 1 ? 'opacity-50' : ''}`} style={{ color: colors.primary }} />
                  </button>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentPage}/{document.pages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    disabled={currentPage >= document.pages}
                  >
                    <ChevronRight className={`w-4 h-4 ${currentPage >= document.pages ? 'opacity-50' : ''}`} style={{ color: colors.primary }} />
                  </button>
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>

              {/* Document Content */}
              <div 
                className="border rounded-lg overflow-auto flex items-start justify-center p-6"
                style={{ 
                  backgroundColor: isDark ? '#1a1a2e' : '#f5f5f5',
                  height: '65vh',
                  maxHeight: '65vh'
                }}
              >
                <div 
                  style={{ 
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'top center',
                    width: '100%',
                    maxWidth: '800px'
                  }}
                >
                  {renderDocumentPreview()}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary, color: 'white' }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status */}
        <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
          <div className="flex items-center gap-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2`}
              style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
              <StatusIcon className="w-4 h-4" />
              {document.status}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Uploaded: {document.uploadedDate}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Expires: {document.expiryDate}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Version: {document.version}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Pages: {document.pages}
            </span>
          </div>
        </div>

        {/* Main Content - Grid Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} mb-6`}>
              <div className="flex border-b overflow-x-auto" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'details'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'details' ? colors.primary : 'transparent' }}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('module')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'module'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'module' ? colors.primary : 'transparent' }}
                >
                  <Info className="w-4 h-4 inline mr-2" />
                  {documentType.charAt(0).toUpperCase() + documentType.slice(1)} Info
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'history'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'history' ? colors.primary : 'transparent' }}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  History
                </button>
                <button
                  onClick={() => setActiveTab('related')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'related'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'related' ? colors.primary : 'transparent' }}
                >
                  <Files className="w-4 h-4 inline mr-2" />
                  Related Documents
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Document Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Name</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.name}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Number</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.documentNo}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.type}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Format</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.format} • {document.pages} pages</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>File Size</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.size}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Department</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.department}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description</p>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{document.description}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tags</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {document.tags.map((tag, idx) => (
                              <span key={idx} className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Building className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                        Parties Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Transporter</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.transporter}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{document.transporterAddress}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.consignee}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{document.consigneeAddress}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Uploaded By</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.uploadedBy}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order Reference</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.orderNo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'module' && renderModuleSpecificData()}

                {activeTab === 'history' && (
                  <div className="space-y-3">
                    {document.history.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: colors.primary }}></div>
                          {index < document.history.length - 1 && (
                            <div className="w-0.5 h-6" style={{ backgroundColor: colors.primary + '40' }}></div>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.action}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.user} • {item.date}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {item.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'related' && (
                  <div className="space-y-3">
                    {relatedDocuments.map((doc, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {doc.date} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <button
                          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          onClick={() => alert(`Viewing ${doc.name}`)}
                        >
                          <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Document Preview */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Eye className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Document Preview
              </h3>
              <div 
                className={`rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed`}
                style={{ borderColor: document.color + '40' }}
                onClick={handlePreview}
              >
                <DocIcon className="w-12 h-12 mx-auto mb-3" style={{ color: document.color }} />
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {document.name}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {document.format} • {document.size} • {document.pages} pages
                </p>
                <button
                  className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 mx-auto"
                  style={{ backgroundColor: document.color + '20', color: document.color }}
                >
                  <Eye className="w-4 h-4" />
                  View Full Document
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={handlePreview}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.info }}
                >
                  <Eye className="w-4 h-4" />
                  Preview Document
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Download className="w-4 h-4" />
                  Download Document
                </button>
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  <Edit className="w-4 h-4" />
                  Edit Details
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                  style={{ borderColor: colors.danger, color: colors.danger }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Document
                </button>
              </div>
            </div>

            {/* Document Info */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Info className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Document Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Version</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pages</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Uploaded</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.uploadedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expires</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.expiryDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Info icon component
const Info = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// Files icon component
const Files = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export default InlandTransporterDocumentDetails;