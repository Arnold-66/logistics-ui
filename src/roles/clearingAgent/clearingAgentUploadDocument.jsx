import React, { useState, useContext, useRef } from 'react';
import {
  Upload,
  FileText,
  FileCheck,
  FileSignature,
  CreditCard,
  Shield,
  FileBarChart,
  X,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
  Download,
  Calendar,
  User,
  Building,
  Package,
  Ship,
  Truck,
  ClipboardList,
  Send,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Image,
  FileSpreadsheet,
  FileArchive,
  Globe,
  Anchor,
  Users,
  Link
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ClearingAgentUploadDocument = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [documentCategory, setDocumentCategory] = useState('');
  const [documentSource, setDocumentSource] = useState('clearing_agent');
  const [shipmentId, setShipmentId] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [requiredBy, setRequiredBy] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [comments, setComments] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

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
    cyan: '#06b6d4',
    orange: '#f97316',
    teal: '#14b8a6'
  };

  const isDark = darkMode

  // Document Categories
  const categories = [
    { id: 'importer_docs', label: 'Importer Documents', icon: Building },
    { id: 'shipment_docs', label: 'Shipment Documents', icon: Ship },
    { id: 'clearance_docs', label: 'Clearance Documents', icon: ClipboardList },
    { id: 'payment_docs', label: 'Payment Documents', icon: CreditCard },
    { id: 'certificate_docs', label: 'Certificates', icon: Shield },
  ];

  // Document Types
  const documentTypes = [
    { id: 'invoice', label: 'Invoice', icon: FileText },
    { id: 'contract', label: 'Contract', icon: FileSignature },
    { id: 'shipping', label: 'Shipping Document', icon: Ship },
    { id: 'clearance', label: 'Clearance Form', icon: ClipboardList },
    { id: 'certificate', label: 'Certificate', icon: Shield },
    { id: 'payment', label: 'Payment Document', icon: CreditCard },
    { id: 'list', label: 'List/Inventory', icon: Package },
    { id: 'details', label: 'Details/Registration', icon: Building },
  ];

  // Document Sources
  const sources = [
    { id: 'clearing_agent', label: 'Created by You', icon: User },
    { id: 'importer', label: 'From Importer', icon: Building },
    { id: 'shipping_line', label: 'From Shipping Line', icon: Ship },
  ];

  // Priority Levels
  const priorityLevels = [
    { id: 'critical', label: 'Critical', color: colors.danger },
    { id: 'high', label: 'High', color: colors.warning },
    { id: 'medium', label: 'Medium', color: colors.info },
    { id: 'low', label: 'Low', color: colors.success },
  ];

  // Required By Options
  const requiredByOptions = [
    'URC (Uganda Revenue Authority)',
    'UNBS (Uganda National Bureau of Standards)',
    'Customs',
    'Importer',
    'Shipping Line',
    'Port Authority'
  ];

  // File type icons
  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (fileType?.includes('image')) return <Image className="w-5 h-5 text-blue-500" />;
    if (fileType?.includes('spreadsheet') || fileType?.includes('excel')) return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    if (fileType?.includes('zip') || fileType?.includes('rar')) return <FileArchive className="w-5 h-5 text-orange-500" />;
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                         'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                         'image/jpeg', 'image/png', 'image/jpg', 'application/zip', 'application/x-rar-compressed'];
      return validTypes.includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || 
             file.name.endsWith('.docx') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx') ||
             file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png');
    });

    if (validFiles.length === 0) {
      setUploadError('Please select valid file types (PDF, Word, Excel, Images, ZIP)');
      return;
    }

    setSelectedFiles(prev => [...prev, ...validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString()
    }))]);
    setUploadError(null);
    e.target.value = '';
  };

  // Remove file
  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags(prev => [...prev, tagInput.trim().toLowerCase()]);
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tag) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  // Handle key press for tags
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Handle upload
  const handleUpload = () => {
    // Validate
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one file to upload');
      return;
    }
    if (!documentType) {
      setUploadError('Please select a document type');
      return;
    }
    if (!documentCategory) {
      setUploadError('Please select a document category');
      return;
    }
    if (!shipmentId) {
      setUploadError('Please enter a shipment ID');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadSuccess(true);
          // Reset after 3 seconds
          setTimeout(() => {
            setUploadSuccess(false);
            navigate('/clearing-agent-documents');
          }, 3000);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // Reset form
  const resetForm = () => {
    setSelectedFiles([]);
    setDocumentType('');
    setDocumentCategory('');
    setDocumentSource('clearing_agent');
    setShipmentId('');
    setDocumentNumber('');
    setDescription('');
    setPriority('medium');
    setTags([]);
    setTagInput('');
    setRequiredBy('');
    setExpiryDate('');
    setComments('');
    setIsPublic(true);
    setUploadError(null);
    setShowPreview(false);
  };

  // Get category label
  const getCategoryLabel = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.label : '';
  };

  // Get type label
  const getTypeLabel = (id) => {
    const type = documentTypes.find(t => t.id === id);
    return type ? type.label : '';
  };

  // Get source label
  const getSourceLabel = (id) => {
    const source = sources.find(s => s.id === id);
    return source ? source.label : '';
  };

  // Get priority label
  const getPriorityLabel = (id) => {
    const priority = priorityLevels.find(p => p.id === id);
    return priority ? priority.label : '';
  };

  // Preview Modal
  const PreviewModal = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload Preview
              </h3>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-auto max-h-[70vh]">
            <div className="space-y-4">
              {/* Document Summary */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Document Summary
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{getTypeLabel(documentType)}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Category</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{getCategoryLabel(documentCategory)}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Source</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{getSourceLabel(documentSource)}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Priority</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{getPriorityLabel(priority)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipment ID</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{shipmentId}</p>
                  </div>
                  {documentNumber && (
                    <div className="col-span-2">
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Number</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{documentNumber}</p>
                    </div>
                  )}
                  {description && (
                    <div className="col-span-2">
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Files List */}
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Files ({selectedFiles.length})
                </h4>
                <div className="space-y-2">
                  {selectedFiles.map((file) => (
                    <div key={file.id} className={`flex items-center justify-between p-2 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{file.name}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`flex justify-end gap-2 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setShowPreview(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Close Preview
            </button>
            <button
              onClick={handleUpload}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload Document
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {showPreview && <PreviewModal />}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/clearing-agent-documents')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Documents
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Upload Document
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Upload and manage documents for customs clearance
            </p>
          </div>
        </div>

        {/* Upload Form */}
        <div className={`rounded-lg p-6 transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              {/* File Upload Area */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Upload Files *
                </label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                  } ${selectedFiles.length > 0 ? 'border-primary' : ''}`}
                  style={{ borderColor: selectedFiles.length > 0 ? colors.primary : undefined }}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    const validFiles = files.filter(file => {
                      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                                         'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                         'image/jpeg', 'image/png', 'image/jpg', 'application/zip', 'application/x-rar-compressed'];
                      return validTypes.includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || 
                             file.name.endsWith('.docx') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx') ||
                             file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png');
                    });
                    if (validFiles.length > 0) {
                      setSelectedFiles(prev => [...prev, ...validFiles.map(file => ({
                        id: Date.now() + Math.random(),
                        file,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        uploadDate: new Date().toISOString()
                      }))]);
                    }
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip,.rar"
                  />
                  <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'Click to upload or drag and drop'}
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Supported formats: PDF, Word, Excel, Images, ZIP (Max 10MB each)
                  </p>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {selectedFiles.map((file) => (
                      <div key={file.id} className={`flex items-center justify-between p-3 rounded-lg ${
                        isDark ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          {getFileIcon(file.type)}
                          <div className="min-w-0 flex-1">
                            <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {file.name}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Document Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Document Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {documentTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = documentType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setDocumentType(type.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? 'border-primary text-white'
                            : isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: isSelected ? colors.primary : 'transparent',
                          borderColor: isSelected ? colors.primary : undefined
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="truncate">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Document Category */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Document Category *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = documentCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setDocumentCategory(category.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? 'border-primary text-white'
                            : isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: isSelected ? colors.primary : 'transparent',
                          borderColor: isSelected ? colors.primary : undefined
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="truncate">{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Document Source */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Document Source
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sources.map((source) => {
                    const Icon = source.icon;
                    const isSelected = documentSource === source.id;
                    return (
                      <button
                        key={source.id}
                        type="button"
                        onClick={() => setDocumentSource(source.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? 'border-primary text-white'
                            : isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: isSelected ? colors.primary : 'transparent',
                          borderColor: isSelected ? colors.primary : undefined
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="truncate">{source.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shipment ID & Document Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Shipment ID *
                  </label>
                  <input
                    type="text"
                    value={shipmentId}
                    onChange={(e) => setShipmentId(e.target.value)}
                    placeholder="e.g., SHIP-458"
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Document Number
                  </label>
                  <input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="e.g., INV-2026-00458"
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="2"
                  placeholder="Brief description of the document..."
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              {/* Priority & Required By */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Priority
                  </label>
                  <div className="flex gap-2">
                    {priorityLevels.map((level) => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setPriority(level.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          priority === level.id
                            ? 'text-white'
                            : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        style={{
                          backgroundColor: priority === level.id ? level.color : 'transparent'
                        }}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Required By
                  </label>
                  <select
                    value={requiredBy}
                    onChange={(e) => setRequiredBy(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="">Select authority</option>
                    {requiredByOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              {/* Tags */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Add tag and press Enter"
                    className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span key={tag} className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Comments
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows="3"
                  placeholder="Additional comments or notes about this document..."
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              {/* Public/Private Toggle */}
              <div className="flex items-center gap-3">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="mr-2"
                  />
                  Make document visible to team members
                </label>
              </div>

              {/* Error Message */}
              {uploadError && (
                <div className={`p-3 rounded-lg flex items-center gap-2 ${isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'}`}>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{uploadError}</span>
                  <button
                    type="button"
                    onClick={() => setUploadError(null)}
                    className="ml-auto hover:opacity-70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Uploading...</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${uploadProgress}%`,
                        backgroundColor: colors.primary
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Success Message */}
              {uploadSuccess && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-600'}`}>
                  <CheckCircle className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Document uploaded successfully!</p>
                    <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-500'}`}>
                      Redirecting to documents...
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                <button
                  type="button"
                  onClick={resetForm}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: colors.primaryBg,
                    color: colors.primary
                  }}
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading || uploadSuccess}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  {uploading ? 'Uploading...' : uploadSuccess ? 'Uploaded!' : 'Upload Document'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
              <HelpCircle className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div>
              <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Document Upload Guidelines
              </h4>
              <ul className={`text-xs space-y-1 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <li>• Supported file formats: PDF, Word, Excel, Images, ZIP</li>
                <li>• Maximum file size: 10MB per file</li>
                <li>• You can upload multiple files at once</li>
                <li>• All documents are securely stored and encrypted</li>
                <li>• Required fields are marked with *</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearingAgentUploadDocument;