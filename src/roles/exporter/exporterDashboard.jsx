// roles/exporter/ExporterDashboard.jsx
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
  Plane,
  Car,
  Train,
  Plus,
  Save,
  X as XIcon,
  ChevronUp,
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const ExporterDashboard = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [containerViewMode, setContainerViewMode] = useState('list');
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
  
  // Container view states
  const [containerFilter, setContainerFilter] = useState('all');
  const [containerSearch, setContainerSearch] = useState('');
  const [containerCustomerFilter, setContainerCustomerFilter] = useState('all');
  const [containerTransportFilter, setContainerTransportFilter] = useState('all');
  const [containerSortBy, setContainerSortBy] = useState('date-desc');
  const [expandedContainerTab, setExpandedContainerTab] = useState('info');
  const [documentFilter, setDocumentFilter] = useState('all');
  
  // Status update modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [customStatusInput, setCustomStatusInput] = useState('');
  const [showCustomStatusInput, setShowCustomStatusInput] = useState(false);
  
  // Predefined status options for exporter
  const [exporterStatusOptions, setExporterStatusOptions] = useState([
    'Order Confirmed',
    'Ready for Shipping',
    'Awaiting Confirmation',
    'Forwarded for Verification',
    'Shipped',
    'Delivered',
    'On Hold',
    'Cancelled'
  ]);

  // Alert filter states
  const [alertStatusFilter, setAlertStatusFilter] = useState('all');
  const [alertSeverityFilter, setAlertSeverityFilter] = useState('all');
  const [alertCategoryFilter, setAlertCategoryFilter] = useState('all');
  const [alertSearch, setAlertSearch] = useState('');

  // Print modal states
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printOrder, setPrintOrder] = useState(null);
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

  // Document data for orders
  const orderDocuments = {
    'EXP-001': [
      { id: 'DOC-001', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-07-20', size: '2.4 MB' },
      { id: 'DOC-002', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-07-18', size: '1.8 MB' },
      { id: 'DOC-003', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-07-25', size: '0.9 MB' },
      { id: 'DOC-004', name: 'Certificate of Origin', type: 'pdf', status: 'pending', date: '2026-07-22', size: '1.2 MB' },
    ],
    'EXP-002': [
      { id: 'DOC-005', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-08-05', size: '2.1 MB' },
      { id: 'DOC-006', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-03', size: '1.5 MB' },
      { id: 'DOC-007', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-08-06', size: '0.8 MB' },
      { id: 'DOC-008', name: 'Export License', type: 'pdf', status: 'uploaded', date: '2026-08-10', size: '3.2 MB' },
      { id: 'DOC-009', name: 'Insurance Certificate', type: 'pdf', status: 'pending', date: '2026-08-04', size: '1.1 MB' },
    ],
    'EXP-003': [
      { id: 'DOC-010', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-07-15', size: '2.6 MB' },
      { id: 'DOC-011', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-07-12', size: '2.0 MB' },
      { id: 'DOC-012', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-07-16', size: '1.0 MB' },
      { id: 'DOC-013', name: 'Delivery Note', type: 'pdf', status: 'uploaded', date: '2026-08-05', size: '0.7 MB' },
    ],
    'EXP-004': [
      { id: 'DOC-014', name: 'Bill of Lading', type: 'pdf', status: 'pending', date: '2026-09-01', size: '2.3 MB' },
      { id: 'DOC-015', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-30', size: '1.6 MB' },
      { id: 'DOC-016', name: 'Packing List', type: 'pdf', status: 'pending', date: '2026-09-02', size: '0.8 MB' },
    ],
    'EXP-005': [
      { id: 'DOC-017', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-08-22', size: '2.7 MB' },
      { id: 'DOC-018', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-20', size: '2.2 MB' },
      { id: 'DOC-019', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-08-23', size: '0.9 MB' },
      { id: 'DOC-020', name: 'Certificate of Origin', type: 'pdf', status: 'uploaded', date: '2026-08-25', size: '1.3 MB' },
      { id: 'DOC-021', name: 'Export Declaration', type: 'pdf', status: 'pending', date: '2026-08-28', size: '3.5 MB' },
    ],
    'LOC-001': [
      { id: 'DOC-022', name: 'Delivery Note', type: 'pdf', status: 'uploaded', date: '2026-09-08', size: '0.5 MB' },
      { id: 'DOC-023', name: 'Invoice', type: 'pdf', status: 'uploaded', date: '2026-09-07', size: '0.8 MB' },
    ]
  };

  // Alerts Data
  const alertsData = [
    { 
      id: 'ALT-001', 
      orderId: 'EXP-001', 
      severity: 'high', 
      message: 'Export documentation incomplete - Certificate of Origin pending',
      date: '2026-08-10 14:30',
      status: 'active',
      category: 'Documentation'
    },
    { 
      id: 'ALT-002', 
      orderId: 'EXP-002', 
      severity: 'critical', 
      message: 'Export license expired - Renewal required immediately',
      date: '2026-08-11 09:15',
      status: 'active',
      category: 'Compliance'
    },
    { 
      id: 'ALT-003', 
      orderId: 'EXP-005', 
      severity: 'medium', 
      message: 'Port congestion - Expected delay of 2-3 days',
      date: '2026-08-09 16:45',
      status: 'active',
      category: 'Logistics'
    },
    { 
      id: 'ALT-004', 
      orderId: 'EXP-004', 
      severity: 'low', 
      message: 'Invoice discrepancy - Minor correction required',
      date: '2026-08-08 11:20',
      status: 'resolved',
      category: 'Documentation'
    },
    { 
      id: 'ALT-005', 
      orderId: 'EXP-003', 
      severity: 'info', 
      message: 'Order shipped successfully - Update tracking',
      date: '2026-08-05 17:00',
      status: 'resolved',
      category: 'Shipping'
    },
    { 
      id: 'ALT-006', 
      orderId: 'EXP-002', 
      severity: 'high', 
      message: 'Customs hold - Additional documentation requested',
      date: '2026-08-12 08:30',
      status: 'active',
      category: 'Customs'
    },
  ];

  // Order Data for Exporter (International + Local)
  const ordersData = [
    {
      id: 'EXP-001',
      orderNo: 'ORD-2026-001',
      customer: 'TechImport USA Inc',
      customerContact: {
        name: 'TechImport USA Inc',
        contact: '+1 555 123 4567',
        email: 'imports@techimport.com',
        address: '123 Tech Park, Silicon Valley, CA 94043'
      },
      voyage: 'MV Star Express',
      status: 'Ready for Shipping',
      statusHistory: [
        { status: 'Order Confirmed', date: '2026-07-15', by: 'System' },
        { status: 'Ready for Shipping', date: '2026-07-25', by: 'Exporter' },
      ],
      transportMode: 'Vessel',
      transportDetails: {
        vessel: 'MV Star Express',
        shippingLine: 'Maersk',
        containerNo: 'MSKU-458921',
        sealNo: 'SEAL-78923',
        departurePort: 'Mombasa Port',
        arrivalPort: 'Los Angeles Port',
        departureDate: '2026-08-15',
        estimatedArrival: '2026-09-10',
      },
      exportType: 'International',
      orderAmount: 245000000, // UGX
      orderAmountUSD: 65000,
      paymentStatus: 'Partial',
      paymentPercentage: 60,
      packages: 24,
      grossWeight: '28,500 kg',
      volume: '67.5 m³',
      cargoDescription: 'Premium Electronics and Circuit Components',
      location: 'Mombasa Port - Export Terminal',
      freightForwarderStatus: 'Documentation in Progress',
      exporterStatus: 'Ready for Shipping',
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
        { stage: 'Order confirmed', date: '15 Jul 2026', completed: true },
        { stage: 'Goods ready for export', date: '25 Jul 2026', completed: true },
        { stage: 'Documentation submitted', date: '10 Aug 2026', completed: true },
        { stage: 'Customs inspection', date: '12 Aug 2026', completed: false },
        { stage: 'Vessel departure', date: '15 Aug 2026', completed: false },
        { stage: 'Arrival at destination', date: '10 Sep 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-07-25 14:30', location: 'Warehouse - Kampala', status: 'Ready for Export' },
        { date: '2026-07-28 08:15', location: 'In Transit to Port', status: 'Transit' },
        { date: '2026-08-02 22:45', location: 'Mombasa Port - Export Terminal', status: 'Arrived' },
        { date: '2026-08-08 06:30', location: 'Mombasa Port - Customs Clearance', status: 'In Progress' }
      ],
      expectedDeparture: '2026-08-15',
      expectedArrival: '2026-09-10',
      delayed: false,
      delayReason: null,
      actionRequired: 'Submit Customs Declaration'
    },
    {
      id: 'EXP-002',
      orderNo: 'ORD-2026-002',
      customer: 'Global Textiles India Pvt Ltd',
      customerContact: {
        name: 'Global Textiles India Pvt Ltd',
        contact: '+91 22 1234 5678',
        email: 'purchasing@globaltextiles.in',
        address: '456 Fabric Lane, Mumbai, India'
      },
      voyage: 'MV Indian Trader',
      status: 'Forwarded for Verification',
      statusHistory: [
        { status: 'Order Confirmed', date: '2026-08-01', by: 'System' },
        { status: 'Awaiting Confirmation', date: '2026-08-05', by: 'Exporter' },
        { status: 'Forwarded for Verification', date: '2026-08-10', by: 'Exporter' },
      ],
      transportMode: 'Vessel',
      transportDetails: {
        vessel: 'MV Indian Trader',
        shippingLine: 'MSC',
        containerNo: 'IN-782341',
        sealNo: 'SEAL-45612',
        departurePort: 'Mombasa Port',
        arrivalPort: 'Mumbai Port',
        departureDate: '2026-08-18',
        estimatedArrival: '2026-08-28',
      },
      exportType: 'International',
      orderAmount: 89500000, // UGX
      orderAmountUSD: 23800,
      paymentStatus: 'Full',
      paymentPercentage: 100,
      packages: 15,
      grossWeight: '18,200 kg',
      volume: '33.2 m³',
      cargoDescription: 'Textile Fabrics and Dyeing Agents',
      location: 'Mombasa Port - Export Terminal',
      freightForwarderStatus: 'Document Submission in Progress',
      exporterStatus: 'Forwarded for Verification',
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
        { stage: 'Order confirmed', date: '01 Aug 2026', completed: true },
        { stage: 'Goods ready for export', date: '08 Aug 2026', completed: true },
        { stage: 'Documentation submitted', date: '12 Aug 2026', completed: true },
        { stage: 'Customs inspection', date: '14 Aug 2026', completed: false },
        { stage: 'Vessel departure', date: '18 Aug 2026', completed: false },
        { stage: 'Arrival at destination', date: '28 Aug 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-08-08 10:20', location: 'Warehouse - Kampala', status: 'Ready for Export' },
        { date: '2026-08-11 16:45', location: 'In Transit to Port', status: 'Transit' },
        { date: '2026-08-12 08:00', location: 'Mombasa Port - Export Terminal', status: 'Arrived' }
      ],
      expectedDeparture: '2026-08-18',
      expectedArrival: '2026-08-28',
      delayed: false,
      delayReason: null,
      actionRequired: 'Submit UNBS CoC certificate'
    },
    {
      id: 'EXP-003',
      orderNo: 'ORD-2026-003',
      customer: 'African Machinery Solutions',
      customerContact: {
        name: 'African Machinery Solutions',
        contact: '+27 11 234 5678',
        email: 'procurement@africanmachinery.co.za',
        address: '789 Industrial Park, Johannesburg, South Africa'
      },
      voyage: 'MV African Trader',
      status: 'Shipped',
      statusHistory: [
        { status: 'Order Confirmed', date: '2026-07-10', by: 'System' },
        { status: 'Ready for Shipping', date: '2026-07-20', by: 'Exporter' },
        { status: 'Awaiting Confirmation', date: '2026-07-25', by: 'Exporter' },
        { status: 'Forwarded for Verification', date: '2026-07-28', by: 'Exporter' },
        { status: 'Shipped', date: '2026-08-05', by: 'System' },
      ],
      transportMode: 'Vessel',
      transportDetails: {
        vessel: 'MV African Trader',
        shippingLine: 'CMA CGM',
        containerNo: 'SA-456732',
        sealNo: 'SEAL-89234',
        departurePort: 'Mombasa Port',
        arrivalPort: 'Durban Port',
        departureDate: '2026-08-05',
        estimatedArrival: '2026-08-20',
      },
      exportType: 'International',
      orderAmount: 187200000, // UGX
      orderAmountUSD: 49800,
      paymentStatus: 'Partial',
      paymentPercentage: 75,
      packages: 18,
      grossWeight: '32,400 kg',
      volume: '71.8 m³',
      cargoDescription: 'Industrial Machinery and Spare Parts',
      location: 'At Sea - Indian Ocean',
      freightForwarderStatus: 'Completed',
      exporterStatus: 'Shipped',
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
        { stage: 'Order confirmed', date: '10 Jul 2026', completed: true },
        { stage: 'Goods ready for export', date: '20 Jul 2026', completed: true },
        { stage: 'Documentation submitted', date: '25 Jul 2026', completed: true },
        { stage: 'Customs inspection', date: '28 Jul 2026', completed: true },
        { stage: 'Vessel departure', date: '05 Aug 2026', completed: true },
        { stage: 'Arrival at destination', date: '20 Aug 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-07-20 08:30', location: 'Warehouse - Kampala', status: 'Ready for Export' },
        { date: '2026-07-25 14:15', location: 'Mombasa Port - Export Terminal', status: 'Arrived' },
        { date: '2026-07-28 09:45', location: 'Mombasa Customs', status: 'Cleared' },
        { date: '2026-08-05 16:20', location: 'At Sea - Indian Ocean', status: 'Shipped' }
      ],
      expectedDeparture: '2026-08-05',
      expectedArrival: '2026-08-20',
      delayed: false,
      delayReason: null,
      actionRequired: 'Monitor shipping progress'
    },
    {
      id: 'EXP-004',
      orderNo: 'ORD-2026-004',
      customer: 'Pacific Packaging Co.',
      customerContact: {
        name: 'Pacific Packaging Co.',
        contact: '+61 2 1234 5678',
        email: 'purchasing@pacificpackaging.com.au',
        address: '101 Packaging Way, Sydney, Australia'
      },
      voyage: 'MV Pacific Express',
      status: 'Awaiting Confirmation',
      statusHistory: [
        { status: 'Order Confirmed', date: '2026-09-01', by: 'System' },
        { status: 'Awaiting Confirmation', date: '2026-09-05', by: 'Exporter' },
      ],
      transportMode: 'Vessel',
      transportDetails: {
        vessel: 'MV Pacific Express',
        shippingLine: 'Hapag-Lloyd',
        containerNo: 'PK-893421',
        sealNo: 'SEAL-56789',
        departurePort: 'Mombasa Port',
        arrivalPort: 'Sydney Port',
        departureDate: '2026-09-25',
        estimatedArrival: '2026-10-15',
      },
      exportType: 'International',
      orderAmount: 52300000, // UGX
      orderAmountUSD: 13900,
      paymentStatus: 'Deposit',
      paymentPercentage: 30,
      packages: 20,
      grossWeight: '15,800 kg',
      volume: '33.2 m³',
      cargoDescription: 'Packaging Materials and Consumables',
      location: 'Warehouse - Kampala',
      freightForwarderStatus: 'Awaiting Documentation',
      exporterStatus: 'Awaiting Confirmation',
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
        { stage: 'Order confirmed', date: '01 Sep 2026', completed: true },
        { stage: 'Goods ready for export', date: '10 Sep 2026', completed: false },
        { stage: 'Documentation submitted', date: '15 Sep 2026', completed: false },
        { stage: 'Customs inspection', date: '20 Sep 2026', completed: false },
        { stage: 'Vessel departure', date: '25 Sep 2026', completed: false },
        { stage: 'Arrival at destination', date: '15 Oct 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-09-05 06:00', location: 'Warehouse - Kampala', status: 'Ready for Export' }
      ],
      expectedDeparture: '2026-09-25',
      expectedArrival: '2026-10-15',
      delayed: false,
      delayReason: null,
      actionRequired: 'Prepare customs documentation'
    },
    {
      id: 'EXP-005',
      orderNo: 'ORD-2026-005',
      customer: 'AutoParts Europe GmbH',
      customerContact: {
        name: 'AutoParts Europe GmbH',
        contact: '+49 30 1234 5678',
        email: 'purchasing@autoparts.de',
        address: '789 Auto Strasse, Berlin, Germany'
      },
      voyage: 'MV Europe Trader',
      status: 'Ready for Shipping',
      statusHistory: [
        { status: 'Order Confirmed', date: '2026-08-20', by: 'System' },
        { status: 'Ready for Shipping', date: '2026-08-25', by: 'Exporter' },
      ],
      transportMode: 'Vessel',
      transportDetails: {
        vessel: 'MV Europe Trader',
        shippingLine: 'Maersk',
        containerNo: 'DE-782341',
        sealNo: 'SEAL-34126',
        departurePort: 'Mombasa Port',
        arrivalPort: 'Hamburg Port',
        departureDate: '2026-09-15',
        estimatedArrival: '2026-10-05',
      },
      exportType: 'International',
      orderAmount: 156800000, // UGX
      orderAmountUSD: 41700,
      paymentStatus: 'Partial',
      paymentPercentage: 50,
      packages: 22,
      grossWeight: '26,700 kg',
      volume: '67.5 m³',
      cargoDescription: 'Automotive Components and Accessories',
      location: 'Mombasa Port - Export Terminal',
      freightForwarderStatus: 'Document Review',
      exporterStatus: 'Ready for Shipping',
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
        { stage: 'Order confirmed', date: '20 Aug 2026', completed: true },
        { stage: 'Goods ready for export', date: '25 Aug 2026', completed: true },
        { stage: 'Documentation submitted', date: '10 Sep 2026', completed: true },
        { stage: 'Customs inspection', date: '12 Sep 2026', completed: false },
        { stage: 'Vessel departure', date: '15 Sep 2026', completed: false },
        { stage: 'Arrival at destination', date: '05 Oct 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-08-25 14:00', location: 'Warehouse - Kampala', status: 'Ready for Export' },
        { date: '2026-08-28 20:30', location: 'In Transit to Port', status: 'Transit' },
        { date: '2026-09-03 07:15', location: 'Mombasa Port - Export Terminal', status: 'Arrived' },
        { date: '2026-09-10 09:45', location: 'Mombasa Port - Customs Clearance', status: 'In Progress' }
      ],
      expectedDeparture: '2026-09-15',
      expectedArrival: '2026-10-05',
      delayed: true,
      delayReason: 'Port congestion - 3 day delay',
      actionRequired: 'Contact shipping line for updated ETA'
    },
    // Local Order
    {
      id: 'LOC-001',
      orderNo: 'ORD-2026-006',
      customer: 'Kampala Distributors Ltd',
      customerContact: {
        name: 'Kampala Distributors Ltd',
        contact: '+256 701 234567',
        email: 'info@kampaladistributors.ug',
        address: 'Plot 10, Nakasero Road, Kampala'
      },
      voyage: 'Truck Transport',
      status: 'Shipped',
      statusHistory: [
        { status: 'Order Confirmed', date: '2026-09-01', by: 'System' },
        { status: 'Ready for Shipping', date: '2026-09-05', by: 'Exporter' },
        { status: 'Shipped', date: '2026-09-08', by: 'Exporter' },
      ],
      transportMode: 'Truck',
      transportDetails: {
        truckNo: 'UBK 1234',
        driverName: 'John Mukasa',
        driverContact: '+256 712 345678',
        departureLocation: 'Warehouse - Kampala',
        deliveryLocation: 'Kampala City Center',
        departureDate: '2026-09-08',
        estimatedArrival: '2026-09-08',
      },
      exportType: 'Local',
      orderAmount: 12500000, // UGX
      orderAmountUSD: 0,
      paymentStatus: 'Full',
      paymentPercentage: 100,
      packages: 10,
      grossWeight: '2,500 kg',
      volume: '15.0 m³',
      cargoDescription: 'Assorted Consumer Goods',
      location: 'In Transit - Kampala',
      freightForwarderStatus: 'N/A',
      exporterStatus: 'Shipped',
      packingLists: [
        {
          id: 'PL-010',
          name: 'Packing List - Consumer Goods',
          packages: [
            {
              id: 'PKG-015',
              name: 'Electronics Package',
              quantity: 5,
              items: [
                { name: 'TV Sets', quantity: 10, unit: 'pieces' },
                { name: 'Sound Systems', quantity: 8, unit: 'pieces' }
              ]
            },
            {
              id: 'PKG-016',
              name: 'Household Items Package',
              quantity: 5,
              items: [
                { name: 'Kitchen Appliances', quantity: 15, unit: 'pieces' },
                { name: 'Cleaning Supplies', quantity: 20, unit: 'pieces' }
              ]
            }
          ]
        }
      ],
      milestones: [
        { stage: 'Order confirmed', date: '01 Sep 2026', completed: true },
        { stage: 'Goods ready for delivery', date: '05 Sep 2026', completed: true },
        { stage: 'In Transit', date: '08 Sep 2026', completed: true },
        { stage: 'Delivered', date: '08 Sep 2026', completed: false },
      ],
      trackingHistory: [
        { date: '2026-09-05 14:00', location: 'Warehouse - Kampala', status: 'Ready for Delivery' },
        { date: '2026-09-08 09:00', location: 'In Transit - Kampala', status: 'Transit' }
      ],
      expectedDeparture: '2026-09-08',
      expectedArrival: '2026-09-08',
      delayed: false,
      delayReason: null,
      actionRequired: 'Confirm delivery'
    }
  ];

  // Get unique customers for filter
  const getUniqueCustomers = () => {
    const customers = ordersData.map(c => c.customer);
    return ['all', ...new Set(customers)];
  };

  // Get unique transport modes for filter
  const getUniqueTransportModes = () => {
    const modes = ordersData.map(c => c.transportMode);
    return ['all', ...new Set(modes)];
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
      case 'Shipped': return colors.success;
      case 'Ready for Shipping': return colors.info;
      case 'Awaiting Confirmation': return colors.warning;
      case 'Forwarded for Verification': return colors.primary;
      case 'Delivered': return colors.success;
      case 'On Hold': return colors.danger;
      case 'Cancelled': return colors.danger;
      case 'Order Confirmed': return colors.info;
      default: return colors.info;
    }
  };

  // Get transport mode icon
  const getTransportModeIcon = (mode) => {
    switch(mode) {
      case 'Vessel': return <Ship className="w-4 h-4" />;
      case 'Plane': return <Plane className="w-4 h-4" />;
      case 'Truck': return <Truck className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      case 'Train': return <Train className="w-4 h-4" />;
      default: return <Ship className="w-4 h-4" />;
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

  // Get payment status color
  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'Full': return colors.success;
      case 'Partial': return colors.warning;
      case 'Deposit': return colors.info;
      case 'Pending': return colors.danger;
      default: return colors.info;
    }
  };

  // Format currency in UGX
  const formatUGX = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get status badge for order timeline
  const getOrderStatusInfo = (order) => {
    const info = {
      label: '',
      color: '',
      icon: null,
      action: ''
    };

    switch(order.status) {
      case 'Ready for Shipping':
        info.label = `Ready for Shipping - Awaiting Documents`;
        info.color = colors.info;
        info.icon = <Package className="w-4 h-4" />;
        info.action = order.actionRequired || 'Prepare shipping documents';
        break;
      case 'Awaiting Confirmation':
        info.label = `Awaiting Confirmation from ${order.customer}`;
        info.color = colors.warning;
        info.icon = <Clock className="w-4 h-4" />;
        info.action = order.actionRequired || 'Follow up with customer';
        break;
      case 'Forwarded for Verification':
        info.label = `Forwarded for Verification - ${order.location}`;
        info.color = colors.primary;
        info.icon = <FileCheck className="w-4 h-4" />;
        info.action = order.actionRequired || 'Submit customs documentation';
        break;
      case 'Shipped':
        info.label = `Shipped - Expected Arrival: ${order.expectedArrival}`;
        info.color = colors.success;
        info.icon = <Ship className="w-4 h-4" />;
        info.action = order.actionRequired || 'Monitor shipping progress';
        break;
      case 'Delivered':
        info.label = `Delivered to: ${order.customer}`;
        info.color = colors.success;
        info.icon = <CheckCircle className="w-4 h-4" />;
        info.action = order.actionRequired || 'Release final documents';
        break;
      case 'Order Confirmed':
        info.label = `Order Confirmed - Processing`;
        info.color = colors.info;
        info.icon = <CheckSquare className="w-4 h-4" />;
        info.action = order.actionRequired || 'Prepare for shipping';
        break;
      case 'On Hold':
        info.label = `On Hold - Pending Action`;
        info.color = colors.danger;
        info.icon = <AlertCircle className="w-4 h-4" />;
        info.action = order.actionRequired || 'Review hold reason';
        break;
      case 'Cancelled':
        info.label = `Cancelled`;
        info.color = colors.danger;
        info.icon = <XCircle className="w-4 h-4" />;
        info.action = 'No action required';
        break;
      default:
        info.label = 'Status Unknown';
        info.color = colors.info;
        info.icon = <Info className="w-4 h-4" />;
        info.action = 'Check status';
    }

    if (order.delayed) {
      info.label = `⚠️ DELAYED: ${order.delayReason}`;
      info.color = colors.danger;
    }

    return info;
  };

  // Filtered orders with multiple filters
  const getFilteredOrders = () => {
    let filtered = [...ordersData];
    
    // Status filter
    if (containerFilter !== 'all') {
      filtered = filtered.filter(c => c.status === containerFilter);
    }
    
    // Customer filter
    if (containerCustomerFilter !== 'all') {
      filtered = filtered.filter(c => c.customer === containerCustomerFilter);
    }
    
    // Transport mode filter
    if (containerTransportFilter !== 'all') {
      filtered = filtered.filter(c => c.transportMode === containerTransportFilter);
    }
    
    // Search filter
    if (containerSearch) {
      const search = containerSearch.toLowerCase();
      filtered = filtered.filter(c => 
        c.id.toLowerCase().includes(search) ||
        c.orderNo.toLowerCase().includes(search) ||
        c.voyage.toLowerCase().includes(search) ||
        c.cargoDescription.toLowerCase().includes(search) ||
        c.customer.toLowerCase().includes(search)
      );
    }
    
    // Sort
    switch(containerSortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.expectedDeparture) - new Date(a.expectedDeparture));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.expectedDeparture) - new Date(b.expectedDeparture));
        break;
      case 'amount-desc':
        filtered.sort((a, b) => b.orderAmount - a.orderAmount);
        break;
      case 'amount-asc':
        filtered.sort((a, b) => a.orderAmount - b.orderAmount);
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
    ready: ordersData.filter(c => c.status === 'Ready for Shipping').length,
    awaiting: ordersData.filter(c => c.status === 'Awaiting Confirmation').length,
    forwarded: ordersData.filter(c => c.status === 'Forwarded for Verification').length,
    shipped: ordersData.filter(c => c.status === 'Shipped').length,
    delivered: ordersData.filter(c => c.status === 'Delivered').length,
    onHold: ordersData.filter(c => c.status === 'On Hold').length,
    totalValue: ordersData.reduce((sum, c) => sum + c.orderAmount, 0)
  };

  // Handle order toggle expand
  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    setExpandedContainerTab('info');
  };

  // Handle status update
  const handleStatusUpdate = (orderId, newStatus, note) => {
    const order = ordersData.find(c => c.id === orderId);
    if (order) {
      order.status = newStatus;
      order.exporterStatus = newStatus;
      order.statusHistory.push({
        status: newStatus,
        date: new Date().toISOString().split('T')[0],
        by: 'Exporter',
        note: note || ''
      });
      
      // Update the local state
      const updatedOrders = ordersData.map(c => {
        if (c.id === orderId) {
          return { ...order };
        }
        return c;
      });
      // Since we're using a const array, we need to update it
      // In a real app, this would be an API call
      Object.assign(ordersData, updatedOrders);
    }
    setShowStatusModal(false);
    setSelectedOrderForStatus(null);
    setNewStatus('');
    setStatusNote('');
  };

  // Handle adding custom status
  const handleAddCustomStatus = () => {
    if (customStatusInput.trim() && !exporterStatusOptions.includes(customStatusInput.trim())) {
      setExporterStatusOptions([...exporterStatusOptions, customStatusInput.trim()]);
      setNewStatus(customStatusInput.trim());
      setCustomStatusInput('');
      setShowCustomStatusInput(false);
    }
  };

  // Open status modal
  const openStatusModal = (order) => {
    setSelectedOrderForStatus(order);
    setNewStatus(order.status);
    setStatusNote('');
    setShowCustomStatusInput(false);
    setCustomStatusInput('');
    setShowStatusModal(true);
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
    setContainerFilter('all');
    setContainerCustomerFilter('all');
    setContainerTransportFilter('all');
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

  // Handle card click to filter by status
  const handleCardClick = (status) => {
    setCurrentPage(1);
    if (containerFilter === status) {
      setContainerFilter('all');
    } else {
      setContainerFilter(status);
    }
  };

  // Render Print Modal
  const PrintModal = () => {
    if (!showPrintModal || !printOrder) return null;

    const docs = orderDocuments[printOrder.id] || [];

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
                Print Options - {printOrder.orderNo}
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
                  {printOrder.packingLists.map((pl) => (
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

  // Render Status Update Modal
  const StatusUpdateModal = () => {
    if (!showStatusModal || !selectedOrderForStatus) return null;

    const availableStatuses = [...exporterStatusOptions];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
           onClick={() => setShowStatusModal(false)}>
        <div 
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Edit className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className="font-bold text-gray-900 dark:text-white">
                Update Status - {selectedOrderForStatus.orderNo}
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Current Status: <span className="font-medium" style={{ color: getStatusColor(selectedOrderForStatus.status) }}>
                {selectedOrderForStatus.status}
              </span>
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select New Status
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setNewStatus(status)}
                    className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all duration-200 ${
                      newStatus === status
                        ? 'ring-2 bg-opacity-20'
                        : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: newStatus === status ? getStatusColor(status) + '20' : 'transparent',
                      ringColor: getStatusColor(status),
                      color: isDark ? '#fff' : '#111827'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(status) }} />
                      <span>{status}</span>
                      {newStatus === status && <CheckCircle className="w-4 h-4 ml-auto" style={{ color: getStatusColor(status) }} />}
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Note (Optional)
              </label>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Add a note about this status update..."
                className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 resize-none ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedOrderForStatus.id, newStatus, statusNote)}
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

  // Render documents tab content
  const renderDocumentsTab = (order) => {
    const docs = orderDocuments[order.id] || [];
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

  // Handle view document
  const handleViewDocument = (doc) => {
    window.open(`/documents/${doc.id}`, '_blank');
  };

  // Render expanded order details
  const renderExpandedOrder = (order) => {
    const isExpanded = expandedOrderId === order.id;
    if (!isExpanded) return null;

    const tabs = [
      { id: 'info', label: 'Order Info', icon: Info },
      { id: 'packing', label: 'Packing List', icon: Package },
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'tracking', label: 'Tracking', icon: Map },
      { id: 'transport', label: 'Transport', icon: Truck }
    ];

    const statusInfo = getOrderStatusInfo(order);
    const TransportIcon = getTransportModeIcon(order.transportMode);

    return (
      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <td colSpan="8" className="p-0">
          <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
            {/* Status Banner */}
            <div className={`mb-4 p-3 rounded-lg flex items-center justify-between flex-wrap gap-2 ${
              order.delayed ? 'bg-red-100 dark:bg-red-900/30 border border-red-500' : ''
            }`} style={{
              backgroundColor: order.delayed ? undefined : `${statusInfo.color}20`,
              borderColor: order.delayed ? colors.danger : statusInfo.color
            }}>
              <div className="flex items-center gap-3">
                <span style={{ color: order.delayed ? colors.danger : statusInfo.color }}>
                  {statusInfo.icon}
                </span>
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {statusInfo.label}
                  </p>
                  {order.delayed && (
                    <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                      Delay Reason: {order.delayReason}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1`} style={{
                  backgroundColor: statusInfo.color + '20',
                  color: statusInfo.color
                }}>
                  {TransportIcon}
                  {order.status}
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
                  {/* Order Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order No.</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.orderNo}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Customer</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.customer}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Export Type</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                        style={{
                          backgroundColor: order.exportType === 'International' ? colors.primary + '20' : colors.success + '20',
                          color: order.exportType === 'International' ? colors.primary : colors.success
                        }}>
                        {order.exportType === 'International' ? <Globe className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {order.exportType}
                      </span>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.voyage}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Transport Mode</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                        style={{
                          backgroundColor: colors.primary + '20',
                          color: colors.primary
                        }}>
                        {TransportIcon}
                        {order.transportMode}
                      </span>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Packages</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.packages}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Gross Weight</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.grossWeight}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Volume</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.volume}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{order.location}</p>
                    </div>
                  </div>

                  {/* Order Amount & Payment Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order Amount</p>
                      <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {formatUGX(order.orderAmount)}
                        {order.orderAmountUSD > 0 && (
                          <span className="text-xs font-normal ml-2 text-gray-500">
                            (~${order.orderAmountUSD.toLocaleString()})
                          </span>
                        )}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Payment Status</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                        style={{
                          backgroundColor: getPaymentStatusColor(order.paymentStatus) + '20',
                          color: getPaymentStatusColor(order.paymentStatus)
                        }}>
                        {order.paymentStatus}
                        {order.paymentPercentage > 0 && ` (${order.paymentPercentage}%)`}
                      </span>
                    </div>
                  </div>

                  {/* Customer Contact Details */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-medium text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Customer Contact Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <User className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {order.customerContact.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {order.customerContact.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {order.customerContact.contact}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Building className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {order.customerContact.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Description */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cargo Description</p>
                    <p className={`font-medium text-sm mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.cargoDescription}
                    </p>
                  </div>

                  {/* Status History */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-medium text-sm mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Status History
                    </h4>
                    <div className="space-y-2">
                      {order.statusHistory.map((history, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(history.status) }} />
                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                              {history.status}
                            </span>
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              by {history.by}
                            </span>
                          </div>
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {history.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {expandedContainerTab === 'packing' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Packing Lists ({order.packingLists.length})
                    </h3>
                    <button
                      onClick={() => handlePrint(order)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Printer className="w-3 h-3" />
                      Print
                    </button>
                  </div>

                  {order.packingLists.map((packingList) => (
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
                              setPrintOrder(order);
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

              {expandedContainerTab === 'documents' && renderDocumentsTab(order)}

              {expandedContainerTab === 'tracking' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Map className="w-5 h-5" style={{ color: colors.primary }} />
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Order Tracking
                      </h3>
                    </div>
                    <button
                      onClick={() => handlePrint(order)}
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
                      Map View - Order {order.orderNo}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Current Location: {order.location}
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
                      {order.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="relative flex items-center justify-center w-6">
                            {milestone.completed ? (
                              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                            ) : (
                              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                            )}
                            {idx < order.milestones.length - 1 && (
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
                      {order.trackingHistory.map((track, idx) => (
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

              {expandedContainerTab === 'transport' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {getTransportModeIcon(order.transportMode)}
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Transport Details - {order.transportMode}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {order.transportMode === 'Vessel' && (
                      <>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.vessel}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipping Line</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.shippingLine}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Container No.</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.containerNo}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Seal No.</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.sealNo}
                          </p>
                        </div>
                      </>
                    )}
                    {order.transportMode === 'Truck' && (
                      <>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Truck No.</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.truckNo}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.driverName}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver Contact</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.driverContact}
                          </p>
                        </div>
                      </>
                    )}
                    {order.transportMode === 'Plane' && (
                      <>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Flight No.</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.flightNo || 'N/A'}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Airline</p>
                          <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {order.transportDetails.airline || 'N/A'}
                          </p>
                        </div>
                      </>
                    )}
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Departure Location</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {order.transportDetails.departurePort || order.transportDetails.departureLocation || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Arrival Location</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {order.transportDetails.arrivalPort || order.transportDetails.deliveryLocation || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Departure Date</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {order.transportDetails.departureDate || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Estimated Arrival</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {order.transportDetails.estimatedArrival || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Collapse Arrow at Bottom */}
            <div className="mt-4 pt-3 border-t flex justify-center" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <button
                onClick={() => toggleOrderExpand(order.id)}
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

  // Render Grid View
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentOrders.map((order) => {
          const statusInfo = getOrderStatusInfo(order);
          const TransportIcon = getTransportModeIcon(order.transportMode);
          return (
            <div key={order.id} className={`rounded-lg transition-all duration-300 ${
              isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white shadow-md'
            }`}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {order.orderNo}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                    style={{
                      backgroundColor: getStatusColor(order.status) + '20',
                      color: getStatusColor(order.status)
                    }}>
                    {TransportIcon}
                    {order.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Customer:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{order.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Voyage:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{order.voyage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Amount:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{formatUGX(order.orderAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Payment:</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full`}
                      style={{
                        backgroundColor: getPaymentStatusColor(order.paymentStatus) + '20',
                        color: getPaymentStatusColor(order.paymentStatus)
                      }}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Type:</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                      order.exportType === 'International' ? 'bg-purple-500/20 text-purple-500' : 'bg-green-500/20 text-green-500'
                    }`}>
                      {order.exportType}
                    </span>
                  </div>
                  {order.delayed && (
                    <div className="flex justify-between text-red-500">
                      <span className="text-xs">⚠️ Delayed</span>
                      <span className="text-xs">{order.delayReason}</span>
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
                  <button
                    onClick={() => openStatusModal(order)}
                    className="px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: colors.warning }}
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
              </div>
              {expandedOrderId === order.id && (
                <div className={`p-4 border-t ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Cargo:</span>
                      <span className={`text-right ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {order.cargoDescription}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Transport:</span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {order.transportMode}
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
                        onClick={() => toggleOrderExpand(order.id)}
                        className="flex-1 min-w-[80px] px-2 py-1 rounded text-xs font-medium border transition-all duration-200 hover:opacity-90"
                        style={{ 
                          borderColor: colors.primary,
                          color: colors.primary
                        }}
                      >
                        Full Details
                      </button>
                      <button
                        onClick={() => openStatusModal(order)}
                        className="flex-1 min-w-[80px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: colors.warning }}
                      >
                        <Edit className="w-3 h-3 inline mr-1" />
                        Update Status
                      </button>
                    </div>
                    {/* Collapse Arrow in Grid View */}
                    <div className="flex justify-center mt-3 pt-2 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      <button
                        onClick={() => toggleOrderExpand(order.id)}
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
            Here's your export order overview and shipment tracking status.
          </p>
        </div>

        {/* Stats Cards - Clickable */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'all' ? 'ring-1' : ''}`}
            style={{ ringColor: containerFilter === 'all' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('all')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Package className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +2
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.total}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Orders
            </p>
            {containerFilter === 'all' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'Ready for Shipping' ? 'ring-1' : ''}`}
            style={{ ringColor: containerFilter === 'Ready for Shipping' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('Ready for Shipping')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Package className="w-5 h-5" style={{ color: colors.info }} />
              </div>
              <span className="text-xs font-medium text-blue-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {orderStats.ready}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.ready}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Ready for Shipping
            </p>
            {containerFilter === 'Ready for Shipping' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'Awaiting Confirmation' ? 'ring-1' : ''}`}
            style={{ ringColor: containerFilter === 'Awaiting Confirmation' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('Awaiting Confirmation')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Clock className="w-5 h-5" style={{ color: colors.warning }} />
              </div>
              <span className="text-xs font-medium text-yellow-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {orderStats.awaiting}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.awaiting}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Awaiting Confirmation
            </p>
            {containerFilter === 'Awaiting Confirmation' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'Forwarded for Verification' ? 'ring-1' : ''}`}
            style={{ ringColor: containerFilter === 'Forwarded for Verification' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('Forwarded for Verification')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <FileCheck className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs font-medium text-purple-500 flex items-center gap-1">
                <Flag className="w-3 h-3" />
                {orderStats.forwarded}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.forwarded}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Forwarded for Verification
            </p>
            {containerFilter === 'Forwarded for Verification' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'Shipped' ? 'ring-1' : ''}`}
            style={{ ringColor: containerFilter === 'Shipped' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('Shipped')}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                <Ship className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {orderStats.shipped}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderStats.shipped}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Shipped
            </p>
            {containerFilter === 'Shipped' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
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
                <DollarIcon className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12%
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {formatUGX(orderStats.totalValue)}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Order Value
            </p>
            {containerFilter === 'Delivered' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
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
                    <Package className="w-5 h-5" style={{ color: colors.primary }} />
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
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Ready for Shipping">Ready for Shipping</option>
                    <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                    <option value="Forwarded for Verification">Forwarded for Verification</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <select
                    value={containerCustomerFilter}
                    onChange={(e) => setContainerCustomerFilter(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    {getUniqueCustomers().slice(0, 4).map(customer => (
                      <option key={customer} value={customer}>
                        {customer === 'all' ? 'Customer' : customer.substring(0, 15) + (customer.length > 15 ? '...' : '')}
                      </option>
                    ))}
                  </select>

                  <select
                    value={containerTransportFilter}
                    onChange={(e) => setContainerTransportFilter(e.target.value)}
                    className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    {getUniqueTransportModes().map(mode => (
                      <option key={mode} value={mode}>
                        {mode === 'all' ? 'Transport' : mode}
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
                    <option value="amount-desc">Highest Amount</option>
                    <option value="amount-asc">Lowest Amount</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>

              {/* Order View */}
              {filteredOrders.length > 0 ? (
                containerViewMode === 'list' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[800px]">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Order No
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Customer
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Voyage
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Status
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Amount (UGX)
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
                        {currentOrders.map((order) => (
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
                                  <span className={`font-medium text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {order.orderNo}
                                  </span>
                                  {order.exportType === 'Local' && (
                                    <span className="text-[8px] px-1 py-0.5 rounded-full bg-green-500/20 text-green-500">
                                      Local
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {order.customer.substring(0, 15)}{order.customer.length > 15 ? '...' : ''}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <div className="flex items-center gap-1">
                                  {getTransportModeIcon(order.transportMode)}
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {order.voyage}
                                  </span>
                                </div>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs px-1.5 py-0.5 rounded-full`}
                                  style={{
                                    backgroundColor: getStatusColor(order.status) + '20',
                                    color: getStatusColor(order.status)
                                  }}>
                                  {order.status}
                                  {order.delayed && <AlertIcon className="w-2.5 h-2.5 ml-0.5 inline" />}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`font-medium text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {formatUGX(order.orderAmount)}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs px-1.5 py-0.5 rounded-full`}
                                  style={{
                                    backgroundColor: getPaymentStatusColor(order.paymentStatus) + '20',
                                    color: getPaymentStatusColor(order.paymentStatus)
                                  }}>
                                  {order.paymentStatus}
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
                                  <button
                                    className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                    style={{ color: colors.warning }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openStatusModal(order);
                                    }}
                                    title="Update Status"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
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
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">No orders found</p>
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
                    <option value="Shipping">Shipping</option>
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
                                  const order = ordersData.find(c => c.id === alert.orderId);
                                  if (order) {
                                    setExpandedOrderId(order.id);
                                    setExpandedContainerTab('info');
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
      {showStatusModal && <StatusUpdateModal />}
      {showPrintModal && <PrintModal />}
    </div>
  );
};

export default ExporterDashboard;