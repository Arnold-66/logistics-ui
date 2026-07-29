// roles/admin/AdminDashboard.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import {
  Users,
  Shield,
  Key,
  Building2,
  Settings,
  Activity,
  HardDrive,
  UserPlus,
  UserCheck,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Database,
  Globe,
  Mail,
  Smartphone,
  Workflow,
  FileText,
  Package,
  Ship,
  Truck,
  Calendar,
  ChevronRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Eye,
  MoreVertical
} from 'lucide-react';

const AdminDashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

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

  // Stats
  const stats = [
    { label: 'Total Users', value: '45', icon: Users, change: '+5', status: 'positive', color: colors.primary },
    { label: 'Active Roles', value: '12', icon: Shield, change: '+2', status: 'positive', color: colors.info },
    { label: 'Shipments Today', value: '86', icon: Ship, change: '+12', status: 'positive', color: colors.success },
    { label: 'System Status', value: 'Online', icon: Server, change: '100%', status: 'positive', color: colors.warning },
  ];

  // Recent Activity
  const recentActivity = [
    { user: 'Arnold Admin', action: 'created user "John Driver"', time: '10:30 AM', icon: UserPlus, color: colors.primary },
    { user: 'Sarah', action: 'approved Shipment #10045', time: '11:15 AM', icon: CheckCircle, color: colors.success },
    { user: 'Admin', action: 'changed Dispatcher permissions', time: '12:00 PM', icon: Key, color: colors.warning },
    { user: 'John', action: 'updated shipment status', time: '1:30 PM', icon: Ship, color: colors.info },
    { user: 'Mary', action: 'generated invoice #INV-2024-001', time: '2:15 PM', icon: FileText, color: colors.primary },
  ];

  // System Health
  const systemHealth = [
    { name: 'Database', status: 'healthy', uptime: '99.9%', icon: Database },
    { name: 'API Server', status: 'healthy', uptime: '99.8%', icon: Server },
    { name: 'Email Service', status: 'warning', uptime: '95.0%', icon: Mail },
    { name: 'SMS Gateway', status: 'healthy', uptime: '98.5%', icon: Smartphone },
  ];

  // Quick Actions
  const quickActions = [
    { label: 'Add User', icon: UserPlus, color: colors.primary },
    { label: 'Create Role', icon: Shield, color: colors.info },
    { label: 'Backup System', icon: HardDrive, color: colors.warning },
    { label: 'View Logs', icon: Activity, color: colors.danger },
  ];

  // Recent Users
  const recentUsers = [
    { name: 'John Dispatcher', email: 'john@logisolutions.com', role: 'Dispatcher', status: 'active', lastLogin: '2 hours ago' },
    { name: 'Mary Accountant', email: 'mary@logisolutions.com', role: 'Accountant', status: 'active', lastLogin: '5 hours ago' },
    { name: 'Peter Driver', email: 'peter@logisolutions.com', role: 'Driver', status: 'inactive', lastLogin: '2 days ago' },
    { name: 'Sarah Manager', email: 'sarah@logisolutions.com', role: 'Manager', status: 'active', lastLogin: '1 hour ago' },
  ];

  // Stat Card
  const StatCard = ({ label, value, icon: Icon, change, status, color }) => (
    <div className={`p-4 md:p-6 rounded-lg transition-all duration-300 hover:shadow-xl ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
    }`}>
      <div className="flex items-center justify-between">
        <div className={`p-2 md:p-3 rounded-lg`} style={{ backgroundColor: color + '20' }}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: color }} />
        </div>
        {change && (
          <span className={`text-xs md:text-sm font-medium flex items-center gap-1 ${
            status === 'positive' ? 'text-green-500' : 'text-red-500'
          }`}>
            {status === 'positive' ? <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" /> : <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4" />}
            {change}
          </span>
        )}
      </div>
      <h3 className={`text-xl md:text-2xl font-bold mt-3 md:mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </h3>
      <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {label}
      </p>
    </div>
  );

  // Activity Item
  const ActivityItem = ({ user, action, time, icon: Icon, color }) => (
    <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
    }`}>
      <div className="p-2 rounded-full flex-shrink-0" style={{ backgroundColor: color + '20' }}>
        <Icon className="w-4 h-4" style={{ color: color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <span className="font-semibold">{user}</span> {action}
        </p>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {time}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome, Admin! 👋
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Here's your system overview and administration dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" style={{ color: colors.primary }} />
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Activity
                </h2>
                <span className={`text-xs px-2 py-0.5 rounded-full`}
                  style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                  {recentActivity.length}
                </span>
              </div>
              <button className={`text-xs font-medium transition-colors hover:underline`}
                style={{ color: colors.primary }}>
                View All
              </button>
            </div>
            <div className="space-y-1">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="p-2 rounded-lg" style={{ backgroundColor: action.color + '20' }}>
                    <action.icon className="w-5 h-5" style={{ color: action.color }} />
                  </div>
                  <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* System Health */}
          <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5" style={{ color: colors.primary }} />
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                System Health
              </h2>
            </div>
            <div className="space-y-3">
              {systemHealth.map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Uptime: {item.uptime}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === 'healthy' ? 'bg-green-100 text-green-700' :
                    item.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" style={{ color: colors.primary }} />
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Recent Users
                </h2>
              </div>
              <button className={`text-xs font-medium transition-colors hover:underline`}
                style={{ color: colors.primary }}>
                View All
              </button>
            </div>
            <div className="space-y-2">
              {recentUsers.map((user, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ backgroundColor: colors.primary }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {user.name}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {user.status}
                    </span>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.lastLogin}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;