// components/Navbar.jsx - Fixed responsive issues
import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Package,
  Ship,
  Settings,
  User,
  Bell,
  ChevronDown,
  LogOut,
  HelpCircle,
  Truck,
  Calendar,
  Sun,
  Moon,
  LayoutDashboard,
  FileText,
  Building,
  List,
  FileCheck,
  FileSignature,
  CreditCard,
  Shield,
  FileBarChart,
  Users,
  Plus,
  ClipboardList,
  BarChart3,
  Clock,
  Menu,
  X,
  Container,
  Globe,
  Anchor,
  Box,
  Layers,
  Award,
  UserPlus,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle,
  Book,
  Activity,
  Key,
  HardDrive,
  PackageCheck,
  BriefcaseBusiness
} from 'lucide-react';
import { ThemeContext } from '../context/themeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const [activeLink, setActiveLink] = useState('Dashboard');
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Refs for dropdowns
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Color theme
  const colors = {
    primary: '#714b67',
    primaryLight: '#8a5f7e',
    primaryDark: '#5a3a52',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
  };

  const isDark = darkMode;

  // Default user for when not logged in (shows importer view)
  const defaultUser = {
    id: 0,
    name: 'Guest',
    email: 'guest@importflow.com',
    role: 'importer',
    company: 'ImportFlow Ltd',
    avatar: 'G',
    isGuest: true
  };

  const currentUser = user || defaultUser;
  const isGuest = !user;

  // Role detection
  const isAdmin = currentUser?.role === 'admin';
  const isExporter = currentUser?.role === 'exporter';
  const isClearingAgent = currentUser?.role === 'clearing_agent';
  const isFreightForwarder = currentUser?.role === 'freight_forwarder';
  const isInlandTransporter = currentUser?.role === 'inland_transporter';
  const isImporter = currentUser?.role === 'importer' || (!user && !currentUser?.role);

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdowns on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeAllDropdowns();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Admin Nav Links
  const adminNavLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Roles', icon: Shield, path: '/admin/roles' },
    { name: 'Permissions', icon: Key, path: '/admin/permissions' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
    { name: 'Audit Logs', icon: Activity, path: '/admin/audit-logs' },
    { name: 'Backup', icon: HardDrive, path: '/admin/backup' },
  ];

  // Navigation Links
  const importerNavLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/importer-dashboard' },
    { name: 'My Imports', icon: Package, path: '/my-imports' },
    { name: 'Service Providers', icon: BriefcaseBusiness, path: '/importer-serviceproviders' },
    // { name: 'Freight Bookings', icon: Book, path: '/importer/freight-bookings' },
    // { name: 'Assignments', icon: UserPlus, path: '/importer-assignments' },
    // { name: 'Containers', icon: Container, path: '/importer-containers' },
    // { name: 'Documents', icon: FileText, path: '/importer-documents' },
    // { name: 'Fleet', icon: Truck, path: '/importer-fleet' },
  ];

  const exporterNavLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/exporter-dashboard' },
    { name: 'Import Orders', icon: Package, path: '/exporter-orders' },
    // { name: 'Exports', icon: Ship, path: '/exporter-shipments' },
    // { name: 'Containers', icon: Container, path: '/exporter-containers' },
    // { name: 'Documents', icon: FileText, path: '/exporter-documents' },
    // { name: 'Fleet', icon: Truck, path: '/exporter-fleet' },
    { name: 'Freight Bookings', icon: Book, path: '/freight-bookings' },
  ];

  const clearingAgentNavLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/clearing-agent-dashboard' },
    { name: 'My Requests', icon: Ship, path: '/clearing-agent-requests' },
    // { name: 'Containers', icon: Container, path: '/clearing-agent-containers' },
    // { name: 'Documents', icon: FileText, path: '/clearing-agent-documents' },
    { name: 'SLA', icon: Award, path: '/clearing-agent-sla' },
  ];

  const freightForwarderNavLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/freight-forwarder/dashboard' },
    // { name: 'Processed Bookings', icon: PackageCheck, path: '/freight-forwarder/processed-bookings' },
    { name: 'Bookings', icon: Ship, path: '/freight-forwarder/bookings' },
    // { name: 'Containers', icon: Container, path: '/freight-forwarder/containers' },
    // { name: 'Documents', icon: FileText, path: '/freight-forwarder/documents' },
    { name: 'Schedule', icon: Calendar, path: '/freight-forwarder/schedule' },
  ];

  const inlandTransporterNavLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/inland-transporter/dashboard' },
    { name: 'Dispatch Orders', icon: ClipboardList, path: '/inland-transporter/dispatch-orders' },
    { name: 'Fleet', icon: Truck, path: '/inland-transporter/deliveries' },
    { name: 'Vehicles', icon: Truck, path: '/inland-transporter/vehicles' },
    // { name: 'Documents', icon: FileText, path: '/inland-transporter/documents' },
  ];

  // Determine which nav links to show
  let navLinks = importerNavLinks;
  if (isAdmin) {
    navLinks = adminNavLinks;
  } else if (isExporter) {
    navLinks = exporterNavLinks;
  } else if (isClearingAgent) {
    navLinks = clearingAgentNavLinks;
  } else if (isFreightForwarder) {
    navLinks = freightForwarderNavLinks;
  } else if (isInlandTransporter) {
    navLinks = inlandTransporterNavLinks;
  }

  // Notifications
  const getNotifications = (role) => {
    const baseNotifications = [
      { id: 1, title: 'System update completed', time: '1 hour ago', read: false, icon: Activity },
      { id: 2, title: 'New message from support', time: '3 hours ago', read: true, icon: MessageSquare },
    ];

    if (role === 'admin') {
      return [
        ...baseNotifications,
        { id: 3, title: 'New user registration pending approval', time: '2 min ago', read: false, icon: Users },
        { id: 4, title: 'System backup completed successfully', time: '1 hour ago', read: false, icon: HardDrive },
        { id: 5, title: 'Security alert: Multiple failed login attempts', time: '2 hours ago', read: false, icon: Shield },
      ];
    }
    
    if (role === 'exporter') {
      return [
        ...baseNotifications,
        { id: 3, title: 'Export #EXP-001 Cleared', time: '2 min ago', read: false, icon: Ship },
        { id: 4, title: 'New buyer inquiry received', time: '1 hour ago', read: false, icon: MessageSquare },
      ];
    } else if (role === 'freight_forwarder') {
      return [
        ...baseNotifications,
        { id: 3, title: 'New booking request', time: '2 min ago', read: false, icon: Ship },
        { id: 4, title: 'Container arrived at port', time: '1 hour ago', read: false, icon: Container },
      ];
    } else if (role === 'inland_transporter') {
      return [
        ...baseNotifications,
        { id: 3, title: 'New dispatch order', time: '2 min ago', read: false, icon: ClipboardList },
        { id: 4, title: 'Vehicle maintenance due', time: '1 hour ago', read: false, icon: Truck },
      ];
    }
    return [
      ...baseNotifications,
      { id: 3, title: 'Shipment #458 Delayed', time: '2 min ago', read: false, icon: Ship },
      { id: 4, title: 'New customs clearance', time: '1 hour ago', read: false, icon: FileCheck },
    ];
  };

  // Handle navigation
  const handleNewImport = () => navigate('/new-import');
  const handleNewExport = () => navigate('/new-export');
  const handleNewAssignment = () => navigate('/clearing-agent/assignment/new');
  const handleNewBooking = () => navigate('/freight-forwarder/booking/process');
  const handleNewDispatch = () => navigate('/inland-transporter/dispatch/new');
  const handleNewUser = () => navigate('/admin/users');
  const handleLogout = () => {
    logout();
    navigate('/');
    closeAllDropdowns();
  };

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!isDark);
  };

  // Show loading state
  if (loading) {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 shadow-lg border-b transition-colors duration-300 ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`} style={{ borderBottomColor: colors.primary }}>
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
            <div className="flex items-center">
              <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                <Ship className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="ml-2 text-sm md:text-base lg:text-xl font-bold tracking-tight hidden sm:block" style={{ color: colors.primary }}>
                LogiSolutions
              </span>
            </div>
            <div className="animate-pulse flex items-center gap-4">
              <div className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              <div className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const notifications = getNotifications(currentUser.role);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 shadow-lg border-b transition-colors duration-300 ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
      style={{ borderBottomColor: colors.primary }}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-20">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div 
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-colors duration-300 flex-shrink-0"
                style={{ backgroundColor: colors.primary }}
              >
                {isAdmin ? (
                  <Settings className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                ) : isExporter ? (
                  <Globe className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                ) : isClearingAgent ? (
                  <Shield className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                ) : isFreightForwarder ? (
                  <Ship className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                ) : isInlandTransporter ? (
                  <Truck className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                ) : (
                  <Package className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                )}
              </div>
              <div className="hidden sm:block ml-2">
                <span 
                  className="text-sm md:text-base lg:text-xl font-bold tracking-tight"
                  style={{ color: colors.primary }}
                >
                  LogiSolutions
                </span>
                <span className={`block text-[8px] md:text-[10px] font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {isAdmin ? 'Administrator Portal' :
                   isExporter ? 'Exporter Portal' : 
                   isClearingAgent ? 'Clearing Agent Portal' : 
                   isFreightForwarder ? 'Freight Forwarder Portal' :
                   isInlandTransporter ? 'Inland Transporter Portal' : 'Importer Portal'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop - FIXED: No overflow, uses flex-wrap */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-2 xl:px-4 min-w-0">
            <div className="flex items-center gap-0.5 xl:gap-1 flex-wrap justify-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || 
                               (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      setActiveLink(link.name);
                      navigate(link.path);
                    }}
                    className={`px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg text-[10px] xl:text-xs 2xl:text-sm font-medium transition-all duration-200 flex items-center gap-1 xl:gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'text-white'
                        : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    style={{
                      backgroundColor: isActive ? colors.primary : 'transparent',
                      color: isActive ? '#ffffff' : (isDark ? '#9ca3af' : '#6b7280'),
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = isDark ? colors.primaryBgDark : colors.primaryBg;
                        e.currentTarget.style.color = isDark ? '#ffffff' : colors.primary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = isDark ? '#9ca3af' : '#6b7280';
                      }
                    }}
                  >
                    <link.icon className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                    <span className="hidden 2xl:inline">{link.name}</span>
                    <span className="inline 2xl:hidden">{link.name.charAt(0)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-shrink-0">
            {/* Single New Action Button */}
            {!isGuest && (
              <>
                {isAdmin && (
                  <button
                    onClick={handleNewUser}
                    className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 hover:shadow-lg text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">New</span>
                    <span className="hidden sm:inline"> User</span>
                  </button>
                )}
                {isExporter && (
                  <button
                    onClick={handleNewExport}
                    className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 hover:shadow-lg text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">New</span>
                    <span className="hidden sm:inline"> Export</span>
                  </button>
                )}
                
                {isFreightForwarder && (
                  <button
                    onClick={handleNewBooking}
                    className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 hover:shadow-lg text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">New</span>
                    <span className="hidden sm:inline"> Process Booking</span>
                  </button>
                )}
                
                {/* {isInlandTransporter && (
                  <button
                    onClick={handleNewDispatch}
                    className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 hover:shadow-lg text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">New</span>
                    <span className="hidden sm:inline"> Dispatch</span>
                  </button>
                )}
                 */}
                {isImporter && (
                  <button
                    onClick={handleNewImport}
                    className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 hover:shadow-lg text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">New</span>
                    <span className="hidden sm:inline"> Import</span>
                  </button>
                )}
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1 sm:p-1.5 md:p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-600" />
              )}
            </button>

            {/* Role Switcher Button */}
            <button
              onClick={() => navigate('/')}
              className={`p-1 sm:p-1.5 md:p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Switch Role"
            >
              <Users className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>

            {/* Notifications */}
            {!isGuest && (
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-1 sm:p-1.5 md:p-2 rounded-lg transition-colors relative ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Bell className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                  <span 
                    className="absolute top-1 right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: colors.primary }}
                  ></span>
                </button>

                {isNotificationsOpen && (
                  <div className={`absolute right-0 mt-2 w-56 sm:w-64 md:w-72 rounded-lg shadow-xl border overflow-hidden z-50 ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}>
                    <div 
                      className="px-3 sm:px-4 py-2 sm:py-3 border-b"
                      style={{ 
                        backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                        borderColor: isDark ? '#374151' : '#e5e7eb'
                      }}
                    >
                      <h3 className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ color: isDark ? '#ffffff' : colors.primary }}>
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-48 sm:max-h-56 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`px-3 sm:px-4 py-2 sm:py-3 transition-colors cursor-pointer ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          } ${!notif.read ? 'border-l-4' : ''}`}
                          style={{ 
                            borderLeftColor: !notif.read ? colors.primary : 'transparent'
                          }}
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            <notif.icon className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5" style={{ color: colors.primary }} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs sm:text-sm font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                {notif.title}
                              </p>
                              <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={`px-3 sm:px-4 py-1.5 sm:py-2 border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-gray-50'}`}>
                      <button 
                        className="text-[10px] sm:text-xs font-medium w-full text-center hover:underline"
                        style={{ color: colors.primary }}
                      >
                        View all
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 md:p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <div 
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white text-[8px] sm:text-[10px] md:text-xs font-semibold flex-shrink-0"
                  style={{ backgroundColor: colors.primary }}
                >
                  {currentUser.avatar}
                </div>
                <div className="hidden sm:block text-left">
                  <p className={`text-[10px] sm:text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {isGuest ? 'Guest' : currentUser.name}
                  </p>
                  <p className={`text-[8px] sm:text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isGuest ? 'Not Logged In' : 
                     isAdmin ? 'Administrator' :
                     isExporter ? 'Exporter' : 
                     isClearingAgent ? 'Clearing Agent' : 
                     isFreightForwarder ? 'Freight Forwarder' :
                     isInlandTransporter ? 'Inland Transporter' : 'Importer'}
                  </p>
                </div>
                <ChevronDown className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>

              {isProfileOpen && (
                <div className={`absolute right-0 mt-2 w-48 sm:w-56 md:w-64 rounded-lg shadow-xl border overflow-hidden z-50 ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}>
                  <div 
                    className="px-3 sm:px-4 py-2 sm:py-3 border-b"
                    style={{ 
                      backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                      borderColor: isDark ? '#374151' : '#e5e7eb'
                    }}
                  >
                    <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ color: isDark ? '#ffffff' : colors.primary }}>
                      {isGuest ? 'Guest User' : currentUser.name}
                    </p>
                    <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isGuest ? 'Not logged in' : currentUser.email}
                    </p>
                    {!isGuest && (
                      <p className={`text-[8px] sm:text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {currentUser.company} • {isAdmin ? 'Administrator' : isExporter ? 'Exporter' : isClearingAgent ? 'Clearing Agent' : isFreightForwarder ? 'Freight Forwarder' : isInlandTransporter ? 'Inland Transporter' : 'Importer'}
                      </p>
                    )}
                  </div>
                  <div className="py-1">
                    {!isGuest ? (
                      <>
                        <button 
                          onClick={() => {
                            if (isAdmin) navigate('/admin/dashboard');
                            else if (isExporter) navigate('/exporter-dashboard');
                            else if (isClearingAgent) navigate('/clearing-agent-dashboard');
                            else if (isFreightForwarder) navigate('/freight-forwarder/dashboard');
                            else if (isInlandTransporter) navigate('/inland-transporter/dashboard');
                            else navigate('/importer-dashboard');
                            setIsProfileOpen(false);
                          }} 
                          className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors w-full ${
                            isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <LayoutDashboard className="w-3 h-3 sm:w-4 sm:h-4" />
                          Dashboard
                        </button>
                        <button 
                          onClick={() => {
                            navigate('/');
                            setIsProfileOpen(false);
                          }} 
                          className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors w-full ${
                            isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          Switch Role
                        </button>
                        <hr className={`my-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                        >
                          <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => {
                            navigate('/login');
                            setIsProfileOpen(false);
                          }} 
                          className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors w-full ${
                            isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          Login
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1 sm:p-1.5 md:p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDark ? 'text-white' : 'text-gray-600'}`} />
              ) : (
                <Menu className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isDark ? 'text-white' : 'text-gray-600'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t transition-colors duration-300 ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`} ref={mobileMenuRef}>
            <div className="px-2 sm:px-4 py-2 sm:py-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-1.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path || 
                                 (link.path !== '/' && location.pathname.startsWith(link.path));
                  return (
                    <button
                      key={link.name}
                      onClick={() => {
                        setActiveLink(link.name);
                        navigate(link.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-colors ${
                        isActive
                          ? 'text-white'
                          : isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: isActive ? colors.primary : 'transparent',
                        color: isActive ? '#ffffff' : (isDark ? '#9ca3af' : '#6b7280'),
                      }}
                    >
                      <link.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">{link.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Quick Actions */}
              <div className={`mt-2 sm:mt-3 pt-2 sm:pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                  <button 
                    onClick={() => {
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs transition-colors" 
                    style={{ 
                      backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                      color: colors.primary
                    }}
                  >
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    Switch Role
                  </button>
                  <button 
                    onClick={toggleTheme}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs transition-colors" 
                    style={{ 
                      backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                      color: colors.primary
                    }}
                  >
                    {isDark ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>

              {/* Mobile User Info */}
              <div className={`mt-2 sm:mt-3 pt-2 sm:pt-3 border-t flex items-center gap-2 sm:gap-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold flex-shrink-0"
                  style={{ backgroundColor: colors.primary }}
                >
                  {currentUser.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {isGuest ? 'Guest User' : currentUser.name}
                  </p>
                  <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isGuest ? 'Not logged in' : currentUser.email}
                  </p>
                </div>
                {!isGuest && (
                  <button 
                    onClick={handleLogout}
                    className="text-[10px] sm:text-xs text-red-600 hover:bg-red-50 px-2 sm:px-3 py-1 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// MessageSquare icon component
const MessageSquare = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default Navbar;