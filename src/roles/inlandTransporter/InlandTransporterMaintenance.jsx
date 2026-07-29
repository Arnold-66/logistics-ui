// roles/inlandTransporter/InlandTransporterMaintenance.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  Truck, Package, MapPin, Calendar, Clock, Eye, CheckCircle, AlertCircle,
  Search, Filter, Download, RefreshCw, Plus, X, ChevronDown, ChevronUp,
  Wrench, Fuel, Navigation, Edit, Trash2, MoreVertical, Activity,
  Award, AlertTriangle, CheckSquare, Users, DollarSign, ClipboardList,
  FileText, Printer, Save, AlertOctagon, Gauge, Thermometer, Settings
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const InlandTransporterMaintenance = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedMaintenance, setExpandedMaintenance] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    vehicleId: '',
    vehiclePlate: '',
    type: '',
    description: '',
    date: '',
    cost: '',
    nextMaintenance: '',
    status: 'Scheduled'
  });

  const colors = {
    primary: '#714b67',
    primaryLight: '#8a5f7e',
    primaryDark: '#5a3a52',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    teal: '#14b8a6',
    indigo: '#6366f1',
    orange: '#f97316',
  };

  const isDark = darkMode

  // Available vehicles for maintenance
  const availableVehicles = [
    { id: 'VEH-001', plateNo: 'UAB 1234', type: '40ft Flatbed', status: 'Active' },
    { id: 'VEH-002', plateNo: 'RAB 5678', type: '20ft Container Truck', status: 'Active' },
    { id: 'VEH-003', plateNo: 'KAB 9012', type: 'Refrigerated Truck', status: 'Maintenance' },
    { id: 'VEH-004', plateNo: 'UAB 7890', type: '20ft Container Truck', status: 'Active' },
    { id: 'VEH-005', plateNo: 'UAB 3456', type: 'Tanker', status: 'Inactive' },
  ];

  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: 'MNT-001',
      vehicleId: 'VEH-001',
      vehiclePlate: 'UAB 1234',
      type: 'Oil Change',
      description: 'Regular oil change and filter replacement',
      date: '2026-07-15',
      cost: '450,000 UGX',
      nextMaintenance: '2026-09-15',
      status: 'Completed',
      technician: 'John Ssali',
      notes: 'Oil filter replaced, engine oil changed',
    },
    {
      id: 'MNT-002',
      vehicleId: 'VEH-001',
      vehiclePlate: 'UAB 1234',
      type: 'Tire Replacement',
      description: 'Replaced all 6 tires',
      date: '2026-06-20',
      cost: '2,500,000 UGX',
      nextMaintenance: '2026-12-20',
      status: 'Completed',
      technician: 'Peter Okello',
      notes: 'New tires installed, wheel alignment done',
    },
    {
      id: 'MNT-003',
      vehicleId: 'VEH-003',
      vehiclePlate: 'KAB 9012',
      type: 'Brake Service',
      description: 'Brake pad replacement and fluid flush',
      date: '2026-08-01',
      cost: '850,000 UGX',
      nextMaintenance: '2026-10-01',
      status: 'In Progress',
      technician: 'James Mukasa',
      notes: 'Brake pads replaced, system bleed',
    },
    {
      id: 'MNT-004',
      vehicleId: 'VEH-002',
      vehiclePlate: 'RAB 5678',
      type: 'Engine Service',
      description: 'Engine tune-up and diagnostics',
      date: '2026-08-10',
      cost: '1,200,000 UGX',
      nextMaintenance: '2026-11-10',
      status: 'Scheduled',
      technician: 'Robert Ssali',
      notes: 'Engine diagnostics and tune-up scheduled',
    },
    {
      id: 'MNT-005',
      vehicleId: 'VEH-004',
      vehiclePlate: 'UAB 7890',
      type: 'Transmission Service',
      description: 'Transmission fluid change and inspection',
      date: '2026-07-01',
      cost: '950,000 UGX',
      nextMaintenance: '2026-10-01',
      status: 'Completed',
      technician: 'David Okello',
      notes: 'Transmission fluid replaced, filter changed',
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Scheduled': { bg: colors.info + '20', color: colors.info, icon: Calendar },
      'In Progress': { bg: colors.warning + '20', color: colors.warning, icon: Wrench },
      'Completed': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Overdue': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle }
    };
    return statusMap[status] || { bg: colors.primary + '20', color: colors.primary, icon: Clock };
  };

  const handleAddMaintenance = () => {
    if (!newMaintenance.vehicleId || !newMaintenance.type || !newMaintenance.date) {
      alert('Please fill in all required fields');
      return;
    }

    const record = {
      id: `MNT-${String(maintenanceRecords.length + 1).padStart(3, '0')}`,
      ...newMaintenance,
      cost: newMaintenance.cost || 'N/A',
      status: 'Scheduled',
      technician: user?.name || 'Not Assigned',
      notes: 'Maintenance scheduled'
    };

    setMaintenanceRecords([record, ...maintenanceRecords]);
    setShowAddModal(false);
    setNewMaintenance({
      vehicleId: '',
      vehiclePlate: '',
      type: '',
      description: '',
      date: '',
      cost: '',
      nextMaintenance: '',
      status: 'Scheduled'
    });
  };

  const handleUpdateStatus = (recordId, newStatus) => {
    setMaintenanceRecords(records =>
      records.map(record =>
        record.id === recordId
          ? { ...record, status: newStatus }
          : record
      )
    );
  };

  const handleDeleteRecord = (recordId) => {
    if (window.confirm('Are you sure you want to delete this maintenance record?')) {
      setMaintenanceRecords(records => records.filter(record => record.id !== recordId));
    }
  };

  const handleSelectVehicle = (vehicleId) => {
    const vehicle = availableVehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      setNewMaintenance({
        ...newMaintenance,
        vehicleId: vehicle.id,
        vehiclePlate: vehicle.plateNo,
      });
    }
  };

  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesSearch =
      record.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.technician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading maintenance records...</p>
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
              Maintenance Management
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage vehicle maintenance and service records
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add Maintenance
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Records</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{maintenanceRecords.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {maintenanceRecords.filter(r => r.status === 'Completed').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Progress</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {maintenanceRecords.filter(r => r.status === 'In Progress').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: colors.info }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Scheduled</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {maintenanceRecords.filter(r => r.status === 'Scheduled').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: colors.danger }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Overdue</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {maintenanceRecords.filter(r => r.status === 'Overdue').length}
            </p>
          </div>
        </div>

        {/* Add Maintenance Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-2xl rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Add Maintenance Record
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Select Vehicle *
                  </label>
                  <select
                    value={newMaintenance.vehicleId}
                    onChange={(e) => handleSelectVehicle(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="">Select Vehicle</option>
                    {availableVehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.plateNo} - {vehicle.type} ({vehicle.status})
                      </option>
                    ))}
                  </select>
                </div>

                {newMaintenance.vehiclePlate && (
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Selected Vehicle: <span className="font-bold">{newMaintenance.vehiclePlate}</span>
                    </p>
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Maintenance Type *
                  </label>
                  <select
                    value={newMaintenance.type}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, type: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="">Select Type</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Tire Replacement">Tire Replacement</option>
                    <option value="Brake Service">Brake Service</option>
                    <option value="Engine Service">Engine Service</option>
                    <option value="Transmission Service">Transmission Service</option>
                    <option value="General Inspection">General Inspection</option>
                    <option value="Body Repair">Body Repair</option>
                    <option value="Electrical Service">Electrical Service</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={newMaintenance.description}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, description: e.target.value })}
                    rows="2"
                    placeholder="Describe the maintenance work..."
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newMaintenance.date}
                      onChange={(e) => setNewMaintenance({ ...newMaintenance, date: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Cost
                    </label>
                    <input
                      type="text"
                      value={newMaintenance.cost}
                      onChange={(e) => setNewMaintenance({ ...newMaintenance, cost: e.target.value })}
                      placeholder="e.g., 450,000 UGX"
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Next Maintenance Date
                  </label>
                  <input
                    type="date"
                    value={newMaintenance.nextMaintenance}
                    onChange={(e) => setNewMaintenance({ ...newMaintenance, nextMaintenance: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMaintenance}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Add Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by vehicle plate, type, or technician..."
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
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
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

        {/* Maintenance Records List */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          {filteredRecords.length === 0 ? (
            <div className="p-8 text-center">
              <Wrench className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
              <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No maintenance records found
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              {filteredRecords.map((record) => {
                const statusStyle = getStatusBadge(record.status);
                const StatusIcon = statusStyle.icon;
                const isExpanded = expandedMaintenance === record.id;

                return (
                  <div key={record.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1 cursor-pointer" onClick={() => setExpandedMaintenance(isExpanded ? null : record.id)}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <Wrench className="w-5 h-5" style={{ color: colors.primary }} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {record.type}
                              </h3>
                              <span className="text-xs text-gray-500">{record.vehiclePlate}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                <StatusIcon className="w-3 h-3" />
                                {record.status}
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {record.date} • {record.technician}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 ml-12 mt-1">
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <DollarSign className="w-3 h-3 inline mr-1" />
                            {record.cost}
                          </span>
                          {record.nextMaintenance && (
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Calendar className="w-3 h-3 inline mr-1" />
                              Next: {record.nextMaintenance}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className={`p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                          title="Edit"
                          onClick={() => navigate(`/inland-transporter/maintenance/edit/${record.id}`)}
                        >
                          <Edit className="w-4 h-4" style={{ color: colors.primary }} />
                        </button>
                        <button
                          className={`p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                          title="Delete"
                          onClick={() => handleDeleteRecord(record.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        <button
                          onClick={() => setExpandedMaintenance(isExpanded ? null : record.id)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                          style={{ color: colors.primary }}
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t space-y-3"
                        style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vehicle</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.vehiclePlate}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.date}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cost</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.cost}</p>
                          </div>
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Technician</p>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.technician}</p>
                          </div>
                        </div>

                        <div>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Description</p>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{record.description}</p>
                        </div>

                        {record.notes && (
                          <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Notes</p>
                            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{record.notes}</p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-2">
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.primary, color: 'white' }}
                            onClick={() => navigate(`/inland-transporter/vehicle/${record.vehicleId}`)}
                          >
                            <Truck className="w-4 h-4" />
                            View Vehicle
                          </button>
                          {record.status !== 'Completed' && (
                            <button
                              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                              style={{ backgroundColor: colors.success, color: 'white' }}
                              onClick={() => handleUpdateStatus(record.id, 'Completed')}
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark Complete
                            </button>
                          )}
                          <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                            style={{ borderColor: colors.primary, color: colors.primary }}
                          >
                            <Printer className="w-4 h-4" />
                            Print
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InlandTransporterMaintenance;