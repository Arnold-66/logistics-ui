// roles/importer/ImporterAssignmentDetails.jsx
import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/themeContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Ship, Package, Truck, Clock, Calendar, MapPin,
  Eye, CheckCircle, AlertCircle, AlertTriangle, AlertOctagon,
  Users, UserPlus, Building, Phone, Mail, Shield, Award,
  FileText, Download, MessageSquare, ChevronRight, ChevronDown,
  ChevronUp, X, Edit, Save, Printer, Share2, Link, Home,
  TrendingUp, TrendingDown, BarChart3, PieChart, Layers,
  ClipboardList, FileCheck, CreditCard, FileSignature,
  Anchor, Box, Navigation, Compass, Wind, Waves, Globe, Flag,
  Wifi, Coffee, Utensils, Tv, Bed, Bath, Zap, Thermometer, Gauge,
  MoreVertical, AlertOctagon as AlertOctagonIcon, Info, DollarSign,
  Clock as ClockIcon, Calendar as CalendarIcon, User as UserIcon
} from 'lucide-react';

const ImporterAssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFineDetails, setShowFineDetails] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

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

  // Sample assignment data - in real app, fetch from API
  const assignmentData = {
    '458': {
      id: '#458',
      importer: 'ImportFlow Ltd',
      origin: 'Shanghai, China',
      destination: 'Port of Mombasa',
      status: 'In Transit',
      progress: 70,
      eta: '12 Aug 2026',
      assignedDate: '2026-08-10',
      items: 450,
      weight: '12.5 tons',
      container: 'MSKU-458921',
      currentLocation: 'Indian Ocean',
      lastUpdate: '2 hours ago',
      assignedAgent: { 
        id: 1, 
        name: 'Swift Clearance Services',
        email: 'info@swiftclearance.co.ke',
        phone: '+254 712 345 678',
        rating: 4.8,
        specialties: ['Electronics', 'Chemicals'],
        experience: '8 years',
        licenseNo: 'CL-2026-00458'
      },
      customsDays: 0,
      riskLevel: 'low',
      riskWarnings: [],
      estimatedFine: 0,
      finePerDay: 0,
      fineThreshold: 5,
      clearanceStatus: 'Not Started',
      documents: [
        { name: 'Commercial Invoice', status: 'Uploaded', date: '2026-07-22' },
        { name: 'Bill of Lading', status: 'Uploaded', date: '2026-07-25' },
        { name: 'Packing List', status: 'Uploaded', date: '2026-07-23' },
        { name: 'Certificate of Origin', status: 'Pending', date: null },
        { name: 'PVoC Certificate', status: 'Pending', date: null }
      ],
      clearanceMilestones: [
        { stage: 'Document Submission', status: 'Completed', date: '2026-07-25', description: 'All documents submitted to customs' },
        { stage: 'Customs Assessment', status: 'In Progress', date: '2026-07-28', description: 'Customs reviewing documentation' },
        { stage: 'Physical Inspection', status: 'Pending', date: null, description: 'Awaiting customs inspection' },
        { stage: 'Duty Payment', status: 'Pending', date: null, description: 'Tax assessment pending' },
        { stage: 'Release', status: 'Pending', date: null, description: 'Awaiting final clearance' }
      ],
      timeline: [
        { date: '2026-07-15', event: 'Supplier dispatched goods', status: 'Completed' },
        { date: '2026-07-25', event: 'Vessel departed', status: 'Completed' },
        { date: '2026-08-05', event: 'Documents submitted to customs', status: 'Completed' },
        { date: '2026-08-10', event: 'Arrived Mombasa', status: 'In Progress' },
        { date: '2026-08-12', event: 'Customs inspection', status: 'Pending' },
        { date: '2026-08-15', event: 'Delivery', status: 'Pending' }
      ]
    },
    '459': {
      id: '#459',
      importer: 'ImportFlow Ltd',
      origin: 'Mumbai, India',
      destination: 'Kampala, Uganda',
      status: 'Customs Clearance',
      progress: 45,
      eta: '18 Aug 2026',
      assignedDate: '2026-08-12',
      items: 280,
      weight: '8.2 tons',
      container: 'IN-782341',
      currentLocation: 'Customs Checkpoint - Mombasa',
      lastUpdate: '5 hours ago',
      assignedAgent: null,
      customsDays: 4,
      riskLevel: 'high',
      riskWarnings: [
        'Documentation incomplete - Missing COC certificate',
        'Customs hold - Additional inspection required',
        'Fine accruing: $500/day after 5 days'
      ],
      estimatedFine: 0,
      finePerDay: 500,
      fineThreshold: 5,
      clearanceStatus: 'In Progress',
      documents: [
        { name: 'Commercial Invoice', status: 'Uploaded', date: '2026-08-01' },
        { name: 'Bill of Lading', status: 'Uploaded', date: '2026-08-05' },
        { name: 'Packing List', status: 'Uploaded', date: '2026-08-03' },
        { name: 'Certificate of Origin', status: 'Uploaded', date: '2026-08-06' },
        { name: 'COC Certificate', status: 'Missing', date: null }
      ],
      clearanceMilestones: [
        { stage: 'Document Submission', status: 'Completed', date: '2026-08-12', description: 'Initial documents submitted' },
        { stage: 'Customs Assessment', status: 'Completed', date: '2026-08-14', description: 'Customs requested additional documents' },
        { stage: 'Physical Inspection', status: 'In Progress', date: '2026-08-15', description: 'Inspection in progress' },
        { stage: 'Duty Payment', status: 'Pending', date: null, description: 'Awaiting tax assessment' },
        { stage: 'Release', status: 'Pending', date: null, description: 'Awaiting final clearance' }
      ],
      timeline: [
        { date: '2026-08-01', event: 'Supplier dispatched goods', status: 'Completed' },
        { date: '2026-08-08', event: 'Vessel departed', status: 'Completed' },
        { date: '2026-08-12', event: 'Arrived Mombasa', status: 'Completed' },
        { date: '2026-08-14', event: 'Customs hold - Additional docs required', status: 'In Progress' },
        { date: '2026-08-18', event: 'Expected release', status: 'Pending' }
      ]
    },
    '462': {
      id: '#462',
      importer: 'ImportFlow Ltd',
      origin: 'Hamburg, Germany',
      destination: 'Kampala, Uganda',
      status: 'Customs Clearance',
      progress: 60,
      eta: '15 Sep 2026',
      assignedDate: '2026-08-20',
      items: 200,
      weight: '6.8 tons',
      container: 'DE-782341',
      currentLocation: 'Mombasa Port - Customs Bond',
      lastUpdate: '3 hours ago',
      assignedAgent: { 
        id: 3, 
        name: 'East Africa Customs Solutions',
        email: 'support@eacustoms.co.ke',
        phone: '+254 734 567 890',
        rating: 4.2,
        specialties: ['Food Products', 'Construction'],
        experience: '12 years',
        licenseNo: 'CL-2026-00462'
      },
      customsDays: 7,
      riskLevel: 'critical',
      riskWarnings: [
        '⚠️ CRITICAL: 7 days in customs bond',
        'Fine accruing: $1,200/day after 5 days',
        'Documentation discrepancy - HS Code mismatch',
        'Action required: Submit corrected documentation within 24 hours'
      ],
      estimatedFine: 2400,
      finePerDay: 1200,
      fineThreshold: 5,
      clearanceStatus: 'At Risk',
      documents: [
        { name: 'Commercial Invoice', status: 'Uploaded', date: '2026-08-22' },
        { name: 'Bill of Lading', status: 'Uploaded', date: '2026-08-25' },
        { name: 'Packing List', status: 'Uploaded', date: '2026-08-23' },
        { name: 'Certificate of Origin', status: 'Uploaded', date: '2026-08-24' },
        { name: 'COC Certificate', status: 'Rejected', date: '2026-08-26' }
      ],
      clearanceMilestones: [
        { stage: 'Document Submission', status: 'Completed', date: '2026-08-25', description: 'Documents submitted with errors' },
        { stage: 'Customs Assessment', status: 'Completed', date: '2026-08-27', description: 'HS Code mismatch identified' },
        { stage: 'Physical Inspection', status: 'Completed', date: '2026-08-28', description: 'Inspection completed' },
        { stage: 'Duty Payment', status: 'In Progress', date: '2026-08-29', description: 'Additional duties being assessed' },
        { stage: 'Release', status: 'Pending', date: null, description: 'Awaiting final clearance' }
      ],
      timeline: [
        { date: '2026-08-20', event: 'Supplier dispatched goods', status: 'Completed' },
        { date: '2026-08-25', event: 'Vessel departed', status: 'Completed' },
        { date: '2026-09-05', event: 'Arrived Mombasa', status: 'Completed' },
        { date: '2026-09-07', event: 'Customs hold - HS Code mismatch', status: 'In Progress' },
        { date: '2026-09-10', event: 'Corrected docs submitted', status: 'Pending' },
        { date: '2026-09-15', event: 'Expected release', status: 'Pending' }
      ]
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = assignmentData[id];
      if (data) {
        // Calculate fines if applicable
        if (data.customsDays > data.fineThreshold) {
          const daysOver = data.customsDays - data.fineThreshold;
          data.estimatedFine = daysOver * data.finePerDay;
        }
        setAssignment(data);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Completed': { bg: colors.success + '20', color: colors.success, icon: <CheckCircle className="w-3 h-3" /> },
      'In Progress': { bg: colors.warning + '20', color: colors.warning, icon: <Clock className="w-3 h-3" /> },
      'Pending': { bg: colors.info + '20', color: colors.info, icon: <Clock className="w-3 h-3" /> },
      'Missing': { bg: colors.danger + '20', color: colors.danger, icon: <AlertCircle className="w-3 h-3" /> },
      'Rejected': { bg: colors.danger + '20', color: colors.danger, icon: <AlertTriangle className="w-3 h-3" /> },
      'Uploaded': { bg: colors.success + '20', color: colors.success, icon: <CheckCircle className="w-3 h-3" /> }
    };
    return statusMap[status] || statusMap['Pending'];
  };

  const getRiskBadge = (riskLevel) => {
    const riskMap = {
      'low': { bg: colors.success + '20', color: colors.success, label: 'Low Risk', icon: <CheckCircle className="w-3 h-3" /> },
      'medium': { bg: colors.warning + '20', color: colors.warning, label: 'Medium Risk', icon: <AlertCircle className="w-3 h-3" /> },
      'high': { bg: colors.danger + '20', color: colors.danger, label: 'High Risk', icon: <AlertTriangle className="w-3 h-3" /> },
      'critical': { bg: colors.danger + '30', color: colors.danger, label: 'CRITICAL', icon: <AlertOctagon className="w-3 h-3" /> }
    };
    return riskMap[riskLevel] || riskMap['low'];
  };

  const getClearanceStatusColor = (status) => {
    const statusMap = {
      'Not Started': colors.info,
      'In Progress': colors.warning,
      'At Risk': colors.danger,
      'Completed': colors.success
    };
    return statusMap[status] || colors.info;
  };

  const getAssignmentStatusColor = (status) => {
    const statusMap = {
      'In Transit': colors.primary,
      'Customs Clearance': colors.warning,
      'Delivered': colors.success,
      'Pending': colors.info
    };
    return statusMap[status] || colors.info;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading assignment details...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Assignment not found</h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>The assignment you're looking for doesn't exist</p>
          <button
            onClick={() => navigate('/importer-assignments')}
            className="mt-4 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Assignments
          </button>
        </div>
      </div>
    );
  }

  const riskBadge = getRiskBadge(assignment.riskLevel);
  const clearanceStatusColor = getClearanceStatusColor(assignment.clearanceStatus);

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/importer-assignments')}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: colors.primary }} />
            </button>
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Assignment {assignment.id}
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {assignment.origin} → {assignment.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2`}
              style={{ backgroundColor: riskBadge.bg, color: riskBadge.color }}>
              {riskBadge.icon}
              {riskBadge.label}
            </span>
            {assignment.assignedAgent && (
              <button
                onClick={() => setShowContactModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: colors.primaryBg, color: colors.primary }}
              >
                <MessageSquare className="w-4 h-4" />
                Contact Agent
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</p>
            <p className={`text-sm font-bold mt-1`} style={{ color: getAssignmentStatusColor(assignment.status) }}>
              {assignment.status}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Progress</p>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{assignment.progress}%</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Customs Days</p>
            <p className={`text-xl font-bold ${assignment.customsDays > 5 ? 'text-red-500' : 'text-yellow-500'}`}>
              {assignment.customsDays}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fine Estimate</p>
            <p className={`text-xl font-bold ${assignment.estimatedFine > 0 ? 'text-red-500' : 'text-green-500'}`}>
              ${assignment.estimatedFine.toLocaleString()}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clearance Status</p>
            <p className={`text-sm font-bold mt-1`} style={{ color: clearanceStatusColor }}>
              {assignment.clearanceStatus}
            </p>
          </div>
        </div>

        {/* Risk Alert - Critical */}
        {assignment.riskLevel === 'critical' && (
          <div className="p-4 rounded-lg mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500">
            <div className="flex items-start gap-3">
              <AlertOctagon className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-red-700 dark:text-red-400">CRITICAL ALERT</h4>
                <p className="text-sm text-red-600 dark:text-red-300">
                  This shipment is at critical risk. Immediate action required.
                </p>
                <div className="mt-2 space-y-1">
                  {assignment.riskWarnings.map((warning, idx) => (
                    <p key={idx} className="text-xs text-red-600 dark:text-red-300">
                      {warning}
                    </p>
                  ))}
                </div>
                <button
                  className="mt-3 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.danger }}
                >
                  <AlertOctagon className="w-4 h-4 inline mr-2" />
                  Take Action Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fine Details */}
        {assignment.customsDays > assignment.fineThreshold && (
          <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-red-500" />
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Fine Accruing
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    ${assignment.finePerDay}/day after {assignment.fineThreshold} days
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold text-red-500`}>
                  ${assignment.estimatedFine.toLocaleString()}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Accrued so far
                </p>
              </div>
            </div>
            <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min(100, (assignment.customsDays / 10) * 100)}%`,
                  backgroundColor: assignment.customsDays > 7 ? colors.danger : colors.warning
                }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Day {assignment.fineThreshold} (Threshold)
              </span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                Day {assignment.customsDays} (Current)
              </span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'} mb-6`}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'overview' ? colors.primary : 'transparent' }}
            >
              <Info className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'documents' ? colors.primary : 'transparent' }}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Documents ({assignment.documents.length})
            </button>
            <button
              onClick={() => setActiveTab('clearance')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'clearance'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'clearance' ? colors.primary : 'transparent' }}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Clearance Progress
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'timeline' ? colors.primary : 'transparent' }}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Timeline
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipment Details */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Shipment Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Shipment ID</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Importer</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.importer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Origin</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Destination</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>ETA</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Assigned Date</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.assignedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cargo Details */}
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Cargo Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Container</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.container}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Items</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.items}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Weight</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Current Location</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.currentLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Last Update</span>
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>{assignment.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Details */}
                {assignment.assignedAgent && (
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Users className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                      Assigned Agent
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1 text-sm">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {assignment.assignedAgent.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            {assignment.assignedAgent.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" style={{ color: colors.primary }} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            {assignment.assignedAgent.phone}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4" style={{ color: colors.primary }} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            ★ {assignment.assignedAgent.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" style={{ color: colors.primary }} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            {assignment.assignedAgent.experience}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" style={{ color: colors.primary }} />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            License: {assignment.assignedAgent.licenseNo}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {assignment.assignedAgent.specialties.map((spec, idx) => (
                            <span key={idx} className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Risk Warnings */}
                {assignment.riskWarnings.length > 0 && (
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <AlertTriangle className="w-4 h-4 inline mr-2" style={{ color: colors.danger }} />
                      Risk Warnings
                    </h4>
                    <div className="space-y-1">
                      {assignment.riskWarnings.map((warning, idx) => (
                        <p key={idx} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} flex items-start gap-2`}>
                          <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          {warning}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-3">
                {assignment.documents.map((doc, idx) => {
                  const statusStyle = getStatusBadge(doc.status);
                  return (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4" style={{ color: colors.primary }} />
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {doc.name}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {doc.date || 'Not uploaded'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1`}
                          style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                          {statusStyle.icon}
                          {doc.status}
                        </span>
                        {doc.status === 'Missing' && (
                          <button
                            className="text-xs px-2 py-1 rounded-lg text-white transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.danger }}
                          >
                            Upload Now
                          </button>
                        )}
                        {doc.status === 'Rejected' && (
                          <button
                            className="text-xs px-2 py-1 rounded-lg text-white transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.warning }}
                          >
                            Re-upload
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Clearance Progress Tab */}
            {activeTab === 'clearance' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Clearance Progress
                    </h4>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full`}
                      style={{ backgroundColor: clearanceStatusColor + '20', color: clearanceStatusColor }}>
                      {assignment.clearanceStatus}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {assignment.clearanceMilestones.map((milestone, idx) => {
                      const statusStyle = getStatusBadge(milestone.status);
                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="relative flex items-center justify-center w-6">
                            <div className={`w-3 h-3 rounded-full ${milestone.status === 'Completed' ? 'bg-green-500' : milestone.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                            {idx < assignment.clearanceMilestones.length - 1 && (
                              <div className={`absolute top-4 w-0.5 h-8 ${milestone.status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {milestone.stage}
                              </p>
                              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                                style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                {statusStyle.icon}
                                {milestone.status}
                              </span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {milestone.description}
                            </p>
                            {milestone.date && (
                              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                {milestone.date}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Fine Details */}
                {assignment.customsDays > 0 && (
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <DollarSign className="w-4 h-4 inline mr-2" style={{ color: colors.danger }} />
                      Fine & Penalties
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Days in Customs</p>
                        <p className={`font-bold ${assignment.customsDays > 5 ? 'text-red-500' : 'text-yellow-500'}`}>
                          {assignment.customsDays} days
                        </p>
                      </div>
                      <div>
                        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Fine Threshold</p>
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {assignment.fineThreshold} days
                        </p>
                      </div>
                      <div>
                        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Accrued Fine</p>
                        <p className={`font-bold ${assignment.estimatedFine > 0 ? 'text-red-500' : 'text-green-500'}`}>
                          ${assignment.estimatedFine.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-3">
                {assignment.timeline.map((item, idx) => {
                  const statusStyle = getStatusBadge(item.status);
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="relative flex items-center justify-center w-6">
                        <div className={`w-3 h-3 rounded-full ${item.status === 'Completed' ? 'bg-green-500' : item.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                        {idx < assignment.timeline.length - 1 && (
                          <div className={`absolute top-4 w-0.5 h-8 ${item.status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.event}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1`}
                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                            {statusStyle.icon}
                            {item.status}
                          </span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {item.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {!assignment.assignedAgent && assignment.status !== 'Delivered' && (
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: colors.primary }}
            >
              <UserPlus className="w-4 h-4" />
              Assign Agent
            </button>
          )}
          {assignment.assignedAgent && (
            <button
              onClick={() => setShowContactModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: colors.primaryBg, color: colors.primary }}
            >
              <MessageSquare className="w-4 h-4" />
              Contact Agent
            </button>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: colors.success, color: 'white' }}
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Contact Agent Modal */}
      {showContactModal && assignment.assignedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" style={{ color: colors.primary }} />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Contact Agent
                </h3>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" style={{ color: colors.primary }} />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {assignment.assignedAgent.name}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {assignment.id} • {assignment.destination}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter message subject..."
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    defaultValue={`Question about shipment ${assignment.id}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    placeholder="Type your message here..."
                    rows="4"
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    defaultValue={`I would like to get an update on the clearance status of shipment ${assignment.id}. Please let me know if you need any additional information.`}
                  />
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setShowContactModal(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                Cancel
              </button>
              <button
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Send icon component
const Send = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default ImporterAssignmentDetails;