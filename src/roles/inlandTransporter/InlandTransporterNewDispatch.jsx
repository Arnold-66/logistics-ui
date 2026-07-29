// roles/inlandTransporter/InlandTransporterNewDispatch.jsx (Fixed version)
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Truck, Package, MapPin, Calendar, Clock, User, Building,
  Phone, Mail, FileText, Save, X, Users, Navigation, AlertCircle,
  CheckCircle, Plus, Minus, Search
} from 'lucide-react';

const InlandTransporterNewDispatch = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [showTruckDropdown, setShowTruckDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
  const availableTrucks = [
    { id: 'TRK-001', plateNo: 'UAB 1234', driverName: 'Robert Ssali', driverPhone: '+256 700 123456', truckType: '40ft Flatbed', capacity: '25 tons', status: 'Active' },
    { id: 'TRK-002', plateNo: 'RAB 5678', driverName: 'Jean Pierre', driverPhone: '+250 788 123456', truckType: '20ft Container Truck', capacity: '15 tons', status: 'Active' },
    { id: 'TRK-004', plateNo: 'UAB 7890', driverName: 'David Okello', driverPhone: '+256 700 789012', truckType: '20ft Container Truck', capacity: '15 tons', status: 'Active' },
  ];

  const [formData, setFormData] = useState({
    // Transporter Details
    companyName: '',
    businessAddress: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    
    // Dispatch Details
    dispatchDate: '',
    deliveryOrder: '',
    consignee: '',
    consigneeAddress: '',
    consigneeContact: '',
    consigneePhone: '',
    consigneeEmail: '',
    deliveryAddress: '',
    
    // Truck Details
    truckId: '',
    plateNo: '',
    truckType: '',
    capacity: '',
    driverName: '',
    driverPhone: '',
    
    // Cargo Details
    cargoDescription: '',
    declaredValue: '',
    route: '',
    distance: '',
    estimatedDuration: '',
    eta: '',
    
    // Priority
    priority: 'Medium'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    console.log('Dispatch Order Data:', formData);
    navigate('/inland-transporter/dispatch-orders');
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      if (!formData.companyName || !formData.contactPerson || !formData.contactPhone) {
        alert('Please fill in all required fields (Company Name, Contact Person, Contact Phone)');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.dispatchDate || !formData.consignee || !formData.deliveryAddress || !formData.eta) {
        alert('Please fill in all required fields (Dispatch Date, Consignee, Delivery Address, ETA)');
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.plateNo || !formData.driverName || !formData.cargoDescription || !formData.route) {
        alert('Please select a truck and fill in Cargo Description and Route');
        return false;
      }
    }
    return true;
  };

  const goToNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const filteredTrucks = availableTrucks.filter(truck =>
    truck.plateNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.truckType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStepIndicator = () => {
    const steps = ['Transporter', 'Dispatch Details', 'Truck & Cargo', 'Review'];
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
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Dispatch Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Calendar className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Dispatch Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Consignee Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Consignee Details
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
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="consigneeContact"
                    value={formData.consigneeContact}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Contact Phone
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
                    Contact Email
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
                <div className="md:col-span-2">
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
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Truck Selection */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Truck className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Select Truck *
              </h3>
              <div className="relative">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search available trucks by plate no, driver, or type..."
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
                                <span className="text-green-500">● Active</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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

            {/* Cargo Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
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
                    rows="2"
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
          </div>
        );

      case 4:
        return (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <CheckCircle className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Review Dispatch Order
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Transporter</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.companyName || 'Not provided'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.contactPerson}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.contactPhone}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Consignee</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.consignee || 'Not provided'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.consigneeAddress}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.deliveryAddress}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Dispatch Details</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Date: {formData.dispatchDate || 'Not set'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ETA: {formData.eta || 'Not set'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Priority: {formData.priority}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Delivery Order: {formData.deliveryOrder || 'N/A'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Truck</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Plate: {formData.plateNo || 'Not selected'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Driver: {formData.driverName || 'N/A'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Type: {formData.truckType || 'Not specified'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Capacity: {formData.capacity || 'N/A'}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Cargo</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.cargoDescription || 'Not provided'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Value: {formData.declaredValue || 'Not specified'}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Route: {formData.route || 'Not specified'} {formData.distance ? `• ${formData.distance}` : ''}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Est. Duration: {formData.estimatedDuration || 'Not specified'}</p>
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/inland-transporter/dispatch-orders')}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              New Dispatch Order
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Create a new inland transport dispatch order
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
                  onClick={goToNextStep}
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
                  Create Dispatch Order
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InlandTransporterNewDispatch;