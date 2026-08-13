// roles/clearingagent/ClearingAgentDashboard.jsx
import React, { useState, useContext } from 'react';
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
  ChevronUp,
  Plus,
  Save,
  X as XIcon,
  Gauge,
  Percent,
  FileSpreadsheet,
  ShieldCheck
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ClearingAgentDashboard = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [expandedContainerId, setExpandedContainerId] = useState(null);
  const [containerViewMode, setContainerViewMode] = useState('list');
  const [expandedPackingListId, setExpandedPackingListId] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedContainerForAction, setSelectedContainerForAction] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [showBillModal, setShowBillModal] = useState(false);
  const [billAmount, setBillAmount] = useState('');
  const [billDescription, setBillDescription] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [customStatusInput, setCustomStatusInput] = useState('');
  const [showCustomStatusInput, setShowCustomStatusInput] = useState(false);
  const [activeTab, setActiveTab] = useState('new');
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressNote, setProgressNote] = useState('');
  const [showSLAModal, setShowSLAModal] = useState(false);
  const [selectedSLA, setSelectedSLA] = useState(null);

  // Predefined status options
  const [statusOptions, setStatusOptions] = useState([
    'New Request',
    'In Review',
    'Processing',
    'Awaiting Documents',
    'Customs Inspection',
    'Cleared',
    'Delivered',
    'On Hold',
    'Completed',
    'Cancelled'
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [alertsPage, setAlertsPage] = useState(1);
  const [alertsPerPage] = useState(3);

  // Filter states
  const [containerSearch, setContainerSearch] = useState('');
  const [containerSortBy, setContainerSortBy] = useState('date-desc');
  const [expandedContainerTab, setExpandedContainerTab] = useState('info');
  const [documentFilter, setDocumentFilter] = useState('all');

  // Alert filter states
  const [alertStatusFilter, setAlertStatusFilter] = useState('all');
  const [alertSeverityFilter, setAlertSeverityFilter] = useState('all');
  const [alertCategoryFilter, setAlertCategoryFilter] = useState('all');
  const [alertSearch, setAlertSearch] = useState('');

  // Print modal states
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printContainer, setPrintContainer] = useState(null);
  const [printOptions, setPrintOptions] = useState({
    packingLists: false,
    documents: false,
    allPackingLists: false,
    allDocuments: false,
    selectedPackingList: null,
    selectedDocument: null
  });

  // Color theme
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

  // SLA Documents Data
  const slaDocuments = {
    'CLR-001': {
      name: 'SLA Agreement - ImportFlow Ltd',
      type: 'pdf',
      size: '1.2 MB',
      signedDate: '2026-07-15',
      expiryDate: '2026-12-31',
      status: 'Active',
      documentUrl: '/sla/clr-001.pdf'
    },
    'CLR-002': {
      name: 'SLA Agreement - Global Textiles Uganda Ltd',
      type: 'pdf',
      size: '0.9 MB',
      signedDate: '2026-07-20',
      expiryDate: '2026-12-31',
      status: 'Active',
      documentUrl: '/sla/clr-002.pdf'
    },
    'CLR-003': {
      name: 'SLA Agreement - Machinery Uganda Ltd',
      type: 'pdf',
      size: '1.1 MB',
      signedDate: '2026-06-10',
      expiryDate: '2026-12-31',
      status: 'Active',
      documentUrl: '/sla/clr-003.pdf'
    },
    'CLR-004': {
      name: 'SLA Agreement - Packaging Solutions Ltd',
      type: 'pdf',
      size: '0.8 MB',
      signedDate: '2026-08-01',
      expiryDate: '2026-12-31',
      status: 'Pending',
      documentUrl: '/sla/clr-004.pdf'
    },
    'CLR-005': {
      name: 'SLA Agreement - AutoParts Uganda Ltd',
      type: 'pdf',
      size: '1.0 MB',
      signedDate: '2026-07-25',
      expiryDate: '2026-12-31',
      status: 'Active',
      documentUrl: '/sla/clr-005.pdf'
    }
  };

  // Document data for containers
  const containerDocuments = {
    'CLR-001': [
      { id: 'DOC-001', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-07-20', size: '2.4 MB' },
      { id: 'DOC-002', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-07-18', size: '1.8 MB' },
      { id: 'DOC-003', name: 'Packing List', type: 'pdf', status: 'pending', date: '2026-07-25', size: '0.9 MB' },
      { id: 'DOC-004', name: 'Certificate of Origin', type: 'pdf', status: 'uploaded', date: '2026-07-22', size: '1.2 MB' },
    ],
    'CLR-002': [
      { id: 'DOC-005', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-08-05', size: '2.1 MB' },
      { id: 'DOC-006', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-03', size: '1.5 MB' },
      { id: 'DOC-007', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-08-06', size: '0.8 MB' },
      { id: 'DOC-008', name: 'UNBS CoC', type: 'pdf', status: 'pending', date: '2026-08-10', size: '3.2 MB' },
      { id: 'DOC-009', name: 'Insurance Certificate', type: 'pdf', status: 'uploaded', date: '2026-08-04', size: '1.1 MB' },
    ],
    'CLR-003': [
      { id: 'DOC-010', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-07-15', size: '2.6 MB' },
      { id: 'DOC-011', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-07-12', size: '2.0 MB' },
      { id: 'DOC-012', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-07-16', size: '1.0 MB' },
      { id: 'DOC-013', name: 'Delivery Note', type: 'pdf', status: 'uploaded', date: '2026-08-05', size: '0.7 MB' },
    ],
    'CLR-004': [
      { id: 'DOC-014', name: 'Bill of Lading', type: 'pdf', status: 'pending', date: '2026-09-01', size: '2.3 MB' },
      { id: 'DOC-015', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-30', size: '1.6 MB' },
      { id: 'DOC-016', name: 'Packing List', type: 'pdf', status: 'pending', date: '2026-09-02', size: '0.8 MB' },
    ],
    'CLR-005': [
      { id: 'DOC-017', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-08-22', size: '2.7 MB' },
      { id: 'DOC-018', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-20', size: '2.2 MB' },
      { id: 'DOC-019', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-08-23', size: '0.9 MB' },
      { id: 'DOC-020', name: 'Certificate of Origin', type: 'pdf', status: 'pending', date: '2026-08-25', size: '1.3 MB' },
      { id: 'DOC-021', name: 'UNBS PVoC', type: 'pdf', status: 'pending', date: '2026-08-28', size: '3.5 MB' },
    ]
  };

  // Alerts Data
  const alertsData = [
    {
      id: 'ALT-001',
      containerId: 'CLR-001',
      severity: 'high',
      message: 'Customs inspection required - Document mismatch detected',
      date: '2026-08-10 14:30',
      status: 'active',
      category: 'Documentation'
    },
    {
      id: 'ALT-002',
      containerId: 'CLR-002',
      severity: 'critical',
      message: 'UNBS CoC certificate missing - Action required immediately',
      date: '2026-08-11 09:15',
      status: 'active',
      category: 'Compliance'
    },
    {
      id: 'ALT-003',
      containerId: 'CLR-005',
      severity: 'medium',
      message: 'Port congestion - Expected delay of 2-3 days',
      date: '2026-08-09 16:45',
      status: 'active',
      category: 'Logistics'
    },
    {
      id: 'ALT-004',
      containerId: 'CLR-004',
      severity: 'low',
      message: 'Invoice discrepancy - Minor correction required',
      date: '2026-08-08 11:20',
      status: 'resolved',
      category: 'Documentation'
    },
    {
      id: 'ALT-005',
      containerId: 'CLR-003',
      severity: 'info',
      message: 'Container cleared successfully - Ready for delivery',
      date: '2026-08-05 17:00',
      status: 'resolved',
      category: 'Delivery'
    },
    {
      id: 'ALT-006',
      containerId: 'CLR-002',
      severity: 'high',
      message: 'Customs hold - Additional inspection requested',
      date: '2026-08-12 08:30',
      status: 'active',
      category: 'Customs'
    },
  ];

  // Enhanced Container Data for Clearing Agent with SLA and Progress
  const containersData = [
    {
      id: 'CLR-001',
      sealNo: 'SEAL-78923',
      serviceName: 'MV Star Express',
      size: '40ft HC',
      packages: 24,
      grossWeight: '28,500 kg',
      volume: '67.5 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Premium Electronics and Circuit Components',
      client: 'ImportFlow Ltd',
      consignee: {
        name: 'ImportFlow Ltd',
        contact: '+256 700 123456',
        email: 'operations@importflow.com',
        address: 'Kampala Business Park, Plot 45, Kampala'
      },
      status: 'At Port',
      location: 'Mombasa Port - Customs Bond',
      voyage: 'MV Star Express',
      eta: '12 Aug 2026',
      daysAtSea: 0,
      assignedAgent: {
        id: 'AGT-001',
        name: 'Swift Clearance Services',
        email: 'info@swiftclearance.com',
        contact: '+254 711 123456'
      },
      assignedTransporter: {
        id: 'TRP-001',
        name: 'East African Logistics',
        email: 'dispatch@eastafricalogistics.com',
        contact: '+256 712 345678'
      },
      agentProgress: 65,
      agentStatus: 'Document Submission in Progress',
      assignmentDate: '2026-08-01',
      assignmentStatus: 'New Request',
      clearanceStatus: 'In Progress',
      daysInPort: 5,
      transitStatus: 'At Port',
      expectedArrivalDate: '2026-08-12',
      shipDetails: 'MV Star Express | Voyage: 2026-08',
      transporterReady: false,
      paymentStatus: 'Pending',
      transporterProgress: 30,
      transporterStatus: 'Loading at Port',
      transporterLocation: 'Mombasa Port',
      transporterETA: '2026-08-16 14:00',
      slaStatus: 'Active',
      myProgress: 45,
      packingLists: [
        {
          id: 'PL-001',
          name: 'Packing List 1 - Electronics Components',
          packages: [
            {
              id: 'PKG-001',
              name: 'Circuit Boards Package',
              quantity: 200,
              items: [
                { name: 'Motherboard PCB', quantity: 100, unit: 'pieces' },
                { name: 'Power Supply Unit', quantity: 50, unit: 'pieces' },
                { name: 'Connector Cables', quantity: 200, unit: 'meters' }
              ]
            },
            {
              id: 'PKG-002',
              name: 'Power Supplies Package',
              quantity: 50,
              items: [
                { name: 'AC-DC Converters', quantity: 50, unit: 'pieces' },
                { name: 'Voltage Regulators', quantity: 100, unit: 'pieces' }
              ]
            }
          ]
        },
        {
          id: 'PL-002',
          name: 'Packing List 2 - Accessories',
          packages: [
            {
              id: 'PKG-003',
              name: 'Accessories Package',
              quantity: 100,
              items: [
                { name: 'Screen Protectors', quantity: 150, unit: 'pieces' },
                { name: 'USB Cables', quantity: 200, unit: 'pieces' },
                { name: 'Adapters', quantity: 100, unit: 'pieces' }
              ]
            }
          ]
        },
        {
          id: 'PL-003',
          name: 'Packing List 3 - Spare Parts',
          packages: [
            {
              id: 'PKG-004',
              name: 'Mechanical Parts',
              quantity: 80,
              items: [
                { name: 'Gears', quantity: 40, unit: 'pieces' },
                { name: 'Bearings', quantity: 60, unit: 'pieces' },
                { name: 'Screws Set', quantity: 200, unit: 'pieces' }
              ]
            }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '15 Jul 2026', completed: true },
        { stage: 'Vessel departed', date: '25 Jul 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '10 Aug 2026', completed: true },
        { stage: 'Customs inspection', date: '12 Aug 2026', completed: false },
        { stage: 'Delivery', date: '15 Aug 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-07-25 14:30', location: 'Shanghai Port, China', status: 'Departed' },
        { date: '2026-07-28 08:15', location: 'Singapore Strait', status: 'In Transit' },
        { date: '2026-08-02 22:45', location: 'Indian Ocean', status: 'In Transit' },
        { date: '2026-08-08 06:30', location: 'Approaching Mombasa', status: 'In Transit' },
        { date: '2026-08-10 08:00', location: 'Mombasa Port - Customs Bond', status: 'Arrived' }
      ],
      expectedDeparture: '2026-07-25',
      expectedArrival: '2026-08-10',
      delayed: false,
      delayReason: null,
      actionRequired: 'Submit Customs Declaration',
      daysInTransit: 16,
      dateReceived: '2026-08-01'
    },
    {
      id: 'CLR-002',
      sealNo: 'SEAL-45612',
      serviceName: 'MV Indian Trader',
      size: '20ft ST',
      packages: 15,
      grossWeight: '18,200 kg',
      volume: '33.2 m³',
      measurement: '6.0m x 2.4m x 2.6m',
      cargoDescription: 'Textile Fabrics and Dyeing Agents',
      client: 'Global Textiles Uganda Ltd',
      consignee: {
        name: 'Global Textiles Uganda Ltd',
        contact: '+256 712 345678',
        email: 'purchasing@globaltextiles.ug',
        address: '456 Industrial Area, Kampala, Uganda'
      },
      status: 'At Port',
      location: 'Mombasa Port - Customs Bond',
      voyage: 'MV Indian Trader',
      eta: '18 Aug 2026',
      daysAtSea: 0,
      assignedAgent: {
        id: 'AGT-001',
        name: 'Swift Clearance Services',
        email: 'info@swiftclearance.com',
        contact: '+254 711 123456'
      },
      assignedTransporter: {
        id: 'TRP-001',
        name: 'East African Logistics',
        email: 'dispatch@eastafricalogistics.com',
        contact: '+256 712 345678'
      },
      agentProgress: 65,
      agentStatus: 'Document Submission in Progress',
      assignmentDate: '2026-08-05',
      assignmentStatus: 'Processing',
      clearanceStatus: 'Awaiting Documents',
      daysInPort: 3,
      transitStatus: 'At Port',
      expectedArrivalDate: '2026-08-18',
      shipDetails: 'MV Indian Trader | Voyage: 2026-07',
      transporterReady: false,
      paymentStatus: 'Pending',
      transporterProgress: 30,
      transporterStatus: 'Loading at Port',
      transporterLocation: 'Mombasa Port',
      transporterETA: '2026-08-16 14:00',
      slaStatus: 'Active',
      myProgress: 70,
      packingLists: [
        {
          id: 'PL-004',
          name: 'Packing List 1 - Textile Fabrics',
          packages: [
            {
              id: 'PKG-005',
              name: 'Cotton Fabrics Package',
              quantity: 10,
              items: [
                { name: 'Cotton Rolls', quantity: 150, unit: 'meters' },
                { name: 'Dyed Fabrics', quantity: 80, unit: 'meters' }
              ]
            },
            {
              id: 'PKG-006',
              name: 'Synthetic Fabrics Package',
              quantity: 5,
              items: [
                { name: 'Polyester Rolls', quantity: 120, unit: 'meters' },
                { name: 'Nylon Sheets', quantity: 60, unit: 'meters' }
              ]
            }
          ]
        },
        {
          id: 'PL-005',
          name: 'Packing List 2 - Dyeing Agents',
          packages: [
            {
              id: 'PKG-007',
              name: 'Chemical Dyes Package',
              quantity: 8,
              items: [
                { name: 'Reactive Dyes', quantity: 40, unit: 'kg' },
                { name: 'Disperse Dyes', quantity: 35, unit: 'kg' }
              ]
            }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Aug 2026', completed: true },
        { stage: 'Vessel departed', date: '08 Aug 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '12 Aug 2026', completed: true },
        { stage: 'Customs inspection', date: '14 Aug 2026', completed: false },
        { stage: 'Delivery', date: '18 Aug 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-08-08 10:20', location: 'Mumbai Port, India', status: 'Departed' },
        { date: '2026-08-11 16:45', location: 'Arabian Sea', status: 'In Transit' },
        { date: '2026-08-12 08:00', location: 'Mombasa Port, Kenya', status: 'Arrived' }
      ],
      expectedDeparture: '2026-08-08',
      expectedArrival: '2026-08-12',
      delayed: false,
      delayReason: null,
      actionRequired: 'Submit UNBS CoC certificate',
      daysInTransit: 4,
      dateReceived: '2026-08-05'
    },
    {
      id: 'CLR-003',
      sealNo: 'SEAL-89234',
      serviceName: 'MV African Trader',
      size: '40ft HC',
      packages: 18,
      grossWeight: '32,400 kg',
      volume: '71.8 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Industrial Machinery and Spare Parts',
      client: 'Machinery Uganda Ltd',
      consignee: {
        name: 'Machinery Uganda Ltd',
        contact: '+256 701 234567',
        email: 'purchasing@machinery.ug',
        address: '789 Industrial Park, Kampala, Uganda'
      },
      status: 'Cleared',
      location: 'Nairobi Warehouse',
      voyage: 'MV African Trader',
      eta: 'Delivered 05 Aug 2026',
      daysAtSea: 0,
      assignedAgent: {
        id: 'AGT-001',
        name: 'Swift Clearance Services',
        email: 'info@swiftclearance.com',
        contact: '+254 711 123456'
      },
      assignedTransporter: {
        id: 'TRP-002',
        name: 'Trans-East Cargo Services',
        email: 'dispatch@trans-eastcargo.com',
        contact: '+256 703 456789'
      },
      agentProgress: 100,
      agentStatus: 'Completed',
      assignmentDate: '2026-07-20',
      assignmentStatus: 'Completed',
      clearanceStatus: 'Cleared',
      daysInPort: 0,
      transitStatus: 'Delivered',
      expectedArrivalDate: '2026-07-25',
      shipDetails: 'MV African Trader | Voyage: 2026-06',
      transporterReady: true,
      paymentStatus: 'Paid',
      transporterProgress: 100,
      transporterStatus: 'Delivered',
      transporterLocation: 'Nairobi Warehouse',
      transporterETA: 'Delivered',
      slaStatus: 'Completed',
      myProgress: 100,
      packingLists: [
        {
          id: 'PL-006',
          name: 'Packing List 1 - Machinery',
          packages: [
            {
              id: 'PKG-008',
              name: 'Main Machinery Package',
              quantity: 6,
              items: [
                { name: 'Industrial Press Machines', quantity: 2, unit: 'units' },
                { name: 'Conveyor Systems', quantity: 4, unit: 'units' }
              ]
            },
            {
              id: 'PKG-009',
              name: 'Spare Parts Package',
              quantity: 12,
              items: [
                { name: 'Motors', quantity: 8, unit: 'units' },
                { name: 'Belts', quantity: 24, unit: 'pieces' },
                { name: 'Bearings', quantity: 36, unit: 'pieces' }
              ]
            }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '10 Jul 2026', completed: true },
        { stage: 'Vessel departed', date: '20 Jul 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Jul 2026', completed: true },
        { stage: 'Customs inspection', date: '28 Jul 2026', completed: true },
        { stage: 'Delivery', date: '05 Aug 2026', completed: true },
      ],
      trackingHistory: [
        { date: '2026-07-20 08:30', location: 'Durban Port, South Africa', status: 'Departed' },
        { date: '2026-07-25 14:15', location: 'Mombasa Port, Kenya', status: 'Arrived' },
        { date: '2026-07-28 09:45', location: 'Mombasa Customs', status: 'Cleared' },
        { date: '2026-08-05 16:20', location: 'Nairobi Warehouse', status: 'Delivered' }
      ],
      expectedDeparture: '2026-07-20',
      expectedArrival: '2026-07-25',
      delayed: false,
      delayReason: null,
      actionRequired: 'Release final documents',
      daysInTransit: 16,
      dateReceived: '2026-07-20'
    },
    {
      id: 'CLR-004',
      sealNo: 'SEAL-56789',
      serviceName: 'MV Pacific Express',
      size: '20ft ST',
      packages: 20,
      grossWeight: '15,800 kg',
      volume: '33.2 m³',
      measurement: '6.0m x 2.4m x 2.6m',
      cargoDescription: 'Packaging Materials and Consumables',
      client: 'Packaging Solutions Ltd',
      consignee: {
        name: 'Packaging Solutions Ltd',
        contact: '+256 704 567890',
        email: 'purchasing@packaging.ug',
        address: '101 Packaging Way, Kampala, Uganda'
      },
      status: 'In Transit',
      location: 'Pacific Ocean',
      voyage: 'MV Pacific Express',
      eta: '28 Sep 2026',
      daysAtSea: 0,
      assignedAgent: {
        id: 'AGT-001',
        name: 'Swift Clearance Services',
        email: 'info@swiftclearance.com',
        contact: '+254 711 123456'
      },
      assignedTransporter: null,
      agentProgress: 25,
      agentStatus: 'Awaiting Documents',
      assignmentDate: '2026-09-01',
      assignmentStatus: 'Referred',
      clearanceStatus: 'Not Started',
      daysInPort: 0,
      transitStatus: 'At Sea',
      expectedArrivalDate: '2026-09-28',
      shipDetails: 'MV Pacific Express | Voyage: 2026-08',
      transporterReady: false,
      paymentStatus: 'Pending',
      transporterProgress: null,
      transporterStatus: null,
      transporterLocation: null,
      transporterETA: null,
      slaStatus: 'Pending',
      myProgress: 20,
      packingLists: [
        {
          id: 'PL-007',
          name: 'Packing List 1 - Packaging Materials',
          packages: [
            {
              id: 'PKG-010',
              name: 'Cardboard Boxes Package',
              quantity: 15,
              items: [
                { name: 'Standard Boxes', quantity: 500, unit: 'pieces' },
                { name: 'Heavy Duty Boxes', quantity: 200, unit: 'pieces' }
              ]
            },
            {
              id: 'PKG-011',
              name: 'Plastic Materials Package',
              quantity: 5,
              items: [
                { name: 'Bubble Wrap', quantity: 300, unit: 'meters' },
                { name: 'Plastic Sheets', quantity: 150, unit: 'meters' }
              ]
            }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '01 Sep 2026', completed: true },
        { stage: 'Vessel departed', date: '05 Sep 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '25 Sep 2026', completed: false },
        { stage: 'Customs inspection', date: '28 Sep 2026', completed: false },
        { stage: 'Delivery', date: '30 Sep 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-09-05 06:00', location: 'Shanghai Port, China', status: 'Departed' },
        { date: '2026-09-08 12:30', location: 'Pacific Ocean', status: 'In Transit' }
      ],
      expectedDeparture: '2026-09-05',
      expectedArrival: '2026-09-25',
      delayed: false,
      delayReason: null,
      actionRequired: 'Prepare customs documentation',
      daysInTransit: 3,
      dateReceived: '2026-09-01'
    },
    {
      id: 'CLR-005',
      sealNo: 'SEAL-34126',
      serviceName: 'MV Europe Trader',
      size: '40ft HC',
      packages: 22,
      grossWeight: '26,700 kg',
      volume: '67.5 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Automotive Components and Accessories',
      client: 'AutoParts Uganda Ltd',
      consignee: {
        name: 'AutoParts Uganda Ltd',
        contact: '+256 705 678901',
        email: 'purchasing@autoparts.ug',
        address: '789 Auto Strasse, Kampala, Uganda'
      },
      status: 'At Port',
      location: 'Mombasa Port - Customs Bond',
      voyage: 'MV Europe Trader',
      eta: '15 Sep 2026',
      daysAtSea: 0,
      assignedAgent: {
        id: 'AGT-001',
        name: 'Swift Clearance Services',
        email: 'info@swiftclearance.com',
        contact: '+254 711 123456'
      },
      assignedTransporter: {
        id: 'TRP-003',
        name: 'Kampala Freight Forwarders',
        email: 'info@kampalafreight.com',
        contact: '+256 701 234567'
      },
      agentProgress: 40,
      agentStatus: 'Document Review',
      assignmentDate: '2026-08-25',
      assignmentStatus: 'Declined',
      clearanceStatus: 'On Hold',
      daysInPort: 6,
      transitStatus: 'At Port',
      expectedArrivalDate: '2026-09-10',
      shipDetails: 'MV Europe Trader | Voyage: 2026-07',
      transporterReady: false,
      paymentStatus: 'Pending',
      transporterProgress: 10,
      transporterStatus: 'Awaiting Customs Clearance',
      transporterLocation: 'Mombasa Port - Customs Bond',
      transporterETA: '2026-09-18 09:00',
      slaStatus: 'Expired',
      myProgress: 35,
      packingLists: [
        {
          id: 'PL-008',
          name: 'Packing List 1 - Engine Parts',
          packages: [
            {
              id: 'PKG-012',
              name: 'Engine Components Package',
              quantity: 8,
              items: [
                { name: 'Pistons', quantity: 16, unit: 'pieces' },
                { name: 'Cylinder Heads', quantity: 8, unit: 'pieces' }
              ]
            },
            {
              id: 'PKG-013',
              name: 'Transmission Parts Package',
              quantity: 6,
              items: [
                { name: 'Gearboxes', quantity: 4, unit: 'units' },
                { name: 'Clutch Kits', quantity: 6, unit: 'kits' }
              ]
            }
          ]
        },
        {
          id: 'PL-009',
          name: 'Packing List 2 - Electrical Parts',
          packages: [
            {
              id: 'PKG-014',
              name: 'Electrical Components Package',
              quantity: 8,
              items: [
                { name: 'Alternators', quantity: 6, unit: 'units' },
                { name: 'Starter Motors', quantity: 6, unit: 'units' },
                { name: 'Wiring Harnesses', quantity: 12, unit: 'pieces' }
              ]
            }
          ]
        }
      ],
      milestones: [
        { stage: 'Supplier dispatched goods', date: '20 Aug 2026', completed: true },
        { stage: 'Vessel departed', date: '25 Aug 2026', completed: true },
        { stage: 'Arrived Mombasa', date: '10 Sep 2026', completed: true },
        { stage: 'Customs inspection', date: '12 Sep 2026', completed: false },
        { stage: 'Delivery', date: '15 Sep 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-08-25 14:00', location: 'Hamburg Port, Germany', status: 'Departed' },
        { date: '2026-08-28 20:30', location: 'North Sea', status: 'In Transit' },
        { date: '2026-09-03 07:15', location: 'Suez Canal', status: 'In Transit' },
        { date: '2026-09-10 09:45', location: 'Mombasa Port, Kenya', status: 'Arrived' }
      ],
      expectedDeparture: '2026-08-25',
      expectedArrival: '2026-09-10',
      delayed: true,
      delayReason: 'Port congestion - 3 day delay',
      actionRequired: 'Contact shipping line for updated ETA',
      daysInTransit: 16,
      dateReceived: '2026-08-25'
    }
  ];

  // Get filtered containers based on active tab
  const getFilteredByTab = () => {
    let filtered = [...containersData];
    
    switch(activeTab) {
      case 'new':
        filtered = filtered.filter(c => c.assignmentStatus === 'New Request');
        break;
      case 'accepted':
        filtered = filtered.filter(c => c.assignmentStatus === 'Accepted' || c.assignmentStatus === 'Processing');
        break;
      case 'referred':
        filtered = filtered.filter(c => c.assignmentStatus === 'Referred');
        break;
      case 'processed':
        filtered = filtered.filter(c => c.assignmentStatus === 'Completed' || c.assignmentStatus === 'Cleared');
        break;
      case 'declined':
        filtered = filtered.filter(c => c.assignmentStatus === 'Declined' || c.assignmentStatus === 'Cancelled');
        break;
      default:
        break;
    }
    
    return filtered;
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
      case 'Cleared': return colors.success;
      case 'At Port': return colors.warning;
      case 'In Transit': return colors.info;
      case 'Delivered': return colors.success;
      default: return colors.info;
    }
  };

  // Get assignment status color
  const getAssignmentStatusColor = (status) => {
    switch(status) {
      case 'New Request': return colors.info;
      case 'Accepted': return colors.success;
      case 'Processing': return colors.warning;
      case 'Referred': return colors.primary;
      case 'Completed': return colors.success;
      case 'Cleared': return colors.success;
      case 'Declined': return colors.danger;
      case 'Cancelled': return colors.danger;
      default: return colors.info;
    }
  };

  // Get SLA status color
  const getSLAStatusColor = (status) => {
    switch(status) {
      case 'Active': return colors.success;
      case 'Pending': return colors.warning;
      case 'Completed': return colors.success;
      case 'Expired': return colors.danger;
      default: return colors.info;
    }
  };

  // Get clearance status color
  const getClearanceStatusColor = (status) => {
    switch(status) {
      case 'Cleared': return colors.success;
      case 'In Progress': return colors.warning;
      case 'On Hold': return colors.danger;
      case 'Awaiting Documents': return colors.info;
      case 'Not Started': return colors.info;
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

  // Get document status icon
  const getDocumentStatusIcon = (status) => {
    switch(status) {
      case 'uploaded': return <FileCheckIcon className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected': return <FileX className="w-4 h-4 text-red-500" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  // Get document status color
  const getDocumentStatusColor = (status) => {
    switch(status) {
      case 'uploaded': return colors.success;
      case 'pending': return colors.warning;
      case 'rejected': return colors.danger;
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

  // Get transit status display
  const getTransitStatusDisplay = (container) => {
    if (container.status === 'Cleared' || container.status === 'Delivered') {
      return { label: 'Delivered', color: colors.success, icon: <CheckCircle className="w-4 h-4" /> };
    }
    if (container.transitStatus === 'At Port') {
      return { 
        label: `At Port (${container.daysInPort || 0} days)`, 
        color: colors.warning, 
        icon: <Anchor className="w-4 h-4" /> 
      };
    }
    if (container.transitStatus === 'At Sea') {
      return { 
        label: `In Transit (${container.daysInTransit || 0} days)`, 
        color: colors.info, 
        icon: <Ship className="w-4 h-4" /> 
      };
    }
    return { label: container.transitStatus, color: colors.info, icon: <Info className="w-4 h-4" /> };
  };

  // Filtered containers with multiple filters
  const getFilteredContainers = () => {
    let filtered = getFilteredByTab();
    
    // Search filter
    if (containerSearch) {
      const search = containerSearch.toLowerCase();
      filtered = filtered.filter(c =>
        c.id.toLowerCase().includes(search) ||
        c.sealNo.toLowerCase().includes(search) ||
        c.voyage.toLowerCase().includes(search) ||
        c.cargoDescription.toLowerCase().includes(search) ||
        c.client.toLowerCase().includes(search)
      );
    }
    
    // Sort
    switch(containerSortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.dateReceived || b.assignmentDate) - new Date(a.dateReceived || a.assignmentDate));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.dateReceived || a.assignmentDate) - new Date(b.dateReceived || b.assignmentDate));
        break;
      case 'packages-desc':
        filtered.sort((a, b) => b.packages - a.packages);
        break;
      case 'days-desc':
        filtered.sort((a, b) => (b.daysInPort || 0) - (a.daysInPort || 0));
        break;
      case 'status':
        filtered.sort((a, b) => a.assignmentStatus.localeCompare(b.assignmentStatus));
        break;
      case 'progress-desc':
        filtered.sort((a, b) => (b.myProgress || 0) - (a.myProgress || 0));
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const filteredContainers = getFilteredContainers();

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
        a.containerId.toLowerCase().includes(search) ||
        a.category.toLowerCase().includes(search)
      );
    }

    return filtered;
  };

  const filteredAlerts = getFilteredAlerts();

  // Pagination for containers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContainers = filteredContainers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContainers.length / itemsPerPage);

  // Pagination for alerts
  const indexOfLastAlert = alertsPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirstAlert, indexOfLastAlert);
  const totalAlertPages = Math.ceil(filteredAlerts.length / alertsPerPage);

  // Stats
  const containerStats = {
    total: containersData.length,
    atPort: containersData.filter(c => c.status === 'At Port').length,
    inTransit: containersData.filter(c => c.status === 'In Transit').length,
    cleared: containersData.filter(c => c.status === 'Cleared').length,
    new: containersData.filter(c => c.assignmentStatus === 'New Request').length,
    accepted: containersData.filter(c => c.assignmentStatus === 'Accepted' || c.assignmentStatus === 'Processing').length,
    referred: containersData.filter(c => c.assignmentStatus === 'Referred').length,
    processed: containersData.filter(c => c.assignmentStatus === 'Completed' || c.assignmentStatus === 'Cleared').length,
    declined: containersData.filter(c => c.assignmentStatus === 'Declined' || c.assignmentStatus === 'Cancelled').length
  };

  // Handle container toggle expand
  const toggleContainerExpand = (containerId) => {
    setExpandedContainerId(expandedContainerId === containerId ? null : containerId);
    setExpandedContainerTab('info');
  };

  // Handle assignment actions
  const handleAssignmentAction = (container, action) => {
    setSelectedContainerForAction(container);
    setActionType(action);
    setActionReason('');
    setShowActionModal(true);
  };

  const confirmAssignmentAction = () => {
    console.log(`Action: ${actionType} on container ${selectedContainerForAction.id}`, actionReason);
    
    const updatedContainers = containersData.map(c => {
      if (c.id === selectedContainerForAction.id) {
        let newStatus = c.assignmentStatus;
        switch(actionType) {
          case 'accept':
            newStatus = 'Accepted';
            break;
          case 'reject':
            newStatus = 'Declined';
            break;
          case 'refer':
            newStatus = 'Referred';
            break;
          default:
            break;
        }
        return { ...c, assignmentStatus: newStatus };
      }
      return c;
    });
    
    setShowActionModal(false);
    setSelectedContainerForAction(null);
    setActionReason('');
  };

  // Handle send bill
  const handleSendBill = (container) => {
    setSelectedContainerForAction(container);
    setBillAmount('');
    setBillDescription('');
    setShowBillModal(true);
  };

  const confirmSendBill = () => {
    console.log(`Sending bill for ${selectedContainerForAction.id}: $${billAmount} - ${billDescription}`);
    setShowBillModal(false);
    setSelectedContainerForAction(null);
    setBillAmount('');
    setBillDescription('');
  };

  // Handle update status
  const handleUpdateStatus = (container) => {
    setSelectedContainerForAction(container);
    setNewStatus(container.assignmentStatus);
    setStatusNote('');
    setShowStatusModal(true);
  };

  const confirmStatusUpdate = () => {
    console.log(`Updating status for ${selectedContainerForAction.id} to ${newStatus}`, statusNote);
    const updatedContainers = containersData.map(c => {
      if (c.id === selectedContainerForAction.id) {
        return { ...c, assignmentStatus: newStatus };
      }
      return c;
    });
    setShowStatusModal(false);
    setSelectedContainerForAction(null);
    setNewStatus('');
    setStatusNote('');
  };

  // Handle adding custom status
  const handleAddCustomStatus = () => {
    if (customStatusInput.trim() && !statusOptions.includes(customStatusInput.trim())) {
      setStatusOptions([...statusOptions, customStatusInput.trim()]);
      setNewStatus(customStatusInput.trim());
      setCustomStatusInput('');
      setShowCustomStatusInput(false);
    }
  };

  // Handle view SLA document
  const handleViewSLA = (containerId) => {
    const sla = slaDocuments[containerId];
    if (sla) {
      setSelectedSLA(sla);
      setShowSLAModal(true);
    }
  };

  // Handle download SLA document
  const handleDownloadSLA = (containerId) => {
    const sla = slaDocuments[containerId];
    if (sla) {
      console.log(`Downloading SLA document for ${containerId}: ${sla.name}`);
      window.open(sla.documentUrl, '_blank');
    }
  };

  // Handle view document
  const handleViewDocument = (doc) => {
    window.open(`/documents/${doc.id}`, '_blank');
  };

  // Handle download document
  const handleDownloadDocument = (doc) => {
    console.log(`Downloading document ${doc.id}`);
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
  const handlePrint = (container) => {
    setPrintContainer(container);
    setPrintOptions({
      packingLists: false,
      documents: false,
      allPackingLists: false,
      allDocuments: false,
      selectedPackingList: null,
      selectedDocument: null
    });
    setShowPrintModal(true);
  };

  const executePrint = () => {
    console.log('Printing:', printOptions);
    setShowPrintModal(false);
    window.print();
  };

  // Reset filters
  const resetContainerFilters = () => {
    setContainerSearch('');
    setContainerSortBy('date-desc');
    setCurrentPage(1);
  };

  const resetAlertFilters = () => {
    setAlertStatusFilter('all');
    setAlertSeverityFilter('all');
    setAlertCategoryFilter('all');
    setAlertSearch('');
    setAlertsPage(1);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Render responsive container card for mobile
  const renderResponsiveCard = (container) => {
    const transitInfo = getTransitStatusDisplay(container);
    const sla = slaDocuments[container.id];
    const isExpanded = expandedContainerId === container.id;
    
    return (
      <div 
        key={container.id} 
        className={`rounded-lg transition-all duration-300 mb-3 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        } ${isExpanded ? 'ring-1 ring-primary' : ''}`}
        style={{ ringColor: isExpanded ? colors.primary : 'transparent' }}
      >
        <div className="p-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {container.id}
              </span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full`}
              style={{
                backgroundColor: getAssignmentStatusColor(container.assignmentStatus) + '20',
                color: getAssignmentStatusColor(container.assignmentStatus)
              }}>
              {container.assignmentStatus}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="flex justify-between py-1 border-b" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Date:</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {container.dateReceived || container.assignmentDate || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Client:</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {container.client}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status:</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full cursor-pointer hover:opacity-80 flex items-center gap-1`}
                style={{
                  backgroundColor: getAssignmentStatusColor(container.assignmentStatus) + '20',
                  color: getAssignmentStatusColor(container.assignmentStatus)
                }}
                onClick={() => handleUpdateStatus(container)}
                title="Click to update status">
                <Edit className="w-2.5 h-2.5" />
                {container.assignmentStatus}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Progress:</span>
              <div className="flex items-center gap-1">
                <Gauge className="w-3 h-3" style={{ color: getAgentProgressColor(container.myProgress || 0) }} />
                <span className={`font-medium`} style={{ color: getAgentProgressColor(container.myProgress || 0) }}>
                  {container.myProgress || 0}%
                </span>
              </div>
            </div>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>SLA:</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 cursor-pointer hover:opacity-80`}
                style={{
                  backgroundColor: getSLAStatusColor(container.slaStatus) + '20',
                  color: getSLAStatusColor(container.slaStatus)
                }}
                onClick={() => handleViewSLA(container.id)}
                title="Click to view SLA">
                <ShieldCheck className="w-2.5 h-2.5" />
                {container.slaStatus}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Transit:</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1`}
                style={{
                  backgroundColor: transitInfo.color + '20',
                  color: transitInfo.color
                }}>
                {transitInfo.icon}
                {container.transitStatus === 'At Port' ? `${container.daysInPort || 0}d` : 
                 container.transitStatus === 'At Sea' ? `${container.daysInTransit || 0}d` : 
                 'Delivered'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: isDark ? '#374151' : '#f3f4f6' }}>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA:</span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {container.expectedArrivalDate || container.eta}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Payment:</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full`}
                style={{
                  backgroundColor: container.paymentStatus === 'Paid' ? colors.success + '20' : colors.warning + '20',
                  color: container.paymentStatus === 'Paid' ? colors.success : colors.warning
                }}>
                {container.paymentStatus}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={() => toggleContainerExpand(container.id)}
              className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
              style={{ backgroundColor: colors.primary }}
            >
              <Eye className="w-3 h-3" />
              {isExpanded ? 'Hide' : 'View'}
            </button>
            
            {container.assignmentStatus === 'New Request' && (
              <>
                <button
                  onClick={() => handleAssignmentAction(container, 'accept')}
                  className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.success }}
                >
                  <ThumbsUp className="w-3 h-3" />
                  Accept
                </button>
                <button
                  onClick={() => handleAssignmentAction(container, 'reject')}
                  className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.danger }}
                >
                  <ThumbsDown className="w-3 h-3" />
                  Decline
                </button>
                <button
                  onClick={() => handleAssignmentAction(container, 'refer')}
                  className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.info }}
                >
                  <AlertCircle className="w-3 h-3" />
                  Refer
                </button>
              </>
            )}
            
            {container.assignmentStatus === 'Accepted' && (
              <>
                <button
                  onClick={() => handleSendBill(container)}
                  className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Send className="w-3 h-3" />
                  Bill
                </button>
                <button
                  onClick={() => handleUpdateStatus(container)}
                  className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.warning }}
                >
                  <Edit className="w-3 h-3" />
                  Status
                </button>
              </>
            )}
            
            {(container.assignmentStatus === 'Processing' || 
              container.assignmentStatus === 'Referred' || 
              container.assignmentStatus === 'Cleared') && (
              <button
                onClick={() => handleUpdateStatus(container)}
                className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                style={{ backgroundColor: colors.warning }}
              >
                <Edit className="w-3 h-3" />
                Status
              </button>
            )}
            
            <button
              onClick={() => handlePrint(container)}
              className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
              style={{ backgroundColor: colors.primary }}
            >
              <Printer className="w-3 h-3" />
              Print
            </button>
          </div>

          {/* Collapse Arrow */}
          {isExpanded && (
            <div className="flex justify-center mt-2 pt-2 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <button
                onClick={() => toggleContainerExpand(container.id)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                style={{ color: colors.primary }}
              >
                <ChevronUp className="w-3 h-3" />
                <span className="text-[10px]">Hide Details</span>
              </button>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className={`p-3 border-t ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Cargo:</span>
                <span className={`text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {container.cargoDescription}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Transporter:</span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {container.assignedTransporter?.name || 'Not Assigned'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Clearance:</span>
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full`}
                  style={{
                    backgroundColor: getClearanceStatusColor(container.clearanceStatus) + '20',
                    color: getClearanceStatusColor(container.clearanceStatus)
                  }}>
                  {container.clearanceStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Voyage:</span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{container.voyage}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Packages:</span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{container.packages}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Gross Weight:</span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{container.grossWeight}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Location:</span>
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{container.location}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Print Modal
  const PrintModal = () => {
    if (!showPrintModal || !printContainer) return null;

    const docs = containerDocuments[printContainer.id] || [];

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
                Print Options - {printContainer.id}
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
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Packing Lists
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={printOptions.allPackingLists}
                      onChange={(e) => {
                        setPrintOptions({
                          ...printOptions,
                          allPackingLists: e.target.checked,
                          packingLists: e.target.checked
                        });
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      All Packing Lists
                    </span>
                  </label>
                  {printContainer.packingLists.map((pl) => (
                    <label key={pl.id} className="flex items-center gap-2 cursor-pointer ml-6">
                      <input
                        type="checkbox"
                        checked={printOptions.selectedPackingList === pl.id}
                        onChange={(e) => {
                          setPrintOptions({
                            ...printOptions,
                            selectedPackingList: e.target.checked ? pl.id : null,
                            packingLists: e.target.checked
                          });
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {pl.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Documents
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={printOptions.allDocuments}
                      onChange={(e) => {
                        setPrintOptions({
                          ...printOptions,
                          allDocuments: e.target.checked,
                          documents: e.target.checked
                        });
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      All Documents
                    </span>
                  </label>
                  {docs.map((doc) => (
                    <label key={doc.id} className="flex items-center gap-2 cursor-pointer ml-6">
                      <input
                        type="checkbox"
                        checked={printOptions.selectedDocument === doc.id}
                        onChange={(e) => {
                          setPrintOptions({
                            ...printOptions,
                            selectedDocument: e.target.checked ? doc.id : null,
                            documents: e.target.checked
                          });
                        }}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {doc.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <button
              onClick={() => setShowPrintModal(false)}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
    if (!showActionModal || !selectedContainerForAction) return null;

    const actionLabels = {
      accept: 'Accept Request',
      reject: 'Decline Request',
      refer: 'Refer Request'
    };

    const actionDescriptions = {
      accept: 'Accept this clearance request and start processing',
      reject: 'Decline this clearance request',
      refer: 'Refer this request to another department for review'
    };

    const actionColors = {
      accept: colors.success,
      reject: colors.danger,
      refer: colors.info
    };

    const actionIcons = {
      accept: <ThumbsUp className="w-5 h-5" />,
      reject: <ThumbsDown className="w-5 h-5" />,
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
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {actionLabels[actionType]}
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {actionDescriptions[actionType]}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowActionModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Container:</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedContainerForAction.id}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Client:</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedContainerForAction.client}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Cargo:</span>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedContainerForAction.cargoDescription.substring(0, 30)}...
                </span>
              </div>
            </div>

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
                {actionLabels[actionType]}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Bill Modal
  const BillModal = () => {
    if (!showBillModal || !selectedContainerForAction) return null;

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
                Send Bill to Client
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
              Container: <span className="font-medium">{selectedContainerForAction.id}</span>
            </p>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Client: <span className="font-medium">{selectedContainerForAction.client}</span>
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
                Description
              </label>
              <textarea
                value={billDescription}
                onChange={(e) => setBillDescription(e.target.value)}
                placeholder="Enter bill description..."
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
                Send Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Status Update Modal
  const StatusUpdateModal = () => {
    if (!showStatusModal || !selectedContainerForAction) return null;

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
              <Edit className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Update Status - {selectedContainerForAction.id}
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
              Current Status: <span className="font-medium" style={{ color: getAssignmentStatusColor(selectedContainerForAction.assignmentStatus) }}>
                {selectedContainerForAction.assignmentStatus}
              </span>
            </p>

            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Select New Status
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto mt-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => setNewStatus(status)}
                    className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all duration-200 ${
                      newStatus === status
                        ? 'ring-2 bg-opacity-20'
                        : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: newStatus === status ? getAssignmentStatusColor(status) + '20' : 'transparent',
                      ringColor: getAssignmentStatusColor(status),
                      color: isDark ? '#fff' : '#111827'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getAssignmentStatusColor(status) }} />
                      <span>{status}</span>
                      {newStatus === status && <Check className="w-4 h-4 ml-auto" style={{ color: getAssignmentStatusColor(status) }} />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Add Custom Status */}
              <div className="mt-3">
                {!showCustomStatusInput ? (
                  <button
                    onClick={() => setShowCustomStatusInput(true)}
                    className="text-sm flex items-center gap-1 transition-colors hover:opacity-80"
                    style={{ color: colors.primary }}
                  >
                    <Plus className="w-3 h-3" />
                    Add Custom Status
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customStatusInput}
                      onChange={(e) => setCustomStatusInput(e.target.value)}
                      placeholder="Enter custom status..."
                      className={`flex-1 px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddCustomStatus();
                        }
                      }}
                    />
                    <button
                      onClick={handleAddCustomStatus}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setShowCustomStatusInput(false);
                        setCustomStatusInput('');
                      }}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                      style={{ color: colors.danger }}
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
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
                style={{ focusRingColor: colors.primary }}
                rows="2"
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
                disabled={!newStatus}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
                  !newStatus ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: colors.primary }}
              >
                <Save className="w-4 h-4 inline mr-2" />
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render SLA Modal
  const SLAModal = () => {
    if (!showSLAModal || !selectedSLA) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowSLAModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                SLA Document Details
              </h3>
            </div>
            <button
              onClick={() => setShowSLAModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Name</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedSLA.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedSLA.type.toUpperCase()}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Size</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedSLA.size}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Signed Date</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedSLA.signedDate}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expiry Date</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedSLA.expiryDate}
                  </p>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                  style={{
                    backgroundColor: getSLAStatusColor(selectedSLA.status) + '20',
                    color: getSLAStatusColor(selectedSLA.status)
                  }}>
                  {selectedSLA.status === 'Active' && <CheckCircle className="w-3 h-3" />}
                  {selectedSLA.status === 'Pending' && <Clock className="w-3 h-3" />}
                  {selectedSLA.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                  {selectedSLA.status === 'Expired' && <AlertCircle className="w-3 h-3" />}
                  {selectedSLA.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowSLAModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.open(selectedSLA.documentUrl, '_blank');
                  setShowSLAModal(false);
                }}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Eye className="w-4 h-4" />
                View Document
              </button>
              <button
                onClick={() => {
                  window.open(selectedSLA.documentUrl, '_blank');
                  setShowSLAModal(false);
                }}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.info }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render documents tab content
  const renderDocumentsTab = (container) => {
    const docs = containerDocuments[container.id] || [];
    const filteredDocs = documentFilter === 'all' ? docs : docs.filter(d => d.status === documentFilter);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Documents ({docs.length})
          </h3>
          <div className="flex items-center gap-2">
            <select
              value={documentFilter}
              onChange={(e) => setDocumentFilter(e.target.value)}
              className={`px-2 py-1 rounded-lg border text-xs focus:outline-none focus:ring-2 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Documents</option>
              <option value="uploaded">Uploaded</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              className="px-3 py-1 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
              style={{ backgroundColor: colors.primary }}
            >
              <Upload className="w-3 h-3" />
              Upload
            </button>
          </div>
        </div>

        {filteredDocs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Document Name
                  </th>
                  <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Type
                  </th>
                  <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Status
                  </th>
                  <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Date
                  </th>
                  <th className={`text-left py-2 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit`}
                        style={{
                          backgroundColor: getDocumentStatusColor(doc.status) + '20',
                          color: getDocumentStatusColor(doc.status)
                        }}>
                        {getDocumentStatusIcon(doc.status)}
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {doc.date}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleViewDocument(doc)}
                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                          style={{ color: colors.primary }}
                          title="View Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadDocument(doc)}
                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                          style={{ color: colors.primary }}
                          title="Download Document"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`text-center py-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No documents found</p>
          </div>
        )}
      </div>
    );
  };

  // Render expanded container details (for list view)
  const renderExpandedContainer = (container) => {
    const isExpanded = expandedContainerId === container.id;
    if (!isExpanded) return null;

    const tabs = [
      { id: 'info', label: 'Container Info', icon: Info },
      { id: 'packing', label: 'Packing List', icon: Package },
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'tracking', label: 'Tracking', icon: Map }
    ];

    const transitInfo = getTransitStatusDisplay(container);
    const sla = slaDocuments[container.id];

    return (
      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <td colSpan="11" className="p-0">
          <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
            {/* Status Banner */}
            <div className={`mb-4 p-3 rounded-lg flex items-center justify-between flex-wrap gap-2`}
              style={{ backgroundColor: `${transitInfo.color}20`, borderColor: transitInfo.color, borderLeft: `4px solid ${transitInfo.color}` }}>
              <div className="flex items-center gap-3">
                <span style={{ color: transitInfo.color }}>
                  {transitInfo.icon}
                </span>
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {transitInfo.label}
                  </p>
                  {container.delayed && (
                    <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                      Delay Reason: {container.delayReason}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full`} style={{
                  backgroundColor: getStatusColor(container.status) + '20',
                  color: getStatusColor(container.status)
                }}>
                  {container.status}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full`} style={{
                  backgroundColor: getAssignmentStatusColor(container.assignmentStatus) + '20',
                  color: getAssignmentStatusColor(container.assignmentStatus)
                }}>
                  {container.assignmentStatus}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Action: {container.actionRequired}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            {container.assignmentStatus === 'New Request' && (
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleAssignmentAction(container, 'accept')}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: colors.success }}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Accept Request
                </button>
                <button
                  onClick={() => handleAssignmentAction(container, 'reject')}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: colors.danger }}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Decline Request
                </button>
                <button
                  onClick={() => handleAssignmentAction(container, 'refer')}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: colors.info }}
                >
                  <AlertCircle className="w-4 h-4" />
                  Refer Request
                </button>
              </div>
            )}

            {container.assignmentStatus === 'Accepted' && (
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleSendBill(container)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Send className="w-4 h-4" />
                  Send Bill to Client
                </button>
                <button
                  onClick={() => handleUpdateStatus(container)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: colors.warning }}
                >
                  <Edit className="w-4 h-4" />
                  Update Status
                </button>
              </div>
            )}

            {(container.assignmentStatus === 'Processing' || 
              container.assignmentStatus === 'Referred' || 
              container.assignmentStatus === 'Cleared') && (
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus(container)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: colors.warning }}
                >
                  <Edit className="w-4 h-4" />
                  Update Status
                </button>
                {container.assignedTransporter && (
                  <button
                    onClick={() => alert(`Notifying transporter for ${container.id}`)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
                    style={{ backgroundColor: colors.info }}
                  >
                    <Truck className="w-4 h-4" />
                    Notify Transporter
                  </button>
                )}
              </div>
            )}

            {/* Tabs */}
            <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} overflow-x-auto mb-4`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setExpandedContainerTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                    expandedContainerTab === tab.id
                      ? 'border-b-2'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  style={{
                    borderColor: expandedContainerTab === tab.id ? colors.primary : 'transparent',
                    color: expandedContainerTab === tab.id ? colors.primary : undefined
                  }}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {expandedContainerTab === 'info' && (
                <div className="space-y-4">
                  {/* Container Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container No.</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.id}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Seal No.</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.sealNo}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Service Name</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.voyage}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Size</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.size}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Packages</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.packages}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Gross Weight</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.grossWeight}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.volume}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Measurement</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{container.measurement}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                        style={{
                          backgroundColor: getStatusColor(container.status) + '20',
                          color: getStatusColor(container.status)
                        }}>
                        {container.status === 'Cleared' && <CheckCircle className="w-3 h-3" />}
                        {container.status === 'At Port' && <Anchor className="w-3 h-3" />}
                        {container.status === 'In Transit' && <Ship className="w-3 h-3" />}
                        {container.status}
                      </span>
                    </div>
                  </div>

                  {/* Assignment & Clearance Info */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date Received</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.dateReceived || container.assignmentDate || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clearance Status</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                        style={{
                          backgroundColor: getClearanceStatusColor(container.clearanceStatus) + '20',
                          color: getClearanceStatusColor(container.clearanceStatus)
                        }}>
                        {container.clearanceStatus}
                      </span>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Payment Status</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                        style={{
                          backgroundColor: container.paymentStatus === 'Paid' ? colors.success + '20' : colors.warning + '20',
                          color: container.paymentStatus === 'Paid' ? colors.success : colors.warning
                        }}>
                        {container.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* SLA Info */}
                  {sla && (
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <ShieldCheck className="w-4 h-4" style={{ color: colors.primary }} />
                        Service Level Agreement (SLA)
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document</span>
                          <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {sla.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Signed Date</span>
                          <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {sla.signedDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expiry Date</span>
                          <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {sla.expiryDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1`}
                            style={{
                              backgroundColor: getSLAStatusColor(sla.status) + '20',
                              color: getSLAStatusColor(sla.status)
                            }}>
                            {sla.status === 'Active' && <CheckCircle className="w-3 h-3" />}
                            {sla.status === 'Pending' && <Clock className="w-3 h-3" />}
                            {sla.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                            {sla.status === 'Expired' && <AlertCircle className="w-3 h-3" />}
                            {sla.status}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleViewSLA(container.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                            style={{ backgroundColor: colors.primary }}
                          >
                            <Eye className="w-3 h-3" />
                            View SLA
                          </button>
                          <button
                            onClick={() => handleDownloadSLA(container.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                            style={{ backgroundColor: colors.info }}
                          >
                            <Download className="w-3 h-3" />
                            Download SLA
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ship Details & Expected Arrival */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ship Details</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.shipDetails || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expected Arrival</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.expectedArrivalDate || container.eta || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Transporter Info */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Truck className="w-4 h-4" style={{ color: colors.primary }} />
                      Assigned Inland Transporter
                    </h4>
                    {container.assignedTransporter ? (
                      <div className="space-y-2">
                        <div>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {container.assignedTransporter.name}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {container.assignedTransporter.email}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {container.assignedTransporter.contact}
                          </p>
                        </div>
                        {container.transporterProgress !== null && (
                          <div>
                            <div className="flex justify-between items-center text-xs">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Transport Progress: {container.transporterProgress}%
                              </span>
                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                {container.transporterStatus}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${container.transporterProgress}%`,
                                  backgroundColor: getAgentProgressColor(container.transporterProgress)
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        No transporter assigned
                      </p>
                    )}
                  </div>

                  {/* Client Info */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <User className="w-4 h-4" style={{ color: colors.primary }} />
                      Client Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <Building className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {container.client}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {container.consignee.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {container.consignee.contact}
                        </span>
                      </div>
                      <button
                        onClick={() => alert(`Notifying client for ${container.id}`)}
                        className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                        style={{ backgroundColor: colors.info }}
                      >
                        <Mail className="w-3 h-3" />
                        Notify Client
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {expandedContainerTab === 'packing' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Packing Lists ({container.packingLists.length})
                    </h3>
                    <button
                      onClick={() => handlePrint(container)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Printer className="w-3 h-3" />
                      Print
                    </button>
                  </div>

                  {container.packingLists.map((packingList) => (
                    <div key={packingList.id} className={`border rounded-lg overflow-hidden ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div
                        className={`p-3 cursor-pointer flex items-center justify-between ${
                          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setExpandedPackingListId(
                          expandedPackingListId === packingList.id ? null : packingList.id
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4" style={{ color: colors.primary }} />
                          <div>
                            <h4 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {packingList.name}
                            </h4>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {packingList.packages.length} packages
                            </p>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedPackingListId === packingList.id ? 'rotate-180' : ''} ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      </div>

                      {expandedPackingListId === packingList.id && (
                        <div className={`p-3 border-t ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                          {packingList.packages.map((pkg) => (
                            <div key={pkg.id} className="mb-3 last:mb-0">
                              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {pkg.name}
                                  </h5>
                                  <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                    {pkg.quantity} items
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {pkg.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                        {item.name}
                                      </span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {item.quantity} {item.unit}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {expandedContainerTab === 'documents' && renderDocumentsTab(container)}

              {expandedContainerTab === 'tracking' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Map className="w-5 h-5" style={{ color: colors.primary }} />
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Container Tracking
                      </h3>
                    </div>
                    <button
                      onClick={() => handlePrint(container)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Printer className="w-3 h-3" />
                      Print Tracking
                    </button>
                  </div>

                  <div className={`p-6 rounded-lg border-2 border-dashed text-center ${
                    isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-white'
                  }`}>
                    <Navigation className="w-12 h-12 mx-auto mb-3" style={{ color: colors.primary }} />
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Map View - Container {container.id}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Current Location: {container.location}
                    </p>
                    <button
                      className="mt-3 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Open Full Map View
                    </button>
                  </div>

                  <div>
                    <h4 className={`font-medium text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Shipment Milestones
                    </h4>
                    <div className="space-y-3">
                      {container.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="relative flex items-center justify-center w-6">
                            {milestone.completed ? (
                              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                            ) : (
                              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                            )}
                            {idx < container.milestones.length - 1 && (
                              <div className={`absolute top-6 w-0.5 h-8 ${
                                milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`}></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm ${milestone.completed ? 'line-through' : ''} ${
                              isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {milestone.stage}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {milestone.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`font-medium text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Tracking History
                    </h4>
                    <div className="space-y-2">
                      {container.trackingHistory.map((track, idx) => (
                        <div key={idx} className={`p-3 rounded-lg flex items-center justify-between ${
                          isDark ? 'bg-gray-700' : 'bg-white'
                        }`}>
                          <div>
                            <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {track.location}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {track.status}
                            </p>
                          </div>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {track.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Collapse Arrow at Bottom */}
            <div className="mt-4 pt-3 border-t flex justify-center" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <button
                onClick={() => toggleContainerExpand(container.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                style={{ color: colors.primary }}
              >
                <ChevronUp className="w-4 h-4" />
                <span className="text-xs font-medium">Hide Details</span>
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Render Grid View (for tablet and desktop)
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentContainers.map((container) => {
          const transitInfo = getTransitStatusDisplay(container);
          const sla = slaDocuments[container.id];
          return (
            <div key={container.id} className={`rounded-lg transition-all duration-300 ${
              isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white shadow-md'
            }`}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Anchor className="w-4 h-4" style={{ color: colors.primary }} />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.id}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full`}
                    style={{
                      backgroundColor: getAssignmentStatusColor(container.assignmentStatus) + '20',
                      color: getAssignmentStatusColor(container.assignmentStatus)
                    }}>
                    {container.assignmentStatus}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Client:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{container.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Progress:</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1`}
                      style={{
                        backgroundColor: getAgentProgressColor(container.myProgress || 0) + '20',
                        color: getAgentProgressColor(container.myProgress || 0)
                      }}>
                      <Gauge className="w-3 h-3" />
                      {container.myProgress || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>SLA:</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1 cursor-pointer hover:opacity-80`}
                      style={{
                        backgroundColor: getSLAStatusColor(container.slaStatus) + '20',
                        color: getSLAStatusColor(container.slaStatus)
                      }}
                      onClick={() => handleViewSLA(container.id)}
                      title="Click to view SLA">
                      <ShieldCheck className="w-3 h-3" />
                      {container.slaStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Payment:</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full`}
                      style={{
                        backgroundColor: container.paymentStatus === 'Paid' ? colors.success + '20' : colors.warning + '20',
                        color: container.paymentStatus === 'Paid' ? colors.success : colors.warning
                      }}>
                      {container.paymentStatus}
                    </span>
                  </div>
                  {container.delayed && (
                    <div className="flex justify-between text-red-500">
                      <span className="text-xs">⚠️ Delayed</span>
                      <span className="text-xs">{container.delayReason}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t flex gap-2" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <button
                    onClick={() => toggleContainerExpand(container.id)}
                    className="flex-1 px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {expandedContainerId === container.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
              {expandedContainerId === container.id && (
                <div className={`p-4 border-t ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Cargo:</span>
                      <span className={`text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.cargoDescription}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Transporter:</span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {container.assignedTransporter?.name || 'Not Assigned'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Clearance:</span>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full`}
                        style={{
                          backgroundColor: getClearanceStatusColor(container.clearanceStatus) + '20',
                          color: getClearanceStatusColor(container.clearanceStatus)
                        }}>
                        {container.clearanceStatus}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {container.assignmentStatus === 'New Request' && (
                        <>
                          <button
                            onClick={() => handleAssignmentAction(container, 'accept')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-1"
                            style={{ backgroundColor: colors.success }}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleAssignmentAction(container, 'reject')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-1"
                            style={{ backgroundColor: colors.danger }}
                          >
                            <ThumbsDown className="w-3 h-3" />
                            Decline
                          </button>
                          <button
                            onClick={() => handleAssignmentAction(container, 'refer')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-1"
                            style={{ backgroundColor: colors.info }}
                          >
                            <AlertCircle className="w-3 h-3" />
                            Refer
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => toggleContainerExpand(container.id)}
                        className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium border transition-all duration-200 hover:opacity-90"
                        style={{
                          borderColor: colors.primary,
                          color: colors.primary
                        }}
                      >
                        Details
                      </button>
                    </div>
                    {/* Collapse Arrow in Grid View */}
                    <div className="flex justify-center mt-3 pt-2 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      <button
                        onClick={() => toggleContainerExpand(container.id)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                        style={{ color: colors.primary }}
                      >
                        <ChevronUp className="w-3 h-3" />
                        <span className="text-[10px]">Hide Details</span>
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
            Here's your clearing agent dashboard with all assignment requests.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${activeTab === 'new' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: activeTab === 'new' ? colors.primary : 'transparent' }}
            onClick={() => handleTabChange('new')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.info + '20' }}>
                <Inbox className="w-5 h-5" style={{ color: colors.info }} />
              </div>
              <span className="text-xs font-medium text-blue-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {containerStats.new}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.new}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              New Requests
            </p>
            {activeTab === 'new' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${activeTab === 'accepted' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: activeTab === 'accepted' ? colors.primary : 'transparent' }}
            onClick={() => handleTabChange('accepted')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.success + '20' }}>
                <ThumbsUp className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <Check className="w-3 h-3" />
                {containerStats.accepted}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.accepted}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Accepted / Processing
            </p>
            {activeTab === 'accepted' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${activeTab === 'referred' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: activeTab === 'referred' ? colors.primary : 'transparent' }}
            onClick={() => handleTabChange('referred')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary + '20' }}>
                <AlertCircle className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs font-medium text-purple-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {containerStats.referred}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.referred}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Referred
            </p>
            {activeTab === 'referred' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${activeTab === 'processed' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: activeTab === 'processed' ? colors.primary : 'transparent' }}
            onClick={() => handleTabChange('processed')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.success + '20' }}>
                <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {containerStats.processed}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.processed}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Processed / Completed
            </p>
            {activeTab === 'processed' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${activeTab === 'declined' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: activeTab === 'declined' ? colors.primary : 'transparent' }}
            onClick={() => handleTabChange('declined')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.danger + '20' }}>
                <ThumbsDown className="w-5 h-5" style={{ color: colors.danger }} />
              </div>
              <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" />
                {containerStats.declined}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.declined}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Declined / Cancelled
            </p>
            {activeTab === 'declined' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>
        </div>

        {/* Two Column Layout: Containers (Left) + Alerts (Right) */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* LEFT COLUMN - Containers Table */}
          <div className="xl:col-span-3">
            <div id="containers-section" className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" style={{ color: colors.primary }} />
                    <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {activeTab === 'new' && 'New Requests'}
                      {activeTab === 'accepted' && 'Accepted / Processing'}
                      {activeTab === 'referred' && 'Referred Requests'}
                      {activeTab === 'processed' && 'Processed / Completed'}
                      {activeTab === 'declined' && 'Declined / Cancelled'}
                    </h2>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: colors.primaryBg,
                        color: colors.primary
                      }}
                    >
                      {filteredContainers.length}
                    </span>
                    {containerSearch && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full cursor-pointer hover:opacity-80"
                        style={{ 
                          backgroundColor: colors.danger + '20',
                          color: colors.danger
                        }}
                        onClick={() => {
                          setContainerSearch('');
                          setCurrentPage(1);
                        }}
                      >
                        ✕ Clear Search
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      <button
                        onClick={() => setContainerViewMode('grid')}
                        className={`p-1.5 transition-colors ${
                          containerViewMode === 'grid'
                            ? isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
                            : isDark ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-white text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setContainerViewMode('list')}
                        className={`p-1.5 transition-colors ${
                          containerViewMode === 'list'
                            ? isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
                            : isDark ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-white text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={resetContainerFilters}
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
                  <div className="relative flex-1 min-w-[100px] max-w-[200px]">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search by container, client..."
                      value={containerSearch}
                      onChange={(e) => setContainerSearch(e.target.value)}
                      className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>

                  <select
                    value={containerSortBy}
                    onChange={(e) => setContainerSortBy(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="date-desc">Latest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="packages-desc">Most Packages</option>
                    <option value="days-desc">Most Days in Port</option>
                    <option value="status">By Status</option>
                    <option value="progress-desc">Highest Progress</option>
                  </select>
                </div>
              </div>

              {/* Container View - Responsive */}
              {filteredContainers.length > 0 ? (
                <>
                  {/* Mobile: Card View (visible on small screens) */}
                  <div className="block md:hidden">
                    {currentContainers.map((container) => renderResponsiveCard(container))}
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

                  {/* Tablet/Desktop: Table View (hidden on mobile) */}
                  <div className="hidden md:block">
                    {containerViewMode === 'list' ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[900px]">
                          <thead>
                            <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Date Received
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Container
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Client
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Status
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Progress
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                SLA
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Transit
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                ETA
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Payment
                              </th>
                              <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentContainers.map((container) => {
                              const transitInfo = getTransitStatusDisplay(container);
                              return (
                                <React.Fragment key={container.id}>
                                  <tr
                                    className={`border-b cursor-pointer transition-colors ${
                                      isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                                    } ${expandedContainerId === container.id ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                                    onClick={() => toggleContainerExpand(container.id)}
                                    data-container-id={container.id}
                                  >
                                    <td className="py-2 px-2">
                                      <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {container.dateReceived || container.assignmentDate || 'N/A'}
                                      </span>
                                    </td>
                                    <td className="py-2 px-2">
                                      <div className="flex items-center gap-1">
                                        <Anchor className="w-3 h-3" style={{ color: colors.primary }} />
                                        <span className={`font-medium text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                          {container.id}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-2 px-2">
                                      <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {container.client.substring(0, 15)}{container.client.length > 15 ? '...' : ''}
                                      </span>
                                    </td>
                                    <td className="py-2 px-2">
                                      <span className={`text-xs px-1.5 py-0.5 rounded-full cursor-pointer hover:opacity-80 flex items-center gap-1`}
                                        style={{
                                          backgroundColor: getAssignmentStatusColor(container.assignmentStatus) + '20',
                                          color: getAssignmentStatusColor(container.assignmentStatus)
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleUpdateStatus(container);
                                        }}
                                        title="Click to update status">
                                        <Edit className="w-2.5 h-2.5" />
                                        {container.assignmentStatus}
                                      </span>
                                    </td>
                                    <td className="py-2 px-2">
                                      <div className="flex items-center gap-1">
                                        <Gauge className="w-3 h-3" style={{ color: getAgentProgressColor(container.myProgress || 0) }} />
                                        <span className={`text-xs font-medium`}
                                          style={{ color: getAgentProgressColor(container.myProgress || 0) }}>
                                          {container.myProgress || 0}%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="py-2 px-2">
                                      <span className={`text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 cursor-pointer hover:opacity-80`}
                                        style={{
                                          backgroundColor: getSLAStatusColor(container.slaStatus) + '20',
                                          color: getSLAStatusColor(container.slaStatus)
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleViewSLA(container.id);
                                        }}
                                        title="Click to view SLA">
                                        <ShieldCheck className="w-2.5 h-2.5" />
                                        {container.slaStatus}
                                      </span>
                                    </td>
                                    <td className="py-2 px-2">
                                      <span className={`text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1`}
                                        style={{
                                          backgroundColor: transitInfo.color + '20',
                                          color: transitInfo.color
                                        }}>
                                        {transitInfo.icon}
                                        {container.transitStatus === 'At Port' ? `${container.daysInPort || 0}d` : 
                                         container.transitStatus === 'At Sea' ? `${container.daysInTransit || 0}d` : 
                                         'Delivered'}
                                      </span>
                                    </td>
                                    <td className="py-2 px-2">
                                      <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {container.expectedArrivalDate || container.eta}
                                      </span>
                                    </td>
                                    <td className="py-2 px-2">
                                      <span className={`text-xs px-1.5 py-0.5 rounded-full`}
                                        style={{
                                          backgroundColor: container.paymentStatus === 'Paid' ? colors.success + '20' : colors.warning + '20',
                                          color: container.paymentStatus === 'Paid' ? colors.success : colors.warning
                                        }}>
                                        {container.paymentStatus}
                                      </span>
                                    </td>
                                    <td className="py-2 px-2">
                                      <div className="flex items-center gap-0.5 flex-wrap">
                                        {/* <button
                                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                          style={{ color: colors.primary }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleContainerExpand(container.id);
                                          }}
                                          title="View Details"
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                        </button> */}
                                        {container.assignmentStatus === 'New Request' && (
                                          <>
                                            <button
                                              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-0.5 text-[10px] font-medium"
                                              style={{ color: colors.success }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleAssignmentAction(container, 'accept');
                                              }}
                                              title="Accept Request"
                                            >
                                              <ThumbsUp className="w-3 h-3" />
                                              Accept
                                            </button>
                                            <button
                                              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-0.5 text-[10px] font-medium"
                                              style={{ color: colors.danger }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleAssignmentAction(container, 'reject');
                                              }}
                                              title="Decline Request"
                                            >
                                              <ThumbsDown className="w-3 h-3" />
                                              Decline
                                            </button>
                                            <button
                                              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-0.5 text-[10px] font-medium"
                                              style={{ color: colors.info }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleAssignmentAction(container, 'refer');
                                              }}
                                              title="Refer Request"
                                            >
                                              <AlertCircle className="w-3 h-3" />
                                              Refer
                                            </button>
                                            {/* <button
                                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                          style={{ color: colors.primary }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleContainerExpand(container.id);
                                          }}
                                          title="View Details"
                                        >
                                          <Eye className="w-3.5 h-3.5" />
                                        </button> */}
                                          </>
                                        )}
                                        {container.assignmentStatus === 'Accepted' && (
                                          <>
                                            <button
                                              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-0.5 text-[10px] font-medium"
                                              style={{ color: colors.primary }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleSendBill(container);
                                              }}
                                              title="Send Bill"
                                            >
                                              <Send className="w-3 h-3" />
                                              Bill
                                            </button>
                                            <button
                                              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-0.5 text-[10px] font-medium"
                                              style={{ color: colors.warning }}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdateStatus(container);
                                              }}
                                              title="Update Status"
                                            >
                                              <Edit className="w-3 h-3" />
                                              Status
                                            </button>
                                          </>
                                        )}
                                        {(container.assignmentStatus === 'Processing' || 
                                          container.assignmentStatus === 'Referred' || 
                                          container.assignmentStatus === 'Cleared') && (
                                          <button
                                            className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-0.5 text-[10px] font-medium"
                                            style={{ color: colors.warning }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleUpdateStatus(container);
                                            }}
                                            title="Update Status"
                                          >
                                            <Edit className="w-3 h-3" />
                                            Status
                                          </button>
                                        )}
                                        <button
                                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                          style={{ color: colors.primary }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handlePrint(container);
                                          }}
                                          title="Print"
                                        >
                                          <Printer className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                  {renderExpandedContainer(container)}
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
                    )}
                  </div>
                </>
              ) : (
                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No {activeTab.replace('-', ' ')} requests found</p>
                  <p className="text-xs">Try adjusting your search or filters</p>
                  <button
                    onClick={resetContainerFilters}
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
                    <option value="Documentation">Docs</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Customs">Customs</option>
                    <option value="Delivery">Delivery</option>
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
                                {alert.containerId}
                              </span>
                              <button
                                className="p-0.5 rounded transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                                style={{ color: colors.primary }}
                                onClick={() => {
                                  const container = containersData.find(c => c.id === alert.containerId);
                                  if (container) {
                                    setExpandedContainerId(container.id);
                                    setExpandedContainerTab('info');
                                  }
                                }}
                                title="View Container"
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
      {showStatusModal && <StatusUpdateModal />}
      {showPrintModal && <PrintModal />}
      {showSLAModal && <SLAModal />}
    </div>
  );
};

export default ClearingAgentDashboard;