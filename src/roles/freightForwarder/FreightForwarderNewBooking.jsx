// roles/freightForwarder/FreightForwarderNewBooking.jsx
import React, { useState, useContext } from 'react';
import {
  Ship, Package, Container, Calendar, Clock, MapPin, User, Building,
  Phone, Mail, Globe, Flag, Anchor, ArrowRight, Save, X, FileText,
  Truck, Layers, Box, Plus, Minus, ChevronDown, ChevronUp
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const FreightForwarderNewBooking = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [containers, setContainers] = useState([]);
  const [showContainerForm, setShowContainerForm] = useState(false);

  const colors = {
    primary: '#714b67',
    primaryLight: '#8a5f7e',
    primaryDark: '#5a3a52',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
  };

  const isDark = darkMode

  // Form state
  const [formData, setFormData] = useState({
    // Transporter Details
    companyName: '',
    businessAddress: '',
    contactPersonName: '',
    contactPersonPhone: '',
    contactPersonEmail: '',
    
    // Shipper/Exporter
    shipperName: '',
    shipperAddress: '',
    shipperContact: '',
    shipperPhone: '',
    shipperEmail: '',
    
    // Booking Details
    bookingNo: '',
    blNo: '',
    
    // Consignee
    consigneeName: '',
    consigneeAddress: '',
    consigneeContact: '',
    consigneePhone: '',
    consigneeEmail: '',
    
    // Forwarding Agent
    forwardingAgentName: '',
    forwardingAgentAddress: '',
    forwardingAgentContact: '',
    forwardingAgentPhone: '',
    forwardingAgentEmail: '',
    
    // Notify Party
    notifyPartyName: '',
    notifyPartyAddress: '',
    notifyPartyContact: '',
    notifyPartyPhone: '',
    notifyPartyEmail: '',
    
    // Origin
    pointOfOrigin: '',
    countryOfOrigin: '',
    
    // Pre-carriage
    preCarriageBy: '',
    placeOfReceipt: '',
    
    // Vessel
    vesselName: '',
    vesselSCAC: '',
    voyage: '',
    countryFlag: '',
    
    // Ports
    portOfLoading: '',
    loadingPierTerminal: '',
    originalsReleasedAt: '',
    portOfDischarge: '',
    placeOfDelivery: '',
    
    // Movement
    typeOfMovement: '',
    
    // Cargo Details
    declaredCargoValue: '',
    shippingDate: '',
    eta: '',
    placeOfFinalDelivery: '',
    
    // Container Info
    containerNo: '',
    sealNo: '',
    srvcName: '',
    size: '',
    packages: '',
    grossWeight: '',
    volume: '',
    measurement: '',
    cargoDescription: '',
    consigneeContactDetails: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddContainer = () => {
    if (formData.containerNo && formData.size) {
      setContainers([...containers, {
        containerNo: formData.containerNo,
        sealNo: formData.sealNo,
        srvcName: formData.srvcName,
        size: formData.size,
        packages: formData.packages,
        grossWeight: formData.grossWeight,
        volume: formData.volume,
        measurement: formData.measurement,
        cargoDescription: formData.cargoDescription,
        consigneeContactDetails: formData.consigneeContactDetails,
      }]);
      
      // Reset container form
      setFormData({
        ...formData,
        containerNo: '',
        sealNo: '',
        srvcName: '',
        size: '',
        packages: '',
        grossWeight: '',
        volume: '',
        measurement: '',
        cargoDescription: '',
        consigneeContactDetails: '',
      });
      setShowContainerForm(false);
    }
  };

  const handleRemoveContainer = (index) => {
    setContainers(containers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log('Booking Data:', { ...formData, containers });
    navigate('/freight-forwarder/bookings');
  };

  const renderStepIndicator = () => {
    const steps = ['Transporter & Shipper', 'Vessel & Ports', 'Containers', 'Review'];
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
          <div className="space-y-6">
            {/* Transporter Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Building className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Transporter Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Company Name
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
                    Business Address
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
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPersonPhone"
                    value={formData.contactPersonPhone}
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
                    name="contactPersonEmail"
                    value={formData.contactPersonEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipper/Exporter */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Shipper / Exporter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Shipper Name
                  </label>
                  <input
                    type="text"
                    name="shipperName"
                    value={formData.shipperName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="shipperAddress"
                    value={formData.shipperAddress}
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
                    name="shipperContact"
                    value={formData.shipperContact}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="shipperPhone"
                    value={formData.shipperPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="shipperEmail"
                    value={formData.shipperEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Booking & BL Numbers */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <FileText className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Booking Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Booking No
                  </label>
                  <input
                    type="text"
                    name="bookingNo"
                    value={formData.bookingNo}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    BL No
                  </label>
                  <input
                    type="text"
                    name="blNo"
                    value={formData.blNo}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Consignee */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Package className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Consignee (Importer)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Consignee Name
                  </label>
                  <input
                    type="text"
                    name="consigneeName"
                    value={formData.consigneeName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Address
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
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="consigneePhone"
                    value={formData.consigneePhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="consigneeEmail"
                    value={formData.consigneeEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Forwarding Agent & Notify Party */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Users className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Forwarding Agent
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="forwardingAgentName"
                    placeholder="Agent Name"
                    value={formData.forwardingAgentName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <input
                    type="text"
                    name="forwardingAgentAddress"
                    placeholder="Address"
                    value={formData.forwardingAgentAddress}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <input
                    type="text"
                    name="forwardingAgentContact"
                    placeholder="Contact Person"
                    value={formData.forwardingAgentContact}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <input
                    type="tel"
                    name="forwardingAgentPhone"
                    placeholder="Phone"
                    value={formData.forwardingAgentPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <input
                    type="email"
                    name="forwardingAgentEmail"
                    placeholder="Email"
                    value={formData.forwardingAgentEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Bell className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Notify Party
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="notifyPartyName"
                    placeholder="Notify Party Name"
                    value={formData.notifyPartyName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <input
                    type="text"
                    name="notifyPartyAddress"
                    placeholder="Address"
                    value={formData.notifyPartyAddress}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <input
                    type="text"
                    name="notifyPartyContact"
                    placeholder="Contact Person"
                    value={formData.notifyPartyContact}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <input
                    type="tel"
                    name="notifyPartyPhone"
                    placeholder="Phone"
                    value={formData.notifyPartyPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <input
                    type="email"
                    name="notifyPartyEmail"
                    placeholder="Email"
                    value={formData.notifyPartyEmail}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Origin */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Globe className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Point & Country of Origin
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Point of Origin
                  </label>
                  <input
                    type="text"
                    name="pointOfOrigin"
                    value={formData.pointOfOrigin}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Country of Origin
                  </label>
                  <input
                    type="text"
                    name="countryOfOrigin"
                    value={formData.countryOfOrigin}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pre-Carriage & Place of Receipt */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Truck className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Pre-Carriage & Place of Receipt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Pre-Carriage By
                  </label>
                  <input
                    type="text"
                    name="preCarriageBy"
                    value={formData.preCarriageBy}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Place of Receipt
                  </label>
                  <input
                    type="text"
                    name="placeOfReceipt"
                    value={formData.placeOfReceipt}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Vessel Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Anchor className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Vessel Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Vessel Name
                  </label>
                  <input
                    type="text"
                    name="vesselName"
                    value={formData.vesselName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    SCAC Code
                  </label>
                  <input
                    type="text"
                    name="vesselSCAC"
                    value={formData.vesselSCAC}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Voyage
                  </label>
                  <input
                    type="text"
                    name="voyage"
                    value={formData.voyage}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Country Flag
                  </label>
                  <input
                    type="text"
                    name="countryFlag"
                    value={formData.countryFlag}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>
            </div>

            {/* Ports */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <MapPin className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Port Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Port of Loading
                  </label>
                  <input
                    type="text"
                    name="portOfLoading"
                    value={formData.portOfLoading}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Loading Pier/Terminal
                  </label>
                  <input
                    type="text"
                    name="loadingPierTerminal"
                    value={formData.loadingPierTerminal}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Originals to be released at
                  </label>
                  <input
                    type="text"
                    name="originalsReleasedAt"
                    value={formData.originalsReleasedAt}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Port of Discharge
                  </label>
                  <input
                    type="text"
                    name="portOfDischarge"
                    value={formData.portOfDischarge}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Place of Delivery
                  </label>
                  <input
                    type="text"
                    name="placeOfDelivery"
                    value={formData.placeOfDelivery}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Type of Movement
                  </label>
                  <select
                    name="typeOfMovement"
                    value={formData.typeOfMovement}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  >
                    <option value="">Select Movement Type</option>
                    <option value="FCL">FCL - Full Container Load</option>
                    <option value="LCL">LCL - Less than Container Load</option>
                    <option value="Breakbulk">Breakbulk</option>
                    <option value="Ro-Ro">Ro-Ro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dates and Value */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Calendar className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Shipping Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Declared Cargo Value
                  </label>
                  <input
                    type="text"
                    name="declaredCargoValue"
                    value={formData.declaredCargoValue}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="e.g., 500,000,000 UGX"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Shipping Date
                  </label>
                  <input
                    type="date"
                    name="shippingDate"
                    value={formData.shippingDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    ETA
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
                    Place of Final Delivery
                  </label>
                  <input
                    type="text"
                    name="placeOfFinalDelivery"
                    value={formData.placeOfFinalDelivery}
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
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Container className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Container Information
                </h3>
                <button
                  onClick={() => setShowContainerForm(!showContainerForm)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Plus className="w-4 h-4" />
                  Add Container
                </button>
              </div>

              {/* Container Form */}
              {showContainerForm && (
                <div className={`p-4 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Container No.
                      </label>
                      <input
                        type="text"
                        name="containerNo"
                        value={formData.containerNo}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Seal No.
                      </label>
                      <input
                        type="text"
                        name="sealNo"
                        value={formData.sealNo}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Service Name
                      </label>
                      <input
                        type="text"
                        name="srvcName"
                        value={formData.srvcName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Size
                      </label>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      >
                        <option value="">Select Size</option>
                        <option value="20ft">20ft</option>
                        <option value="40ft">40ft</option>
                        <option value="40ft HC">40ft HC</option>
                        <option value="45ft">45ft</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Packages
                      </label>
                      <input
                        type="number"
                        name="packages"
                        value={formData.packages}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Gross Weight
                      </label>
                      <input
                        type="text"
                        name="grossWeight"
                        value={formData.grossWeight}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="e.g., 12.5 tons"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Volume
                      </label>
                      <input
                        type="text"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="e.g., 25 CBM"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Measurement
                      </label>
                      <input
                        type="text"
                        name="measurement"
                        value={formData.measurement}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Cargo Description
                      </label>
                      <textarea
                        name="cargoDescription"
                        value={formData.cargoDescription}
                        onChange={handleChange}
                        rows="2"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Consignee Contact Details
                      </label>
                      <input
                        type="text"
                        name="consigneeContactDetails"
                        value={formData.consigneeContactDetails}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowContainerForm(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddContainer}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Add Container
                    </button>
                  </div>
                </div>
              )}

              {/* Container List */}
              {containers.length > 0 && (
                <div className="space-y-2">
                  {containers.map((container, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                      <div className="flex items-center gap-4">
                        <Container className="w-5 h-5" style={{ color: colors.primary }} />
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {container.containerNo}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {container.size} • {container.packages} packages • {container.grossWeight}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveContainer(index)}
                        className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <CheckCircle className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Review Booking Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Transporter</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.companyName || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Shipper</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.shipperName || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Booking No</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.bookingNo || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Consignee</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.consigneeName || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Vessel</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.vesselName || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Port of Loading</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.portOfLoading || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Port of Discharge</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.portOfDischarge || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>ETA</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{formData.eta || 'Not provided'}</p>
                </div>
              </div>
              
              <div>
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Containers ({containers.length})</h4>
                {containers.map((c, i) => (
                  <p key={i} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {c.containerNo} - {c.size} ({c.packages} packages)
                  </p>
                ))}
                {containers.length === 0 && (
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No containers added</p>
                )}
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              New Freight Booking
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Create a new freight booking with all required documentation
            </p>
          </div>
          <button
            onClick={() => navigate('/freight-forwarder/bookings')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {renderFormSection()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                step === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ 
                backgroundColor: isDark ? 'transparent' : 'transparent',
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
                  Submit Booking
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreightForwarderNewBooking;