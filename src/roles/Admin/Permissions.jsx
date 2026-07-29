// roles/admin/Permissions.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import {
  Key,
  Shield,
  CheckCircle,
  XCircle,
  Save,
  RefreshCw,
  Search,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Users,
  Settings,
  Ship,
  Truck,
  Package,
  FileText,
  CreditCard,
  BarChart3,
  Building2,
  Globe,
  Database
} from 'lucide-react';

const Permissions = () => {
  const { darkMode } = useContext(ThemeContext);
  const [selectedRole, setSelectedRole] = useState('dispatcher');
  const [isSaving, setIsSaving] = useState(false);
  const [searchModule, setSearchModule] = useState('');

  const colors = {
    primary: '#6b4c7a',
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

  // Roles dropdown options
  const roles = [
    { id: 'administrator', name: 'System Administrator' },
    { id: 'operations_manager', name: 'Operations Manager' },
    { id: 'dispatcher', name: 'Dispatcher' },
    { id: 'transport_manager', name: 'Transport Manager' },
    { id: 'driver', name: 'Driver' },
    { id: 'clearing_agent', name: 'Clearing Agent' },
    { id: 'accountant', name: 'Accountant' },
    { id: 'viewer', name: 'Viewer' },
  ];

  // Modules with their icons
  const moduleIcons = {
    'Shipments': Ship,
    'Containers': Package,
    'Customers': Users,
    'Drivers': Truck,
    'Vehicles': Truck,
    'Routes': Globe,
    'Invoices': FileText,
    'Payments': CreditCard,
    'Reports': BarChart3,
    'Users': Users,
    'Settings': Settings,
    'Departments': Building2,
    'Documents': FileText,
    'Fleet': Truck,
    'Analytics': BarChart3,
    'Integrations': Database,
  };

  // Permission matrix data
  const [permissions, setPermissions] = useState({
    'dispatcher': {
      'Shipments': { view: true, create: true, edit: true, delete: false, approve: true },
      'Containers': { view: true, create: true, edit: false, delete: false, approve: false },
      'Customers': { view: true, create: true, edit: true, delete: false, approve: false },
      'Drivers': { view: true, create: true, edit: true, delete: false, approve: false },
      'Vehicles': { view: true, create: false, edit: false, delete: false, approve: false },
      'Routes': { view: true, create: true, edit: true, delete: false, approve: false },
      'Invoices': { view: true, create: false, edit: false, delete: false, approve: false },
      'Payments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Reports': { view: true, create: false, edit: false, delete: false, approve: false },
      'Users': { view: false, create: false, edit: false, delete: false, approve: false },
      'Settings': { view: false, create: false, edit: false, delete: false, approve: false },
      'Departments': { view: false, create: false, edit: false, delete: false, approve: false },
      'Documents': { view: true, create: true, edit: true, delete: false, approve: false },
      'Fleet': { view: true, create: false, edit: false, delete: false, approve: false },
      'Analytics': { view: true, create: false, edit: false, delete: false, approve: false },
      'Integrations': { view: false, create: false, edit: false, delete: false, approve: false },
    },
    'administrator': {
      'Shipments': { view: true, create: true, edit: true, delete: true, approve: true },
      'Containers': { view: true, create: true, edit: true, delete: true, approve: true },
      'Customers': { view: true, create: true, edit: true, delete: true, approve: true },
      'Drivers': { view: true, create: true, edit: true, delete: true, approve: true },
      'Vehicles': { view: true, create: true, edit: true, delete: true, approve: true },
      'Routes': { view: true, create: true, edit: true, delete: true, approve: true },
      'Invoices': { view: true, create: true, edit: true, delete: true, approve: true },
      'Payments': { view: true, create: true, edit: true, delete: true, approve: true },
      'Reports': { view: true, create: true, edit: true, delete: true, approve: true },
      'Users': { view: true, create: true, edit: true, delete: true, approve: true },
      'Settings': { view: true, create: true, edit: true, delete: true, approve: true },
      'Departments': { view: true, create: true, edit: true, delete: true, approve: true },
      'Documents': { view: true, create: true, edit: true, delete: true, approve: true },
      'Fleet': { view: true, create: true, edit: true, delete: true, approve: true },
      'Analytics': { view: true, create: true, edit: true, delete: true, approve: true },
      'Integrations': { view: true, create: true, edit: true, delete: true, approve: true },
    },
    'operations_manager': {
      'Shipments': { view: true, create: true, edit: true, delete: true, approve: true },
      'Containers': { view: true, create: true, edit: true, delete: false, approve: true },
      'Customers': { view: true, create: true, edit: true, delete: false, approve: false },
      'Drivers': { view: true, create: true, edit: true, delete: false, approve: false },
      'Vehicles': { view: true, create: true, edit: true, delete: false, approve: false },
      'Routes': { view: true, create: true, edit: true, delete: false, approve: false },
      'Invoices': { view: true, create: false, edit: false, delete: false, approve: true },
      'Payments': { view: true, create: false, edit: false, delete: false, approve: true },
      'Reports': { view: true, create: true, edit: true, delete: false, approve: false },
      'Users': { view: true, create: false, edit: false, delete: false, approve: false },
      'Settings': { view: false, create: false, edit: false, delete: false, approve: false },
      'Departments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Documents': { view: true, create: true, edit: true, delete: false, approve: false },
      'Fleet': { view: true, create: true, edit: true, delete: false, approve: false },
      'Analytics': { view: true, create: true, edit: true, delete: false, approve: false },
      'Integrations': { view: false, create: false, edit: false, delete: false, approve: false },
    },
    'transport_manager': {
      'Shipments': { view: true, create: true, edit: true, delete: false, approve: true },
      'Containers': { view: true, create: true, edit: true, delete: false, approve: false },
      'Customers': { view: true, create: true, edit: true, delete: false, approve: false },
      'Drivers': { view: true, create: true, edit: true, delete: false, approve: false },
      'Vehicles': { view: true, create: true, edit: true, delete: false, approve: false },
      'Routes': { view: true, create: true, edit: true, delete: false, approve: false },
      'Invoices': { view: false, create: false, edit: false, delete: false, approve: false },
      'Payments': { view: false, create: false, edit: false, delete: false, approve: false },
      'Reports': { view: true, create: true, edit: true, delete: false, approve: false },
      'Users': { view: false, create: false, edit: false, delete: false, approve: false },
      'Settings': { view: false, create: false, edit: false, delete: false, approve: false },
      'Departments': { view: false, create: false, edit: false, delete: false, approve: false },
      'Documents': { view: true, create: true, edit: true, delete: false, approve: false },
      'Fleet': { view: true, create: true, edit: true, delete: false, approve: false },
      'Analytics': { view: true, create: true, edit: true, delete: false, approve: false },
      'Integrations': { view: false, create: false, edit: false, delete: false, approve: false },
    },
    'driver': {
      'Shipments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Containers': { view: true, create: false, edit: false, delete: false, approve: false },
      'Customers': { view: false, create: false, edit: false, delete: false, approve: false },
      'Drivers': { view: true, create: false, edit: true, delete: false, approve: false },
      'Vehicles': { view: true, create: false, edit: false, delete: false, approve: false },
      'Routes': { view: true, create: false, edit: false, delete: false, approve: false },
      'Invoices': { view: false, create: false, edit: false, delete: false, approve: false },
      'Payments': { view: false, create: false, edit: false, delete: false, approve: false },
      'Reports': { view: false, create: false, edit: false, delete: false, approve: false },
      'Users': { view: false, create: false, edit: false, delete: false, approve: false },
      'Settings': { view: false, create: false, edit: false, delete: false, approve: false },
      'Departments': { view: false, create: false, edit: false, delete: false, approve: false },
      'Documents': { view: true, create: false, edit: false, delete: false, approve: false },
      'Fleet': { view: true, create: false, edit: false, delete: false, approve: false },
      'Analytics': { view: false, create: false, edit: false, delete: false, approve: false },
      'Integrations': { view: false, create: false, edit: false, delete: false, approve: false },
    },
    'clearing_agent': {
      'Shipments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Containers': { view: true, create: false, edit: false, delete: false, approve: false },
      'Customers': { view: true, create: false, edit: false, delete: false, approve: false },
      'Drivers': { view: false, create: false, edit: false, delete: false, approve: false },
      'Vehicles': { view: false, create: false, edit: false, delete: false, approve: false },
      'Routes': { view: false, create: false, edit: false, delete: false, approve: false },
      'Invoices': { view: true, create: false, edit: false, delete: false, approve: false },
      'Payments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Reports': { view: true, create: false, edit: false, delete: false, approve: false },
      'Users': { view: false, create: false, edit: false, delete: false, approve: false },
      'Settings': { view: false, create: false, edit: false, delete: false, approve: false },
      'Departments': { view: false, create: false, edit: false, delete: false, approve: false },
      'Documents': { view: true, create: true, edit: true, delete: false, approve: false },
      'Fleet': { view: false, create: false, edit: false, delete: false, approve: false },
      'Analytics': { view: true, create: false, edit: false, delete: false, approve: false },
      'Integrations': { view: false, create: false, edit: false, delete: false, approve: false },
    },
    'accountant': {
      'Shipments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Containers': { view: false, create: false, edit: false, delete: false, approve: false },
      'Customers': { view: true, create: false, edit: false, delete: false, approve: false },
      'Drivers': { view: false, create: false, edit: false, delete: false, approve: false },
      'Vehicles': { view: false, create: false, edit: false, delete: false, approve: false },
      'Routes': { view: false, create: false, edit: false, delete: false, approve: false },
      'Invoices': { view: true, create: true, edit: true, delete: false, approve: true },
      'Payments': { view: true, create: true, edit: true, delete: false, approve: true },
      'Reports': { view: true, create: true, edit: true, delete: false, approve: false },
      'Users': { view: false, create: false, edit: false, delete: false, approve: false },
      'Settings': { view: false, create: false, edit: false, delete: false, approve: false },
      'Departments': { view: false, create: false, edit: false, delete: false, approve: false },
      'Documents': { view: true, create: true, edit: true, delete: false, approve: false },
      'Fleet': { view: false, create: false, edit: false, delete: false, approve: false },
      'Analytics': { view: true, create: true, edit: true, delete: false, approve: false },
      'Integrations': { view: false, create: false, edit: false, delete: false, approve: false },
    },
    'viewer': {
      'Shipments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Containers': { view: true, create: false, edit: false, delete: false, approve: false },
      'Customers': { view: true, create: false, edit: false, delete: false, approve: false },
      'Drivers': { view: true, create: false, edit: false, delete: false, approve: false },
      'Vehicles': { view: true, create: false, edit: false, delete: false, approve: false },
      'Routes': { view: true, create: false, edit: false, delete: false, approve: false },
      'Invoices': { view: true, create: false, edit: false, delete: false, approve: false },
      'Payments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Reports': { view: true, create: false, edit: false, delete: false, approve: false },
      'Users': { view: false, create: false, edit: false, delete: false, approve: false },
      'Settings': { view: false, create: false, edit: false, delete: false, approve: false },
      'Departments': { view: true, create: false, edit: false, delete: false, approve: false },
      'Documents': { view: true, create: false, edit: false, delete: false, approve: false },
      'Fleet': { view: true, create: false, edit: false, delete: false, approve: false },
      'Analytics': { view: true, create: false, edit: false, delete: false, approve: false },
      'Integrations': { view: false, create: false, edit: false, delete: false, approve: false },
    },
  });

  // Get modules for the selected role
  const getModules = () => {
    const rolePermissions = permissions[selectedRole] || {};
    return Object.keys(rolePermissions).filter(module => 
      module.toLowerCase().includes(searchModule.toLowerCase())
    );
  };

  const modules = getModules();

  // Toggle permission
  const togglePermission = (module, action) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [module]: {
          ...prev[selectedRole][module],
          [action]: !prev[selectedRole][module][action]
        }
      }
    }));
  };

  // Get all permissions for a module
  const getModulePermissions = (module) => {
    return permissions[selectedRole]?.[module] || { view: false, create: false, edit: false, delete: false, approve: false };
  };

  // Save permissions
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  // Permission Checkbox
  const PermissionCheckbox = ({ module, action, checked, onChange }) => {
    const actionColors = {
      view: colors.info,
      create: colors.success,
      edit: colors.warning,
      delete: colors.danger,
      approve: colors.primary,
    };

    return (
      <button
        onClick={() => onChange(module, action)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
          checked 
            ? 'text-white' 
            : isDark ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
        }`}
        style={{
          backgroundColor: checked ? actionColors[action] : (isDark ? '#374151' : '#f3f4f6'),
        }}
      >
        {checked ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Permissions Manager
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Configure module permissions for each role
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ backgroundColor: colors.primary }}
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Permissions'}
          </button>
        </div>
      </div>

      {/* Role Selector & Search */}
      <div className={`rounded-lg p-4 transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Select Role
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={`w-full appearance-none px-4 py-2 pr-8 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`} />
            </div>
          </div>
          <div className="flex-1">
            <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Search Module
            </label>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchModule}
                onChange={(e) => setSearchModule(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                style={{ focusRingColor: colors.primary }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className={`rounded-lg overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider min-w-[150px]"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: colors.primary }} />
                    Module
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  View
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Create
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Edit
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Delete
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Approve
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {modules.map((module) => {
                const Icon = moduleIcons[module] || Shield;
                const perms = getModulePermissions(module);
                
                return (
                  <tr key={module} className={`transition-colors ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {module}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PermissionCheckbox
                        module={module}
                        action="view"
                        checked={perms.view}
                        onChange={togglePermission}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PermissionCheckbox
                        module={module}
                        action="create"
                        checked={perms.create}
                        onChange={togglePermission}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PermissionCheckbox
                        module={module}
                        action="edit"
                        checked={perms.edit}
                        onChange={togglePermission}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PermissionCheckbox
                        module={module}
                        action="delete"
                        checked={perms.delete}
                        onChange={togglePermission}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PermissionCheckbox
                        module={module}
                        action="approve"
                        checked={perms.approve}
                        onChange={togglePermission}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={`px-4 py-3 border-t flex items-center justify-between ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-4">
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="font-medium">{modules.length}</span> modules found
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Legend:
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Allowed
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 flex items-center gap-1">
                <XCircle className="w-3 h-3" /> Denied
              </span>
            </div>
          </div>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Role: <span className="font-medium" style={{ color: colors.primary }}>
              {roles.find(r => r.id === selectedRole)?.name || selectedRole}
            </span>
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Modules</p>
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {modules.length}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>View Allowed</p>
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {modules.filter(m => getModulePermissions(m).view).length}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Create Allowed</p>
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {modules.filter(m => getModulePermissions(m).create).length}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Full Access</p>
          <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {modules.filter(m => {
              const p = getModulePermissions(m);
              return p.view && p.create && p.edit && p.delete && p.approve;
            }).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Permissions;