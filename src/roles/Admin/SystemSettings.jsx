// roles/admin/SystemSettings.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/themeContext';
import {
  Settings,
  Globe,
  Clock,
  Calendar,
  Mail,
  Smartphone,
  Lock,
  Shield,
  Key,
  Save,
  RefreshCw,
  Upload,
  Image,
  Building2,
  MapPin,
  Phone,
  CreditCard,
  DollarSign,
  Bell,
  BellRing,
  BellOff,
  Zap,
  Database,
  Server,
  Cloud,
  Link
} from 'lucide-react';

const SystemSettings = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

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

  // Settings tabs
  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'backup', label: 'Backup', icon: Database },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          System Settings
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Configure system-wide settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className={`rounded-lg p-1 flex overflow-x-auto transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'text-white'
                  : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                backgroundColor: isActive ? colors.primary : 'transparent'
              }}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
      }`}>
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                General Settings
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Basic application settings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Application Name
                </label>
                <input
                  type="text"
                  defaultValue="LogiSolutions"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
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
                />
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Logo
                </label>
                <div className={`flex items-center gap-4 p-4 rounded-lg border-2 border-dashed ${
                  isDark ? 'border-gray-600' : 'border-gray-300'
                }`}>
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primaryBg }}>
                    <Image className="w-8 h-8" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white`}
                      style={{ backgroundColor: colors.primary }}>
                      <Upload className="w-4 h-4 inline mr-2" />
                      Upload Logo
                    </button>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Recommended: 200x200 PNG
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Timezone
                </label>
                <select className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}>
                  <option>Africa/Kampala</option>
                  <option>Africa/Nairobi</option>
                  <option>Africa/Dar es Salaam</option>
                  <option>UTC</option>
                </select>
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Date Format
                </label>
                <select className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}>
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Currency
                </label>
                <select className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}>
                  <option>UGX - Uganda Shilling</option>
                  <option>KES - Kenyan Shilling</option>
                  <option>TZS - Tanzanian Shilling</option>
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                </select>
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Language
                </label>
                <select className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}>
                  <option>English</option>
                  <option>Swahili</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Company Settings */}
        {activeTab === 'company' && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Company Profile
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Your company information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="LogiSolutions Ltd"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Registration Number
                </label>
                <input
                  type="text"
                  defaultValue="REG-2024-001"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              <div className="md:col-span-2">
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Address
                </label>
                <textarea
                  rows={3}
                  defaultValue="Plot 123, Kampala Road, Kampala, Uganda"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone
                </label>
                <input
                  type="text"
                  defaultValue="+256 701 234 567"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="info@logisolutions.com"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tax ID
                </label>
                <input
                  type="text"
                  defaultValue="TIN-123456789"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Notification Settings
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Configure email and SMS notifications
              </p>
            </div>

            <div className="space-y-4">
              <div className={`flex items-center justify-between p-4 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: colors.primary }} />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Email Notifications
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Send notifications via email
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:border-transparent"
                    style={{ backgroundColor: isDark ? '#4b5563' : '#d1d5db' }}
                    onChange={(e) => {
                      e.currentTarget.style.backgroundColor = e.target.checked ? colors.primary : (isDark ? '#4b5563' : '#d1d5db');
                    }}
                  />
                </label>
              </div>

              <div className={`flex items-center justify-between p-4 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5" style={{ color: colors.primary }} />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      SMS Notifications
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Send notifications via SMS
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:border-transparent"
                    style={{ backgroundColor: isDark ? '#4b5563' : '#d1d5db' }}
                    onChange={(e) => {
                      e.currentTarget.style.backgroundColor = e.target.checked ? colors.primary : (isDark ? '#4b5563' : '#d1d5db');
                    }}
                  />
                </label>
              </div>

              <div className={`flex items-center justify-between p-4 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" style={{ color: colors.primary }} />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Push Notifications
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      In-app notifications
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:border-transparent"
                    style={{ backgroundColor: isDark ? '#4b5563' : '#d1d5db' }}
                    onChange={(e) => {
                      e.currentTarget.style.backgroundColor = e.target.checked ? colors.primary : (isDark ? '#4b5563' : '#d1d5db');
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Security Settings
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Configure security and access controls
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password Policy
                </label>
                <select className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}>
                  <option>Minimum 8 characters</option>
                  <option>Minimum 12 characters with special characters</option>
                  <option>Minimum 16 characters with special characters and numbers</option>
                </select>
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Session Timeout
                </label>
                <select className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>8 hours</option>
                  <option>Never</option>
                </select>
              </div>

              <div className={`flex items-center justify-between p-4 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" style={{ color: colors.primary }} />
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Two-Factor Authentication
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Require 2FA for all users
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:border-transparent"
                    style={{ backgroundColor: isDark ? '#4b5563' : '#d1d5db' }}
                    onChange={(e) => {
                      e.currentTarget.style.backgroundColor = e.target.checked ? colors.primary : (isDark ? '#4b5563' : '#d1d5db');
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Integrations */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Integrations
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Connect with third-party services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border-2 ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                      <Globe className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Google Maps API
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Location and routing
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700`}>
                    Connected
                  </span>
                </div>
                <button className="mt-3 text-xs font-medium hover:underline" style={{ color: colors.primary }}>
                  Configure
                </button>
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                      <CreditCard className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Payment Gateway
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Online payments
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700`}>
                    Pending
                  </span>
                </div>
                <button className="mt-3 text-xs font-medium hover:underline" style={{ color: colors.primary }}>
                  Configure
                </button>
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                      <Mail className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Email SMTP
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Email notifications
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700`}>
                    Connected
                  </span>
                </div>
                <button className="mt-3 text-xs font-medium hover:underline" style={{ color: colors.primary }}>
                  Configure
                </button>
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primaryBg }}>
                      <Smartphone className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        SMS Gateway
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        SMS notifications
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700`}>
                    Disconnected
                  </span>
                </div>
                <button className="mt-3 text-xs font-medium hover:underline" style={{ color: colors.primary }}>
                  Configure
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Backup */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Backup & Maintenance
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Manage database backups and system maintenance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Database Backup
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Last backup: 2024-12-29 02:00 AM
                </p>
                <div className="flex gap-2 mt-3">
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90`}
                    style={{ backgroundColor: colors.primary }}>
                    <Database className="w-4 h-4 inline mr-2" />
                    Create Backup
                  </button>
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}>
                    <RefreshCw className="w-4 h-4 inline mr-2" />
                    Restore
                  </button>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  System Cache
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Clear cached data to improve performance
                </p>
                <button className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90`}
                  style={{ backgroundColor: colors.warning }}>
                  <Zap className="w-4 h-4 inline mr-2" />
                  Clear Cache
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                System Health
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>CPU Usage</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>32%</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Memory Usage</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>4.2 GB</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Disk Space</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>245 GB</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Uptime</p>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>28 days</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className={`mt-6 pt-6 border-t flex justify-end ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ backgroundColor: colors.primary }}
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;