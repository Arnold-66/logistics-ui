// roles/inlandtransporter/InlandTransporterDashboard.jsx
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

const InlandTransporterDashboard = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [alertsPage, setAlertsPage] = useState(1);
  const [alertsPerPage] = useState(3);

  // Filter states
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSortBy, setOrderSortBy] = useState('date-desc');

  // Alert filter states
  const [alertStatusFilter, setAlertStatusFilter] = useState('all');
  const [alertSeverityFilter, setAlertSeverityFilter] = useState('all');
  const [alertCategoryFilter, setAlertCategoryFilter] = useState('all');
  const [alertSearch, setAlertSearch] = useState('');

  // Print modal states
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printOrder, setPrintOrder] = useState(null);

  // Color theme
  const colors = {
    primary: theme.primary,
    primaryLight: theme.primary + 'cc', // 80% opacity
    primaryDark: theme.primary + '99',  // 60% opacity
    primaryBg: theme.primary + '20',    // 12% opacity
    primaryBgDark: theme.primary + '40', // 25% opacity
    success: theme.success || '#10b981',
    warning: theme.accent || '#f59e0b',
    danger: theme.danger || '#ef4444',
    info: '#3b82f6', // Keep as fallback or use theme.secondary
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
    }
  ];

  // Alerts Data
  const alertsData = [
    {
      id: 'ALT-001',
      orderId: 'ORD-001',
      severity: 'high',
      message: 'Pickup time approaching - Action required',
      date: '2026-08-09 14:30',
      status: 'active',
      category: 'Pickup'
    },
    {
      id: 'ALT-002',
      orderId: 'ORD-002',
      severity: 'critical',
      message: 'Loading delay - Contact dispatcher immediately',
      date: '2026-08-11 09:15',
      status: 'active',
      category: 'Loading'
    },
    {
      id: 'ALT-003',
      orderId: 'ORD-005',
      severity: 'info',
      message: 'Delivery confirmed - Release documents',
      date: '2026-08-17 16:00',
      status: 'resolved',
      category: 'Delivery'
    },
    {
      id: 'ALT-004',
      orderId: 'ORD-003',
      severity: 'medium',
      message: 'Route congestion - Expected delay of 1 hour',
      date: '2026-08-16 10:20',
      status: 'active',
      category: 'Route'
    },
    {
      id: 'ALT-005',
      orderId: 'ORD-004',
      severity: 'low',
      message: 'Assignment referred - Awaiting new assignment',
      date: '2026-09-01 11:20',
      status: 'resolved',
      category: 'Assignment'
    }
  ];

  // Status options for orders
  const statusOptions = [
    { value: 'Pending', label: 'Pending', color: colors.warning },
    { value: 'Accepted', label: 'Accepted', color: colors.info },
    { value: 'In Transit', label: 'In Transit', color: colors.primary },
    { value: 'Delivered', label: 'Delivered', color: colors.success },
    { value: 'Rejected', label: 'Rejected', color: colors.danger },
    { value: 'Refer', label: 'Refer', color: colors.info }
  ];

  // Get unique requesters for filter
  const getUniqueRequesters = () => {
    const requesters = ordersData.map(o => o.requestedBy.name);
    return ['all', ...new Set(requesters)];
  };

  // Get unique alert categories
  const getUniqueAlertCategories = () => {
    const categories = alertsData.map(a => a.category);
    return ['all', ...new Set(categories)];
  };

  // Get unique alert severities
  const getUniqueAlertSeverities = () => {
    const severities = alertsData.map(a => a.severity);
    return ['all', ...new Set(severities)];
  };

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

  // Get alert severity color
  const getAlertSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return colors.danger;
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.info;
      case 'info': return colors.info;
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

  // Filtered orders with multiple filters
  const getFilteredOrders = () => {
    let filtered = [...ordersData];

    // Status filter
    if (orderFilter !== 'all') {
      filtered = filtered.filter(o => o.status === orderFilter);
    }

    // Assignment status filter
    if (orderStatusFilter !== 'all') {
      filtered = filtered.filter(o => o.assignmentStatus === orderStatusFilter);
    }

    // Search filter
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

  const filteredOrders = getFilteredOrders();

  // Filtered alerts
  const getFilteredAlerts = () => {
    let filtered = [...alertsData];

    if (alertStatusFilter !== 'all') {
      filtered = filtered.filter(a => a.status === alertStatusFilter);
    }

    if (alertSeverityFilter !== 'all') {
      filtered = filtered.filter(a => a.severity === alertSeverityFilter);
    }

    if (alertCategoryFilter !== 'all') {
      filtered = filtered.filter(a => a.category === alertCategoryFilter);
    }

    if (alertSearch) {
      const search = alertSearch.toLowerCase();
      filtered = filtered.filter(a =>
        a.message.toLowerCase().includes(search) ||
        a.orderId.toLowerCase().includes(search) ||
        a.category.toLowerCase().includes(search)
      );
    }

    return filtered;
  };

  const filteredAlerts = getFilteredAlerts();

  // Pagination for orders
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Pagination for alerts
  const indexOfLastAlert = alertsPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirstAlert, indexOfLastAlert);
  const totalAlertPages = Math.ceil(filteredAlerts.length / alertsPerPage);

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

  const goToAlertPage = (page) => {
    if (page >= 1 && page <= totalAlertPages) {
      setAlertsPage(page);
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
    setOrderStatusFilter('all');
    setOrderSearch('');
    setOrderSortBy('date-desc');
    setCurrentPage(1);
  };

  const resetAlertFilters = () => {
    setAlertStatusFilter('all');
    setAlertSeverityFilter('all');
    setAlertCategoryFilter('all');
    setAlertSearch('');
    setAlertsPage(1);
  };

  // Handle card click to filter by status
  const handleCardClick = (status) => {
    // Reset to first page when filtering
    setCurrentPage(1);
    
    // If clicking the same status, deselect it (show all)
    if (orderFilter === status) {
      setOrderFilter('all');
    } else {
      setOrderFilter(status);
    }
  };

  // Handle card click for assignment status filter
  const handleAssignmentCardClick = (status) => {
    // Reset to first page when filtering
    setCurrentPage(1);
    
    // If clicking the same status, deselect it (show all)
    if (orderStatusFilter === status) {
      setOrderStatusFilter('all');
    } else {
      setOrderStatusFilter(status);
    }
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

            {/* Attachment Section */}
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

            {/* Send Options */}
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
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
              {/* Order Info */}
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

              {/* Select Truck */}
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

              {/* Select Driver */}
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

              {/* Select Route */}
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
              {/* Assigned Resources */}
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

              {/* Map placeholder */}
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
              {/* Container Info */}
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

              {/* Cargo & Requester Info */}
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

              {/* Assigned Resources */}
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

            {/* Action Buttons */}
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

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, {user?.name || 'John'}! 👋
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Here's your inland transporter dashboard with all orders.
          </p>
        </div>

        {/* Stats Cards - Clickable */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${orderFilter === 'all' ? 'ring-1' : ''}`}
            style={{ ringColor: orderFilter === 'all' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('all')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Inbox className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs font-medium text-blue-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +3
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.total}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Orders
            </p>
            {orderFilter === 'all' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${orderFilter === 'Pending' ? 'ring-1' : ''}`}
            style={{ ringColor: orderFilter === 'Pending' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('Pending')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.warning + '20' }}>
                <Clock className="w-5 h-5" style={{ color: colors.warning }} />
              </div>
              <span className="text-xs font-medium text-yellow-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {orderStats.pending}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.pending}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Pending
            </p>
            {orderFilter === 'Pending' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${orderFilter === 'Accepted' ? 'ring-1' : ''}`}
            style={{ ringColor: orderFilter === 'Accepted' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('Accepted')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.success + '20' }}>
                <Check className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <Check className="w-3 h-3" />
                {orderStats.accepted}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.accepted}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Accepted
            </p>
            {orderFilter === 'Accepted' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${orderFilter === 'In Transit' ? 'ring-1' : ''}`}
            style={{ ringColor: orderFilter === 'In Transit' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('In Transit')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary + '20' }}>
                <Truck className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs font-medium text-primary flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {orderStats.inTransit}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.inTransit}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              In Transit
            </p>
            {orderFilter === 'In Transit' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${orderFilter === 'Delivered' ? 'ring-1' : ''}`}
            style={{ ringColor: orderFilter === 'Delivered' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('Delivered')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.success + '20' }}>
                <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {orderStats.delivered}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.delivered}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Delivered
            </p>
            {orderFilter === 'Delivered' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${orderFilter === 'Refer' || orderFilter === 'Rejected' ? 'ring-1' : ''}`}
            style={{ ringColor: (orderFilter === 'Refer' || orderFilter === 'Rejected') ? colors.primary : 'transparent' }}
            onClick={() => {
              // Toggle between showing all, or showing both Refer and Rejected
              if (orderFilter === 'Refer' || orderFilter === 'Rejected') {
                setOrderFilter('all');
                setCurrentPage(1);
              } else {
                // This will show both Refer and Rejected by filtering for both
                // We'll use a custom filter in the getFilteredOrders function
                setOrderFilter('Refer');
                setCurrentPage(1);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.info + '20' }}>
                <AlertCircle className="w-5 h-5" style={{ color: colors.info }} />
              </div>
              <span className="text-xs font-medium text-blue-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {orderStats.referred + orderStats.rejected}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.referred + orderStats.rejected}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Referred/Rejected
            </p>
            {(orderFilter === 'Refer' || orderFilter === 'Rejected') && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>
        </div>

        {/* Two Column Layout: Orders (Left) + Alerts (Right) */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* LEFT COLUMN - Orders Table */}
          <div className="xl:col-span-3">
            <div id="orders-section" className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                    <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      My Orders
                    </h2>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: colors.primaryBg,
                        color: colors.primary
                      }}
                    >
                      {filteredOrders.length}
                    </span>
                    {orderFilter !== 'all' && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full cursor-pointer hover:opacity-80"
                        style={{ 
                          backgroundColor: colors.danger + '20',
                          color: colors.danger
                        }}
                        onClick={() => {
                          setOrderFilter('all');
                          setCurrentPage(1);
                        }}
                      >
                        ✕ Clear Filter
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      <button
                        onClick={() => setOrderViewMode('grid')}
                        className={`p-1.5 transition-colors ${
                          orderViewMode === 'grid'
                            ? isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
                            : isDark ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-white text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setOrderViewMode('list')}
                        className={`p-1.5 transition-colors ${
                          orderViewMode === 'list'
                            ? isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
                            : isDark ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-white text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={resetOrderFilters}
                      className="px-2 py-1.5 rounded-lg text-xs transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      style={{ color: colors.primary }}
                      title="Reset Filters"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Filter Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 min-w-[100px] max-w-[180px]">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>

                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Refer">Refer</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">Assignment</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Refer">Refer</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <select
                    value={orderSortBy}
                    onChange={(e) => setOrderSortBy(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="date-desc">Latest</option>
                    <option value="date-asc">Oldest</option>
                    <option value="distance-desc">Longest</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>

              {/* Orders View */}
              {filteredOrders.length > 0 ? (
                orderViewMode === 'list' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[900px]">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Order
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Container
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Pickup Location
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Destination
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Status
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Requester
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOrders.map((order) => {
                          const statusDisplay = getOrderStatusDisplay(order);
                          return (
                            <React.Fragment key={order.id}>
                              <tr
                                className={`border-b cursor-pointer transition-colors ${
                                  isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                                } ${expandedOrderId === order.id ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                                onClick={() => toggleOrderExpand(order.id)}
                                data-order-id={order.id}
                              >
                                <td className="py-2 px-2">
                                  <div className="flex items-center gap-1">
                                    <Truck className="w-3 h-3" style={{ color: colors.primary }} />
                                    <span className={`font-medium text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                      {order.id}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-2 px-2">
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {order.containerId}
                                  </span>
                                </td>
                                <td className="py-2 px-2">
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {order.pickupLocation.substring(0, 20)}{order.pickupLocation.length > 20 ? '...' : ''}
                                  </span>
                                </td>
                                <td className="py-2 px-2">
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {order.destinationLocation.substring(0, 20)}{order.destinationLocation.length > 20 ? '...' : ''}
                                  </span>
                                </td>
                                <td className="py-2 px-2">
                                  <span className={`text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1`}
                                    style={{
                                      backgroundColor: statusDisplay.color + '20',
                                      color: statusDisplay.color
                                    }}>
                                    {statusDisplay.icon}
                                    {order.status}
                                  </span>
                                </td>
                                <td className="py-2 px-2">
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {order.requestedBy.name.substring(0, 15)}{order.requestedBy.name.length > 15 ? '...' : ''}
                                  </span>
                                </td>
                                <td className="py-2 px-2">
                                  <div className="flex items-center gap-0.5">
                                    <button
                                      className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                      style={{ color: colors.primary }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleOrderExpand(order.id);
                                      }}
                                      title="View"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    {order.status === 'Pending' && (
                                      <>
                                        <button
                                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                          style={{ color: colors.success }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAssignmentAction(order, 'accept');
                                          }}
                                          title="Accept"
                                        >
                                          <Check className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                          style={{ color: colors.danger }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAssignmentAction(order, 'reject');
                                          }}
                                          title="Reject"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                          style={{ color: colors.info }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleAssignmentAction(order, 'refer');
                                          }}
                                          title="Refer"
                                        >
                                          <AlertCircle className="w-3.5 h-3.5" />
                                        </button>
                                      </>
                                    )}
                                    {(order.status === 'Pending' || order.status === 'Accepted') && (
                                      <button
                                        className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                        style={{ color: colors.primary }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAssignResources(order);
                                        }}
                                        title="Assign Resources"
                                      >
                                        <Truck className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    {(order.status === 'Accepted' || order.status === 'In Transit') && (
                                      <>
                                        <button
                                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                          style={{ color: colors.primary }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdateStatus(order);
                                          }}
                                          title="Update Status"
                                        >
                                          <Truck className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                          style={{ color: colors.success }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSendBill(order);
                                          }}
                                          title="Send Invoice"
                                        >
                                          <DollarIcon className="w-3.5 h-3.5" />
                                        </button>
                                      </>
                                    )}
                                    <button
                                      className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                      style={{ color: colors.info }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewRoute(order);
                                      }}
                                      title="View Route"
                                    >
                                      <Map className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                      style={{ color: colors.primary }}
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
                ) : (
                  <>
                    {renderGridView()}
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
                  </>
                )
              ) : (
                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Truck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No orders found</p>
                  <p className="text-xs">Try adjusting your filters</p>
                  <button
                    onClick={resetOrderFilters}
                    className="mt-3 px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN - Alerts Section */}
          <div className="xl:col-span-1">
            <div id="alerts-section" className={`rounded-lg p-4 transition-all duration-300 h-full ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${alertsData.filter(a => a.status === 'active').length > 0 ? 'border-r-4' : ''}`}
            style={{
              borderRightColor: alertsData.filter(a => a.status === 'active').length > 0 ? colors.danger : 'transparent'
            }}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${alertsData.filter(a => a.status === 'active').length > 0 ? 'animate-pulse' : ''}`}
                      style={{ backgroundColor: colors.danger + '20' }}>
                      <Bell className="w-4 h-4" style={{ color: colors.danger }} />
                    </div>
                    <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Alerts
                    </h3>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: colors.danger + '20',
                        color: colors.danger
                      }}
                    >
                      {alertsData.filter(a => a.status === 'active').length}
                    </span>
                    {alertsData.filter(a => a.status === 'active' && a.severity === 'critical').length > 0 && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-500 text-white animate-pulse">
                        ⚠️
                      </span>
                    )}
                  </div>
                  <button
                    onClick={resetAlertFilters}
                    className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    style={{ color: colors.primary }}
                    title="Reset Filters"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  <div className="relative flex-1 min-w-[80px]">
                    <Search className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={alertSearch}
                      onChange={(e) => setAlertSearch(e.target.value)}
                      className={`w-full pl-7 pr-2 py-1 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>

                  <select
                    value={alertStatusFilter}
                    onChange={(e) => setAlertStatusFilter(e.target.value)}
                    className={`px-1.5 py-1 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <select
                    value={alertSeverityFilter}
                    onChange={(e) => setAlertSeverityFilter(e.target.value)}
                    className={`px-1.5 py-1 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">Severity</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>

                  <select
                    value={alertCategoryFilter}
                    onChange={(e) => setAlertCategoryFilter(e.target.value)}
                    className={`px-1.5 py-1 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">Category</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Loading">Loading</option>
                    <option value="Route">Route</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[500px] space-y-2 mt-2 pr-1">
                  {currentAlerts.length > 0 ? (
                    currentAlerts.map((alert) => (
                      <div key={alert.id} className={`p-2.5 rounded-lg border-r-3 transition-all duration-300 ${
                        isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                      } ${alert.status === 'active' ? 'hover:shadow-md' : 'opacity-60'}`}
                      style={{ borderRightColor: getAlertSeverityColor(alert.severity), borderRightWidth: '3px' }}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                                alert.status === 'active' ? 'animate-pulse' : ''
                              }`}
                                style={{
                                  backgroundColor: getAlertSeverityColor(alert.severity) + '20',
                                  color: getAlertSeverityColor(alert.severity)
                                }}>
                                {alert.severity.toUpperCase()}
                              </span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                alert.status === 'active'
                                  ? 'bg-green-500/20 text-green-500'
                                  : 'bg-gray-500/20 text-gray-500'
                              }`}>
                                {alert.status}
                              </span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                              }`}>
                                {alert.category}
                              </span>
                            </div>
                            <p className={`text-xs mt-1 ${isDark ? 'text-gray-200' : 'text-gray-800'} line-clamp-2`}>
                              {alert.message}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                                {alert.orderId}
                              </span>
                              <button
                                className="p-0.5 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                                style={{ color: colors.primary }}
                                onClick={() => {
                                  const order = ordersData.find(o => o.id === alert.orderId);
                                  if (order) {
                                    setExpandedOrderId(order.id);
                                  }
                                }}
                                title="View Order"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <CheckCircle className="w-8 h-8 mx-auto mb-1 opacity-50" />
                      <p className="text-xs">No alerts</p>
                    </div>
                  )}
                </div>

                {totalAlertPages > 1 && (
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {alertsPage}/{totalAlertPages}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => goToAlertPage(alertsPage - 1)}
                        disabled={alertsPage === 1}
                        className={`p-1 rounded transition-colors ${
                          alertsPage === 1
                            ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                            : isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => goToAlertPage(alertsPage + 1)}
                        disabled={alertsPage === totalAlertPages}
                        className={`p-1 rounded transition-colors ${
                          alertsPage === totalAlertPages
                            ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                            : isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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

export default InlandTransporterDashboard;