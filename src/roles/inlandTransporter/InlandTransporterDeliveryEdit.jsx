// roles/inlandTransporter/InlandTransporterDeliveryEdit.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Truck, Package, MapPin, Calendar, Clock, User, Building,
  Phone, Mail, FileText, Save, X, Users, Navigation, AlertCircle,
  CheckCircle, Search, Star, Edit2, ClipboardList
} from 'lucide-react';

const InlandTransporterDeliveryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTruckSearch, setShowTruckSearch] = useState(false);
  const [truckSearchTerm, setTruckSearchTerm] = useState('');
  const [formData, setFormData] = useState(null);

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

  // Available active trucks (not in use, not in maintenance, not on route)
  const availableTrucks = [
    { id: 'TRK-001', plateNo: 'UAB 1234', driverName: 'Robert Ssali', driverPhone: '+256 700 123456', truckType: '40ft Flatbed', capacity: '25 tons', status: 'Available' },
    { id: 'TRK-002', plateNo: 'RAB 5678', driverName: 'Jean Pierre', driverPhone: '+250 788 123456', truckType: '20ft Container Truck', capacity: '15 tons', status: 'Available' },
    { id: 'TRK-004', plateNo: 'UAB 7890', driverName: 'David Okello', driverPhone: '+256 700 789012', truckType: '20ft Container Truck', capacity: '15 tons', status: 'Available' },
    { id: 'TRK-006', plateNo: 'UAB 3456', driverName: 'Samuel Muwonge', driverPhone: '+256 700 345678', truckType: 'Refrigerated Truck', capacity: '12 tons', status: 'Available' },
    { id: 'TRK-007', plateNo: 'UAB 9012', driverName: 'Joseph Kato', driverPhone: '+256 700 901234', truckType: 'Flatbed Truck', capacity: '20 tons', status: 'Available' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        id: id || 'DLV-2026-001',
        deliveryNo: 'DLV-001',
        orderNo: 'DO-12345',
        companyName: 'ImportFlow Logistics',
        companyAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        contactPerson: 'John Mukasa',
        contactPhone: '+256 700 123456',
        contactEmail: 'john@importflow.com',
        consignee: 'Global Importers Inc',
        consigneeAddress: 'Nairobi, Kenya',
        consigneeContact: 'Jane Smith',
        consigneePhone: '+254 722 123456',
        consigneeEmail: 'jane@globalimporters.com',
        deliveryAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        truckId: 'TRK-001',
        truckDetails: {
          plateNo: 'UAB 1234',
          driverName: 'Robert Ssali',
          driverPhone: '+256 700 123456',
          truckType: '40ft Flatbed',
          capacity: '25 tons'
        },
        scheduledDate: '2026-08-12T14:30',
        status: 'Completed',
        priority: 'High',
        cargoDescription: 'Electronics and Machinery',
        declaredValue: '450,000,000 UGX',
        signature: 'John Doe',
        deliveryNotes: 'Goods received in good condition',
        rating: 5,
        distance: '380 km',
        route: 'Kampala → Mombasa',
        estimatedDuration: '2 days',
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTruckChange = (field, value) => {
    setFormData({
      ...formData,
      truckDetails: { ...formData.truckDetails, [field]: value }
    });
  };

  const handleSelectTruck = (truck) => {
    setFormData({
      ...formData,
      truckId: truck.id,
      truckDetails: {
        plateNo: truck.plateNo,
        driverName: truck.driverName,
        driverPhone: truck.driverPhone,
        truckType: truck.truckType,
        capacity: truck.capacity,
      }
    });
    setShowTruckSearch(false);
    setTruckSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      console.log('Updated Delivery Data:', formData);
      setSaving(false);
      navigate(`/inland-transporter/delivery/${id}`);
    }, 1500);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setFormData({ ...formData, rating: i + 1 })}
            className="focus:outline-none"
          >
            <Star 
              className={`w-6 h-6 ${i < (formData.rating || 0) ? 'fill-current' : ''}`} 
              style={{ color: i < (formData.rating || 0) ? colors.primary : '#d1d5db' }} 
            />
          </button>
        ))}
      </div>
    );
  };

  const filteredTrucks = availableTrucks.filter(truck =>
    truck.plateNo.toLowerCase().includes(truckSearchTerm.toLowerCase()) ||
    truck.driverName.toLowerCase().includes(truckSearchTerm.toLowerCase()) ||
    truck.truckType.toLowerCase().includes(truckSearchTerm.toLowerCase())
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
            onClick={() => navigate(`/inland-transporter/delivery/${id}`)}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Edit Delivery
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formData.deliveryNo} • Order: {formData.orderNo}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => navigate(`/inland-transporter/delivery/${id}`)}
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
          {/* Order Reference */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <ClipboardList className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Order Reference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Order No</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.orderNo}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.companyName}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.consignee}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivery Address</p>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.deliveryAddress}</p>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Calendar className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Delivery Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery No *
                </label>
                <input
                  type="text"
                  name="deliveryNo"
                  value={formData.deliveryNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Scheduled Date *
                </label>
                <input
                  type="datetime-local"
                  name="scheduledDate"
                  value={formData.scheduledDate}
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
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                </select>
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
                  placeholder="e.g., 380 km"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Route
                </label>
                <input
                  type="text"
                  name="route"
                  value={formData.route}
                  onChange={handleChange}
                  placeholder="e.g., Kampala → Mombasa"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
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
                  placeholder="e.g., 2 days"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
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
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Declared Value
                </label>
                <input
                  type="text"
                  name="declaredValue"
                  value={formData.declaredValue}
                  onChange={handleChange}
                  placeholder="e.g., 450,000,000 UGX"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
          </div>

          {/* Truck Details with Selection */}
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Truck className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Truck Assignment
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
              Select from available active trucks
            </p>

            {/* Search for Truck */}
            <div className="relative mb-4">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Search Available Trucks
              </label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search by plate no, driver, or truck type..."
                  value={truckSearchTerm}
                  onChange={(e) => {
                    setTruckSearchTerm(e.target.value);
                    setShowTruckSearch(true);
                  }}
                  onFocus={() => setShowTruckSearch(true)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
                {showTruckSearch && filteredTrucks.length > 0 && (
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
                              <span className={`px-1.5 py-0.5 rounded-full text-[10px] bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300`}>
                                ● Available
                              </span>
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
              </div>
            </div>

            {/* Current Truck Details */}
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    License Plate *
                  </label>
                  <input
                    type="text"
                    value={formData.truckDetails.plateNo}
                    onChange={(e) => handleTruckChange('plateNo', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Driver Name *
                  </label>
                  <input
                    type="text"
                    value={formData.truckDetails.driverName}
                    onChange={(e) => handleTruckChange('driverName', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Driver Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.truckDetails.driverPhone}
                    onChange={(e) => handleTruckChange('driverPhone', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Truck Type
                  </label>
                  <input
                    type="text"
                    value={formData.truckDetails.truckType}
                    onChange={(e) => handleTruckChange('truckType', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Capacity
                  </label>
                  <input
                    type="text"
                    value={formData.truckDetails.capacity}
                    onChange={(e) => handleTruckChange('capacity', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Completion Details (Only show if Completed) */}
          {formData.status === 'Completed' && (
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <CheckCircle className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Completion Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Signature
                  </label>
                  <input
                    type="text"
                    name="signature"
                    value={formData.signature || ''}
                    onChange={handleChange}
                    placeholder="Receiver's signature"
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Rating
                  </label>
                  {renderStars()}
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Delivery Notes
                  </label>
                  <textarea
                    name="deliveryNotes"
                    value={formData.deliveryNotes || ''}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Any notes about the delivery..."
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              type="button"
              onClick={() => navigate(`/inland-transporter/delivery/${id}`)}
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

export default InlandTransporterDeliveryEdit;