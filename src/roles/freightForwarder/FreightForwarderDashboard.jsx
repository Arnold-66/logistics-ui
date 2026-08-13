// roles/freightforwarder/FreightForwarderDashboard.jsx
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
  Car,
  Plane,
  Train,
  Plus,
  Image,
  Camera
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const FreightForwarderDashboard = () => {
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

  // New state for vessel management
  const [showVesselModal, setShowVesselModal] = useState(false);
  const [selectedVesselContainer, setSelectedVesselContainer] = useState(null);
  const [vesselData, setVesselData] = useState({
    name: '',
    type: 'ship', // ship, plane, truck, train
    image: null,
    imagePreview: null,
    voyage: '',
    route: '',
    scac: '',
    flag: '',
    capacity: '',
    description: ''
  });

  // New state for status management
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatusContainer, setSelectedStatusContainer] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [customStatus, setCustomStatus] = useState('');
  const [showCustomStatusInput, setShowCustomStatusInput] = useState(false);

  // New state for booking creation
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [newBookingType, setNewBookingType] = useState('new'); // 'new' or 'process'
  const [newBookingData, setNewBookingData] = useState({
    exporter: '',
    consignee: '',
    cargoDescription: '',
    packages: '',
    weight: '',
    volume: '',
    containerType: '20ft ST',
    origin: '',
    destination: '',
    vesselName: '',
    voyageNumber: '',
    eta: '',
    status: 'At Port'
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [alertsPage, setAlertsPage] = useState(1);
  const [alertsPerPage] = useState(3);

  // Filter states
  const [containerFilter, setContainerFilter] = useState('all');
  const [containerSearch, setContainerSearch] = useState('');
  const [containerStatusFilter, setContainerStatusFilter] = useState('all');
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

  // Flag SVG component using country ISO codes
const getCountryCode = (countryName) => {
  const codeMap = {
    'Liberia': 'LR',
    'India': 'IN',
    'South Africa': 'ZA',
    'Panama': 'PA',
    'Germany': 'DE',
    'Kenya': 'KE',
    'Uganda': 'UG',
    'United Kingdom': 'GB',
    'USA': 'US',
    'China': 'CN',
    'Japan': 'JP',
    'Singapore': 'SG',
    'Malaysia': 'MY',
    'Indonesia': 'ID',
    'Thailand': 'TH',
    'Vietnam': 'VN',
    'Philippines': 'PH',
    'Myanmar': 'MM',
    'Cambodia': 'KH',
    'Laos': 'LA',
    'Brunei': 'BN',
    'Timor-Leste': 'TL',
    'Maldives': 'MV',
    'Sri Lanka': 'LK',
    'Bangladesh': 'BD',
    'Pakistan': 'PK',
    'Nepal': 'NP',
    'Bhutan': 'BT',
    'Mongolia': 'MN',
    'North Korea': 'KP',
    'South Korea': 'KR',
    'Taiwan': 'TW',
    'Hong Kong': 'HK',
    'Macau': 'MO',
    'Afghanistan': 'AF',
    'Iran': 'IR',
    'Iraq': 'IQ',
    'Syria': 'SY',
    'Lebanon': 'LB',
    'Jordan': 'JO',
    'Israel': 'IL',
    'Palestine': 'PS',
    'Saudi Arabia': 'SA',
    'Yemen': 'YE',
    'Oman': 'OM',
    'UAE': 'AE',
    'Qatar': 'QA',
    'Bahrain': 'BH',
    'Kuwait': 'KW',
    'Egypt': 'EG',
    'Libya': 'LY',
    'Tunisia': 'TN',
    'Algeria': 'DZ',
    'Morocco': 'MA',
    'Mauritania': 'MR',
    'Senegal': 'SN',
    'Gambia': 'GM',
    'Mali': 'ML',
    'Burkina Faso': 'BF',
    'Niger': 'NE',
    'Nigeria': 'NG',
    'Cameroon': 'CM',
    'Chad': 'TD',
    'Sudan': 'SD',
    'South Sudan': 'SS',
    'Eritrea': 'ER',
    'Djibouti': 'DJ',
    'Somalia': 'SO',
    'Ethiopia': 'ET',
    'Rwanda': 'RW',
    'Burundi': 'BI',
    'Tanzania': 'TZ',
    'Malawi': 'MW',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW',
    'Mozambique': 'MZ',
    'Angola': 'AO',
    'Namibia': 'NA',
    'Botswana': 'BW',
    'Lesotho': 'LS',
    'Eswatini': 'SZ',
    'Madagascar': 'MG',
    'Comoros': 'KM',
    'Seychelles': 'SC',
    'Mauritius': 'MU',
    'France': 'FR',
    'Spain': 'ES',
    'Portugal': 'PT',
    'Italy': 'IT',
    'Greece': 'GR',
    'Turkey': 'TR',
    'Netherlands': 'NL',
    'Belgium': 'BE',
    'Luxembourg': 'LU',
    'Switzerland': 'CH',
    'Austria': 'AT',
    'Czech Republic': 'CZ',
    'Slovakia': 'SK',
    'Hungary': 'HU',
    'Slovenia': 'SI',
    'Croatia': 'HR',
    'Bosnia': 'BA',
    'Serbia': 'RS',
    'Montenegro': 'ME',
    'Kosovo': 'XK',
    'Albania': 'AL',
    'Macedonia': 'MK',
    'Romania': 'RO',
    'Bulgaria': 'BG',
    'Moldova': 'MD',
    'Ukraine': 'UA',
    'Belarus': 'BY',
    'Russia': 'RU',
    'Poland': 'PL',
    'Lithuania': 'LT',
    'Latvia': 'LV',
    'Estonia': 'EE',
    'Finland': 'FI',
    'Sweden': 'SE',
    'Norway': 'NO',
    'Denmark': 'DK',
    'Iceland': 'IS',
    'Ireland': 'IE',
    'Australia': 'AU',
    'New Zealand': 'NZ',
    'Papua New Guinea': 'PG',
    'Fiji': 'FJ',
    'Samoa': 'WS',
    'Tonga': 'TO',
    'Kiribati': 'KI',
    'Marshall Islands': 'MH',
    'Palau': 'PW',
    'Nauru': 'NR',
    'Tuvalu': 'TV',
    'Vanuatu': 'VU',
    'Solomon Islands': 'SB',
    'Canada': 'CA',
    'Mexico': 'MX',
    'Brazil': 'BR',
    'Argentina': 'AR',
    'Uruguay': 'UY',
    'Paraguay': 'PY',
    'Bolivia': 'BO',
    'Peru': 'PE',
    'Ecuador': 'EC',
    'Colombia': 'CO',
    'Venezuela': 'VE',
    'Guyana': 'GY',
    'Suriname': 'SR',
    'French Guiana': 'GF',
    'Chile': 'CL',
    'Costa Rica': 'CR',
    'Nicaragua': 'NI',
    'Honduras': 'HN',
    'El Salvador': 'SV',
    'Guatemala': 'GT',
    'Belize': 'BZ',
    'Cuba': 'CU',
    'Jamaica': 'JM',
    'Haiti': 'HT',
    'Dominican Republic': 'DO',
    'Puerto Rico': 'PR',
    'Trinidad and Tobago': 'TT',
    'Barbados': 'BB',
    'Bahamas': 'BS',
    'Antigua and Barbuda': 'AG',
    'Dominica': 'DM',
    'St Lucia': 'LC',
    'St Vincent': 'VC',
    'Grenada': 'GD',
    'St Kitts and Nevis': 'KN'
  };
  
  if (codeMap[countryName]) {
    return codeMap[countryName];
  }
  
  for (const [key, value] of Object.entries(codeMap)) {
    if (countryName && countryName.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return null;
};

// Flag SVG component using country ISO codes (will work everywhere)
const CountryFlag = ({ countryName, className = "w-5 h-5" }) => {
  const countryCode = getCountryCode(countryName);
  
  if (!countryCode) {
    return <Globe className={`${className} text-gray-400`} />;
  }
  
  // Use flagcdn.com or similar service for reliable flag images
  const flagUrl = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  
  return (
    <img 
      src={flagUrl} 
      alt={`${countryName} flag`} 
      className={`${className} rounded-sm object-cover`}
      onError={(e) => {
        // Fallback to emoji if image fails to load
        e.target.style.display = 'none';
        e.target.parentElement.innerHTML += `<span class="text-lg">${getCountryFlag(countryName)}</span>`;
      }}
    />
  );
};


  const isDark = darkMode;

  // Predefined statuses
  const statusOptions = [
    'At Port',
    'In Transit',
    'Cleared',
    'Delivered',
    'Customs Hold',
    'Documentation Pending',
    'Awaiting Clearance',
    'On Hold',
    'Released',
    'Inspection Required',
    'Quarantined',
    'Transit Delay',
    'Port Congestion'
  ];

  // Vessel type options
  const vesselTypes = [
    { value: 'ship', icon: Ship, label: 'Ship' },
    { value: 'plane', icon: Plane, label: 'Aircraft' },
    { value: 'truck', icon: Truck, label: 'Truck' },
    { value: 'train', icon: Train, label: 'Train' }
  ];

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

  // Vessel data storage (mocked)
  const vesselDataStorage = {
    'FF-001': {
      name: 'MV Star Express',
      type: 'ship',
      image: 'https://images.unsplash.com/photo-1544550581-8dfd1c3c9d3d?w=300&h=200&fit=crop',
      voyage: '2026-08',
      route: 'Shanghai → Mombasa',
      scac: 'STAR',
      flag: 'Liberia',
      capacity: '8,500 TEU',
      description: 'Modern container vessel with advanced navigation systems'
    },
    'FF-002': {
      name: 'MV Indian Trader',
      type: 'ship',
      image: 'https://images.unsplash.com/photo-1544550581-8dfd1c3c9d3d?w=300&h=200&fit=crop',
      voyage: '2026-07',
      route: 'Mumbai → Mombasa',
      scac: 'INDI',
      flag: 'India',
      capacity: '4,200 TEU',
      description: 'Reliable container vessel serving East African routes'
    },
    'FF-003': {
      name: 'MV African Trader',
      type: 'ship',
      image: 'https://images.unsplash.com/photo-1544550581-8dfd1c3c9d3d?w=300&h=200&fit=crop',
      voyage: '2026-06',
      route: 'Durban → Mombasa',
      scac: 'AFTR',
      flag: 'South Africa',
      capacity: '3,800 TEU',
      description: 'Regional container vessel for African trade routes'
    },
    'FF-004': {
      name: 'MV Pacific Express',
      type: 'ship',
      image: 'https://images.unsplash.com/photo-1544550581-8dfd1c3c9d3d?w=300&h=200&fit=crop',
      voyage: '2026-08',
      route: 'Shanghai → Mombasa',
      scac: 'PACI',
      flag: 'Panama',
      capacity: '6,500 TEU',
      description: 'Long-haul container vessel for Pacific routes'
    },
    'FF-005': {
      name: 'MV Europe Trader',
      type: 'ship',
      image: 'https://images.unsplash.com/photo-1544550581-8dfd1c3c9d3d?w=300&h=200&fit=crop',
      voyage: '2026-07',
      route: 'Hamburg → Mombasa',
      scac: 'EURO',
      flag: 'Germany',
      capacity: '5,200 TEU',
      description: 'European container vessel with advanced tracking systems'
    }
  };

  // Alerts Data
  const alertsData = [
    {
      id: 'ALT-001',
      containerId: 'FF-001',
      severity: 'high',
      message: 'Export documentation incomplete - Certificate of Origin pending',
      date: '2026-08-10 14:30',
      status: 'active',
      category: 'Documentation'
    },
    {
      id: 'ALT-002',
      containerId: 'FF-002',
      severity: 'critical',
      message: 'Export license expired - Renewal required immediately',
      date: '2026-08-11 09:15',
      status: 'active',
      category: 'Compliance'
    },
    {
      id: 'ALT-003',
      containerId: 'FF-005',
      severity: 'medium',
      message: 'Port congestion - Expected delay of 2-3 days',
      date: '2026-08-09 16:45',
      status: 'active',
      category: 'Logistics'
    },
    {
      id: 'ALT-004',
      containerId: 'FF-004',
      severity: 'low',
      message: 'Invoice discrepancy - Minor correction required',
      date: '2026-08-08 11:20',
      status: 'resolved',
      category: 'Documentation'
    },
    {
      id: 'ALT-005',
      containerId: 'FF-003',
      severity: 'info',
      message: 'Container shipped successfully - Update tracking',
      date: '2026-08-05 17:00',
      status: 'resolved',
      category: 'Shipping'
    },
    {
      id: 'ALT-006',
      containerId: 'FF-002',
      severity: 'high',
      message: 'Customs hold - Additional documentation requested',
      date: '2026-08-12 08:30',
      status: 'active',
      category: 'Customs'
    },
  ];

  // Enhanced Container Data for Freight Forwarder
  const [containersData, setContainersData] = useState([
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
  ]);

  // Get unique exporters for filter
  const getUniqueExporters = () => {
    const exporters = containersData.map(c => c.exporter);
    return ['all', ...new Set(exporters)];
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
      case 'Customs Hold': return colors.danger;
      case 'Documentation Pending': return colors.warning;
      case 'Awaiting Clearance': return colors.info;
      case 'On Hold': return colors.danger;
      case 'Released': return colors.success;
      case 'Inspection Required': return colors.warning;
      case 'Quarantined': return colors.danger;
      case 'Transit Delay': return colors.danger;
      case 'Port Congestion': return colors.warning;
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
    let filtered = [...containersData];

    // Status filter
    if (containerFilter !== 'all') {
      filtered = filtered.filter(c => c.status === containerFilter);
    }

    // Assignment status filter
    if (containerStatusFilter !== 'all') {
      filtered = filtered.filter(c => c.assignmentStatus === containerStatusFilter);
    }

    // Search filter
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
    atPort: containersData.filter(c => c.status === 'At Port' || c.status === 'Customs Hold' || c.status === 'Awaiting Clearance' || c.status === 'On Hold').length,
    inTransit: containersData.filter(c => c.status === 'In Transit' || c.status === 'Transit Delay').length,
    cleared: containersData.filter(c => c.status === 'Cleared' || c.status === 'Released').length,
    pending: containersData.filter(c => c.assignmentStatus === 'Pending').length,
    accepted: containersData.filter(c => c.assignmentStatus === 'Accepted').length,
    referred: containersData.filter(c => c.assignmentStatus === 'Refer').length
  };

  // Available transporters for assignment
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

  // Handle assignment actions
  const handleAssignmentAction = (container, action) => {
    setSelectedContainerForAction(container);
    setActionType(action);
    setActionReason('');
    setShowActionModal(true);
  };

  const confirmAssignmentAction = () => {
    console.log(`Action: ${actionType} on container ${selectedContainerForAction.id}`, actionReason);
    setShowActionModal(false);
    setSelectedContainerForAction(null);
    setActionReason('');
    const updatedContainers = containersData.map(c => {
      if (c.id === selectedContainerForAction.id) {
        let newStatus = c.assignmentStatus;
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
        return { ...c, assignmentStatus: newStatus };
      }
      return c;
    });
    setContainersData(updatedContainers);
  };

  // Handle send freight invoice
  const handleSendBill = (container) => {
    setSelectedContainerForAction(container);
    setBillAmount('');
    setBillDescription('');
    setShowBillModal(true);
  };

  const confirmSendBill = () => {
    console.log(`Sending freight invoice for ${selectedContainerForAction.id}: $${billAmount} - ${billDescription}`);
    setShowBillModal(false);
    setSelectedContainerForAction(null);
    setBillAmount('');
    setBillDescription('');
    const updatedContainers = containersData.map(c => {
      if (c.id === selectedContainerForAction.id) {
        return { ...c, paymentStatus: 'Pending' };
      }
      return c;
    });
    setContainersData(updatedContainers);
  };

  // Handle notify exporter
  const handleNotifyExporter = (container) => {
    setSelectedContainerForAction(container);
    setNotifyRecipient(container.exporter);
    setNotifyMessage('');
    setShowNotifyModal(true);
  };

  const confirmNotify = () => {
    console.log(`Notifying ${notifyRecipient}: ${notifyMessage}`);
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
    console.log('Updated booking data:', editBookingData);
    setShowEditModal(false);
    // Update the container data
    const updatedContainers = containersData.map(c => {
      if (c.id === editBookingData.id) {
        return {
          ...c,
          eta: editBookingData.eta,
          declaredCargoValue: editBookingData.declaredCargoValue,
          shippingDate: editBookingData.shippingDate,
          placeOfFinalDelivery: editBookingData.placeOfFinalDelivery,
          preCarriageBy: editBookingData.preCarriageBy,
          placeOfReceipt: editBookingData.placeOfReceipt,
          vesselName: editBookingData.vesselName,
          vesselSCAC: editBookingData.vesselSCAC,
          voyageNumber: editBookingData.voyageNumber,
          countryFlag: editBookingData.countryFlag,
          portOfLoading: editBookingData.portOfLoading,
          loadingPierTerminal: editBookingData.loadingPierTerminal,
          originalsToBeReleasedAt: editBookingData.originalsToBeReleasedAt,
          portOfDischarge: editBookingData.portOfDischarge,
          typeOfMovement: editBookingData.typeOfMovement,
          expectedArrivalDate: editBookingData.expectedArrivalDate,
          originalETA: editBookingData.originalETA
        };
      }
      return c;
    });
    setContainersData(updatedContainers);
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
    setContainerFilter('all');
    setContainerStatusFilter('all');
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

  // Handle card click for filtering
  const handleCardClick = (filterType, value) => {
    setCurrentPage(1);
    
    if (filterType === 'status') {
      if (containerFilter === value) {
        setContainerFilter('all');
      } else {
        setContainerFilter(value);
        setContainerStatusFilter('all');
      }
    } else if (filterType === 'assignment') {
      if (containerStatusFilter === value) {
        setContainerStatusFilter('all');
      } else {
        setContainerStatusFilter(value);
        setContainerFilter('all');
      }
    } else if (filterType === 'all') {
      setContainerFilter('all');
      setContainerStatusFilter('all');
    }
  };

  // Handle vessel modal
  const handleOpenVesselModal = (container) => {
    setSelectedVesselContainer(container);
    const existingVessel = vesselDataStorage[container.id];
    if (existingVessel) {
      setVesselData({
        name: existingVessel.name || '',
        type: existingVessel.type || 'ship',
        image: existingVessel.image || null,
        imagePreview: existingVessel.image || null,
        voyage: existingVessel.voyage || '',
        route: existingVessel.route || '',
        scac: existingVessel.scac || '',
        flag: existingVessel.flag || '',
        capacity: existingVessel.capacity || '',
        description: existingVessel.description || ''
      });
    } else {
      setVesselData({
        name: container.vesselName || '',
        type: 'ship',
        image: null,
        imagePreview: null,
        voyage: container.voyageNumber || '',
        route: `${container.portOfLoading || ''} → ${container.portOfDischarge || ''}`,
        scac: container.vesselSCAC || '',
        flag: container.countryFlag || '',
        capacity: '',
        description: ''
      });
    }
    setShowVesselModal(true);
  };

  const handleSaveVessel = () => {
    console.log('Saving vessel data:', vesselData);
    vesselDataStorage[selectedVesselContainer.id] = {
      name: vesselData.name,
      type: vesselData.type,
      image: vesselData.imagePreview || vesselData.image,
      voyage: vesselData.voyage,
      route: vesselData.route,
      scac: vesselData.scac,
      flag: vesselData.flag,
      capacity: vesselData.capacity,
      description: vesselData.description
    };
    setShowVesselModal(false);
    alert('Vessel information saved successfully!');
  };

  const handleVesselImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVesselData({
          ...vesselData,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle status modal
  const handleOpenStatusModal = (container) => {
    setSelectedStatusContainer(container);
    setSelectedStatus(container.status || '');
    setCustomStatus('');
    setShowCustomStatusInput(false);
    setShowStatusModal(true);
  };

  const handleSaveStatus = () => {
    const newStatus = showCustomStatusInput ? customStatus : selectedStatus;
    if (!newStatus) {
      alert('Please select or enter a status');
      return;
    }
    
    const updatedContainers = containersData.map(c => {
      if (c.id === selectedStatusContainer.id) {
        return { ...c, status: newStatus };
      }
      return c;
    });
    setContainersData(updatedContainers);
    setShowStatusModal(false);
    alert(`Status updated to: ${newStatus}`);
  };

  // Handle new booking
  const handleNewBooking = (type) => {
    setNewBookingType(type);
    setNewBookingData({
      exporter: '',
      consignee: '',
      cargoDescription: '',
      packages: '',
      weight: '',
      volume: '',
      containerType: '20ft ST',
      origin: '',
      destination: '',
      vesselName: '',
      voyageNumber: '',
      eta: '',
      status: 'At Port'
    });
    setShowNewBookingModal(true);
  };

  const handleSaveNewBooking = () => {
    // Validate required fields
    if (!newBookingData.exporter || !newBookingData.cargoDescription || !newBookingData.origin || !newBookingData.destination) {
      alert('Please fill in all required fields');
      return;
    }

    const newId = `FF-${String(containersData.length + 1).padStart(3, '0')}`;
    const newContainer = {
      id: newId,
      sealNo: `SEAL-${Math.floor(Math.random() * 100000)}`,
      serviceName: newBookingData.vesselName || 'Not Assigned',
      size: newBookingData.containerType,
      packages: parseInt(newBookingData.packages) || 0,
      grossWeight: newBookingData.weight || '0 kg',
      volume: newBookingData.volume || '0 m³',
      measurement: 'N/A',
      cargoDescription: newBookingData.cargoDescription,
      exporter: newBookingData.exporter,
      consignee: {
        name: newBookingData.consignee || newBookingData.exporter,
        contact: 'N/A',
        email: 'N/A',
        address: 'N/A'
      },
      status: newBookingData.status || 'At Port',
      location: newBookingData.origin || 'N/A',
      voyage: newBookingData.vesselName || 'Not Assigned',
      eta: newBookingData.eta || 'TBD',
      daysAtSea: 0,
      assignedAgent: null,
      assignedTransporter: null,
      agentProgress: 0,
      agentStatus: 'Not Started',
      assignmentDate: new Date().toISOString().split('T')[0],
      assignmentStatus: 'Pending',
      clearanceStatus: 'Not Started',
      daysInPort: 0,
      transitStatus: 'At Port',
      expectedArrivalDate: newBookingData.eta || 'TBD',
      shipDetails: newBookingData.vesselName ? `${newBookingData.vesselName} | Voyage: ${newBookingData.voyageNumber || 'N/A'}` : 'Not Assigned',
      transporterReady: false,
      paymentStatus: 'Pending',
      transporterProgress: 0,
      transporterStatus: 'Not Assigned',
      transporterLocation: null,
      transporterETA: null,
      declaredCargoValue: 'TBD',
      shippingDate: new Date().toISOString().split('T')[0],
      placeOfFinalDelivery: newBookingData.destination,
      preCarriageBy: 'Truck',
      placeOfReceipt: newBookingData.origin,
      vesselName: newBookingData.vesselName || 'N/A',
      vesselSCAC: 'N/A',
      voyageNumber: newBookingData.voyageNumber || 'N/A',
      countryFlag: 'N/A',
      portOfLoading: newBookingData.origin,
      loadingPierTerminal: 'N/A',
      originalsToBeReleasedAt: 'N/A',
      portOfDischarge: newBookingData.destination,
      typeOfMovement: 'Door to Door',
      packingLists: [],
      milestones: [
        { stage: 'Booking Created', date: new Date().toISOString().split('T')[0], completed: true },
        { stage: 'Awaiting Assignment', date: new Date().toISOString().split('T')[0], completed: false },
        { stage: 'In Transit', date: 'TBD', completed: false },
        { stage: 'Arrived at Destination', date: 'TBD', completed: false },
        { stage: 'Delivery', date: 'TBD', completed: false }
      ],
      trackingHistory: [
        { date: new Date().toISOString().split('T')[0] + ' 00:00', location: newBookingData.origin || 'N/A', status: 'Booking Created' }
      ],
      expectedDeparture: new Date().toISOString().split('T')[0],
      expectedArrival: newBookingData.eta || 'TBD',
      delayed: false,
      delayReason: null,
      actionRequired: 'Awaiting Assignment',
      daysInTransit: 0,
      originalETA: newBookingData.eta || 'TBD',
      originalShippingDate: new Date().toISOString().split('T')[0],
      originalPlaceOfDelivery: newBookingData.destination
    };

    setContainersData([...containersData, newContainer]);
    setShowNewBookingModal(false);
    alert(`New booking ${newId} created successfully!`);
  };

  // Render Vessel Modal
  const VesselModal = () => {
    if (!showVesselModal || !selectedVesselContainer) return null;

    const VesselTypeIcon = vesselTypes.find(v => v.value === vesselData.type)?.icon || Ship;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowVesselModal(false)}>
        <div
          className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <Ship className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vessel Details - {selectedVesselContainer.id}
              </h3>
            </div>
            <button
              onClick={() => setShowVesselModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[70vh]">
            <div className="space-y-4">
              {/* Vessel Image Upload */}
              <div className={`p-4 rounded-lg border-2 border-dashed text-center ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                {vesselData.imagePreview ? (
                  <div className="relative">
                    <img 
                      src={vesselData.imagePreview} 
                      alt="Vessel" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setVesselData({...vesselData, imagePreview: null, image: null})}
                      className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <Camera className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Click to upload vessel image
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleVesselImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Vessel Name *
                  </label>
                  <input
                    type="text"
                    value={vesselData.name}
                    onChange={(e) => setVesselData({...vesselData, name: e.target.value})}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="e.g., MV Star Express"
                  />
                </div>

                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Vessel Type *
                  </label>
                  <select
                    value={vesselData.type}
                    onChange={(e) => setVesselData({...vesselData, type: e.target.value})}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    {vesselTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Voyage Number
                  </label>
                  <input
                    type="text"
                    value={vesselData.voyage}
                    onChange={(e) => setVesselData({...vesselData, voyage: e.target.value})}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="e.g., 2026-08"
                  />
                </div>

                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Route
                  </label>
                  <input
                    type="text"
                    value={vesselData.route}
                    onChange={(e) => setVesselData({...vesselData, route: e.target.value})}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="e.g., Shanghai → Mombasa"
                  />
                </div>

                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    SCAC Code
                  </label>
                  <input
                    type="text"
                    value={vesselData.scac}
                    onChange={(e) => setVesselData({...vesselData, scac: e.target.value})}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="e.g., STAR"
                  />
                </div>

                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Flag
                  </label>
                  <input
                    type="text"
                    value={vesselData.flag}
                    onChange={(e) => setVesselData({...vesselData, flag: e.target.value})}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="e.g., Liberia"
                  />
                </div>

                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Capacity
                  </label>
                  <input
                    type="text"
                    value={vesselData.capacity}
                    onChange={(e) => setVesselData({...vesselData, capacity: e.target.value})}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="e.g., 8,500 TEU"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={vesselData.description}
                    onChange={(e) => setVesselData({...vesselData, description: e.target.value})}
                    className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    rows="3"
                    style={{ focusRingColor: colors.primary }}
                    placeholder="Enter vessel description..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <button
              onClick={() => setShowVesselModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveVessel}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Save className="w-4 h-4" />
              Save Vessel Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Status Modal
  const StatusModal = () => {
    if (!showStatusModal || !selectedStatusContainer) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowStatusModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.info + '10' }}>
            <div className="flex items-center gap-3">
              <Flag className="w-5 h-5" style={{ color: colors.info }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Update Status - {selectedStatusContainer.id}
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
              Current Status: <span className="font-medium">{selectedStatusContainer.status}</span>
            </p>
            
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setShowCustomStatusInput(false);
                }}
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              >
                <option value="">Select a status...</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
                <option value="custom">+ Add Custom Status</option>
              </select>
            </div>

            {showCustomStatusInput && (
              <div className="mb-4">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Custom Status
                </label>
                <input
                  type="text"
                  value={customStatus}
                  onChange={(e) => setCustomStatus(e.target.value)}
                  placeholder="Enter custom status..."
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            )}

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
                onClick={handleSaveStatus}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: colors.info }}
              >
                <Save className="w-4 h-4" />
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render New Booking Modal
  const NewBookingModal = () => {
    if (!showNewBookingModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowNewBookingModal(false)}>
        <div
          className="w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between"
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              {newBookingType === 'new' ? (
                <Plus className="w-5 h-5" style={{ color: colors.primary }} />
              ) : (
                <RefreshCw className="w-5 h-5" style={{ color: colors.primary }} />
              )}
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {newBookingType === 'new' ? 'New Booking' : 'Process Booking'}
              </h3>
            </div>
            <button
              onClick={() => setShowNewBookingModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Exporter / Client *
                </label>
                <input
                  type="text"
                  value={newBookingData.exporter}
                  onChange={(e) => setNewBookingData({...newBookingData, exporter: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="Enter exporter name"
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Consignee
                </label>
                <input
                  type="text"
                  value={newBookingData.consignee}
                  onChange={(e) => setNewBookingData({...newBookingData, consignee: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="Enter consignee name"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cargo Description *
                </label>
                <textarea
                  value={newBookingData.cargoDescription}
                  onChange={(e) => setNewBookingData({...newBookingData, cargoDescription: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  rows="2"
                  style={{ focusRingColor: colors.primary }}
                  placeholder="Describe the cargo..."
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Number of Packages
                </label>
                <input
                  type="number"
                  value={newBookingData.packages}
                  onChange={(e) => setNewBookingData({...newBookingData, packages: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Container Type
                </label>
                <select
                  value={newBookingData.containerType}
                  onChange={(e) => setNewBookingData({...newBookingData, containerType: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  <option value="20ft ST">20ft ST</option>
                  <option value="40ft HC">40ft HC</option>
                  <option value="40ft ST">40ft ST</option>
                  <option value="20ft HC">20ft HC</option>
                  <option value="45ft HC">45ft HC</option>
                </select>
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Weight
                </label>
                <input
                  type="text"
                  value={newBookingData.weight}
                  onChange={(e) => setNewBookingData({...newBookingData, weight: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., 5,000 kg"
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Volume
                </label>
                <input
                  type="text"
                  value={newBookingData.volume}
                  onChange={(e) => setNewBookingData({...newBookingData, volume: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., 33.2 m³"
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Origin *
                </label>
                <input
                  type="text"
                  value={newBookingData.origin}
                  onChange={(e) => setNewBookingData({...newBookingData, origin: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., Shanghai, China"
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Destination *
                </label>
                <input
                  type="text"
                  value={newBookingData.destination}
                  onChange={(e) => setNewBookingData({...newBookingData, destination: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., Mombasa, Kenya"
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Vessel Name
                </label>
                <input
                  type="text"
                  value={newBookingData.vesselName}
                  onChange={(e) => setNewBookingData({...newBookingData, vesselName: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., MV Star Express"
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Voyage Number
                </label>
                <input
                  type="text"
                  value={newBookingData.voyageNumber}
                  onChange={(e) => setNewBookingData({...newBookingData, voyageNumber: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., 2026-08"
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  ETA
                </label>
                <input
                  type="date"
                  value={newBookingData.eta}
                  onChange={(e) => setNewBookingData({...newBookingData, eta: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Initial Status
                </label>
                <select
                  value={newBookingData.status}
                  onChange={(e) => setNewBookingData({...newBookingData, status: e.target.value})}
                  className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <button
              onClick={() => setShowNewBookingModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNewBooking}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Save className="w-4 h-4" />
              {newBookingType === 'new' ? 'Create Booking' : 'Process Booking'}
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
                Send Freight Invoice to Exporter
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
              Exporter: <span className="font-medium">{selectedContainerForAction.exporter}</span>
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
              {/* Shipping Details */}
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

              {/* Vessel & Route Details */}
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

              {/* Port Details */}
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Port Details</h4>
                <div className="space-y-2">
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Country Flag</label>
                    <input
                      type="text"
                      value={editBookingData.countryFlag || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, countryFlag: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</label>
                    <input
                      type="text"
                      value={editBookingData.portOfLoading || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, portOfLoading: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading Pier/Terminal</label>
                    <input
                      type="text"
                      value={editBookingData.loadingPierTerminal || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, loadingPierTerminal: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Originals to be Released At</label>
                    <input
                      type="text"
                      value={editBookingData.originalsToBeReleasedAt || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, originalsToBeReleasedAt: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                </div>
              </div>

              {/* Discharge & Movement Details */}
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Discharge & Movement</h4>
                <div className="space-y-2">
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</label>
                    <input
                      type="text"
                      value={editBookingData.portOfDischarge || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, portOfDischarge: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Place of Delivery</label>
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
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type of Movement</label>
                    <input
                      type="text"
                      value={editBookingData.typeOfMovement || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, typeOfMovement: e.target.value})}
                      className={`w-full mt-1 px-2 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expected Arrival Date</label>
                    <input
                      type="date"
                      value={editBookingData.expectedArrivalDate || ''}
                      onChange={(e) => setEditBookingData({...editBookingData, expectedArrivalDate: e.target.value})}
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
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
                <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {pl.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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

  // Render expanded container details
  // Render expanded container details
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
  const vesselInfo = vesselDataStorage[container.id];

  return (
    <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <td colSpan="9" className="p-0">
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
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => handleOpenStatusModal(container)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 hover:opacity-80 flex items-center gap-1`}
                style={{
                  backgroundColor: getStatusColor(container.status) + '20',
                  color: getStatusColor(container.status)
                }}
              >
                <Flag className="w-3 h-3" />
                {container.status}
                <Edit className="w-3 h-3 ml-1" />
              </button>
              <button
                onClick={() => handleOpenVesselModal(container)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 hover:opacity-80 flex items-center gap-1`}
                style={{
                  backgroundColor: colors.primary + '20',
                  color: colors.primary
                }}
              >
                <Ship className="w-3 h-3" />
                Vessel
                <Edit className="w-3 h-3 ml-1" />
              </button>
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

          {/* Vessel Info Card - New Section */}
          {vesselInfo && (
            <div className={`mb-4 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {vesselInfo.type === 'ship' && <Ship className="w-5 h-5" style={{ color: colors.primary }} />}
                  {vesselInfo.type === 'plane' && <Plane className="w-5 h-5" style={{ color: colors.primary }} />}
                  {vesselInfo.type === 'truck' && <Truck className="w-5 h-5" style={{ color: colors.primary }} />}
                  {vesselInfo.type === 'train' && <Train className="w-5 h-5" style={{ color: colors.primary }} />}
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {vesselInfo.name || 'Vessel Information'}
                  </h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize`}
                    style={{
                      backgroundColor: colors.primary + '20',
                      color: colors.primary
                    }}>
                    {vesselInfo.type}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenVesselModal(container)}
                  className="px-2 py-1 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                {vesselInfo.image && (
                  <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={vesselInfo.image} alt="Vessel" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Voyage</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vesselInfo.voyage || 'N/A'}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Route</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vesselInfo.route || 'N/A'}</p>
                  </div>
                  <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Flag</p>
                  <div className="flex items-center gap-2">
                    <CountryFlag countryName={vesselInfo.flag} className="w-6 h-4" />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {vesselInfo.flag || 'N/A'}
                    </span>
                  </div>
                </div>
                  {vesselInfo.capacity && (
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vesselInfo.capacity}</p>
                    </div>
                  )}
                  {vesselInfo.description && (
                    <div className="col-span-2">
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vesselInfo.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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
                    <button
                      onClick={() => handleOpenStatusModal(container)}
                      className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 mt-1 transition-all duration-200 hover:opacity-80`}
                      style={{
                        backgroundColor: getStatusColor(container.status) + '20',
                        color: getStatusColor(container.status)
                      }}
                    >
                      {container.status === 'Cleared' && <CheckCircle className="w-3 h-3" />}
                      {container.status === 'At Port' && <Anchor className="w-3 h-3" />}
                      {container.status === 'In Transit' && <Ship className="w-3 h-3" />}
                      {container.status}
                      <Edit className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Assignment & Clearance Info */}
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

                {/* Exporter Info */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <User className="w-4 h-4" style={{ color: colors.primary }} />
                    Exporter Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Building className="w-4 h-4" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {container.exporter}
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
                      onClick={() => handleNotifyExporter(container)}
                      className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                      style={{ backgroundColor: colors.info }}
                    >
                      <Mail className="w-3 h-3" />
                      Notify Exporter
                    </button>
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
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.countryFlag || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.portOfLoading || 'N/A'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading Pier/Terminal</p>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.loadingPierTerminal || 'N/A'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Originals Released At</p>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.originalsToBeReleasedAt || 'N/A'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.portOfDischarge || 'N/A'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Place of Delivery</p>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.placeOfFinalDelivery || 'N/A'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type of Movement</p>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {container.typeOfMovement || 'N/A'}
                    </p>
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

          {/* HIDE DETAILS BUTTON - ADDED AT THE BOTTOM */}
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
          const vesselInfo = vesselDataStorage[container.id];
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
                  <button
                    onClick={() => handleOpenStatusModal(container)}
                    className={`text-xs px-2 py-1 rounded-full transition-all duration-200 hover:opacity-80`}
                    style={{
                      backgroundColor: getStatusColor(container.status) + '20',
                      color: getStatusColor(container.status)
                    }}
                  >
                    {container.status}
                  </button>
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
                  {vesselInfo && (
                    <div className="flex justify-between items-center">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Vessel:</span>
                      <button
                        onClick={() => handleOpenVesselModal(container)}
                        className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 transition-all duration-200 hover:opacity-80`}
                        style={{
                          backgroundColor: colors.primary + '20',
                          color: colors.primary
                        }}
                      >
                        {vesselInfo.type === 'ship' && <Ship className="w-3 h-3" />}
                        {vesselInfo.type === 'plane' && <Plane className="w-3 h-3" />}
                        {vesselInfo.type === 'truck' && <Truck className="w-3 h-3" />}
                        {vesselInfo.type === 'train' && <Train className="w-3 h-3" />}
                        {vesselInfo.name || 'Add Vessel'}
                      </button>
                    </div>
                  )}
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
                      {container.assignmentStatus === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleAssignmentAction(container, 'accept')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.success }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAssignmentAction(container, 'reject')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.danger }}
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleAssignmentAction(container, 'refer')}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.info }}
                          >
                            Refer
                          </button>
                        </>
                      )}
                      {container.assignmentStatus === 'Accepted' && (
                        <>
                          <button
                            onClick={() => handleEditBooking(container)}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.primary }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleSendBill(container)}
                            className="flex-1 min-w-[80px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.success }}
                          >
                            Invoice
                          </button>
                          <button
                            onClick={() => handleNotifyExporter(container)}
                            className="flex-1 min-w-[60px] px-2 py-1 rounded text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: colors.info }}
                          >
                            Notify
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
        {/* Header with New Booking Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, {user?.name || 'John'}! 👋
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Here's your freight forwarder dashboard with all bookings.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleNewBooking('new')}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              New Booking
            </button>
           <button
            onClick={() => navigate('/freight-forwarder/booking/process')}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-2"
            style={{ backgroundColor: colors.info }}
          >
            <RefreshCw className="w-4 h-4" />
            Process Booking
          </button>
          </div>
        </div>

        {/* Stats Cards - Clickable with ring indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-6">
          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'all' && containerStatusFilter === 'all' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: containerFilter === 'all' && containerStatusFilter === 'all' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('all', 'all')}
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
              {containerStats.total}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Bookings
            </p>
            {containerFilter === 'all' && containerStatusFilter === 'all' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerStatusFilter === 'Pending' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: containerStatusFilter === 'Pending' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('assignment', 'Pending')}
          >
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
            {containerStatusFilter === 'Pending' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerStatusFilter === 'Accepted' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: containerStatusFilter === 'Accepted' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('assignment', 'Accepted')}
          >
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
            {containerStatusFilter === 'Accepted' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerStatusFilter === 'Refer' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: containerStatusFilter === 'Refer' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('assignment', 'Refer')}
          >
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
            {containerStatusFilter === 'Refer' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'At Port' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: containerFilter === 'At Port' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('status', 'At Port')}
          >
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
            {containerFilter === 'At Port' && (
              <span className="text-[10px] mt-1 inline-block" style={{ color: colors.primary }}>
                ✓ Active
              </span>
            )}
          </div>

          <div 
            className={`p-4 rounded-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
            } ${containerFilter === 'Cleared' ? 'ring-1' : 'ring-1 ring-transparent'}`}
            style={{ ringColor: containerFilter === 'Cleared' ? colors.primary : 'transparent' }}
            onClick={() => handleCardClick('status', 'Cleared')}
          >
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
            {containerFilter === 'Cleared' && (
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
                    {(containerFilter !== 'all' || containerStatusFilter !== 'all') && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full cursor-pointer hover:opacity-80"
                        style={{ 
                          backgroundColor: colors.danger + '20',
                          color: colors.danger
                        }}
                        onClick={() => {
                          setContainerFilter('all');
                          setContainerStatusFilter('all');
                          setCurrentPage(1);
                        }}
                      >
                        ✕ Clear Filters
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
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
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
                            Consignment
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Exporter
                          </th>
                          <th className={`text-left py-2 px-2 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Date
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
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenStatusModal(container);
                                    }}
                                    className={`text-xs px-1.5 py-0.5 rounded-full transition-all duration-200 hover:opacity-80`}
                                    style={{
                                      backgroundColor: getStatusColor(container.status) + '20',
                                      color: getStatusColor(container.status)
                                    }}
                                  >
                                    {container.status}
                                  </button>
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
                                      title="View"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                      style={{ color: colors.primary }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenVesselModal(container);
                                      }}
                                      title="Vessel"
                                    >
                                      <Ship className="w-3.5 h-3.5" />
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
                                    <button
                                      className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                                      style={{ color: colors.primary }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleContainerExpand(container.id);
                                      }}
                                      title={expandedContainerId === container.id ? 'Collapse' : 'Expand'}
                                    >
                                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedContainerId === container.id ? 'rotate-180' : ''}`} />
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
      {showPrintModal && <PrintModal />}
      {showEditModal && <EditBookingModal />}
      {showNotifyModal && <NotifyModal />}
      {showVesselModal && <VesselModal />}
      {showStatusModal && <StatusModal />}
      {showNewBookingModal && <NewBookingModal />}
    </div>
  );
};

export default FreightForwarderDashboard;