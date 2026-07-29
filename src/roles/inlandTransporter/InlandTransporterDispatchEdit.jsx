// roles/inlandTransporter/InlandTransporterDispatchEdit.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Truck, Package, MapPin, Calendar, Clock, User, Building,
  Phone, Mail, FileText, Save, X, Users, Navigation, AlertCircle,
  CheckCircle, Search, Filter
} from 'lucide-react';

const InlandTransporterDispatchEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);
  const [availableTrucks, setAvailableTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTruckDropdown, setShowTruckDropdown] = useState(false);

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
  };

  const isDark = darkMode

  // Available trucks in the system (active and not in use)
  const allTrucks = [
    { 
      id: 'TRK-001', 
      plateNo: 'UAB 1234', 
      driverName: 'Robert Ssali', 
      driverPhone: '+256 700 123456',
      truckType: '40ft Flatbed',
      capacity: '25 tons',
      status: 'Active',
      currentLocation: 'Kampala'
    },
    { 
      id: 'TRK-002', 
      plateNo: 'RAB 5678', 
      driverName: 'Jean Pierre', 
      driverPhone: '+250 788 123456',
      truckType: '20ft Container Truck',
      capacity: '15 tons',
      status: 'Active',
      currentLocation: 'Kigali'
    },
    { 
      id: 'TRK-003', 
      plateNo: 'KAB 9012', 
      driverName: 'Michael Ochieng', 
      driverPhone: '+254 722 123456',
      truckType: 'Refrigerated Truck',
      capacity: '12 tons',
      status: 'Maintenance',
      currentLocation: 'Nairobi'
    },
    { 
      id: 'TRK-004', 
      plateNo: 'UAB 7890', 
      driverName: 'David Okello', 
      driverPhone: '+256 700 789012',
      truckType: '20ft Container Truck',
      capacity: '15 tons',
      status: 'Active',
      currentLocation: 'Jinja'
    },
    { 
      id: 'TRK-005', 
      plateNo: 'UAB 3456', 
      driverName: 'Unassigned', 
      driverPhone: '-',
      truckType: 'Tanker',
      capacity: '20 tons',
      status: 'Inactive',
      currentLocation: 'Kampala'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Filter available trucks (Active and not in maintenance)
      const available = allTrucks.filter(truck => truck.status === 'Active');
      setAvailableTrucks(available);

      // Sample order data (in real app, fetch from API)
      const orderData = {
        id: id || 'DO-2026-001',
        orderNo: 'DO-12345',
        companyName: 'ImportFlow Logistics',
        businessAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        contactPerson: 'John Mukasa',
        contactPhone: '+256 700 123456',
        contactEmail: 'john@importflow.com',
        dispatchDate: '2026-08-10',
        deliveryOrder: 'DLV-001',
        consignee: 'Global Importers Inc',
        consigneeAddress: 'Nairobi, Kenya',
        consigneeContact: 'Jane Smith',
        consigneePhone: '+254 722 123456',
        consigneeEmail: 'jane@globalimporters.com',
        deliveryAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        truckId: 'TRK-001',
        plateNo: 'UAB 1234',
        driverName: 'Robert Ssali',
        driverPhone: '+256 700 123456',
        truckType: '40ft Flatbed',
        capacity: '25 tons',
        eta: '2026-08-12T14:30',
        status: 'In Transit',
        priority: 'High',
        cargoDescription: 'Electronics and Machinery',
        declaredValue: '450,000,000 UGX',
        route: 'Kampala → Mombasa',
        distance: '380 km',
        estimatedDuration: '2 days',
        submittedDate: '2026-08-08',
        lastUpdate: '2 hours ago'
      };
      setFormData(orderData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectTruck = (truck) => {
    setFormData({
      ...formData,
      truckId: truck.id,
      plateNo: truck.plateNo,
      driverName: truck.driverName,
      driverPhone: truck.driverPhone,
      truckType: truck.truckType,
      capacity: truck.capacity
    });
    setShowTruckDropdown(false);
    setSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Updated Order Data:', formData);
      setSaving(false);
      navigate(`/inland-transporter/dispatch/${id}`);
    }, 1500);
  };

  const filteredTrucks = availableTrucks.filter(truck =>
    truck.plateNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.truckType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/inland-transporter/dispatch/${id}`)}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Edit Dispatch Order
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formData?.orderNo} • Update order details
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => navigate(`/inland-transporter/dispatch/${id}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: colors.primary }}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transporter Details */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Building className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Transporter Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Business Address *
                </label>
                <input
                  type="text"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
          </div>

          {/* Consignee & Dispatch Details */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Consignee & Dispatch Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Consignee Name *
                </label>
                <input
                  type="text"
                  name="consignee"
                  value={formData.consignee}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Consignee Address *
                </label>
                <input
                  type="text"
                  name="consigneeAddress"
                  value={formData.consigneeAddress}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Consignee Phone
                </label>
                <input
                  type="tel"
                  name="consigneePhone"
                  value={formData.consigneePhone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Consignee Email
                </label>
                <input
                  type="email"
                  name="consigneeEmail"
                  value={formData.consigneeEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery Order No.
                </label>
                <input
                  type="text"
                  name="deliveryOrder"
                  value={formData.deliveryOrder}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Dispatch Date *
                </label>
                <input
                  type="date"
                  name="dispatchDate"
                  value={formData.dispatchDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  ETA *
                </label>
                <input
                  type="datetime-local"
                  name="eta"
                  value={formData.eta}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Truck Selection */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Truck className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Truck Assignment
            </h3>
            <div className="relative">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Available Truck
              </label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search by plate no, driver, or truck type..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowTruckDropdown(true);
                  }}
                  onFocus={() => setShowTruckDropdown(true)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
                {showTruckDropdown && filteredTrucks.length > 0 && (
                  <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-xl border max-h-60 overflow-y-auto ${
                    isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                  }`}>
                    {filteredTrucks.map((truck) => (
                      <div
                        key={truck.id}
                        onClick={() => handleSelectTruck(truck)}
                        className={`p-3 cursor-pointer transition-colors border-b last:border-b-0 ${
                          isDark ? 'hover:bg-gray-600 border-gray-600' : 'hover:bg-gray-50 border-gray-100'
                        } ${formData.truckId === truck.id ? (isDark ? 'bg-gray-600' : 'bg-blue-50') : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                          <div className="flex-1">
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {truck.plateNo}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Driver: {truck.driverName}
                              </span>
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Type: {truck.truckType}
                              </span>
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Capacity: {truck.capacity}
                              </span>
                              <span className="text-green-500">● Active</span>
                            </div>
                          </div>
                          {formData.truckId === truck.id && (
                            <CheckCircle className="w-5 h-5" style={{ color: colors.success }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {showTruckDropdown && searchTerm.length > 0 && filteredTrucks.length === 0 && (
                  <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-xl border p-4 text-center ${
                    isDark ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
                  }`}>
                    No available trucks found matching "{searchTerm}"
                  </div>
                )}
              </div>

              {/* Selected Truck Display */}
              {formData.plateNo && (
                <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5" style={{ color: colors.primary }} />
                    <div className="flex-1">
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {formData.plateNo}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Driver: {formData.driverName}
                        </span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Phone: {formData.driverPhone}
                        </span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Type: {formData.truckType}
                        </span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          Capacity: {formData.capacity}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          truckId: '',
                          plateNo: '',
                          driverName: '',
                          driverPhone: '',
                          truckType: '',
                          capacity: ''
                        });
                      }}
                      className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cargo & Route Details */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Package className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Cargo & Route Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cargo Description *
                </label>
                <textarea
                  name="cargoDescription"
                  value={formData.cargoDescription}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Declared Value
                </label>
                <input
                  type="text"
                  name="declaredValue"
                  value={formData.declaredValue}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., 450,000,000 UGX"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Route *
                </label>
                <input
                  type="text"
                  name="route"
                  value={formData.route}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., Kampala → Mombasa"
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Distance
                </label>
                <input
                  type="text"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., 380 km"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Estimated Duration
                </label>
                <input
                  type="text"
                  name="estimatedDuration"
                  value={formData.estimatedDuration}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="e.g., 2 days"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              type="button"
              onClick={() => navigate(`/inland-transporter/dispatch/${id}`)}
              className="px-6 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InlandTransporterDispatchEdit;