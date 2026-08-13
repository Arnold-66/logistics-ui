// roles/exporter/ExporterOrders.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Package,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  RefreshCw,
  Calendar,
  Building,
  FileText,
  ArrowLeft,
  Ship,
  DollarSign,
  X,
  Info,
  Users,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  Send,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Edit2,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Check as CheckIcon,
  X as XIcon,
  PlayCircle,
  RotateCcw,
  TrendingUp
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

// Generate dummy orders from importers
const generateDummyOrders = () => {
  const importers = [
    { 
      id: 'IMP-001', 
      name: 'TechGlobal Imports Ltd', 
      country: 'Uganda', 
      contactPerson: 'John Doe', 
      email: 'john@techglobal.com', 
      phone: '+256 712 345 678', 
      address: 'Plot 45, Industrial Area, Kampala',
      registrationNumber: 'REG-2024-001',
      tinNumber: 'TIN-123456789'
    },
    { 
      id: 'IMP-002', 
      name: 'East African Importers', 
      country: 'Kenya', 
      contactPerson: 'Sarah Kamau', 
      email: 'sarah@eaimporters.com', 
      phone: '+254 722 345 678', 
      address: '123 Trade Center, Nairobi',
      registrationNumber: 'REG-2024-002',
      tinNumber: 'TIN-987654321'
    },
    { 
      id: 'IMP-003', 
      name: 'Kampala Import Distributors', 
      country: 'Rwanda', 
      contactPerson: 'Peter Habimana', 
      email: 'peter@kampalaimports.com', 
      phone: '+250 788 345 678', 
      address: '45, Kigali',
      registrationNumber: 'REG-2024-003',
      tinNumber: 'TIN-456789123'
    },
    { 
      id: 'IMP-004', 
      name: 'Nile Imports Ltd', 
      country: 'Uganda', 
      contactPerson: 'Jane Akello', 
      email: 'jane@nileimports.com', 
      phone: '+256 700 123 456', 
      address: 'Plot 12, Jinja Road',
      registrationNumber: 'REG-2024-004',
      tinNumber: 'TIN-321654987'
    }
  ];

  const items = [
    { name: 'Laptop Computers', hsCode: '8471.30', unit: 'pcs' },
    { name: 'Desktop Monitors', hsCode: '8528.52', unit: 'pcs' },
    { name: 'Office Chairs', hsCode: '9401.31', unit: 'pcs' },
    { name: 'Desk Tables', hsCode: '9403.30', unit: 'pcs' },
    { name: 'Samsung Phones', hsCode: '8517.12', unit: 'pcs' },
    { name: 'Phone Accessories', hsCode: '8517.70', unit: 'pcs' },
    { name: 'Medical Supplies', hsCode: '9018.90', unit: 'kg' },
    { name: 'Agricultural Equipment', hsCode: '8432.10', unit: 'pcs' },
    { name: 'Construction Materials', hsCode: '6810.11', unit: 'tons' },
    { name: 'Textile Products', hsCode: '5208.11', unit: 'm' }
  ];
  
  const orders = [];
  
  // Generate 5 NEW orders
  for (let i = 0; i < 5; i++) {
    const importer = importers[Math.floor(Math.random() * importers.length)];
    const numItems = Math.floor(Math.random() * 3) + 1;
    const orderItems = [];
    let totalQuantity = 0;
    
    for (let j = 0; j < numItems; j++) {
      const item = items[Math.floor(Math.random() * items.length)];
      const quantity = Math.floor(Math.random() * 300 + 50);
      const unitPrice = Math.floor(Math.random() * 400000 + 100000);
      const itemValue = quantity * unitPrice;
      totalQuantity += quantity;
      
      orderItems.push({
        id: `ITEM-${Date.now()}-${j}-${i}`,
        description: item.name,
        hsCode: item.hsCode,
        quantity: quantity,
        unit: item.unit,
        unitPrice: unitPrice,
        totalValue: itemValue,
        weight: quantity * Math.floor(Math.random() * 5 + 1),
        dimensions: `${Math.floor(Math.random() * 100 + 10)}x${Math.floor(Math.random() * 100 + 10)}x${Math.floor(Math.random() * 100 + 10)} cm`
      });
    }
    
    const totalValue = orderItems.reduce((sum, item) => sum + item.totalValue, 0);
    const createdAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    
    orders.push({
      id: `ORD-${String(2026).slice(2)}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      importer: importer,
      items: orderItems,
      totalValue: totalValue,
      totalQuantity: totalQuantity,
      status: 'new',
      progress: 0,
      createdAt: createdAt.toISOString(),
      specialInstructions: Math.random() > 0.7 ? 'Please ensure all items are properly packaged for sea freight.' : '',
      response: null
    });
  }

  // Generate 5 PROCESSING orders
  for (let i = 0; i < 5; i++) {
    const importer = importers[Math.floor(Math.random() * importers.length)];
    const numItems = Math.floor(Math.random() * 3) + 1;
    const orderItems = [];
    let totalQuantity = 0;
    
    for (let j = 0; j < numItems; j++) {
      const item = items[Math.floor(Math.random() * items.length)];
      const quantity = Math.floor(Math.random() * 300 + 50);
      const unitPrice = Math.floor(Math.random() * 400000 + 100000);
      const itemValue = quantity * unitPrice;
      totalQuantity += quantity;
      
      orderItems.push({
        id: `ITEM-${Date.now()}-${j}-${i}`,
        description: item.name,
        hsCode: item.hsCode,
        quantity: quantity,
        unit: item.unit,
        unitPrice: unitPrice,
        totalValue: itemValue,
        weight: quantity * Math.floor(Math.random() * 5 + 1),
        dimensions: `${Math.floor(Math.random() * 100 + 10)}x${Math.floor(Math.random() * 100 + 10)}x${Math.floor(Math.random() * 100 + 10)} cm`
      });
    }
    
    const totalValue = orderItems.reduce((sum, item) => sum + item.totalValue, 0);
    const createdAt = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000);
    const progress = Math.floor(Math.random() * 60) + 20; // 20-80% progress
    
    orders.push({
      id: `ORD-${String(2026).slice(2)}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      importer: importer,
      items: orderItems,
      totalValue: totalValue,
      totalQuantity: totalQuantity,
      status: 'processing',
      progress: progress,
      createdAt: createdAt.toISOString(),
      specialInstructions: Math.random() > 0.7 ? 'Please ensure all items are properly packaged for sea freight.' : '',
      response: {
        action: 'accepted',
        notes: 'Order accepted and being processed',
        date: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      processingSteps: {
        pvocSubmitted: Math.random() > 0.5,
        cocSubmitted: Math.random() > 0.5,
        packingListSubmitted: Math.random() > 0.5,
        bolSubmitted: Math.random() > 0.5,
        freightAssigned: Math.random() > 0.6,
        invoiceSent: Math.random() > 0.6,
        paymentReceived: Math.random() > 0.7
      }
    });
  }

  // Generate 5 COMPLETED orders
  for (let i = 0; i < 5; i++) {
    const importer = importers[Math.floor(Math.random() * importers.length)];
    const numItems = Math.floor(Math.random() * 3) + 1;
    const orderItems = [];
    let totalQuantity = 0;
    
    for (let j = 0; j < numItems; j++) {
      const item = items[Math.floor(Math.random() * items.length)];
      const quantity = Math.floor(Math.random() * 300 + 50);
      const unitPrice = Math.floor(Math.random() * 400000 + 100000);
      const itemValue = quantity * unitPrice;
      totalQuantity += quantity;
      
      orderItems.push({
        id: `ITEM-${Date.now()}-${j}-${i}`,
        description: item.name,
        hsCode: item.hsCode,
        quantity: quantity,
        unit: item.unit,
        unitPrice: unitPrice,
        totalValue: itemValue,
        weight: quantity * Math.floor(Math.random() * 5 + 1),
        dimensions: `${Math.floor(Math.random() * 100 + 10)}x${Math.floor(Math.random() * 100 + 10)}x${Math.floor(Math.random() * 100 + 10)} cm`
      });
    }
    
    const totalValue = orderItems.reduce((sum, item) => sum + item.totalValue, 0);
    const createdAt = new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000);
    
    orders.push({
      id: `ORD-${String(2026).slice(2)}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      importer: importer,
      items: orderItems,
      totalValue: totalValue,
      totalQuantity: totalQuantity,
      status: 'completed',
      progress: 100,
      createdAt: createdAt.toISOString(),
      specialInstructions: Math.random() > 0.7 ? 'Please ensure all items are properly packaged for sea freight.' : '',
      response: {
        action: 'completed',
        notes: 'Order completed successfully',
        date: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      completedDate: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return orders;
};

const ExporterOrders = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [importerFilter, setImporterFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [toast, setToast] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reasonText, setReasonText] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

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
  const userCompany = user?.companyName || user?.company || '';

  // FIXED: Always generate fresh dummy data
  useEffect(() => {
    // Always generate fresh dummy data on mount
    const dummyData = generateDummyOrders();
    localStorage.setItem('exporterOrders', JSON.stringify(dummyData));
    setOrders(dummyData);
    setFilteredOrders(dummyData);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...orders];
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.importer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.importer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items?.some(item => item.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    if (importerFilter !== 'all') {
      filtered = filtered.filter(order => order.importer?.name === importerFilter);
    }
    
    if (dateRange.start) {
      filtered = filtered.filter(order => new Date(order.createdAt) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(order => new Date(order.createdAt) <= new Date(dateRange.end));
    }
    
    filtered.sort((a, b) => {
      let valA, valB;
      
      switch(sortBy) {
        case 'date':
          valA = new Date(a.createdAt || 0);
          valB = new Date(b.createdAt || 0);
          break;
        case 'importer':
          valA = (a.importer?.name || '').toLowerCase();
          valB = (b.importer?.name || '').toLowerCase();
          break;
        case 'status':
          valA = a.status || '';
          valB = b.status || '';
          break;
        case 'value':
          valA = a.totalValue || 0;
          valB = b.totalValue || 0;
          break;
        case 'progress':
          valA = a.progress || 0;
          valB = b.progress || 0;
          break;
        default:
          valA = new Date(a.createdAt || 0);
          valB = new Date(b.createdAt || 0);
      }
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, importerFilter, dateRange, orders, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusConfig = (status) => {
    const configs = {
      new: {
        bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-200',
        darkBg: 'dark:from-blue-900/20 dark:to-blue-800/20',
        darkText: 'dark:text-blue-400',
        darkBorder: 'dark:border-blue-800',
        icon: <Clock className="w-4 h-4" />,
        label: 'New Order',
        dotColor: '#3b82f6'
      },
      processing: {
        bg: 'bg-gradient-to-r from-amber-50 to-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-200',
        darkBg: 'dark:from-amber-900/20 dark:to-amber-800/20',
        darkText: 'dark:text-amber-400',
        darkBorder: 'dark:border-amber-800',
        icon: <RefreshCw className="w-4 h-4" />,
        label: 'Processing',
        dotColor: '#f59e0b'
      },
      completed: {
        bg: 'bg-gradient-to-r from-emerald-50 to-emerald-100',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        darkBg: 'dark:from-emerald-900/20 dark:to-emerald-800/20',
        darkText: 'dark:text-emerald-400',
        darkBorder: 'dark:border-emerald-800',
        icon: <CheckCircle className="w-4 h-4" />,
        label: 'Completed',
        dotColor: '#10b981'
      }
    };
    return configs[status] || configs.new;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-UG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'UGX 0';
    return `UGX ${Number(amount).toLocaleString()}`;
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    setExpandedItemId(null);
  };

  const toggleItemExpand = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  // Action handlers
  const handleAccept = (order) => {
    setPendingAction({ order, action: 'accept' });
    setReasonText('');
    setShowReasonModal(true);
  };

  const handleReject = (order) => {
    setPendingAction({ order, action: 'reject' });
    setReasonText('');
    setShowReasonModal(true);
  };

  const handleRefer = (order) => {
    setPendingAction({ order, action: 'refer' });
    setReasonText('');
    setShowReasonModal(true);
  };

  const confirmAction = () => {
    if (!pendingAction) return;
    const { order, action } = pendingAction;
    
    let updatedStatus = order.status;
    let actionMessage = '';

    switch(action) {
      case 'accept':
        updatedStatus = 'processing';
        actionMessage = 'accepted and moved to processing';
        break;
      case 'reject':
        updatedStatus = 'completed';
        actionMessage = 'rejected';
        break;
      case 'refer':
        updatedStatus = 'completed';
        actionMessage = 'referred';
        break;
      default:
        return;
    }

    const updatedOrders = orders.map(o => {
      if (o.id === order.id) {
        return {
          ...o,
          status: updatedStatus,
          response: {
            action: action,
            notes: reasonText || (action === 'accept' ? 'Order accepted' : ''),
            date: new Date().toISOString()
          },
          progress: action === 'accept' ? 5 : 100
        };
      }
      return o;
    });

    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    localStorage.setItem('exporterOrders', JSON.stringify(updatedOrders));

    setShowReasonModal(false);
    setPendingAction(null);
    setReasonText('');

    showToast(`Order ${order.id} ${actionMessage}!`, 
              action === 'accept' ? 'success' : 'info');

    if (action === 'accept') {
      setTimeout(() => {
        const orderData = updatedOrders.find(o => o.id === order.id);
        if (orderData) {
          navigate('/exporter/new-export', { 
            state: { 
              requestData: {
                id: orderData.id,
                importerName: orderData.importer?.name || '',
                importerEmail: orderData.importer?.email || '',
                importerId: orderData.importer?.id || '',
                items: orderData.items.map(item => ({
                  id: item.id,
                  itemName: item.description,
                  quantity: item.quantity,
                  unitPrice: item.unitPrice,
                  totalValue: item.totalValue,
                  hsCode: item.hsCode,
                  unit: item.unit,
                  weight: item.weight,
                  dimensions: item.dimensions
                })),
                notes: orderData.specialInstructions || '',
                requestDate: orderData.createdAt
              }
            } 
          });
        }
      }, 500);
    }
  };

  const handleProcessOrder = (order) => {
    navigate('/exporter/new-export', { 
      state: { 
        requestData: {
          id: order.id,
          importerName: order.importer?.name || '',
          importerEmail: order.importer?.email || '',
          importerId: order.importer?.id || '',
          items: order.items.map(item => ({
            id: item.id,
            itemName: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalValue: item.totalValue,
            hsCode: item.hsCode,
            unit: item.unit,
            weight: item.weight,
            dimensions: item.dimensions
          })),
          notes: order.specialInstructions || '',
          requestDate: order.createdAt
        }
      } 
    });
  };

  const handleMarkComplete = (order) => {
    const updatedOrders = orders.map(o => {
      if (o.id === order.id) {
        return { 
          ...o, 
          status: 'completed',
          completedDate: new Date().toISOString(),
          progress: 100,
          response: {
            action: 'completed',
            notes: 'Order completed successfully',
            date: new Date().toISOString()
          }
        };
      }
      return o;
    });
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    localStorage.setItem('exporterOrders', JSON.stringify(updatedOrders));
    showToast(`Order ${order.id} marked as completed!`, 'success');
  };

  const Toast = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-rose-500' : 'bg-blue-500';
    const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                  type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
                  <Info className="w-5 h-5" />;

    return (
      <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white ${bgColor} animate-slide-in`}>
        {icon}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Action Buttons Component
  const ActionButtons = ({ order }) => {
    if (order.status === 'new') {
      return (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleAccept(order)}
            className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
            title="Accept Order"
          >
            <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </button>
          <button
            onClick={() => handleReject(order)}
            className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40"
            title="Reject Order"
          >
            <XIcon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </button>
          <button
            onClick={() => handleRefer(order)}
            className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40"
            title="Refer Order"
          >
            <Flag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
      );
    } else if (order.status === 'processing') {
      return (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleProcessOrder(order)}
            className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: 'rgba(113, 75, 103, 0.15)' }}
            title="Process Order"
          >
            <PlayCircle className="w-4 h-4" style={{ color: colors.primary }} />
          </button>
          <button
            onClick={() => handleMarkComplete(order)}
            className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
            title="Mark Complete"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </button>
        </div>
      );
    } else if (order.status === 'completed') {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          <CheckCircle className="w-3.5 h-3.5" />
          Done
        </div>
      );
    }
    return null;
  };

  // Reason Modal
  const ReasonModal = () => {
    if (!showReasonModal || !pendingAction) return null;

    const { action } = pendingAction;
    const isAccept = action === 'accept';
    const isReject = action === 'reject';
    const isRefer = action === 'refer';

    const modalConfig = {
      accept: {
        title: 'Accept Order',
        icon: <CheckIcon className="w-6 h-6 text-emerald-500" />,
        buttonLabel: 'Accept & Process',
        buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
        placeholder: 'Add any confirmation notes (optional)...'
      },
      reject: {
        title: 'Reject Order',
        icon: <XIcon className="w-6 h-6 text-rose-500" />,
        buttonLabel: 'Reject Order',
        buttonColor: 'bg-rose-500 hover:bg-rose-600',
        placeholder: 'Please provide reason for rejection *'
      },
      refer: {
        title: 'Refer Order',
        icon: <Flag className="w-6 h-6 text-purple-500" />,
        buttonLabel: 'Refer Order',
        buttonColor: 'bg-purple-500 hover:bg-purple-600',
        placeholder: 'Please provide referral details *'
      }
    };

    const config = modalConfig[action] || modalConfig.accept;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
           onClick={() => setShowReasonModal(false)}>
        <div
          className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} bg-gradient-to-r from-${isAccept ? 'emerald' : isReject ? 'rose' : 'purple'}-50 to-${isAccept ? 'emerald' : isReject ? 'rose' : 'purple'}-100 dark:from-${isAccept ? 'emerald' : isReject ? 'rose' : 'purple'}-900/20 dark:to-${isAccept ? 'emerald' : isReject ? 'rose' : 'purple'}-800/20`}>
            <div className="flex items-center gap-3">
              {config.icon}
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {config.title}
              </h3>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-4">
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {isAccept 
                  ? `You are about to accept order ${pendingAction.order.id} from ${pendingAction.order.importer?.name}.`
                  : isReject
                  ? `You are about to reject order ${pendingAction.order.id} from ${pendingAction.order.importer?.name}.`
                  : `You are about to refer order ${pendingAction.order.id} from ${pendingAction.order.importer?.name}.`}
              </p>
              <div className={`mt-3 p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Order ID</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{pendingAction.order.id}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Items</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{pendingAction.order.items?.length || 0}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Total Value</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(pendingAction.order.totalValue)}</span>
                </div>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {isAccept ? '📝 Notes (Optional)' : '📝 Reason *'}
              </label>
              <textarea
                value={reasonText}
                onChange={(e) => setReasonText(e.target.value)}
                rows="3"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                }`}
                style={{ focusRingColor: colors.primary }}
                placeholder={config.placeholder}
              />
              {!isAccept && (
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  ⚠️ Required field
                </p>
              )}
            </div>
          </div>

          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex gap-3`}>
            <button
              onClick={() => {
                setShowReasonModal(false);
                setPendingAction(null);
                setReasonText('');
              }}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmAction}
              disabled={!isAccept && !reasonText.trim()}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 ${config.buttonColor}`}
            >
              {isAccept ? <CheckIcon className="w-4 h-4" /> :
               isReject ? <XIcon className="w-4 h-4" /> :
               <Flag className="w-4 h-4" />}
              {config.buttonLabel}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render order table section
  const renderOrderSection = (title, status, icon, bgColor) => {
    const sectionOrders = filteredOrders.filter(o => o.status === status);
    
    if (sectionOrders.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className={`p-2 rounded-lg ${bgColor}`}>
            {icon}
          </div>
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
            {sectionOrders.length}
          </span>
        </div>

        <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Importer</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Items</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Total Value</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Actions</th>
                  <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {sectionOrders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <React.Fragment key={order.id}>
                      <tr 
                        className={`cursor-pointer transition-all duration-200 ${
                          isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                        } ${isExpanded ? (isDark ? 'bg-gray-700' : 'bg-purple-50') : ''}`}
                      >
                        <td className="py-3 px-4" onClick={() => toggleOrderExpand(order.id)}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                              <Package className="w-3 h-3" style={{ color: colors.primary }} />
                            </div>
                            <span className={`font-mono text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {order.id}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4" onClick={() => toggleOrderExpand(order.id)}>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" style={{ color: colors.primary }} />
                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                              {order.importer?.name || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4" onClick={() => toggleOrderExpand(order.id)}>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} ${isDark ? statusConfig.darkBg : ''} ${isDark ? statusConfig.darkText : ''} ${isDark ? statusConfig.darkBorder : ''}`}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusConfig.dotColor }} />
                            {statusConfig.icon}
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-3 px-4" onClick={() => toggleOrderExpand(order.id)}>
                          <span className={isDark ? 'text-white' : 'text-gray-900'}>
                            {order.items?.length || 0}
                          </span>
                        </td>
                        <td className="py-3 px-4" onClick={() => toggleOrderExpand(order.id)}>
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {formatCurrency(order.totalValue)}
                          </span>
                        </td>
                        <td className="py-3 px-4" onClick={() => toggleOrderExpand(order.id)}>
                          {order.status === 'processing' ? (
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ 
                                    width: `${order.progress || 0}%`,
                                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.success})`
                                  }}
                                />
                              </div>
                              <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {order.progress || 0}%
                              </span>
                            </div>
                          ) : order.status === 'completed' ? (
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              100%
                            </span>
                          ) : (
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              -
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <ActionButtons order={order} />
                        </td>
                        <td className="py-3 px-4" onClick={() => toggleOrderExpand(order.id)}>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatDate(order.createdAt)}
                          </span>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="border-0">
                          <td colSpan="8" className="p-0">
                            <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50/80'} rounded-b-xl`}>
                              {/* Order Details Summary */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order Date</p>
                                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {formatDate(order.createdAt)}
                                  </p>
                                </div>
                                <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Items</p>
                                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {order.items?.length || 0}
                                  </p>
                                </div>
                                <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Quantity</p>
                                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {order.totalQuantity || order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
                                  </p>
                                </div>
                                <div className={`p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</p>
                                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {formatCurrency(order.totalValue)}
                                  </p>
                                </div>
                              </div>

                              {/* Items Table */}
                              <div>
                                <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  <Package className="w-4 h-4" style={{ color: colors.primary }} />
                                  Order Items ({order.items?.length || 0})
                                </h4>
                                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                                  <table className="w-full text-sm">
                                    <thead className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                                      <tr>
                                        <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700 dark:text-gray-300">Item</th>
                                        <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700 dark:text-gray-300">HS Code</th>
                                        <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700 dark:text-gray-300">Qty</th>
                                        <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700 dark:text-gray-300">Unit Price</th>
                                        <th className="text-left py-2 px-3 font-semibold text-xs text-gray-700 dark:text-gray-300">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                      {(order.items || []).map((item, idx) => (
                                        <tr key={item.id || idx} className={`${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors`}>
                                          <td className="py-2 px-3">
                                            <div className="flex items-center gap-2">
                                              <Package className="w-3 h-3" style={{ color: colors.primary }} />
                                              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                                {item.description}
                                              </span>
                                            </div>
                                          </td>
                                          <td className="py-2 px-3">
                                            <span className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                              {item.hsCode || 'N/A'}
                                            </span>
                                          </td>
                                          <td className="py-2 px-3">
                                            <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                              {item.quantity} {item.unit || ''}
                                            </span>
                                          </td>
                                          <td className="py-2 px-3">
                                            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                              {formatCurrency(item.unitPrice)}
                                            </span>
                                          </td>
                                          <td className="py-2 px-3">
                                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                              {formatCurrency(item.totalValue)}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                                      <tr>
                                        <td colSpan="3" className="py-2 px-3 text-right font-semibold text-sm">Total:</td>
                                        <td className="py-2 px-3 font-bold text-sm" style={{ color: colors.primary }}>
                                          {formatCurrency(order.totalValue)}
                                        </td>
                                        <td></td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const stats = {
    total: orders.length,
    newOrders: orders.filter(o => o.status === 'new').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <ReasonModal />

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
            <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
              Import Orders
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Orders received from importers • {orders.length} total orders
            </p>
            {user && (
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                <Building className="w-3 h-3 inline mr-1" />
                {user.companyName || userCompany || 'Your Company'}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              const dummyData = generateDummyOrders();
              localStorage.setItem('exporterOrders', JSON.stringify(dummyData));
              setOrders(dummyData);
              setFilteredOrders(dummyData);
              showToast('Orders refreshed', 'success');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
              isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Orders
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-blue-600 dark:text-blue-400`}>New</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.newOrders}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-amber-600 dark:text-amber-400`}>Processing</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{stats.processing}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-emerald-600 dark:text-emerald-400`}>Completed</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{stats.completed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-xl p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Status</option>
              <option value="new">New Orders</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={importerFilter}
              onChange={(e) => setImporterFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Importers</option>
              {[...new Set(orders.map(o => o.importer?.name).filter(Boolean))].map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className={`px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              style={{ focusRingColor: colors.primary }}
              placeholder="From"
            />
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sort by:</span>
          {[
            { field: 'date', icon: Calendar, label: 'Date' },
            { field: 'importer', icon: Building, label: 'Importer' },
            { field: 'status', icon: CheckCircle, label: 'Status' },
            { field: 'value', icon: DollarSign, label: 'Value' },
            { field: 'progress', icon: TrendingUp, label: 'Progress' }
          ].map(({ field, icon: Icon, label }) => (
            <button
              key={field}
              onClick={() => handleSort(field)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                sortBy === field 
                  ? (isDark ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700') 
                  : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')
              }`}
            >
              <Icon className="w-3 h-3" />
              {label}
              {sortBy === field && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
            </button>
          ))}
          <span className={`ml-auto text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {filteredOrders.length} orders
          </span>
        </div>

        {/* Orders Sections */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin" style={{ color: colors.primary }} />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Orders Found
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {orders.length === 0 ? "You haven't received any orders yet." : "No orders match your filters."}
            </p>
          </div>
        ) : (
          <>
            {/* New Orders Section */}
            {renderOrderSection(
              'New Orders',
              'new',
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
              'bg-blue-50 dark:bg-blue-900/20'
            )}

            {/* Processing Orders Section */}
            {renderOrderSection(
              'Processing Orders',
              'processing',
              <RefreshCw className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
              'bg-amber-50 dark:bg-amber-900/20'
            )}

            {/* Completed Orders Section */}
            {renderOrderSection(
              'Completed Orders',
              'completed',
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
              'bg-emerald-50 dark:bg-emerald-900/20'
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExporterOrders;