// roles/clearingagent/ClearingAgentRequests.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Ship,
  Truck,
  Clock,
  Calendar,
  MapPin,
  AlertCircle,
  FileText,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  FileCheck,
  Anchor,
  Box,
  Navigation,
  Map,
  User,
  ClipboardList,
  Flag,
  CheckSquare,
  XCircle,
  Info,
  Bell,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Building,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  Edit,
  Trash2,
  Printer,
  Share2,
  File,
  Upload,
  Route,
  Compass,
  Warehouse,
  TrendingUp,
  TrendingDown,
  DollarSign as DollarIcon,
  Check,
  Clock as ClockIcon,
  UserCheck,
  UserX,
  AlertTriangle as AlertTriangleIcon,
  MessageSquare,
  CreditCard,
  Map as MapIcon,
  Navigation as NavigationIcon,
  Anchor as AnchorIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Inbox,
  ThumbsUp,
  ThumbsDown,
  Save,
  Flag as FlagIcon,
  Container,
  Ship as ShipIcon,
  MoreVertical,
  List,
  Grid,
  Users,
  Globe as GlobeIcon,
  Weight,
  Ruler,
  Boxes,
  Layers,
  PackageCheck,
  ShoppingBag,
  MoreHorizontal,
  X,
  Send,
  BellRing,
  Check as CheckIcon,
  Ban,
  CornerDownRight,
  Clock as ClockIcon3,
  AlertOctagon,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  ExternalLink as ExternalLinkIcon
} from 'lucide-react';

const ClearingAgentRequests = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [sortBy, setSortBy] = useState('date-desc');
  const [expandedId, setExpandedId] = useState(null);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Modal states
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [notifyRecipient, setNotifyRecipient] = useState('');

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

  // Tab configuration
  const tabs = [
    { id: 'pending', label: 'New Requests', icon: Inbox, color: colors.warning },
    { id: 'accepted', label: 'Accepted', icon: CheckCircle, color: colors.success },
    { id: 'processing', label: 'Processing', icon: RefreshCw, color: colors.info },
    { id: 'referred', label: 'Referred', icon: ExternalLink, color: colors.success },
    { id: 'declined', label: 'Declined', icon: XCircle, color: colors.danger },
  ];

  // Generate dummy requests
  const generateDummyRequests = () => {
    const statuses = ['pending', 'accepted', 'referred', 'processing', 'completed', 'declined'];
    const importers = [
      { name: 'ImportFlow Ltd', email: 'operations@importflow.com', contact: '+256 700 123456' },
      { name: 'Global Textiles Uganda Ltd', email: 'purchasing@globaltextiles.ug', contact: '+256 712 345678' },
      { name: 'Machinery Uganda Ltd', email: 'purchasing@machinery.ug', contact: '+256 701 234567' },
      { name: 'Packaging Solutions Ltd', email: 'purchasing@packaging.ug', contact: '+256 704 567890' },
      { name: 'AutoParts Uganda Ltd', email: 'purchasing@autoparts.ug', contact: '+256 705 678901' }
    ];
    const vessels = ['MV Star Express', 'MV Indian Trader', 'MV African Trader', 'MV Pacific Express', 'MV Europe Trader'];
    const cargoDescriptions = [
      'Premium Electronics and Circuit Components',
      'Textile Fabrics and Dyeing Agents',
      'Industrial Machinery and Spare Parts',
      'Packaging Materials and Consumables',
      'Automotive Components and Accessories'
    ];

    const requests = [];
    for (let i = 0; i < 20; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const importer = importers[Math.floor(Math.random() * importers.length)];
      const createdAt = new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000);
      
      const numContainers = Math.floor(Math.random() * 3) + 1;
      const containers = [];
      for (let c = 0; c < numContainers; c++) {
        containers.push({
          id: `CONT-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          size: ['20ft', '40ft', '40ft HC'][Math.floor(Math.random() * 3)],
          packages: Math.floor(Math.random() * 500 + 50),
          weight: (Math.random() * 25 + 5).toFixed(1) + ' tons',
          cargoDescription: cargoDescriptions[Math.floor(Math.random() * cargoDescriptions.length)]
        });
      }

      const totalValue = Math.floor(Math.random() * 200000000 + 50000000);

      requests.push({
        id: `REQ-${String(2026).slice(2)}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        requestNo: `CLR-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        importer: importer,
        status: status,
        containers: containers,
        totalContainers: containers.length,
        totalValue: totalValue,
        vessel: vessels[Math.floor(Math.random() * vessels.length)],
        createdAt: createdAt.toISOString(),
        updatedAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
        eta: new Date(createdAt.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        portOfLoading: ['Mombasa, Kenya', 'Dar es Salaam, Tanzania', 'Kampala, Uganda'][Math.floor(Math.random() * 3)],
        portOfDischarge: ['Port of Mombasa', 'Port of Dar es Salaam', 'Port of Kampala'][Math.floor(Math.random() * 3)],
        priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        specialInstructions: Math.random() > 0.7 ? 'Expedited clearance required for urgent delivery.' : '',
        response: status !== 'pending' ? {
          action: status === 'accepted' ? 'accepted' : status === 'referred' ? 'referred' : status === 'declined' ? 'declined' : 'processing',
          notes: status === 'accepted' ? 'Request accepted. Clearing process initiated.' : 
                  status === 'referred' ? 'Referred to senior agent for review.' :
                  status === 'declined' ? 'Unable to process due to incomplete documentation.' :
                  'Processing in progress.',
          date: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString()
        } : null,
        documents: {
          billOfLading: Math.random() > 0.3 ? 'uploaded' : 'pending',
          commercialInvoice: Math.random() > 0.2 ? 'uploaded' : 'pending',
          packingList: Math.random() > 0.3 ? 'uploaded' : 'pending',
          certificateOfOrigin: Math.random() > 0.5 ? 'uploaded' : 'pending'
        },
        notifications: Math.floor(Math.random() * 3)
      });
    }
    return requests;
  };

  useEffect(() => {
    const storedData = localStorage.getItem('clearingAgentRequests');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (parsed.length > 0) {
          setRequests(parsed);
          setFilteredRequests(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Error parsing stored data:', e);
      }
    }
    
    const dummyData = generateDummyRequests();
    localStorage.setItem('clearingAgentRequests', JSON.stringify(dummyData));
    setRequests(dummyData);
    setFilteredRequests(dummyData);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = [...requests];
    
    // Filter by active tab
    if (activeTab === 'pending') {
      filtered = filtered.filter(r => r.status === 'pending');
    } else if (activeTab === 'accepted') {
      filtered = filtered.filter(r => r.status === 'accepted');
    } else if (activeTab === 'processing') {
      filtered = filtered.filter(r => r.status === 'processing' || r.status === 'completed');
    } else if (activeTab === 'referred') {
      filtered = filtered.filter(r => r.status === 'referred');
    } else if (activeTab === 'declined') {
      filtered = filtered.filter(r => r.status === 'declined');
    }
    
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.requestNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.importer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.vessel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch(sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'value-desc':
        filtered.sort((a, b) => b.totalValue - a.totalValue);
        break;
      case 'value-asc':
        filtered.sort((a, b) => a.totalValue - b.totalValue);
        break;
      case 'priority':
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      default:
        break;
    }
    
    setFilteredRequests(filtered);
    setCurrentPage(1);
  }, [searchTerm, activeTab, sortBy, requests]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Pending Review',
        color: colors.warning,
        icon: Clock,
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800'
      },
      accepted: {
        label: 'Accepted',
        color: colors.success,
        icon: CheckCircle,
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800'
      },
      referred: {
        label: 'Referred',
        color: colors.purple,
        icon: ExternalLink,
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800'
      },
      processing: {
        label: 'Processing',
        color: colors.info,
        icon: RefreshCw,
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800'
      },
      completed: {
        label: 'Completed',
        color: colors.teal,
        icon: CheckCircle,
        bg: 'bg-teal-100 dark:bg-teal-900/30',
        text: 'text-teal-700 dark:text-teal-400',
        border: 'border-teal-200 dark:border-teal-800'
      },
      declined: {
        label: 'Declined',
        color: colors.danger,
        icon: XCircle,
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800'
      }
    };
    return configs[status] || configs.pending;
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', color: colors.danger };
      case 'Medium': return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', color: colors.warning };
      case 'Low': return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', color: colors.success };
      default: return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', color: colors.info };
    }
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

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle Accept Action
  const handleAccept = (request) => {
    setSelectedRequest(request);
    setActionType('accept');
    setActionReason('');
    setShowActionModal(true);
  };

  // Handle Reject Action
  const handleReject = (request) => {
    setSelectedRequest(request);
    setActionType('reject');
    setActionReason('');
    setShowActionModal(true);
  };

  // Handle Refer Action
  const handleRefer = (request) => {
    setSelectedRequest(request);
    setActionType('refer');
    setActionReason('');
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (!selectedRequest) return;

    const updatedRequests = requests.map(r => {
      if (r.id === selectedRequest.id) {
        let newStatus = r.status;
        let actionMessage = '';
        
        switch(actionType) {
          case 'accept':
            newStatus = 'accepted';
            actionMessage = 'Request accepted. Clearing process initiated.';
            break;
          case 'reject':
            newStatus = 'declined';
            actionMessage = actionReason || 'Request declined.';
            break;
          case 'refer':
            newStatus = 'referred';
            actionMessage = actionReason || 'Referred for further review.';
            break;
          default:
            break;
        }

        return {
          ...r,
          status: newStatus,
          response: {
            action: actionType,
            notes: actionReason || actionMessage,
            date: new Date().toISOString()
          }
        };
      }
      return r;
    });

    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
    localStorage.setItem('clearingAgentRequests', JSON.stringify(updatedRequests));

    setShowActionModal(false);
    setSelectedRequest(null);
    setActionType('');
    setActionReason('');

    showToast(
      `Request ${selectedRequest.id} ${actionType === 'accept' ? 'accepted' : actionType === 'reject' ? 'declined' : 'referred'} successfully!`,
      actionType === 'accept' ? 'success' : actionType === 'reject' ? 'error' : 'info'
    );
  };

  // Handle Notify Importer
  const handleNotifyImporter = (request) => {
    setSelectedRequest(request);
    setNotifyRecipient(request.importer.name);
    setNotifyMessage('');
    setShowNotifyModal(true);
  };

  const confirmNotify = () => {
    if (!selectedRequest || !notifyMessage.trim()) {
      showToast('Please enter a message', 'error');
      return;
    }

    const updatedRequests = requests.map(r => {
      if (r.id === selectedRequest.id) {
        return {
          ...r,
          notifications: (r.notifications || 0) + 1
        };
      }
      return r;
    });

    setRequests(updatedRequests);
    setFilteredRequests(updatedRequests);
    localStorage.setItem('clearingAgentRequests', JSON.stringify(updatedRequests));

    setShowNotifyModal(false);
    setSelectedRequest(null);
    setNotifyMessage('');
    setNotifyRecipient('');

    showToast(`Notification sent to ${selectedRequest.importer.name}!`, 'success');
  };

  // Toast Component
  const Toast = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
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

  // Action Modal
  const ActionModal = () => {
    if (!showActionModal || !selectedRequest) return null;

    const actionLabels = {
      accept: {
        title: 'Accept Request',
        icon: <ThumbsUpIcon className="w-6 h-6 text-green-500" />,
        buttonLabel: 'Accept Request',
        buttonColor: 'bg-green-500 hover:bg-green-600',
        placeholder: 'Add acceptance notes (optional)...',
        bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
      },
      reject: {
        title: 'Decline Request',
        icon: <ThumbsDownIcon className="w-6 h-6 text-red-500" />,
        buttonLabel: 'Decline Request',
        buttonColor: 'bg-red-500 hover:bg-red-600',
        placeholder: 'Please provide reason for declining *',
        bgGradient: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20'
      },
      refer: {
        title: 'Refer Request',
        icon: <ExternalLinkIcon className="w-6 h-6 text-purple-500" />,
        buttonLabel: 'Refer Request',
        buttonColor: 'bg-purple-500 hover:bg-purple-600',
        placeholder: 'Please provide referral details *',
        bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
      }
    };

    const config = actionLabels[actionType] || actionLabels.accept;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
           onClick={() => setShowActionModal(false)}>
        <div
          className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} bg-gradient-to-r ${config.bgGradient}`}>
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
                {actionType === 'accept' 
                  ? `You are about to accept request ${selectedRequest.id} from ${selectedRequest.importer.name}.`
                  : actionType === 'reject'
                  ? `You are about to decline request ${selectedRequest.id} from ${selectedRequest.importer.name}.`
                  : `You are about to refer request ${selectedRequest.id} from ${selectedRequest.importer.name}.`}
              </p>
              <div className={`mt-3 p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Request ID</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.id}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Importer</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.importer.name}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Containers</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedRequest.totalContainers}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Total Value</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(selectedRequest.totalValue)}</span>
                </div>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {actionType === 'accept' ? '📝 Notes (Optional)' : '📝 Reason *'}
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                rows="3"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                }`}
                style={{ focusRingColor: colors.primary }}
                placeholder={config.placeholder}
              />
              {actionType !== 'accept' && (
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  ⚠️ Required field
                </p>
              )}
            </div>
          </div>

          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex gap-3`}>
            <button
              onClick={() => {
                setShowActionModal(false);
                setSelectedRequest(null);
                setActionType('');
                setActionReason('');
              }}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmAction}
              disabled={actionType !== 'accept' && !actionReason.trim()}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 ${config.buttonColor}`}
            >
              {actionType === 'accept' ? <ThumbsUpIcon className="w-4 h-4" /> :
               actionType === 'reject' ? <ThumbsDownIcon className="w-4 h-4" /> :
               <ExternalLinkIcon className="w-4 h-4" />}
              {config.buttonLabel}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Notify Modal
  const NotifyModal = () => {
    if (!showNotifyModal || !selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
           onClick={() => setShowNotifyModal(false)}>
        <div
          className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20`}>
            <div className="flex items-center gap-3">
              <BellRing className="w-6 h-6 text-blue-500" />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notify Importer
              </h3>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-4">
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Sending notification to <span className="font-bold">{selectedRequest.importer.name}</span>
              </p>
              <div className={`mt-3 p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedRequest.importer.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <Phone className="w-4 h-4" style={{ color: colors.primary }} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedRequest.importer.contact}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Notification Message *
              </label>
              <textarea
                value={notifyMessage}
                onChange={(e) => setNotifyMessage(e.target.value)}
                rows="4"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                }`}
                style={{ focusRingColor: colors.primary }}
                placeholder={`Dear ${selectedRequest.importer.name},\n\nWe are currently reviewing your request and will provide an update shortly.\n\nBest regards,\n${user?.name || 'Clearing Agent'}`}
              />
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                📝 This notification will be sent via email and SMS
              </p>
            </div>
          </div>

          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex gap-3`}>
            <button
              onClick={() => {
                setShowNotifyModal(false);
                setSelectedRequest(null);
                setNotifyMessage('');
                setNotifyRecipient('');
              }}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmNotify}
              disabled={!notifyMessage.trim()}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})` }}
            >
              <Send className="w-4 h-4" />
              Send Notification
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
    if (totalPages <= 1 && itemsPerPage >= filteredRequests.length) return null;

    return (
      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Page {currentPage} of {totalPages || 1}
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className={`px-2 py-1 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            style={{ focusRingColor: colors.primary }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-lg transition-colors ${
              currentPage === 1
                ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                : isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: Math.min(5, totalPages || 1) }, (_, i) => {
            let pageNum;
            if ((totalPages || 1) <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= (totalPages || 1) - 2) {
              pageNum = (totalPages || 1) - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === pageNum
                    ? 'text-white'
                    : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: currentPage === pageNum ? colors.primary : 'transparent'
                }}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === (totalPages || 1)}
            className={`p-1.5 rounded-lg transition-colors ${
              currentPage === (totalPages || 1)
                ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                : isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Stats
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    accepted: requests.filter(r => r.status === 'accepted').length,
    processing: requests.filter(r => r.status === 'processing' || r.status === 'completed').length,
    referred: requests.filter(r => r.status === 'referred').length,
    declined: requests.filter(r => r.status === 'declined').length
  };

  // Render expanded details
  const renderExpandedDetails = (item) => {
    if (expandedId !== item.id) return null;

    const statusConfig = getStatusConfig(item.status);
    const StatusIcon = statusConfig.icon;

    return (
      <tr className="border-0">
        <td colSpan="8" className="p-0">
          <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/90' : 'bg-gray-50/90'} rounded-b-xl`}>
            {/* Status Banner */}
            <div className={`mb-4 p-3 rounded-lg flex items-center justify-between flex-wrap gap-2`}
              style={{ backgroundColor: `${statusConfig.color}20`, borderColor: statusConfig.color, borderLeft: `4px solid ${statusConfig.color}` }}>
              <div className="flex items-center gap-3">
                <span style={{ color: statusConfig.color }}>
                  <StatusIcon className="w-5 h-5" />
                </span>
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {statusConfig.label}
                  </p>
                  {item.response && (
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Response: {item.response.notes}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}>
                  {item.status.toUpperCase()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(item.priority).bg} ${getPriorityBadge(item.priority).text}`}>
                  {item.priority} Priority
                </span>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Request No.</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.requestNo}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Value</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(item.totalValue)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.totalContainers}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Created</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatDate(item.createdAt)}</p>
              </div>
            </div>

            {/* Importer Details */}
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Users className="w-4 h-4" style={{ color: colors.primary }} />
                Importer Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.importer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.importer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.importer.contact}</span>
                </div>
              </div>
            </div>

            {/* Vessel & Route */}
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <ShipIcon className="w-4 h-4" style={{ color: colors.primary }} />
                Vessel & Route
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.vessel}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.portOfLoading}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.portOfDischarge}</p>
                </div>
              </div>
            </div>

            {/* Containers */}
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Container className="w-4 h-4" style={{ color: colors.primary }} />
                Containers ({item.totalContainers})
              </h4>
              <div className="space-y-2">
                {item.containers.map((container, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {container.id}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {container.size} • {container.packages} packages • {container.weight}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {container.cargoDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Status */}
            <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                Documents Status
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(item.documents).map(([key, value]) => (
                  <div key={key} className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1`}
                      style={{
                        backgroundColor: value === 'uploaded' ? colors.success + '20' : colors.warning + '20',
                        color: value === 'uploaded' ? colors.success : colors.warning
                      }}>
                      {value === 'uploaded' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            {item.specialInstructions && (
              <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm border-l-4`}
                style={{ borderLeftColor: colors.primary }}>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Special Instructions
                </p>
                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.specialInstructions}
                </p>
              </div>
            )}

            {/* Response Info */}
            {item.response && (
              <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-sm flex items-start gap-2`}>
                <MessageSquare className="w-4 h-4 mt-0.5" style={{ color: colors.primary }} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Response:</span> {item.response.notes}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatDate(item.response.date)}
                  </p>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS - Only for pending requests */}
            {item.status === 'pending' && (
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAccept(item);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.success}, ${colors.teal})` }}
                >
                  <ThumbsUpIcon className="w-4 h-4" />
                  Accept Request
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(item);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.danger}, ${colors.orange})` }}
                >
                  <ThumbsDownIcon className="w-4 h-4" />
                  Decline Request
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefer(item);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.indigo})` }}
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  Refer Request
                </button>
              </div>
            )}

            {/* Close Details Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => toggleExpand(item.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                  color: colors.primary
                }}
              >
                <ChevronUp className="w-4 h-4" />
                Hide Details
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Get count for each tab
  const getTabCount = (tabId) => {
    if (tabId === 'pending') {
      return requests.filter(r => r.status === 'pending').length;
    } else if (tabId === 'accepted') {
      return requests.filter(r => r.status === 'accepted').length;
    } else if (tabId === 'processing') {
      return requests.filter(r => r.status === 'processing' || r.status === 'completed').length;
    } else if (tabId === 'referred') {
      return requests.filter(r => r.status === 'referred').length;
    } else if (tabId === 'declined') {
      return requests.filter(r => r.status === 'declined').length;
    }
    return 0;
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <ActionModal />
      <NotifyModal />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/clearing-agent-dashboard')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
              Import Requests
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all import clearance requests • {requests.length} total requests
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const dummyData = generateDummyRequests();
                localStorage.setItem('clearingAgentRequests', JSON.stringify(dummyData));
                setRequests(dummyData);
                setFilteredRequests(dummyData);
                showToast('Requests refreshed!', 'success');
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                color: colors.primary
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-yellow-600 dark:text-yellow-400`}>New</p>
            <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-green-600 dark:text-green-400`}>Accepted</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">{stats.accepted}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-blue-600 dark:text-blue-400`}>Processing</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.processing}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-purple-600 dark:text-purple-400`}>Referred</p>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{stats.referred}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-xl p-1 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-wrap gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const count = getTabCount(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : isDark 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? tab.color : 'transparent'
                  }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : isDark 
                        ? 'bg-gray-700 text-gray-400' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Sort */}
        <div className={`rounded-xl p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'pending' ? 'new' : activeTab} requests...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="value-desc">Highest Value</option>
              <option value="value-asc">Lowest Value</option>
              <option value="priority">Priority</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setSortBy('date-desc');
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center"
              style={{
                backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                color: colors.primary
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin" style={{ color: colors.primary }} />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            {activeTab === 'pending' && <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-400" />}
            {activeTab === 'accepted' && <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />}
            {activeTab === 'processing' && <RefreshCw className="w-16 h-16 mx-auto mb-4 text-blue-400" />}
            {activeTab === 'referred' && <ExternalLink className="w-16 h-16 mx-auto mb-4 text-purple-400" />}
            {activeTab === 'declined' && <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />}
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No {activeTab === 'pending' ? 'New' : activeTab} Requests Found
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {requests.length === 0 ? "You haven't received any requests yet." : `No ${activeTab} requests match your filters.`}
            </p>
          </div>
        ) : (
          <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Request ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Importer</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Containers</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Value</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Priority</th>
                    <th className="text-left py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Date</th>
                    <th className="text-center py-3 px-4 font-semibold text-xs text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {currentItems.map((item) => {
                    const isExpanded = expandedId === item.id;
                    const statusConfig = getStatusConfig(item.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <React.Fragment key={item.id}>
                        <tr 
                          className={`cursor-pointer transition-all duration-200 ${
                            isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                          } ${isExpanded ? (isDark ? 'bg-gray-700' : 'bg-purple-50') : ''}`}
                          onClick={() => toggleExpand(item.id)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                                <FileText className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                              </div>
                              <div>
                                <span className={`font-mono text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {item.id}
                                </span>
                                <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {item.requestNo}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Building className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                {item.importer.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} ${isDark ? statusConfig.darkBg : ''} ${isDark ? statusConfig.darkText : ''} ${isDark ? statusConfig.darkBorder : ''}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>
                              {item.totalContainers}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {formatCurrency(item.totalValue)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(item.priority).bg} ${getPriorityBadge(item.priority).text}`}>
                              {item.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {formatDate(item.createdAt)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1 flex-wrap">
                              {item.status === 'pending' && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAccept(item);
                                    }}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:scale-105"
                                    style={{ background: `linear-gradient(135deg, ${colors.success}, ${colors.teal})` }}
                                    title="Accept"
                                  >
                                    <ThumbsUpIcon className="w-3.5 h-3.5" />
                                    Accept
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReject(item);
                                    }}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:scale-105"
                                    style={{ background: `linear-gradient(135deg, ${colors.danger}, ${colors.orange})` }}
                                    title="Decline"
                                  >
                                    <ThumbsDownIcon className="w-3.5 h-3.5" />
                                    Decline
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRefer(item);
                                    }}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:scale-105"
                                    style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.indigo})` }}
                                    title="Refer"
                                  >
                                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                                    Refer
                                  </button>
                                </>
                              )}
                              {item.status !== 'pending' && (
                                <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                                  {statusConfig.label}
                                </span>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNotifyImporter(item);
                                }}
                                className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: colors.info }}
                                title="Notify Importer"
                              >
                                <BellRing className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleExpand(item.id);
                                }}
                                className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6', color: colors.primary }}
                                title={isExpanded ? "Hide Details" : "Show Details"}
                              >
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                        {renderExpandedDetails(item)}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={goToPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClearingAgentRequests;