// roles/admin/Roles.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import {
  Shield,
  ShieldPlus,
  ShieldCheck,
  Users as UsersIcon,
  Edit,
  Trash2,
  Key,
  Plus,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';

const Roles = () => {
  const { darkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

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

  // Mock Roles Data
  const roles = [
    {
      id: 1,
      name: 'System Administrator',
      description: 'Full system access and control',
      permissionCount: 45,
      userCount: 2,
      createdDate: '2024-01-01',
      status: 'active',
      color: colors.danger,
    },
    {
      id: 2,
      name: 'Operations Manager',
      description: 'Manage all operations and logistics',
      permissionCount: 32,
      userCount: 5,
      createdDate: '2024-01-15',
      status: 'active',
      color: colors.primary,
    },
    {
      id: 3,
      name: 'Dispatcher',
      description: 'Create and manage shipments',
      permissionCount: 18,
      userCount: 8,
      createdDate: '2024-02-01',
      status: 'active',
      color: colors.info,
    },
    {
      id: 4,
      name: 'Transport Manager',
      description: 'Manage fleet and transport operations',
      permissionCount: 15,
      userCount: 3,
      createdDate: '2024-02-15',
      status: 'active',
      color: colors.success,
    },
    {
      id: 5,
      name: 'Driver',
      description: 'View and update delivery status',
      permissionCount: 8,
      userCount: 12,
      createdDate: '2024-03-01',
      status: 'active',
      color: colors.warning,
    },
    {
      id: 6,
      name: 'Clearing Agent',
      description: 'Handle customs and clearance',
      permissionCount: 12,
      userCount: 4,
      createdDate: '2024-03-15',
      status: 'active',
      color: colors.info,
    },
    {
      id: 7,
      name: 'Accountant',
      description: 'Manage financial transactions',
      permissionCount: 10,
      userCount: 3,
      createdDate: '2024-04-01',
      status: 'active',
      color: colors.success,
    },
    {
      id: 8,
      name: 'Viewer',
      description: 'Read-only access to reports',
      permissionCount: 5,
      userCount: 8,
      createdDate: '2024-04-15',
      status: 'inactive',
      color: colors.warning,
    },
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Role Card Component
  const RoleCard = ({ role }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      } ${isExpanded ? 'ring-1' : ''}`}
      style={{ ringColor: role.color }}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: role.color + '20' }}>
                <Shield className="w-5 h-5" style={{ color: role.color }} />
              </div>
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {role.name}
                </h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {role.description}
                </p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                role.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {role.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors`}
              style={{ backgroundColor: colors.primaryBg, color: colors.primary }}
            >
              {isExpanded ? 'Hide Details' : 'View Details'}
            </button>
            <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Edit className="w-4 h-4" style={{ color: isDark ? '#9ca3af' : '#6b7280' }} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className={`mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4 ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Permissions
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {role.permissionCount}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Users
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {role.userCount}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Created
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {role.createdDate}
              </p>
            </div>
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Status
              </p>
              <span className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                role.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {role.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {role.status}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Roles
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage roles and their permissions
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          <ShieldPlus className="w-4 h-4" />
          New Role
        </button>
      </div>

      {/* Search */}
      <div className={`rounded-lg p-4 transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search roles by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="flex items-center gap-2">
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {filteredRoles.length} roles found
            </span>
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRoles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRoles.length === 0 && (
        <div className={`text-center py-12 rounded-lg ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#9ca3af' : '#6b7280' }} />
          <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No roles found
          </h3>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Try adjusting your search or create a new role
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2"
            style={{ backgroundColor: colors.primary }}
          >
            <ShieldPlus className="w-4 h-4" />
            Create Role
          </button>
        </div>
      )}
    </div>
  );
};

export default Roles;