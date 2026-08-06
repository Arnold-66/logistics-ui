// roles/inlandtransporter/DispatchOrders.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import {
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
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Eye,
  FileCheck,
  Shield,
  Anchor,
  Box,
  AlertOctagon,
  Navigation,
  Map,
  User,
  ClipboardList,
  Flag,
  CheckSquare,
  XCircle,
  Info,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  ChevronUp,
  LogOut,
  HelpCircle,
  Settings,
  LayoutDashboard,
  Users,
  Moon,
  Sun,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  UserPlus,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MoreVertical,
  Layers,
  List,
  Grid,
  Maximize2,
  Minimize2,
  Send,
  Mail,
  Phone,
  Building,
  Globe,
  Star,
  StarOff,
  ExternalLink,
  Edit,
  Trash2,
  Copy,
  Printer,
  Share2,
  MoreHorizontal,
  File,
  FileWarning,
  FileCheck as FileCheckIcon,
  FileX,
  Upload,
  AlertOctagon as AlertIcon,
  Route,
  Compass,
  Warehouse,
  TrendingUp,
  TrendingDown,
  DollarSign as DollarIcon,
  Check,
  Clock as ClockIcon2,
  UserCheck,
  UserX,
  AlertTriangle as AlertTriangleIcon,
  MessageSquare,
  CreditCard,
  FileText as FileTextIcon,
  Calendar as CalendarIcon2,
  Map as MapIcon,
  Navigation as NavigationIcon,
  Anchor as AnchorIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Clock as ClockIcon3,
  Inbox,
  ThumbsUp,
  ThumbsDown,
  RefreshCw as RefreshIcon,
  ExternalLink as ExternalLinkIcon,
  PenSquare,
  Save,
  Globe as GlobeIcon,
  Flag as FlagIcon,
  Container,
  Ship as ShipIcon,
  Route as RouteIcon,
  MapPin as MapPinIcon,
  Truck as TruckIcon,
  User as UserIcon,
  Users as UsersIcon,
  FileCheck as FileCheckIcon2
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const DispatchOrders = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderViewMode, setOrderViewMode] = useState('list');
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [showBillModal, setShowBillModal] = useState(false);
  const [billAmount, setBillAmount] = useState('');
  const [billDescription, setBillDescription] = useState('');
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [notifyRecipient, setNotifyRecipient] = useState('');
  const [notifyAttachFile, setNotifyAttachFile] = useState(null);
  const [notifySendToSystem, setNotifySendToSystem] = useState(true);
  const [notifySendToEmail, setNotifySendToEmail] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [selectedOrderForRoute, setSelectedOrderForRoute] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrderForAssign, setSelectedOrderForAssign] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter states
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderSortBy, setOrderSortBy] = useState('date-desc');

  // Print modal states
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printOrder, setPrintOrder] = useState(null);

  // Color theme
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

  const isDark = darkMode;

  // Available Trucks
  const availableTrucks = [
    { id: 'TRK-001', plate: 'KCA 123A', capacity: '20ft', status: 'Available', location: 'Mombasa' },
    { id: 'TRK-002', plate: 'KCA 456B', capacity: '40ft', status: 'Available', location: 'Nairobi' },
    { id: 'TRK-003', plate: 'KCA 789C', capacity: '20ft', status: 'In Transit', location: 'Eldoret' },
    { id: 'TRK-004', plate: 'KCA 012D', capacity: '40ft', status: 'Available', location: 'Mombasa' },
  ];

  // Available Drivers
  const availableDrivers = [
    { id: 'DRV-001', name: 'John Mwangi', license: 'DL-12345', experience: '5 years', status: 'Available' },
    { id: 'DRV-002', name: 'Sarah Akinyi', license: 'DL-23456', experience: '7 years', status: 'Available' },
    { id: 'DRV-003', name: 'David Omondi', license: 'DL-34567', experience: '3 years', status: 'On Trip' },
    { id: 'DRV-004', name: 'Grace Wanjiru', license: 'DL-45678', experience: '6 years', status: 'Available' },
  ];

  // Available Routes
  const availableRoutes = [
    { id: 'RTE-001', name: 'Mombasa - Kampala', distance: '450 km', duration: '2 days' },
    { id: 'RTE-002', name: 'Nairobi - Kampala', distance: '380 km', duration: '1 day' },
    { id: 'RTE-003', name: 'Mombasa - Nairobi', distance: '480 km', duration: '2 days' },
    { id: 'RTE-004', name: 'Kampala - Mombasa', distance: '450 km', duration: '2 days' },
  ];

  // Order Data for Inland Transporter
  const ordersData = [
    {
      id: 'ORD-001',
      containerId: 'CLR-001',
      pickupLocation: 'Mombasa Port - Terminal 3',
      destinationLocation: 'Kampala Business Park, Uganda',
      pickupDate: '2026-08-10 08:00',
      deliveryDate: '2026-08-12 17:00',
      status: 'Pending',
      assignmentStatus: 'Pending',
      assignmentDate: '2026-08-01',
      requestedBy: {
        name: 'ImportFlow Ltd',
        contact: '+256 700 123456',
        email: 'operations@importflow.com'
      },
      cargoDescription: 'Premium Electronics and Circuit Components',
      containerInfo: {
        id: 'CLR-001',
        sealNo: 'SEAL-78923',
        size: '40ft HC',
        packages: 24,
        weight: '28,500 kg'
      },
      distance: '450 km',
      estimatedDuration: '2 days',
      transporterProgress: 0,
      transporterStatus: 'Pending',
      transporterLocation: 'Mombasa Port',
      transporterETA: '2026-08-12 17:00',
      paymentStatus: 'Pending',
      amount: '$850.00',
      notes: 'Priority shipment - Handle with care',
      assignedTruck: null,
      assignedDriver: null,
      assignedRoute: null,
      routeDetails: {
        start: 'Mombasa Port, Kenya',
        waypoints: ['Nairobi, Kenya', 'Eldoret, Kenya'],
        end: 'Kampala, Uganda'
      }
    },
    {
      id: 'ORD-002',
      containerId: 'CLR-002',
      pickupLocation: 'Mombasa Port - Terminal 1',
      destinationLocation: '456 Industrial Area, Kampala, Uganda',
      pickupDate: '2026-08-12 09:00',
      deliveryDate: '2026-08-14 16:00',
      status: 'Accepted',
      assignmentStatus: 'Accepted',
      assignmentDate: '2026-08-05',
      requestedBy: {
        name: 'Global Textiles Uganda Ltd',
        contact: '+256 712 345678',
        email: 'purchasing@globaltextiles.ug'
      },
      cargoDescription: 'Textile Fabrics and Dyeing Agents',
      containerInfo: {
        id: 'CLR-002',
        sealNo: 'SEAL-45612',
        size: '20ft ST',
        packages: 15,
        weight: '18,200 kg'
      },
      distance: '420 km',
      estimatedDuration: '2 days',
      transporterProgress: 30,
      transporterStatus: 'Loading at Port',
      transporterLocation: 'Mombasa Port',
      transporterETA: '2026-08-14 16:00',
      paymentStatus: 'Pending',
      amount: '$620.00',
      notes: 'Fragile fabrics - Avoid moisture',
      assignedTruck: null,
      assignedDriver: null,
      assignedRoute: null,
      routeDetails: {
        start: 'Mombasa Port, Kenya',
        waypoints: ['Nairobi, Kenya'],
        end: 'Kampala, Uganda'
      }
    },
    {
      id: 'ORD-003',
      containerId: 'CLR-003',
      pickupLocation: 'Nairobi Warehouse, Kenya',
      destinationLocation: '789 Industrial Park, Kampala, Uganda',
      pickupDate: '2026-08-15 10:00',
      deliveryDate: '2026-08-16 18:00',
      status: 'In Transit',
      assignmentStatus: 'Accepted',
      assignmentDate: '2026-07-20',
      requestedBy: {
        name: 'Machinery Uganda Ltd',
        contact: '+256 701 234567',
        email: 'purchasing@machinery.ug'
      },
      cargoDescription: 'Industrial Machinery and Spare Parts',
      containerInfo: {
        id: 'CLR-003',
        sealNo: 'SEAL-89234',
        size: '40ft HC',
        packages: 18,
        weight: '32,400 kg'
      },
      distance: '380 km',
      estimatedDuration: '1 day',
      transporterProgress: 65,
      transporterStatus: 'In Transit - On Route',
      transporterLocation: 'Eldoret, Kenya',
      transporterETA: '2026-08-16 18:00',
      paymentStatus: 'Paid',
      amount: '$950.00',
      notes: 'Heavy machinery - Special handling required',
      assignedTruck: { id: 'TRK-003', plate: 'KCA 789C', capacity: '40ft' },
      assignedDriver: { id: 'DRV-003', name: 'David Omondi', license: 'DL-34567' },
      assignedRoute: { id: 'RTE-002', name: 'Nairobi - Kampala', distance: '380 km' },
      routeDetails: {
        start: 'Nairobi, Kenya',
        waypoints: ['Nakuru, Kenya', 'Eldoret, Kenya'],
        end: 'Kampala, Uganda'
      }
    },
    {
      id: 'ORD-004',
      containerId: 'CLR-004',
      pickupLocation: 'Mombasa Port - Terminal 2',
      destinationLocation: '101 Packaging Way, Kampala, Uganda',
      pickupDate: '2026-09-20 08:00',
      deliveryDate: '2026-09-22 17:00',
      status: 'Refer',
      assignmentStatus: 'Refer',
      assignmentDate: '2026-09-01',
      requestedBy: {
        name: 'Packaging Solutions Ltd',
        contact: '+256 704 567890',
        email: 'purchasing@packaging.ug'
      },
      cargoDescription: 'Packaging Materials and Consumables',
      containerInfo: {
        id: 'CLR-004',
        sealNo: 'SEAL-56789',
        size: '20ft ST',
        packages: 20,
        weight: '15,800 kg'
      },
      distance: '450 km',
      estimatedDuration: '2 days',
      transporterProgress: 0,
      transporterStatus: 'Referred',
      transporterLocation: 'Mombasa Port',
      transporterETA: 'N/A',
      paymentStatus: 'Pending',
      amount: '$550.00',
      notes: 'Referred due to capacity issues',
      assignedTruck: null,
      assignedDriver: null,
      assignedRoute: null,
      routeDetails: {
        start: 'Mombasa Port, Kenya',
        waypoints: ['Nairobi, Kenya'],
        end: 'Kampala, Uganda'
      }
    },
    {
      id: 'ORD-005',
      containerId: 'CLR-005',
      pickupLocation: 'Mombasa Port - Terminal 3',
      destinationLocation: '789 Auto Strasse, Kampala, Uganda',
      pickupDate: '2026-09-15 10:00',
      deliveryDate: '2026-09-17 16:00',
      status: 'Delivered',
      assignmentStatus: 'Completed',
      assignmentDate: '2026-08-25',
      requestedBy: {
        name: 'AutoParts Uganda Ltd',
        contact: '+256 705 678901',
        email: 'purchasing@autoparts.ug'
      },
      cargoDescription: 'Automotive Components and Accessories',
      containerInfo: {
        id: 'CLR-005',
        sealNo: 'SEAL-34126',
        size: '40ft HC',
        packages: 22,
        weight: '26,700 kg'
      },
      distance: '460 km',
      estimatedDuration: '2 days',
      transporterProgress: 100,
      transporterStatus: 'Delivered',
      transporterLocation: 'Kampala, Uganda',
      transporterETA: 'Delivered',
      paymentStatus: 'Paid',
      amount: '$780.00',
      notes: 'Delivered successfully - Signature required',
      assignedTruck: { id: 'TRK-001', plate: 'KCA 123A', capacity: '40ft' },
      assignedDriver: { id: 'DRV-001', name: 'John Mwangi', license: 'DL-12345' },
      assignedRoute: { id: 'RTE-001', name: 'Mombasa - Kampala', distance: '460 km' },
      routeDetails: {
        start: 'Mombasa Port, Kenya',
        waypoints: ['Nairobi, Kenya', 'Eldoret, Kenya'],
        end: 'Kampala, Uganda'
      }
    },
    {
      id: 'ORD-006',
      containerId: 'CLR-006',
      pickupLocation: 'Nairobi Warehouse, Kenya',
      destinationLocation: 'Kampala Business Park, Uganda',
      pickupDate: '2026-09-10 09:00',
      deliveryDate: '2026-09-12 16:00',
      status: 'Rejected',
      assignmentStatus: 'Rejected',
      assignmentDate: '2026-09-05',
      requestedBy: {
        name: 'TechImport Ltd',
        contact: '+256 701 234567',
        email: 'purchasing@techimport.ug'
      },
      cargoDescription: 'Electronic Components and Accessories',
      containerInfo: {
        id: 'CLR-006',
        sealNo: 'SEAL-78901',
        size: '20ft ST',
        packages: 12,
        weight: '15,200 kg'
      },
      distance: '380 km',
      estimatedDuration: '2 days',
      transporterProgress: 0,
      transporterStatus: 'Rejected',
      transporterLocation: 'Nairobi',
      transporterETA: 'N/A',
      paymentStatus: 'Pending',
      amount: '$450.00',
      notes: 'Rejected due to capacity constraints',
      assignedTruck: null,
      assignedDriver: null,
      assignedRoute: null,
      routeDetails: {
        start: 'Nairobi, Kenya',
        waypoints: ['Eldoret, Kenya'],
        end: 'Kampala, Uganda'
      }
    }
  ];

  // Get status color function
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return colors.success;
      case 'In Transit': return colors.primary;
      case 'Accepted': return colors.info;
      case 'Pending': return colors.warning;
      case 'Refer': return colors.info;
      case 'Rejected': return colors.danger;
      default: return colors.info;
    }
  };

  // Get assignment status color
  const getAssignmentStatusColor = (status) => {
    switch(status) {
      case 'Accepted': return colors.success;
      case 'Pending': return colors.warning;
      case 'Refer': return colors.info;
      case 'Completed': return colors.success;
      case 'Rejected': return colors.danger;
      default: return colors.info;
    }
  };

  // Get agent progress color
  const getAgentProgressColor = (progress) => {
    if (progress === null) return colors.info;
    if (progress >= 80) return colors.success;
    if (progress >= 50) return colors.warning;
    return colors.danger;
  };

  // Get status display for order
  const getOrderStatusDisplay = (order) => {
    if (order.status === 'Delivered') {
      return { label: 'Delivered ✓', color: colors.success, icon: <CheckCircle className="w-4 h-4" /> };
    }
    if (order.status === 'In Transit') {
      return { label: `In Transit (${order.transporterProgress || 0}%)`, color: colors.primary, icon: <Truck className="w-4 h-4" /> };
    }
    if (order.status === 'Accepted') {
      return { label: 'Accepted', color: colors.info, icon: <Check className="w-4 h-4" /> };
    }
    if (order.status === 'Pending') {
      return { label: 'Pending', color: colors.warning, icon: <Clock className="w-4 h-4" /> };
    }
    if (order.status === 'Refer') {
      return { label: 'Refer', color: colors.info, icon: <AlertCircle className="w-4 h-4" /> };
    }
    if (order.status === 'Rejected') {
      return { label: 'Rejected', color: colors.danger, icon: <X className="w-4 h-4" /> };
    }
    return { label: order.status, color: colors.info, icon: <Info className="w-4 h-4" /> };
  };

  // Get category badge
  const getCategoryBadge = (status) => {
    const categoryMap = {
      'Pending': { bg: colors.info + '20', color: colors.info, label: 'New', icon: <Clock className="w-3 h-3" /> },
      'Accepted': { bg: colors.success + '20', color: colors.success, label: 'Accepted', icon: <Check className="w-3 h-3" /> },
      'Rejected': { bg: colors.danger + '20', color: colors.danger, label: 'Rejected', icon: <X className="w-3 h-3" /> },
      'Refer': { bg: colors.warning + '20', color: colors.warning, label: 'Referred', icon: <ExternalLink className="w-3 h-3" /> }
    };
    return categoryMap[status] || categoryMap['Pending'];
  };

  // Get filtered orders by category
  const getFilteredByCategory = () => {
    let filtered = [...ordersData];
    
    if (selectedTab !== 'all') {
      filtered = filtered.filter(o => o.status === selectedTab);
    }
    
    if (orderSearch) {
      const search = orderSearch.toLowerCase();
      filtered = filtered.filter(o =>
        o.id.toLowerCase().includes(search) ||
        o.containerId.toLowerCase().includes(search) ||
        o.pickupLocation.toLowerCase().includes(search) ||
        o.destinationLocation.toLowerCase().includes(search) ||
        o.requestedBy.name.toLowerCase().includes(search)
      );
    }
    
    if (orderFilter !== 'all') {
      filtered = filtered.filter(o => o.status === orderFilter);
    }
    
    // Sort
    switch(orderSortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.assignmentDate) - new Date(a.assignmentDate));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.assignmentDate) - new Date(b.assignmentDate));
        break;
      case 'distance-desc':
        filtered.sort((a, b) => parseInt(b.distance) - parseInt(a.distance));
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const filteredOrders = getFilteredByCategory();

  // Pagination for orders
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Stats
  const orderStats = {
    total: ordersData.length,
    pending: ordersData.filter(o => o.status === 'Pending').length,
    accepted: ordersData.filter(o => o.status === 'Accepted').length,
    inTransit: ordersData.filter(o => o.status === 'In Transit').length,
    delivered: ordersData.filter(o => o.status === 'Delivered').length,
    referred: ordersData.filter(o => o.status === 'Refer').length,
    rejected: ordersData.filter(o => o.status === 'Rejected').length
  };

  // Get tab counts
  const tabCounts = {
    all: ordersData.length,
    pending: ordersData.filter(o => o.status === 'Pending').length,
    accepted: ordersData.filter(o => o.status === 'Accepted').length,
    rejected: ordersData.filter(o => o.status === 'Rejected').length,
    referred: ordersData.filter(o => o.status === 'Refer').length
  };

  // Handle order toggle expand
  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Handle assignment actions
  const handleAssignmentAction = (order, action) => {
    setSelectedOrderForAction(order);
    setActionType(action);
    setActionReason('');
    setShowActionModal(true);
  };

  const confirmAssignmentAction = () => {
    console.log(`Action: ${actionType} on order ${selectedOrderForAction.id}`, actionReason);
    setShowActionModal(false);
    setSelectedOrderForAction(null);
    setActionReason('');
    const updatedOrders = ordersData.map(o => {
      if (o.id === selectedOrderForAction.id) {
        let newStatus = o.assignmentStatus;
        switch(actionType) {
          case 'accept':
            newStatus = 'Accepted';
            break;
          case 'reject':
            newStatus = 'Rejected';
            break;
          case 'refer':
            newStatus = 'Refer';
            break;
          default:
            break;
        }
        return { ...o, assignmentStatus: newStatus, status: newStatus };
      }
      return o;
    });
  };

  // Handle send bill/invoice
  const handleSendBill = (order) => {
    setSelectedOrderForAction(order);
    setBillAmount('');
    setBillDescription('');
    setShowBillModal(true);
  };

  const confirmSendBill = () => {
    console.log(`Sending invoice for ${selectedOrderForAction.id}: $${billAmount} - ${billDescription}`);
    setShowBillModal(false);
    setSelectedOrderForAction(null);
    setBillAmount('');
    setBillDescription('');
  };

  // Handle notify requester with attachment
  const handleNotifyRequester = (order) => {
    setSelectedOrderForAction(order);
    setNotifyRecipient(order.requestedBy.name);
    setNotifyMessage('');
    setNotifyAttachFile(null);
    setNotifySendToSystem(true);
    setNotifySendToEmail(false);
    setShowNotifyModal(true);
  };

  const confirmNotify = () => {
    console.log(`Notifying ${notifyRecipient}: ${notifyMessage}`);
    console.log(`Attached file: ${notifyAttachFile?.name || 'No file'}`);
    console.log(`Send to System: ${notifySendToSystem}`);
    console.log(`Send to Email: ${notifySendToEmail}`);
    setShowNotifyModal(false);
    setSelectedOrderForAction(null);
    setNotifyMessage('');
    setNotifyRecipient('');
    setNotifyAttachFile(null);
    alert(`Notification sent to ${notifyRecipient}`);
  };

  // Handle update status
  const handleUpdateStatus = (order) => {
    setSelectedOrderForAction(order);
    setSelectedStatus(order.status);
    setStatusNote('');
    setShowStatusModal(true);
  };

  const confirmStatusUpdate = () => {
    console.log(`Updating status for ${selectedOrderForAction.id} to ${selectedStatus}`, statusNote);
    setShowStatusModal(false);
    setSelectedOrderForAction(null);
    setSelectedStatus('');
    setStatusNote('');
    const updatedOrders = ordersData.map(o => {
      if (o.id === selectedOrderForAction.id) {
        let progress = o.transporterProgress || 0;
        if (selectedStatus === 'In Transit') progress = 50;
        if (selectedStatus === 'Delivered') progress = 100;
        if (selectedStatus === 'Accepted') progress = 10;
        return { 
          ...o, 
          status: selectedStatus, 
          assignmentStatus: selectedStatus,
          transporterProgress: progress,
          transporterStatus: selectedStatus
        };
      }
      return o;
    });
  };

  // Handle view route
  const handleViewRoute = (order) => {
    setSelectedOrderForRoute(order);
    setShowRouteModal(true);
  };

  // Handle assign truck/driver/route
  const handleAssignResources = (order) => {
    setSelectedOrderForAssign(order);
    setSelectedTruck(order.assignedTruck?.id || '');
    setSelectedDriver(order.assignedDriver?.id || '');
    setSelectedRoute(order.assignedRoute?.id || '');
    setShowAssignModal(true);
  };

  const confirmAssignResources = () => {
    const truck = availableTrucks.find(t => t.id === selectedTruck);
    const driver = availableDrivers.find(d => d.id === selectedDriver);
    const route = availableRoutes.find(r => r.id === selectedRoute);
    
    console.log(`Assigning to order ${selectedOrderForAssign.id}:`, { truck, driver, route });
    setShowAssignModal(false);
    setSelectedOrderForAssign(null);
    setSelectedTruck('');
    setSelectedDriver('');
    setSelectedRoute('');
    
    // Update order with assigned resources
    const updatedOrders = ordersData.map(o => {
      if (o.id === selectedOrderForAssign.id) {
        return { 
          ...o, 
          assignedTruck: truck || null,
          assignedDriver: driver || null,
          assignedRoute: route || null,
          status: 'Accepted',
          assignmentStatus: 'Accepted',
          transporterStatus: 'Assigned'
        };
      }
      return o;
    });
  };

  // Handle page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle print
  const handlePrint = (order) => {
    setPrintOrder(order);
    setShowPrintModal(true);
  };

  const executePrint = () => {
    console.log('Printing order:', printOrder);
    setShowPrintModal(false);
    window.print();
  };

  // Reset filters
  const resetOrderFilters = () => {
    setOrderFilter('all');
    setOrderSearch('');
    setOrderSortBy('date-desc');
    setCurrentPage(1);
    setSelectedTab('all');
  };

  // Render Print Modal
  const PrintModal = () => {
    if (!showPrintModal || !printOrder) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowPrintModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="font-bold text-gray-900 dark:text-white">
                Print Order - {printOrder.id}
              </h3>
            </div>
            <button
              onClick={() => setShowPrintModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order ID</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{printOrder.id}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{printOrder.containerId}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pickup Location</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{printOrder.pickupLocation}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{printOrder.destinationLocation}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                <span className={`text-xs px-2 py-1 rounded-full`}
                  style={{
                    backgroundColor: getStatusColor(printOrder.status) + '20',
                    color: getStatusColor(printOrder.status)
                  }}>
                  {printOrder.status}
                </span>
              </div>
              {printOrder.assignedTruck && (
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Assigned Truck</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {printOrder.assignedTruck.plate} ({printOrder.assignedTruck.capacity})
                  </p>
                </div>
              )}
              {printOrder.assignedDriver && (
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Assigned Driver</p>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {printOrder.assignedDriver.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <button
              onClick={() => setShowPrintModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={executePrint}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              <Printer className="w-4 h-4 inline mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Action Modal
  const ActionModal = () => {
    if (!showActionModal || !selectedOrderForAction) return null;

    const actionLabels = {
      accept: 'Accept Assignment',
      reject: 'Reject Assignment',
      refer: 'Refer Assignment'
    };

    const actionColors = {
      accept: colors.success,
      reject: colors.danger,
      refer: colors.info
    };

    const actionIcons = {
      accept: <Check className="w-5 h-5" />,
      reject: <X className="w-5 h-5" />,
      refer: <AlertCircle className="w-5 h-5" />
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowActionModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}
            style={{ backgroundColor: actionColors[actionType] + '10' }}>
            <div className="flex items-center gap-3">
              <span style={{ color: actionColors[actionType] }}>
                {actionIcons[actionType]}
              </span>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {actionLabels[actionType]}
              </h3>
            </div>
            <button
              onClick={() => setShowActionModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Order: <span className="font-medium">{selectedOrderForAction.id}</span>
            </p>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Container: <span className="font-medium">{selectedOrderForAction.containerId}</span>
            </p>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Requester: <span className="font-medium">{selectedOrderForAction.requestedBy.name}</span>
            </p>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Reason (Optional)
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Enter reason for this action..."
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                rows="3"
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowActionModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmAssignmentAction}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: actionColors[actionType] }}
              >
                Confirm {actionLabels[actionType]}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Bill Modal
  const BillModal = () => {
    if (!showBillModal || !selectedOrderForAction) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowBillModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <DollarIcon className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send Invoice to Requester
              </h3>
            </div>
            <button
              onClick={() => setShowBillModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Order: <span className="font-medium">{selectedOrderForAction.id}</span>
            </p>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Requester: <span className="font-medium">{selectedOrderForAction.requestedBy.name}</span>
            </p>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Amount ($)
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="Enter amount..."
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Invoice Description
              </label>
              <textarea
                value={billDescription}
                onChange={(e) => setBillDescription(e.target.value)}
                placeholder="Enter invoice description..."
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                rows="3"
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowBillModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmSendBill}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                <Send className="w-4 h-4 inline mr-2" />
                Send Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Notify Modal with attachment
  const NotifyModal = () => {
    if (!showNotifyModal || !selectedOrderForAction) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowNotifyModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.info + '10' }}>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" style={{ color: colors.info }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notify Requester
              </h3>
            </div>
            <button
              onClick={() => setShowNotifyModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Order: <span className="font-medium">{selectedOrderForAction.id}</span>
            </p>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Recipient: <span className="font-medium">{selectedOrderForAction.requestedBy.name}</span>
            </p>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email: <span className="font-medium">{selectedOrderForAction.requestedBy.email}</span>
            </p>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Notification Message
              </label>
              <textarea
                value={notifyMessage}
                onChange={(e) => setNotifyMessage(e.target.value)}
                placeholder="Enter notification message..."
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                rows="4"
                style={{ focusRingColor: colors.primary }}
              />
            </div>

            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Attach Document (Optional)
              </label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                  isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <div className="flex flex-col items-center justify-center pt-4 pb-3">
                    <Upload className="w-6 h-6 mb-1" style={{ color: colors.primary }} />
                    <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      PDF, DOC, JPG (MAX 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setNotifyAttachFile(e.target.files[0])}
                  />
                </label>
              </div>
              {notifyAttachFile && (
                <div className="flex items-center gap-2 mt-2">
                  <FileText className="w-4 h-4" style={{ color: colors.success }} />
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {notifyAttachFile.name}
                  </p>
                  <button
                    onClick={() => setNotifyAttachFile(null)}
                    className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Send To
              </label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifySendToSystem}
                    onChange={(e) => setNotifySendToSystem(e.target.checked)}
                    className="rounded"
                  />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    System User (In-app notification)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifySendToEmail}
                    onChange={(e) => setNotifySendToEmail(e.target.checked)}
                    className="rounded"
                  />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email ({selectedOrderForAction.requestedBy.email})
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowNotifyModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmNotify}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.info }}
              >
                <Send className="w-4 h-4" />
                Send Notification
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Status Update Modal
  const StatusModal = () => {
    if (!showStatusModal || !selectedOrderForAction) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowStatusModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Update Status - {selectedOrderForAction.id}
              </h3>
            </div>
            <button
              onClick={() => setShowStatusModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Current Status: <span className={`text-xs px-2 py-1 rounded-full`}
                style={{
                  backgroundColor: getStatusColor(selectedOrderForAction.status) + '20',
                  color: getStatusColor(selectedOrderForAction.status)
                }}>
                {selectedOrderForAction.status}
              </span>
            </p>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                New Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Rejected">Rejected</option>
                <option value="Refer">Refer</option>
              </select>
            </div>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Note (Optional)
              </label>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Add a note about this status update..."
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                rows="3"
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStatusModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusUpdate}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                <Check className="w-4 h-4 inline mr-2" />
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Assign Resources Modal
  const AssignModal = () => {
    if (!showAssignModal || !selectedOrderForAssign) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowAssignModal(false)}>
        <div
          className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Assign Resources - {selectedOrderForAssign.id}
              </h3>
            </div>
            <button
              onClick={() => setShowAssignModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[70vh]">
            <div className="space-y-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order ID</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedOrderForAssign.id}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedOrderForAssign.containerId}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pickup Location</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedOrderForAssign.pickupLocation}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedOrderForAssign.destinationLocation}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Select Truck
                </label>
                <select
                  value={selectedTruck}
                  onChange={(e) => setSelectedTruck(e.target.value)}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  <option value="">Select a truck...</option>
                  {availableTrucks.map((truck) => (
                    <option key={truck.id} value={truck.id}>
                      {truck.plate} - {truck.capacity} - {truck.status} ({truck.location})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Select Driver
                </label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  <option value="">Select a driver...</option>
                  {availableDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.experience} - {driver.status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Select Route
                </label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  <option value="">Select a route...</option>
                  {availableRoutes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name} - {route.distance} ({route.duration})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <button
              onClick={() => setShowAssignModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmAssignResources}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Truck className="w-4 h-4" />
              Assign Resources
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Route Modal
  const RouteModal = () => {
    if (!showRouteModal || !selectedOrderForRoute) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowRouteModal(false)}>
        <div
          className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <Map className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Route Details - {selectedOrderForRoute.id}
              </h3>
            </div>
            <button
              onClick={() => setShowRouteModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Truck</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedOrderForRoute.assignedTruck ? 
                      `${selectedOrderForRoute.assignedTruck.plate} (${selectedOrderForRoute.assignedTruck.capacity})` : 
                      'Not Assigned'}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedOrderForRoute.assignedDriver ? 
                      selectedOrderForRoute.assignedDriver.name : 
                      'Not Assigned'}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Route</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedOrderForRoute.assignedRoute ? 
                      selectedOrderForRoute.assignedRoute.name : 
                      'Not Assigned'}
                  </p>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pickup Location</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedOrderForRoute.pickupLocation}
                </p>
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Waypoints</p>
                <div className="space-y-1 mt-1">
                  {selectedOrderForRoute.routeDetails.waypoints.map((waypoint, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
                      <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {waypoint}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedOrderForRoute.destinationLocation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Distance</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedOrderForRoute.distance}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Estimated Duration</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedOrderForRoute.estimatedDuration}
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-lg border-2 border-dashed text-center ${
                isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
              }`}>
                <Route className="w-12 h-12 mx-auto mb-3" style={{ color: colors.primary }} />
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Route Map View
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {selectedOrderForRoute.pickupLocation} → {selectedOrderForRoute.destinationLocation}
                </p>
                <button
                  className="mt-3 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: colors.primary }}
                  onClick={() => window.open('https://www.google.com/maps', '_blank')}
                >
                  <Map className="w-4 h-4 inline mr-2" />
                  Open Full Map View
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <button
              onClick={() => setShowRouteModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowRouteModal(false);
                window.print();
              }}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              <Printer className="w-4 h-4 inline mr-2" />
              Print Route
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render expanded order details
  const renderExpandedOrder = (order) => {
    const isExpanded = expandedOrderId === order.id;
    if (!isExpanded) return null;

    return (
      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <td colSpan="7" className="p-0">
          <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                <h4 className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Container Information
                </h4>
                <div className="space-y-1">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container ID</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.containerInfo.id}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Seal No.</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.containerInfo.sealNo}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Size</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.containerInfo.size}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Packages</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.containerInfo.packages}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.containerInfo.weight}
                  </p>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                <h4 className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Cargo & Requester
                </h4>
                <div className="space-y-1">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.cargoDescription}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Requester</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.requestedBy.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.requestedBy.contact}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.requestedBy.email}
                  </p>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                <h4 className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Assigned Resources
                </h4>
                <div className="space-y-1">
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Truck</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.assignedTruck ? 
                      `${order.assignedTruck.plate} (${order.assignedTruck.capacity})` : 
                      'Not Assigned'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.assignedDriver ? 
                      order.assignedDriver.name : 
                      'Not Assigned'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Route</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.assignedRoute ? 
                      order.assignedRoute.name : 
                      'Not Assigned'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Progress</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {order.transporterProgress || 0}%
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              {order.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleAssignmentAction(order, 'accept')}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                    style={{ backgroundColor: colors.success }}
                  >
                    <Check className="w-3 h-3" />
                    Accept Assignment
                  </button>
                  <button
                    onClick={() => handleAssignmentAction(order, 'reject')}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                    style={{ backgroundColor: colors.danger }}
                  >
                    <X className="w-3 h-3" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAssignmentAction(order, 'refer')}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                    style={{ backgroundColor: colors.info }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    Refer
                  </button>
                </>
              )}
              {(order.status === 'Pending' || order.status === 'Accepted') && (
                <button
                  onClick={() => handleAssignResources(order)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Truck className="w-3 h-3" />
                  Assign Truck/Driver/Route
                </button>
              )}
              {(order.status === 'Accepted' || order.status === 'In Transit') && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(order)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Truck className="w-3 h-3" />
                    Update Status
                  </button>
                  <button
                    onClick={() => handleSendBill(order)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                    style={{ backgroundColor: colors.success }}
                  >
                    <DollarIcon className="w-3 h-3" />
                    Send Invoice
                  </button>
                  <button
                    onClick={() => handleNotifyRequester(order)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                    style={{ backgroundColor: colors.info }}
                  >
                    <Mail className="w-3 h-3" />
                    Notify
                  </button>
                </>
              )}
              <button
                onClick={() => handleViewRoute(order)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                style={{ backgroundColor: colors.info }}
              >
                <Map className="w-3 h-3" />
                View Route
              </button>
              <button
                onClick={() => handlePrint(order)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                style={{ backgroundColor: colors.primary }}
              >
                <Printer className="w-3 h-3" />
                Print
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Render Grid View
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentOrders.map((order) => {
          const statusDisplay = getOrderStatusDisplay(order);
          return (
            <div key={order.id} className={`rounded-lg transition-all duration-300 ${
              isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white shadow-md'
            }`}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" style={{ color: colors.primary }} />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.id}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full`}
                    style={{
                      backgroundColor: getStatusColor(order.status) + '20',
                      color: getStatusColor(order.status)
                    }}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Container:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{order.containerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Pickup:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{order.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Destination:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{order.destinationLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Requester:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{order.requestedBy.name}</span>
                  </div>
                  {order.assignedTruck && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Truck:</span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>{order.assignedTruck.plate}</span>
                    </div>
                  )}
                  {order.assignedDriver && (
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Driver:</span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>{order.assignedDriver.name}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t flex gap-2" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <button
                    onClick={() => toggleOrderExpand(order.id)}
                    className="flex-1 px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
              {expandedOrderId === order.id && (
                <div className={`p-4 border-t ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status:</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full`}
                        style={{
                          backgroundColor: statusDisplay.color + '20',
                          color: statusDisplay.color
                        }}>
                        {statusDisplay.icon} {statusDisplay.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Payment:</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full`}
                        style={{
                          backgroundColor: order.paymentStatus === 'Paid' ? colors.success + '20' : colors.warning + '20',
                          color: order.paymentStatus === 'Paid' ? colors.success : colors.warning
                        }}>
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {order.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleAssignmentAction(order, 'accept')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.success }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAssignmentAction(order, 'reject')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.danger }}
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleAssignmentAction(order, 'refer')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.info }}
                          >
                            Refer
                          </button>
                        </>
                      )}
                      {(order.status === 'Pending' || order.status === 'Accepted') && (
                        <button
                          onClick={() => handleAssignResources(order)}
                          className="flex-1 min-w-[80px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                          style={{ backgroundColor: colors.primary }}
                        >
                          Assign
                        </button>
                      )}
                      {(order.status === 'Accepted' || order.status === 'In Transit') && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(order)}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.primary }}
                          >
                            Status
                          </button>
                          <button
                            onClick={() => handleSendBill(order)}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.success }}
                          >
                            Invoice
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => toggleOrderExpand(order.id)}
                        className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium border transition-all duration-200 hover:opacity-90"
                        style={{
                          borderColor: colors.primary,
                          color: colors.primary
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Page {currentPage} of {totalPages}
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
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
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
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
            disabled={currentPage === totalPages}
            className={`p-1.5 rounded-lg transition-colors ${
              currentPage === totalPages
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

  // Tab counts
  const getTabCount = (status) => {
    return ordersData.filter(o => o.status === status).length;
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Dispatch Orders 🚛
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage all inland transport dispatch orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Inbox className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.total}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Orders
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.info + '20' }}>
                <Clock className="w-5 h-5" style={{ color: colors.info }} />
              </div>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.pending}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              New
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.success + '20' }}>
                <Check className="w-5 h-5" style={{ color: colors.success }} />
              </div>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.accepted}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Accepted
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.warning + '20' }}>
                <ExternalLink className="w-5 h-5" style={{ color: colors.warning }} />
              </div>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.referred}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Referred
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.danger + '20' }}>
                <X className="w-5 h-5" style={{ color: colors.danger }} />
              </div>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.rejected}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Rejected
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => {
              setSelectedTab('all');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedTab === 'all'
                ? 'text-white shadow-md'
                : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedTab === 'all' ? colors.primary : 'transparent'
            }}
          >
            <Package className="w-4 h-4" />
            All Orders
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedTab === 'all' ? 'bg-white/20 text-white' : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
              {tabCounts.all}
            </span>
          </button>

          <button
            onClick={() => {
              setSelectedTab('Pending');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedTab === 'Pending'
                ? 'text-white shadow-md'
                : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedTab === 'Pending' ? colors.info : 'transparent'
            }}
          >
            <Clock className="w-4 h-4" />
            New Orders
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedTab === 'Pending' ? 'bg-white/20 text-white' : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
              {tabCounts.pending}
            </span>
          </button>

          <button
            onClick={() => {
              setSelectedTab('Accepted');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedTab === 'Accepted'
                ? 'text-white shadow-md'
                : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedTab === 'Accepted' ? colors.success : 'transparent'
            }}
          >
            <Check className="w-4 h-4" />
            Accepted
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedTab === 'Accepted' ? 'bg-white/20 text-white' : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
              {tabCounts.accepted}
            </span>
          </button>

          <button
            onClick={() => {
              setSelectedTab('Rejected');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedTab === 'Rejected'
                ? 'text-white shadow-md'
                : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedTab === 'Rejected' ? colors.danger : 'transparent'
            }}
          >
            <X className="w-4 h-4" />
            Rejected
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedTab === 'Rejected' ? 'bg-white/20 text-white' : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
              {tabCounts.rejected}
            </span>
          </button>

          <button
            onClick={() => {
              setSelectedTab('Refer');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedTab === 'Refer'
                ? 'text-white shadow-md'
                : isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedTab === 'Refer' ? colors.warning : 'transparent'
            }}
          >
            <ExternalLink className="w-4 h-4" />
            Referred
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedTab === 'Refer' ? 'bg-white/20 text-white' : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
              {tabCounts.referred}
            </span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by order ID, container, pickup location, destination, or requester..."
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Rejected">Rejected</option>
              <option value="Refer">Refer</option>
            </select>
            <select
              value={orderSortBy}
              onChange={(e) => setOrderSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="distance-desc">Longest First</option>
              <option value="status">Sort by Status</option>
            </select>
            <button
              className={`p-2 rounded-lg border transition-colors ${
                isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={resetOrderFilters}
            >
              <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {selectedTab === 'all' ? 'All orders' : 
             selectedTab === 'Pending' ? '📋 New orders awaiting dispatch' :
             selectedTab === 'Accepted' ? '✅ Accepted orders' :
             selectedTab === 'Rejected' ? '❌ Rejected orders' :
             '🔄 Referred orders'}
          </span>
        </div>

        {/* Orders Table */}
        {filteredOrders.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <Truck className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Orders Found
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {selectedTab === 'all' ? 'No orders match your filters.' :
               selectedTab === 'Pending' ? 'No new orders awaiting dispatch.' :
               selectedTab === 'Accepted' ? 'No accepted orders.' :
               selectedTab === 'Rejected' ? 'No rejected orders.' :
               'No referred orders.'}
            </p>
            <button
              onClick={resetOrderFilters}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              View All Orders
            </button>
          </div>
        ) : (
          <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Order
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Container
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Pickup Location
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Destination
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Status
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Requester
                    </th>
                    <th className={`text-center py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  {currentOrders.map((order) => {
                    const statusDisplay = getOrderStatusDisplay(order);
                    return (
                      <React.Fragment key={order.id}>
                        <tr
                          className={`cursor-pointer transition-all duration-200 ${
                            isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                          } ${expandedOrderId === order.id ? (isDark ? 'bg-gray-700' : 'bg-purple-50') : ''}`}
                          onClick={() => toggleOrderExpand(order.id)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                                <Truck className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                              </div>
                              <span className={`font-mono text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {order.id}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                              {order.containerId}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {order.pickupLocation.substring(0, 25)}{order.pickupLocation.length > 25 ? '...' : ''}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {order.destinationLocation.substring(0, 25)}{order.destinationLocation.length > 25 ? '...' : ''}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border`}
                              style={{
                                backgroundColor: statusDisplay.color + '20',
                                color: statusDisplay.color,
                                borderColor: statusDisplay.color + '40'
                              }}>
                              {statusDisplay.icon}
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {order.requestedBy.name.substring(0, 20)}{order.requestedBy.name.length > 20 ? '...' : ''}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6', color: colors.primary }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleOrderExpand(order.id);
                                }}
                                title="View Details"
                              >
                                {expandedOrderId === order.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                              {order.status === 'Pending' && (
                                <>
                                  <button
                                    className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAssignmentAction(order, 'accept');
                                    }}
                                    title="Accept"
                                  >
                                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAssignmentAction(order, 'reject');
                                    }}
                                    title="Reject"
                                  >
                                    <ThumbsDown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAssignmentAction(order, 'refer');
                                    }}
                                    title="Refer"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                                  </button>
                                </>
                              )}
                              {(order.status === 'Pending' || order.status === 'Accepted') && (
                                <button
                                  className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                                  style={{ backgroundColor: 'rgba(113, 75, 103, 0.15)' }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAssignResources(order);
                                  }}
                                  title="Assign Resources"
                                >
                                  <Truck className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                                </button>
                              )}
                              {(order.status === 'Accepted' || order.status === 'In Transit') && (
                                <>
                                  <button
                                    className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                                    style={{ backgroundColor: 'rgba(113, 75, 103, 0.15)' }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUpdateStatus(order);
                                    }}
                                    title="Update Status"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                                  </button>
                                  <button
                                    className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSendBill(order);
                                    }}
                                    title="Send Invoice"
                                  >
                                    <DollarIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  </button>
                                </>
                              )}
                              <button
                                className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewRoute(order);
                                }}
                                title="View Route"
                              >
                                <Map className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                              </button>
                              <button
                                className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                                style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6', color: colors.primary }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePrint(order);
                                }}
                                title="Print"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {renderExpandedOrder(order)}
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
              onItemsPerPageChange={(val) => {
                setItemsPerPage(val);
                setCurrentPage(1);
              }}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {showActionModal && <ActionModal />}
      {showBillModal && <BillModal />}
      {showPrintModal && <PrintModal />}
      {showNotifyModal && <NotifyModal />}
      {showStatusModal && <StatusModal />}
      {showAssignModal && <AssignModal />}
      {showRouteModal && <RouteModal />}
    </div>
  );
};

export default DispatchOrders;