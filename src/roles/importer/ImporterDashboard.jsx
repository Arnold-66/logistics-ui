// roles/importer/ImporterDashboard.jsx
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
  Compass
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const ImporterDashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [expandedContainerId, setExpandedContainerId] = useState(null);
  const [containerViewMode, setContainerViewMode] = useState('list');
  const [expandedPackageId, setExpandedPackageId] = useState(null);
  const [expandedPackingListId, setExpandedPackingListId] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [alertsPage, setAlertsPage] = useState(1);
  const [alertsPerPage] = useState(3);
  
  // Filter states
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef(null);
  
  // Assignment filter states
  const [assignmentFilter, setAssignmentFilter] = useState('all');
  const [assignmentSearch, setAssignmentSearch] = useState('');
  
  // Container view states
  const [containerFilter, setContainerFilter] = useState('all');
  const [containerSearch, setContainerSearch] = useState('');
  const [containerSupplierFilter, setContainerSupplierFilter] = useState('all');
  const [containerAgentFilter, setContainerAgentFilter] = useState('all');
  const [containerSortBy, setContainerSortBy] = useState('date-desc');
  const [showAssignAgentModal, setShowAssignAgentModal] = useState(false);
  const [showAssignTransporterModal, setShowAssignTransporterModal] = useState(false);
  const [selectedContainerForAssignment, setSelectedContainerForAssignment] = useState(null);
  const [assignmentType, setAssignmentType] = useState('agent');
  const [expandedContainerTab, setExpandedContainerTab] = useState('info');
  const [showActionMenu, setShowActionMenu] = useState(null);
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

  // Transporter tracking states
  const [showTransporterTracking, setShowTransporterTracking] = useState(false);
  const [trackingContainer, setTrackingContainer] = useState(null);

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

  // Document data for containers
  const containerDocuments = {
    'MSKU-458921': [
      { id: 'DOC-001', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-07-20', size: '2.4 MB' },
      { id: 'DOC-002', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-07-18', size: '1.8 MB' },
      { id: 'DOC-003', name: 'Packing List', type: 'pdf', status: 'pending', date: '2026-07-25', size: '0.9 MB' },
      { id: 'DOC-004', name: 'Certificate of Origin', type: 'pdf', status: 'uploaded', date: '2026-07-22', size: '1.2 MB' },
    ],
    'IN-782341': [
      { id: 'DOC-005', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-08-05', size: '2.1 MB' },
      { id: 'DOC-006', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-03', size: '1.5 MB' },
      { id: 'DOC-007', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-08-06', size: '0.8 MB' },
      { id: 'DOC-008', name: 'UNBS CoC', type: 'pdf', status: 'pending', date: '2026-08-10', size: '3.2 MB' },
      { id: 'DOC-009', name: 'Insurance Certificate', type: 'pdf', status: 'uploaded', date: '2026-08-04', size: '1.1 MB' },
    ],
    'SA-456732': [
      { id: 'DOC-010', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-07-15', size: '2.6 MB' },
      { id: 'DOC-011', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-07-12', size: '2.0 MB' },
      { id: 'DOC-012', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-07-16', size: '1.0 MB' },
      { id: 'DOC-013', name: 'Delivery Note', type: 'pdf', status: 'uploaded', date: '2026-08-05', size: '0.7 MB' },
    ],
    'PK-893421': [
      { id: 'DOC-014', name: 'Bill of Lading', type: 'pdf', status: 'pending', date: '2026-09-01', size: '2.3 MB' },
      { id: 'DOC-015', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-30', size: '1.6 MB' },
      { id: 'DOC-016', name: 'Packing List', type: 'pdf', status: 'pending', date: '2026-09-02', size: '0.8 MB' },
    ],
    'DE-782341': [
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
      containerId: 'MSKU-458921', 
      severity: 'high', 
      message: 'Customs inspection required - Document mismatch detected',
      date: '2026-08-10 14:30',
      status: 'active',
      category: 'Documentation'
    },
    { 
      id: 'ALT-002', 
      containerId: 'IN-782341', 
      severity: 'critical', 
      message: 'UNBS CoC certificate missing - Action required immediately',
      date: '2026-08-11 09:15',
      status: 'active',
      category: 'Compliance'
    },
    { 
      id: 'ALT-003', 
      containerId: 'DE-782341', 
      severity: 'medium', 
      message: 'Port congestion - Expected delay of 2-3 days',
      date: '2026-08-09 16:45',
      status: 'active',
      category: 'Logistics'
    },
    { 
      id: 'ALT-004', 
      containerId: 'PK-893421', 
      severity: 'low', 
      message: 'Invoice discrepancy - Minor correction required',
      date: '2026-08-08 11:20',
      status: 'resolved',
      category: 'Documentation'
    },
    { 
      id: 'ALT-005', 
      containerId: 'SA-456732', 
      severity: 'info', 
      message: 'Container delivered successfully - Release final documents',
      date: '2026-08-05 17:00',
      status: 'resolved',
      category: 'Delivery'
    },
    { 
      id: 'ALT-006', 
      containerId: 'IN-782341', 
      severity: 'high', 
      message: 'Customs hold - Additional inspection requested',
      date: '2026-08-12 08:30',
      status: 'active',
      category: 'Customs'
    },
  ];

  // Enhanced Container Data with detailed information
  const containersData = [
    {
      id: 'MSKU-458921',
      sealNo: 'SEAL-78923',
      serviceName: 'MV Star Express',
      size: '40ft HC',
      packages: 24,
      grossWeight: '28,500 kg',
      volume: '67.5 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Premium Electronics and Circuit Components',
      supplier: 'TechSource China Ltd',
      consignee: {
        name: 'ImportFlow Ltd',
        contact: '+256 700 123456',
        email: 'operations@importflow.com',
        address: 'Kampala Business Park, Plot 45, Kampala'
      },
      status: 'At Sea',
      location: 'Indian Ocean',
      voyage: 'MV Star Express',
      eta: '12 Aug 2026',
      daysAtSea: 8,
      assignedAgent: null,
      assignedTransporter: null,
      agentProgress: null,
      agentStatus: null,
      transporterProgress: null,
      transporterStatus: null,
      transporterLocation: null,
      transporterETA: null,
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
        { stage: 'Arrived Mombasa', date: '10 Aug 2026', completed: false },
        { stage: 'Customs inspection', date: '12 Aug 2026', completed: false },
        { stage: 'Delivery', date: '15 Aug 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-07-25 14:30', location: 'Shanghai Port, China', status: 'Departed' },
        { date: '2026-07-28 08:15', location: 'Singapore Strait', status: 'In Transit' },
        { date: '2026-08-02 22:45', location: 'Indian Ocean', status: 'In Transit' },
        { date: '2026-08-08 06:30', location: 'Approaching Mombasa', status: 'In Transit' }
      ],
      expectedDeparture: '2026-07-25',
      expectedArrival: '2026-08-10',
      delayed: false,
      delayReason: null,
      actionRequired: 'Monitor vessel progress'
    },
    {
      id: 'IN-782341',
      sealNo: 'SEAL-45612',
      serviceName: 'MV Indian Trader',
      size: '20ft ST',
      packages: 15,
      grossWeight: '18,200 kg',
      volume: '33.2 m³',
      measurement: '6.0m x 2.4m x 2.6m',
      cargoDescription: 'Textile Fabrics and Dyeing Agents',
      supplier: 'Global Textiles India Pvt Ltd',
      consignee: {
        name: 'ImportFlow Ltd',
        contact: '+256 700 123456',
        email: 'operations@importflow.com',
        address: 'Kampala Business Park, Plot 45, Kampala'
      },
      status: 'At Port',
      location: 'Mombasa Port - Customs Bond',
      voyage: 'MV Indian Trader',
      eta: '18 Aug 2026',
      daysAtSea: 4,
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
      transporterProgress: 30,
      transporterStatus: 'Loading at Port',
      transporterLocation: 'Mombasa Port',
      transporterETA: '2026-08-16 14:00',
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
      actionRequired: 'Submit UNBS CoC certificate'
    },
    {
      id: 'SA-456732',
      sealNo: 'SEAL-89234',
      serviceName: 'MV African Trader',
      size: '40ft HC',
      packages: 18,
      grossWeight: '32,400 kg',
      volume: '71.8 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Industrial Machinery and Spare Parts',
      supplier: 'African Machinery Solutions',
      consignee: {
        name: 'ImportFlow Ltd',
        contact: '+256 700 123456',
        email: 'operations@importflow.com',
        address: 'Kampala Business Park, Plot 45, Kampala'
      },
      status: 'Delivered',
      location: 'Nairobi Warehouse',
      voyage: 'MV African Trader',
      eta: 'Delivered 05 Aug 2026',
      daysAtSea: 12,
      assignedAgent: {
        id: 'AGT-002',
        name: 'Mombasa Port Logistics',
        email: 'info@mombasaportlogistics.com',
        contact: '+254 722 987654'
      },
      assignedTransporter: {
        id: 'TRP-002',
        name: 'Trans-East Cargo Services',
        email: 'dispatch@trans-eastcargo.com',
        contact: '+256 703 456789'
      },
      agentProgress: 100,
      agentStatus: 'Completed',
      transporterProgress: 100,
      transporterStatus: 'Delivered',
      transporterLocation: 'Nairobi Warehouse',
      transporterETA: 'Delivered',
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
      actionRequired: 'Release final documents'
    },
    {
      id: 'PK-893421',
      sealNo: 'SEAL-56789',
      serviceName: 'MV Pacific Express',
      size: '20ft ST',
      packages: 20,
      grossWeight: '15,800 kg',
      volume: '33.2 m³',
      measurement: '6.0m x 2.4m x 2.6m',
      cargoDescription: 'Packaging Materials and Consumables',
      supplier: 'Pacific Packaging Co.',
      consignee: {
        name: 'ImportFlow Ltd',
        contact: '+256 700 123456',
        email: 'operations@importflow.com',
        address: 'Kampala Business Park, Plot 45, Kampala'
      },
      status: 'In Transit',
      location: 'Pacific Ocean',
      voyage: 'MV Pacific Express',
      eta: '28 Sep 2026',
      daysAtSea: 5,
      assignedAgent: null,
      assignedTransporter: null,
      agentProgress: null,
      agentStatus: null,
      transporterProgress: null,
      transporterStatus: null,
      transporterLocation: null,
      transporterETA: null,
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
      actionRequired: 'Prepare customs documentation'
    },
    {
      id: 'DE-782341',
      sealNo: 'SEAL-34126',
      serviceName: 'MV Europe Trader',
      size: '40ft HC',
      packages: 22,
      grossWeight: '26,700 kg',
      volume: '67.5 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Automotive Components and Accessories',
      supplier: 'AutoParts Europe GmbH',
      consignee: {
        name: 'ImportFlow Ltd',
        contact: '+256 700 123456',
        email: 'operations@importflow.com',
        address: 'Kampala Business Park, Plot 45, Kampala'
      },
      status: 'At Port',
      location: 'Mombasa Port - Customs Bond',
      voyage: 'MV Europe Trader',
      eta: '15 Sep 2026',
      daysAtSea: 6,
      assignedAgent: {
        id: 'AGT-003',
        name: 'East Africa Customs Solutions',
        email: 'info@eastafricacustoms.com',
        contact: '+254 733 112233'
      },
      assignedTransporter: {
        id: 'TRP-003',
        name: 'Kampala Freight Forwarders',
        email: 'info@kampalafreight.com',
        contact: '+256 701 234567'
      },
      agentProgress: 40,
      agentStatus: 'Document Review',
      transporterProgress: 10,
      transporterStatus: 'Awaiting Customs Clearance',
      transporterLocation: 'Mombasa Port - Customs Bond',
      transporterETA: '2026-09-18 09:00',
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
      actionRequired: 'Contact shipping line for updated ETA'
    }
  ];

  // Get unique suppliers for filter
  const getUniqueSuppliers = () => {
    const suppliers = containersData.map(c => c.supplier);
    return ['all', ...new Set(suppliers)];
  };

  // Get unique agents for filter
  const getUniqueAgents = () => {
    const agents = containersData
      .map(c => c.assignedAgent?.name)
      .filter(Boolean);
    return ['all', ...new Set(agents)];
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
      case 'At Sea': return colors.primary;
      case 'At Port': return colors.warning;
      case 'In Transit': return colors.info;
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

  // Get status badge for container timeline
  const getContainerStatusInfo = (container) => {
    const info = {
      label: '',
      color: '',
      icon: null,
      action: ''
    };

    switch(container.status) {
      case 'At Sea':
        info.label = `Expected Arrival: ${container.expectedArrival}`;
        info.color = colors.info;
        info.icon = <Ship className="w-4 h-4" />;
        info.action = container.actionRequired || 'Monitor vessel progress';
        break;
      case 'At Port':
        info.label = `Port Arrival: ${container.expectedArrival}`;
        info.color = colors.warning;
        info.icon = <Anchor className="w-4 h-4" />;
        info.action = container.actionRequired || 'Submit customs documentation';
        break;
      case 'In Transit':
        info.label = `In Transit - ETA: ${container.eta}`;
        info.color = colors.primary;
        info.icon = <Navigation className="w-4 h-4" />;
        info.action = container.actionRequired || 'Prepare for arrival';
        break;
      case 'Delivered':
        info.label = `Delivered on: ${container.eta}`;
        info.color = colors.success;
        info.icon = <CheckCircle className="w-4 h-4" />;
        info.action = container.actionRequired || 'Release final documents';
        break;
      default:
        info.label = 'Status Unknown';
        info.color = colors.info;
        info.icon = <Info className="w-4 h-4" />;
        info.action = 'Check status';
    }

    if (container.delayed) {
      info.label = `⚠️ DELAYED: ${container.delayReason}`;
      info.color = colors.danger;
    }

    return info;
  };

  // Filtered containers with multiple filters
  const getFilteredContainers = () => {
    let filtered = [...containersData];
    
    // Status filter
    if (containerFilter !== 'all') {
      filtered = filtered.filter(c => c.status === containerFilter);
    }
    
    // Supplier filter
    if (containerSupplierFilter !== 'all') {
      filtered = filtered.filter(c => c.supplier === containerSupplierFilter);
    }
    
    // Agent filter
    if (containerAgentFilter !== 'all') {
      filtered = filtered.filter(c => c.assignedAgent?.name === containerAgentFilter);
    }
    
    // Search filter
    if (containerSearch) {
      const search = containerSearch.toLowerCase();
      filtered = filtered.filter(c => 
        c.id.toLowerCase().includes(search) ||
        c.sealNo.toLowerCase().includes(search) ||
        c.voyage.toLowerCase().includes(search) ||
        c.cargoDescription.toLowerCase().includes(search) ||
        c.supplier.toLowerCase().includes(search)
      );
    }
    
    // Sort
    switch(containerSortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.eta) - new Date(a.eta));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.eta) - new Date(b.eta));
        break;
      case 'packages-desc':
        filtered.sort((a, b) => b.packages - a.packages);
        break;
      case 'packages-asc':
        filtered.sort((a, b) => a.packages - b.packages);
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
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
    atSea: containersData.filter(c => c.status === 'At Sea').length,
    atPort: containersData.filter(c => c.status === 'At Port').length,
    delivered: containersData.filter(c => c.status === 'Delivered').length,
    inTransit: containersData.filter(c => c.status === 'In Transit').length
  };

  // Available agents for assignment
  const availableAgents = [
    { id: 'AGT-001', name: 'Swift Clearance Services', email: 'info@swiftclearance.com', contact: '+254 711 123456' },
    { id: 'AGT-002', name: 'Mombasa Port Logistics', email: 'info@mombasaportlogistics.com', contact: '+254 722 987654' },
    { id: 'AGT-003', name: 'East Africa Customs Solutions', email: 'info@eastafricacustoms.com', contact: '+254 733 112233' },
    { id: 'AGT-004', name: 'KPA Licensed Clearing Agents', email: 'agents@kpa.go.ke', contact: '+254 744 556677' }
  ];

  const availableTransporters = [
    { id: 'TRP-001', name: 'East African Logistics', email: 'dispatch@eastafricalogistics.com', contact: '+256 712 345678' },
    { id: 'TRP-002', name: 'Trans-East Cargo Services', email: 'dispatch@trans-eastcargo.com', contact: '+256 703 456789' },
    { id: 'TRP-003', name: 'Kampala Freight Forwarders', email: 'info@kampalafreight.com', contact: '+256 701 234567' },
    { id: 'TRP-004', name: 'Mombasa-Nairobi Haulage', email: 'dispatch@mombasanairobi.com', contact: '+254 700 123456' }
  ];

  // Handle container toggle expand
  const toggleContainerExpand = (containerId) => {
    setExpandedContainerId(expandedContainerId === containerId ? null : containerId);
    setExpandedContainerTab('info');
  };

  // Handle assign agent
  const handleAssignAgent = (container, agent) => {
    const updatedContainers = containersData.map(c => {
      if (c.id === container.id) {
        return { ...c, assignedAgent: agent, agentProgress: 0, agentStatus: 'Assigned' };
      }
      return c;
    });
    setShowAssignAgentModal(false);
    setShowActionMenu(null);
  };

  // Handle assign transporter
  const handleAssignTransporter = (container, transporter) => {
    const updatedContainers = containersData.map(c => {
      if (c.id === container.id) {
        return { ...c, assignedTransporter: transporter, transporterProgress: 0, transporterStatus: 'Assigned' };
      }
      return c;
    });
    setShowAssignTransporterModal(false);
    setShowActionMenu(null);
  };

  // Handle container actions
  const handleContainerAction = (action, container) => {
    console.log(`Action: ${action} on container ${container.id}`);
    setShowActionMenu(null);
  };

  // Handle view document
  const handleViewDocument = (doc) => {
    window.open(`/documents/${doc.id}`, '_blank');
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

  // Handle transporter tracking
  const handleTrackTransporter = (container) => {
    setTrackingContainer(container);
    setShowTransporterTracking(true);
  };

  // Reset filters
  const resetContainerFilters = () => {
    setContainerFilter('all');
    setContainerSupplierFilter('all');
    setContainerAgentFilter('all');
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

  // Handle quick assign transporter from action
  const handleQuickAssignTransporter = (container) => {
    setSelectedContainerForAssignment(container);
    setAssignmentType('transporter');
    setShowAssignTransporterModal(true);
  };

  // Handle quick assign agent from action
  const handleQuickAssignAgent = (container) => {
    setSelectedContainerForAssignment(container);
    setAssignmentType('agent');
    setShowAssignAgentModal(true);
  };

  // Handle card click to filter by status
  const handleCardClick = (status) => {
    // Reset to first page when filtering
    setCurrentPage(1);
    
    // If clicking the same status, deselect it (show all)
    if (containerFilter === status) {
      setContainerFilter('all');
    } else {
      setContainerFilter(status);
    }
  };

  // Render Print Modal with light background fix
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
              {/* Packing Lists Section */}
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

              {/* Documents Section */}
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

  // Render Transporter Tracking Modal
  const TransporterTrackingModal = () => {
    if (!showTransporterTracking || !trackingContainer) return null;
    if (!trackingContainer.assignedTransporter) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
             onClick={() => setShowTransporterTracking(false)}>
          <div className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 p-6 text-center">
            <Truck className="w-12 h-12 mx-auto mb-3" style={{ color: colors.primary }} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No Transporter Assigned
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Please assign a transporter to track their progress.
            </p>
            <button
              onClick={() => {
                setShowTransporterTracking(false);
                handleQuickAssignTransporter(trackingContainer);
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              Assign Transporter Now
            </button>
            <button
              onClick={() => setShowTransporterTracking(false)}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      );
    }

    const progress = trackingContainer.transporterProgress || 0;
    const status = trackingContainer.transporterStatus || 'Not Started';
    const location = trackingContainer.transporterLocation || 'Unknown';
    const eta = trackingContainer.transporterETA || 'Not Available';

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
           onClick={() => setShowTransporterTracking(false)}>
        <div 
          className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5" style={{ color: colors.primary }} />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Transporter Tracking - {trackingContainer.id}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {trackingContainer.assignedTransporter.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTransporterTracking(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Transport Progress
                </span>
                <span className="text-sm font-bold" style={{ color: getAgentProgressColor(progress) }}>
                  {progress}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: getAgentProgressColor(progress)
                  }}
                />
              </div>
            </div>

            {/* Status Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {status}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Location</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {location}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Estimated Arrival</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {eta}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Transporter</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {trackingContainer.assignedTransporter.name}
                </p>
              </div>
            </div>

            {/* Map View */}
            <div className={`p-4 rounded-lg border-2 border-dashed text-center ${
              isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-center justify-center mb-3">
                <Compass className="w-8 h-8" style={{ color: colors.primary }} />
                <Route className="w-8 h-8 ml-2" style={{ color: colors.primaryLight }} />
              </div>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Live Location Tracking
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {location}
              </p>
              <div className="mt-2 flex items-center justify-center gap-4 text-xs">
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  🟢 Last Updated: 2 min ago
                </span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  📍 Accuracy: High
                </span>
              </div>
              <button
                className="mt-3 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
                onClick={() => window.open('https://www.google.com/maps', '_blank')}
              >
                <Map className="w-4 h-4 inline mr-2" />
                Open Full Map View
              </button>
            </div>

            {/* Milestones */}
            <div className="mt-4">
              <h4 className={`font-medium text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Transport Milestones
              </h4>
              <div className="space-y-2">
                {[
                  { stage: 'Pickup from Port', completed: progress >= 20 },
                  { stage: 'In Transit', completed: progress >= 40 },
                  { stage: 'Customs Checkpoint', completed: progress >= 60 },
                  { stage: 'Onward Journey', completed: progress >= 80 },
                  { stage: 'Delivery Destination', completed: progress >= 100 },
                ].map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center w-5">
                      {milestone.completed ? (
                        <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                      ) : (
                        <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${milestone.completed ? 'line-through' : ''} ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {milestone.stage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Transporter */}
            <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Need to contact the transporter?
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.primary }}
                  onClick={() => window.location.href = `tel:${trackingContainer.assignedTransporter.contact}`}
                >
                  <Phone className="w-3 h-3" />
                  Call
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.primary }}
                  onClick={() => window.location.href = `mailto:${trackingContainer.assignedTransporter.email}`}
                >
                  <Mail className="w-3 h-3" />
                  Email
                </button>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {trackingContainer.assignedTransporter.contact}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Assign Agent Modal with light background fix
  const AssignAgentModal = () => {
    if (!showAssignAgentModal || !selectedContainerForAssignment) return null;

    const options = assignmentType === 'agent' ? availableAgents : availableTransporters;
    const title = assignmentType === 'agent' ? 'Assign Clearing Agent' : 'Assign Inland Transporter';
    const icon = assignmentType === 'agent' ? <User className="w-5 h-5" /> : <Truck className="w-5 h-5" />;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
           onClick={() => setShowAssignAgentModal(false)}>
        <div 
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={() => setShowAssignAgentModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
              Select a {assignmentType === 'agent' ? 'clearing agent' : 'transporter'} for Container {selectedContainerForAssignment.id}
            </p>
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.id} className="p-3 rounded-lg flex items-center justify-between bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                onClick={() => {
                  if (assignmentType === 'agent') {
                    handleAssignAgent(selectedContainerForAssignment, option);
                  } else {
                    handleAssignTransporter(selectedContainerForAssignment, option);
                  }
                }}>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {option.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {option.email}
                    </p>
                  </div>
                  <button
                    className="px-3 py-1 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Select
                  </button>
                </div>
              ))}
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
                    Size
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
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {doc.size}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                        style={{ color: colors.primary }}
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
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

  // Render expanded container details
  const renderExpandedContainer = (container) => {
    const isExpanded = expandedContainerId === container.id;
    if (!isExpanded) return null;

    const tabs = [
      { id: 'info', label: 'Container Info', icon: Info },
      { id: 'packing', label: 'Packing List', icon: Package },
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'tracking', label: 'Tracking', icon: Map },
      { id: 'assign', label: 'Assign', icon: UserPlus }
    ];

    const statusInfo = getContainerStatusInfo(container);

    return (
      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <td colSpan="8" className="p-0">
          <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
            {/* Status Banner */}
            <div className={`mb-4 p-3 rounded-lg flex items-center justify-between flex-wrap gap-2 ${
              container.delayed ? 'bg-red-100 dark:bg-red-900/30 border border-red-500' : ''
            }`} style={{
              backgroundColor: container.delayed ? undefined : `${statusInfo.color}20`,
              borderColor: container.delayed ? colors.danger : statusInfo.color
            }}>
              <div className="flex items-center gap-3">
                <span style={{ color: container.delayed ? colors.danger : statusInfo.color }}>
                  {statusInfo.icon}
                </span>
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {statusInfo.label}
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
                  backgroundColor: statusInfo.color + '20',
                  color: statusInfo.color
                }}>
                  {container.status}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Action: {statusInfo.action}
                </span>
              </div>
            </div>

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
                        {container.status === 'Delivered' && <CheckCircle className="w-3 h-3" />}
                        {container.status === 'At Sea' && <Ship className="w-3 h-3" />}
                        {container.status === 'At Port' && <Anchor className="w-3 h-3" />}
                        {container.status === 'In Transit' && <Navigation className="w-3 h-3" />}
                        {container.status}
                      </span>
                    </div>
                  </div>

                  {/* ETA/ETD Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expected Departure</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.expectedDeparture || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expected Arrival</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.expectedArrival || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Supplier Info */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Supplier</p>
                    <p className={`font-medium text-sm mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.supplier}
                    </p>
                  </div>

                  {/* Cargo Description */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                    <p className={`font-medium text-sm mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.cargoDescription}
                    </p>
                  </div>

                  {/* Consignee Contact Details */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-medium text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Consignee Contact Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <User className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {container.consignee.name}
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
                      <div className="flex items-center gap-3 text-sm">
                        <Building className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {container.consignee.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Agent & Transporter */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <User className="w-4 h-4" style={{ color: colors.primary }} />
                        Assigned Clearing Agent
                      </h4>
                      {container.assignedAgent ? (
                        <div className="space-y-2">
                          <div>
                            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {container.assignedAgent.name}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {container.assignedAgent.email}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {container.assignedAgent.contact}
                            </p>
                          </div>
                          {container.agentProgress !== null && (
                            <div>
                              <div className="flex justify-between items-center text-xs">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                  Progress: {container.agentProgress}%
                                </span>
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                  {container.agentStatus}
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div 
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ 
                                    width: `${container.agentProgress}%`,
                                    backgroundColor: getAgentProgressColor(container.agentProgress)
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          No agent assigned
                        </p>
                      )}
                      <button
                        onClick={() => handleQuickAssignAgent(container)}
                        className="mt-3 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: colors.primary }}
                      >
                        {container.assignedAgent ? 'Change Agent' : 'Assign Agent'}
                      </button>
                    </div>

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
                              <div className="flex items-center gap-2 mt-2">
                                <MapPin className="w-3 h-3" style={{ color: colors.primary }} />
                                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {container.transporterLocation || 'Location unknown'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          No transporter assigned
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-3">
                        <button
                          onClick={() => handleQuickAssignTransporter(container)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                          style={{ backgroundColor: colors.primary }}
                        >
                          {container.assignedTransporter ? 'Change Transporter' : 'Assign Transporter'}
                        </button>
                        {container.assignedTransporter && (
                          <button
                            onClick={() => handleTrackTransporter(container)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.info }}
                          >
                            <Map className="w-3 h-3 inline mr-1" />
                            Track
                          </button>
                        )}
                      </div>
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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPrintContainer(container);
                              setPrintOptions({
                                packingLists: true,
                                documents: false,
                                allPackingLists: false,
                                allDocuments: false,
                                selectedPackingList: packingList.id,
                                selectedDocument: null
                              });
                              setShowPrintModal(true);
                            }}
                            className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            title="Print this packing list"
                          >
                            <Printer className="w-3 h-3" style={{ color: colors.primary }} />
                          </button>
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedPackingListId === packingList.id ? 'rotate-180' : ''} ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                        </div>
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

                  {/* Map placeholder */}
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

                  {/* Milestones */}
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

                  {/* Tracking History */}
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

                  {/* Transporter Tracking Section */}
                  {container.assignedTransporter && (
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Truck className="w-4 h-4" style={{ color: colors.primary }} />
                        Transporter Status
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {container.assignedTransporter.name}
                          </span>
                          <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {container.transporterStatus || 'Awaiting'}
                          </span>
                        </div>
                        {container.transporterProgress !== null && (
                          <div>
                            <div className="flex justify-between items-center text-xs">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Progress
                              </span>
                              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                {container.transporterProgress}%
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
                        <button
                          onClick={() => handleTrackTransporter(container)}
                          className="w-full mt-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-1"
                          style={{ backgroundColor: colors.info }}
                        >
                          <Map className="w-3 h-3" />
                          Track Transporter Location
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {expandedContainerTab === 'assign' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Assign Agent */}
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <h4 className={`font-medium text-sm mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <User className="w-4 h-4" style={{ color: colors.primary }} />
                        Assign Clearing Agent
                      </h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {availableAgents.map((agent) => (
                          <div key={agent.id} className={`p-3 rounded-lg flex items-center justify-between ${
                            isDark ? 'bg-gray-800' : 'bg-gray-50'
                          }`}>
                            <div>
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {agent.name}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {agent.email}
                              </p>
                            </div>
                            <button
                              onClick={() => handleAssignAgent(container, agent)}
                              className="px-3 py-1 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                              style={{ backgroundColor: colors.primary }}
                            >
                              Assign
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3">
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                          Or assign by email:
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="email"
                            placeholder="agent@email.com"
                            className={`flex-1 px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                          <button
                            className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.primary }}
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Assign Transporter */}
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <h4 className={`font-medium text-sm mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Truck className="w-4 h-4" style={{ color: colors.primary }} />
                        Assign Inland Transporter
                      </h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {availableTransporters.map((transporter) => (
                          <div key={transporter.id} className={`p-3 rounded-lg flex items-center justify-between ${
                            isDark ? 'bg-gray-800' : 'bg-gray-50'
                          }`}>
                            <div>
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {transporter.name}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {transporter.email}
                              </p>
                            </div>
                            <button
                              onClick={() => handleAssignTransporter(container, transporter)}
                              className="px-3 py-1 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                              style={{ backgroundColor: colors.primary }}
                            >
                              Assign
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3">
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                          Or assign by email:
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="email"
                            placeholder="transporter@email.com"
                            className={`flex-1 px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                          <button
                            className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.primary }}
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
        {currentContainers.map((container) => {
          const statusInfo = getContainerStatusInfo(container);
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
                      backgroundColor: getStatusColor(container.status) + '20',
                      color: getStatusColor(container.status)
                    }}>
                    {container.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Seal:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{container.sealNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Voyage:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{container.voyage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Supplier:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{container.supplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Packages:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{container.packages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{container.eta}</span>
                  </div>
                  {/* Assignments in Grid View */}
                  <div className="border-t pt-1 mt-1" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Agent:</span>
                      <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.assignedAgent ? (
                          <>
                            {container.assignedAgent.name}
                            {container.agentProgress !== null && (
                              <span className="ml-1 text-[10px]" style={{ color: getAgentProgressColor(container.agentProgress) }}>
                                ({container.agentProgress}%)
                              </span>
                            )}
                          </>
                        ) : (
                          'Not Assigned'
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Transporter:</span>
                      <span className={`text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.assignedTransporter ? (
                          <>
                            {container.assignedTransporter.name}
                            {container.transporterProgress !== null && (
                              <span className="ml-1 text-[10px]" style={{ color: getAgentProgressColor(container.transporterProgress) }}>
                                ({container.transporterProgress}%)
                              </span>
                            )}
                          </>
                        ) : (
                          'Not Assigned'
                        )}
                      </span>
                    </div>
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
                  {/* Quick info in grid view */}
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Cargo:</span>
                      <span className={`text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.cargoDescription}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Agent:</span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {container.assignedAgent?.name || 'Not Assigned'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Transporter:</span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {container.assignedTransporter?.name || 'Not Assigned'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Action:</span>
                      <span className={`text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {statusInfo.action}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        onClick={() => handleQuickAssignAgent(container)}
                        className="flex-1 min-w-[80px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Assign Agent
                      </button>
                      <button
                        onClick={() => handleQuickAssignTransporter(container)}
                        className="flex-1 min-w-[80px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Assign Transporter
                      </button>
                      {container.assignedTransporter && (
                        <button
                          onClick={() => handleTrackTransporter(container)}
                          className="flex-1 min-w-[80px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                          style={{ backgroundColor: colors.info }}
                        >
                          Track
                        </button>
                      )}
                      <button
                        onClick={() => toggleContainerExpand(container.id)}
                        className="flex-1 min-w-[80px] px-2 py-1 rounded text-xs font-medium border transition-all duration-200 hover:opacity-90"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.primary
                        }}
                      >
                        Full Details
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
            Here's your shipment overview and container tracking status.
          </p>
        </div>

        {/* Stats Cards - Clickable */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'all' ? 'ring-1' : ''}`}
            style={{ ringColor: containerFilter === 'all' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('all')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Anchor className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +2
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.total}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Containers
            </p>
            {containerFilter === 'all' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'In Transit' || containerFilter === 'At Sea' ? 'ring-1' : ''}`}
            style={{ ringColor: (containerFilter === 'In Transit' || containerFilter === 'At Sea') ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('In Transit')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Ship className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs font-medium text-yellow-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                In Transit
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.atSea + containerStats.inTransit}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              In Transit
            </p>
            {(containerFilter === 'In Transit' || containerFilter === 'At Sea') && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'At Port' ? 'ring-1' : ''}`}
            style={{ ringColor: containerFilter === 'At Port' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('At Port')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <AlertCircle className="w-5 h-5" style={{ color: colors.warning }} />
              </div>
              <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {containerStats.atPort}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.atPort}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              At Port / Customs
            </p>
            {containerFilter === 'At Port' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'Delivered' ? 'ring-1' : ''}`}
            style={{ ringColor: containerFilter === 'Delivered' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('Delivered')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Delivered
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.delivered}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Delivered
            </p>
            {containerFilter === 'Delivered' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active Filter
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
                    <Anchor className="w-5 h-5" style={{ color: colors.primary }} />
                    <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      My Consignments
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
                    {containerFilter !== 'all' && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full cursor-pointer hover:opacity-80"
                        style={{ 
                          backgroundColor: colors.danger + '20',
                          color: colors.danger
                        }}
                        onClick={() => {
                          setContainerFilter('all');
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
                  <div className="relative flex-1 min-w-[100px] max-w-[180px]">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={containerSearch}
                      onChange={(e) => setContainerSearch(e.target.value)}
                      className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>

                  <select
                    value={containerFilter}
                    onChange={(e) => setContainerFilter(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="all">Status</option>
                    <option value="At Sea">At Sea</option>
                    <option value="At Port">At Port</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  <select
                    value={containerSupplierFilter}
                    onChange={(e) => setContainerSupplierFilter(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    {getUniqueSuppliers().slice(0, 4).map(supplier => (
                      <option key={supplier} value={supplier}>
                        {supplier === 'all' ? 'Supplier' : supplier.substring(0, 12) + (supplier.length > 12 ? '...' : '')}
                      </option>
                    ))}
                  </select>

                  <select
                    value={containerAgentFilter}
                    onChange={(e) => setContainerAgentFilter(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    {getUniqueAgents().map(agent => (
                      <option key={agent} value={agent}>
                        {agent === 'all' ? 'Agent' : agent}
                      </option>
                    ))}
                  </select>

                  <select
                    value={containerSortBy}
                    onChange={(e) => setContainerSortBy(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="date-desc">Latest</option>
                    <option value="date-asc">Oldest</option>
                    <option value="packages-desc">Most Pkg</option>
                    <option value="packages-asc">Least Pkg</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>

              {/* Container View */}
              {filteredContainers.length > 0 ? (
                containerViewMode === 'list' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[800px]">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Container
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Seal
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Voyage
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Status
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Supplier
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Pkg
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Assignments
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentContainers.map((container) => (
                          <React.Fragment key={container.id}>
                            <tr 
                              className={`border-b cursor-pointer transition-colors ${
                                isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                              } ${expandedContainerId === container.id ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                              onClick={() => toggleContainerExpand(container.id)}
                              data-container-id={container.id}
                            >
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
                                  {container.sealNo}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {container.voyage}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs px-1.5 py-0.5 rounded-full`}
                                  style={{
                                    backgroundColor: getStatusColor(container.status) + '20',
                                    color: getStatusColor(container.status)
                                  }}>
                                  {container.status}
                                  {container.delayed && <AlertIcon className="w-2.5 h-2.5 ml-0.5 inline" />}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {container.supplier.substring(0, 12)}{container.supplier.length > 12 ? '...' : ''}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`font-medium text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {container.packages}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <div className="space-y-1">
                                  {/* Agent Assignment */}
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" style={{ color: colors.primary }} />
                                    {container.assignedAgent ? (
                                      <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {container.assignedAgent.name}
                                        {container.agentProgress !== null && (
                                          <span className="ml-1 text-[10px]" style={{ color: getAgentProgressColor(container.agentProgress) }}>
                                            ({container.agentProgress}%)
                                          </span>
                                        )}
                                      </span>
                                    ) : (
                                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Not Assigned
                                      </span>
                                    )}
                                  </div>
                                  {/* Transporter Assignment */}
                                  <div className="flex items-center gap-1">
                                    <Truck className="w-3 h-3" style={{ color: colors.primary }} />
                                    {container.assignedTransporter ? (
                                      <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {container.assignedTransporter.name}
                                        {container.transporterProgress !== null && (
                                          <span className="ml-1 text-[10px]" style={{ color: getAgentProgressColor(container.transporterProgress) }}>
                                            ({container.transporterProgress}%)
                                          </span>
                                        )}
                                      </span>
                                    ) : (
                                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        Not Assigned
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-2 px-2">
                                <div className="flex items-center gap-0.5">
                                  <button
                                    className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                    style={{ color: colors.primary }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleContainerExpand(container.id);
                                    }}
                                    title="View"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                    style={{ color: colors.primary }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuickAssignAgent(container);
                                    }}
                                    title="Assign Agent"
                                  >
                                    <UserPlus className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                    style={{ color: colors.primary }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuickAssignTransporter(container);
                                    }}
                                    title="Assign Transporter"
                                  >
                                    <Truck className="w-3.5 h-3.5" />
                                  </button>
                                  {container.assignedTransporter && (
                                    <button
                                      className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                      style={{ color: colors.info }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleTrackTransporter(container);
                                      }}
                                      title="Track Transporter"
                                    >
                                      <Map className="w-3.5 h-3.5" />
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
                        ))}
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
                  <Anchor className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No containers found</p>
                  <p className="text-xs">Try adjusting your filters</p>
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
      {showAssignAgentModal && <AssignAgentModal />}
      {showPrintModal && <PrintModal />}
      {showTransporterTracking && <TransporterTrackingModal />}
    </div>
  );
};

export default ImporterDashboard;