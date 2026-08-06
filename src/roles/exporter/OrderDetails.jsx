// roles/exporter/OrderDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  ArrowLeft,
  Building,
  Package,
  FileText,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  FileSignature,
  Truck,
  Ship,
  DollarSign,
  Download,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Info,
  Users,
  X,
  RefreshCw,
  Send
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useParams } from 'react-router-dom';
import DocumentViewer from '../../components/DocumentViewer';

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [toast, setToast] = useState(null);

  const colors = {
    primary: '#714b67',
    primaryLight: '#8a5f7e',
    primaryDark: '#5a3a52',
    primaryBg: '#f5f0f4',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const isDark = darkMode;

  const statusFlow = ['received', 'in_progress', 'ready_for_shipment', 'shipped', 'delivered'];

  useEffect(() => {
    loadOrderDetails();
  }, [id]);

  const loadOrderDetails = () => {
    setLoading(true);
    setTimeout(() => {
      const allOrders = JSON.parse(localStorage.getItem('exporterOrders') || '[]');
      const found = allOrders.find(o => o.id === id);
      if (found) {
        setOrder(found);
      } else {
        // Generate dummy order for demo
        const dummyOrder = generateDummyOrder(id);
        setOrder(dummyOrder);
      }
      setLoading(false);
    }, 500);
  };

  const generateDummyOrder = (orderId) => {
    const importer = {
      id: 'IMP-001',
      name: 'ImportFlow Ltd',
      country: 'Uganda',
      contactPerson: 'John Doe',
      email: 'john@importflow.com',
      phone: '+256 712 345 678',
      address: 'Plot 45, Industrial Area, Kampala'
    };
    
    const items = [
      {
        id: 'ITEM-1',
        description: 'Electronics Components',
        quantity: 450,
        unit: 'pcs',
        unitPrice: 468750,
        totalValue: 210937500,
        hsCode: '8471.50',
        commercialInvoice: {
          invoiceNumber: 'INV-00458',
          invoiceDate: '2026-07-15',
          supplierName: 'ImportFlow Ltd',
          supplierAddress: 'Plot 45, Industrial Area, Kampala',
          subtotal: 210937500,
          totalAmount: 210937500,
          uploadedDocuments: [
            { id: 'DOC-1', name: 'Commercial Invoice - Electronics Components', type: 'application/pdf', size: '2.3 MB', uploadDate: new Date().toISOString() }
          ]
        },
        salesContract: {
          contractNumber: 'CTR-00458',
          contractDate: '2026-07-10',
          buyerName: 'ImportFlow Ltd',
          sellerName: 'Exporter Co',
          value: 200390625,
          deliveryTerms: 'FOB',
          uploadedDocuments: [
            { id: 'DOC-2', name: 'Sales Contract - Electronics Components', type: 'application/pdf', size: '1.8 MB', uploadDate: new Date().toISOString() }
          ]
        },
        unbsCoc: {
          certificateNumber: 'COC-00458',
          issueDate: '2026-07-20',
          expiryDate: '2027-01-20',
          status: 'approved',
          uploadedDocuments: [
            { id: 'DOC-3', name: 'UNBS CoC - Electronics Components', type: 'application/pdf', size: '1.2 MB', uploadDate: new Date().toISOString() }
          ]
        },
        unbsPvoc: {
          certificateNumber: 'PVOC-00458',
          issueDate: '2026-07-18',
          expiryDate: '2027-01-18',
          status: 'approved',
          uploadedDocuments: [
            { id: 'DOC-4', name: 'UNBS PVoC - Electronics Components', type: 'application/pdf', size: '1.1 MB', uploadDate: new Date().toISOString() }
          ]
        },
        proofOfPayments: [
          {
            id: 'PAY-1',
            paymentDate: '2026-07-20',
            amount: 105468750,
            method: 'bank_transfer',
            reference: 'REF-00458',
            uploadedDocuments: [
              { id: 'DOC-5', name: 'Payment Receipt - Electronics Components', type: 'image/png', size: '0.8 MB', uploadDate: new Date().toISOString() }
            ]
          }
        ]
      }
    ];

    return {
      id: orderId || 'ORD-20260001',
      orderNumber: orderId || 'ORD-20260001',
      importer: importer,
      items: items,
      totalValue: 210937500,
      status: 'received',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      specialInstructions: 'Please ensure all items are properly packaged for sea freight.',
      declineReason: '',
      documents: {
        packingList: [{ id: 'DOC-pl', name: 'Packing List', type: 'application/pdf', size: '1.5 MB', uploadDate: new Date().toISOString() }],
        certificateOfOrigin: [{ id: 'DOC-co', name: 'Certificate of Origin', type: 'application/pdf', size: '1.3 MB', uploadDate: new Date().toISOString() }],
        billOfLading: []
      }
    };
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusColor = (status) => {
    const colors = {
      received: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      in_progress: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      ready_for_shipment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      shipped: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
      delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      declined: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
  };

  const getStatusIcon = (status) => {
    const icons = {
      received: <Clock className="w-4 h-4" />,
      in_progress: <RefreshCw className="w-4 h-4" />,
      ready_for_shipment: <Package className="w-4 h-4" />,
      shipped: <Ship className="w-4 h-4" />,
      delivered: <CheckCircle className="w-4 h-4" />,
      declined: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const getStatusLabel = (status) => {
    const labels = {
      received: 'Received',
      in_progress: 'In Progress',
      ready_for_shipment: 'Ready for Shipment',
      shipped: 'Shipped',
      delivered: 'Delivered',
      declined: 'Declined'
    };
    return labels[status] || status;
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

  const getDocumentCount = () => {
    if (!order) return 0;
    let count = 0;
    if (order.items) {
      order.items.forEach(item => {
        ['commercialInvoice', 'salesContract', 'unbsCoc', 'unbsPvoc'].forEach(docType => {
          if (item[docType]?.uploadedDocuments) {
            count += item[docType].uploadedDocuments.length;
          }
        });
        if (item.proofOfPayments) {
          item.proofOfPayments.forEach(payment => {
            if (payment.uploadedDocuments) {
              count += payment.uploadedDocuments.length;
            }
          });
        }
      });
    }
    if (order.documents) {
      Object.values(order.documents).forEach(docs => {
        if (docs) count += docs.length;
      });
    }
    return count;
  };

  const getAllDocuments = () => {
    if (!order) return [];
    const documents = [];
    
    if (order.items) {
      order.items.forEach((item, itemIndex) => {
        const docTypes = [
          { key: 'commercialInvoice', label: `Commercial Invoice - ${item.description || `Item ${itemIndex + 1}`}` },
          { key: 'salesContract', label: `Sales Contract - ${item.description || `Item ${itemIndex + 1}`}` },
          { key: 'unbsCoc', label: `UNBS CoC - ${item.description || `Item ${itemIndex + 1}`}` },
          { key: 'unbsPvoc', label: `UNBS PVoC - ${item.description || `Item ${itemIndex + 1}`}` },
        ];
        
        docTypes.forEach(({ key, label }) => {
          if (item[key]?.uploadedDocuments) {
            item[key].uploadedDocuments.forEach(doc => {
              documents.push({
                id: doc.id || `DOC-${Date.now()}-${Math.random()}`,
                name: doc.name || `${label}`,
                type: key,
                documentNumber: item[key]?.invoiceNumber || item[key]?.certificateNumber || doc.id || 'N/A',
                date: doc.uploadDate || order.createdAt,
                size: doc.size || 'N/A',
                status: item[key]?.status || 'Active',
                shipmentId: order.id,
                data: doc.data || null,
                ...doc
              });
            });
          }
        });
        
        if (item.proofOfPayments) {
          item.proofOfPayments.forEach((payment, pIndex) => {
            if (payment.uploadedDocuments) {
              payment.uploadedDocuments.forEach(doc => {
                documents.push({
                  id: doc.id || `DOC-${Date.now()}-${Math.random()}`,
                  name: doc.name || `Payment ${pIndex + 1} - ${item.description || `Item ${itemIndex + 1}`}`,
                  type: 'payment',
                  documentNumber: payment.reference || doc.id || 'N/A',
                  date: payment.paymentDate || doc.uploadDate || order.createdAt,
                  size: doc.size || 'N/A',
                  status: 'Completed',
                  shipmentId: order.id,
                  data: doc.data || null,
                  ...doc
                });
              });
            }
          });
        }
      });
    }
    
    if (order.documents) {
      Object.entries(order.documents).forEach(([key, docs]) => {
        if (docs) {
          docs.forEach(doc => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            documents.push({
              id: doc.id || `DOC-${Date.now()}-${Math.random()}`,
              name: doc.name || `${label}`,
              type: key,
              documentNumber: doc.id || 'N/A',
              date: doc.uploadDate || order.createdAt,
              size: doc.size || 'N/A',
              status: 'Active',
              shipmentId: order.id,
              data: doc.data || null,
              ...doc
            });
          });
        }
      });
    }
    
    return documents;
  };

  const updateOrderStatus = (newStatus) => {
    if (!order) return;
    
    const allOrders = JSON.parse(localStorage.getItem('exporterOrders') || '[]');
    const updatedOrders = allOrders.map(o => 
      o.id === order.id ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o
    );
    localStorage.setItem('exporterOrders', JSON.stringify(updatedOrders));
    setOrder({ ...order, status: newStatus, updatedAt: new Date().toISOString() });
    showToast(`Order status updated to ${getStatusLabel(newStatus)}`, 'success');
  };

  const handleDeclineOrder = () => {
    if (!order || !declineReason.trim()) {
      showToast('Please provide a reason for declining', 'error');
      return;
    }
    
    const allOrders = JSON.parse(localStorage.getItem('exporterOrders') || '[]');
    const updatedOrders = allOrders.map(o => 
      o.id === order.id ? { ...o, status: 'declined', declineReason: declineReason, updatedAt: new Date().toISOString() } : o
    );
    localStorage.setItem('exporterOrders', JSON.stringify(updatedOrders));
    setOrder({ ...order, status: 'declined', declineReason: declineReason, updatedAt: new Date().toISOString() });
    setShowDeclineModal(false);
    setDeclineReason('');
    showToast('Order declined successfully', 'info');
  };

  const handleExecuteOrder = () => {
    if (!order) return;
    
    // Save order data to localStorage for New Export
    const exportData = {
      orderId: order.id,
      importer: order.importer,
      items: order.items,
      documents: order.documents,
      totalValue: order.totalValue,
      specialInstructions: order.specialInstructions
    };
    localStorage.setItem('orderToExecute', JSON.stringify(exportData));
    navigate('/new-export');
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

  const DeclineModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Decline Order
              </h3>
            </div>
            <button
              onClick={() => setShowDeclineModal(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Are you sure you want to decline order <strong>{order?.id}</strong> from {order?.importer?.name}?
            </p>
            
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Reason for declining *
              </label>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                rows="3"
                placeholder="Please provide a reason..."
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeclineModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeclineOrder}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg bg-red-500 hover:bg-red-600"
              >
                Decline Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Order Not Found</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/exporter-orders')}
            className="mt-4 px-4 py-2 rounded-lg text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {showDeclineModal && <DeclineModal />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/exporter-orders')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </button>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {order.id}
              </h1>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {getStatusLabel(order.status)}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              From: {order.importer?.name} • Received: {formatDate(order.createdAt)} • {order.items?.length || 0} items • {getDocumentCount()} documents
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {order.status !== 'declined' && order.status !== 'delivered' && (
              <>
                <button
                  onClick={handleExecuteOrder}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Truck className="w-4 h-4" />
                  Execute Order
                </button>
                <button
                  onClick={() => setShowDeclineModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg bg-red-500 hover:bg-red-600"
                >
                  <XCircle className="w-4 h-4" />
                  Decline
                </button>
              </>
            )}
            <button
              onClick={() => window.print()}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Importer Details */}
            <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Building className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                Importer Details
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company Name</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.importer?.name || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact Person</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.importer?.contactPerson || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.importer?.email || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.importer?.phone || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.importer?.country || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Address</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.importer?.address || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Package className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                Summary
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Items</p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.items?.length || 0}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Documents</p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {getDocumentCount()}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} col-span-2`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</p>
                  <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(order.totalValue)}
                  </p>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Info className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                  Special Instructions
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {order.specialInstructions}
                </p>
              </div>
            )}

            {/* Decline Reason */}
            {order.status === 'declined' && order.declineReason && (
              <div className={`rounded-lg p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800`}>
                <h3 className={`font-semibold mb-2 text-red-600 dark:text-red-400`}>
                  <XCircle className="w-4 h-4 inline mr-2" />
                  Decline Reason
                </h3>
                <p className={`text-sm text-red-700 dark:text-red-300`}>
                  {order.declineReason}
                </p>
              </div>
            )}

            {/* Status Update */}
            {order.status !== 'declined' && order.status !== 'delivered' && (
              <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
                <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <RefreshCw className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                  Update Status
                </h3>
                <div className="flex flex-col gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      if (newStatus !== order.status) {
                        updateOrderStatus(newStatus);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    {statusFlow.map(status => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Current status: {getStatusLabel(order.status)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Package className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                Items ({order.items?.length || 0})
              </h3>
              <div className="space-y-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.description || `Item ${idx + 1}`}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-1 text-sm">
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            Qty: {item.quantity || '0'} {item.unit || ''}
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            HS Code: {item.hsCode || 'N/A'}
                          </span>
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            Value: {formatCurrency(item.totalValue)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Document badges */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.commercialInvoice?.uploadedDocuments?.length > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          Invoice: {item.commercialInvoice.uploadedDocuments.length}
                        </span>
                      )}
                      {item.salesContract?.uploadedDocuments?.length > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                          Contract: {item.salesContract.uploadedDocuments.length}
                        </span>
                      )}
                      {item.unbsCoc?.uploadedDocuments?.length > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          CoC: {item.unbsCoc.uploadedDocuments.length}
                        </span>
                      )}
                      {item.unbsPvoc?.uploadedDocuments?.length > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          PVoC: {item.unbsPvoc.uploadedDocuments.length}
                        </span>
                      )}
                      {item.proofOfPayments?.some(p => p.uploadedDocuments?.length > 0) && (
                        <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          Payments: {item.proofOfPayments.reduce((sum, p) => sum + (p.uploadedDocuments?.length || 0), 0)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <FileText className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                Documents ({getDocumentCount()})
              </h3>
              <DocumentViewer
                documents={getAllDocuments()}
                title={`Documents for ${order.id}`}
                backPath="/exporter-orders"
                shipmentId={order.id}
              />
            </div>

            {/* Total Value */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Total Order Value
                </span>
                <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(order.totalValue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;