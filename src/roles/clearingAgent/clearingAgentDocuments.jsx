import React, { useState, useContext, useEffect } from 'react';
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
  Truck,
  Ship,
  Anchor,
  Briefcase,
  ClipboardList,
  UserCheck,
  FileSpreadsheet,
  FolderOpen,
  Info,
  RefreshCw,
  Send,
  ExternalLink
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ClearingAgentDocuments = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState(null);
  const [requestModal, setRequestModal] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [uploadModal, setUploadModal] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadComment, setUploadComment] = useState('');

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
    pink: '#ec4899',
    cyan: '#06b6d4'
  };

  const isDark = darkMode

  // Document categories for clearing agent
  const documentCategories = [
    { id: 'all', label: 'All Documents', icon: FileText },
    { id: 'importer_docs', label: 'Importer Documents', icon: Building },
    { id: 'shipment_docs', label: 'Shipment Documents', icon: Ship },
    { id: 'clearance_docs', label: 'Clearance Documents', icon: Shield },
    { id: 'payment_docs', label: 'Payment Documents', icon: CreditCard },
    { id: 'certificate_docs', label: 'Certificates', icon: FileCheck },
  ];

  // Document data for clearing agent
  const documentsData = [
    {
      id: 1,
      name: 'Commercial Invoice',
      description: 'Required for customs valuation - must match factory declarations',
      type: 'invoice',
      category: 'importer_docs',
      source: 'importer',
      status: 'received',
      date: '2026-07-15',
      size: '2.4 MB',
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'SHIP-458',
      documentNumber: 'INV-2026-00458',
      expiryDate: '2026-12-31',
      priority: 'high',
      tags: ['invoice', 'commercial', 'import'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download', 'share']
    },
    {
      id: 2,
      name: 'Sales Contract',
      description: 'Official sales agreement between buyer and seller',
      type: 'contract',
      category: 'importer_docs',
      source: 'importer',
      status: 'received',
      date: '2026-07-10',
      size: '1.8 MB',
      uploadedBy: 'Jane Smith (Importer)',
      shipmentId: 'SHIP-458',
      documentNumber: 'SC-2026-00458',
      expiryDate: '2026-12-31',
      priority: 'high',
      tags: ['contract', 'sales', 'agreement'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download', 'share']
    },
    {
      id: 3,
      name: 'Bill of Lading',
      description: 'Proof of shipment - required for customs clearance',
      type: 'shipping',
      category: 'shipment_docs',
      source: 'shipping_line',
      status: 'pending',
      date: '2026-07-20',
      size: '3.2 MB',
      uploadedBy: 'MV Star Express',
      shipmentId: 'SHIP-458',
      documentNumber: 'BOL-2026-00458',
      expiryDate: null,
      priority: 'critical',
      tags: ['shipping', 'bill_of_lading', 'carrier'],
      fileType: 'pdf',
      requiredBy: 'URC & Importer',
      actions: ['request', 'view', 'download']
    },
    {
      id: 4,
      name: 'Packing List',
      description: 'Detailed list of all items in the container',
      type: 'shipping',
      category: 'shipment_docs',
      source: 'shipping_line',
      status: 'pending',
      date: '2026-07-20',
      size: '1.5 MB',
      uploadedBy: 'MV Star Express',
      shipmentId: 'SHIP-458',
      documentNumber: 'PL-2026-00458',
      expiryDate: null,
      priority: 'high',
      tags: ['packing', 'list', 'container'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['request', 'view', 'download']
    },
    {
      id: 5,
      name: 'Customs Declaration Form',
      description: 'Form C-18 - Required for customs entry',
      type: 'clearance',
      category: 'clearance_docs',
      source: 'clearing_agent',
      status: 'in_progress',
      date: '2026-07-25',
      size: '0.8 MB',
      uploadedBy: 'You (Clearing Agent)',
      shipmentId: 'SHIP-458',
      documentNumber: 'C18-2026-00458',
      expiryDate: null,
      priority: 'critical',
      tags: ['customs', 'declaration', 'ura'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['edit', 'upload', 'view']
    },
    {
      id: 6,
      name: 'UNBS Certificate of Conformity',
      description: 'Product quality certification from UNBS',
      type: 'certificate',
      category: 'certificate_docs',
      source: 'importer',
      status: 'pending',
      date: '2026-07-25',
      size: '1.2 MB',
      uploadedBy: 'Jane Smith (Importer)',
      shipmentId: 'SHIP-459',
      documentNumber: 'COC-2026-00459',
      expiryDate: '2027-07-25',
      priority: 'high',
      tags: ['unbs', 'certificate', 'quality'],
      fileType: 'pdf',
      requiredBy: 'UNBS & URC',
      actions: ['request', 'view']
    },
    {
      id: 7,
      name: 'UNBS PVoC Certificate',
      description: 'Pre-Export Verification of Conformity',
      type: 'certificate',
      category: 'certificate_docs',
      source: 'importer',
      status: 'pending',
      date: '2026-07-28',
      size: '0.9 MB',
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'SHIP-459',
      documentNumber: 'PVoC-2026-00459',
      expiryDate: '2026-10-28',
      priority: 'high',
      tags: ['unbs', 'pvoc', 'verification'],
      fileType: 'pdf',
      requiredBy: 'UNBS',
      actions: ['request', 'view']
    },
    {
      id: 8,
      name: 'Freight Invoice',
      description: 'Required by URA for customs value calculation',
      type: 'invoice',
      category: 'payment_docs',
      source: 'shipping_line',
      status: 'received',
      date: '2026-07-22',
      size: '4.2 MB',
      uploadedBy: 'MV Star Express',
      shipmentId: 'SHIP-458',
      documentNumber: 'FI-2026-00458',
      expiryDate: null,
      priority: 'high',
      tags: ['freight', 'invoice', 'ura'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download', 'share']
    },
    {
      id: 9,
      name: 'Proof of Payment',
      description: 'Payment confirmation for import goods',
      type: 'payment',
      category: 'payment_docs',
      source: 'importer',
      status: 'received',
      date: '2026-07-20',
      size: '3.1 MB',
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'SHIP-458',
      documentNumber: 'POP-2026-00458',
      expiryDate: null,
      priority: 'high',
      tags: ['payment', 'receipt', 'proof'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download']
    },
    {
      id: 10,
      name: 'Container Seal Report',
      description: 'Report on container seal integrity at arrival',
      type: 'shipping',
      category: 'shipment_docs',
      source: 'clearing_agent',
      status: 'in_progress',
      date: '2026-07-30',
      size: '0.5 MB',
      uploadedBy: 'You (Clearing Agent)',
      shipmentId: 'SHIP-458',
      documentNumber: 'CSR-2026-00458',
      expiryDate: null,
      priority: 'medium',
      tags: ['seal', 'container', 'inspection'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['edit', 'upload', 'view']
    },
    {
      id: 11,
      name: 'Importer Registration Details',
      description: 'Company registration and TIN information',
      type: 'details',
      category: 'importer_docs',
      source: 'importer',
      status: 'received',
      date: '2026-07-05',
      size: '0.5 MB',
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'SHIP-458',
      documentNumber: 'IRD-2026-00458',
      expiryDate: null,
      priority: 'medium',
      tags: ['registration', 'tin', 'importer'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download']
    },
    {
      id: 12,
      name: 'Import Items List',
      description: 'Detailed list of items being imported with HS codes',
      type: 'list',
      category: 'importer_docs',
      source: 'importer',
      status: 'received',
      date: '2026-07-08',
      size: '0.8 MB',
      uploadedBy: 'Jane Smith (Importer)',
      shipmentId: 'SHIP-458',
      documentNumber: 'IIL-2026-00458',
      expiryDate: null,
      priority: 'high',
      tags: ['items', 'import', 'hs_code'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download']
    },
    {
      id: 13,
      name: 'Vessel Arrival Notice',
      description: 'Notice of vessel arrival at port',
      type: 'shipping',
      category: 'shipment_docs',
      source: 'shipping_line',
      status: 'pending',
      date: '2026-08-01',
      size: '1.1 MB',
      uploadedBy: 'Port Authority',
      shipmentId: 'SHIP-458',
      documentNumber: 'VAN-2026-00458',
      expiryDate: null,
      priority: 'critical',
      tags: ['vessel', 'arrival', 'port'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['request', 'view']
    },
    {
      id: 14,
      name: 'Tax Assessment Form',
      description: 'Tax assessment for import duties and VAT',
      type: 'clearance',
      category: 'clearance_docs',
      source: 'clearing_agent',
      status: 'draft',
      date: '2026-08-02',
      size: '0.3 MB',
      uploadedBy: 'You (Clearing Agent)',
      shipmentId: 'SHIP-458',
      documentNumber: 'TAF-2026-00458',
      expiryDate: null,
      priority: 'critical',
      tags: ['tax', 'assessment', 'duty'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['edit', 'upload', 'view']
    },
    {
      id: 15,
      name: 'Delivery Order',
      description: 'Authority to release cargo from port',
      type: 'clearance',
      category: 'clearance_docs',
      source: 'shipping_line',
      status: 'pending',
      date: '2026-08-03',
      size: '0.7 MB',
      uploadedBy: 'MV Star Express',
      shipmentId: 'SHIP-458',
      documentNumber: 'DO-2026-00458',
      expiryDate: null,
      priority: 'high',
      tags: ['delivery', 'release', 'port'],
      fileType: 'pdf',
      requiredBy: 'Importer',
      actions: ['request', 'view']
    }
  ];

  // Get document source badge
  const getSourceBadge = (source) => {
    const sourceMap = {
      'importer': { backgroundColor: colors.primaryBg, color: colors.primary, icon: Building, label: 'From Importer' },
      'shipping_line': { backgroundColor: colors.info + '20', color: colors.info, icon: Ship, label: 'From Shipping Line' },
      'clearing_agent': { backgroundColor: colors.success + '20', color: colors.success, icon: UserCheck, label: 'Created by You' },
    };
    return sourceMap[source] || sourceMap['importer'];
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'critical': { backgroundColor: colors.danger + '20', color: colors.danger, label: 'Critical' },
      'high': { backgroundColor: colors.warning + '20', color: colors.warning, label: 'High' },
      'medium': { backgroundColor: colors.info + '20', color: colors.info, label: 'Medium' },
      'low': { backgroundColor: colors.success + '20', color: colors.success, label: 'Low' },
    };
    return priorityMap[priority] || priorityMap['medium'];
  };

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'invoice': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'contract': return <FileSignature className="w-5 h-5 text-purple-500" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'certificate': return <Shield className="w-5 h-5 text-orange-500" />;
      case 'details': return <Building className="w-5 h-5 text-indigo-500" />;
      case 'list': return <Package className="w-5 h-5 text-pink-500" />;
      case 'shipping': return <Ship className="w-5 h-5 text-cyan-500" />;
      case 'clearance': return <ClipboardList className="w-5 h-5 text-teal-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'received': {
        backgroundColor: colors.success + '20',
        color: colors.success,
        icon: <CheckCircle className="w-3 h-3" />,
        label: 'Received'
      },
      'pending': {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
        icon: <Clock className="w-3 h-3" />,
        label: 'Pending'
      },
      'in_progress': {
        backgroundColor: colors.info + '20',
        color: colors.info,
        icon: <RefreshCw className="w-3 h-3" />,
        label: 'In Progress'
      },
      'draft': {
        backgroundColor: colors.indigo + '20',
        color: colors.indigo,
        icon: <Edit className="w-3 h-3" />,
        label: 'Draft'
      },
      'rejected': {
        backgroundColor: colors.danger + '20',
        color: colors.danger,
        icon: <AlertCircle className="w-3 h-3" />,
        label: 'Rejected'
      }
    };
    return statusMap[status] || statusMap['pending'];
  };

  const documentTypes = ['all', ...new Set(documentsData.map(d => d.type))];
  const statusOptions = ['all', 'received', 'pending', 'in_progress', 'draft', 'rejected'];
  const sourceOptions = ['all', 'importer', 'shipping_line', 'clearing_agent'];

  const toggleExpand = (docId) => {
    if (expandedDoc === docId) {
      setExpandedDoc(null);
    } else {
      setExpandedDoc(docId);
    }
  };

  const viewDocument = (doc) => {
    navigate(`/clearing-agent-documents/${doc.id}`);
  };

  const handleRequestDocument = (doc) => {
    setRequestModal(doc);
    setRequestMessage(`Requesting document: ${doc.name}\nPlease upload the ${doc.name} for shipment ${doc.shipmentId}`);
  };

  const handleSendRequest = () => {
    alert(`Document request sent for "${requestModal.name}"\nMessage: ${requestMessage}`);
    setRequestModal(null);
    setRequestMessage('');
  };

  const handleUploadDocument = (doc) => {
    setUploadModal(doc);
    setUploadFile(null);
    setUploadComment('');
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleSubmitUpload = () => {
    if (uploadFile) {
      alert(`Document "${uploadModal.name}" uploaded successfully!\nFile: ${uploadFile.name}\nComment: ${uploadComment}`);
      setUploadModal(null);
      setUploadFile(null);
      setUploadComment('');
    } else {
      alert('Please select a file to upload');
    }
  };

  const filteredDocuments = documentsData.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesSource = filterSource === 'all' || doc.source === filterSource;
    return matchesSearch && matchesStatus && matchesCategory && matchesSource;
  });

  // Stats
  const totalDocs = documentsData.length;
  const receivedDocs = documentsData.filter(d => d.status === 'received').length;
  const pendingDocs = documentsData.filter(d => d.status === 'pending').length;
  const inProgressDocs = documentsData.filter(d => d.status === 'in_progress' || d.status === 'draft').length;
  const criticalDocs = documentsData.filter(d => d.priority === 'critical').length;

  // Request Modal
  const RequestModal = () => {
    if (!requestModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Request Document
              </h3>
            </div>
            <button
              onClick={() => setRequestModal(null)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{requestModal.name}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Shipment: {requestModal.shipmentId} • Required by: {requestModal.requiredBy}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows="4"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Info className="w-4 h-4 inline mr-1" />
                  This request will be sent to the importer and shipping line for document submission.
                </p>
              </div>
            </div>
          </div>

          <div className={`flex justify-end gap-2 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setRequestModal(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSendRequest}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Send Request
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Upload Modal
  const UploadModal = () => {
    if (!uploadModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload Document
              </h3>
            </div>
            <button
              onClick={() => setUploadModal(null)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{uploadModal.name}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Shipment: {uploadModal.shipmentId}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Select File *
                </label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                    isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  />
                  {uploadFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileCheck className="w-6 h-6 text-green-500" />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Click to upload or drag and drop
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        PDF, Word, Excel, Images (max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Comment (Optional)
                </label>
                <textarea
                  value={uploadComment}
                  onChange={(e) => setUploadComment(e.target.value)}
                  rows="2"
                  placeholder="Add any additional notes..."
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
          </div>

          <div className={`flex justify-end gap-2 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setUploadModal(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitUpload}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render action buttons based on document
  const renderActions = (doc) => {
    const actions = [];

    if (doc.actions.includes('view')) {
      actions.push(
        <button
          key="view"
          onClick={() => viewDocument(doc)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="View Document"
        >
          <Eye className="w-4 h-4" style={{ color: colors.primary }} />
        </button>
      );
    }

    if (doc.actions.includes('download')) {
      actions.push(
        <button
          key="download"
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Download"
        >
          <Download className="w-4 h-4 text-blue-500" />
        </button>
      );
    }

    if (doc.actions.includes('share')) {
      actions.push(
        <button
          key="share"
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Share"
        >
          <Share2 className="w-4 h-4 text-green-500" />
        </button>
      );
    }

    if (doc.actions.includes('request') && (doc.status === 'pending' || doc.status === 'draft')) {
      actions.push(
        <button
          key="request"
          onClick={() => handleRequestDocument(doc)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Request Document"
        >
          <Send className="w-4 h-4 text-yellow-500" />
        </button>
      );
    }

    if (doc.actions.includes('edit') || doc.actions.includes('upload')) {
      actions.push(
        <button
          key="upload"
          onClick={() => handleUploadDocument(doc)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Upload/Edit"
        >
          <Upload className="w-4 h-4 text-purple-500" />
        </button>
      );
    }

    return actions;
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {requestModal && <RequestModal />}
      {uploadModal && <UploadModal />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <FolderOpen className="w-6 h-6" style={{ color: colors.primary }} />
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Document Management
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Manage all documents required for customs clearance
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
              onClick={() => navigate('/clearing-agent-upload')}
            >
              <Upload className="w-4 h-4" />
              Upload Document
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
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Received</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{receivedDocs}</p>
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
              <RefreshCw className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Progress</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{inProgressDocs}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: colors.danger }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Critical</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{criticalDocs}</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {documentCategories.map((category) => {
            const Icon = category.icon;
            const isActive = filterCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-sm'
                    : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: isActive ? colors.primary : 'transparent'
                }}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
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
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
                      {source === 'all' ? 'All Sources' : source.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterCategory('all');
                  setFilterSource('all');
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

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocuments.map((doc) => {
            const isExpanded = expandedDoc === doc.id;
            const statusStyle = getStatusBadge(doc.status);
            const sourceStyle = getSourceBadge(doc.source);
            const priorityStyle = getPriorityBadge(doc.priority);
            const SourceIcon = sourceStyle.icon;

            return (
              <div
                key={doc.id}
                className={`rounded-lg transition-all duration-300 border-l-4 ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-md'
                } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
                style={{ borderLeftColor: priorityStyle.color }}
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
                            <SourceIcon className="w-3 h-3" />
                            {sourceStyle.label}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{
                            backgroundColor: priorityStyle.backgroundColor,
                            color: priorityStyle.color
                          }}>
                            {priorityStyle.label}
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
                    {renderActions(doc)}
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
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Uploaded By</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.uploadedBy}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Required By</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.requiredBy}</p>
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

                    {/* Quick Actions */}
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
                      {(doc.status === 'pending' || doc.status === 'draft') && doc.source !== 'clearing_agent' && (
                        <button
                          onClick={() => handleRequestDocument(doc)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            backgroundColor: colors.warning + '20',
                            color: colors.warning
                          }}
                        >
                          <Send className="w-4 h-4" />
                          Request Document
                        </button>
                      )}
                      {(doc.actions.includes('edit') || doc.actions.includes('upload')) && (
                        <button
                          onClick={() => handleUploadDocument(doc)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            backgroundColor: colors.primaryBg,
                            color: colors.primary
                          }}
                        >
                          <Upload className="w-4 h-4" />
                          {doc.status === 'draft' ? 'Edit' : 'Upload'}
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

                    {/* Document Source Info */}
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {doc.source === 'importer' && 'This document needs to be obtained from the importer. Use the "Request Document" button to request it.'}
                          {doc.source === 'shipping_line' && 'This document needs to be obtained from the shipping line. Use the "Request Document" button to request it.'}
                          {doc.source === 'clearing_agent' && 'This document is created by you as the clearing agent. Use the "Upload/Edit" button to manage it.'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredDocuments.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No documents found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClearingAgentDocuments;