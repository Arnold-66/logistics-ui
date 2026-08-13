// roles/freightforwarder/FreightForwarderBookings.jsx
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
  PenSquare,
  Save,
  Globe as GlobeIcon,
  Flag as FlagIcon,
  Container,
  Ship as ShipIcon
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const FreightForwarderBookings = () => {
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBookingData, setEditBookingData] = useState(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [notifyRecipient, setNotifyRecipient] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter states
  const [containerFilter, setContainerFilter] = useState('all');
  const [containerSearch, setContainerSearch] = useState('');
  const [containerStatusFilter, setContainerStatusFilter] = useState('all');
  const [containerSortBy, setContainerSortBy] = useState('date-desc');
  const [expandedContainerTab, setExpandedContainerTab] = useState('info');
  const [documentFilter, setDocumentFilter] = useState('all');

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

  // Helper function to get country flag emoji
  const getCountryFlag = (countryName) => {
    const flagMap = {
      'Liberia': '🇱🇷',
      'India': '🇮🇳',
      'South Africa': '🇿🇦',
      'Panama': '🇵🇦',
      'Germany': '🇩🇪',
      'Kenya': '🇰🇪',
      'Uganda': '🇺🇬',
      'United Kingdom': '🇬🇧',
      'USA': '🇺🇸',
      'China': '🇨🇳',
      'Japan': '🇯🇵',
      'Singapore': '🇸🇬',
      'Malaysia': '🇲🇾',
      'Indonesia': '🇮🇩',
      'Thailand': '🇹🇭',
      'Vietnam': '🇻🇳',
      'Philippines': '🇵🇭',
      'Myanmar': '🇲🇲',
      'Cambodia': '🇰🇭',
      'Laos': '🇱🇦',
      'Brunei': '🇧🇳',
      'Timor-Leste': '🇹🇱',
      'Maldives': '🇲🇻',
      'Sri Lanka': '🇱🇰',
      'Bangladesh': '🇧🇩',
      'Pakistan': '🇵🇰',
      'Nepal': '🇳🇵',
      'Bhutan': '🇧🇹',
      'Mongolia': '🇲🇳',
      'North Korea': '🇰🇵',
      'South Korea': '🇰🇷',
      'Taiwan': '🇹🇼',
      'Hong Kong': '🇭🇰',
      'Macau': '🇲🇴',
      'Afghanistan': '🇦🇫',
      'Iran': '🇮🇷',
      'Iraq': '🇮🇶',
      'Syria': '🇸🇾',
      'Lebanon': '🇱🇧',
      'Jordan': '🇯🇴',
      'Israel': '🇮🇱',
      'Palestine': '🇵🇸',
      'Saudi Arabia': '🇸🇦',
      'Yemen': '🇾🇪',
      'Oman': '🇴🇲',
      'UAE': '🇦🇪',
      'Qatar': '🇶🇦',
      'Bahrain': '🇧🇭',
      'Kuwait': '🇰🇼',
      'Egypt': '🇪🇬',
      'Libya': '🇱🇾',
      'Tunisia': '🇹🇳',
      'Algeria': '🇩🇿',
      'Morocco': '🇲🇦',
      'Mauritania': '🇲🇷',
      'Senegal': '🇸🇳',
      'Gambia': '🇬🇲',
      'Mali': '🇲🇱',
      'Burkina Faso': '🇧🇫',
      'Niger': '🇳🇪',
      'Nigeria': '🇳🇬',
      'Cameroon': '🇨🇲',
      'Chad': '🇹🇩',
      'Sudan': '🇸🇩',
      'South Sudan': '🇸🇸',
      'Eritrea': '🇪🇷',
      'Djibouti': '🇩🇯',
      'Somalia': '🇸🇴',
      'Ethiopia': '🇪🇹',
      'Rwanda': '🇷🇼',
      'Burundi': '🇧🇮',
      'Tanzania': '🇹🇿',
      'Malawi': '🇲🇼',
      'Zambia': '🇿🇲',
      'Zimbabwe': '🇿🇼',
      'Mozambique': '🇲🇿',
      'Angola': '🇦🇴',
      'Namibia': '🇳🇦',
      'Botswana': '🇧🇼',
      'Lesotho': '🇱🇸',
      'Eswatini': '🇸🇿',
      'Madagascar': '🇲🇬',
      'Comoros': '🇰🇲',
      'Seychelles': '🇸🇨',
      'Mauritius': '🇲🇺',
      'France': '🇫🇷',
      'Spain': '🇪🇸',
      'Portugal': '🇵🇹',
      'Italy': '🇮🇹',
      'Greece': '🇬🇷',
      'Turkey': '🇹🇷',
      'Netherlands': '🇳🇱',
      'Belgium': '🇧🇪',
      'Luxembourg': '🇱🇺',
      'Switzerland': '🇨🇭',
      'Austria': '🇦🇹',
      'Czech Republic': '🇨🇿',
      'Slovakia': '🇸🇰',
      'Hungary': '🇭🇺',
      'Slovenia': '🇸🇮',
      'Croatia': '🇭🇷',
      'Bosnia': '🇧🇦',
      'Serbia': '🇷🇸',
      'Montenegro': '🇲🇪',
      'Kosovo': '🇽🇰',
      'Albania': '🇦🇱',
      'Macedonia': '🇲🇰',
      'Romania': '🇷🇴',
      'Bulgaria': '🇧🇬',
      'Moldova': '🇲🇩',
      'Ukraine': '🇺🇦',
      'Belarus': '🇧🇾',
      'Russia': '🇷🇺',
      'Poland': '🇵🇱',
      'Lithuania': '🇱🇹',
      'Latvia': '🇱🇻',
      'Estonia': '🇪🇪',
      'Finland': '🇫🇮',
      'Sweden': '🇸🇪',
      'Norway': '🇳🇴',
      'Denmark': '🇩🇰',
      'Iceland': '🇮🇸',
      'Ireland': '🇮🇪',
      'Australia': '🇦🇺',
      'New Zealand': '🇳🇿',
      'Papua New Guinea': '🇵🇬',
      'Fiji': '🇫🇯',
      'Samoa': '🇼🇸',
      'Tonga': '🇹🇴',
      'Kiribati': '🇰🇮',
      'Marshall Islands': '🇲🇭',
      'Palau': '🇵🇼',
      'Nauru': '🇳🇷',
      'Tuvalu': '🇹🇻',
      'Vanuatu': '🇻🇺',
      'Solomon Islands': '🇸🇧',
      'Canada': '🇨🇦',
      'Mexico': '🇲🇽',
      'Brazil': '🇧🇷',
      'Argentina': '🇦🇷',
      'Uruguay': '🇺🇾',
      'Paraguay': '🇵🇾',
      'Bolivia': '🇧🇴',
      'Peru': '🇵🇪',
      'Ecuador': '🇪🇨',
      'Colombia': '🇨🇴',
      'Venezuela': '🇻🇪',
      'Guyana': '🇬🇾',
      'Suriname': '🇸🇷',
      'French Guiana': '🇬🇫',
      'Chile': '🇨🇱',
      'Costa Rica': '🇨🇷',
      'Nicaragua': '🇳🇮',
      'Honduras': '🇭🇳',
      'El Salvador': '🇸🇻',
      'Guatemala': '🇬🇹',
      'Belize': '🇧🇿',
      'Cuba': '🇨🇺',
      'Jamaica': '🇯🇲',
      'Haiti': '🇭🇹',
      'Dominican Republic': '🇩🇴',
      'Puerto Rico': '🇵🇷',
      'Trinidad and Tobago': '🇹🇹',
      'Barbados': '🇧🇧',
      'Bahamas': '🇧🇸',
      'Antigua and Barbuda': '🇦🇬',
      'Dominica': '🇩🇲',
      'St Lucia': '🇱🇨',
      'St Vincent': '🇻🇨',
      'Grenada': '🇬🇩',
      'St Kitts and Nevis': '🇰🇳'
    };
    
    if (flagMap[countryName]) {
      return flagMap[countryName];
    }
    
    for (const [key, value] of Object.entries(flagMap)) {
      if (countryName && countryName.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    
    return '🌍';
  };

  // Document data for containers
  const containerDocuments = {
    'FF-001': [
      { id: 'DOC-001', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-07-20', size: '2.4 MB' },
      { id: 'DOC-002', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-07-18', size: '1.8 MB' },
      { id: 'DOC-003', name: 'Packing List', type: 'pdf', status: 'pending', date: '2026-07-25', size: '0.9 MB' },
      { id: 'DOC-004', name: 'Certificate of Origin', type: 'pdf', status: 'uploaded', date: '2026-07-22', size: '1.2 MB' },
    ],
    'FF-002': [
      { id: 'DOC-005', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-08-05', size: '2.1 MB' },
      { id: 'DOC-006', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-03', size: '1.5 MB' },
      { id: 'DOC-007', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-08-06', size: '0.8 MB' },
      { id: 'DOC-008', name: 'UNBS CoC', type: 'pdf', status: 'pending', date: '2026-08-10', size: '3.2 MB' },
      { id: 'DOC-009', name: 'Insurance Certificate', type: 'pdf', status: 'uploaded', date: '2026-08-04', size: '1.1 MB' },
    ],
    'FF-003': [
      { id: 'DOC-010', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-07-15', size: '2.6 MB' },
      { id: 'DOC-011', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-07-12', size: '2.0 MB' },
      { id: 'DOC-012', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-07-16', size: '1.0 MB' },
      { id: 'DOC-013', name: 'Delivery Note', type: 'pdf', status: 'uploaded', date: '2026-08-05', size: '0.7 MB' },
    ],
    'FF-004': [
      { id: 'DOC-014', name: 'Bill of Lading', type: 'pdf', status: 'pending', date: '2026-09-01', size: '2.3 MB' },
      { id: 'DOC-015', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-30', size: '1.6 MB' },
      { id: 'DOC-016', name: 'Packing List', type: 'pdf', status: 'pending', date: '2026-09-02', size: '0.8 MB' },
    ],
    'FF-005': [
      { id: 'DOC-017', name: 'Bill of Lading', type: 'pdf', status: 'uploaded', date: '2026-08-22', size: '2.7 MB' },
      { id: 'DOC-018', name: 'Commercial Invoice', type: 'pdf', status: 'uploaded', date: '2026-08-20', size: '2.2 MB' },
      { id: 'DOC-019', name: 'Packing List', type: 'pdf', status: 'uploaded', date: '2026-08-23', size: '0.9 MB' },
      { id: 'DOC-020', name: 'Certificate of Origin', type: 'pdf', status: 'pending', date: '2026-08-25', size: '1.3 MB' },
      { id: 'DOC-021', name: 'UNBS PVoC', type: 'pdf', status: 'pending', date: '2026-08-28', size: '3.5 MB' },
    ]
  };

  // Complete Container Data for Freight Forwarder
  const containersData = [
    {
      id: 'FF-001',
      sealNo: 'SEAL-78923',
      serviceName: 'MV Star Express',
      size: '40ft HC',
      packages: 24,
      grossWeight: '28,500 kg',
      volume: '67.5 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Premium Electronics and Circuit Components',
      exporter: 'ImportFlow Ltd',
      consignee: {
        name: 'ImportFlow Ltd',
        contact: '+256 700 123456',
        email: 'operations@importflow.com',
        address: 'Kampala Business Park, Plot 45, Kampala'
      },
      status: 'At Port',
      location: 'Mombasa Port - Export Terminal',
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
      assignmentStatus: 'Accepted',
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
      declaredCargoValue: '$245,000.00',
      shippingDate: '2026-08-01',
      placeOfFinalDelivery: 'Kampala, Uganda',
      preCarriageBy: 'Truck',
      placeOfReceipt: 'Nairobi, Kenya',
      vesselName: 'MV Star Express',
      vesselSCAC: 'STAR',
      voyageNumber: '2026-08',
      countryFlag: 'Liberia',
      portOfLoading: 'Mombasa, Kenya',
      loadingPierTerminal: 'Terminal 3',
      originalsToBeReleasedAt: 'Mombasa Port Office',
      portOfDischarge: 'Mombasa, Kenya',
      typeOfMovement: 'Door to Door',
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
        { date: '2026-08-10 08:00', location: 'Mombasa Port - Export Terminal', status: 'Arrived' }
      ],
      expectedDeparture: '2026-07-25',
      expectedArrival: '2026-08-10',
      delayed: false,
      delayReason: null,
      actionRequired: 'Submit Customs Declaration',
      daysInTransit: 16,
      originalETA: '2026-08-10',
      originalShippingDate: '2026-08-01',
      originalPlaceOfDelivery: 'Kampala, Uganda'
    },
    {
      id: 'FF-002',
      sealNo: 'SEAL-45612',
      serviceName: 'MV Indian Trader',
      size: '20ft ST',
      packages: 15,
      grossWeight: '18,200 kg',
      volume: '33.2 m³',
      measurement: '6.0m x 2.4m x 2.6m',
      cargoDescription: 'Textile Fabrics and Dyeing Agents',
      exporter: 'Global Textiles Uganda Ltd',
      consignee: {
        name: 'Global Textiles Uganda Ltd',
        contact: '+256 712 345678',
        email: 'purchasing@globaltextiles.ug',
        address: '456 Industrial Area, Kampala, Uganda'
      },
      status: 'At Port',
      location: 'Mombasa Port - Export Terminal',
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
      assignmentStatus: 'Pending',
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
      declaredCargoValue: '$89,500.00',
      shippingDate: '2026-08-05',
      placeOfFinalDelivery: 'Kampala, Uganda',
      preCarriageBy: 'Rail',
      placeOfReceipt: 'Mombasa, Kenya',
      vesselName: 'MV Indian Trader',
      vesselSCAC: 'INDI',
      voyageNumber: '2026-07',
      countryFlag: 'India',
      portOfLoading: 'Mumbai, India',
      loadingPierTerminal: 'Terminal 1',
      originalsToBeReleasedAt: 'Mombasa Port Office',
      portOfDischarge: 'Mombasa, Kenya',
      typeOfMovement: 'Port to Door',
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
      originalETA: '2026-08-18',
      originalShippingDate: '2026-08-05',
      originalPlaceOfDelivery: 'Kampala, Uganda'
    },
    {
      id: 'FF-003',
      sealNo: 'SEAL-89234',
      serviceName: 'MV African Trader',
      size: '40ft HC',
      packages: 18,
      grossWeight: '32,400 kg',
      volume: '71.8 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Industrial Machinery and Spare Parts',
      exporter: 'Machinery Uganda Ltd',
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
      declaredCargoValue: '$187,200.00',
      shippingDate: '2026-07-20',
      placeOfFinalDelivery: 'Kampala, Uganda',
      preCarriageBy: 'Truck',
      placeOfReceipt: 'Nairobi, Kenya',
      vesselName: 'MV African Trader',
      vesselSCAC: 'AFTR',
      voyageNumber: '2026-06',
      countryFlag: 'South Africa',
      portOfLoading: 'Durban, South Africa',
      loadingPierTerminal: 'Terminal 2',
      originalsToBeReleasedAt: 'Mombasa Port Office',
      portOfDischarge: 'Mombasa, Kenya',
      typeOfMovement: 'Door to Door',
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
      originalETA: '2026-07-25',
      originalShippingDate: '2026-07-20',
      originalPlaceOfDelivery: 'Kampala, Uganda'
    },
    {
      id: 'FF-004',
      sealNo: 'SEAL-56789',
      serviceName: 'MV Pacific Express',
      size: '20ft ST',
      packages: 20,
      grossWeight: '15,800 kg',
      volume: '33.2 m³',
      measurement: '6.0m x 2.4m x 2.6m',
      cargoDescription: 'Packaging Materials and Consumables',
      exporter: 'Packaging Solutions Ltd',
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
      assignmentStatus: 'Accepted',
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
      declaredCargoValue: '$52,300.00',
      shippingDate: '2026-09-01',
      placeOfFinalDelivery: 'Kampala, Uganda',
      preCarriageBy: 'Truck',
      placeOfReceipt: 'Nairobi, Kenya',
      vesselName: 'MV Pacific Express',
      vesselSCAC: 'PACI',
      voyageNumber: '2026-08',
      countryFlag: 'Panama',
      portOfLoading: 'Shanghai, China',
      loadingPierTerminal: 'Terminal 1',
      originalsToBeReleasedAt: 'Mombasa Port Office',
      portOfDischarge: 'Mombasa, Kenya',
      typeOfMovement: 'Port to Door',
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
      originalETA: '2026-09-28',
      originalShippingDate: '2026-09-01',
      originalPlaceOfDelivery: 'Kampala, Uganda'
    },
    {
      id: 'FF-005',
      sealNo: 'SEAL-34126',
      serviceName: 'MV Europe Trader',
      size: '40ft HC',
      packages: 22,
      grossWeight: '26,700 kg',
      volume: '67.5 m³',
      measurement: '12.2m x 2.4m x 2.9m',
      cargoDescription: 'Automotive Components and Accessories',
      exporter: 'AutoParts Uganda Ltd',
      consignee: {
        name: 'AutoParts Uganda Ltd',
        contact: '+256 705 678901',
        email: 'purchasing@autoparts.ug',
        address: '789 Auto Strasse, Kampala, Uganda'
      },
      status: 'At Port',
      location: 'Mombasa Port - Export Terminal',
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
      assignmentStatus: 'Refer',
      clearanceStatus: 'On Hold',
      daysInPort: 6,
      transitStatus: 'At Port',
      expectedArrivalDate: '2026-09-10',
      shipDetails: 'MV Europe Trader | Voyage: 2026-07',
      transporterReady: false,
      paymentStatus: 'Pending',
      transporterProgress: 10,
      transporterStatus: 'Awaiting Customs Clearance',
      transporterLocation: 'Mombasa Port - Export Terminal',
      transporterETA: '2026-09-18 09:00',
      declaredCargoValue: '$156,800.00',
      shippingDate: '2026-08-25',
      placeOfFinalDelivery: 'Kampala, Uganda',
      preCarriageBy: 'Rail',
      placeOfReceipt: 'Mombasa, Kenya',
      vesselName: 'MV Europe Trader',
      vesselSCAC: 'EURO',
      voyageNumber: '2026-07',
      countryFlag: 'Germany',
      portOfLoading: 'Hamburg, Germany',
      loadingPierTerminal: 'Terminal 3',
      originalsToBeReleasedAt: 'Mombasa Port Office',
      portOfDischarge: 'Mombasa, Kenya',
      typeOfMovement: 'Port to Door',
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
      originalETA: '2026-09-15',
      originalShippingDate: '2026-08-25',
      originalPlaceOfDelivery: 'Kampala, Uganda'
    }
  ];

  // Get status color function
  const getStatusColor = (status) => {
    const statusMap = {
      'Cleared': colors.success,
      'At Port': colors.warning,
      'In Transit': colors.info,
      'Delivered': colors.success,
      'Customs Hold': colors.danger,
      'Documentation Pending': colors.warning,
      'Awaiting Clearance': colors.info,
      'On Hold': colors.danger,
      'Released': colors.success,
      'Inspection Required': colors.warning,
      'Quarantined': colors.danger,
      'Transit Delay': colors.danger,
      'Port Congestion': colors.warning
    };
    return statusMap[status] || colors.info;
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
    let filtered = [...containersData];

    if (containerFilter !== 'all') {
      filtered = filtered.filter(c => c.status === containerFilter);
    }

    if (containerStatusFilter !== 'all') {
      filtered = filtered.filter(c => c.assignmentStatus === containerStatusFilter);
    }

    if (containerSearch) {
      const search = containerSearch.toLowerCase();
      filtered = filtered.filter(c =>
        c.id.toLowerCase().includes(search) ||
        c.sealNo.toLowerCase().includes(search) ||
        c.voyage.toLowerCase().includes(search) ||
        c.cargoDescription.toLowerCase().includes(search) ||
        c.exporter.toLowerCase().includes(search)
      );
    }

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
      case 'days-desc':
        filtered.sort((a, b) => (b.daysInPort || 0) - (a.daysInPort || 0));
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

  // Pagination for containers
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContainers = filteredContainers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContainers.length / itemsPerPage);

  // Stats
  const containerStats = {
    total: containersData.length,
    atPort: containersData.filter(c => c.status === 'At Port' || c.status === 'Customs Hold' || c.status === 'Awaiting Clearance' || c.status === 'On Hold').length,
    inTransit: containersData.filter(c => c.status === 'In Transit' || c.status === 'Transit Delay').length,
    cleared: containersData.filter(c => c.status === 'Cleared' || c.status === 'Released').length,
    pending: containersData.filter(c => c.assignmentStatus === 'Pending').length,
    accepted: containersData.filter(c => c.assignmentStatus === 'Accepted').length,
    referred: containersData.filter(c => c.assignmentStatus === 'Refer').length
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
    setShowActionModal(false);
    setSelectedContainerForAction(null);
    setActionReason('');
  };

  // Handle send freight invoice
  const handleSendBill = (container) => {
    setSelectedContainerForAction(container);
    setBillAmount('');
    setBillDescription('');
    setShowBillModal(true);
  };

  const confirmSendBill = () => {
    setShowBillModal(false);
    setSelectedContainerForAction(null);
    setBillAmount('');
    setBillDescription('');
  };

  // Handle notify exporter
  const handleNotifyExporter = (container) => {
    setSelectedContainerForAction(container);
    setNotifyRecipient(container.exporter);
    setNotifyMessage('');
    setShowNotifyModal(true);
  };

  const confirmNotify = () => {
    setShowNotifyModal(false);
    setSelectedContainerForAction(null);
    setNotifyMessage('');
    setNotifyRecipient('');
    alert(`Notification sent to ${notifyRecipient}`);
  };

  // Handle edit booking
  const handleEditBooking = (container) => {
    setEditBookingData({
      ...container,
      originalETA: container.originalETA || container.eta,
      originalShippingDate: container.originalShippingDate || container.shippingDate,
      originalPlaceOfDelivery: container.originalPlaceOfDelivery || container.placeOfFinalDelivery
    });
    setShowEditModal(true);
  };

  const confirmEditBooking = () => {
    setShowEditModal(false);
    setEditBookingData(null);
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
    setShowPrintModal(false);
    window.print();
  };

  // Reset filters
  const resetContainerFilters = () => {
    setContainerFilter('all');
    setContainerStatusFilter('all');
    setContainerSearch('');
    setContainerSortBy('date-desc');
    setCurrentPage(1);
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
      accept: 'Accept Booking',
      reject: 'Reject Booking',
      refer: 'Refer Booking'
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
              Container: <span className="font-medium">{selectedContainerForAction.id}</span>
            </p>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Exporter: <span className="font-medium">{selectedContainerForAction.exporter}</span>
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
                Send Freight Invoice
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
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Freight Amount ($)
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="Enter freight amount..."
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

  // Render Edit Booking Modal
  const EditBookingModal = () => {
    if (!showEditModal || !editBookingData) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowEditModal(false)}>
        <div
          className="w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <PenSquare className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Edit Booking - {editBookingData.id}
              </h3>
            </div>
            <button
              onClick={() => setShowEditModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Shipping Details</h4>
                <div className="space-y-2">
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</label>
                    <input
                      type="date"
                      value={editBookingData.eta || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, eta: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Cargo Value</label>
                    <input
                      type="text"
                      value={editBookingData.declaredCargoValue || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, declaredCargoValue: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipping Date</label>
                    <input
                      type="date"
                      value={editBookingData.shippingDate || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, shippingDate: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Place of Final Delivery</label>
                    <input
                      type="text"
                      value={editBookingData.placeOfFinalDelivery || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, placeOfFinalDelivery: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Vessel & Route Details</h4>
                <div className="space-y-2">
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pre-Carriage By</label>
                    <input
                      type="text"
                      value={editBookingData.preCarriageBy || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, preCarriageBy: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Place of Receipt</label>
                    <input
                      type="text"
                      value={editBookingData.placeOfReceipt || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, placeOfReceipt: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel Name</label>
                    <input
                      type="text"
                      value={editBookingData.vesselName || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, vesselName: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel SCAC</label>
                    <input
                      type="text"
                      value={editBookingData.vesselSCAC || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, vesselSCAC: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage Number</label>
                    <input
                      type="text"
                      value={editBookingData.voyageNumber || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, voyageNumber: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <button
              onClick={() => setShowEditModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmEditBooking}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Notify Modal
  const NotifyModal = () => {
    if (!showNotifyModal || !selectedContainerForAction) return null;

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
                Notify Exporter
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
              Container: <span className="font-medium">{selectedContainerForAction.id}</span>
            </p>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Recipient: <span className="font-medium">{selectedContainerForAction.exporter}</span>
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
                        <button
                          onClick={() => handlePrint(doc)}
                          className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                          style={{ color: colors.primary }}
                          title="Print Document"
                        >
                          <Printer className="w-4 h-4" />
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

  // Render expanded container details with Hide Details button at bottom
  const renderExpandedContainer = (container) => {
    const isExpanded = expandedContainerId === container.id;
    if (!isExpanded) return null;

    const tabs = [
      { id: 'info', label: 'Container Info', icon: Info },
      { id: 'booking', label: 'Booking Details', icon: ClipboardList },
      { id: 'packing', label: 'Packing List', icon: Package },
      { id: 'documents', label: 'Documents', icon: FileText },
      { id: 'tracking', label: 'Tracking', icon: Map }
    ];

    const transitInfo = getTransitStatusDisplay(container);

    return (
      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <td colSpan="8" className="p-0">
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
            {container.assignmentStatus === 'Pending' && (
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleAssignmentAction(container, 'accept')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.success }}
                >
                  <Check className="w-3 h-3" />
                  Accept Booking
                </button>
                <button
                  onClick={() => handleAssignmentAction(container, 'reject')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.danger }}
                >
                  <X className="w-3 h-3" />
                  Reject Booking
                </button>
                <button
                  onClick={() => handleAssignmentAction(container, 'refer')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.info }}
                >
                  <AlertCircle className="w-3 h-3" />
                  Refer Booking
                </button>
              </div>
            )}

            {container.assignmentStatus === 'Accepted' && (
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleEditBooking(container)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.primary }}
                >
                  <PenSquare className="w-3 h-3" />
                  Edit Booking
                </button>
                <button
                  onClick={() => handleSendBill(container)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.success }}
                >
                  <DollarIcon className="w-3 h-3" />
                  Send Freight Invoice
                </button>
                <button
                  onClick={() => handleNotifyExporter(container)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.info }}
                >
                  <Mail className="w-3 h-3" />
                  Notify Exporter
                </button>
                <button
                  onClick={() => handlePrint(container)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Printer className="w-3 h-3" />
                  Print Documents
                </button>
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

            {/* Tab Content - Simplified for brevity, includes flag display */}
            <div className="space-y-4">
              {expandedContainerTab === 'info' && (
                <div className="space-y-4">
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
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1`}
                        style={{
                          backgroundColor: getStatusColor(container.status) + '20',
                          color: getStatusColor(container.status)
                        }}>
                        {container.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Assignment Date</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.assignmentDate || 'N/A'}
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
                </div>
              )}

              {expandedContainerTab === 'booking' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Booking Details
                    </h3>
                    <button
                      onClick={() => handleEditBooking(container)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <PenSquare className="w-3 h-3" />
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Cargo Value</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.declaredCargoValue || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipping Date</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.shippingDate || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ETA</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.eta || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Place of Final Delivery</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.placeOfFinalDelivery || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pre-Carriage By</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.preCarriageBy || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Place of Receipt</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.placeOfReceipt || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel Name</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.vesselName || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel SCAC</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.vesselSCAC || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage Number</p>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {container.voyageNumber || 'N/A'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country Flag</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl">{getCountryFlag(container.countryFlag)}</span>
                        <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {container.countryFlag || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {expandedContainerTab === 'packing' && (
                <div className="space-y-3">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Packing Lists ({container.packingLists.length})
                  </h3>
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
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Container Tracking
                  </h3>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Location: {container.location}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Expected Arrival: {container.expectedArrivalDate || container.eta}
                    </p>
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
                </div>
              )}
            </div>

            {/* HIDE DETAILS BUTTON - AT THE BOTTOM */}
            <div className="mt-4 pt-4 border-t flex justify-center" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <button
                onClick={() => toggleContainerExpand(container.id)}
                className="px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80 flex items-center gap-2"
                style={{
                  backgroundColor: colors.danger + '20',
                  color: colors.danger
                }}
              >
                <ChevronDown className="w-4 h-4 rotate-180" />
                Hide Details
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
        {currentContainers.map((container) => {
          const transitInfo = getTransitStatusDisplay(container);
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
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Exporter:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{container.exporter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Assignment:</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full`}
                      style={{
                        backgroundColor: getAssignmentStatusColor(container.assignmentStatus) + '20',
                        color: getAssignmentStatusColor(container.assignmentStatus)
                      }}>
                      {container.assignmentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Transit:</span>
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1`}
                      style={{
                        backgroundColor: transitInfo.color + '20',
                        color: transitInfo.color
                      }}>
                      {transitInfo.icon}
                      {transitInfo.label}
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
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA:</span>
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>{container.expectedArrivalDate || container.eta}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Flag:</span>
                    <span className="text-lg">{getCountryFlag(container.countryFlag)}</span>
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
            Here's your freight forwarder dashboard with all bookings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
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
              {containerStats.total}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Bookings
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.warning + '20' }}>
                <Clock className="w-5 h-5" style={{ color: colors.warning }} />
              </div>
              <span className="text-xs font-medium text-yellow-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {containerStats.pending}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.pending}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Pending
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.success + '20' }}>
                <Check className="w-5 h-5" style={{ color: colors.success }} />
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
              Accepted
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.info + '20' }}>
                <AlertCircle className="w-5 h-5" style={{ color: colors.info }} />
              </div>
              <span className="text-xs font-medium text-blue-500 flex items-center gap-1">
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
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.warning + '20' }}>
                <Anchor className="w-5 h-5" style={{ color: colors.warning }} />
              </div>
              <span className="text-xs font-medium text-yellow-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {containerStats.atPort}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.atPort}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              At Port
            </p>
          </div>

          <div className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.success + '20' }}>
                <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
              </div>
              <span className="text-xs font-medium text-green-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                {containerStats.cleared}
              </span>
            </div>
            <h3 className={`text-xl font-bold mt-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {containerStats.cleared}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Cleared
            </p>
          </div>
        </div>

        {/* Full Width Table */}
        <div className="w-full">
          <div id="containers-section" className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Anchor className="w-5 h-5" style={{ color: colors.primary }} />
                  <h2 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    My Bookings
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
                  <option value="At Port">At Port</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Cleared">Cleared</option>
                </select>

                <select
                  value={containerStatusFilter}
                  onChange={(e) => setContainerStatusFilter(e.target.value)}
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
                  value={containerSortBy}
                  onChange={(e) => setContainerSortBy(e.target.value)}
                  className={`px-2 py-1.5 rounded-lg border text-xs focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  <option value="date-desc">Latest</option>
                  <option value="date-asc">Oldest</option>
                  <option value="days-desc">Most Days</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>

            {/* Container View */}
            {filteredContainers.length > 0 ? (
              containerViewMode === 'list' ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[900px]">
                    <thead>
                      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Container
                        </th>
                        <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Exporter
                        </th>
                        <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Assigned
                        </th>
                        <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Status
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
                                <div className="flex items-center gap-1">
                                  <Anchor className="w-3 h-3" style={{ color: colors.primary }} />
                                  <span className={`font-medium text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {container.id}
                                  </span>
                                </div>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {container.exporter.substring(0, 15)}{container.exporter.length > 15 ? '...' : ''}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {container.assignmentDate || 'N/A'}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <span className={`text-xs px-1.5 py-0.5 rounded-full`}
                                  style={{
                                    backgroundColor: getAssignmentStatusColor(container.assignmentStatus) + '20',
                                    color: getAssignmentStatusColor(container.assignmentStatus)
                                  }}>
                                  {container.assignmentStatus}
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
                                <div className="flex items-center gap-0.5">
                                  <button
                                    className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                    style={{ color: colors.primary }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleContainerExpand(container.id);
                                    }}
                                    title={expandedContainerId === container.id ? 'Hide Details' : 'View Details'}
                                  >
                                    {expandedContainerId === container.id ? (
                                      <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                                    ) : (
                                      <Eye className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                  {container.assignmentStatus === 'Pending' && (
                                    <>
                                      <button
                                        className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                        style={{ color: colors.success }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAssignmentAction(container, 'accept');
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
                                          handleAssignmentAction(container, 'reject');
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
                                          handleAssignmentAction(container, 'refer');
                                        }}
                                        title="Refer"
                                      >
                                        <AlertCircle className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  )}
                                  {container.assignmentStatus === 'Accepted' && (
                                    <>
                                      <button
                                        className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                        style={{ color: colors.primary }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEditBooking(container);
                                        }}
                                        title="Edit Booking"
                                      >
                                        <PenSquare className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                        style={{ color: colors.success }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSendBill(container);
                                        }}
                                        title="Send Invoice"
                                      >
                                        <DollarIcon className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                        style={{ color: colors.info }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleNotifyExporter(container);
                                        }}
                                        title="Notify Exporter"
                                      >
                                        <Mail className="w-3.5 h-3.5" />
                                      </button>
                                    </>
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
              )
            ) : (
              <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Anchor className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">No bookings found</p>
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
      </div>

      {/* Modals */}
      {showActionModal && <ActionModal />}
      {showBillModal && <BillModal />}
      {showPrintModal && <PrintModal />}
      {showEditModal && <EditBookingModal />}
      {showNotifyModal && <NotifyModal />}
    </div>
  );
};

export default FreightForwarderBookings;