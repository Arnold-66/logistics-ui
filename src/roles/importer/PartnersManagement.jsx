// roles/importer/PartnersManagement.jsx
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
  FileCheck as FileCheckIcon2,
  Plus,
  Building2,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon2,
  Link as LinkIcon,
  Send as SendIcon,
  UserPlus as UserPlusIcon,
  Star as StarIcon,
  StarOff as StarOffIcon,
  MoreHorizontal as MoreHorizontalIcon
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const PartnersManagement = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('suppliers');
  const [expandedPartnerId, setExpandedPartnerId] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');

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

  // Suppliers Data
  const suppliersData = [
    {
      id: 'SUP-001',
      companyName: 'TechSource China Ltd',
      businessAddress: '123 Tech Park, Shanghai, China',
      contactPerson: 'Mr. Zhang Wei',
      email: 'info@techsource.cn',
      phone: '+86 21 1234 5678',
      website: 'www.techsource.cn',
      category: 'Electronics',
      status: 'Active',
      joinedDate: '2025-06-15',
      itemsSupplied: ['MSKU-458921', 'PK-893421'],
      rating: 4.5,
      totalOrders: 12,
      totalValue: '$1,245,000',
      notes: 'Premium electronics supplier'
    },
    {
      id: 'SUP-002',
      companyName: 'Global Textiles India Pvt Ltd',
      businessAddress: '456 Fabric Lane, Mumbai, India',
      contactPerson: 'Ms. Priya Sharma',
      email: 'info@globaltextiles.in',
      phone: '+91 22 1234 5678',
      website: 'www.globaltextiles.in',
      category: 'Textiles',
      status: 'Active',
      joinedDate: '2025-07-01',
      itemsSupplied: ['IN-782341'],
      rating: 4.2,
      totalOrders: 8,
      totalValue: '$890,000',
      notes: 'Quality textile supplier'
    },
    {
      id: 'SUP-003',
      companyName: 'African Machinery Solutions',
      businessAddress: '789 Industrial Park, Johannesburg, South Africa',
      contactPerson: 'Mr. Thabo Mbeki',
      email: 'info@africanmachinery.co.za',
      phone: '+27 11 234 5678',
      website: 'www.africanmachinery.co.za',
      category: 'Machinery',
      status: 'Active',
      joinedDate: '2025-05-20',
      itemsSupplied: ['SA-456732'],
      rating: 4.8,
      totalOrders: 6,
      totalValue: '$2,100,000',
      notes: 'Heavy machinery specialist'
    },
    {
      id: 'SUP-004',
      companyName: 'Pacific Packaging Co.',
      businessAddress: '101 Packaging Way, Sydney, Australia',
      contactPerson: 'Ms. Emily Chen',
      email: 'info@pacificpackaging.com.au',
      phone: '+61 2 1234 5678',
      website: 'www.pacificpackaging.com.au',
      category: 'Packaging',
      status: 'Pending',
      joinedDate: '2025-08-10',
      itemsSupplied: [],
      rating: 0,
      totalOrders: 0,
      totalValue: '$0',
      notes: 'New packaging supplier'
    },
    {
      id: 'SUP-005',
      companyName: 'AutoParts Europe GmbH',
      businessAddress: '789 Auto Strasse, Berlin, Germany',
      contactPerson: 'Mr. Hans Mueller',
      email: 'info@autoparts.de',
      phone: '+49 30 1234 5678',
      website: 'www.autoparts.de',
      category: 'Automotive',
      status: 'Active',
      joinedDate: '2025-04-10',
      itemsSupplied: ['DE-782341'],
      rating: 4.6,
      totalOrders: 10,
      totalValue: '$1,560,000',
      notes: 'Premium automotive parts'
    }
  ];

  // Clearing Agents Data
  const clearingAgentsData = [
    {
      id: 'AGT-001',
      companyName: 'Swift Clearance Services',
      businessAddress: '45 Customs Road, Mombasa, Kenya',
      contactPerson: 'Mr. James Ochieng',
      email: 'info@swiftclearance.com',
      phone: '+254 711 123456',
      website: 'www.swiftclearance.com',
      licenseNo: 'CL-2025-001',
      status: 'Active',
      joinedDate: '2025-06-20',
      assignedContainers: ['IN-782341'],
      rating: 4.3,
      totalClearances: 45,
      successRate: '98%',
      notes: 'Experienced clearing agent'
    },
    {
      id: 'AGT-002',
      companyName: 'Mombasa Port Logistics',
      businessAddress: '12 Port Avenue, Mombasa, Kenya',
      contactPerson: 'Ms. Fatima Hassan',
      email: 'info@mombasaportlogistics.com',
      phone: '+254 722 987654',
      website: 'www.mombasaportlogistics.com',
      licenseNo: 'CL-2025-002',
      status: 'Active',
      joinedDate: '2025-07-01',
      assignedContainers: ['SA-456732'],
      rating: 4.7,
      totalClearances: 38,
      successRate: '99%',
      notes: 'Port logistics specialist'
    },
    {
      id: 'AGT-003',
      companyName: 'East Africa Customs Solutions',
      businessAddress: '789 Customs Lane, Nairobi, Kenya',
      contactPerson: 'Mr. David Mwangi',
      email: 'info@eastafricacustoms.com',
      phone: '+254 733 112233',
      website: 'www.eastafricacustoms.com',
      licenseNo: 'CL-2025-003',
      status: 'Active',
      joinedDate: '2025-05-15',
      assignedContainers: ['DE-782341'],
      rating: 4.1,
      totalClearances: 52,
      successRate: '96%',
      notes: 'Regional customs expert'
    },
    {
      id: 'AGT-004',
      companyName: 'KPA Licensed Clearing Agents',
      businessAddress: '56 Port Street, Mombasa, Kenya',
      contactPerson: 'Mr. Samuel Kiprop',
      email: 'agents@kpa.go.ke',
      phone: '+254 744 556677',
      website: 'www.kpa.go.ke',
      licenseNo: 'CL-2025-004',
      status: 'Pending',
      joinedDate: '2025-08-01',
      assignedContainers: [],
      rating: 0,
      totalClearances: 0,
      successRate: '0%',
      notes: 'New clearing agent application'
    }
  ];

  // Inland Transporters Data
  const transportersData = [
    {
      id: 'TRP-001',
      companyName: 'East African Logistics',
      businessAddress: '78 Transport Hub, Nairobi, Kenya',
      contactPerson: 'Mr. Peter Omondi',
      email: 'dispatch@eastafricalogistics.com',
      phone: '+256 712 345678',
      website: 'www.eastafricalogistics.com',
      fleetSize: 12,
      vehicleTypes: ['Flatbed', 'Container Carrier', 'Refrigerated'],
      status: 'Active',
      joinedDate: '2025-06-10',
      assignedContainers: ['IN-782341'],
      rating: 4.4,
      totalDeliveries: 230,
      onTimeRate: '97%',
      notes: 'Reliable logistics partner'
    },
    {
      id: 'TRP-002',
      companyName: 'Trans-East Cargo Services',
      businessAddress: '34 Cargo Way, Kampala, Uganda',
      contactPerson: 'Ms. Sarah Akinyi',
      email: 'dispatch@trans-eastcargo.com',
      phone: '+256 703 456789',
      website: 'www.trans-eastcargo.com',
      fleetSize: 8,
      vehicleTypes: ['Container Carrier', 'Flatbed'],
      status: 'Active',
      joinedDate: '2025-05-25',
      assignedContainers: ['SA-456732'],
      rating: 4.6,
      totalDeliveries: 180,
      onTimeRate: '98%',
      notes: 'East African cargo specialist'
    },
    {
      id: 'TRP-003',
      companyName: 'Kampala Freight Forwarders',
      businessAddress: '56 Industrial Road, Kampala, Uganda',
      contactPerson: 'Mr. John Mugisha',
      email: 'info@kampalafreight.com',
      phone: '+256 701 234567',
      website: 'www.kampalafreight.com',
      fleetSize: 15,
      vehicleTypes: ['Container Carrier', 'Flatbed', 'Tanker'],
      status: 'Active',
      joinedDate: '2025-07-05',
      assignedContainers: ['DE-782341'],
      rating: 4.2,
      totalDeliveries: 310,
      onTimeRate: '95%',
      notes: 'Uganda\'s leading freight forwarder'
    },
    {
      id: 'TRP-004',
      companyName: 'Mombasa-Nairobi Haulage',
      businessAddress: '23 Highway Road, Mombasa, Kenya',
      contactPerson: 'Ms. Grace Wanjiru',
      email: 'dispatch@mombasanairobi.com',
      phone: '+254 700 123456',
      website: 'www.mombasanairobi.com',
      fleetSize: 20,
      vehicleTypes: ['Container Carrier', 'Flatbed', 'Lowbed'],
      status: 'Pending',
      joinedDate: '2025-08-15',
      assignedContainers: [],
      rating: 0,
      totalDeliveries: 0,
      onTimeRate: '0%',
      notes: 'New haulage company'
    }
  ];

  // Unassigned containers/packages for assignment
  const unassignedPackages = [
    { id: 'PKG-001', name: 'Circuit Boards Package', container: 'MSKU-458921', status: 'Unassigned' },
    { id: 'PKG-002', name: 'Power Supplies Package', container: 'MSKU-458921', status: 'Unassigned' },
    { id: 'PKG-003', name: 'Accessories Package', container: 'MSKU-458921', status: 'Unassigned' },
    { id: 'PKG-004', name: 'Mechanical Parts', container: 'MSKU-458921', status: 'Unassigned' },
    { id: 'PKG-010', name: 'Cardboard Boxes Package', container: 'PK-893421', status: 'Unassigned' },
    { id: 'PKG-011', name: 'Plastic Materials Package', container: 'PK-893421', status: 'Unassigned' },
  ];

  // Get filtered data based on active tab and search
  const getFilteredData = () => {
    let data = [];
    let searchFields = [];
    
    if (activeTab === 'suppliers') {
      data = suppliersData;
      searchFields = ['companyName', 'contactPerson', 'email', 'category', 'businessAddress'];
    } else if (activeTab === 'clearingAgents') {
      data = clearingAgentsData;
      searchFields = ['companyName', 'contactPerson', 'email', 'licenseNo', 'businessAddress'];
    } else if (activeTab === 'transporters') {
      data = transportersData;
      searchFields = ['companyName', 'contactPerson', 'email', 'vehicleTypes', 'businessAddress'];
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(item => 
        searchFields.some(field => {
          const value = item[field];
          if (Array.isArray(value)) {
            return value.some(v => v.toLowerCase().includes(query));
          }
          return String(value).toLowerCase().includes(query);
        })
      );
    }

    return data;
  };

  const filteredData = getFilteredData();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get tabs configuration
  const tabs = [
    { id: 'suppliers', label: 'Suppliers', icon: Building2, count: suppliersData.length },
    { id: 'clearingAgents', label: 'Clearing Agents', icon: Shield, count: clearingAgentsData.length },
    { id: 'transporters', label: 'Inland Transporters', icon: Truck, count: transportersData.length }
  ];

  // Handle toggle expand
  const toggleExpand = (partnerId) => {
    setExpandedPartnerId(expandedPartnerId === partnerId ? null : partnerId);
  };

  // Handle assign packages
  const handleAssignPackages = (partner) => {
    setSelectedPartner(partner);
    setSelectedPackages([]);
    setShowAssignModal(true);
  };

  // Confirm assignment
  const confirmAssignment = () => {
    console.log(`Assigning packages ${selectedPackages} to ${selectedPartner.companyName}`);
    setShowAssignModal(false);
    setSelectedPackages([]);
    alert(`Packages assigned to ${selectedPartner.companyName}`);
  };

  // Handle add partner
  const handleAddPartner = () => {
    setShowAddPartnerModal(true);
  };

  // Handle invite partner
  const handleInvitePartner = (partner) => {
    setSelectedPartner(partner);
    setInviteEmail(partner.email);
    setInviteMessage(`Dear ${partner.contactPerson},\n\nWe would like to invite you to join our logistics network. Please click the link below to get started.\n\nBest regards,\n${user?.name || 'ImportFlow Ltd'}`);
    setShowInviteModal(true);
  };

  // Confirm invite
  const confirmInvite = () => {
    console.log(`Inviting ${inviteEmail}: ${inviteMessage}`);
    setShowInviteModal(false);
    alert(`Invitation sent to ${inviteEmail}`);
  };

  // Render expanded details
  const renderExpandedDetails = (item) => {
    if (expandedPartnerId !== item.id) return null;

    const renderDetailRows = () => {
      const details = [];
      if (activeTab === 'suppliers') {
        details.push(
          { label: 'Business Address', value: item.businessAddress },
          { label: 'Email', value: item.email },
          { label: 'Phone', value: item.phone },
          { label: 'Website', value: item.website || 'N/A' },
          { label: 'Category', value: item.category },
          { label: 'Status', value: item.status },
          { label: 'Joined Date', value: item.joinedDate },
          { label: 'Rating', value: `${item.rating} / 5` },
          { label: 'Total Orders', value: item.totalOrders },
          { label: 'Total Value', value: item.totalValue },
          { label: 'Items Supplied', value: item.itemsSupplied.join(', ') || 'None' },
          { label: 'Notes', value: item.notes || 'N/A' }
        );
      } else if (activeTab === 'clearingAgents') {
        details.push(
          { label: 'Business Address', value: item.businessAddress },
          { label: 'Email', value: item.email },
          { label: 'Phone', value: item.phone },
          { label: 'Website', value: item.website || 'N/A' },
          { label: 'License No.', value: item.licenseNo },
          { label: 'Status', value: item.status },
          { label: 'Joined Date', value: item.joinedDate },
          { label: 'Rating', value: `${item.rating} / 5` },
          { label: 'Total Clearances', value: item.totalClearances },
          { label: 'Success Rate', value: item.successRate },
          { label: 'Assigned Containers', value: item.assignedContainers.join(', ') || 'None' },
          { label: 'Notes', value: item.notes || 'N/A' }
        );
      } else if (activeTab === 'transporters') {
        details.push(
          { label: 'Business Address', value: item.businessAddress },
          { label: 'Email', value: item.email },
          { label: 'Phone', value: item.phone },
          { label: 'Website', value: item.website || 'N/A' },
          { label: 'Fleet Size', value: item.fleetSize },
          { label: 'Vehicle Types', value: item.vehicleTypes.join(', ') },
          { label: 'Status', value: item.status },
          { label: 'Joined Date', value: item.joinedDate },
          { label: 'Rating', value: `${item.rating} / 5` },
          { label: 'Total Deliveries', value: item.totalDeliveries },
          { label: 'On-Time Rate', value: item.onTimeRate },
          { label: 'Assigned Containers', value: item.assignedContainers.join(', ') || 'None' },
          { label: 'Notes', value: item.notes || 'N/A' }
        );
      }
      return details;
    };

    return (
      <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <td colSpan="6" className="p-0">
          <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/80' : 'bg-gray-50'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {renderDetailRows().map((detail, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{detail.label}</p>
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-2" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <button
                onClick={() => handleAssignPackages(item)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                style={{ backgroundColor: colors.primary }}
              >
                <Package className="w-3 h-3" />
                Assign Packages
              </button>
              <button
                onClick={() => handleInvitePartner(item)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                style={{ backgroundColor: colors.info }}
              >
                <Send className="w-3 h-3" />
                Send Invite
              </button>
              <button
                onClick={() => toggleExpand(item.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:opacity-90 flex items-center gap-1"
                style={{ 
                  backgroundColor: isDark ? '#374151' : '#e5e7eb',
                  color: isDark ? '#9ca3af' : '#6b7280'
                }}
              >
                <ChevronDown className="w-3 h-3" />
                Hide Details
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Render tab content
  const renderTabContent = () => {
    const columns = activeTab === 'suppliers' 
      ? ['Company Name', 'Contact Person', 'Category', 'Email', 'Status', 'Actions']
      : activeTab === 'clearingAgents'
      ? ['Company Name', 'Contact Person', 'License No.', 'Email', 'Status', 'Actions']
      : ['Company Name', 'Contact Person', 'Fleet Size', 'Email', 'Status', 'Actions'];

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              {columns.map((col, idx) => (
                <th key={idx} className={`text-left py-3 px-3 font-medium text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => {
                const statusColor = item.status === 'Active' ? colors.success : colors.warning;
                const isExpanded = expandedPartnerId === item.id;
                return (
                  <React.Fragment key={item.id}>
                    <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}
                      onClick={() => toggleExpand(item.id)}>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          {activeTab === 'suppliers' && <Building2 className="w-4 h-4" style={{ color: colors.primary }} />}
                          {activeTab === 'clearingAgents' && <Shield className="w-4 h-4" style={{ color: colors.primary }} />}
                          {activeTab === 'transporters' && <Truck className="w-4 h-4" style={{ color: colors.primary }} />}
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.companyName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {item.contactPerson}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {activeTab === 'suppliers' ? item.category : 
                           activeTab === 'clearingAgents' ? item.licenseNo : 
                           `${item.fleetSize} vehicles`}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {item.email}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-xs px-2 py-1 rounded-full`}
                          style={{
                            backgroundColor: statusColor + '20',
                            color: statusColor
                          }}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <button
                            className={`p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 ${
                              isExpanded ? 'bg-gray-100 dark:bg-gray-600' : ''
                            }`}
                            style={{ color: colors.primary }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(item.id);
                            }}
                            title={isExpanded ? 'Hide Details' : 'View Details'}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 rotate-180" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                            style={{ color: colors.primary }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAssignPackages(item);
                            }}
                            title="Assign Packages"
                          >
                            <Package className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                            style={{ color: colors.info }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInvitePartner(item);
                            }}
                            title="Invite"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {renderExpandedDetails(item)}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center">
                  <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium">No {activeTab} found</p>
                    <p className="text-xs">Try adjusting your search or add a new one</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-1.5 rounded-lg transition-colors ${
                  currentPage === 1
                    ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
                    : isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
        )}
      </div>
    );
  };

  // Render Assign Modal
  const AssignModal = () => {
    if (!showAssignModal || !selectedPartner) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowAssignModal(false)}>
        <div
          className="w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5" style={{ color: colors.primary }} />
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Assign Packages to {selectedPartner.companyName}
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Select packages to assign
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAssignModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[60vh]">
            <div className="space-y-2">
              {unassignedPackages.map((pkg) => (
                <label key={pkg.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <input
                    type="checkbox"
                    checked={selectedPackages.includes(pkg.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPackages([...selectedPackages, pkg.id]);
                      } else {
                        setSelectedPackages(selectedPackages.filter(id => id !== pkg.id));
                      }
                    }}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.name}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Container: {pkg.container} • Status: {pkg.status}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex gap-2`}>
            <button
              onClick={() => setShowAssignModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmAssignment}
              disabled={selectedPackages.length === 0}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
                selectedPackages.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
              style={{ backgroundColor: colors.primary }}
            >
              Assign {selectedPackages.length} Package{selectedPackages.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Add Partner Modal
  const AddPartnerModal = () => {
    if (!showAddPartnerModal) return null;

    const fields = activeTab === 'suppliers' 
      ? [
          { label: 'Company Name', type: 'text', placeholder: 'Enter company name' },
          { label: 'Business Address', type: 'text', placeholder: 'Enter business address' },
          { label: 'Contact Person', type: 'text', placeholder: 'Enter contact person name' },
          { label: 'Email', type: 'email', placeholder: 'Enter email address' },
          { label: 'Phone', type: 'text', placeholder: 'Enter phone number' },
          { label: 'Website', type: 'text', placeholder: 'Enter website URL' },
          { label: 'Category', type: 'text', placeholder: 'Enter category (e.g., Electronics)' },
          { label: 'Notes', type: 'textarea', placeholder: 'Enter any notes' }
        ]
      : activeTab === 'clearingAgents'
      ? [
          { label: 'Company Name', type: 'text', placeholder: 'Enter company name' },
          { label: 'Business Address', type: 'text', placeholder: 'Enter business address' },
          { label: 'Contact Person', type: 'text', placeholder: 'Enter contact person name' },
          { label: 'Email', type: 'email', placeholder: 'Enter email address' },
          { label: 'Phone', type: 'text', placeholder: 'Enter phone number' },
          { label: 'Website', type: 'text', placeholder: 'Enter website URL' },
          { label: 'License No.', type: 'text', placeholder: 'Enter license number' },
          { label: 'Notes', type: 'textarea', placeholder: 'Enter any notes' }
        ]
      : [
          { label: 'Company Name', type: 'text', placeholder: 'Enter company name' },
          { label: 'Business Address', type: 'text', placeholder: 'Enter business address' },
          { label: 'Contact Person', type: 'text', placeholder: 'Enter contact person name' },
          { label: 'Email', type: 'email', placeholder: 'Enter email address' },
          { label: 'Phone', type: 'text', placeholder: 'Enter phone number' },
          { label: 'Website', type: 'text', placeholder: 'Enter website URL' },
          { label: 'Fleet Size', type: 'number', placeholder: 'Enter fleet size' },
          { label: 'Vehicle Types', type: 'text', placeholder: 'e.g., Flatbed, Container Carrier' },
          { label: 'Notes', type: 'textarea', placeholder: 'Enter any notes' }
        ];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowAddPartnerModal(false)}>
        <div
          className="w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}
            style={{ backgroundColor: colors.primary + '10' }}>
            <div className="flex items-center gap-3">
              <UserPlus className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Add New {activeTab === 'suppliers' ? 'Supplier' : activeTab === 'clearingAgents' ? 'Clearing Agent' : 'Inland Transporter'}
              </h3>
            </div>
            <button
              onClick={() => setShowAddPartnerModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field, idx) => (
                <div key={idx} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      rows="3"
                      placeholder={field.placeholder}
                      style={{ focusRingColor: colors.primary }}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      placeholder={field.placeholder}
                      style={{ focusRingColor: colors.primary }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex gap-2`}>
            <button
              onClick={() => setShowAddPartnerModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowAddPartnerModal(false);
                alert(`${activeTab === 'suppliers' ? 'Supplier' : activeTab === 'clearingAgents' ? 'Clearing Agent' : 'Inland Transporter'} added successfully!`);
              }}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add {activeTab === 'suppliers' ? 'Supplier' : activeTab === 'clearingAgents' ? 'Clearing Agent' : 'Transporter'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Invite Modal
  const InviteModal = () => {
    if (!showInviteModal || !selectedPartner) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
           onClick={() => setShowInviteModal(false)}>
        <div
          className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}
            style={{ backgroundColor: colors.info + '10' }}>
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5" style={{ color: colors.info }} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Invite {selectedPartner.companyName}
              </h3>
            </div>
            <button
              onClick={() => setShowInviteModal(false)}
              className="p-1 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Send an invitation to {selectedPartner.companyName} to join your logistics network.
            </p>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="mb-4">
              <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Message
              </label>
              <textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                rows="5"
                className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInviteModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmInvite}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: colors.info }}
              >
                <Send className="w-4 h-4 inline mr-2" />
                Send Invitation
              </button>
            </div>
          </div>
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
            Partners Management
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your suppliers, clearing agents, and inland transporters
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                  setSearchQuery('');
                  setExpandedPartnerId(null);
                }}
                className={`px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : isDark
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                style={{
                  backgroundColor: isActive ? colors.primary : undefined,
                  boxShadow: isActive ? `0 4px 14px ${colors.primary}40` : undefined
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isDark
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
          <button
            onClick={handleAddPartner}
            className="px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 ml-auto"
            style={{ 
              backgroundColor: colors.success + '20',
              color: colors.success
            }}
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add New</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                style={{ color: colors.primary }}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          {renderTabContent()}
        </div>
      </div>

      {/* Modals */}
      <AssignModal />
      <AddPartnerModal />
      <InviteModal />
    </div>
  );
};

export default PartnersManagement;