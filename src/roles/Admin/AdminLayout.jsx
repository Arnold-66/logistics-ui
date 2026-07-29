// roles/admin/AdminLayout.jsx
import React, { useState, useContext } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  Building2,
  Settings,
  Bell,
  Activity,
  HardDrive,
  Server,
  Database,
  UserCog,
  Lock,
  FileCheck,
  Globe,
  Mail,
  Smartphone,
  Workflow,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  User,
  Home
} from 'lucide-react';

const AdminLayout = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const colors = {
    primary: '#6b4c7a',
    primaryLight: '#8a5f7e',
    primaryDark: '#5a3a52',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
  };

  const isDark = darkMode;

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Roles', icon: Shield, path: '/admin/roles' },
    { name: 'Permissions', icon: Key, path: '/admin/permissions' },
    { name: 'Departments', icon: Building2, path: '/admin/departments' },
    { name: 'System Settings', icon: Settings, path: '/admin/settings' },
    { name: 'Integrations', icon: Globe, path: '/admin/integrations' },
    { name: 'Audit Logs', icon: Activity, path: '/admin/audit-logs' },
    { name: 'Backup & Maintenance', icon: HardDrive, path: '/admin/backup' },
  ];

  const toggleTheme = () => {
    setDarkMode(!isDark);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex lg:flex-col w-64 fixed h-full transition-all duration-300 ${
        isDark ? 'bg-gray-900 border-r border-gray-700' : 'bg-white border-r border-gray-200'
      }`}>
        <div className="p-4 border-b" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                LogiSolutions
              </h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Administration
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                             (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                      isActive
                        ? 'text-white'
                        : isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: isActive ? colors.primary : 'transparent'
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: colors.primary }}>
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Admin User
              </p>
              <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                admin@logisolutions.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className={`sticky top-0 z-40 ${
          isDark ? 'bg-gray-900 border-b border-gray-700' : 'bg-white border-b border-gray-200'
        }`}>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-600'}`} />
              </button>
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                <Bell className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-600'}`} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.primary }} />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: colors.primary }}>
                    A
                  </div>
                  <ChevronDown className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-600'}`} />
                </button>

                {isProfileOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl border overflow-hidden z-50 ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}>
                    <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Admin User
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        admin@logisolutions.com
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/"
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors w-full ${
                          isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        Home
                      </Link>
                      <Link
                        to="/admin/settings"
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors w-full ${
                          isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <hr className={`my-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                      <button
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <aside className={`w-64 h-full overflow-y-auto ${
            isDark ? 'bg-gray-900' : 'bg-white'
          }`} onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    LogiSolutions
                  </h1>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Administration
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-600'}`} />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                                 (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
                  return (
                    <li key={item.name}>
                      <Link                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                          isActive
                            ? 'text-white'
                            : isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: isActive ? colors.primary : 'transparent'
                        }}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: colors.primary }}>
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Admin User
                  </p>
                  <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    admin@logisolutions.com
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;