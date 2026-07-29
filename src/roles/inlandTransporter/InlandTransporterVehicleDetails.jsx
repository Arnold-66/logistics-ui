// roles/inlandTransporter/InlandTransporterVehicleDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Truck, Package, MapPin, Calendar, Clock, User, Building,
  Phone, Mail, FileText, Download, Edit, CheckCircle, AlertCircle,
  Navigation, Printer, CheckSquare, X, Users, ClipboardList,
  AlertTriangle, Eye, Save, TrendingUp, PhoneCall, Award, Fuel,
  Wrench, Activity, Gauge, Thermometer, Zap, Wifi, Coffee,
  Utensils, Tv, Bed, Bath, Maximize, Minimize, ZoomIn, ZoomOut,
  RotateCw, MoreVertical, Settings, Shield, AlertOctagon, Plus
} from 'lucide-react';

const InlandTransporterVehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    notes: '',
    date: ''
  });
  const [maintenanceRecord, setMaintenanceRecord] = useState({
    type: '',
    description: '',
    date: '',
    cost: '',
    nextMaintenance: ''
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

  useEffect(() => {
    setTimeout(() => {
      setVehicle({
        id: id || 'VEH-001',
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
        driverEmail: 'robert@importflow.com',
        lastMaintenance: '2026-07-15',
        nextMaintenance: '2026-09-15',
        insurance: 'Active',
        insuranceExpiry: '2026-12-31',
        registration: '2026-01-15',
        registrationExpiry: '2027-01-14',
        color: 'White',
        assignedOrders: 3,
        rating: 4.5,
        fuelEfficiency: '8.5 km/L',
        engineType: 'V8 Diesel',
        transmission: 'Automatic',
        vin: 'WDB12345678901234',
        currentLocation: 'Kampala Warehouse',
        lastTrip: 'Kampala → Mombasa',
        totalTrips: 45,
        maintenanceHistory: [
          { date: '2026-07-15', type: 'Oil Change', description: 'Regular oil change and filter replacement', cost: '450,000 UGX' },
          { date: '2026-06-20', type: 'Tire Replacement', description: 'Replaced all 6 tires', cost: '2,500,000 UGX' },
          { date: '2026-05-10', type: 'Brake Service', description: 'Brake pad replacement and fluid flush', cost: '850,000 UGX' }
        ],
        documents: [
          { name: 'Insurance Certificate', number: 'INS-2026-001', expiry: '2026-12-31' },
          { name: 'Registration', number: 'REG-2026-001', expiry: '2027-01-14' },
          { name: 'Inspection Report', number: 'INSP-2026-001', expiry: '2027-01-14' }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Active': { bg: colors.success + '20', color: colors.success, icon: CheckCircle },
      'Maintenance': { bg: colors.warning + '20', color: colors.warning, icon: Wrench },
      'Inactive': { bg: colors.danger + '20', color: colors.danger, icon: AlertCircle },
      'In Transit': { bg: colors.info + '20', color: colors.info, icon: Truck }
    };
    return statusMap[status] || { bg: colors.primary + '20', color: colors.primary, icon: Clock };
  };

  const handleStatusUpdate = () => {
    if (!statusUpdate.status) {
      alert('Please select a status');
      return;
    }
    const updatedVehicle = { ...vehicle };
    updatedVehicle.status = statusUpdate.status;
    updatedVehicle.lastUpdate = 'Just now';
    setVehicle(updatedVehicle);
    setShowStatusModal(false);
    setStatusUpdate({ status: '', notes: '', date: '' });
  };

  const handleAddMaintenance = () => {
    if (!maintenanceRecord.type || !maintenanceRecord.date) {
      alert('Please fill in all required fields');
      return;
    }
    const updatedVehicle = { ...vehicle };
    updatedVehicle.maintenanceHistory.push({
      date: maintenanceRecord.date,
      type: maintenanceRecord.type,
      description: maintenanceRecord.description || 'Maintenance performed',
      cost: maintenanceRecord.cost || 'N/A'
    });
    if (maintenanceRecord.nextMaintenance) {
      updatedVehicle.nextMaintenance = maintenanceRecord.nextMaintenance;
    }
    setVehicle(updatedVehicle);
    setShowMaintenanceModal(false);
    setMaintenanceRecord({ type: '', description: '', date: '', cost: '', nextMaintenance: '' });
  };

  const handleEditClick = () => {
    navigate(`/inland-transporter/vehicle/edit/${vehicle.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(vehicle.status);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/inland-transporter/vehicles')}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Vehicle Details
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {vehicle.plateNo} • {vehicle.model}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button 
              onClick={() => setShowStatusModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.info, color: 'white' }}
            >
              <TrendingUp className="w-4 h-4" />
              Update Status
            </button>
            <button 
              onClick={() => setShowMaintenanceModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.warning, color: 'white' }}
            >
              <Wrench className="w-4 h-4" />
              Maintenance
            </button>
            <button 
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>

        {/* Status Update Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-md rounded-lg shadow-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Update Vehicle Status
                </h3>
                <button onClick={() => setShowStatusModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status *
                  </label>
                  <select
                    value={statusUpdate.status}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={statusUpdate.date}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, date: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Notes
                  </label>
                  <textarea
                    value={statusUpdate.notes}
                    onChange={(e) => setStatusUpdate({ ...statusUpdate, notes: e.target.value })}
                    rows="3"
                    placeholder="Additional notes..."
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <button onClick={() => setShowStatusModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.primary, color: colors.primary }}>Cancel</button>
                  <button onClick={handleStatusUpdate} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: colors.primary }}><Save className="w-4 h-4 inline mr-2" />Update Status</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Modal */}
        {showMaintenanceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`w-full max-w-lg rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Add Maintenance Record</h3>
                <button onClick={() => setShowMaintenanceModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Maintenance Type *</label>
                  <select
                    value={maintenanceRecord.type}
                    onChange={(e) => setMaintenanceRecord({ ...maintenanceRecord, type: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="">Select Type</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Tire Replacement">Tire Replacement</option>
                    <option value="Brake Service">Brake Service</option>
                    <option value="Engine Service">Engine Service</option>
                    <option value="Transmission Service">Transmission Service</option>
                    <option value="General Inspection">General Inspection</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date *</label>
                  <input
                    type="date"
                    value={maintenanceRecord.date}
                    onChange={(e) => setMaintenanceRecord({ ...maintenanceRecord, date: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                  <textarea
                    value={maintenanceRecord.description}
                    onChange={(e) => setMaintenanceRecord({ ...maintenanceRecord, description: e.target.value })}
                    rows="2"
                    placeholder="Describe the maintenance work..."
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Cost</label>
                  <input
                    type="text"
                    value={maintenanceRecord.cost}
                    onChange={(e) => setMaintenanceRecord({ ...maintenanceRecord, cost: e.target.value })}
                    placeholder="e.g., 450,000 UGX"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Next Maintenance Date</label>
                  <input
                    type="date"
                    value={maintenanceRecord.nextMaintenance}
                    onChange={(e) => setMaintenanceRecord({ ...maintenanceRecord, nextMaintenance: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <button onClick={() => setShowMaintenanceModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.primary, color: colors.primary }}>Cancel</button>
                  <button onClick={handleAddMaintenance} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: colors.primary }}><Save className="w-4 h-4 inline mr-2" />Add Record</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status */}
        <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
          <div className="flex items-center gap-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2`} style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
              <StatusIcon className="w-4 h-4" />
              {vehicle.status}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Rating: <span className="font-medium" style={{ color: colors.primary }}>{vehicle.rating} ⭐</span></span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Trips: <span className="font-medium" style={{ color: colors.primary }}>{vehicle.totalTrips}</span></span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Assigned Orders: <span className="font-medium" style={{ color: colors.primary }}>{vehicle.assignedOrders}</span></span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Truck className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Vehicle Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>License Plate</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.plateNo}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Model</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.model} ({vehicle.year})</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.type}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Color</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.color}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>VIN</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.vin}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Engine</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.engineType} • {vehicle.transmission}</p></div>
              </div>
            </div>

            {/* Driver Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Driver Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver Name</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.driverName}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.driverPhone}</p></div>
                <div className="md:col-span-2"><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.driverEmail}</p></div>
              </div>
            </div>

            {/* Maintenance History */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Wrench className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Maintenance History
              </h3>
              <div className="space-y-3">
                {vehicle.maintenanceHistory.map((record, index) => (
                  <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.type}</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{record.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.cost}</p>
                      </div>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{record.description}</p>
                  </div>
                ))}
                <button
                  onClick={() => setShowMaintenanceModal(true)}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  <Plus className="w-4 h-4" />
                  Add Maintenance Record
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Stats</h3>
              <div className="space-y-3">
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mileage</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.mileage}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fuel Efficiency</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.fuelEfficiency}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fuel Type</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.fuelType}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.capacity}</p></div>
              </div>
            </div>

            {/* Insurance & Registration */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Shield className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Insurance & Registration
              </h3>
              <div className="space-y-3">
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Insurance</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.insurance} (Expires: {vehicle.insuranceExpiry})</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Registration</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.registration} (Expires: {vehicle.registrationExpiry})</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last Maintenance</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.lastMaintenance}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Next Maintenance</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.nextMaintenance}</p></div>
              </div>
            </div>

            {/* Location & Trips */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <MapPin className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Location & Trips
              </h3>
              <div className="space-y-3">
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Location</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.currentLocation}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Last Trip</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.lastTrip}</p></div>
                <div><p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Trips</p><p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{vehicle.totalTrips}</p></div>
              </div>
            </div>

            {/* Actions */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Actions</h3>
              <div className="space-y-2">
                <button onClick={() => setShowStatusModal(true)} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: colors.info }}><TrendingUp className="w-4 h-4" />Update Status</button>
                <button onClick={() => setShowMaintenanceModal(true)} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: colors.warning }}><Wrench className="w-4 h-4" />Add Maintenance</button>
                <button onClick={handleEditClick} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: colors.primary }}><Edit className="w-4 h-4" />Edit Vehicle</button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.primary, color: colors.primary }}><FileText className="w-4 h-4" />View Documents</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlandTransporterVehicleDetails;