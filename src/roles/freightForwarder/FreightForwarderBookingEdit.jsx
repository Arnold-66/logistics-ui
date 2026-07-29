// roles/freightForwarder/FreightForwarderBookingEdit.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Package, Ship, Container, Calendar, Clock, MapPin,
  User, Building, Phone, Mail, FileText, Save, X, Truck,
  Anchor, Globe, Flag, CheckCircle, AlertCircle, Plus, Trash2,
  Edit2, Save as SaveIcon
} from 'lucide-react';

const FreightForwarderBookingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('transporter');
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
  };

  const isDark = darkMode

  useEffect(() => {
    // Simulate API call to fetch booking data
    setTimeout(() => {
      setFormData({
        id: id || 'FRT-2026-001',
        bookingNo: 'BKG-12345678',
        blNo: 'BL-2026-001',
        // Transporter Details
        companyName: 'ImportFlow Logistics',
        businessAddress: 'Plot 123, Industrial Area, Kampala, Uganda',
        contactPerson: 'John Mukasa',
        contactPhone: '+256 700 123456',
        contactEmail: 'john@importflow.com',
        // Shipper
        shipper: 'ImportFlow Ltd',
        shipperAddress: 'Kampala, Uganda',
        shipperContact: 'John Doe',
        shipperPhone: '+256 700 789012',
        shipperEmail: 'john.doe@importflow.com',
        // Consignee
        consignee: 'Global Importers Inc',
        consigneeAddress: 'Nairobi, Kenya',
        consigneeContact: 'Jane Smith',
        consigneePhone: '+254 722 123456',
        consigneeEmail: 'jane@globalimporters.com',
        // Forwarding Agent
        forwardingAgent: 'East Africa Logistics',
        forwardingAgentAddress: 'Nairobi, Kenya',
        forwardingAgentContact: 'Peter Ochieng',
        forwardingAgentPhone: '+254 700 123456',
        forwardingAgentEmail: 'peter@eastafricalogistics.com',
        // Notify Party
        notifyParty: 'Uganda Shipping Agency',
        notifyPartyAddress: 'Kampala, Uganda',
        notifyPartyContact: 'Sarah Nambi',
        notifyPartyPhone: '+256 700 789012',
        notifyPartyEmail: 'sarah@ugandashipping.com',
        // Origin
        pointOfOrigin: 'Kampala',
        countryOfOrigin: 'Uganda',
        // Pre-carriage
        preCarriageBy: 'Truck',
        placeOfReceipt: 'Kampala Warehouse',
        // Vessel
        vessel: 'MV Star Express',
        vesselSCAC: 'STAR',
        voyage: 'SE-2026-078',
        countryFlag: 'Uganda',
        // Ports
        portOfLoading: 'Kampala, Uganda',
        loadingPier: 'Main Terminal',
        originalsReleasedAt: 'Kampala Office',
        portOfDischarge: 'Port of Mombasa',
        placeOfDelivery: 'Nairobi, Kenya',
        typeOfMovement: 'FCL',
        // Dates & Value
        declaredValue: '749,484,375 UGX',
        shippingDate: '2026-07-25',
        eta: '2026-08-12T14:30',
        finalDelivery: 'Kampala, Uganda',
        // Status
        status: 'In Transit',
        priority: 'High',
        // Containers
        containers: [
          { id: 'MSKU-458921', size: '20ft', packages: 450, weight: '12.5 tons', sealNo: 'SEAL-001', cargoDesc: 'Electronics' },
          { id: 'MSKU-458922', size: '40ft', packages: 320, weight: '4.5 tons', sealNo: 'SEAL-002', cargoDesc: 'Machinery' }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContainerChange = (index, field, value) => {
    const updatedContainers = [...formData.containers];
    updatedContainers[index] = { ...updatedContainers[index], [field]: value };
    setFormData(prev => ({ ...prev, containers: updatedContainers }));
  };

  const addContainer = () => {
    setFormData(prev => ({
      ...prev,
      containers: [...prev.containers, { 
        id: '', 
        size: '20ft', 
        packages: 0, 
        weight: '', 
        sealNo: '', 
        cargoDesc: '' 
      }]
    }));
  };

  const removeContainer = (index) => {
    const updatedContainers = formData.containers.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, containers: updatedContainers }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      navigate(`/freight-forwarder/booking/${id}`);
    }, 1500);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'transporter':
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

            {/* Shipper */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <User className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Shipper / Exporter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Shipper Name *
                  </label>
                  <input
                    type="text"
                    name="shipper"
                    value={formData.shipper}
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
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'consignee':
        return (
          <div className="space-y-6">
            {/* Consignee */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Package className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Consignee (Importer)
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
                    Address *
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
                  />
                </div>
              </div>
            </div>

            {/* Forwarding Agent & Notify Party */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Building className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Forwarding Agent
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Agent Name
                    </label>
                    <input
                      type="text"
                      name="forwardingAgent"
                      value={formData.forwardingAgent}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Address
                    </label>
                    <input
                      type="text"
                      name="forwardingAgentAddress"
                      value={formData.forwardingAgentAddress}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="forwardingAgentContact"
                      value={formData.forwardingAgentContact}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="forwardingAgentPhone"
                      value={formData.forwardingAgentPhone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="forwardingAgentEmail"
                      value={formData.forwardingAgentEmail}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Bell className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Notify Party
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Notify Party Name
                    </label>
                    <input
                      type="text"
                      name="notifyParty"
                      value={formData.notifyParty}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Address
                    </label>
                    <input
                      type="text"
                      name="notifyPartyAddress"
                      value={formData.notifyPartyAddress}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="notifyPartyContact"
                      value={formData.notifyPartyContact}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="notifyPartyPhone"
                      value={formData.notifyPartyPhone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="notifyPartyEmail"
                      value={formData.notifyPartyEmail}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      style={{ focusRingColor: colors.primary }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vessel':
        return (
          <div className="space-y-6">
            {/* Vessel Details */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Anchor className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Vessel & Port Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Vessel Name *
                  </label>
                  <input
                    type="text"
                    name="vessel"
                    value={formData.vessel}
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
                    Voyage *
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
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Port of Loading *
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
                    name="loadingPier"
                    value={formData.loadingPier}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                      ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Originals Released At
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
                    Port of Discharge *
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
                    Place of Delivery *
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
                    Type of Movement *
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
                    <option value="FCL">FCL - Full Container Load</option>
                    <option value="LCL">LCL - Less than Container Load</option>
                    <option value="Breakbulk">Breakbulk</option>
                    <option value="Ro-Ro">Ro-Ro</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Origin & Pre-carriage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Globe className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Origin Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Point of Origin *
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
                      Country of Origin *
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

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Truck className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                  Pre-Carriage
                </h3>
                <div className="space-y-3">
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
                      Place of Receipt *
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
            </div>
          </div>
        );

      case 'containers':
        return (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Container className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
                Containers
              </h3>
              <button
                onClick={addContainer}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Plus className="w-4 h-4" />
                Add Container
              </button>
            </div>

            <div className="space-y-4">
              {formData.containers.map((container, index) => (
                <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white border'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Container #{index + 1}
                    </h4>
                    {formData.containers.length > 1 && (
                      <button
                        onClick={() => removeContainer(index)}
                        className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Container No. *
                      </label>
                      <input
                        type="text"
                        value={container.id}
                        onChange={(e) => handleContainerChange(index, 'id', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Seal No.
                      </label>
                      <input
                        type="text"
                        value={container.sealNo}
                        onChange={(e) => handleContainerChange(index, 'sealNo', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Size *
                      </label>
                      <select
                        value={container.size}
                        onChange={(e) => handleContainerChange(index, 'size', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                        required
                      >
                        <option value="20ft">20ft</option>
                        <option value="40ft">40ft</option>
                        <option value="40ft HC">40ft HC</option>
                        <option value="45ft">45ft</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Packages *
                      </label>
                      <input
                        type="number"
                        value={container.packages}
                        onChange={(e) => handleContainerChange(index, 'packages', parseInt(e.target.value))}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Gross Weight
                      </label>
                      <input
                        type="text"
                        value={container.weight}
                        onChange={(e) => handleContainerChange(index, 'weight', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                        placeholder="e.g., 12.5 tons"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Cargo Description
                      </label>
                      <input
                        type="text"
                        value={container.cargoDesc}
                        onChange={(e) => handleContainerChange(index, 'cargoDesc', e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                          ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {formData.containers.length === 0 && (
              <div className="text-center py-8">
                <Container className="w-12 h-12 mx-auto mb-4" style={{ color: colors.primary }} />
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  No containers added yet. Click "Add Container" to add one.
                </p>
              </div>
            )}
          </div>
        );

      case 'dates':
        return (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Calendar className="w-5 h-5 inline mr-2" style={{ color: colors.primary }} />
              Dates & Value
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Declared Value *
                </label>
                <input
                  type="text"
                  name="declaredValue"
                  value={formData.declaredValue}
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
                  Shipping Date *
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
                  Place of Final Delivery *
                </label>
                <input
                  type="text"
                  name="finalDelivery"
                  value={formData.finalDelivery}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200
                    ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  style={{ focusRingColor: colors.primary }}
                  required
                />
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
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Pending Documentation">Pending Documentation</option>
                  <option value="In Transit">In Transit</option>
                  <option value="In Customs">In Customs</option>
                  <option value="Delivered">Delivered</option>
                </select>
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
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/freight-forwarder/booking/${id}`)}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Edit Booking
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formData?.bookingNo} • {formData?.blNo}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => navigate(`/freight-forwarder/booking/${id}`)}
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
                  <SaveIcon className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'} mb-6`}>
          <div className="flex overflow-x-auto">
            {['transporter', 'consignee', 'vessel', 'containers', 'dates'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap
                  ${activeTab === tab 
                    ? '' 
                    : isDark ? 'text-gray-400 border-transparent hover:text-white' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
                style={{
                  borderColor: activeTab === tab ? colors.primary : 'transparent',
                  color: activeTab === tab ? colors.primary : undefined
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <form onSubmit={handleSubmit}>
          {renderTabContent()}
        </form>
      </div>
    </div>
  );
};

// Bell icon component (needed for notify party)
const Bell = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export default FreightForwarderBookingEdit;