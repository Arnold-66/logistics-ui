// roles/inlandtransporter/InlandTransporterDeliveries.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  Printer,
  Download,
  Map,
  Navigation,
  User,
  Phone,
  Mail,
  Building,
  Flag,
  Route,
  ArrowLeft,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Share2,
  ExternalLink,
  MessageSquare,
  DollarSign,
  Check,
  X,
  Info,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  List,
  Grid,
  Inbox,
  Bell,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Truck as TruckIcon,
  User as UserIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Globe,
  Star,
  StarOff
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const InlandTransporterDeliveries = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [expandedVehicleId, setExpandedVehicleId] = useState(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [toast, setToast] = useState(null);

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
    teal: '#14b8a6',
    indigo: '#6366f1',
    orange: '#f97316',
    purple: '#8b5cf6',
    pink: '#ec4899'
  };

  const isDark = darkMode;

  // Vehicle/Delivery Data
  const deliveriesData = [
    {
      id: 'DEL-001',
      vehicle: {
        id: 'TRK-001',
        plate: 'KCA 123A',
        capacity: '40ft HC',
        type: 'Heavy Truck',
        make: 'Scania',
        model: 'R500',
        year: 2023,
        color: 'White',
        vin: 'YS2R6X20005387741'
      },
      driver: {
        id: 'DRV-001',
        name: 'John Mwangi',
        license: 'DL-12345',
        experience: '5 years',
        phone: '+254 700 123 456',
        email: 'john.mwangi@transport.co.ke',
        photo: null,
        rating: 4.8,
        totalTrips: 156
      },
      order: {
        id: 'ORD-005',
        containerId: 'CLR-005',
        cargoDescription: 'Automotive Components and Accessories',
        pickupLocation: 'Mombasa Port - Terminal 3',
        destinationLocation: '789 Auto Strasse, Kampala, Uganda',
        pickupDate: '2026-09-15 10:00',
        deliveryDate: '2026-09-17 16:00',
        distance: '460 km',
        estimatedDuration: '2 days',
        status: 'Delivered',
        paymentStatus: 'Paid',
        amount: '$780.00'
      },
      currentLocation: {
        lat: 0.3136,
        lng: 32.5811,
        address: 'Kampala, Uganda'
      },
      status: 'Completed',
      progress: 100,
      startLocation: 'Mombasa Port - Terminal 3',
      endLocation: '789 Auto Strasse, Kampala, Uganda',
      startDate: '2026-09-15 10:00',
      endDate: '2026-09-17 16:00',
      lastUpdated: '2 hours ago',
      route: [
        { lat: -4.0435, lng: 39.6682, label: 'Mombasa Port', status: 'visited' },
        { lat: -1.2921, lng: 36.8219, label: 'Nairobi', status: 'visited' },
        { lat: 0.5143, lng: 35.2698, label: 'Eldoret', status: 'visited' },
        { lat: 0.3136, lng: 32.5811, label: 'Kampala', status: 'current' }
      ],
      milestones: [
        { stage: 'Pickup from Port', date: '15 Sep 2026, 10:00', completed: true },
        { stage: 'Departed Mombasa', date: '15 Sep 2026, 14:30', completed: true },
        { stage: 'Arrived Nairobi', date: '16 Sep 2026, 08:00', completed: true },
        { stage: 'Departed Nairobi', date: '16 Sep 2026, 12:00', completed: true },
        { stage: 'Arrived Kampala', date: '17 Sep 2026, 16:00', completed: true }
      ],
      trackingHistory: [
        { date: '2026-09-15 10:00', location: 'Mombasa Port - Terminal 3', status: 'Pickup' },
        { date: '2026-09-15 14:30', location: 'Mombasa - Nairobi Highway', status: 'Departed' },
        { date: '2026-09-16 08:00', location: 'Nairobi, Kenya', status: 'Arrived' },
        { date: '2026-09-16 12:00', location: 'Nairobi - Eldoret Highway', status: 'Departed' },
        { date: '2026-09-17 16:00', location: 'Kampala, Uganda', status: 'Delivered' }
      ],
      notes: 'Delivered successfully - Signature received',
      priority: 'High'
    },
    {
      id: 'DEL-002',
      vehicle: {
        id: 'TRK-002',
        plate: 'KCA 456B',
        capacity: '20ft ST',
        type: 'Medium Truck',
        make: 'Mercedes',
        model: 'Actros',
        year: 2022,
        color: 'Blue',
        vin: 'WDB95065438211672'
      },
      driver: {
        id: 'DRV-002',
        name: 'Sarah Akinyi',
        license: 'DL-23456',
        experience: '7 years',
        phone: '+254 701 234 567',
        email: 'sarah.akinyi@transport.co.ke',
        photo: null,
        rating: 4.9,
        totalTrips: 203
      },
      order: {
        id: 'ORD-002',
        containerId: 'CLR-002',
        cargoDescription: 'Textile Fabrics and Dyeing Agents',
        pickupLocation: 'Mombasa Port - Terminal 1',
        destinationLocation: '456 Industrial Area, Kampala, Uganda',
        pickupDate: '2026-08-12 09:00',
        deliveryDate: '2026-08-14 16:00',
        distance: '420 km',
        estimatedDuration: '2 days',
        status: 'In Transit',
        paymentStatus: 'Pending',
        amount: '$620.00'
      },
      currentLocation: {
        lat: -1.2921,
        lng: 36.8219,
        address: 'Nairobi, Kenya'
      },
      status: 'In Transit',
      progress: 65,
      startLocation: 'Mombasa Port - Terminal 1',
      endLocation: '456 Industrial Area, Kampala, Uganda',
      startDate: '2026-08-12 09:00',
      endDate: '2026-08-14 16:00',
      lastUpdated: '30 minutes ago',
      route: [
        { lat: -4.0435, lng: 39.6682, label: 'Mombasa Port', status: 'visited' },
        { lat: -1.2921, lng: 36.8219, label: 'Nairobi', status: 'current' },
        { lat: 0.5143, lng: 35.2698, label: 'Eldoret', status: 'upcoming' },
        { lat: 0.3136, lng: 32.5811, label: 'Kampala', status: 'upcoming' }
      ],
      milestones: [
        { stage: 'Pickup from Port', date: '12 Aug 2026, 09:00', completed: true },
        { stage: 'Departed Mombasa', date: '12 Aug 2026, 13:00', completed: true },
        { stage: 'Arrived Nairobi', date: '13 Aug 2026, 07:30', completed: true },
        { stage: 'Departed Nairobi', date: '13 Aug 2026, 11:00', completed: false },
        { stage: 'Arrived Kampala', date: '14 Aug 2026, 16:00', completed: false }
      ],
      trackingHistory: [
        { date: '2026-08-12 09:00', location: 'Mombasa Port - Terminal 1', status: 'Pickup' },
        { date: '2026-08-12 13:00', location: 'Mombasa - Nairobi Highway', status: 'Departed' },
        { date: '2026-08-13 07:30', location: 'Nairobi, Kenya', status: 'Arrived' }
      ],
      notes: 'Fragile fabrics - Handle with care',
      priority: 'Medium'
    },
    {
      id: 'DEL-003',
      vehicle: {
        id: 'TRK-003',
        plate: 'KCA 789C',
        capacity: '20ft ST',
        type: 'Medium Truck',
        make: 'MAN',
        model: 'TGS',
        year: 2021,
        color: 'Red',
        vin: 'WMAMG334785219034'
      },
      driver: {
        id: 'DRV-003',
        name: 'David Omondi',
        license: 'DL-34567',
        experience: '3 years',
        phone: '+254 702 345 678',
        email: 'david.omondi@transport.co.ke',
        photo: null,
        rating: 4.5,
        totalTrips: 89
      },
      order: {
        id: 'ORD-003',
        containerId: 'CLR-003',
        cargoDescription: 'Industrial Machinery and Spare Parts',
        pickupLocation: 'Nairobi Warehouse, Kenya',
        destinationLocation: '789 Industrial Park, Kampala, Uganda',
        pickupDate: '2026-08-15 10:00',
        deliveryDate: '2026-08-16 18:00',
        distance: '380 km',
        estimatedDuration: '1 day',
        status: 'In Transit',
        paymentStatus: 'Paid',
        amount: '$950.00'
      },
      currentLocation: {
        lat: 0.5143,
        lng: 35.2698,
        address: 'Eldoret, Kenya'
      },
      status: 'In Transit',
      progress: 45,
      startLocation: 'Nairobi Warehouse, Kenya',
      endLocation: '789 Industrial Park, Kampala, Uganda',
      startDate: '2026-08-15 10:00',
      endDate: '2026-08-16 18:00',
      lastUpdated: '1 hour ago',
      route: [
        { lat: -1.2921, lng: 36.8219, label: 'Nairobi', status: 'visited' },
        { lat: 0.5143, lng: 35.2698, label: 'Eldoret', status: 'current' },
        { lat: 0.3136, lng: 32.5811, label: 'Kampala', status: 'upcoming' }
      ],
      milestones: [
        { stage: 'Pickup from Warehouse', date: '15 Aug 2026, 10:00', completed: true },
        { stage: 'Departed Nairobi', date: '15 Aug 2026, 13:30', completed: true },
        { stage: 'Arrived Eldoret', date: '16 Aug 2026, 08:00', completed: true },
        { stage: 'Departed Eldoret', date: '16 Aug 2026, 10:30', completed: false },
        { stage: 'Arrived Kampala', date: '16 Aug 2026, 18:00', completed: false }
      ],
      trackingHistory: [
        { date: '2026-08-15 10:00', location: 'Nairobi Warehouse, Kenya', status: 'Pickup' },
        { date: '2026-08-15 13:30', location: 'Nairobi - Nakuru Highway', status: 'Departed' },
        { date: '2026-08-16 08:00', location: 'Eldoret, Kenya', status: 'Arrived' }
      ],
      notes: 'Heavy machinery - Special handling required',
      priority: 'High'
    },
    {
      id: 'DEL-004',
      vehicle: {
        id: 'TRK-004',
        plate: 'KCA 012D',
        capacity: '40ft HC',
        type: 'Heavy Truck',
        make: 'Volvo',
        model: 'FH500',
        year: 2023,
        color: 'Silver',
        vin: 'YV2RTY0A7NB334567'
      },
      driver: {
        id: 'DRV-004',
        name: 'Grace Wanjiru',
        license: 'DL-45678',
        experience: '6 years',
        phone: '+254 703 456 789',
        email: 'grace.wanjiru@transport.co.ke',
        photo: null,
        rating: 4.7,
        totalTrips: 134
      },
      order: {
        id: 'ORD-001',
        containerId: 'CLR-001',
        cargoDescription: 'Premium Electronics and Circuit Components',
        pickupLocation: 'Mombasa Port - Terminal 3',
        destinationLocation: 'Kampala Business Park, Uganda',
        pickupDate: '2026-08-10 08:00',
        deliveryDate: '2026-08-12 17:00',
        distance: '450 km',
        estimatedDuration: '2 days',
        status: 'Pending',
        paymentStatus: 'Pending',
        amount: '$850.00'
      },
      currentLocation: {
        lat: -4.0435,
        lng: 39.6682,
        address: 'Mombasa Port, Kenya'
      },
      status: 'Pending',
      progress: 10,
      startLocation: 'Mombasa Port - Terminal 3',
      endLocation: 'Kampala Business Park, Uganda',
      startDate: '2026-08-10 08:00',
      endDate: '2026-08-12 17:00',
      lastUpdated: '3 hours ago',
      route: [
        { lat: -4.0435, lng: 39.6682, label: 'Mombasa Port', status: 'current' },
        { lat: -1.2921, lng: 36.8219, label: 'Nairobi', status: 'upcoming' },
        { lat: 0.5143, lng: 35.2698, label: 'Eldoret', status: 'upcoming' },
        { lat: 0.3136, lng: 32.5811, label: 'Kampala', status: 'upcoming' }
      ],
      milestones: [
        { stage: 'Pickup from Port', date: '10 Aug 2026, 08:00', completed: false },
        { stage: 'Departed Mombasa', date: '10 Aug 2026, 12:00', completed: false },
        { stage: 'Arrived Nairobi', date: '11 Aug 2026, 07:00', completed: false },
        { stage: 'Departed Nairobi', date: '11 Aug 2026, 11:00', completed: false },
        { stage: 'Arrived Kampala', date: '12 Aug 2026, 17:00', completed: false }
      ],
      trackingHistory: [
        { date: '2026-08-10 08:00', location: 'Mombasa Port - Terminal 3', status: 'Pickup' }
      ],
      notes: 'Priority shipment - Handle with care',
      priority: 'Critical'
    },
    {
      id: 'DEL-005',
      vehicle: {
        id: 'TRK-005',
        plate: 'KCA 345E',
        capacity: '20ft ST',
        type: 'Light Truck',
        make: 'Isuzu',
        model: 'NQR',
        year: 2022,
        color: 'White',
        vin: 'JAANPR77HN7112345'
      },
      driver: {
        id: 'DRV-005',
        name: 'Peter Ochieng',
        license: 'DL-56789',
        experience: '4 years',
        phone: '+254 704 567 890',
        email: 'peter.ochieng@transport.co.ke',
        photo: null,
        rating: 4.6,
        totalTrips: 112
      },
      order: {
        id: 'ORD-006',
        containerId: 'CLR-006',
        cargoDescription: 'Electronic Components and Accessories',
        pickupLocation: 'Nairobi Warehouse, Kenya',
        destinationLocation: 'Kampala Business Park, Uganda',
        pickupDate: '2026-09-10 09:00',
        deliveryDate: '2026-09-12 16:00',
        distance: '380 km',
        estimatedDuration: '2 days',
        status: 'Rejected',
        paymentStatus: 'Pending',
        amount: '$450.00'
      },
      currentLocation: {
        lat: -1.2921,
        lng: 36.8219,
        address: 'Nairobi, Kenya'
      },
      status: 'Rejected',
      progress: 0,
      startLocation: 'Nairobi Warehouse, Kenya',
      endLocation: 'Kampala Business Park, Uganda',
      startDate: '2026-09-10 09:00',
      endDate: '2026-09-12 16:00',
      lastUpdated: '1 day ago',
      route: [
        { lat: -1.2921, lng: 36.8219, label: 'Nairobi', status: 'current' },
        { lat: 0.5143, lng: 35.2698, label: 'Eldoret', status: 'upcoming' },
        { lat: 0.3136, lng: 32.5811, label: 'Kampala', status: 'upcoming' }
      ],
      milestones: [
        { stage: 'Pickup from Warehouse', date: '10 Sep 2026, 09:00', completed: false },
        { stage: 'Departed Nairobi', date: '10 Sep 2026, 12:00', completed: false },
        { stage: 'Arrived Eldoret', date: '11 Sep 2026, 08:00', completed: false },
        { stage: 'Departed Eldoret', date: '11 Sep 2026, 10:00', completed: false },
        { stage: 'Arrived Kampala', date: '12 Sep 2026, 16:00', completed: false }
      ],
      trackingHistory: [
        { date: '2026-09-10 09:00', location: 'Nairobi Warehouse, Kenya', status: 'Pickup' }
      ],
      notes: 'Rejected due to capacity constraints',
      priority: 'Low'
    },
    {
      id: 'DEL-006',
      vehicle: {
        id: 'TRK-006',
        plate: 'KCA 678F',
        capacity: '40ft HC',
        type: 'Heavy Truck',
        make: 'Scania',
        model: 'S500',
        year: 2023,
        color: 'Blue',
        vin: 'YS2R6X20005388742'
      },
      driver: {
        id: 'DRV-006',
        name: 'Mary Wambui',
        license: 'DL-67890',
        experience: '8 years',
        phone: '+254 705 678 901',
        email: 'mary.wambui@transport.co.ke',
        photo: null,
        rating: 4.9,
        totalTrips: 245
      },
      order: {
        id: 'ORD-007',
        containerId: 'CLR-007',
        cargoDescription: 'Construction Materials and Equipment',
        pickupLocation: 'Mombasa Port - Terminal 2',
        destinationLocation: 'Kampala Construction Site, Uganda',
        pickupDate: '2026-09-20 08:00',
        deliveryDate: '2026-09-22 18:00',
        distance: '460 km',
        estimatedDuration: '2 days',
        status: 'In Transit',
        paymentStatus: 'Partial',
        amount: '$1,200.00'
      },
      currentLocation: {
        lat: -2.5,
        lng: 36.0,
        address: 'Between Nairobi and Eldoret'
      },
      status: 'In Transit',
      progress: 35,
      startLocation: 'Mombasa Port - Terminal 2',
      endLocation: 'Kampala Construction Site, Uganda',
      startDate: '2026-09-20 08:00',
      endDate: '2026-09-22 18:00',
      lastUpdated: '45 minutes ago',
      route: [
        { lat: -4.0435, lng: 39.6682, label: 'Mombasa Port', status: 'visited' },
        { lat: -1.2921, lng: 36.8219, label: 'Nairobi', status: 'visited' },
        { lat: 0.5143, lng: 35.2698, label: 'Eldoret', status: 'upcoming' },
        { lat: 0.3136, lng: 32.5811, label: 'Kampala', status: 'upcoming' }
      ],
      milestones: [
        { stage: 'Pickup from Port', date: '20 Sep 2026, 08:00', completed: true },
        { stage: 'Departed Mombasa', date: '20 Sep 2026, 12:30', completed: true },
        { stage: 'Arrived Nairobi', date: '21 Sep 2026, 06:45', completed: true },
        { stage: 'Departed Nairobi', date: '21 Sep 2026, 10:00', completed: false },
        { stage: 'Arrived Kampala', date: '22 Sep 2026, 18:00', completed: false }
      ],
      trackingHistory: [
        { date: '2026-09-20 08:00', location: 'Mombasa Port - Terminal 2', status: 'Pickup' },
        { date: '2026-09-20 12:30', location: 'Mombasa - Nairobi Highway', status: 'Departed' },
        { date: '2026-09-21 06:45', location: 'Nairobi, Kenya', status: 'Arrived' }
      ],
      notes: 'Heavy construction materials - Wide load permit required',
      priority: 'Medium'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed':
      case 'Delivered': return colors.success;
      case 'In Transit': return colors.info;
      case 'Pending': return colors.warning;
      case 'Rejected': return colors.danger;
      case 'Delayed': return colors.orange;
      default: return colors.info;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed':
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'In Transit': return <Truck className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      case 'Delayed': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'Completed': return 'Completed';
      case 'Delivered': return 'Delivered';
      case 'In Transit': return 'In Transit';
      case 'Pending': return 'Pending';
      case 'Rejected': return 'Rejected';
      case 'Delayed': return 'Delayed';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return colors.danger;
      case 'High': return colors.orange;
      case 'Medium': return colors.warning;
      case 'Low': return colors.success;
      default: return colors.info;
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
    if (!amount) return '$0';
    return `$${Number(amount).toLocaleString()}`;
  };

  const toggleVehicleExpand = (vehicleId) => {
    setExpandedVehicleId(expandedVehicleId === vehicleId ? null : vehicleId);
  };

  const openVehicleModal = (vehicle) => {
    setSelectedVehicleForModal(vehicle);
    setShowVehicleModal(true);
  };

  // Filter deliveries
  const getFilteredDeliveries = () => {
    let filtered = [...deliveriesData];
    
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.order.cargoDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.order.containerId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(d => d.status === statusFilter);
    }
    
    return filtered;
  };

  const filteredDeliveries = getFilteredDeliveries();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeliveries = filteredDeliveries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Stats
  const stats = {
    total: deliveriesData.length,
    inTransit: deliveriesData.filter(d => d.status === 'In Transit').length,
    completed: deliveriesData.filter(d => d.status === 'Completed' || d.status === 'Delivered').length,
    pending: deliveriesData.filter(d => d.status === 'Pending').length,
    rejected: deliveriesData.filter(d => d.status === 'Rejected').length
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

  // Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
    if (totalPages <= 1 && itemsPerPage >= filteredDeliveries.length) return null;

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

  // Map Component for Vehicle Tracking
  const VehicleMap = ({ delivery }) => {
    if (!delivery) return null;

    const route = delivery.route || [];
    const currentLocation = delivery.currentLocation;

    return (
      <div className={`relative rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'} border ${isDark ? 'border-gray-600' : 'border-gray-200'} mb-4`}
        style={{ minHeight: '220px' }}>
        
        <div className="relative w-full h-[220px] bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          {/* Grid lines for map effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }} />
          </div>

          {/* Route Line */}
          {route.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline
                points={route.map((p, i) => {
                  const x = ((p.lng + 10) / 60) * 100;
                  const y = ((10 - p.lat) / 20) * 100;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#714b67"
                strokeWidth="3"
                opacity="0.8"
              />
            </svg>
          )}

          {/* Route Points */}
          {route.map((point, index) => {
            const x = ((point.lng + 10) / 60) * 100;
            const y = ((10 - point.lat) / 20) * 100;
            const isCurrent = point.status === 'current';
            const isVisited = point.status === 'visited';
            const isUpcoming = point.status === 'upcoming';

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {/* Pulse animation for current location */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      backgroundColor: '#10b981',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }} 
                  />
                )}
                {/* Main dot */}
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-green-500 border-green-300 shadow-lg shadow-green-500/50 scale-110'
                    : isVisited
                    ? 'bg-green-400 border-green-200'
                    : 'bg-gray-400 border-gray-300'
                }`}>
                  {isCurrent && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </div>
                {/* Label */}
                <div className={`absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[8px] font-medium transition-all duration-300 ${
                  isCurrent 
                    ? 'text-green-600 dark:text-green-400'
                    : isVisited
                    ? 'text-gray-600 dark:text-gray-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {point.label}
                </div>
              </div>
            );
          })}

          {/* Current Location Badge */}
          {currentLocation && (
            <div className="absolute bottom-2 left-2 right-2 flex justify-center">
              <div className={`px-3 py-1.5 rounded-lg ${isDark ? 'bg-gray-900/80' : 'bg-white/90'} backdrop-blur-sm shadow-lg`}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-green-500" />
                  <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    📍 {currentLocation.address}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Vehicle Detail Modal
  const VehicleModal = () => {
    if (!showVehicleModal || !selectedVehicleForModal) return null;

    const delivery = selectedVehicleForModal;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
           onClick={() => setShowVehicleModal(false)}>
        <div
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vehicle Details - {delivery.vehicle.plate}
              </h3>
            </div>
            <button
              onClick={() => setShowVehicleModal(false)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Map */}
            <VehicleMap delivery={delivery} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Vehicle Info */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <TruckIcon className="w-4 h-4" style={{ color: colors.primary }} />
                  Vehicle Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Plate</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.vehicle.plate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Capacity</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.vehicle.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Type</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.vehicle.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Make/Model</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.vehicle.make} {delivery.vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Year/Color</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.vehicle.year} / {delivery.vehicle.color}</span>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <UserIcon className="w-4 h-4" style={{ color: colors.primary }} />
                  Driver Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Name</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.driver.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>License</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.driver.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Experience</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.driver.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Rating</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>⭐ {delivery.driver.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Total Trips</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.driver.totalTrips}</span>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Package className="w-4 h-4" style={{ color: colors.primary }} />
                  Order Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Order ID</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Container</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.order.containerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Cargo</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.order.cargoDescription.substring(0, 25)}{delivery.order.cargoDescription.length > 25 ? '...' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Amount</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(delivery.order.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Payment</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${delivery.order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : delivery.order.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {delivery.order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'} mb-4`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Delivery Progress
                </span>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {delivery.progress}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${delivery.progress}%`,
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.success})`
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {delivery.startLocation.substring(0, 20)}...
                </span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {delivery.endLocation.substring(0, 20)}...
                </span>
              </div>
            </div>

            {/* Milestones */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <h4 className={`font-medium text-sm mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Flag className="w-4 h-4" style={{ color: colors.primary }} />
                Journey Milestones
              </h4>
              <div className="space-y-3">
                {delivery.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="relative flex items-center justify-center w-6">
                      {milestone.completed ? (
                        <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
                      ) : (
                        <Clock className="w-4 h-4" style={{ color: colors.warning }} />
                      )}
                      {idx < delivery.milestones.length - 1 && (
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

            {/* Close Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowVehicleModal(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Grid View
  const renderGridView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentDeliveries.map((delivery) => (
          <div key={delivery.id} className={`rounded-xl overflow-hidden transition-all duration-300 ${
            isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white shadow-md'
          } hover:shadow-lg`}>
            {/* Header */}
            <div className={`p-4 border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                    <Truck className="w-4 h-4" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {delivery.vehicle.plate}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {delivery.order.containerId} • {delivery.order.id}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1`}
                  style={{
                    backgroundColor: getStatusColor(delivery.status) + '20',
                    color: getStatusColor(delivery.status)
                  }}>
                  {getStatusIcon(delivery.status)}
                  {getStatusLabel(delivery.status)}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              {/* Driver */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {delivery.driver.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    ⭐ {delivery.driver.rating} • {delivery.driver.totalTrips} trips
                  </p>
                </div>
              </div>

              {/* Cargo */}
              <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {delivery.order.cargoDescription.substring(0, 40)}{delivery.order.cargoDescription.length > 40 ? '...' : ''}
                </p>
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-3 h-3 text-green-500" />
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {delivery.currentLocation.address}
                </span>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {delivery.progress}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${delivery.progress}%`,
                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.success})`
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                <button
                  onClick={() => openVehicleModal(delivery)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Eye className="w-3 h-3" />
                  View Details
                </button>
                <button
                  onClick={() => showToast('📍 Location shared successfully!', 'success')}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                    color: colors.primary
                  }}
                >
                  <Share2 className="w-3 h-3" />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading deliveries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <VehicleModal />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/inland-transporter-dashboard')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${isDark ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
              Active Deliveries
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Track all vehicles and drivers in real-time • {deliveriesData.length} total vehicles
            </p>
          </div>
          <button
            onClick={() => {
              const dummyData = [...deliveriesData];
              localStorage.setItem('inlandDeliveries', JSON.stringify(dummyData));
              showToast('Deliveries refreshed', 'success');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
              isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-blue-600 dark:text-blue-400`}>In Transit</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.inTransit}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-emerald-600 dark:text-emerald-400`}>Completed</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{stats.completed}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-amber-600 dark:text-amber-400`}>Pending</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border border-rose-200 dark:border-rose-800 hover:shadow-lg transition-shadow duration-200`}>
            <p className={`text-xs text-rose-600 dark:text-rose-400`}>Rejected</p>
            <p className="text-xl font-bold text-rose-600 dark:text-rose-400">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-xl p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by plate, driver, container..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Status</option>
              <option value="In Transit">In Transit</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-4 py-2 transition-colors ${
                  viewMode === 'grid'
                    ? isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
                    : isDark ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-white text-gray-500 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4 inline mr-1" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-4 py-2 transition-colors ${
                  viewMode === 'list'
                    ? isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900'
                    : isDark ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-white text-gray-500 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4 inline mr-1" />
                List
              </button>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 justify-center ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredDeliveries.length} vehicle{filteredDeliveries.length !== 1 ? 's' : ''}
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>

        {/* Deliveries View */}
        {filteredDeliveries.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            <Truck className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Deliveries Found
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {deliveriesData.length === 0 ? "No vehicles are currently on delivery." : "No deliveries match your filters."}
            </p>
          </div>
        ) : viewMode === 'list' ? (
          <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Vehicle
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Driver
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Container
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Status
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Location
                    </th>
                    <th className={`text-left py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Progress
                    </th>
                    <th className={`text-center py-3 px-4 font-semibold text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  {currentDeliveries.map((delivery) => (
                    <React.Fragment key={delivery.id}>
                      <tr 
                        className={`cursor-pointer transition-all duration-200 ${
                          isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                        } ${expandedVehicleId === delivery.id ? (isDark ? 'bg-gray-700' : 'bg-purple-50') : ''}`}
                        onClick={() => toggleVehicleExpand(delivery.id)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                              <Truck className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                            </div>
                            <div>
                              <span className={`font-medium text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {delivery.vehicle.plate}
                              </span>
                              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {delivery.vehicle.type} • {delivery.vehicle.capacity}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                              <User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                              <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {delivery.driver.name}
                              </span>
                              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                ⭐ {delivery.driver.rating} • {delivery.driver.totalTrips} trips
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            {delivery.order.containerId}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border`}
                            style={{
                              backgroundColor: getStatusColor(delivery.status) + '20',
                              color: getStatusColor(delivery.status),
                              borderColor: getStatusColor(delivery.status) + '40'
                            }}>
                            {getStatusIcon(delivery.status)}
                            {getStatusLabel(delivery.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {delivery.currentLocation.address}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${delivery.progress}%`,
                                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.success})`
                                }}
                              />
                            </div>
                            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {delivery.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openVehicleModal(delivery);
                              }}
                              className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                              style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6', color: colors.primary }}
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast('📍 Location shared!', 'success');
                              }}
                              className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                              style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6', color: colors.primary }}
                              title="Share Location"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleVehicleExpand(delivery.id);
                              }}
                              className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
                              style={{ backgroundColor: isDark ? '#374151' : '#f3f4f6', color: colors.primary }}
                              title={expandedVehicleId === delivery.id ? "Hide Details" : "Show Details"}
                            >
                              {expandedVehicleId === delivery.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Expanded Row */}
                      {expandedVehicleId === delivery.id && (
                        <tr className="border-0">
                          <td colSpan="7" className="p-0">
                            <div className={`p-4 md:p-6 ${isDark ? 'bg-gray-800/90' : 'bg-gray-50/90'} rounded-b-xl`}>
                              {/* Map */}
                              <VehicleMap delivery={delivery} />

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Vehicle Info */}
                                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                  <h4 className={`font-medium text-xs mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Vehicle</h4>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Plate</span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.vehicle.plate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Capacity</span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.vehicle.capacity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Type</span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.vehicle.type}</span>
                                    </div>
                                  </div>
                                </div>
                                {/* Driver Info */}
                                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                  <h4 className={`font-medium text-xs mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Driver</h4>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Name</span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.driver.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>License</span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.driver.license}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Rating</span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>⭐ {delivery.driver.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                {/* Order Info */}
                                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                  <h4 className={`font-medium text-xs mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Order</h4>
                                  <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Container</span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{delivery.order.containerId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Amount</span>
                                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(delivery.order.amount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Payment</span>
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${delivery.order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : delivery.order.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {delivery.order.paymentStatus}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Priority Badge */}
                              <div className="mt-3 flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1`}
                                  style={{
                                    backgroundColor: getPriorityColor(delivery.priority) + '20',
                                    color: getPriorityColor(delivery.priority)
                                  }}>
                                  <AlertCircle className="w-3 h-3" />
                                  {delivery.priority} Priority
                                </span>
                                {delivery.notes && (
                                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    📝 {delivery.notes}
                                  </span>
                                )}
                              </div>

                              {/* View Full Details Button */}
                              <button
                                onClick={() => openVehicleModal(delivery)}
                                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                                style={{ backgroundColor: colors.primary }}
                              >
                                <Eye className="w-4 h-4" />
                                View Full Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
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
    </div>
  );
};

export default InlandTransporterDeliveries;