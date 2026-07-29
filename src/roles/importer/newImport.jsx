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
  Briefcase
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate } from 'react-router-dom';

const NewImport = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [toast, setToast] = useState(null);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const fileInputRefs = useRef({});

  const [importData, setImportData] = useState({
    // Step 1: Importer Details
    importerDetails: {
      companyName: '',
      businessAddress: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      registrationNumber: '',
      tinNumber: '',
    },
    // Step 2: Import Items
    importItems: [
      { id: 1, description: '', quantity: '', unit: '', unitPrice: '', totalValue: '', hsCode: '' }
    ],
    // Step 3: Commercial Invoice
    commercialInvoice: {
      invoiceNumber: '',
      invoiceDate: '',
      supplierName: '',
      supplierAddress: '',
      terms: '',
      items: [],
      subtotal: '',
      taxes: '',
      totalAmount: '',
      uploadedDocuments: []
    },
    // Step 4: Sales Contract
    salesContract: {
      contractNumber: '',
      contractDate: '',
      buyerName: '',
      sellerName: '',
      terms: '',
      value: '',
      deliveryTerms: '',
      uploadedDocuments: []
    },
    // Step 5: Proof of Payments
    proofOfPayments: [
      { id: 1, paymentDate: '', amount: '', method: '', reference: '', receipt: '', uploadedDocuments: [] }
    ],
    // Step 6: UNBS CoC
    unbsCoc: {
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      status: 'pending',
      productDescription: '',
      uploadedDocuments: []
    },
    // Step 7: UNBS PVoC
    unbsPvoc: {
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      status: 'pending',
      productDescription: '',
      uploadedDocuments: []
    },
    // Step 8: Freight Invoice
    freightInvoice: {
      invoiceNumber: '',
      invoiceDate: '',
      carrierName: '',
      origin: '',
      destination: '',
      freightCharges: '',
      insuranceCharges: '',
      totalFreight: '',
      uploadedDocuments: []
    },
    // Step 9: Clearing Agent Assignment (NEW)
    clearingAgent: {
      assignedAgentId: '',
      agentName: '',
      agentCompany: '',
      agentEmail: '',
      agentPhone: '',
      assignmentDate: '',
      serviceType: '',
      specialInstructions: '',
      status: 'pending',
      uploadedDocuments: []
    },
    // Metadata
    importNumber: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    progress: 0,
    currentStep: 0,
  });

  // Sample clearing agents data
  const clearingAgents = [
    {
      id: 'CA-001',
      name: 'John Mukasa',
      company: 'Mukasa Clearing & Forwarding Ltd',
      email: 'john@mukasaclearing.com',
      phone: '+256 700 123 456',
      rating: 4.8,
      experience: '15 years',
      specialization: ['Electronics', 'Machinery', 'Vehicles'],
      availability: 'Available',
      location: 'Kampala, Uganda'
    },
    {
      id: 'CA-002',
      name: 'Sarah Nantongo',
      company: 'Nantongo Freight Solutions',
      email: 'sarah@nantongofreight.com',
      phone: '+256 701 234 567',
      rating: 4.9,
      experience: '12 years',
      specialization: ['Textiles', 'Electronics', 'Food Products'],
      availability: 'Available',
      location: 'Kampala, Uganda'
    },
    {
      id: 'CA-003',
      name: 'Robert Ochieng',
      company: 'Ochieng Customs Services',
      email: 'robert@ochiengcustoms.com',
      phone: '+256 702 345 678',
      rating: 4.7,
      experience: '10 years',
      specialization: ['Vehicles', 'Construction', 'Electronics'],
      availability: 'Busy',
      location: 'Mombasa, Kenya'
    },
    {
      id: 'CA-004',
      name: 'Grace Akello',
      company: 'Akello Trade Logistics',
      email: 'grace@akellologistics.com',
      phone: '+256 703 456 789',
      rating: 4.6,
      experience: '8 years',
      specialization: ['Medical Supplies', 'Electronics', 'Food Products'],
      availability: 'Available',
      location: 'Kampala, Uganda'
    },
    {
      id: 'CA-005',
      name: 'Peter Kato',
      company: 'Kato & Sons Clearing',
      email: 'peter@katoclearing.com',
      phone: '+256 704 567 890',
      rating: 4.5,
      experience: '20 years',
      specialization: ['Industrial Equipment', 'Electronics', 'Textiles'],
      availability: 'Available',
      location: 'Mombasa, Kenya'
    }
  ];

  // Define documentation steps
  const steps = [
    {
      id: 0,
      title: 'Importer Details',
      icon: Building,
      description: 'Company Name, Business Address, Contact Person Details',
      required: true,
      hasUpload: false
    },
    {
      id: 1,
      title: 'Import Items List',
      icon: Package,
      description: 'Items & Quantities being imported',
      required: true,
      hasUpload: false
    },
    {
      id: 2,
      title: 'Commercial Invoice',
      icon: FileText,
      description: 'Matching Factory Declarations Explicitly',
      required: true,
      hasUpload: true
    },
    {
      id: 3,
      title: 'Sales Contract',
      icon: FileSignature,
      description: 'Official sales agreement between parties',
      required: true,
      hasUpload: true
    },
    {
      id: 4,
      title: 'Proof of Payments',
      icon: CreditCard,
      description: 'Payment confirmation and receipts',
      required: true,
      hasUpload: true
    },
    {
      id: 5,
      title: 'UNBS Certificate of Conformity',
      icon: Shield,
      description: 'Product quality certification',
      required: true,
      hasUpload: true
    },
    {
      id: 6,
      title: 'UNBS Pre-Export Verification',
      icon: Shield,
      description: 'Pre-shipment quality verification',
      required: true,
      hasUpload: true
    },
    {
      id: 7,
      title: 'Freight Invoice',
      icon: FileBarChart,
      description: 'Required by URA for customs value calculation',
      required: true,
      hasUpload: true
    },
    {
      id: 8,
      title: 'Clearing Agent',
      icon: Users,
      description: 'Assign a clearing agent for customs clearance',
      required: true,
      hasUpload: true
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
  };

  const isDark = darkMode

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('importDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setImportData(parsed);
        // Calculate progress
        const completedSteps = steps.filter(step => {
          const stepKey = getStepKey(step.id);
          return isStepComplete(parsed, stepKey);
        }).length;
        setImportData(prev => ({
          ...prev,
          progress: Math.round((completedSteps / steps.length) * 100)
        }));
        // Restore current step if saved
        if (parsed.currentStep !== undefined) {
          setCurrentStep(parsed.currentStep);
        }
        // Restore selected agent if saved
        if (parsed.clearingAgent?.assignedAgentId) {
          const agent = clearingAgents.find(a => a.id === parsed.clearingAgent.assignedAgentId);
          if (agent) setSelectedAgent(agent);
        }
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  const getStepKey = (stepId) => {
    const keys = [
      'importerDetails',
      'importItems',
      'commercialInvoice',
      'salesContract',
      'proofOfPayments',
      'unbsCoc',
      'unbsPvoc',
      'freightInvoice',
      'clearingAgent'
    ];
    return keys[stepId] || '';
  };

  const isStepComplete = (data, stepKey) => {
    if (!data || !data[stepKey]) return false;
    const stepData = data[stepKey];
    
    // Check if the step has data
    if (Array.isArray(stepData)) {
      return stepData.length > 0 && stepData.some(item => {
        return Object.values(item).some(val => val && val !== '');
      });
    } else if (typeof stepData === 'object') {
      return Object.values(stepData).some(val => val && val !== '');
    }
    return false;
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Save progress with toast
  const saveProgress = () => {
    setIsSaving(true);
    setTimeout(() => {
      const dataToSave = {
        ...importData,
        updatedAt: new Date().toISOString(),
        currentStep: currentStep
      };
      localStorage.setItem('importDraft', JSON.stringify(dataToSave));
      setIsSaving(false);
      setSavedSuccess(true);
      showToast(`Progress saved! Step ${currentStep + 1}: ${steps[currentStep].title}`, 'success');
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 500);
  };

  // Update import data
  const updateImportData = (stepKey, field, value) => {
    setImportData(prev => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [field]: value
      }
    }));
  };

  // Update array data (for items list)
  const updateArrayItem = (stepKey, index, field, value) => {
    setImportData(prev => {
      const updatedArray = [...prev[stepKey]];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return {
        ...prev,
        [stepKey]: updatedArray
      };
    });
  };

  // Add item to array
  const addArrayItem = (stepKey, template) => {
    setImportData(prev => ({
      ...prev,
      [stepKey]: [...prev[stepKey], { ...template, id: Date.now() }]
    }));
  };

  // Remove item from array
  const removeArrayItem = (stepKey, index) => {
    if (importData[stepKey].length <= 1) return;
    setImportData(prev => ({
      ...prev,
      [stepKey]: prev[stepKey].filter((_, i) => i !== index)
    }));
  };

  // File upload handler
  const handleFileUpload = (stepKey, file, paymentIndex = null) => {
    if (!file) return;

    setUploadingFile(true);
    
    // Simulate file upload (in real app, upload to server)
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
          // For proof of payments, update specific payment
          setImportData(prev => {
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
          // For other steps
          setImportData(prev => {
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
        
        // Auto-save after upload
        setTimeout(() => {
          const dataToSave = {
            ...importData,
            updatedAt: new Date().toISOString(),
            currentStep: currentStep
          };
          localStorage.setItem('importDraft', JSON.stringify(dataToSave));
        }, 300);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  // Remove document
  const removeDocument = (stepKey, docId, paymentIndex = null) => {
    if (stepKey === 'proofOfPayments' && paymentIndex !== null) {
      setImportData(prev => {
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
      setImportData(prev => {
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

  // View document
  const viewDocument = (doc) => {
    setViewingDocument(doc);
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType === 'application/pdf') return <FileText className="w-5 h-5 text-red-500" />;
    if (fileType.includes('image')) return <Image className="w-5 h-5 text-blue-500" />;
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    if (fileType.includes('zip') || fileType.includes('rar')) return <FileArchive className="w-5 h-5 text-orange-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Document Upload Component
  const DocumentUpload = ({ stepKey, documents = [], onUpload, paymentIndex = null }) => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        onUpload(file, paymentIndex);
      }
      e.target.value = '';
    };

    return (
      <div className={`mt-4 p-4 rounded-lg border-2 border-dashed ${
        isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
      } transition-all duration-200`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
              <Upload className="w-5 h-5" style={{ color: colors.primary }} />
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

        {/* Document List */}
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
    // Validate clearing agent assignment
    if (!importData.clearingAgent.assignedAgentId) {
      showToast('Please assign a clearing agent before completing', 'error');
      setCurrentStep(8);
      return;
    }

    // Mark as complete
    const completedData = {
      ...importData,
      status: 'complete',
      importNumber: `IMP-${Date.now().toString().slice(-8)}`,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('importDraft', JSON.stringify(completedData));
    setImportData(completedData);
    showToast('Import documentation completed successfully! 🎉', 'success');
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  // Toast Component
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

  // Document Viewer Modal
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

  // Render step content
  const renderStepContent = () => {
    const step = steps[currentStep];
    const stepKey = getStepKey(currentStep);

    switch (currentStep) {
      case 0: // Importer Details
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Company Name *
                </label>
                <input
                  type="text"
                  value={importData.importerDetails.companyName}
                  onChange={(e) => updateImportData('importerDetails', 'companyName', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Business Address *
                </label>
                <input
                  type="text"
                  value={importData.importerDetails.businessAddress}
                  onChange={(e) => updateImportData('importerDetails', 'businessAddress', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contact Person *
                </label>
                <input
                  type="text"
                  value={importData.importerDetails.contactPerson}
                  onChange={(e) => updateImportData('importerDetails', 'contactPerson', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={importData.importerDetails.contactEmail}
                  onChange={(e) => updateImportData('importerDetails', 'contactEmail', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={importData.importerDetails.contactPhone}
                  onChange={(e) => updateImportData('importerDetails', 'contactPhone', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  TIN Number
                </label>
                <input
                  type="text"
                  value={importData.importerDetails.tinNumber}
                  onChange={(e) => updateImportData('importerDetails', 'tinNumber', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 1: // Import Items List
        return (
          <div className="space-y-4">
            {importData.importItems.map((item, index) => (
              <div key={item.id} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-start mb-3">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Item #{index + 1}
                  </h4>
                  <button
                    onClick={() => removeArrayItem('importItems', index)}
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
                      onChange={(e) => updateArrayItem('importItems', index, 'description', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateArrayItem('importItems', index, 'quantity', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Unit
                    </label>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => updateArrayItem('importItems', index, 'unit', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Unit Price (UGX)
                    </label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateArrayItem('importItems', index, 'unitPrice', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Total Value (UGX)
                    </label>
                    <input
                      type="number"
                      value={item.totalValue}
                      onChange={(e) => updateArrayItem('importItems', index, 'totalValue', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      HS Code
                    </label>
                    <input
                      type="text"
                      value={item.hsCode}
                      onChange={(e) => updateArrayItem('importItems', index, 'hsCode', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('importItems', { description: '', quantity: '', unit: '', unitPrice: '', totalValue: '', hsCode: '' })}
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

      case 2: // Commercial Invoice
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Invoice Number *
                </label>
                <input
                  type="text"
                  value={importData.commercialInvoice.invoiceNumber}
                  onChange={(e) => updateImportData('commercialInvoice', 'invoiceNumber', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Invoice Date *
                </label>
                <input
                  type="date"
                  value={importData.commercialInvoice.invoiceDate}
                  onChange={(e) => updateImportData('commercialInvoice', 'invoiceDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Supplier Name *
                </label>
                <input
                  type="text"
                  value={importData.commercialInvoice.supplierName}
                  onChange={(e) => updateImportData('commercialInvoice', 'supplierName', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Supplier Address
                </label>
                <input
                  type="text"
                  value={importData.commercialInvoice.supplierAddress}
                  onChange={(e) => updateImportData('commercialInvoice', 'supplierAddress', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subtotal (UGX)
                </label>
                <input
                  type="number"
                  value={importData.commercialInvoice.subtotal}
                  onChange={(e) => updateImportData('commercialInvoice', 'subtotal', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total Amount (UGX) *
                </label>
                <input
                  type="number"
                  value={importData.commercialInvoice.totalAmount}
                  onChange={(e) => updateImportData('commercialInvoice', 'totalAmount', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            {steps[currentStep].hasUpload && (
              <DocumentUpload 
                stepKey={stepKey} 
                documents={importData[stepKey]?.uploadedDocuments || []}
                onUpload={(file) => handleFileUpload(stepKey, file)}
              />
            )}
          </div>
        );

      case 3: // Sales Contract
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contract Number *
                </label>
                <input
                  type="text"
                  value={importData.salesContract.contractNumber}
                  onChange={(e) => updateImportData('salesContract', 'contractNumber', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contract Date *
                </label>
                <input
                  type="date"
                  value={importData.salesContract.contractDate}
                  onChange={(e) => updateImportData('salesContract', 'contractDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Buyer Name *
                </label>
                <input
                  type="text"
                  value={importData.salesContract.buyerName}
                  onChange={(e) => updateImportData('salesContract', 'buyerName', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Seller Name *
                </label>
                <input
                  type="text"
                  value={importData.salesContract.sellerName}
                  onChange={(e) => updateImportData('salesContract', 'sellerName', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contract Value (UGX) *
                </label>
                <input
                  type="number"
                  value={importData.salesContract.value}
                  onChange={(e) => updateImportData('salesContract', 'value', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery Terms
                </label>
                <input
                  type="text"
                  value={importData.salesContract.deliveryTerms}
                  onChange={(e) => updateImportData('salesContract', 'deliveryTerms', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            {steps[currentStep].hasUpload && (
              <DocumentUpload 
                stepKey={stepKey} 
                documents={importData[stepKey]?.uploadedDocuments || []}
                onUpload={(file) => handleFileUpload(stepKey, file)}
              />
            )}
          </div>
        );

      case 4: // Proof of Payments
        return (
          <div className="space-y-4">
            {importData.proofOfPayments.map((payment, index) => (
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
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Amount (UGX) *
                    </label>
                    <input
                      type="number"
                      value={payment.amount}
                      onChange={(e) => updateArrayItem('proofOfPayments', index, 'amount', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
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
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
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
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                {steps[currentStep].hasUpload && (
                  <DocumentUpload 
                    stepKey={stepKey} 
                    documents={payment.uploadedDocuments || []}
                    onUpload={(file) => handleFileUpload(stepKey, file, index)}
                    paymentIndex={index}
                  />
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('proofOfPayments', { paymentDate: '', amount: '', method: '', reference: '', receipt: '', uploadedDocuments: [] })}
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

      case 5: // UNBS CoC
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Certificate Number *
                </label>
                <input
                  type="text"
                  value={importData.unbsCoc.certificateNumber}
                  onChange={(e) => updateImportData('unbsCoc', 'certificateNumber', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Issue Date *
                </label>
                <input
                  type="date"
                  value={importData.unbsCoc.issueDate}
                  onChange={(e) => updateImportData('unbsCoc', 'issueDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expiry Date *
                </label>
                <input
                  type="date"
                  value={importData.unbsCoc.expiryDate}
                  onChange={(e) => updateImportData('unbsCoc', 'expiryDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </label>
                <select
                  value={importData.unbsCoc.status}
                  onChange={(e) => updateImportData('unbsCoc', 'status', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Description
              </label>
              <textarea
                value={importData.unbsCoc.productDescription}
                onChange={(e) => updateImportData('unbsCoc', 'productDescription', e.target.value)}
                rows="3"
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            {steps[currentStep].hasUpload && (
              <DocumentUpload 
                stepKey={stepKey} 
                documents={importData[stepKey]?.uploadedDocuments || []}
                onUpload={(file) => handleFileUpload(stepKey, file)}
              />
            )}
          </div>
        );

      case 6: // UNBS PVoC
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Certificate Number *
                </label>
                <input
                  type="text"
                  value={importData.unbsPvoc.certificateNumber}
                  onChange={(e) => updateImportData('unbsPvoc', 'certificateNumber', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Issue Date *
                </label>
                <input
                  type="date"
                  value={importData.unbsPvoc.issueDate}
                  onChange={(e) => updateImportData('unbsPvoc', 'issueDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expiry Date *
                </label>
                <input
                  type="date"
                  value={importData.unbsPvoc.expiryDate}
                  onChange={(e) => updateImportData('unbsPvoc', 'expiryDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </label>
                <select
                  value={importData.unbsPvoc.status}
                  onChange={(e) => updateImportData('unbsPvoc', 'status', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Description
              </label>
              <textarea
                value={importData.unbsPvoc.productDescription}
                onChange={(e) => updateImportData('unbsPvoc', 'productDescription', e.target.value)}
                rows="3"
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            {steps[currentStep].hasUpload && (
              <DocumentUpload 
                stepKey={stepKey} 
                documents={importData[stepKey]?.uploadedDocuments || []}
                onUpload={(file) => handleFileUpload(stepKey, file)}
              />
            )}
          </div>
        );

      case 7: // Freight Invoice
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Invoice Number *
                </label>
                <input
                  type="text"
                  value={importData.freightInvoice.invoiceNumber}
                  onChange={(e) => updateImportData('freightInvoice', 'invoiceNumber', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Invoice Date *
                </label>
                <input
                  type="date"
                  value={importData.freightInvoice.invoiceDate}
                  onChange={(e) => updateImportData('freightInvoice', 'invoiceDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Carrier Name *
                </label>
                <input
                  type="text"
                  value={importData.freightInvoice.carrierName}
                  onChange={(e) => updateImportData('freightInvoice', 'carrierName', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Origin
                </label>
                <input
                  type="text"
                  value={importData.freightInvoice.origin}
                  onChange={(e) => updateImportData('freightInvoice', 'origin', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Destination
                </label>
                <input
                  type="text"
                  value={importData.freightInvoice.destination}
                  onChange={(e) => updateImportData('freightInvoice', 'destination', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Freight Charges (UGX) *
                </label>
                <input
                  type="number"
                  value={importData.freightInvoice.freightCharges}
                  onChange={(e) => updateImportData('freightInvoice', 'freightCharges', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Insurance Charges (UGX)
                </label>
                <input
                  type="number"
                  value={importData.freightInvoice.insuranceCharges}
                  onChange={(e) => updateImportData('freightInvoice', 'insuranceCharges', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total Freight (UGX) *
                </label>
                <input
                  type="number"
                  value={importData.freightInvoice.totalFreight}
                  onChange={(e) => updateImportData('freightInvoice', 'totalFreight', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
            {steps[currentStep].hasUpload && (
              <DocumentUpload 
                stepKey={stepKey} 
                documents={importData[stepKey]?.uploadedDocuments || []}
                onUpload={(file) => handleFileUpload(stepKey, file)}
              />
            )}
          </div>
        );

      case 8: // Clearing Agent Assignment (NEW)
        return (
          <div className="space-y-6">
            {/* Agent Selection */}
            <div>
              <h3 className={`text-md font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Select a Clearing Agent
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Choose a clearing agent to handle customs clearance for this shipment
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clearingAgents.map((agent) => {
                  const isSelected = selectedAgent?.id === agent.id;
                  return (
                    <div
                      key={agent.id}
                      onClick={() => {
                        setSelectedAgent(agent);
                        setImportData(prev => ({
                          ...prev,
                          clearingAgent: {
                            ...prev.clearingAgent,
                            assignedAgentId: agent.id,
                            agentName: agent.name,
                            agentCompany: agent.company,
                            agentEmail: agent.email,
                            agentPhone: agent.phone,
                            assignmentDate: new Date().toISOString().split('T')[0]
                          }
                        }));
                      }}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : isDark
                          ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-full" style={{ backgroundColor: colors.primaryBg }}>
                              <User className="w-4 h-4" style={{ color: colors.primary }} />
                            </div>
                            <div>
                              <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {agent.name}
                              </h4>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {agent.company}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <Mail className="w-3 h-3" style={{ color: colors.primary }} />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                {agent.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Phone className="w-3 h-3" style={{ color: colors.primary }} />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                {agent.phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <MapPin className="w-3 h-3" style={{ color: colors.primary }} />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                {agent.location}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {agent.specialization.map((spec, idx) => (
                              <span
                                key={idx}
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {agent.rating}
                            </span>
                          </div>
                          <span className={`text-xs ${agent.availability === 'Available' ? 'text-green-500' : 'text-yellow-500'}`}>
                            {agent.availability}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {agent.experience}
                          </span>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 mt-1" style={{ color: colors.primary }} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assignment Details */}
            {selectedAgent && (
              <div className={`mt-6 p-4 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Assignment Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Agent Name
                    </label>
                    <input
                      type="text"
                      value={importData.clearingAgent.agentName}
                      onChange={(e) => updateImportData('clearingAgent', 'agentName', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company
                    </label>
                    <input
                      type="text"
                      value={importData.clearingAgent.agentCompany}
                      onChange={(e) => updateImportData('clearingAgent', 'agentCompany', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={importData.clearingAgent.agentEmail}
                      onChange={(e) => updateImportData('clearingAgent', 'agentEmail', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={importData.clearingAgent.agentPhone}
                      onChange={(e) => updateImportData('clearingAgent', 'agentPhone', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Assignment Date *
                    </label>
                    <input
                      type="date"
                      value={importData.clearingAgent.assignmentDate}
                      onChange={(e) => updateImportData('clearingAgent', 'assignmentDate', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Service Type
                    </label>
                    <select
                      value={importData.clearingAgent.serviceType}
                      onChange={(e) => updateImportData('clearingAgent', 'serviceType', e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select service type</option>
                      <option value="customs_clearance">Customs Clearance</option>
                      <option value="freight_forwarding">Freight Forwarding</option>
                      <option value="warehousing">Warehousing</option>
                      <option value="full_service">Full Service</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Special Instructions
                  </label>
                  <textarea
                    value={importData.clearingAgent.specialInstructions}
                    onChange={(e) => updateImportData('clearingAgent', 'specialInstructions', e.target.value)}
                    rows="3"
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="Any special instructions for the clearing agent..."
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div className="mt-4">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </label>
                  <select
                    value={importData.clearingAgent.status}
                    onChange={(e) => updateImportData('clearingAgent', 'status', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="pending">Pending Assignment</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            )}

            {/* Document Upload for Agent */}
            {steps[currentStep].hasUpload && (
              <DocumentUpload 
                stepKey={stepKey} 
                documents={importData[stepKey]?.uploadedDocuments || []}
                onUpload={(file) => handleFileUpload(stepKey, file)}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Document Viewer Modal */}
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
              onClick={() => navigate('/dashboard')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              New Import Documentation
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Complete all required documentation for your import
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
              {importData.progress}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${importData.progress}%`,
                backgroundColor: colors.primary
              }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-9 gap-1 md:gap-2 mb-6">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = isStepComplete(importData, getStepKey(index));
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
                <span className="text-[8px] md:text-xs text-center mt-1 leading-tight">
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
                  Complete Import
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

export default NewImport;