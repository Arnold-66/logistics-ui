// roles/admin/Users.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import {
  Users as UsersIcon,  // Renamed to UsersIcon
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Key,
  Lock,
  Mail,
  Phone,
  Calendar,
  Clock,
  Eye,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Shield,
  Building2,
  UserCog
} from 'lucide-react';

const Users = () => {
  const { darkMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  // Mock Users Data
  const users = [
    {
      id: 1,
      firstName: 'Arnold',
      lastName: 'Admin',
      email: 'arnold@logisolutions.com',
      phone: '+256 701 234 567',
      status: 'active',
      roles: ['System Administrator'],
      branch: 'Kampala Office',
      createdDate: '2024-01-15',
      lastLogin: '2024-12-29 10:30 AM',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Dispatcher',
      email: 'john@logisolutions.com',
      phone: '+256 702 345 678',
      status: 'active',
      roles: ['Dispatcher'],
      branch: 'Nairobi Office',
      createdDate: '2024-02-20',
      lastLogin: '2024-12-29 08:15 AM',
    },
    {
      id: 3,
      firstName: 'Mary',
      lastName: 'Accountant',
      email: 'mary@logisolutions.com',
      phone: '+256 703 456 789',
      status: 'active',
      roles: ['Accountant'],
      branch: 'Kampala Office',
      createdDate: '2024-03-10',
      lastLogin: '2024-12-28 04:45 PM',
    },
    {
      id: 4,
      firstName: 'Peter',
      lastName: 'Driver',
      email: 'peter@logisolutions.com',
      phone: '+256 704 567 890',
      status: 'inactive',
      roles: ['Driver'],
      branch: 'Mombasa Office',
      createdDate: '2024-04-05',
      lastLogin: '2024-12-20 09:00 AM',
    },
    {
      id: 5,
      firstName: 'Sarah',
      lastName: 'Manager',
      email: 'sarah@logisolutions.com',
      phone: '+256 705 678 901',
      status: 'active',
      roles: ['Operations Manager'],
      branch: 'Kampala Office',
      createdDate: '2024-01-01',
      lastLogin: '2024-12-29 11:45 AM',
    },
  ];

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All Users' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  const getStatusColor = (status) => {
    return status === 'active' ? colors.success : colors.danger;
  };

  const getStatusBadge = (status) => {
    const color = getStatusColor(status);
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit`}
        style={{ backgroundColor: color + '20', color: color }}>
        {status === 'active' ? <CheckCircle className="w-3 h-3" /> : <X className="w-3 h-3" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Users
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage users who can access the system
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          <UserPlus className="w-4 h-4" />
          New User
        </button>
      </div>

      {/* Filters */}
      <div className={`rounded-lg p-4 transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search users by name or email..."
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

          {/* Filter Dropdown */}
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={`appearance-none px-4 py-2 pr-8 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
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
                {filterOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`} />
            </div>

            <button
              className={`p-2 rounded-lg border transition-all duration-200 ${
                isDark 
                  ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
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
                  Email / Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Roles
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Branch
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Last Login
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                        style={{ backgroundColor: colors.primary }}>
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {user.firstName} {user.lastName}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Joined {user.createdDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {user.email}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role, index) => (
                        <span key={index} className={`text-xs px-2 py-0.5 rounded-full`}
                          style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user.branch}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" style={{ color: isDark ? '#9ca3af' : '#6b7280' }} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {user.lastLogin}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" style={{ color: isDark ? '#9ca3af' : '#6b7280' }} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <Edit className="w-4 h-4" style={{ color: isDark ? '#9ca3af' : '#6b7280' }} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className={`px-4 py-3 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredUsers.length} of {users.length} users
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

export default Users;