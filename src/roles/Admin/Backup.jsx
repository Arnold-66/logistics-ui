// roles/admin/Backup.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import {
  HardDrive,
  Database,
  Server,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  Cloud,
  Zap,
  Activity,
  FileArchive,
  Calendar,
  ChevronRight,
  Plus,
  MoreVertical
} from 'lucide-react';

const Backup = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isBackingUp, setIsBackingUp] = useState(false);

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

  // Backup data
  const backups = [
    {
      id: 1,
      name: 'Full System Backup',
      type: 'Full',
      size: '2.4 GB',
      date: '2024-12-29 02:00 AM',
      status: 'success',
      duration: '12 min 34 sec',
      location: 'Local Storage',
    },
    {
      id: 2,
      name: 'Database Backup',
      type: 'Database',
      size: '850 MB',
      date: '2024-12-28 02:00 AM',
      status: 'success',
      duration: '5 min 12 sec',
      location: 'Local Storage',
    },
    {
      id: 3,
      name: 'Full System Backup',
      type: 'Full',
      size: '2.3 GB',
      date: '2024-12-27 02:00 AM',
      status: 'success',
      duration: '11 min 45 sec',
      location: 'Cloud Storage',
    },
    {
      id: 4,
      name: 'Database Backup',
      type: 'Database',
      size: '820 MB',
      date: '2024-12-26 02:00 AM',
      status: 'warning',
      duration: '6 min 20 sec',
      location: 'Local Storage',
    },
    {
      id: 5,
      name: 'Full System Backup',
      type: 'Full',
      size: '2.2 GB',
      date: '2024-12-25 02:00 AM',
      status: 'failed',
      duration: '3 min 45 sec',
      location: 'Local Storage',
    },
  ];

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
    }, 3000);
  };

  const getStatusBadge = (status) => {
    const configs = {
      success: { color: colors.success, label: 'Success', icon: CheckCircle },
      warning: { color: colors.warning, label: 'Warning', icon: AlertCircle },
      failed: { color: colors.danger, label: 'Failed', icon: AlertCircle },
    };
    const config = configs[status] || configs.success;
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 w-fit`}
        style={{ backgroundColor: config.color + '20', color: config.color }}>
        <config.icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Backup & Maintenance
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage system backups and perform maintenance tasks
          </p>
        </div>
        <button
          onClick={handleBackup}
          disabled={isBackingUp}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg ${
            isBackingUp ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ backgroundColor: colors.primary }}
        >
          {isBackingUp ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <HardDrive className="w-4 h-4" />
          )}
          {isBackingUp ? 'Creating Backup...' : 'Create Backup'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <Database className="w-5 h-5" style={{ color: colors.primary }} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Last 7 days
            </span>
          </div>
          <p className={`text-xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {backups.length}
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Total Backups
          </p>
        </div>

        <div className={`p-4 rounded-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Successful
            </span>
          </div>
          <p className={`text-xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {backups.filter(b => b.status === 'success').length}
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Successful backups
          </p>
        </div>

        <div className={`p-4 rounded-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <HardDrive className="w-5 h-5" style={{ color: colors.warning }} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Total Size
            </span>
          </div>
          <p className={`text-xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            8.6 GB
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            All backups
          </p>
        </div>

        <div className={`p-4 rounded-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <Shield className="w-5 h-5" style={{ color: colors.info }} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Status
            </span>
          </div>
          <p className={`text-xl font-bold mt-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.success }}></span>
            Healthy
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            System running normally
          </p>
        </div>
      </div>

      {/* Backup List */}
      <div className={`rounded-lg overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          <div className="flex items-center gap-2">
            <FileArchive className="w-5 h-5" style={{ color: colors.primary }} />
            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Backup History
            </h2>
            <span className={`text-xs px-2 py-0.5 rounded-full`}
              style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
              {backups.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Backup Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Location
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {backups.map((backup) => (
                <tr key={backup.id} className={`transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileArchive className="w-4 h-4" style={{ color: colors.primary }} />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {backup.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full`}
                      style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {backup.size}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" style={{ color: isDark ? '#9ca3af' : '#6b7280' }} />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {backup.date}
                      </span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Duration: {backup.duration}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(backup.status)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {backup.location}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className={`p-1.5 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                      }`}>
                        <Download className="w-4 h-4" />
                      </button>
                      <button className={`p-1.5 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                      }`}>
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className={`p-1.5 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-red-900 text-red-400' : 'hover:bg-red-100 text-red-500'
                      }`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
              <Zap className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Clear Cache
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Remove temporary files
              </p>
            </div>
          </div>
          <button className={`mt-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white`}
            style={{ backgroundColor: colors.warning }}>
            Clear Cache
          </button>
        </div>

        <div className={`p-4 rounded-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
              <Activity className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                System Health
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Run diagnostics
              </p>
            </div>
          </div>
          <button className={`mt-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white`}
            style={{ backgroundColor: colors.info }}>
            Run Check
          </button>
        </div>

        <div className={`p-4 rounded-lg transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
              <Cloud className="w-5 h-5" style={{ color: colors.primary }} />
            </div>
            <div>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Cloud Sync
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Sync to cloud storage
              </p>
            </div>
          </div>
          <button className={`mt-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white`}
            style={{ backgroundColor: colors.primary }}>
            Sync Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Backup;