// pages/RoleSwitcher.jsx - Updated with Admin role
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/themeContext';
import { useAuth } from '../context/authContext';
import {
  Package,
  Ship,
  Truck,
  Shield,
  Globe,
  LayoutDashboard,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Award,
  Container,
  FileText,
  Book,
  UserPlus,
  BarChart3,
  ClipboardList,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Settings as SettingsIcon,
  Database,
  Activity,
  Key,
  Server,
  HardDrive
} from 'lucide-react';

const RoleSwitcher = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const { user, switchRole, logout } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);

  // const colors = {
  //   primary: '#714b67',
  //   primaryLight: '#8a5f7e',
  //   primaryDark: '#5a3a52',
  //   primaryBg: '#f5f0f4',
  //   primaryBgDark: '#2d1f29',
  //   success: '#10b981',
  //   warning: '#f59e0b',
  //   info: '#3b82f6',
  //   danger: '#ef4444',
  // };

  const colors = {
    primary: theme.primary,
    primaryLight: theme.primary + 'cc',
    primaryDark: theme.primary + '99',
    primaryBg: theme.primary + '20',
    primaryBgDark: theme.primary + '40',
    success: theme.success || '#10b981',
    warning: theme.accent || '#f59e0b',
    info: '#3b82f6',
    danger: theme.danger || '#ef4444',
  };

  const isDark = darkMode;

  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      icon: SettingsIcon,
      color: '#6b4c7a',
      path: '/admin/dashboard',
      description: 'Full system control, user management, and configuration',
      features: ['User Management', 'Role & Permissions', 'System Settings', 'Audit Logs', 'Backup & Maintenance'],
      company: 'LogiSolutions'
    },
    {
      id: 'importer',
      name: 'Importer',
      icon: Package,
      color: colors.primary,
      path: '/importer-dashboard',
      description: 'Manage imports, shipments, and customs clearance',
      features: ['Shipment Tracking', 'Customs Clearance', 'Container Management', 'Document Management'],
      company: 'ImportFlow Ltd'
    },
    {
      id: 'exporter',
      name: 'Exporter',
      icon: Globe,
      color: colors.info,
      path: '/exporter-dashboard',
      description: 'Manage exports, freight bookings, and marketplace',
      features: ['Export Management', 'Freight Bookings', 'Container Tracking', 'Marketplace Access'],
      company: 'ExportFlow Ltd'
    },
    {
      id: 'clearing_agent',
      name: 'Clearing Agent',
      icon: Shield,
      color: colors.warning,
      path: '/clearing-agent-dashboard',
      description: 'Handle customs clearance and regulatory compliance',
      features: ['Customs Clearance', 'Document Verification', 'SLA Management', 'Regulatory Compliance'],
      company: 'ClearFlow Solutions'
    },
    {
      id: 'freight_forwarder',
      name: 'Freight Forwarder',
      icon: Ship,
      color: colors.info,
      path: '/freight-forwarder/dashboard',
      description: 'Manage freight bookings and shipping operations',
      features: ['Booking Management', 'Container Tracking', 'Schedule Management', 'Analytics Dashboard'],
      company: 'FreightFlow Logistics'
    },
    {
      id: 'inland_transporter',
      name: 'Inland Transporter',
      icon: Truck,
      color: colors.success,
      path: '/inland-transporter/dashboard',
      description: 'Manage inland transport and dispatch operations',
      features: ['Dispatch Orders', 'Delivery Management', 'Fleet Management', 'Route Optimization'],
      company: 'TransFlow Transport'
    }
  ];

  // Find the currently active role
  const activeRole = roles.find(r => r.id === user?.role) || roles[0];

  const handleRoleSelect = (role) => {
    setIsSwitching(true);
    setSelectedRole(role);
    
    // Update the user's role in auth context
    switchRole({
      id: role.id,
      name: role.name,
      company: role.company || `${role.name} Company`,
      email: user?.email || `${role.id}@logisolutions.com`,
      avatar: role.name.charAt(0)
    });
    
    // Navigate after a brief delay to show feedback
    setTimeout(() => {
      setIsSwitching(false);
      navigate(role.path);
    }, 500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: colors.primary + '20' }}>
              <Users className="w-10 h-10" style={{ color: colors.primary }} />
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Role Selector
            </h1>
          </div>
          <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Select a role to access the corresponding dashboard and features
          </p>
          
          {/* Current Role Display */}
          {user && (
            <div className={`mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'
            }`}>
              <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Currently viewing:
              </span>
              <span className="text-sm font-bold" style={{ color: colors.primary }}>
                {activeRole?.name || user.role}
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                ({user.email})
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {roles.map((role) => {
            const isActive = user?.role === role.id;
            const Icon = role.icon;

            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className={`rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  isActive ? 'ring-2' : ''
                } ${
                  isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white shadow-md hover:shadow-xl'
                } ${isSwitching && selectedRole?.id === role.id ? 'opacity-50 scale-95' : ''}`}
                style={{
                  borderColor: isActive ? role.color : isDark ? '#374151' : '#e5e7eb',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {/* Active Badge */}
                {isActive && (
                  <div className="flex justify-end mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" 
                      style={{ backgroundColor: role.color + '20', color: role.color }}>
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </span>
                  </div>
                )}

                {/* Loading Spinner */}
                {isSwitching && selectedRole?.id === role.id && (
                  <div className="flex justify-end mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2" 
                      style={{ borderColor: role.color, borderTopColor: 'transparent' }} />
                  </div>
                )}

                {/* Icon */}
                <div className={`p-3 rounded-xl inline-block mb-4`} style={{ backgroundColor: role.color + '15' }}>
                  <Icon className="w-8 h-8" style={{ color: role.color }} />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {role.name}
                </h3>

                {/* Description */}
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {role.description}
                </p>

                {/* Features */}
                <div className="mt-4 space-y-1.5">
                  {role.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3" style={{ color: role.color }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <div className="mt-4 pt-4 border-t flex items-center justify-between" 
                  style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isActive ? 'Currently viewing' : 'Click to switch'}
                  </span>
                  <button
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md ${
                      isActive ? 'opacity-50 cursor-default' : 'text-white'
                    }`}
                    style={{
                      backgroundColor: isActive ? 'transparent' : role.color,
                      border: isActive ? `1px solid ${role.color}` : 'none',
                      color: isActive ? role.color : 'white'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isActive) handleRoleSelect(role);
                    }}
                  >
                    {isActive ? 'Active' : 'Select Role'}
                    {!isActive && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Access Links */}
        <div className={`mt-8 p-4 rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Quick Access:
            </span>
            
            {/* Admin Quick Access */}
            {user?.role === 'admin' && (
              <>
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" style={{ color: '#6b4c7a' }} />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin/users')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Users className="w-4 h-4" style={{ color: '#6b4c7a' }} />
                  Users
                </button>
                <button
                  onClick={() => navigate('/admin/roles')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Shield className="w-4 h-4" style={{ color: '#6b4c7a' }} />
                  Roles
                </button>
                <button
                  onClick={() => navigate('/admin/permissions')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Key className="w-4 h-4" style={{ color: '#6b4c7a' }} />
                  Permissions
                </button>
                <button
                  onClick={() => navigate('/admin/settings')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Settings className="w-4 h-4" style={{ color: '#6b4c7a' }} />
                  Settings
                </button>
                <button
                  onClick={() => navigate('/admin/audit-logs')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Activity className="w-4 h-4" style={{ color: '#6b4c7a' }} />
                  Audit Logs
                </button>
                <button
                  onClick={() => navigate('/admin/backup')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <HardDrive className="w-4 h-4" style={{ color: '#6b4c7a' }} />
                  Backup
                </button>
              </>
            )}

            {/* Importer Quick Access */}
            {user?.role === 'importer' && (
              <>
                <button
                  onClick={() => navigate('/importer-dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" style={{ color: colors.primary }} />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/importer-shipments')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Ship className="w-4 h-4" style={{ color: colors.primary }} />
                  Shipments
                </button>
                <button
                  onClick={() => navigate('/importer-containers')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Container className="w-4 h-4" style={{ color: colors.primary }} />
                  Containers
                </button>
                <button
                  onClick={() => navigate('/importer-documents')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                  Documents
                </button>
              </>
            )}

            {user?.role === 'exporter' && (
              <>
                <button
                  onClick={() => navigate('/exporter-dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" style={{ color: colors.primary }} />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/exporter-shipments')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Ship className="w-4 h-4" style={{ color: colors.primary }} />
                  Exports
                </button>
                <button
                  onClick={() => navigate('/freight-bookings')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Book className="w-4 h-4" style={{ color: colors.primary }} />
                  Freight Bookings
                </button>
              </>
            )}

            {user?.role === 'freight_forwarder' && (
              <>
                <button
                  onClick={() => navigate('/freight-forwarder/dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" style={{ color: colors.primary }} />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/freight-forwarder/bookings')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Ship className="w-4 h-4" style={{ color: colors.primary }} />
                  Bookings
                </button>
                <button
                  onClick={() => navigate('/freight-forwarder/schedule')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
                  Schedule
                </button>
              </>
            )}

            {user?.role === 'inland_transporter' && (
              <>
                <button
                  onClick={() => navigate('/inland-transporter/dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" style={{ color: colors.primary }} />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/inland-transporter/dispatch-orders')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" style={{ color: colors.primary }} />
                  Dispatch Orders
                </button>
                <button
                  onClick={() => navigate('/inland-transporter/deliveries')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Truck className="w-4 h-4" style={{ color: colors.primary }} />
                  Deliveries
                </button>
              </>
            )}

            {user?.role === 'clearing_agent' && (
              <>
                <button
                  onClick={() => navigate('/clearing-agent-dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" style={{ color: colors.primary }} />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/clearing-agent-assignments')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Ship className="w-4 h-4" style={{ color: colors.primary }} />
                  Assignments
                </button>
                <button
                  onClick={() => navigate('/clearing-agent-documents')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                  Documents
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            This is a demo interface for testing different role views.
            <br />
            Select a role to see the corresponding dashboard and navigation.
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            Current role: <span className="font-medium" style={{ color: colors.primary }}>
              {user?.role || 'Not logged in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcher;