// roles/admin/AuditLogs.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import {
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw,
  User,
  Ship,
  Truck,
  FileText,
  Users,
  Settings,
  Shield,
  Key,
  Calendar,
  Clock,
  Eye,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const AuditLogs = () => {
  const { darkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');
  const [dateRange, setDateRange] = useState('today');

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

  // Mock Audit Logs Data
  const auditLogs = [
    {
      id: 1,
      user: 'Arnold Admin',
      action: 'Created User',
      module: 'Users',
      recordId: 'USR-001',
      timestamp: '2024-12-29 10:30:00',
      oldValue: null,
      newValue: 'John Driver',
      type: 'create',
      icon: Users,
      color: colors.success,
    },
    {
      id: 2,
      user: 'John Dispatcher',
      action: 'Updated Shipment',
      module: 'Shipments',
      recordId: 'SHP-458',
      timestamp: '2024-12-29 11:15:00',
      oldValue: 'Status: In Transit',
      newValue: 'Status: Delivered',
      type: 'update',
      icon: Ship,
      color: colors.warning,
    },
    {
      id: 3,
      user: 'Sarah Manager',
      action: 'Approved Invoice',
      module: 'Invoices',
      recordId: 'INV-2024-001',
      timestamp: '2024-12-29 12:00:00',
      oldValue: 'Status: Pending',
      newValue: 'Status: Approved',
      type: 'approve',
      icon: FileText,
      color: colors.primary,
    },
    {
      id: 4,
      user: 'Admin',
      action: 'Changed Permissions',
      module: 'Permissions',
      recordId: 'ROLE-003',
      timestamp: '2024-12-29 12:45:00',
      oldValue: 'Dispatcher: Can Edit Shipments',
      newValue: 'Dispatcher: Can View Shipments',
      type: 'update',
      icon: Key,
      color: colors.info,
    },
    {
      id: 5,
      user: 'Mary Accountant',
      action: 'Deleted Document',
      module: 'Documents',
      recordId: 'DOC-045',
      timestamp: '2024-12-29 13:30:00',
      oldValue: 'Commercial Invoice #001',
      newValue: null,
      type: 'delete',
      icon: FileText,
      color: colors.danger,
    },
    {
      id: 6,
      user: 'Peter Driver',
      action: 'Updated Delivery Status',
      module: 'Shipments',
      recordId: 'SHP-462',
      timestamp: '2024-12-29 14:15:00',
      oldValue: 'Status: In Transit',
      newValue: 'Status: Delivered',
      type: 'update',
      icon: Truck,
      color: colors.warning,
    },
    {
      id: 7,
      user: 'Arnold Admin',
      action: 'Reset Password',
      module: 'Users',
      recordId: 'USR-005',
      timestamp: '2024-12-29 15:00:00',
      oldValue: null,
      newValue: 'Password reset for Sarah Manager',
      type: 'create',
      icon: Users,
      color: colors.info,
    },
    {
      id: 8,
      user: 'John Dispatcher',
      action: 'Created Shipment',
      module: 'Shipments',
      recordId: 'SHP-463',
      timestamp: '2024-12-29 15:45:00',
      oldValue: null,
      newValue: 'Shipment #463 created',
      type: 'create',
      icon: Ship,
      color: colors.success,
    },
  ];

  const modules = ['All', 'Users', 'Shipments', 'Vehicles', 'Documents', 'Invoices', 'Permissions', 'Settings'];
  const actions = ['All', 'Create', 'Update', 'Delete', 'Approve', 'View'];
  const users = ['All', 'Arnold Admin', 'John Dispatcher', 'Mary Accountant', 'Peter Driver', 'Sarah Manager'];

  const getActionColor = (type) => {
    switch(type) {
      case 'create': return colors.success;
      case 'update': return colors.warning;
      case 'delete': return colors.danger;
      case 'approve': return colors.primary;
      default: return colors.info;
    }
  };

  const getActionLabel = (type) => {
    switch(type) {
      case 'create': return 'Created';
      case 'update': return 'Updated';
      case 'delete': return 'Deleted';
      case 'approve': return 'Approved';
      default: return 'Action';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recordId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = selectedUser === 'all' || log.user === selectedUser;
    const matchesModule = selectedModule === 'all' || log.module === selectedModule;
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    return matchesSearch && matchesUser && matchesModule && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Audit Logs
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Track all system activities and changes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className={`p-2 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-lg p-4 transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>

          {/* User Filter */}
          <div>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm appearance-none ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              {users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          {/* Module Filter */}
          <div>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm appearance-none ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              {modules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>

          {/* Action Filter */}
          <div>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm appearance-none ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              {actions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className={`rounded-lg overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Module
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Record
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Time
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredLogs.map((log) => {
                const Icon = log.icon || Activity;
                const actionColor = getActionColor(log.type);
                
                return (
                  <tr key={log.id} className={`transition-colors ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                          style={{ backgroundColor: colors.primary }}>
                          {log.user.charAt(0)}
                        </div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {log.user}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full`}
                        style={{ backgroundColor: actionColor + '20', color: actionColor }}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: colors.primary }} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {log.module}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {log.recordId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        {log.oldValue && (
                          <div className="flex items-center gap-1 text-xs">
                            <XCircle className="w-3 h-3 text-red-500" />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              Old: {log.oldValue}
                            </span>
                          </div>
                        )}
                        {log.newValue && (
                          <div className="flex items-center gap-1 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              New: {log.newValue}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" style={{ color: isDark ? '#9ca3af' : '#6b7280' }} />
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {log.timestamp}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={`px-4 py-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredLogs.length} of {auditLogs.length} logs
          </p>
          <div className="flex items-center gap-2">
            <button className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              isDark 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              Previous
            </button>
            <button className={`px-3 py-1 rounded-lg text-sm text-white`}
              style={{ backgroundColor: colors.primary }}>
              1
            </button>
            <button className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              isDark 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              2
            </button>
            <button className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              isDark 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              3
            </button>
            <button className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              isDark 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;