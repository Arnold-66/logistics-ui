// roles/exporter/ExporterFreightBooking.jsx
import React, { useState, useContext } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Container,
  FileText,
  MapPin,
  Package,
  Ship,
  Truck,
  User,
  Building,
  Phone,
  Mail,
  Globe,
  Flag,
  Weight,
  Ruler,
  Box,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Trash2,
  Save,
  Send,
  Download,
  Printer,
  Edit,
  Eye,
  Home,
  ChevronRight,
  Info,
  Anchor,
  FileSignature,
  CreditCard,
  Shield,
  Map,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const ExporterFreightBooking = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedContainers, setExpandedContainers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

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
    pink: '#ec4899'
  };

  const isDark = darkMode

  // Form state
  const [formData, setFormData] = useState({
    // 1. Transporter Details
    transporterCompany: '',
    transporterAddress: '',
    transporterContact: '',
    transporterPhone: '',
    transporterEmail: '',

    // 2. Shipper/Exporter
    shipperName: user?.companyName || '',
    shipperAddress: user?.address || '',
    shipperContact: user?.name || '',
    shipperPhone: user?.phone || '',
    shipperEmail: user?.email || '',
    shipperTaxId: '',
    shipperLicense: '',

    // 3. Booking No
    bookingNo: 'BKG-' + Date.now().toString().slice(-8),

    // 4. BL (Bill of Lading)
    blNumber: '',
    blType: 'Original',
    blCopies: 3,

    // 5. Consignee (Importer)
    consigneeName: '',
    consigneeAddress: '',
    consigneeContact: '',
    consigneePhone: '',
    consigneeEmail: '',
    consigneeCountry: '',
    consigneeTin: '',

    // 6. Forwarding Agent
    forwardingAgent: '',
    forwardingAgentAddress: '',
    forwardingAgentContact: '',
    forwardingAgentPhone: '',
    forwardingAgentEmail: '',

    // 7. Notify Party
    notifyPartyName: '',
    notifyPartyAddress: '',
    notifyPartyContact: '',
    notifyPartyPhone: '',
    notifyPartyEmail: '',

    // 8. Point and Country of Origin
    originPoint: '',
    originCountry: 'Uganda',

    // 9. Pre-Carriage By
    preCarriageBy: '',

    // 10. Place of Receipt
    placeOfReceipt: '',

    // 11. Vessel
    vesselName: '',
    vesselScac: '',

    // 12. Voyage
    voyage: '',

    // 13. Country Flag
    countryFlag: '🇺🇬',

    // 14. Port of Loading
    portOfLoading: '',

    // 15. Loading Pier/Terminal
    loadingPier: '',

    // 16. Originals to be released at
    releaseLocation: '',

    // 17. Port of Discharge
    portOfDischarge: '',

    // 18. Place of Delivery
    placeOfDelivery: '',

    // 19. Type of Movement
    movementType: 'CY-CY',

    // 20. Container Info
    containers: [
      {
        id: '',
        sealNo: '',
        serviceName: '',
        size: '20ft',
        packages: 0,
        grossWeight: '',
        volume: '',
        measurement: '',
        cargoDescription: '',
        consigneeContact: '',
        consigneePhone: '',
        hsCode: '',
        itemCount: 0
      }
    ],

    // 21. Declared Cargo Value
    declaredValue: '',
    currency: 'UGX',

    // 22. Shipping Date
    shippingDate: '',

    // 23. ETA
    eta: '',

    // 24. Place of Final Delivery
    finalDeliveryPlace: '',

    // Additional Fields
    specialInstructions: '',
    insuranceRequired: false,
    dangerousGoods: false,
    temperatureControlled: false,
    customsBroker: '',
    freightTerms: 'Collect'
  });

  const steps = [
    { number: 1, label: 'Shipper & Transporter', icon: Building },
    { number: 2, label: 'Consignee & Agent', icon: User },
    { number: 3, label: 'Vessel & Route', icon: Ship },
    { number: 4, label: 'Containers & Cargo', icon: Container },
    { number: 5, label: 'Review & Submit', icon: Send }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContainerChange = (index, field, value) => {
    const updatedContainers = [...formData.containers];
    updatedContainers[index] = { ...updatedContainers[index], [field]: value };
    setFormData(prev => ({ ...prev, containers: updatedContainers }));
  };

  const addContainer = () => {
    setFormData(prev => ({
      ...prev,
      containers: [
        ...prev.containers,
        {
          id: '',
          sealNo: '',
          serviceName: '',
          size: '20ft',
          packages: 0,
          grossWeight: '',
          volume: '',
          measurement: '',
          cargoDescription: '',
          consigneeContact: '',
          consigneePhone: '',
          hsCode: '',
          itemCount: 0
        }
      ]
    }));
  };

  const removeContainer = (index) => {
    if (formData.containers.length > 1) {
      const updatedContainers = formData.containers.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, containers: updatedContainers }));
    }
  };

  const toggleContainerExpand = (index) => {
    if (expandedContainers.includes(index)) {
      setExpandedContainers(expandedContainers.filter(i => i !== index));
    } else {
      setExpandedContainers([...expandedContainers, index]);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setBookingReference('FRT-' + Date.now().toString().slice(-8));
    }, 1500);
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const StepIcon = step.icon;

          return (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <button
                  onClick={() => setCurrentStep(step.number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-lg'
                      : isCompleted
                      ? 'text-white'
                      : isDark
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  style={{ backgroundColor: isActive || isCompleted ? colors.primary : '' }}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      isCompleted || isActive ? 'bg-primary' : isDark ? 'bg-gray-700' : 'bg-gray-300'
                    }`}
                    style={{ backgroundColor: isCompleted || isActive ? colors.primary : '' }}
                  />
                )}
              </div>
              <span className={`text-xs mt-2 ${isActive ? 'text-primary font-medium' : isDark ? 'text-gray-400' : 'text-gray-500'}`}
                style={{ color: isActive ? colors.primary : '' }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Transporter Details */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          1. Transporter Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Company Name *
            </label>
            <input
              type="text"
              name="transporterCompany"
              value={formData.transporterCompany}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              name="transporterAddress"
              value={formData.transporterAddress}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              name="transporterContact"
              value={formData.transporterContact}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Phone Number *
            </label>
            <input
              type="tel"
              name="transporterPhone"
              value={formData.transporterPhone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <input
              type="email"
              name="transporterEmail"
              value={formData.transporterEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
        </div>
      </div>

      {/* Shipper/Exporter Details */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          2. Shipper / Exporter Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Company Name *
            </label>
            <input
              type="text"
              name="shipperName"
              value={formData.shipperName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Tax ID / TIN
            </label>
            <input
              type="text"
              name="shipperTaxId"
              value={formData.shipperTaxId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Export License
            </label>
            <input
              type="text"
              name="shipperLicense"
              value={formData.shipperLicense}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Booking No
            </label>
            <input
              type="text"
              name="bookingNo"
              value={formData.bookingNo}
              className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-500'} cursor-not-allowed`}
              disabled
            />
          </div>
        </div>
      </div>

      {/* BL Details */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          4. Bill of Lading Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              BL Number
            </label>
            <input
              type="text"
              name="blNumber"
              value={formData.blNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              BL Type
            </label>
            <select
              name="blType"
              value={formData.blType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="Original">Original</option>
              <option value="Telex Release">Telex Release</option>
              <option value="Sea Waybill">Sea Waybill</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Number of Copies
            </label>
            <input
              type="number"
              name="blCopies"
              value={formData.blCopies}
              onChange={handleInputChange}
              min="1"
              max="10"
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Consignee (Importer) */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          5. Consignee (Importer) Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Company Name *
            </label>
            <input
              type="text"
              name="consigneeName"
              value={formData.consigneeName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Country
            </label>
            <input
              type="text"
              name="consigneeCountry"
              value={formData.consigneeCountry}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              TIN Number
            </label>
            <input
              type="text"
              name="consigneeTin"
              value={formData.consigneeTin}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
        </div>
      </div>

      {/* Forwarding Agent */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          6. Forwarding Agent
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Agent Name
            </label>
            <input
              type="text"
              name="forwardingAgent"
              value={formData.forwardingAgent}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              name="forwardingAgentEmail"
              value={formData.forwardingAgentEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
        </div>
      </div>

      {/* Notify Party */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          7. Notify Party
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              type="text"
              name="notifyPartyName"
              value={formData.notifyPartyName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              name="notifyPartyEmail"
              value={formData.notifyPartyEmail}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Origin & Route */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          8-10. Origin & Route Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Point and Country of Origin *
            </label>
            <input
              type="text"
              name="originPoint"
              value={formData.originPoint}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Country Flag
            </label>
            <select
              name="countryFlag"
              value={formData.countryFlag}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="🇺🇬">🇺🇬 Uganda</option>
              <option value="🇰🇪">🇰🇪 Kenya</option>
              <option value="🇹🇿">🇹🇿 Tanzania</option>
              <option value="🇷🇼">🇷🇼 Rwanda</option>
              <option value="🇧🇮">🇧🇮 Burundi</option>
              <option value="🇨🇩">🇨🇩 DRC</option>
              <option value="🇿🇦">🇿🇦 South Africa</option>
              <option value="🇨🇳">🇨🇳 China</option>
              <option value="🇮🇳">🇮🇳 India</option>
              <option value="🇺🇸">🇺🇸 USA</option>
              <option value="🇬🇧">🇬🇧 UK</option>
              <option value="🇩🇪">🇩🇪 Germany</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Pre-Carriage By
            </label>
            <input
              type="text"
              name="preCarriageBy"
              value={formData.preCarriageBy}
              onChange={handleInputChange}
              placeholder="e.g., Truck, Rail, etc."
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
        </div>
      </div>

      {/* Vessel Details */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          11-15. Vessel & Port Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Vessel Name *
            </label>
            <input
              type="text"
              name="vesselName"
              value={formData.vesselName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Vessel SCAC Code
            </label>
            <input
              type="text"
              name="vesselScac"
              value={formData.vesselScac}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Voyage Number *
            </label>
            <input
              type="text"
              name="voyage"
              value={formData.voyage}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Originals to be released at
            </label>
            <input
              type="text"
              name="releaseLocation"
              value={formData.releaseLocation}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
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
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Type of Movement
            </label>
            <select
              name="movementType"
              value={formData.movementType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="CY-CY">CY-CY (Container Yard to Container Yard)</option>
              <option value="CY-CFS">CY-CFS (Container Yard to Container Freight Station)</option>
              <option value="CFS-CY">CFS-CY (Container Freight Station to Container Yard)</option>
              <option value="CFS-CFS">CFS-CFS (Container Freight Station to Container Freight Station)</option>
              <option value="Door-Door">Door to Door</option>
              <option value="Door-CY">Door to Container Yard</option>
              <option value="Door-CFS">Door to Container Freight Station</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      {/* Container Info */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            20. Container Information
          </h3>
          <button
            onClick={addContainer}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            <Plus className="w-4 h-4" />
            Add Container
          </button>
        </div>

        {formData.containers.map((container, index) => {
          const isExpanded = expandedContainers.includes(index);
          return (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleContainerExpand(index)}>
                <div className="flex items-center gap-3">
                  <Container className="w-5 h-5" style={{ color: colors.primary }} />
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Container {index + 1}
                    {container.id && ` - ${container.id}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {formData.containers.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeContainer(index); }}
                      className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Container No. *
                      </label>
                      <input
                        type="text"
                        value={container.id}
                        onChange={(e) => handleContainerChange(index, 'id', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
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
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Service Name
                      </label>
                      <input
                        type="text"
                        value={container.serviceName}
                        onChange={(e) => handleContainerChange(index, 'serviceName', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Container Size *
                      </label>
                      <select
                        value={container.size}
                        onChange={(e) => handleContainerChange(index, 'size', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      >
                        <option value="20ft">20ft Standard</option>
                        <option value="40ft">40ft Standard</option>
                        <option value="40ft HC">40ft High Cube</option>
                        <option value="45ft">45ft Standard</option>
                        <option value="20ft Reefer">20ft Reefer</option>
                        <option value="40ft Reefer">40ft Reefer</option>
                        <option value="20ft Open Top">20ft Open Top</option>
                        <option value="40ft Open Top">40ft Open Top</option>
                        <option value="20ft Flat Rack">20ft Flat Rack</option>
                        <option value="40ft Flat Rack">40ft Flat Rack</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Number of Packages *
                      </label>
                      <input
                        type="number"
                        value={container.packages}
                        onChange={(e) => handleContainerChange(index, 'packages', parseInt(e.target.value) || 0)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Gross Weight (kg) *
                      </label>
                      <input
                        type="text"
                        value={container.grossWeight}
                        onChange={(e) => handleContainerChange(index, 'grossWeight', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Volume (CBM) *
                      </label>
                      <input
                        type="text"
                        value={container.volume}
                        onChange={(e) => handleContainerChange(index, 'volume', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Measurement (LxWxH)
                      </label>
                      <input
                        type="text"
                        value={container.measurement}
                        onChange={(e) => handleContainerChange(index, 'measurement', e.target.value)}
                        placeholder="e.g., 5.9x2.35x2.39m"
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Cargo Description *
                    </label>
                    <textarea
                      value={container.cargoDescription}
                      onChange={(e) => handleContainerChange(index, 'cargoDescription', e.target.value)}
                      rows="2"
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Consignee Contact
                      </label>
                      <input
                        type="text"
                        value={container.consigneeContact}
                        onChange={(e) => handleContainerChange(index, 'consigneeContact', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Consignee Phone
                      </label>
                      <input
                        type="tel"
                        value={container.consigneePhone}
                        onChange={(e) => handleContainerChange(index, 'consigneePhone', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        HS Code
                      </label>
                      <input
                        type="text"
                        value={container.hsCode}
                        onChange={(e) => handleContainerChange(index, 'hsCode', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                          isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        style={{ focusRingColor: colors.primary }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cargo Value & Dates */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          21-24. Cargo Value, Dates & Final Delivery
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Declared Cargo Value *
            </label>
            <input
              type="text"
              name="declaredValue"
              value={formData.declaredValue}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="UGX">UGX</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="KES">KES</option>
              <option value="TZS">TZS</option>
              <option value="RWF">RWF</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Shipping Date *
            </label>
            <input
              type="date"
              name="shippingDate"
              value={formData.shippingDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Estimated Time of Arrival (ETA) *
            </label>
            <input
              type="datetime-local"
              name="eta"
              value={formData.eta}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Place of Final Delivery *
            </label>
            <input
              type="text"
              name="finalDeliveryPlace"
              value={formData.finalDeliveryPlace}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              required
            />
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Customs Broker
            </label>
            <input
              type="text"
              name="customsBroker"
              value={formData.customsBroker}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Freight Terms
            </label>
            <select
              name="freightTerms"
              value={formData.freightTerms}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="Collect">Freight Collect</option>
              <option value="Prepaid">Freight Prepaid</option>
              <option value="Third Party">Third Party</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Special Instructions
            </label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              rows="3"
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-4">
            <label className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <input
                type="checkbox"
                name="insuranceRequired"
                checked={formData.insuranceRequired}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300"
                style={{ accentColor: colors.primary }}
              />
              Insurance Required
            </label>
            <label className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <input
                type="checkbox"
                name="dangerousGoods"
                checked={formData.dangerousGoods}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300"
                style={{ accentColor: colors.primary }}
              />
              Dangerous Goods
            </label>
            <label className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <input
                type="checkbox"
                name="temperatureControlled"
                checked={formData.temperatureControlled}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300"
                style={{ accentColor: colors.primary }}
              />
              Temperature Controlled
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={nextStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          Review Booking
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6" style={{ color: colors.primary }} />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Booking Summary
          </h3>
        </div>

        <div className="space-y-4">
          {/* Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Booking No</p>
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.bookingNo}</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipper</p>
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.shipperName || 'Not specified'}</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Vessel</p>
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.vesselName || 'Not specified'}</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Consignee</p>
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.consigneeName || 'Not specified'}</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Loading</p>
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.portOfLoading || 'Not specified'}</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Port of Discharge</p>
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.portOfDischarge || 'Not specified'}</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Containers</p>
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formData.containers.length}</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Declared Value</p>
              <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formData.declaredValue ? `${formData.currency} ${formData.declaredValue}` : 'Not specified'}
              </p>
            </div>
          </div>

          {/* Container Summary */}
          <div>
            <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Containers ({formData.containers.length})
            </h4>
            <div className="space-y-2">
              {formData.containers.map((container, idx) => (
                <div key={idx} className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {container.id || `Container ${idx + 1}`}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {container.size} • {container.packages} packages • {container.grossWeight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 ${
            submitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
          style={{ backgroundColor: colors.primary }}
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Booking
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: colors.success + '20' }}>
        <CheckCircle className="w-12 h-12" style={{ color: colors.success }} />
      </div>
      <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Booking Submitted Successfully!
      </h2>
      <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Your freight booking has been submitted and is being processed.
      </p>
      <div className={`inline-block p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Booking Reference</p>
        <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{bookingReference}</p>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => navigate('/exporter-dashboard')}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          <Home className="w-4 h-4" />
          Go to Dashboard
        </button>
        <button
          onClick={() => {
            setSubmitted(false);
            setCurrentStep(1);
            // Reset form logic would go here
          }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <Plus className="w-4 h-4" />
          New Booking
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          <Printer className="w-4 h-4" />
          Print Confirmation
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/exporter-dashboard')}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: colors.primary }} />
              </button>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Freight Booking
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Book freight services for your export shipments
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>

        {!submitted ? (
          <>
            {/* Step Indicator */}
            {renderStepIndicator()}

            {/* Step Content */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>
          </>
        ) : (
          <div className={`rounded-lg p-8 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
            {renderSuccess()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExporterFreightBooking;