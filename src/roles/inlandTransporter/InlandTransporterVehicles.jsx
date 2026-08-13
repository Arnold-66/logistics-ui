// roles/inlandTransporter/InlandTransporterVehicles.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Truck, Package, MapPin, Calendar, Clock, Eye, CheckCircle, AlertCircle,
  Search, Filter, Download, RefreshCw, Plus, X, ChevronDown, ChevronUp,
  Wrench, Fuel, Navigation, Edit, Trash2, MoreVertical, Activity,
  Award, AlertTriangle, CheckSquare, Users
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const InlandTransporterVehicles = () => {
  const navigate = useNavigate();
  const { darkMode, theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedVehicle, setExpandedVehicle] = useState(null);

  const colors = {
    primary: theme.primary,
    primaryLight: theme.primary + 'cc', // 80% opacity
    primaryDark: theme.primary + '99',  // 60% opacity
    primaryBg: theme.primary + '20',    // 12% opacity
    primaryBgDark: theme.primary + '40', // 25% opacity
    success: theme.success || '#10b981',
    warning: theme.accent || '#f59e0b',
    danger: theme.danger || '#ef4444',
    info: '#3b82f6', // Keep as fallback or use theme.secondary
  };


  const isDark = darkMode

  const [vehicles, setVehicles] = useState([
    {
      id: 'VEH-001',
      plateNo: 'UAB 1234',
      type: '40ft Flatbed',
      model: 'Mercedes Actros',
      year: 2022,
      capacity: '25 tons',
      fuelType: 'Diesel',
      mileage: '45,230 km',
      status: 'Active',
      driverName: 'Robert Ssali',
      driverPhone: '+256 700 123456',
      lastMaintenance: '2026-07-15',
      nextMaintenance: '2026-09-15',
      insurance: 'Active',
      registration: '2026-01-15',
      color: 'White',
      assignedOrders: 3,
      rating: 4.5,
      fuelEfficiency: '8.5 km/L'
    },
    {
      id: 'VEH-002',
      plateNo: 'RAB 5678',
      type: '20ft Container Truck',
      model: 'Scania R450',
      year: 2021,
      capacity: '15 tons',
      fuelType: 'Diesel',
      mileage: '67,890 km',
      status: 'Active',
      driverName: 'Jean Pierre',
      driverPhone: '+250 788 123456',
      lastMaintenance: '2026-06-20',
      nextMaintenance: '2026-09-20',
      insurance: 'Active',
      registration: '2025-12-10',
      color: 'Blue',
      assignedOrders: 2,
      rating: 4.2,
      fuelEfficiency: '7.8 km/L'
    },
    {
      id: 'VEH-003',
      plateNo: 'KAB 9012',
      type: 'Refrigerated Truck',
      model: 'Volvo FH',
      year: 2023,
      capacity: '12 tons',
      fuelType: 'Diesel',
      mileage: '23,450 km',
      status: 'Maintenance',
      driverName: 'Michael Ochieng',
      driverPhone: '+254 722 123456',
      lastMaintenance: '2026-08-01',
      nextMaintenance: '2026-10-01',
      insurance: 'Active',
      registration: '2026-03-20',
      color: 'Silver',
      assignedOrders: 1,
      rating: 4.7,
      fuelEfficiency: '6.2 km/L'
    },
    {
      id: 'VEH-004',
      plateNo: 'UAB 7890',
      type: '20ft Container Truck',
      model: 'MAN TGS',
      year: 2020,
      capacity: '15 tons',
      fuelType: 'Diesel',
      mileage: '89,120 km',
      status: 'Active',
      driverName: 'David Okello',
      driverPhone: '+256 700 789012',
      lastMaintenance: '2026-07-01',
      nextMaintenance: '2026-10-01',
      insurance: 'Active',
      registration: '2025-09-05',
      color: 'Red',
      assignedOrders: 4,
      rating: 4.0,
      fuelEfficiency: '7.5 km/L'
    },
    {
      id: 'VEH-005',
      plateNo: 'UAB 3456',
      type: 'Tanker',
      model: 'Scania R500',
      year: 2022,
      capacity: '20 tons',
      fuelType: 'Diesel',
      mileage: '34,560 km',
      status: 'Inactive',
      driverName: 'Unassigned',
      driverPhone: '-',
      lastMaintenance: '2026-06-30',
      nextMaintenance: '2026-09-30',
      insurance: 'Expired',
      registration: '2025-11-15',
      color: 'White',
      assignedOrders: 0,
      rating: null,
      fuelEfficiency: '5.5 km/L'
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Active': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Maintenance': { bg: colors.warning + '20', color: colors.warning, icon: Wrench },
      'Inactive': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle }
    };
    return statusMap[status] || { bg: colors.primary + '20', color: colors.primary, icon: Clock };
  };

  // Navigation handlers
  const handleViewDetails = (vehicleId) => {
    navigate(`/inland-transporter/vehicle/${vehicleId}`);
  };

  const handleEditVehicle = (vehicleId) => {
    navigate(`/inland-transporter/vehicle/edit/${vehicleId}`);
  };

  const handleMaintenance = (vehicleId) => {
    navigate(`/inland-transporter/vehicle/${vehicleId}?tab=maintenance`);
  };

  const handleAddVehicle = () => {
    navigate('/inland-transporter/vehicle/new');
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.plateNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading vehicles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Vehicle Management
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage your fleet of vehicles and drivers
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
              onClick={handleAddVehicle}
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Vehicles</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicles.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {vehicles.filter(v => v.status === 'Active').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Maintenance</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {vehicles.filter(v => v.status === 'Maintenance').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" style={{ color: colors.danger }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Inactive</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {vehicles.filter(v => v.status === 'Inactive').length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by plate no, type, model, or driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              className={`p-2 rounded-lg border transition-colors ${
                isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => {
            const statusStyle = getStatusBadge(vehicle.status);
            const StatusIcon = statusStyle.icon;
            const isExpanded = expandedVehicle === vehicle.id;

            return (
              <div
                key={vehicle.id}
                className={`rounded-lg transition-all duration-200 hover:shadow-lg ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                }`}
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {vehicle.plateNo}
                        </h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {vehicle.type} • {vehicle.model}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                      style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                      <StatusIcon className="w-3 h-3" />
                      {vehicle.status}
                    </span>
                  </div>

                  {/* Quick Info */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {vehicle.driverName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {vehicle.fuelEfficiency} • {vehicle.fuelType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        Next Maint: {vehicle.nextMaintenance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className="w-3 h-3" style={{ color: colors.primary }} />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {vehicle.mileage} • {vehicle.capacity}
                      </span>
                    </div>
                    {vehicle.rating && (
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-3 h-3" style={{ color: colors.primary }} />
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          Rating: {vehicle.rating} ⭐
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-3 border-t flex items-center justify-between"
                    style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <div className="flex gap-1">
                      {/* View Details Button */}
                      <button
                        onClick={() => handleViewDetails(vehicle.id)}
                        className={`p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                      </button>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditVehicle(vehicle.id)}
                        className={`p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" style={{ color: colors.primary }} />
                      </button>
                      {/* Maintenance Button */}
                      <button
                        onClick={() => handleMaintenance(vehicle.id)}
                        className={`p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                        title="Maintenance"
                      >
                        <Wrench className="w-4 h-4" style={{ color: colors.primary }} />
                      </button>
                    </div>
                    <button
                      onClick={() => setExpandedVehicle(isExpanded ? null : vehicle.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      style={{ color: colors.primary }}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t space-y-2"
                      style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Year</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.year}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Color</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.color}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Insurance</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.insurance}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Registration</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.registration}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver Phone</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.driverPhone}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Assigned Orders</p>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.assignedOrders}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredVehicles.length === 0 && (
          <div className={`p-8 text-center rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <Truck className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
            <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No vehicles found
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InlandTransporterVehicles;