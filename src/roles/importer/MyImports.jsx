// MyImports.jsx - Complete imports management page with item dropdown
import React, { useState, useContext, useEffect } from 'react';
import {
  Package,
  ClipboardList,
  Send,
  FileCheck,
  FileSignature,
  Search,
  Filter,
  ChevronRight,
  ArrowLeft,
  Plus,
  Eye,
  Trash2,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Calendar,
  DollarSign,
  Truck,
  Users,
  FileText,
  MoreVertical,
  Edit2,
  Copy,
  Printer,
  ExternalLink,
  Filter as FilterIcon,
  ChevronDown,
  ChevronUp,
  Info,
  ShoppingCart,
  ChevronDown as ChevronDownIcon,
  PenSquare,
  ArrowRightCircle,
  PlayCircle,
  FileEdit,
  SquareArrowOutUpRight,
  Forward,
  Archive
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate } from 'react-router-dom';

// Dummy data for imports
const DUMMY_IMPORTS = [
  {
    importNumber: 'IMP-2024-001',
    importerDetails: {
      companyName: 'Uganda Importers Ltd',
      contactPerson: 'John Doe',
      contactEmail: 'john@ugandaimporters.com'
    },
    items: [
      { id: 1, itemName: 'Laptop Computer', quantity: 10, totalValue: '12000000' },
      { id: 2, itemName: 'Desktop Monitors', quantity: 20, totalValue: '8000000' }
    ],
    status: 'complete',
    orderStatus: 'complete',
    progress: 100,
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-20T15:45:00.000Z',
    completedAt: '2024-01-20T15:45:00.000Z'
  },
  {
    importNumber: 'IMP-2024-002',
    importerDetails: {
      companyName: 'Kampala Distributors',
      contactPerson: 'Jane Smith',
      contactEmail: 'jane@kampaladist.com'
    },
    items: [
      { id: 3, itemName: 'Office Chairs', quantity: 50, totalValue: '15000000' },
      { id: 4, itemName: 'Desk Tables', quantity: 30, totalValue: '18000000' }
    ],
    status: 'finalized',
    orderStatus: 'finalized',
    progress: 80,
    createdAt: '2024-01-18T09:15:00.000Z',
    updatedAt: '2024-01-25T11:20:00.000Z'
  },
  {
    importNumber: 'IMP-2024-003',
    importerDetails: {
      companyName: 'East African Traders',
      contactPerson: 'Peter Okello',
      contactEmail: 'peter@eatraders.com'
    },
    items: [
      { id: 5, itemName: 'Samsung Phones', quantity: 100, totalValue: '50000000' },
      { id: 6, itemName: 'Phone Accessories', quantity: 200, totalValue: '10000000' }
    ],
    status: 'confirmed',
    orderStatus: 'confirmed',
    progress: 60,
    createdAt: '2024-01-22T14:00:00.000Z',
    updatedAt: '2024-01-28T16:30:00.000Z'
  },
  {
    importNumber: 'IMP-2024-004',
    importerDetails: {
      companyName: 'TechGlobal Supplies Ltd',
      contactPerson: 'Sarah Musoke',
      contactEmail: 'sarah@techglobal.com'
    },
    items: [
      { id: 7, itemName: 'Network Switches', quantity: 15, totalValue: '25000000' },
      { id: 8, itemName: 'Ethernet Cables', quantity: 500, totalValue: '5000000' }
    ],
    status: 'sent',
    orderStatus: 'sent',
    progress: 40,
    createdAt: '2024-01-25T08:45:00.000Z',
    updatedAt: '2024-01-29T10:00:00.000Z'
  },
  {
    importNumber: 'IMP-2024-005',
    importerDetails: {
      companyName: 'Kampala Electronics',
      contactPerson: 'David Mukasa',
      contactEmail: 'david@kampalaelec.com'
    },
    items: [
      { id: 9, itemName: 'LED TVs', quantity: 25, totalValue: '35000000' },
      { id: 10, itemName: 'Sound Systems', quantity: 40, totalValue: '12000000' }
    ],
    status: 'draft',
    orderStatus: 'draft',
    progress: 20,
    createdAt: '2024-01-28T11:30:00.000Z',
    updatedAt: '2024-01-29T09:30:00.000Z'
  },
  {
    importNumber: 'IMP-2024-006',
    importerDetails: {
      companyName: 'Nile Logistics Ltd',
      contactPerson: 'Grace Nalwoga',
      contactEmail: 'grace@nilelogistics.com'
    },
    items: [
      { id: 11, itemName: 'Shipping Containers', quantity: 10, totalValue: '60000000' },
      { id: 12, itemName: 'Pallet Jacks', quantity: 20, totalValue: '8000000' }
    ],
    status: 'review',
    orderStatus: 'review',
    progress: 45,
    createdAt: '2024-01-26T13:20:00.000Z',
    updatedAt: '2024-01-30T14:00:00.000Z'
  }
];

const MyImports = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const [imports, setImports] = useState([]);
  const [filteredImports, setFilteredImports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

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

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent to Supplier' },
    { value: 'review', label: 'Under Review' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'finalized', label: 'Finalized' },
    { value: 'complete', label: 'Complete' },
  ];

  // Load imports from localStorage or use dummy data
  useEffect(() => {
    loadImports();
  }, []);

  const loadImports = () => {
    setIsLoading(true);
    try {
      const savedImports = JSON.parse(localStorage.getItem('allImports') || '[]');
      const draft = JSON.parse(localStorage.getItem('importDraft') || 'null');
      
      let allImports = [...savedImports];
      
      if (allImports.length === 0) {
        allImports = DUMMY_IMPORTS;
        localStorage.setItem('allImports', JSON.stringify(allImports));
      }
      
      if (draft && !allImports.some(imp => imp.importNumber === draft.importNumber)) {
        allImports.unshift(draft);
      }
      
      setImports(allImports);
      setFilteredImports(allImports);
    } catch (e) {
      console.error('Error loading imports:', e);
      setImports(DUMMY_IMPORTS);
      setFilteredImports(DUMMY_IMPORTS);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    let result = [...imports];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(imp => 
        imp.importNumber?.toLowerCase().includes(term) ||
        imp.importerDetails?.companyName?.toLowerCase().includes(term) ||
        imp.items?.some(item => item.itemName?.toLowerCase().includes(term))
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(imp => imp.status === statusFilter || imp.orderStatus === statusFilter);
    }
    
    result.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      
      if (sortField === 'createdAt' || sortField === 'updatedAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      
      if (sortField === 'items') {
        aVal = (a.items || []).length;
        bVal = (b.items || []).length;
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredImports(result);
  }, [imports, searchTerm, statusFilter, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleDropdown = (importNumber) => {
    setExpandedRows(prev => ({
      ...prev,
      [importNumber]: !prev[importNumber]
    }));
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

  // ORIGINAL progress steps with dots and lines - KEEPING THIS DESIGN
  const getProgressSteps = (status) => {
    const steps = [
      { label: 'Preparation', completed: true },
      { label: 'Review', completed: status !== 'draft' },
      { label: 'Sent', completed: ['sent', 'review', 'confirmed', 'finalized', 'complete'].includes(status) },
      { label: 'Confirmed', completed: ['confirmed', 'finalized', 'complete'].includes(status) },
      { label: 'Finalized', completed: ['finalized', 'complete'].includes(status) },
    ];
    return steps;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'UGX 0';
    return `UGX ${Number(amount).toLocaleString()}`;
  };

  const handleContinueImport = (importData) => {
    localStorage.setItem('importDraft', JSON.stringify(importData));
    navigate('/new-import');
  };

  const handleDeleteImport = (importNumber) => {
    if (window.confirm('Are you sure you want to delete this import?')) {
      const updatedImports = imports.filter(imp => imp.importNumber !== importNumber);
      setImports(updatedImports);
      localStorage.setItem('allImports', JSON.stringify(updatedImports));
      
      const draft = JSON.parse(localStorage.getItem('importDraft') || 'null');
      if (draft && draft.importNumber === importNumber) {
        localStorage.removeItem('importDraft');
      }
      
      showToast('Import deleted successfully', 'success');
    }
  };

  const handleExportImport = (importData) => {
    const dataStr = JSON.stringify(importData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `import_${importData.importNumber || 'draft'}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Export successful!', 'success');
  };

  // Navigate to import details when clicking the row
  const handleRowClick = (imp) => {
    navigate(`/import-details/${imp.importNumber || 'draft'}`, { state: { importData: imp } });
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

  // Render items dropdown content
  const renderItemsDropdown = (items, importNumber) => {
    if (!items || items.length === 0) {
      return (
        <div className={`p-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No items in this import</p>
        </div>
      );
    }

    const totalValue = items.reduce((sum, item) => sum + (parseFloat(item.totalValue) || 0), 0);

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Items List ({items.length})
          </h4>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Total: {formatCurrency(totalValue)}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-3 py-2 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  #
                </th>
                <th className={`px-3 py-2 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Item Name
                </th>
                <th className={`px-3 py-2 text-right text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Quantity
                </th>
                <th className={`px-3 py-2 text-right text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Total Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              {items.map((item, index) => (
                <tr key={item.id || index} className={isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}>
                  <td className={`px-3 py-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {index + 1}
                  </td>
                  <td className={`px-3 py-2 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.itemName || 'Unnamed Item'}
                  </td>
                  <td className={`px-3 py-2 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.quantity || 0}
                  </td>
                  <td className={`px-3 py-2 text-right font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(item.totalValue)}
                  </td>
                </tr>
              ))}
              <tr className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <td colSpan="2" className={`px-3 py-2 text-right font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Total
                </td>
                <td className={`px-3 py-2 text-right font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0)}
                </td>
                <td className={`px-3 py-2 text-right font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(totalValue)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/importer-dashboard')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Imports
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {filteredImports.length} import(s) found
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('importDraft');
              navigate('/new-import');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus className="w-4 h-4" />
            New Import
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{imports.length}</p>
              </div>
              <ShoppingCart className="w-8 h-8" style={{ color: colors.primary }} />
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Progress</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {imports.filter(i => i.status !== 'complete').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Awaiting Confirmation</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {imports.filter(i => i.status === 'sent' || i.status === 'review').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {imports.filter(i => i.status === 'complete').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-lg border" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by import number, company, or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            style={{ focusRingColor: colors.primary }}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button
            onClick={loadImports}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
              color: colors.primary
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Imports Table */}
        <div className={`rounded-lg border overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSort('importNumber')}
                  >
                    <div className="flex items-center gap-1">
                      Import #
                      {sortField === 'importNumber' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium">Items</th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center gap-1">
                      Created
                      {sortField === 'createdAt' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium">Progress</th>
                  <th className="px-4 py-3 text-left text-xs font-medium">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center">
                      <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-gray-400" />
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading imports...</p>
                    </td>
                  </tr>
                ) : filteredImports.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center">
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-50" style={{ color: colors.primary }} />
                      <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        No imports found
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Start your first import today!'}
                      </p>
                      {!searchTerm && statusFilter === 'all' && (
                        <button
                          onClick={() => {
                            localStorage.removeItem('importDraft');
                            navigate('/new-import');
                          }}
                          className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Plus className="w-4 h-4 inline mr-2" />
                          New Import
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredImports.map((imp) => {
                    const status = imp.orderStatus || imp.status || 'draft';
                    const itemCount = (imp.items || []).length;
                    const progress = imp.progress || 0;
                    const isExpanded = expandedRows[imp.importNumber] || false;
                    const isComplete = status === 'complete' || status === 'finalized';
                    
                    return (
                      <React.Fragment key={imp.importNumber || imp.id || Math.random()}>
                        {/* Main row - clickable to view details */}
                        <tr 
                          className={`${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors cursor-pointer ${isExpanded ? (isDark ? 'bg-gray-700' : 'bg-gray-50') : ''}`}
                          onClick={() => handleRowClick(imp)}
                        >
                          <td className="px-4 py-3">
                            <div className="font-medium">{imp.importNumber || 'Draft'}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {imp.importerDetails?.companyName || 'Unknown Company'}
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {imp.importerDetails?.contactPerson || ''}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent row click
                                toggleDropdown(imp.importNumber);
                              }}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md ${
                                isExpanded 
                                  ? 'text-white' 
                                  : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                              }`}
                              style={{
                                backgroundColor: isExpanded ? colors.primary : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')
                              }}
                            >
                              <Package className="w-4 h-4" />
                              <span>{itemCount} item(s)</span>
                              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {formatDate(imp.createdAt)}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {/* ORIGINAL PROGRESS DESIGN WITH DOTS AND LINES */}
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ 
                                    width: `${progress}%`,
                                    backgroundColor: progress === 100 ? colors.success : colors.primary
                                  }}
                                />
                              </div>
                              <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {progress}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {getProgressSteps(status).map((step, idx) => (
                                <div key={idx} className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                                  {idx < 4 && (
                                    <div className={`w-4 h-0.5 ${step.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(status)}`}>
                              {getStatusIcon(status)}
                              {getStatusDisplay(status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              {/* Continue button - only show if not complete */}
                              {!isComplete && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleContinueImport(imp);
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                  title="Continue Import"
                                >
                                  <PenSquare className="w-4 h-4" style={{ color: colors.primary }} />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleExportImport(imp);
                                }}
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                title="Export"
                              >
                                <Download className="w-4 h-4 text-gray-500" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteImport(imp.importNumber);
                                }}
                                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded items dropdown row */}
                        {isExpanded && (
                          <tr>
                            <td colSpan="7" className="px-4 py-2">
                              <div className={`rounded-lg border ${isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                                {renderItemsDropdown(imp.items, imp.importNumber)}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyImports;