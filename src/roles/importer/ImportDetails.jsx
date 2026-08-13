// ImportDetails.jsx - View all details of a specific import
import React, { useState, useContext, useEffect } from 'react';
import {
  Package,
  ClipboardList,
  Send,
  FileCheck,
  FileSignature,
  ChevronRight,
  ArrowLeft,
  Eye,
  Trash2,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  DollarSign,
  Truck,
  Users,
  FileText,
  Edit2,
  Printer,
  ExternalLink,
  Calendar,
  Shield,
  File,
  Image,
  FileSpreadsheet,
  FileArchive,
  Info,
  Mail,
  Phone,
  Building,
  User,
  CreditCard,
  FileBarChart,
  Calculator,
  RefreshCw
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';

// Helper function to get file icon
const getFileIcon = (fileType) => {
  if (fileType === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
  if (fileType?.includes('image')) return <Image className="w-4 h-4 text-blue-500" />;
  if (fileType?.includes('spreadsheet') || fileType?.includes('excel')) return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
  if (fileType?.includes('zip') || fileType?.includes('rar')) return <FileArchive className="w-4 h-4 text-orange-500" />;
  return <File className="w-4 h-4 text-gray-500" />;
};

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const formatCurrency = (amount) => {
  if (!amount) return 'UGX 0';
  return `UGX ${Number(amount).toLocaleString()}`;
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const ImportDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, theme } = useContext(ThemeContext);
  const [importData, setImportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [viewingDocument, setViewingDocument] = useState(null);

  const colors = {
    primary: theme.primary,
    primaryLight: theme.primary + 'cc',
    primaryDark: theme.primary + '99',
    primaryBg: theme.primary + '20',
    primaryBgDark: theme.primary + '40',
    success: theme.success || '#10b981',
    warning: theme.accent || '#f59e0b',
    danger: theme.danger || '#ef4444',
    info: theme.secondary || '#3b82f6',
  };

  const isDark = darkMode;

  // Progress steps for the progress bar
  const progressSteps = [
    { id: 0, title: 'Preparation', description: 'Items added and ready for review' },
    { id: 1, title: 'Review', description: 'Items reviewed and verified' },
    { id: 2, title: 'Sent', description: 'Sent to suppliers for confirmation' },
    { id: 3, title: 'Confirmed', description: 'Supplier confirmation received' },
    { id: 4, title: 'Finalized', description: 'Order finalized and documents uploaded' },
    { id: 5, title: 'Complete', description: 'Import process completed' }
  ];

  // Map status to step index
  const getCurrentStepIndex = (status) => {
    const stepMap = {
      'draft': 0,
      'sent': 2,
      'review': 2,
      'confirmed': 3,
      'finalized': 4,
      'complete': 5
    };
    return stepMap[status] || 0;
  };

  useEffect(() => {
    // Get import data from location state or localStorage
    const stateData = location.state?.importData;
    
    if (stateData) {
      setImportData(stateData);
      setIsLoading(false);
    } else {
      // Try to find it in localStorage
      const allImports = JSON.parse(localStorage.getItem('allImports') || '[]');
      const draft = JSON.parse(localStorage.getItem('importDraft') || 'null');
      
      // Check if we have an import number in the URL
      const pathParts = location.pathname.split('/');
      const importNumber = pathParts[pathParts.length - 1];
      
      let found = null;
      if (importNumber && importNumber !== 'import-details') {
        found = allImports.find(imp => imp.importNumber === importNumber);
        if (!found && draft && draft.importNumber === importNumber) {
          found = draft;
        }
      } else {
        // Use the first import as fallback
        found = allImports[0] || draft;
      }
      
      if (found) {
        setImportData(found);
      } else {
        showToast('Import not found', 'error');
        setTimeout(() => navigate('/my-imports'), 1500);
      }
      setIsLoading(false);
    }
  }, [location]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleContinue = () => {
    if (importData) {
      localStorage.setItem('importDraft', JSON.stringify(importData));
      navigate('/new-import');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'sent': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'review': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'confirmed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'finalized': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'complete': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'sent': return 'Sent to Supplier';
      case 'review': return 'Under Review';
      case 'confirmed': return 'Confirmed';
      case 'finalized': return 'Finalized';
      case 'complete': return 'Complete';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      case 'review': return <AlertCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'finalized': return <FileCheck className="w-4 h-4" />;
      case 'complete': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const Toast = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                  type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
                  <Info className="w-5 h-5" />;

    return (
      <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white ${bgColor}`}>
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
            {doc.type?.startsWith('image/') ? (
              <img src={doc.data} alt={doc.name} className="max-w-full max-h-[60vh] object-contain mx-auto rounded-lg" />
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

  if (isLoading) {
    return (
      <div className="min-h-screen w-full p-4 md:p-6 flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin" style={{ color: colors.primary }} />
          <p className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Loading import details...</p>
        </div>
      </div>
    );
  }

  if (!importData) {
    return (
      <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="max-w-7xl mx-auto text-center py-12">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Import Not Found</h2>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>The import you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/my-imports')}
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: colors.primary }}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to My Imports
          </button>
        </div>
      </div>
    );
  }

  const status = importData.orderStatus || importData.status || 'draft';
  const items = importData.items || [];
  const invoice = importData.invoiceData || {};
  const freightInvoice = importData.freightInvoice || {};
  const customColumns = importData.customColumns || [];
  const currentStep = getCurrentStepIndex(status);

  // Calculate totals
  const totalItemsValue = items.reduce((sum, item) => sum + (parseFloat(item.totalValue) || 0), 0);
  const taxAmount = totalItemsValue * 0.18;
  const shippingCost = totalItemsValue * 0.05;
  const grandTotal = totalItemsValue + taxAmount + shippingCost;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {viewingDocument && <DocumentViewer doc={viewingDocument} onClose={() => setViewingDocument(null)} />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/my-imports')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Imports
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Import Details
            </h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {importData.importNumber || 'Draft'}
              </p>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(status)}`}>
                {getStatusIcon(status)}
                {getStatusDisplay(status)}
              </span>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Progress: {importData.progress || 0}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {status !== 'complete' && status !== 'finalized' && (
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: colors.primary }}
              >
                <Edit2 className="w-4 h-4" />
                Continue Import
              </button>
            )}
            <button
              onClick={() => {
                const dataStr = JSON.stringify(importData, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `import_${importData.importNumber || 'draft'}_${new Date().toISOString().split('T')[0]}.json`;
                link.click();
                URL.revokeObjectURL(url);
                showToast('Export successful!', 'success');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                color: colors.primary
              }}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Progress Bar using the component */}
        <div className="mb-6">
          <ProgressBar
            steps={progressSteps}
            currentStep={currentStep}
            onStepClick={(step) => {
              // Optional: navigate to the corresponding step in the import process
              // You can add logic here if needed
              console.log(`Clicked step ${step}`);
            }}
            stepColors={[
              colors.primary,
              colors.primaryLight,
              colors.info,
              colors.success,
              colors.warning,
              colors.success
            ]}
            theme={isDark ? 'dark' : 'light'}
            size="sm"
            showLabels={true}
            showNumbers={true}
            clickable={false}
            showPercent={true}
            showDescription={true}
            progress={importData.progress || 0}
          />
        </div>

        {/* Importer Details */}
        <div className={`rounded-lg p-4 md:p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Building className="w-5 h-5" style={{ color: colors.primary }} />
            Importer Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company Name</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {importData.importerDetails?.companyName || 'N/A'}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Business Address</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {importData.importerDetails?.businessAddress || 'N/A'}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {importData.importerDetails?.contactPerson || 'N/A'}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Email</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {importData.importerDetails?.contactEmail || 'N/A'}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Phone</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {importData.importerDetails?.contactPhone || 'N/A'}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>TIN Number</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {importData.importerDetails?.tinNumber || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className={`rounded-lg p-4 md:p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Package className="w-5 h-5" style={{ color: colors.primary }} />
              Items ({items.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium">#</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">Item Code</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">Item Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">Group</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">UOM</th>
                  <th className="px-4 py-2 text-right text-xs font-medium">Qty</th>
                  <th className="px-4 py-2 text-right text-xs font-medium">Unit Price</th>
                  <th className="px-4 py-2 text-right text-xs font-medium">Total</th>
                  {customColumns.map(col => (
                    <th key={col.key} className="px-4 py-2 text-left text-xs font-medium">{col.name}</th>
                  ))}
                  <th className="px-4 py-2 text-center text-xs font-medium">Supplier Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                {items.map((item, index) => (
                  <tr key={item.id || index} className={isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 font-mono text-xs">{item.itemCode || '-'}</td>
                    <td className="px-4 py-2">{item.itemName || '-'}</td>
                    <td className="px-4 py-2">{item.itemGroup || '-'}</td>
                    <td className="px-4 py-2">{item.stockUOM || '-'}</td>
                    <td className="px-4 py-2 text-right">{item.quantity || '-'}</td>
                    <td className="px-4 py-2 text-right">{item.unitPrice ? formatCurrency(item.unitPrice) : '-'}</td>
                    <td className="px-4 py-2 text-right font-medium">{item.totalValue ? formatCurrency(item.totalValue) : '-'}</td>
                    {customColumns.map(col => (
                      <td key={col.key} className="px-4 py-2">{item.customFields?.[col.key] || '-'}</td>
                    ))}
                    <td className="px-4 py-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.supplierStatus || 'pending')}`}>
                        {(item.supplierStatus || 'pending').charAt(0).toUpperCase() + (item.supplierStatus || 'pending').slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <td colSpan="7" className="px-4 py-2 text-right font-medium">Total Value:</td>
                  <td className="px-4 py-2 text-right font-bold">{formatCurrency(totalItemsValue)}</td>
                  {customColumns.map(col => (
                    <td key={col.key} className="px-4 py-2"></td>
                  ))}
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Supplier Details */}
        {(importData.selectedSupplier || importData.supplierName) && (
          <div className={`rounded-lg p-4 md:p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Users className="w-5 h-5" style={{ color: colors.primary }} />
              Supplier Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Supplier Name</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {importData.supplierName || 'N/A'}
                </p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Supplier Email</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {importData.supplierEmail || 'N/A'}
                </p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order Status</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getStatusDisplay(status)}
                </p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last Updated</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatDate(importData.updatedAt)}
                </p>
              </div>
            </div>

            {/* Supplier Confirmation Details */}
            {(status === 'confirmed' || status === 'finalized' || status === 'complete') && (
              <div className="mt-4">
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Supplier Confirmation</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {items.map((item, index) => (
                    <div key={item.id || index} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.itemName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.supplierStatus || 'pending')}`}>
                          {(item.supplierStatus || 'pending').charAt(0).toUpperCase() + (item.supplierStatus || 'pending').slice(1)}
                        </span>
                        {item.supplierQuantity && (
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Available: {item.supplierQuantity}
                          </span>
                        )}
                      </div>
                      {item.supplierNotes && (
                        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.supplierNotes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Invoice & Payment Details */}
        {(status === 'confirmed' || status === 'finalized' || status === 'complete') && (
          <div className={`rounded-lg p-4 md:p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <DollarSign className="w-5 h-5" style={{ color: colors.primary }} />
              Invoice & Payment
            </h2>

            {/* Invoice Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Subtotal</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(totalItemsValue)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tax (18%)</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(taxAmount)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipping</p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(shippingCost)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`} style={{ borderLeft: `4px solid ${colors.primary}` }}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</p>
                <p className={`font-bold`} style={{ color: colors.primary }}>{formatCurrency(grandTotal)}</p>
              </div>
            </div>

            {/* Invoice Details */}
            {importData.invoiceData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Invoice Number</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {importData.invoiceData.invoiceNumber || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Supplier Invoice Number</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {importData.invoiceData.supplierInvoiceNumber || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Invoice Date</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatDate(importData.invoiceData.invoiceDate)}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Due Date</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatDate(importData.invoiceData.dueDate)}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Payment Status</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      importData.invoiceData.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : importData.invoiceData.paymentStatus === 'partially_paid'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                    }`}>
                      {(importData.invoiceData.paymentStatus || 'pending').charAt(0).toUpperCase() + (importData.invoiceData.paymentStatus || 'pending').slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Amount</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(grandTotal)}
                  </p>
                </div>
              </div>
            )}

            {/* Invoice Documents */}
            {(importData.invoiceData?.uploadedDocuments?.length > 0 || freightInvoice?.uploadedDocuments?.length > 0) && (
              <div className="mt-4">
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Invoice Documents</h4>
                <div className="space-y-2">
                  {[...(importData.invoiceData?.uploadedDocuments || []), ...(freightInvoice?.uploadedDocuments || [])].map((doc, index) => (
                    <div key={doc.id || index} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {getFileIcon(doc.type)}
                        <span className={`text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{formatFileSize(doc.size)}</span>
                      </div>
                      <button                        onClick={() => setViewingDocument(doc)}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments */}
            {(importData.invoiceData?.payments?.length > 0) && (
              <div className="mt-4">
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Payment History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium">Date</th>
                        <th className="px-3 py-2 text-right text-xs font-medium">Amount</th>
                        <th className="px-3 py-2 text-left text-xs font-medium">Method</th>
                        <th className="px-3 py-2 text-left text-xs font-medium">Reference</th>
                        <th className="px-3 py-2 text-left text-xs font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      {importData.invoiceData.payments.map((payment, index) => (
                        <tr key={payment.id || index} className={isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                          <td className="px-3 py-2">{formatDate(payment.paymentDate)}</td>
                          <td className="px-3 py-2 text-right font-medium">{formatCurrency(payment.amount)}</td>
                          <td className="px-3 py-2">{(payment.method || 'N/A').replace('_', ' ').charAt(0).toUpperCase() + (payment.method || 'N/A').replace('_', ' ').slice(1)}</td>
                          <td className="px-3 py-2">{payment.reference || '-'}</td>
                          <td className="px-3 py-2">{payment.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* UNBS Documents */}
        {(status === 'finalized' || status === 'complete') && (
          <div className={`rounded-lg p-4 md:p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Shield className="w-5 h-5" style={{ color: colors.primary }} />
              UNBS Documentation
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium">Item</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">PVoC Status</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">PVoC Docs</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">CoC Status</th>
                    <th className="px-3 py-2 text-center text-xs font-medium">CoC Docs</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  {items.map((item, index) => {
                    const pvocDocs = item.pvoc?.uploadedDocuments || [];
                    const cocDocs = item.coc?.uploadedDocuments || [];
                    return (
                      <tr key={item.id || index} className={isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                        <td className="px-3 py-2">
                          <div className="font-medium">{item.itemName}</div>
                          <div className="text-xs text-gray-500">{item.itemCode}</div>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.pvoc?.status || 'pending')}`}>
                            {(item.pvoc?.status || 'pending').charAt(0).toUpperCase() + (item.pvoc?.status || 'pending').slice(1)}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex flex-wrap items-center justify-center gap-1">
                            {pvocDocs.map((doc, docIndex) => (
                              <button
                                key={doc.id || docIndex}
                                onClick={() => setViewingDocument(doc)}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                                title={doc.name}
                              >
                                {getFileIcon(doc.type)}
                              </button>
                            ))}
                            {pvocDocs.length === 0 && <span className="text-xs text-gray-400">No docs</span>}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.coc?.status || 'pending')}`}>
                            {(item.coc?.status || 'pending').charAt(0).toUpperCase() + (item.coc?.status || 'pending').slice(1)}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex flex-wrap items-center justify-center gap-1">
                            {cocDocs.map((doc, docIndex) => (
                              <button
                                key={doc.id || docIndex}
                                onClick={() => setViewingDocument(doc)}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                                title={doc.name}
                              >
                                {getFileIcon(doc.type)}
                              </button>
                            ))}
                            {cocDocs.length === 0 && <span className="text-xs text-gray-400">No docs</span>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Freight Invoice */}
        {freightInvoice && Object.keys(freightInvoice).length > 0 && freightInvoice.invoiceNumber && (
          <div className={`rounded-lg p-4 md:p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <FileBarChart className="w-5 h-5" style={{ color: colors.primary }} />
              Freight Invoice
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Invoice Number</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{freightInvoice.invoiceNumber || 'N/A'}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Freight Charges</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(freightInvoice.freightCharges)}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Freight</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(freightInvoice.totalFreight)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          <button
            onClick={() => navigate('/my-imports')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
              color: colors.primary
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Imports
          </button>

          <div className="flex items-center gap-2">
            {status !== 'complete' && status !== 'finalized' && (
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Edit2 className="w-4 h-4" />
                Continue Import
              </button>
            )}
            
            {status === 'complete' && (
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Printer className="w-4 h-4" />
                Print Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportDetails;