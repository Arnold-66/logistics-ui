// roles/exporter/ExporterFreightBookingEdit.jsx
import React, { useState, useContext, useEffect } from 'react';
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
  ChevronDown,
  ChevronUp,
  Info,
  Anchor,
  FileSignature,
  CreditCard,
  Shield,
  Map,
  Layers,
  BarChart3,
  Activity,
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar as CalendarIcon,
  UserCheck,
  UserX,
  Ship as ShipIcon,
  Truck as TruckIcon,
  Navigation,
  Compass,
  Wind,
  Waves,
  Globe as GlobeIcon,
  Flag as FlagIcon,
  Users
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';

const ExporterFreightBookingEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedContainers, setExpandedContainers] = useState([]);

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

  // Sample booking data - in real app, fetch from API
  const bookingsData = {
    'FRT-2026-001': {
      id: 'FRT-2026-001',
      bookingNo: 'BKG-12345678',
      shipper: 'ImportFlow Ltd',
      shipperContact: 'John Doe',
      shipperEmail: 'john@importflow.com',
      shipperPhone: '+256 712 345 678',
      shipperAddress: 'Plot 45, Industrial Area, Kampala, Uganda',
      shipperTin: '1234567890',
      shipperLicense: 'EXP-2020-456',
      consignee: 'Global Importers Inc',
      consigneeContact: 'Sarah Kamau',
      consigneeEmail: 'sarah@globalimporters.com',
      consigneePhone: '+254 722 345 678',
      consigneeAddress: 'Plot 23, Industrial Area, Nairobi, Kenya',
      consigneeTin: '9876543210',
      vessel: 'MV Star Express',
      vesselScac: 'STEX',
      voyage: 'SE-2026-078',
      countryFlag: '🇺🇬',
      portOfLoading: 'Kampala, Uganda',
      loadingPier: 'Pier 3',
      portOfDischarge: 'Port of Mombasa',
      placeOfDelivery: 'Mombasa Port',
      finalDelivery: 'Kampala, Uganda',
      releaseLocation: 'Mombasa Port Office',
      movementType: 'CY-CY',
      preCarriageBy: 'Truck',
      placeOfReceipt: 'Kampala Depot',
      containers: [
        { 
          id: 'MSKU-458921', 
          size: '20ft', 
          packages: 450, 
          weight: '12.5 tons',
          sealNo: 'SEAL-001',
          serviceName: 'Standard Service',
          volume: '33.2 CBM',
          measurement: '5.9x2.35x2.39m',
          cargoDescription: 'Electronics Components - High-quality electronics components for industrial use',
          consigneeContact: 'Sarah Kamau',
          consigneePhone: '+254 722 345 678',
          hsCode: '8542.31',
          status: 'In Transit',
          items: [
            { name: 'Electronics Components', quantity: 450, weight: '2.5 tons' },
            { name: 'Circuit Boards', quantity: 1200, weight: '1.8 tons' },
            { name: 'Power Supplies', quantity: 850, weight: '2.2 tons' }
          ]
        },
        { 
          id: 'MSKU-458922', 
          size: '40ft', 
          packages: 320, 
          weight: '4.5 tons',
          sealNo: 'SEAL-002',
          serviceName: 'Standard Service',
          volume: '67.7 CBM',
          measurement: '12.0x2.35x2.39m',
          cargoDescription: 'Textile Fabrics and Dyeing Agents',
          consigneeContact: 'Sarah Kamau',
          consigneePhone: '+254 722 345 678',
          hsCode: '5208.11',
          status: 'In Transit',
          items: [
            { name: 'Textile Fabrics', quantity: 320, weight: '4.5 tons' },
            { name: 'Dyeing Agents', quantity: 150, weight: '0.5 tons' }
          ]
        }
      ],
      status: 'In Transit',
      declaredValue: '749,484,375 UGX',
      currency: 'UGX',
      shippingDate: '2026-07-25',
      eta: '2026-08-12 14:30',
      etd: '2026-07-26 08:00',
      submittedDate: '2026-07-20',
      lastUpdate: '2 hours ago',
      priority: 'High',
      freightTerms: 'Collect',
      insuranceRequired: true,
      dangerousGoods: false,
      temperatureControlled: false,
      customsBroker: 'Clearance Services Ltd',
      specialInstructions: 'Handle with care. Fragile items. Keep away from moisture.',
      color: colors.info,
      documents: [
        { name: 'Commercial Invoice', status: 'completed', date: '2026-07-22', number: 'INV-2026-001' },
        { name: 'Packing List', status: 'completed', date: '2026-07-22', number: 'PL-2026-001' },
        { name: 'Bill of Lading', status: 'pending', date: '2026-07-25', number: 'BOL-2026-001' },
        { name: 'Certificate of Origin', status: 'pending', date: '2026-07-28', number: 'CO-2026-001' },
        { name: 'UNBS CoC', status: 'pending', date: '2026-07-30', number: 'COC-2026-001' },
        { name: 'Proof of Payment', status: 'completed', date: '2026-07-20', number: 'POP-2026-001' }
      ],
      tracking: [
        { location: 'Kampala, Uganda', date: '2026-07-25', status: 'Loaded', description: 'Container loaded onto vessel' },
        { location: 'Indian Ocean', date: '2026-08-01', status: 'In Transit', description: 'Crossing Indian Ocean' },
        { location: 'Port of Mombasa', date: '2026-08-12', status: 'Expected', description: 'Expected arrival at port' }
      ],
      milestones: [
        { stage: 'Booking Submitted', date: '2026-07-20', completed: true, description: 'Booking successfully submitted' },
        { stage: 'Documentation Verified', date: '2026-07-22', completed: true, description: 'All documents verified' },
        { stage: 'Container Loaded', date: '2026-07-25', completed: true, description: 'Containers loaded onto vessel' },
        { stage: 'Vessel Departed', date: '2026-07-26', completed: true, description: 'Vessel departed from port of origin' },
        { stage: 'Arrived at Port', date: '2026-08-12', completed: false, description: 'Estimated arrival at destination port' },
        { stage: 'Customs Clearance', date: '2026-08-13', completed: false, description: 'Customs clearance process' },
        { stage: 'Delivery', date: '2026-08-15', completed: false, description: 'Final delivery to consignee' }
      ],
      transporter: {
        company: 'Global Transport Ltd',
        address: 'Plot 12, Transport Hub, Kampala, Uganda',
        contact: 'Peter Ochieng',
        phone: '+256 772 345 678',
        email: 'peter@globaltransport.com'
      },
      forwardingAgent: {
        name: 'Freight Forwarders Ltd',
        address: 'Suite 45, Trade Centre, Nairobi, Kenya',
        contact: 'Mary Wanjiru',
        phone: '+254 733 456 789',
        email: 'mary@freightforwarders.com'
      },
      notifyParty: {
        name: 'Shipping Department',
        address: 'Global Importers Inc, Nairobi, Kenya',
        contact: 'David Mwangi',
        phone: '+254 744 567 890',
        email: 'shipping@globalimporters.com'
      }
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    // 1. Transporter Details
    transporterCompany: '',
    transporterAddress: '',
    transporterContact: '',
    transporterPhone: '',
    transporterEmail: '',

    // 2. Shipper/Exporter
    shipperName: '',
    shipperAddress: '',
    shipperContact: '',
    shipperPhone: '',
    shipperEmail: '',
    shipperTaxId: '',
    shipperLicense: '',

    // 3. Booking No
    bookingNo: '',

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
        itemCount: 0,
        items: []
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
    freightTerms: 'Collect',
    priority: 'Medium',
    status: 'Pending Approval'
  });

  const steps = [
    { number: 1, label: 'Shipper & Transporter', icon: Building },
    { number: 2, label: 'Consignee & Agent', icon: User },
    { number: 3, label: 'Vessel & Route', icon: Ship },
    { number: 4, label: 'Containers & Cargo', icon: Container },
    { number: 5, label: 'Review & Save', icon: Save }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = bookingsData[id];
      if (data) {
        // Populate form data from booking data
        setFormData({
          // Transporter Details
          transporterCompany: data.transporter?.company || '',
          transporterAddress: data.transporter?.address || '',
          transporterContact: data.transporter?.contact || '',
          transporterPhone: data.transporter?.phone || '',
          transporterEmail: data.transporter?.email || '',

          // Shipper/Exporter
          shipperName: data.shipper || '',
          shipperAddress: data.shipperAddress || '',
          shipperContact: data.shipperContact || '',
          shipperPhone: data.shipperPhone || '',
          shipperEmail: data.shipperEmail || '',
          shipperTaxId: data.shipperTin || '',
          shipperLicense: data.shipperLicense || '',

          // Booking No
          bookingNo: data.bookingNo || '',

          // BL
          blNumber: data.blNumber || '',
          blType: data.blType || 'Original',
          blCopies: data.blCopies || 3,

          // Consignee
          consigneeName: data.consignee || '',
          consigneeAddress: data.consigneeAddress || '',
          consigneeContact: data.consigneeContact || '',
          consigneePhone: data.consigneePhone || '',
          consigneeEmail: data.consigneeEmail || '',
          consigneeCountry: data.consigneeCountry || '',
          consigneeTin: data.consigneeTin || '',

          // Forwarding Agent
          forwardingAgent: data.forwardingAgent?.name || '',
          forwardingAgentAddress: data.forwardingAgent?.address || '',
          forwardingAgentContact: data.forwardingAgent?.contact || '',
          forwardingAgentPhone: data.forwardingAgent?.phone || '',
          forwardingAgentEmail: data.forwardingAgent?.email || '',

          // Notify Party
          notifyPartyName: data.notifyParty?.name || '',
          notifyPartyAddress: data.notifyParty?.address || '',
          notifyPartyContact: data.notifyParty?.contact || '',
          notifyPartyPhone: data.notifyParty?.phone || '',
          notifyPartyEmail: data.notifyParty?.email || '',

          // Origin
          originPoint: data.portOfLoading || '',
          originCountry: data.countryFlag || 'Uganda',

          // Pre-Carriage
          preCarriageBy: data.preCarriageBy || '',
          placeOfReceipt: data.placeOfReceipt || '',

          // Vessel
          vesselName: data.vessel || '',
          vesselScac: data.vesselScac || '',
          voyage: data.voyage || '',
          countryFlag: data.countryFlag || '🇺🇬',
          portOfLoading: data.portOfLoading || '',
          loadingPier: data.loadingPier || '',
          releaseLocation: data.releaseLocation || '',
          portOfDischarge: data.portOfDischarge || '',
          placeOfDelivery: data.placeOfDelivery || '',
          movementType: data.movementType || 'CY-CY',

          // Containers
          containers: data.containers.map(c => ({
            id: c.id || '',
            sealNo: c.sealNo || '',
            serviceName: c.serviceName || '',
            size: c.size || '20ft',
            packages: c.packages || 0,
            grossWeight: c.weight || '',
            volume: c.volume || '',
            measurement: c.measurement || '',
            cargoDescription: c.cargoDescription || '',
            consigneeContact: c.consigneeContact || '',
            consigneePhone: c.consigneePhone || '',
            hsCode: c.hsCode || '',
            itemCount: c.items?.length || 0,
            items: c.items || []
          })),

          // Cargo Value & Dates
          declaredValue: data.declaredValue || '',
          currency: data.currency || 'UGX',
          shippingDate: data.shippingDate || '',
          eta: data.eta || '',
          finalDeliveryPlace: data.finalDelivery || '',

          // Additional
          specialInstructions: data.specialInstructions || '',
          insuranceRequired: data.insuranceRequired || false,
          dangerousGoods: data.dangerousGoods || false,
          temperatureControlled: data.temperatureControlled || false,
          customsBroker: data.customsBroker || '',
          freightTerms: data.freightTerms || 'Collect',
          priority: data.priority || 'Medium',
          status: data.status || 'Pending Approval'
        });
      } else {
        navigate('/exporter/freight-bookings');
      }
      setLoading(false);
    }, 300);
  }, [id, navigate]);

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
          itemCount: 0,
          items: []
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

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: colors.success + '20' }}>
            <CheckCircle className="w-12 h-12" style={{ color: colors.success }} />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Booking Updated Successfully!
          </h2>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Your freight booking has been updated successfully.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate(`/exporter/freight-booking/${id}`)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Eye className="w-4 h-4" />
              View Booking
            </button>
            <button
              onClick={() => navigate('/exporter/freight-bookings')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <FileText className="w-4 h-4" />
              View All Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Simplified render functions - reusing the same structure as the booking form
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
              Shipper Address
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

  // Step 2, 3, 4 would be similar to the booking form
  // For brevity, I'm showing the key parts, but you can reuse the same render functions from ExporterFreightBooking

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/exporter/freight-booking/${id}`)}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: colors.primary }} />
              </button>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Edit Freight Booking
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formData.bookingNo} - Update your booking details
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

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Step Content */}
        <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Step 2 content - Consignee, Forwarding Agent, Notify Party */}
              <div className="text-center py-12">
                <User className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
                <p className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Step 2: Consignee & Agent</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Use the same form as the booking creation</p>
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
          )}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Step 3 content - Vessel & Route */}
              <div className="text-center py-12">
                <Ship className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
                <p className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Step 3: Vessel & Route</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Use the same form as the booking creation</p>
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
          )}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Step 4 content - Containers & Cargo */}
              <div className="text-center py-12">
                <Container className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
                <p className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Step 4: Containers & Cargo</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Use the same form as the booking creation</p>
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
                  Review & Save
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          {currentStep === 5 && (
            <div className="space-y-6">
              {/* Step 5 - Review & Save */}
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
                <h2 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Review Your Changes
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Please review all the changes before saving
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-sm px-4 py-2 rounded-lg border"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    Go Back to Edit
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-200 ${
                      saving ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
                    }`}
                    style={{ backgroundColor: colors.primary }}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
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
              <div className="flex justify-between gap-3">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExporterFreightBookingEdit;