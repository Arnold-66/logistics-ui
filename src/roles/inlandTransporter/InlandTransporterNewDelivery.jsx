// roles/inlandTransporter/InlandTransporterNewDelivery.jsx
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Truck, Package, MapPin, Calendar, Clock, User, Building,
  Phone, Mail, FileText, Save, X, Users, Navigation, AlertCircle,
  CheckCircle, Plus, Minus, Search, Star, Edit2, ClipboardList
} from 'lucide-react';

const InlandTransporterNewDelivery = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [showOrderSearch, setShowOrderSearch] = useState(false);
  const [showTruckSearch, setShowTruckSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [truckSearchTerm, setTruckSearchTerm] = useState('');

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

  // Sample dispatch orders available for delivery
  const availableOrders = [
    { id: 'DO-12345', companyName: 'ImportFlow Logistics', consignee: 'Global Importers Inc', deliveryAddress: 'Plot 123, Industrial Area, Kampala, Uganda', status: 'Pending Dispatch', priority: 'High' },
    { id: 'DO-12346', companyName: 'East Africa Transport', consignee: 'Rwanda Importers Ltd', deliveryAddress: 'KG 7 Ave, Kigali, Rwanda', status: 'In Transit', priority: 'Medium' },
    { id: 'DO-12348', companyName: 'ImportFlow Logistics', consignee: 'Uganda Manufacturers', deliveryAddress: 'Plot 45, Bweyogerere, Kampala, Uganda', status: 'Pending Dispatch', priority: 'High' },
  ];

  // Available active trucks (not in use, not in maintenance, not on route)
  const availableTrucks = [
    { id: 'TRK-001', plateNo: 'UAB 1234', driverName: 'Robert Ssali', driverPhone: '+256 700 123456', truckType: '40ft Flatbed', capacity: '25 tons', status: 'Available' },
    { id: 'TRK-002', plateNo: 'RAB 5678', driverName: 'Jean Pierre', driverPhone: '+250 788 123456', truckType: '20ft Container Truck', capacity: '15 tons', status: 'Available' },
    { id: 'TRK-004', plateNo: 'UAB 7890', driverName: 'David Okello', driverPhone: '+256 700 789012', truckType: '20ft Container Truck', capacity: '15 tons', status: 'Available' },
    { id: 'TRK-006', plateNo: 'UAB 3456', driverName: 'Samuel Muwonge', driverPhone: '+256 700 345678', truckType: 'Refrigerated Truck', capacity: '12 tons', status: 'Available' },
    { id: 'TRK-007', plateNo: 'UAB 9012', driverName: 'Joseph Kato', driverPhone: '+256 700 901234', truckType: 'Flatbed Truck', capacity: '20 tons', status: 'Available' },
  ];

  const [formData, setFormData] = useState({
    // Order Reference
    orderId: '',
    orderNo: '',
    companyName: '',
    consignee: '',
    deliveryAddress: '',
    
    // Delivery Details
    deliveryNo: '',
    scheduledDate: '',
    priority: 'Medium',
    cargoDescription: '',
    
    // Truck Details
    truckId: '',
    plateNo: '',
    driverName: '',
    driverPhone: '',
    truckType: '',
    capacity: '',
    
    // Additional Info
    distance: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectOrder = (order) => {
    setFormData({
      ...formData,
      orderId: order.id,
      orderNo: order.id,
      companyName: order.companyName,
      consignee: order.consignee,
      deliveryAddress: order.deliveryAddress,
    });
    setShowOrderSearch(false);
    setSearchTerm('');
  };

  const handleSelectTruck = (truck) => {
    setFormData({
      ...formData,
      truckId: truck.id,
      plateNo: truck.plateNo,
      driverName: truck.driverName,
      driverPhone: truck.driverPhone,
      truckType: truck.truckType,
      capacity: truck.capacity,
    });
    setShowTruckSearch(false);
    setTruckSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Delivery Data:', formData);
    navigate('/inland-transporter/deliveries');
  };

  const filteredOrders = availableOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.consignee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrucks = availableTrucks.filter(truck =>
    truck.plateNo.toLowerCase().includes(truckSearchTerm.toLowerCase()) ||
    truck.driverName.toLowerCase().includes(truckSearchTerm.toLowerCase()) ||
    truck.truckType.toLowerCase().includes(truckSearchTerm.toLowerCase())
  );

  const renderStepIndicator = () => {
    const steps = ['Order Reference', 'Delivery Details', 'Truck Assignment', 'Review'];
    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                ${step >= index + 1 
                  ? 'text-white' 
                  : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}
                style={{ backgroundColor: step >= index + 1 ? colors.primary : '' }}
              >
                {index + 1}
              </div>
              <span className={`text-xs mt-1 ${step >= index + 1 ? 'font-medium' : ''} ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {s}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${step > index + 1 ? 'bg-' : 'bg-gray-300'}`}
                style={{ backgroundColor: step > index + 1 ? colors.primary : (isDark ? '#374151' : '#e5e7eb') }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderFormSection = () => {
    switch(step) {
      case 1:
        return (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <ClipboardList className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Order Reference
            </h3>

            {/* Search for Order */}
            <div className="relative mb-4">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Search Dispatch Order *
              </label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search by order no, company, or consignee..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowOrderSearch(true);
                  }}
                  onFocus={() => setShowOrderSearch(true)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
                {showOrderSearch && filteredOrders.length > 0 && (
                  <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-xl border max-h-60 overflow-y-auto ${
                    isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                  }`}>
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        onClick={() => handleSelectOrder(order)}
                        className={`p-3 cursor-pointer transition-colors border-b last:border-b-0 ${
                          isDark ? 'hover:bg-gray-600 border-gray-600' : 'hover:bg-gray-50 border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5" style={{ color: colors.primary }} />
                          <div className="flex-1">
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {order.id}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Company: {order.companyName}
                              </span>
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Consignee: {order.consignee}
                              </span>
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                Priority: {order.priority}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                                order.status === 'Pending Dispatch' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                                order.status === 'In Transit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {showOrderSearch && searchTerm.length > 0 && filteredOrders.length === 0 && (
                  <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-xl border p-4 text-center ${
                    isDark ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
                  }`}>
                    No orders found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </div>

            {/* Selected Order Details */}
            {formData.orderNo && (
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Selected Order: {formData.orderNo}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        orderId: '',
                        orderNo: '',
                        companyName: '',
                        consignee: '',
                        deliveryAddress: '',
                      });
                    }}
                    className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Company</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.companyName}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.consignee}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delivery Address</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.deliveryAddress}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Calendar className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Delivery Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery No. *
                </label>
                <input
                  type="text"
                  name="deliveryNo"
                  value={formData.deliveryNo}
                  onChange={handleChange}
                  placeholder="e.g., DLV-001"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
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
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cargo Description *
                </label>
                <textarea
                  name="cargoDescription"
                  value={formData.cargoDescription}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the cargo being delivered..."
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Any special instructions or notes..."
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
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
                Search Available Trucks *
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
                        }`}
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {showTruckSearch && truckSearchTerm.length > 0 && filteredTrucks.length === 0 && (
                  <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-xl border p-4 text-center ${
                    isDark ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
                  }`}>
                    No available trucks found matching "{truckSearchTerm}"
                  </div>
                )}
              </div>
            </div>

            {/* Selected Truck Details */}
            {formData.plateNo && (
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-green-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Selected Truck: {formData.plateNo}
                  </h4>
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
                        capacity: '',
                      });
                    }}
                    className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>License Plate</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.plateNo}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Driver</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.driverName}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.driverPhone}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Truck Type</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.truckType}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.capacity}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <CheckCircle className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Review Delivery
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Order Reference</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Order: {formData.orderNo || 'Not selected'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Company: {formData.companyName || 'N/A'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Consignee: {formData.consignee || 'N/A'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Delivery Details</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Delivery No: {formData.deliveryNo || 'Not set'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Scheduled: {formData.scheduledDate || 'Not set'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Priority: {formData.priority}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Distance: {formData.distance || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Truck & Driver</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Plate: {formData.plateNo || 'Not assigned'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Driver: {formData.driverName || 'Not assigned'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Phone: {formData.driverPhone || 'N/A'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type: {formData.truckType || 'N/A'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Capacity: {formData.capacity || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Cargo & Notes</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.cargoDescription || 'Not provided'}</p>
                  {formData.notes && (
                    <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} italic mt-1`}>
                      Notes: {formData.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/inland-transporter/deliveries')}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              New Delivery
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Create a new delivery from a dispatch order
            </p>
          </div>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          {renderFormSection()}

          <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                step === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ 
                color: step === 1 ? (isDark ? '#4a5568' : '#a0aec0') : colors.primary,
                border: step === 1 ? '1px solid ' + (isDark ? '#4a5568' : '#e2e8f0') : '1px solid ' + colors.primary
              }}
              disabled={step === 1}
            >
              Previous
            </button>

            <div className="flex gap-2">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(Math.min(4, step + 1))}
                  className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Save className="w-4 h-4" />
                  Create Delivery
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InlandTransporterNewDelivery;