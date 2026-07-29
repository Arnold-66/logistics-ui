import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Building,
  User,
  Package,
  FileText,
  FileSignature,
  CreditCard,
  Shield,
  FileBarChart,
  ChevronRight,
  ChevronLeft,
  Save,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Download,
  Eye,
  X,
  Calendar,
  MapPin,
  Truck,
  Ship,
  RefreshCw,
  File,
  Image,
  FileSpreadsheet,
  FileArchive,
  FolderOpen,
  Info,
  Users,
  UserCheck,
  Mail,
  Phone,
  Building2,
  Star,
  Briefcase,
  Globe,
  Anchor,
  Box,
  FileCheck,
  ClipboardList,
  Send,
  ExternalLink
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate } from 'react-router-dom';

const NewExport = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [toast, setToast] = useState(null);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [selectedImporter, setSelectedImporter] = useState(null);
  const fileInputRefs = useRef({});

  const [exportData, setExportData] = useState({
    // Step 1: Exporter Details
    exporterDetails: {
      companyName: '',
      businessAddress: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      registrationNumber: '',
      tinNumber: '',
      exportLicense: '',
    },
    // Step 2: Importer Details (From Importer)
    importerDetails: {
      companyName: '',
      businessAddress: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      registrationNumber: '',
      tinNumber: '',
      importLicense: '',
    },
    // Step 3: Export Items
    exportItems: [
      { id: 1, description: '', quantity: '', unit: '', unitPrice: '', totalValue: '', hsCode: '' }
    ],
    // Step 4: Packing List (PL)
    packingList: {
      listNumber: '',
      date: '',
      shipmentId: '',
      items: [],
      totalPackages: '',
      totalWeight: '',
      totalVolume: '',
      uploadedDocuments: []
    },
    // Step 5: Commercial Invoice
    commercialInvoice: {
      invoiceNumber: '',
      invoiceDate: '',
      buyerName: '',
      buyerAddress: '',
      supplierName: '',
      supplierAddress: '',
      terms: '',
      subtotal: '',
      taxes: '',
      totalAmount: '',
      currency: 'UGX',
      uploadedDocuments: []
    },
    // Step 6: Bill of Lading (BL)
    billOfLading: {
      bolNumber: '',
      date: '',
      vessel: '',
      voyageNumber: '',
      portOfLoading: '',
      portOfDischarge: '',
      placeOfDelivery: '',
      containerNumber: '',
      sealNumber: '',
      uploadedDocuments: []
    },
    // Step 7: Sales Contract
    salesContract: {
      contractNumber: '',
      contractDate: '',
      buyerName: '',
      sellerName: '',
      terms: '',
      value: '',
      deliveryTerms: '',
      paymentTerms: '',
      uploadedDocuments: []
    },
    // Step 8: Proof of Payments
    proofOfPayments: [
      { id: 1, paymentDate: '', amount: '', method: '', reference: '', uploadedDocuments: [] }
    ],
    // Step 9: UNBS CoC (From Importer)
    unbsCoc: {
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      status: 'pending',
      productDescription: '',
      uploadedDocuments: []
    },
    // Step 10: UNBS PVoC (From Importer)
    unbsPvoc: {
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      status: 'pending',
      productDescription: '',
      uploadedDocuments: []
    },
    // Step 11: Certificate of Origin (CO)
    certificateOfOrigin: {
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      issuingAuthority: '',
      countryOfOrigin: '',
      productDescription: '',
      uploadedDocuments: []
    },
    // Metadata
    exportNumber: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    progress: 0,
    currentStep: 0,
  });

  // Sample importers data
  const importers = [
    {
      id: 'IMP-001',
      name: 'ImportFlow Ltd',
      address: 'Plot 45, Industrial Area, Kampala, Uganda',
      contactPerson: 'John Doe',
      email: 'john@importflow.com',
      phone: '+256 712 345 678',
      tin: '1234567890',
      registration: 'UG-2020-1234',
      importLicense: 'IMP-2020-456',
      country: 'Uganda'
    },
    {
      id: 'IMP-002',
      name: 'Global Importers Inc',
      address: '123 Trade Center, Nairobi, Kenya',
      contactPerson: 'Sarah Kamau',
      email: 'sarah@globalimporters.com',
      phone: '+254 722 345 678',
      tin: '9876543210',
      registration: 'KE-2019-5678',
      importLicense: 'IMP-2019-789',
      country: 'Kenya'
    },
    {
      id: 'IMP-003',
      name: 'East Africa Trading Co',
      address: '45, Kigali, Rwanda',
      contactPerson: 'Peter Habimana',
      email: 'peter@eastafricatrading.com',
      phone: '+250 788 345 678',
      tin: '4567890123',
      registration: 'RW-2021-9012',
      importLicense: 'IMP-2021-345',
      country: 'Rwanda'
    }
  ];

  // Define documentation steps
  const steps = [
    {
      id: 0,
      title: 'Exporter Details',
      icon: Building,
      description: 'Your company details for export documentation',
      required: true,
      hasUpload: false,
      source: 'exporter'
    },
    {
      id: 1,
      title: 'Importer Details',
      icon: Users,
      description: 'Information about the importing company (from importer)',
      required: true,
      hasUpload: false,
      source: 'importer'
    },
    {
      id: 2,
      title: 'Export Items List',
      icon: Package,
      description: 'Items & Quantities being exported',
      required: true,
      hasUpload: false,
      source: 'exporter'
    },
    {
      id: 3,
      title: 'Packing List',
      icon: Box,
      description: 'Detailed packing information for the shipment',
      required: true,
      hasUpload: true,
      source: 'exporter'
    },
    {
      id: 4,
      title: 'Commercial Invoice',
      icon: FileText,
      description: 'Commercial invoice for the export shipment',
      required: true,
      hasUpload: true,
      source: 'exporter'
    },
    {
      id: 5,
      title: 'Bill of Lading',
      icon: Ship,
      description: 'Shipping document from the carrier',
      required: true,
      hasUpload: true,
      source: 'carrier'
    },
    {
      id: 6,
      title: 'Sales Contract',
      icon: FileSignature,
      description: 'Official sales agreement between parties',
      required: true,
      hasUpload: true,
      source: 'exporter'
    },
    {
      id: 7,
      title: 'Proof of Payments',
      icon: CreditCard,
      description: 'Payment confirmation and receipts',
      required: true,
      hasUpload: true,
      source: 'importer'
    },
    {
      id: 8,
      title: 'UNBS Certificate of Conformity',
      icon: Shield,
      description: 'Product quality certification (from importer)',
      required: true,
      hasUpload: true,
      source: 'importer'
    },
    {
      id: 9,
      title: 'UNBS PVoC Certificate',
      icon: Shield,
      description: 'Pre-export verification (from importer)',
      required: true,
      hasUpload: true,
      source: 'importer'
    },
    {
      id: 10,
      title: 'Certificate of Origin',
      icon: Globe,
      description: 'Certificate of origin for the goods',
      required: true,
      hasUpload: true,
      source: 'exporter'
    }
  ];

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
    orange: '#f97316',
    teal: '#14b8a6',
    indigo: '#6366f1',
  };

  const isDark = darkMode

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('exportDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setExportData(parsed);
        // Calculate progress
        const completedSteps = steps.filter(step => {
          const stepKey = getStepKey(step.id);
          return isStepComplete(parsed, stepKey);
        }).length;
        setExportData(prev => ({
          ...prev,
          progress: Math.round((completedSteps / steps.length) * 100)
        }));
        // Restore current step if saved
        if (parsed.currentStep !== undefined) {
          setCurrentStep(parsed.currentStep);
        }
        // Restore selected importer if saved
        if (parsed.importerDetails?.companyName) {
          const importer = importers.find(i => i.name === parsed.importerDetails.companyName);
          if (importer) setSelectedImporter(importer);
        }
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  const getStepKey = (stepId) => {
    const keys = [
      'exporterDetails',
      'importerDetails',
      'exportItems',
      'packingList',
      'commercialInvoice',
      'billOfLading',
      'salesContract',
      'proofOfPayments',
      'unbsCoc',
      'unbsPvoc',
      'certificateOfOrigin'
    ];
    return keys[stepId] || '';
  };

  const isStepComplete = (data, stepKey) => {
    if (!data || !data[stepKey]) return false;
    const stepData = data[stepKey];
    
    if (Array.isArray(stepData)) {
      return stepData.length > 0 && stepData.some(item => {
        return Object.values(item).some(val => val && val !== '');
      });
    } else if (typeof stepData === 'object') {
      return Object.values(stepData).some(val => val && val !== '');
    }
    return false;
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveProgress = () => {
    setIsSaving(true);
    setTimeout(() => {
      const dataToSave = {
        ...exportData,
        updatedAt: new Date().toISOString(),
        currentStep: currentStep
      };
      localStorage.setItem('exportDraft', JSON.stringify(dataToSave));
      setIsSaving(false);
      setSavedSuccess(true);
      showToast(`Progress saved! Step ${currentStep + 1}: ${steps[currentStep].title}`, 'success');
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 500);
  };

  const updateExportData = (stepKey, field, value) => {
    setExportData(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [field]: value
      }
    }));
  };

  const updateArrayItem = (stepKey, index, field, value) => {
    setExportData(prev => {
      const updatedArray = [...prev[stepKey]];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return {
        ...prev,
        [stepKey]: updatedArray
      };
    });
  };

  const addArrayItem = (stepKey, template) => {
    setExportData(prev => ({
      ...prev,
      [stepKey]: [...prev[stepKey], { ...template, id: Date.now() }]
    }));
  };

  const removeArrayItem = (stepKey, index) => {
    if (exportData[stepKey].length <= 1) return;
    setExportData(prev => ({
      ...prev,
      [stepKey]: prev[stepKey].filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (stepKey, file, paymentIndex = null) => {
    if (!file) return;

    setUploadingFile(true);
    
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newDocument = {
          id: Date.now(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString(),
          data: reader.result,
          fileType: file.type.split('/')[0]
        };

        if (stepKey === 'proofOfPayments' && paymentIndex !== null) {
          setExportData(prev => {
            const updatedPayments = [...prev.proofOfPayments];
            if (!updatedPayments[paymentIndex].uploadedDocuments) {
              updatedPayments[paymentIndex].uploadedDocuments = [];
            }
            updatedPayments[paymentIndex].uploadedDocuments.push(newDocument);
            return {
              ...prev,
              proofOfPayments: updatedPayments
            };
          });
        } else {
          setExportData(prev => {
            const updatedStep = {
              ...prev[stepKey],
              uploadedDocuments: [...(prev[stepKey].uploadedDocuments || []), newDocument]
            };
            return {
              ...prev,
              [stepKey]: updatedStep
            };
          });
        }
        
        setUploadingFile(false);
        showToast(`File "${file.name}" uploaded successfully!`, 'success');
        
        setTimeout(() => {
          const dataToSave = {
            ...exportData,
            updatedAt: new Date().toISOString(),
            currentStep: currentStep
          };
          localStorage.setItem('exportDraft', JSON.stringify(dataToSave));
        }, 300);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const removeDocument = (stepKey, docId, paymentIndex = null) => {
    if (stepKey === 'proofOfPayments' && paymentIndex !== null) {
      setExportData(prev => {
        const updatedPayments = [...prev.proofOfPayments];
        updatedPayments[paymentIndex].uploadedDocuments = updatedPayments[paymentIndex].uploadedDocuments.filter(
          doc => doc.id !== docId
        );
        return {
          ...prev,
          proofOfPayments: updatedPayments
        };
      });
    } else {
      setExportData(prev => {
        const updatedStep = {
          ...prev[stepKey],
          uploadedDocuments: prev[stepKey].uploadedDocuments.filter(doc => doc.id !== docId)
        };
        return {
          ...prev,
          [stepKey]: updatedStep
        };
      });
    }
    showToast('Document removed successfully', 'info');
  };

  const viewDocument = (doc) => {
    setViewingDocument(doc);
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'application/pdf') return <FileText className="w-5 h-5 text-red-500" />;
    if (fileType.includes('image')) return <Image className="w-5 h-5 text-blue-500" />;
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    if (fileType.includes('zip') || fileType.includes('rar')) return <FileArchive className="w-5 h-5 text-orange-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Document Upload Component
  const DocumentUpload = ({ stepKey, documents = [], onUpload, paymentIndex = null, source = 'exporter' }) => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        onUpload(file, paymentIndex);
      }
      e.target.value = '';
    };

    const sourceColors = {
      exporter: { bg: colors.primaryBg, color: colors.primary, label: 'You need to upload this' },
      importer: { bg: colors.warning + '20', color: colors.warning, label: 'Request from Importer' },
      carrier: { bg: colors.info + '20', color: colors.info, label: 'Request from Carrier' }
    };

    const sourceInfo = sourceColors[source] || sourceColors.exporter;

    return (
      <div className={`mt-4 p-4 rounded-lg border-2 border-dashed ${
        isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
      } transition-all duration-200`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: sourceInfo.bg }}>
              <Upload className="w-5 h-5" style={{ color: sourceInfo.color }} />
            </div>
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload Documents
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {documents ? documents.length : 0} document(s) uploaded
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full`} style={{
              backgroundColor: sourceInfo.bg,
              color: sourceInfo.color
            }}>
              {sourceInfo.label}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingFile}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
            >
              {uploadingFile ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload File
                </>
              )}
            </button>
          </div>
        </div>

        {documents && documents.length > 0 && (
          <div className="mt-3 space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className={`flex items-center justify-between p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              } hover:shadow-md transition-all duration-200`}>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {getFileIcon(doc.type)}
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {doc.name}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => viewDocument(doc)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="View Document"
                  >
                    <Eye className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    onClick={() => removeDocument(stepKey, doc.id, paymentIndex)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Remove Document"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      saveProgress();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const completedData = {
      ...exportData,
      status: 'complete',
      exportNumber: `EXP-${Date.now().toString().slice(-8)}`,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('exportDraft', JSON.stringify(completedData));
    setExportData(completedData);
    showToast('Export documentation completed successfully! 🎉', 'success');
    setTimeout(() => navigate('/exporter-dashboard'), 1500);
  };

  const Toast = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                  type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
                  <Info className="w-5 h-5" />;

    return (
      <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white ${bgColor} animate-slide-in`}>
        {icon}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const DocumentViewer = ({ doc, onClose }) => {
    if (!doc) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3 min-w-0">
              {getFileIcon(doc.type)}
              <div className="min-w-0">
                <h3 className={`text-lg font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {doc.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadDate).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 overflow-auto max-h-[70vh]">
            {doc.type.startsWith('image/') ? (
              <img
                src={doc.data}
                alt={doc.name}
                className="max-w-full max-h-[60vh] object-contain mx-auto rounded-lg"
              />
            ) : doc.type === 'application/pdf' ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-red-500" />
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  PDF Preview: {doc.name}
                </p>
                <div className="mt-4 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                  <p className="text-sm text-gray-500">Click download to view the full PDF document</p>
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = doc.data;
                      link.download = doc.name;
                      link.click();
                    }}
                    className="mt-3 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <File className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Preview not available for this file type
                </p>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = doc.data;
                    link.download = doc.name;
                    link.click();
                  }}
                  className="mt-4 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Download File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const getSourceBadge = (source) => {
    const sourceMap = {
      'exporter': { bg: colors.primaryBg, color: colors.primary, label: 'You upload this', icon: User },
      'importer': { bg: colors.warning + '20', color: colors.warning, label: 'From Importer', icon: Building },
      'carrier': { bg: colors.info + '20', color: colors.info, label: 'From Carrier', icon: Ship }
    };
    return sourceMap[source] || sourceMap['exporter'];
  };

  // Render step content
  const renderStepContent = () => {
    const step = steps[currentStep];
    const stepKey = getStepKey(currentStep);
    const sourceInfo = getSourceBadge(step.source);
    const SourceIcon = sourceInfo.icon;

    return (
      <div className="space-y-6">
        {/* Source Indicator */}
        <div className={`flex items-center gap-2 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <SourceIcon className="w-4 h-4" style={{ color: sourceInfo.color }} />
          <span className={`text-sm font-medium`} style={{ color: sourceInfo.color }}>
            {sourceInfo.label}
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            • This document {step.source === 'exporter' ? 'needs to be uploaded by you' : step.source === 'importer' ? 'needs to be obtained from the importer' : 'needs to be obtained from the carrier'}
          </span>
        </div>

        {(() => {
          switch (currentStep) {
            case 0: // Exporter Details
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={exportData.exporterDetails.companyName}
                        onChange={(e) => updateExportData('exporterDetails', 'companyName', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Business Address *
                      </label>
                      <input
                        type="text"
                        value={exportData.exporterDetails.businessAddress}
                        onChange={(e) => updateExportData('exporterDetails', 'businessAddress', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        value={exportData.exporterDetails.contactPerson}
                        onChange={(e) => updateExportData('exporterDetails', 'contactPerson', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        value={exportData.exporterDetails.contactEmail}
                        onChange={(e) => updateExportData('exporterDetails', 'contactEmail', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={exportData.exporterDetails.contactPhone}
                        onChange={(e) => updateExportData('exporterDetails', 'contactPhone', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        TIN Number
                      </label>
                      <input
                        type="text"
                        value={exportData.exporterDetails.tinNumber}
                        onChange={(e) => updateExportData('exporterDetails', 'tinNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Export License Number
                      </label>
                      <input
                        type="text"
                        value={exportData.exporterDetails.exportLicense}
                        onChange={(e) => updateExportData('exporterDetails', 'exportLicense', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                </div>
              );

            case 1: // Importer Details
              return (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4" style={{ color: colors.warning }} />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Select Importer
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Choose from existing importers or enter manually
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {importers.map((importer) => (
                        <div
                          key={importer.id}
                          onClick={() => {
                            setSelectedImporter(importer);
                            setExportData(prev => ({
                              ...prev,
                              importerDetails: {
                                companyName: importer.name,
                                businessAddress: importer.address,
                                contactPerson: importer.contactPerson,
                                contactEmail: importer.email,
                                contactPhone: importer.phone,
                                registrationNumber: importer.registration,
                                tinNumber: importer.tin,
                                importLicense: importer.importLicense
                              }
                            }));
                          }}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            selectedImporter?.id === importer.id
                              ? 'border-primary bg-primary/5'
                              : isDark
                              ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {importer.name}
                              </h4>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {importer.country} • {importer.contactPerson}
                              </p>
                            </div>
                            {selectedImporter?.id === importer.id && (
                              <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Importer Company Name *
                      </label>
                      <input
                        type="text"
                        value={exportData.importerDetails.companyName}
                        onChange={(e) => updateExportData('importerDetails', 'companyName', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Importer Address *
                      </label>
                      <input
                        type="text"
                        value={exportData.importerDetails.businessAddress}
                        onChange={(e) => updateExportData('importerDetails', 'businessAddress', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        value={exportData.importerDetails.contactPerson}
                        onChange={(e) => updateExportData('importerDetails', 'contactPerson', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        value={exportData.importerDetails.contactEmail}
                        onChange={(e) => updateExportData('importerDetails', 'contactEmail', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={exportData.importerDetails.contactPhone}
                        onChange={(e) => updateExportData('importerDetails', 'contactPhone', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        TIN Number
                      </label>
                      <input
                        type="text"
                        value={exportData.importerDetails.tinNumber}
                        onChange={(e) => updateExportData('importerDetails', 'tinNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Import License Number
                      </label>
                      <input
                        type="text"
                        value={exportData.importerDetails.importLicense}
                        onChange={(e) => updateExportData('importerDetails', 'importLicense', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                </div>
              );

            case 2: // Export Items List
              return (
                <div className="space-y-4">
                  {exportData.exportItems.map((item, index) => (
                    <div key={item.id} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Item #{index + 1}
                        </h4>
                        <button
                          onClick={() => removeArrayItem('exportItems', index)}
                          className="p-1 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Item Description *
                          </label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateArrayItem('exportItems', index, 'description', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Quantity *
                          </label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateArrayItem('exportItems', index, 'quantity', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Unit
                          </label>
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => updateArrayItem('exportItems', index, 'unit', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Unit Price
                          </label>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateArrayItem('exportItems', index, 'unitPrice', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Total Value
                          </label>
                          <input
                            type="number"
                            value={item.totalValue}
                            onChange={(e) => updateArrayItem('exportItems', index, 'totalValue', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            HS Code
                          </label>
                          <input
                            type="text"
                            value={item.hsCode}
                            onChange={(e) => updateArrayItem('exportItems', index, 'hsCode', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('exportItems', { description: '', quantity: '', unit: '', unitPrice: '', totalValue: '', hsCode: '' })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: colors.primaryBg,
                      color: colors.primary
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
              );

            case 3: // Packing List
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Packing List Number *
                      </label>
                      <input
                        type="text"
                        value={exportData.packingList.listNumber}
                        onChange={(e) => updateExportData('packingList', 'listNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="PL-2026-001"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Date *
                      </label>
                      <input
                        type="date"
                        value={exportData.packingList.date}
                        onChange={(e) => updateExportData('packingList', 'date', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Shipment ID *
                      </label>
                      <input
                        type="text"
                        value={exportData.packingList.shipmentId}
                        onChange={(e) => updateExportData('packingList', 'shipmentId', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="SHIP-001"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Total Packages
                      </label>
                      <input
                        type="number"
                        value={exportData.packingList.totalPackages}
                        onChange={(e) => updateExportData('packingList', 'totalPackages', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Total Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={exportData.packingList.totalWeight}
                        onChange={(e) => updateExportData('packingList', 'totalWeight', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Total Volume (CBM)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={exportData.packingList.totalVolume}
                        onChange={(e) => updateExportData('packingList', 'totalVolume', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                  {step.hasUpload && (
                    <DocumentUpload 
                      stepKey={stepKey} 
                      documents={exportData[stepKey]?.uploadedDocuments || []}
                      onUpload={(file) => handleFileUpload(stepKey, file)}
                      source={step.source}
                    />
                  )}
                </div>
              );

            case 4: // Commercial Invoice
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Invoice Number *
                      </label>
                      <input
                        type="text"
                        value={exportData.commercialInvoice.invoiceNumber}
                        onChange={(e) => updateExportData('commercialInvoice', 'invoiceNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Invoice Date *
                      </label>
                      <input
                        type="date"
                        value={exportData.commercialInvoice.invoiceDate}
                        onChange={(e) => updateExportData('commercialInvoice', 'invoiceDate', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Buyer Name *
                      </label>
                      <input
                        type="text"
                        value={exportData.commercialInvoice.buyerName}
                        onChange={(e) => updateExportData('commercialInvoice', 'buyerName', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Buyer Address
                      </label>
                      <input
                        type="text"
                        value={exportData.commercialInvoice.buyerAddress}
                        onChange={(e) => updateExportData('commercialInvoice', 'buyerAddress', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Supplier Name *
                      </label>
                      <input
                        type="text"
                        value={exportData.commercialInvoice.supplierName}
                        onChange={(e) => updateExportData('commercialInvoice', 'supplierName', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Supplier Address
                      </label>
                      <input
                        type="text"
                        value={exportData.commercialInvoice.supplierAddress}
                        onChange={(e) => updateExportData('commercialInvoice', 'supplierAddress', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Subtotal
                      </label>
                      <input
                        type="number"
                        value={exportData.commercialInvoice.subtotal}
                        onChange={(e) => updateExportData('commercialInvoice', 'subtotal', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Total Amount *
                      </label>
                      <input
                        type="number"
                        value={exportData.commercialInvoice.totalAmount}
                        onChange={(e) => updateExportData('commercialInvoice', 'totalAmount', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Currency
                      </label>
                      <select
                        value={exportData.commercialInvoice.currency}
                        onChange={(e) => updateExportData('commercialInvoice', 'currency', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      >
                        <option value="UGX">UGX</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>
                  {step.hasUpload && (
                    <DocumentUpload 
                      stepKey={stepKey} 
                      documents={exportData[stepKey]?.uploadedDocuments || []}
                      onUpload={(file) => handleFileUpload(stepKey, file)}
                      source={step.source}
                    />
                  )}
                </div>
              );

            case 5: // Bill of Lading
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        BOL Number *
                      </label>
                      <input
                        type="text"
                        value={exportData.billOfLading.bolNumber}
                        onChange={(e) => updateExportData('billOfLading', 'bolNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Date *
                      </label>
                      <input
                        type="date"
                        value={exportData.billOfLading.date}
                        onChange={(e) => updateExportData('billOfLading', 'date', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Vessel Name *
                      </label>
                      <input
                        type="text"
                        value={exportData.billOfLading.vessel}
                        onChange={(e) => updateExportData('billOfLading', 'vessel', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Voyage Number *
                      </label>
                      <input
                        type="text"
                        value={exportData.billOfLading.voyageNumber}
                        onChange={(e) => updateExportData('billOfLading', 'voyageNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Port of Loading *
                      </label>
                      <input
                        type="text"
                        value={exportData.billOfLading.portOfLoading}
                        onChange={(e) => updateExportData('billOfLading', 'portOfLoading', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Port of Discharge *
                      </label>
                      <input
                        type="text"
                        value={exportData.billOfLading.portOfDischarge}
                        onChange={(e) => updateExportData('billOfLading', 'portOfDischarge', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Place of Delivery
                      </label>
                      <input
                        type="text"
                        value={exportData.billOfLading.placeOfDelivery}
                        onChange={(e) => updateExportData('billOfLading', 'placeOfDelivery', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Container Number *
                      </label>
                      <input
                        type="text"
                        value={exportData.billOfLading.containerNumber}
                        onChange={(e) => updateExportData('billOfLading', 'containerNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Seal Number
                      </label>
                      <input
                        type="text"
                        value={exportData.billOfLading.sealNumber}
                        onChange={(e) => updateExportData('billOfLading', 'sealNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                  {step.hasUpload && (
                    <DocumentUpload 
                      stepKey={stepKey} 
                      documents={exportData[stepKey]?.uploadedDocuments || []}
                      onUpload={(file) => handleFileUpload(stepKey, file)}
                      source={step.source}
                    />
                  )}
                </div>
              );

            case 6: // Sales Contract
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contract Number *
                      </label>
                      <input
                        type="text"
                        value={exportData.salesContract.contractNumber}
                        onChange={(e) => updateExportData('salesContract', 'contractNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contract Date *
                      </label>
                      <input
                        type="date"
                        value={exportData.salesContract.contractDate}
                        onChange={(e) => updateExportData('salesContract', 'contractDate', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Buyer Name *
                      </label>
                      <input
                        type="text"
                        value={exportData.salesContract.buyerName}
                        onChange={(e) => updateExportData('salesContract', 'buyerName', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Seller Name *
                      </label>
                      <input
                        type="text"
                        value={exportData.salesContract.sellerName}
                        onChange={(e) => updateExportData('salesContract', 'sellerName', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Contract Value *
                      </label>
                      <input
                        type="number"
                        value={exportData.salesContract.value}
                        onChange={(e) => updateExportData('salesContract', 'value', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Delivery Terms
                      </label>
                      <input
                        type="text"
                        value={exportData.salesContract.deliveryTerms}
                        onChange={(e) => updateExportData('salesContract', 'deliveryTerms', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="FOB, CIF, etc."
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Payment Terms
                      </label>
                      <input
                        type="text"
                        value={exportData.salesContract.paymentTerms}
                        onChange={(e) => updateExportData('salesContract', 'paymentTerms', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="30 days net, LC, etc."
                      />
                    </div>
                  </div>
                  {step.hasUpload && (
                    <DocumentUpload 
                      stepKey={stepKey} 
                      documents={exportData[stepKey]?.uploadedDocuments || []}
                      onUpload={(file) => handleFileUpload(stepKey, file)}
                      source={step.source}
                    />
                  )}
                </div>
              );

            case 7: // Proof of Payments
              return (
                <div className="space-y-4">
                  {exportData.proofOfPayments.map((payment, index) => (
                    <div key={payment.id} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Payment #{index + 1}
                        </h4>
                        <button
                          onClick={() => removeArrayItem('proofOfPayments', index)}
                          className="p-1 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Payment Date *
                          </label>
                          <input
                            type="date"
                            value={payment.paymentDate}
                            onChange={(e) => updateArrayItem('proofOfPayments', index, 'paymentDate', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Amount *
                          </label>
                          <input
                            type="number"
                            value={payment.amount}
                            onChange={(e) => updateArrayItem('proofOfPayments', index, 'amount', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Payment Method
                          </label>
                          <select
                            value={payment.method}
                            onChange={(e) => updateArrayItem('proofOfPayments', index, 'method', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          >
                            <option value="">Select method</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="wire_transfer">Wire Transfer</option>
                            <option value="letter_of_credit">Letter of Credit</option>
                            <option value="cash">Cash</option>
                          </select>
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Reference Number
                          </label>
                          <input
                            type="text"
                            value={payment.reference}
                            onChange={(e) => updateArrayItem('proofOfPayments', index, 'reference', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                      </div>
                      {step.hasUpload && (
                        <DocumentUpload 
                          stepKey={stepKey} 
                          documents={payment.uploadedDocuments || []}
                          onUpload={(file) => handleFileUpload(stepKey, file, index)}
                          paymentIndex={index}
                          source={step.source}
                        />
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem('proofOfPayments', { paymentDate: '', amount: '', method: '', reference: '', uploadedDocuments: [] })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: colors.primaryBg,
                      color: colors.primary
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Payment
                  </button>
                </div>
              );

            case 8: // UNBS CoC (From Importer)
              return (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4" style={{ color: colors.warning }} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        This document needs to be obtained from the importer
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Certificate Number *
                        </label>
                        <input
                          type="text"
                          value={exportData.unbsCoc.certificateNumber}
                          onChange={(e) => updateExportData('unbsCoc', 'certificateNumber', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Issue Date *
                        </label>
                        <input
                          type="date"
                          value={exportData.unbsCoc.issueDate}
                          onChange={(e) => updateExportData('unbsCoc', 'issueDate', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Expiry Date *
                        </label>
                        <input
                          type="date"
                          value={exportData.unbsCoc.expiryDate}
                          onChange={(e) => updateExportData('unbsCoc', 'expiryDate', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Status
                        </label>
                        <select
                          value={exportData.unbsCoc.status}
                          onChange={(e) => updateExportData('unbsCoc', 'status', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Product Description
                      </label>
                      <textarea
                        value={exportData.unbsCoc.productDescription}
                        onChange={(e) => updateExportData('unbsCoc', 'productDescription', e.target.value)}
                        rows="3"
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                  {step.hasUpload && (
                    <DocumentUpload 
                      stepKey={stepKey} 
                      documents={exportData[stepKey]?.uploadedDocuments || []}
                      onUpload={(file) => handleFileUpload(stepKey, file)}
                      source={step.source}
                    />
                  )}
                </div>
              );

            case 9: // UNBS PVoC (From Importer)
              return (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-4 h-4" style={{ color: colors.warning }} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        This document needs to be obtained from the importer
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Certificate Number *
                        </label>
                        <input
                          type="text"
                          value={exportData.unbsPvoc.certificateNumber}
                          onChange={(e) => updateExportData('unbsPvoc', 'certificateNumber', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Issue Date *
                        </label>
                        <input
                          type="date"
                          value={exportData.unbsPvoc.issueDate}
                          onChange={(e) => updateExportData('unbsPvoc', 'issueDate', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Expiry Date *
                        </label>
                        <input
                          type="date"
                          value={exportData.unbsPvoc.expiryDate}
                          onChange={(e) => updateExportData('unbsPvoc', 'expiryDate', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Status
                        </label>
                        <select
                          value={exportData.unbsPvoc.status}
                          onChange={(e) => updateExportData('unbsPvoc', 'status', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Product Description
                      </label>
                      <textarea
                        value={exportData.unbsPvoc.productDescription}
                        onChange={(e) => updateExportData('unbsPvoc', 'productDescription', e.target.value)}
                        rows="3"
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                  {step.hasUpload && (
                    <DocumentUpload 
                      stepKey={stepKey} 
                      documents={exportData[stepKey]?.uploadedDocuments || []}
                      onUpload={(file) => handleFileUpload(stepKey, file)}
                      source={step.source}
                    />
                  )}
                </div>
              );

            case 10: // Certificate of Origin
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Certificate Number *
                      </label>
                      <input
                        type="text"
                        value={exportData.certificateOfOrigin.certificateNumber}
                        onChange={(e) => updateExportData('certificateOfOrigin', 'certificateNumber', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Issue Date *
                      </label>
                      <input
                        type="date"
                        value={exportData.certificateOfOrigin.issueDate}
                        onChange={(e) => updateExportData('certificateOfOrigin', 'issueDate', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Expiry Date *
                      </label>
                      <input
                        type="date"
                        value={exportData.certificateOfOrigin.expiryDate}
                        onChange={(e) => updateExportData('certificateOfOrigin', 'expiryDate', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Issuing Authority *
                      </label>
                      <input
                        type="text"
                        value={exportData.certificateOfOrigin.issuingAuthority}
                        onChange={(e) => updateExportData('certificateOfOrigin', 'issuingAuthority', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="e.g., Uganda Chamber of Commerce"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Country of Origin *
                      </label>
                      <input
                        type="text"
                        value={exportData.certificateOfOrigin.countryOfOrigin}
                        onChange={(e) => updateExportData('certificateOfOrigin', 'countryOfOrigin', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="e.g., Uganda"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Product Description
                    </label>
                    <textarea
                      value={exportData.certificateOfOrigin.productDescription}
                      onChange={(e) => updateExportData('certificateOfOrigin', 'productDescription', e.target.value)}
                      rows="3"
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  {step.hasUpload && (
                    <DocumentUpload 
                      stepKey={stepKey} 
                      documents={exportData[stepKey]?.uploadedDocuments || []}
                      onUpload={(file) => handleFileUpload(stepKey, file)}
                      source={step.source}
                    />
                  )}
                </div>
              );

            default:
              return null;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}

      {viewingDocument && (
        <DocumentViewer 
          doc={viewingDocument} 
          onClose={() => setViewingDocument(null)} 
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/exporter-dashboard')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              New Export Documentation
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Complete all required documentation for your export
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={saveProgress}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50"
              style={{
                backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                color: colors.primary
              }}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Progress
                </>
              )}
            </button>
            {savedSuccess && (
              <span className="text-sm text-green-500 animate-fade-in">✓ Saved!</span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Overall Progress
            </span>
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {exportData.progress}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${exportData.progress}%`,
                backgroundColor: colors.primary
              }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-11 gap-1 md:gap-2 mb-6">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = isStepComplete(exportData, getStepKey(index));
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => {
                  setCurrentStep(index);
                  saveProgress();
                }}
                className={`flex flex-col items-center p-2 md:p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-md'
                    : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: isActive ? colors.primary : 'transparent'
                }}
              >
                <div className="relative">
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  {isComplete && !isActive && (
                    <CheckCircle className="absolute -top-1 -right-2 w-3 h-3 text-green-500" />
                  )}
                </div>
                <span className="text-[6px] md:text-[8px] lg:text-xs text-center mt-1 leading-tight">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            {React.createElement(steps[currentStep].icon, {
              className: "w-5 h-5",
              style: { color: colors.primary }
            })}
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {steps[currentStep].title}
            </h2>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Step {currentStep + 1} of {steps.length}
            </span>
            {steps[currentStep].required && (
              <span className="text-xs text-red-500 ml-2">* Required</span>
            )}
          </div>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {steps[currentStep].description}
          </p>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-6 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={saveProgress}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Save className="w-4 h-4" />
                Save
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Complete Export
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExport;