import React, { useState, useContext, useEffect } from 'react';
import {
  FileText,
  FileCheck,
  FileSignature,
  CreditCard,
  Shield,
  FileBarChart,
  Download,
  Eye,
  Share2,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Building,
  Package,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  RotateCw,
  Printer,
  Home,
  ChevronDown,
  ChevronUp,
  Link,
  MessageSquare,
  Users,
  Truck,
  Ship,
  Anchor,
  Briefcase,
  ClipboardList,
  UserCheck,
  FileSpreadsheet,
  FolderOpen,
  Info,
  RefreshCw,
  ExternalLink,
  Edit,
  Upload,
  Trash2,
  MoreVertical,
  Flag,
  Star
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useParams } from 'react-router-dom';

const ClearingAgentDocumentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('preview');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadComment, setUploadComment] = useState('');
  const [showActionsMenu, setShowActionsMenu] = useState(false);

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
    indigo: '#6366f1',
    pink: '#ec4899',
    cyan: '#06b6d4',
    orange: '#f97316'
  };

  const isDark = darkMode

  // Document data with rich content
  const documentsData = [
    {
      id: 1,
      name: 'Commercial Invoice',
      description: 'Required for customs valuation - must match factory declarations',
      type: 'invoice',
      category: 'importer_docs',
      source: 'importer',
      status: 'received',
      date: '2026-07-15',
      size: '2.4 MB',
      pages: 3,
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'SHIP-458',
      documentNumber: 'INV-2026-00458',
      expiryDate: '2026-12-31',
      priority: 'high',
      tags: ['invoice', 'commercial', 'import', 'customs'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download', 'share', 'request'],
      previewContent: `COMMERCIAL INVOICE
Invoice Number: INV-2026-00458
Date: 15 July 2026

Seller: TechImport Ltd
Address: 123 Tech Park, Shanghai, China
Phone: +86 21 5555 1234
Email: sales@techimport.cn

Buyer: ImportFlow Ltd
Address: Plot 45, Industrial Area, Kampala, Uganda
Phone: +256 712 345 678
Email: info@importflow.com

----------------------------------------------------------------
Item Description          | Qty | Unit Price (UGX) | Total (UGX)
----------------------------------------------------------------
Electronics Components   | 450 | 468,750          | 210,937,500
Circuit Boards           | 1200| 187,500          | 225,000,000
Power Supplies           | 850 | 234,375          | 199,218,750
----------------------------------------------------------------
Subtotal:                                   635,156,250
Tax (18%):                                  114,328,125
Total Amount:                               749,484,375

Payment Terms: 30 days net from invoice date
Delivery Terms: FOB Shanghai
Shipping Method: Sea Freight
Vessel: MV Star Express

This invoice is for customs clearance purposes only.
All amounts are in Ugandan Shillings (UGX).

Authorized Signature:
__________________
TechImport Ltd`,
      verification: {
        status: 'verified',
        verifiedBy: 'Customs Officer',
        date: '2026-07-20',
        notes: 'All values match declared amounts'
      }
    },
    {
      id: 2,
      name: 'Sales Contract',
      description: 'Official sales agreement between buyer and seller',
      type: 'contract',
      category: 'importer_docs',
      source: 'importer',
      status: 'received',
      date: '2026-07-10',
      size: '1.8 MB',
      pages: 5,
      uploadedBy: 'Jane Smith (Importer)',
      shipmentId: 'SHIP-458',
      documentNumber: 'SC-2026-00458',
      expiryDate: '2026-12-31',
      priority: 'high',
      tags: ['contract', 'sales', 'agreement', 'legal'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download', 'share'],
      previewContent: `SALES CONTRACT
Contract Number: SC-2026-00458
Date: 10 July 2026

This agreement is made on this 10th day of July 2026 between:

1. SELLER:
   Name: TechImport Ltd
   Address: 123 Tech Park, Shanghai, China
   Registration: CN-2024-0789

2. BUYER:
   Name: ImportFlow Ltd
   Address: Plot 45, Industrial Area, Kampala, Uganda
   Registration: UG-2020-1234

TERMS AND CONDITIONS:

1. GOODS: Electronics Components, Circuit Boards, Power Supplies

2. QUANTITY AND PRICE: As per Commercial Invoice

3. DELIVERY TERMS: FOB Shanghai, China

4. PAYMENT TERMS: 30 days net from invoice date

5. WARRANTY: 12 months from date of delivery

6. GOVERNING LAW: Laws of Uganda

SIGNED:

__________________
For TechImport Ltd

__________________
For ImportFlow Ltd`,
      verification: {
        status: 'verified',
        verifiedBy: 'Legal Officer',
        date: '2026-07-18',
        notes: 'Contract terms verified'
      }
    },
    {
      id: 3,
      name: 'Bill of Lading',
      description: 'Proof of shipment - required for customs clearance',
      type: 'shipping',
      category: 'shipment_docs',
      source: 'shipping_line',
      status: 'pending',
      date: '2026-07-20',
      size: '3.2 MB',
      pages: 2,
      uploadedBy: 'MV Star Express',
      shipmentId: 'SHIP-458',
      documentNumber: 'BOL-2026-00458',
      expiryDate: null,
      priority: 'critical',
      tags: ['shipping', 'bill_of_lading', 'carrier', 'transport'],
      fileType: 'pdf',
      requiredBy: 'URC & Importer',
      actions: ['request', 'view', 'download'],
      previewContent: `BILL OF LADING
BOL Number: BOL-2026-00458
Date: 20 July 2026

CARRIER INFORMATION:
--------------------------------------------------
Vessel: MV Star Express
Voyage Number: SE-2026-078
IMO Number: 9876543

SHIPMENT DETAILS:
--------------------------------------------------
Shipper: TechImport Ltd
Consignee: ImportFlow Ltd
Notify Party: ImportFlow Ltd

PORT INFORMATION:
--------------------------------------------------
Port of Loading: Shanghai, China
Port of Discharge: Mombasa, Kenya
Place of Delivery: Kampala, Uganda

CONTAINER DETAILS:
--------------------------------------------------
Container Number: MSKU-458921
Container Type: Standard 20ft
Seal Number: SEAL-2026-0789

GOODS DESCRIPTION:
--------------------------------------------------
Electronics Components, Circuit Boards, Power Supplies
Total Packages: 3 pallets
Gross Weight: 12.5 tons
Volume: 45 CBM

This is a negotiable Bill of Lading. 
The original must be presented for cargo release.

__________________
Master's Signature
MV Star Express`,
      verification: {
        status: 'pending_verification',
        verifiedBy: null,
        date: null,
        notes: 'Awaiting verification by customs officer'
      }
    },
    {
      id: 4,
      name: 'Packing List',
      description: 'Detailed list of all items in the container',
      type: 'shipping',
      category: 'shipment_docs',
      source: 'shipping_line',
      status: 'pending',
      date: '2026-07-20',
      size: '1.5 MB',
      pages: 1,
      uploadedBy: 'MV Star Express',
      shipmentId: 'SHIP-458',
      documentNumber: 'PL-2026-00458',
      expiryDate: null,
      priority: 'high',
      tags: ['packing', 'list', 'container', 'inventory'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['request', 'view', 'download'],
      previewContent: `PACKING LIST
Packing List Number: PL-2026-00458
Date: 20 July 2026

CONTAINER INFORMATION:
--------------------------------------------------
Container Number: MSKU-458921
Seal Number: SEAL-2026-0789
Vessel: MV Star Express
Voyage: SE-2026-078

----------------------------------------------------------------
Item Description          | Qty | Weight (kg) | Dimensions
----------------------------------------------------------------
Electronics Components   | 450 | 2,500       | 45x35x30 cm
Circuit Boards           | 1200| 1,800       | 30x25x15 cm
Power Supplies           | 850 | 2,200       | 40x30x20 cm
----------------------------------------------------------------

TOTAL:
--------------------------------------------------
Total Packages: 3 pallets
Total Weight: 6,500 kg (6.5 tons)
Total Volume: 33.2 CBM

PACKAGING DETAILS:
--------------------------------------------------
- All items packed in anti-static packaging
- Temperature controlled packaging for electronics
- Each pallet wrapped and secured

REMARKS:
--------------------------------------------------
- Handle with care
- Store in dry place
- Fragile items marked accordingly

__________________
Loading Supervisor
MV Star Express`,
      verification: {
        status: 'pending_verification',
        verifiedBy: null,
        date: null,
        notes: 'Awaiting verification by customs officer'
      }
    },
    {
      id: 5,
      name: 'Customs Declaration Form',
      description: 'Form C-18 - Required for customs entry',
      type: 'clearance',
      category: 'clearance_docs',
      source: 'clearing_agent',
      status: 'in_progress',
      date: '2026-07-25',
      size: '0.8 MB',
      pages: 4,
      uploadedBy: 'You (Clearing Agent)',
      shipmentId: 'SHIP-458',
      documentNumber: 'C18-2026-00458',
      expiryDate: null,
      priority: 'critical',
      tags: ['customs', 'declaration', 'ura', 'form_c18'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['edit', 'upload', 'view', 'share'],
      previewContent: `CUSTOMS DECLARATION FORM (C-18)
Form Number: C18-2026-00458
Date: 25 July 2026

SECTION 1: IMPORTER DETAILS
--------------------------------------------------
Importer Name: ImportFlow Ltd
TIN Number: 1234567890
Address: Plot 45, Industrial Area, Kampala, Uganda
Phone: +256 712 345 678

SECTION 2: SHIPMENT DETAILS
--------------------------------------------------
Bill of Lading: BOL-2026-00458
Vessel: MV Star Express
Voyage: SE-2026-078
Container: MSKU-458921
Port of Origin: Shanghai, China
Port of Entry: Mombasa, Kenya

SECTION 3: GOODS DECLARATION
--------------------------------------------------
----------------------------------------------------------------
Item          | HS Code   | Qty | Value (UGX) | Customs Duty
----------------------------------------------------------------
Electronics   | 8542.31   | 450 | 210,937,500 | 42,187,500
Circuit Boards| 8534.00   | 1200| 225,000,000 | 45,000,000
Power Supplies| 8504.40   | 850 | 199,218,750 | 39,843,750
----------------------------------------------------------------

SECTION 4: DUTY CALCULATION
--------------------------------------------------
Total Value: 635,156,250 UGX
Customs Duty: 127,031,250 UGX
VAT (18%): 114,328,125 UGX
Total Taxes: 241,359,375 UGX

DECLARATION:
I hereby declare that the information provided is true and correct.

__________________
Clearing Agent
Date: 25 July 2026`,
      verification: {
        status: 'in_progress',
        verifiedBy: null,
        date: null,
        notes: 'Awaiting completion and submission'
      }
    },
    {
      id: 6,
      name: 'UNBS Certificate of Conformity',
      description: 'Product quality certification from UNBS',
      type: 'certificate',
      category: 'certificate_docs',
      source: 'importer',
      status: 'pending',
      date: '2026-07-25',
      size: '1.2 MB',
      pages: 4,
      uploadedBy: 'Jane Smith (Importer)',
      shipmentId: 'SHIP-459',
      documentNumber: 'COC-2026-00459',
      expiryDate: '2027-07-25',
      priority: 'high',
      tags: ['unbs', 'certificate', 'quality', 'compliance'],
      fileType: 'pdf',
      requiredBy: 'UNBS & URC',
      actions: ['request', 'view'],
      previewContent: `UNBS CERTIFICATE OF CONFORMITY
Certificate Number: COC-2026-00459
Issue Date: 25 July 2026
Expiry Date: 25 July 2027

This certificate is issued by the Uganda National Bureau of Standards (UNBS)
to certify that the products listed below conform to the applicable
Uganda Standards.

PRODUCT INFORMATION:
--------------------------------------------------
Product: Electronics Components
Model: EC-2024-XL
Quantity: 450 units
Manufacturer: TechImport Ltd
Country of Origin: China

STANDARDS APPLIED:
--------------------------------------------------
1. US 234:2020 - Electronics Safety Standards
2. US 456:2021 - Quality Management Systems
3. US 789:2022 - Environmental Standards

TEST RESULTS:
--------------------------------------------------
All products passed the required tests and inspections.

This certificate is valid for shipments made within the validity period.

Issued By:
__________________
UNBS Authorized Officer
Date: 25 July 2026`,
      verification: {
        status: 'pending_verification',
        verifiedBy: null,
        date: null,
        notes: 'Awaiting verification by UNBS officer'
      }
    },
    {
      id: 7,
      name: 'Freight Invoice',
      description: 'Required by URA for customs value calculation',
      type: 'invoice',
      category: 'payment_docs',
      source: 'shipping_line',
      status: 'received',
      date: '2026-07-22',
      size: '4.2 MB',
      pages: 6,
      uploadedBy: 'MV Star Express',
      shipmentId: 'SHIP-458',
      documentNumber: 'FI-2026-00458',
      expiryDate: null,
      priority: 'high',
      tags: ['freight', 'invoice', 'ura', 'shipping'],
      fileType: 'pdf',
      requiredBy: 'URC',
      actions: ['view', 'download', 'share'],
      previewContent: `FREIGHT INVOICE
Invoice Number: FI-2026-00458
Date: 22 July 2026

CARRIER INFORMATION:
--------------------------------------------------
Carrier: MV Star Express
Voyage Number: SE-2026-078
IMO Number: 9876543

ROUTE INFORMATION:
--------------------------------------------------
Origin: Shanghai, China
Destination: Port of Mombasa, Kenya

FREIGHT CHARGES:
--------------------------------------------------
Base Freight:         12,500.00 USD
Insurance:             2,500.00 USD
Fuel Surcharge:        1,200.00 USD
Documentation Fee:       300.00 USD
Port Handling Fee:       800.00 USD
--------------------------------------------------
Total Freight:        17,500.00 USD

EXCHANGE RATE: 1 USD = 3,750 UGX
Total in UGX: 65,625,000 UGX

SHIPPING DETAILS:
--------------------------------------------------
Container: MSKU-458921
Gross Weight: 12.5 tons
Volume: 45 CBM

This invoice is required by URA for customs value calculation.

Authorized Signature:
__________________
MV Star Express`,
      verification: {
        status: 'verified',
        verifiedBy: 'URA Officer',
        date: '2026-07-28',
        notes: 'Freight charges verified and accepted'
      }
    }
  ];

  // Get document source badge
  const getSourceBadge = (source) => {
    const sourceMap = {
      'importer': { backgroundColor: colors.primaryBg, color: colors.primary, icon: Building, label: 'From Importer' },
      'shipping_line': { backgroundColor: colors.info + '20', color: colors.info, icon: Ship, label: 'From Shipping Line' },
      'clearing_agent': { backgroundColor: colors.success + '20', color: colors.success, icon: UserCheck, label: 'Created by You' },
    };
    return sourceMap[source] || sourceMap['importer'];
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'critical': { backgroundColor: colors.danger + '20', color: colors.danger, label: 'Critical' },
      'high': { backgroundColor: colors.warning + '20', color: colors.warning, label: 'High' },
      'medium': { backgroundColor: colors.info + '20', color: colors.info, label: 'Medium' },
      'low': { backgroundColor: colors.success + '20', color: colors.success, label: 'Low' },
    };
    return priorityMap[priority] || priorityMap['medium'];
  };

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'invoice': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'contract': return <FileSignature className="w-5 h-5 text-purple-500" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'certificate': return <Shield className="w-5 h-5 text-orange-500" />;
      case 'details': return <Building className="w-5 h-5 text-indigo-500" />;
      case 'list': return <Package className="w-5 h-5 text-pink-500" />;
      case 'shipping': return <Ship className="w-5 h-5 text-cyan-500" />;
      case 'clearance': return <ClipboardList className="w-5 h-5 text-teal-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'received': {
        backgroundColor: colors.success + '20',
        color: colors.success,
        icon: <CheckCircle className="w-3 h-3" />,
        label: 'Received'
      },
      'pending': {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
        icon: <Clock className="w-3 h-3" />,
        label: 'Pending'
      },
      'in_progress': {
        backgroundColor: colors.info + '20',
        color: colors.info,
        icon: <RefreshCw className="w-3 h-3" />,
        label: 'In Progress'
      },
      'draft': {
        backgroundColor: colors.indigo + '20',
        color: colors.indigo,
        icon: <Edit className="w-3 h-3" />,
        label: 'Draft'
      },
      'rejected': {
        backgroundColor: colors.danger + '20',
        color: colors.danger,
        icon: <AlertCircle className="w-3 h-3" />,
        label: 'Rejected'
      }
    };
    return statusMap[status] || statusMap['pending'];
  };

  const getVerificationBadge = (verification) => {
    const statusMap = {
      'verified': {
        backgroundColor: colors.success + '20',
        color: colors.success,
        icon: <CheckCircle className="w-4 h-4" />,
        label: 'Verified'
      },
      'pending_verification': {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
        icon: <Clock className="w-4 h-4" />,
        label: 'Pending Verification'
      },
      'in_progress': {
        backgroundColor: colors.info + '20',
        color: colors.info,
        icon: <RefreshCw className="w-4 h-4" />,
        label: 'Verification in Progress'
      },
      'rejected': {
        backgroundColor: colors.danger + '20',
        color: colors.danger,
        icon: <AlertCircle className="w-4 h-4" />,
        label: 'Verification Failed'
      }
    };
    return statusMap[verification?.status] || statusMap['pending_verification'];
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const doc = documentsData.find(d => d.id === parseInt(id));
      if (doc) {
        setDocument(doc);
      } else {
        navigate('/clearing-agent-documents');
      }
      setLoading(false);
    }, 300);
  }, [id, navigate]);

  const handleZoomIn = () => setZoomLevel(Math.min(200, zoomLevel + 10));
  const handleZoomOut = () => setZoomLevel(Math.max(50, zoomLevel - 10));
  const handleRotate = () => setRotation((rotation + 90) % 360);

  const handleShare = () => {
    alert(`Document "${document?.name}" shared with ${shareEmail || 'application users'}`);
    setShowShareModal(false);
    setShareEmail('');
    setShareMessage('');
  };

  const handleRequest = () => {
    alert(`Document request sent for "${document?.name}"\nMessage: ${requestMessage}`);
    setShowRequestModal(false);
    setRequestMessage('');
  };

  const handleUpload = () => {
    if (uploadFile) {
      alert(`Document "${document?.name}" uploaded successfully!\nFile: ${uploadFile.name}\nComment: ${uploadComment}`);
      setShowUploadModal(false);
      setUploadFile(null);
      setUploadComment('');
    } else {
      alert('Please select a file to upload');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  // Request Modal
  const RequestModal = () => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Request Document
              </h3>
            </div>
            <button
              onClick={() => setShowRequestModal(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.name}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Shipment: {document.shipmentId} • Required by: {document.requiredBy}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows="4"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="Please provide additional context or specific requirements..."
                />
              </div>

              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Info className="w-4 h-4 inline mr-1" />
                  This request will be sent to the {document.source === 'importer' ? 'importer' : 'shipping line'}.
                </p>
              </div>
            </div>
          </div>

          <div className={`flex justify-end gap-2 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setShowRequestModal(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleRequest}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Send Request
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Upload Modal
  const UploadModal = () => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upload/Edit Document
              </h3>
            </div>
            <button
              onClick={() => setShowUploadModal(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.name}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Shipment: {document.shipmentId} • Status: {document.status}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Select File *
                </label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                    isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                  />
                  {uploadFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileCheck className="w-6 h-6 text-green-500" />
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Click to upload or drag and drop
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        PDF, Word, Excel, Images (max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Comment (Optional)
                </label>
                <textarea
                  value={uploadComment}
                  onChange={(e) => setUploadComment(e.target.value)}
                  rows="2"
                  placeholder="Add any additional notes..."
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
          </div>

          <div className={`flex justify-end gap-2 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setShowUploadModal(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Share Modal
  const ShareModal = () => {
    if (!document) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Share Document
              </h3>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                {getDocumentIcon(document.type)}
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.name}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{document.shipmentId}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Share via Email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:shadow-lg"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Share via Application
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <Users className="w-6 h-6" style={{ color: colors.primary }} />
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Team</span>
                  </button>
                  <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <MessageSquare className="w-6 h-6" style={{ color: colors.primary }} />
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Chat</span>
                  </button>
                  <button className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <Link className="w-6 h-6" style={{ color: colors.primary }} />
                    <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Copy Link</span>
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message (Optional)
                </label>
                <textarea
                  placeholder="Add a message..."
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  rows="3"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading document...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Document not found</h2>
          <button
            onClick={() => navigate('/clearing-agent-documents')}
            className="mt-4 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Documents
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(document.status);
  const sourceStyle = getSourceBadge(document.source);
  const priorityStyle = getPriorityBadge(document.priority);
  const verificationStyle = getVerificationBadge(document.verification);
  const SourceIcon = sourceStyle.icon;
  const contentLines = document.previewContent ? document.previewContent.split('\n') : ['No content available'];

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {showShareModal && <ShareModal />}
      {showRequestModal && <RequestModal />}
      {showUploadModal && <UploadModal />}

      <div className="w-full max-w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <button
            onClick={() => navigate('/clearing-agent-documents')}
            className={`flex items-center gap-1 hover:underline ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <Home className="w-4 h-4" />
            Documents
          </button>
          <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <span className={isDark ? 'text-white' : 'text-gray-900'}>Document Details</span>
        </div>

        {/* Document Header */}
        <div className={`rounded-lg p-4 mb-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                {getDocumentIcon(document.type)}
              </div>
              <div>
                <h1 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {document.name}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {document.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span 
                    className="text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{
                      backgroundColor: statusStyle.backgroundColor,
                      color: statusStyle.color
                    }}
                  >
                    {statusStyle.icon}
                    {statusStyle.label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{
                    backgroundColor: sourceStyle.backgroundColor,
                    color: sourceStyle.color
                  }}>
                    <SourceIcon className="w-3 h-3" />
                    {sourceStyle.label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{
                    backgroundColor: priorityStyle.backgroundColor,
                    color: priorityStyle.color
                  }}>
                    {priorityStyle.label}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {document.shipmentId}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {document.fileType.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Request Button - Only for pending docs from importer/shipping line */}
              {(document.status === 'pending' || document.status === 'draft') && document.source !== 'clearing_agent' && (
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: colors.warning + '20',
                    color: colors.warning
                  }}
                >
                  <Send className="w-4 h-4" />
                  Request
                </button>
              )}
              
              {/* Upload/Edit Button - For clearing agent created docs */}
              {(document.actions.includes('edit') || document.actions.includes('upload')) && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: colors.primaryBg,
                    color: colors.primary
                  }}
                >
                  <Upload className="w-4 h-4" />
                  {document.status === 'draft' ? 'Edit' : 'Upload'}
                </button>
              )}
              
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: colors.primaryBg,
                  color: colors.primary
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([document.previewContent], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${document.name.replace(/\s+/g, '_')}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: colors.primary,
                  color: 'white'
                }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={() => navigate('/clearing-agent-documents')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>

          {/* Verification Status */}
          <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {verificationStyle.icon}
                  <span className={`text-sm font-medium`} style={{ color: verificationStyle.color }}>
                    {verificationStyle.label}
                  </span>
                </div>
                {document.verification?.verifiedBy && (
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    by {document.verification.verifiedBy}
                  </span>
                )}
                {document.verification?.date && (
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    on {new Date(document.verification.date).toLocaleDateString()}
                  </span>
                )}
              </div>
              {document.verification?.notes && (
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Info className="w-3 h-3 inline mr-1" />
                  {document.verification.notes}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex border-b overflow-x-auto" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'preview' ? colors.primary : 'transparent' }}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'details' ? colors.primary : 'transparent' }}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Details
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'verification'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'verification' ? colors.primary : 'transparent' }}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Verification
            </button>
          </div>

          <div className="p-4">
            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="space-y-4">
                {/* Toolbar */}
                <div className={`flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FileText className="w-4 h-4 inline mr-2" />
                      {document.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                      Page {currentPage} of {document.pages}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className={`text-sm min-w-[50px] text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleRotate}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Rotate"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Full Screen"
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Print"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Document Content */}
                <div 
                  className={`p-8 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-200 bg-white'} shadow-inner min-h-[500px] overflow-auto transition-all duration-300`}
                  style={{ 
                    transform: `scale(${zoomLevel/100}) rotate(${rotation}deg)`, 
                    transformOrigin: 'top left',
                  }}
                >
                  <div className="font-mono text-sm whitespace-pre-wrap break-words">
                    {contentLines.map((line, index) => {
                      const trimmedLine = line.trim();
                      if (!trimmedLine) return <div key={index} className="h-2" />;
                      
                      const isHeader = trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3 || 
                                      trimmedLine.includes('--------------------------------------------------');
                      const isDivider = trimmedLine.includes('----------------------------------------------------------------');
                      const isSection = trimmedLine.includes(':') && trimmedLine.split(':')[0].length < 30;

                      if (isDivider) {
                        return (
                          <div key={index} className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-300'} my-2`} />
                        );
                      }

                      if (isHeader && !isDivider) {
                        return (
                          <p key={index} className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'} py-2`}>
                            {trimmedLine.replace(/\*\*/g, '').replace(/__/g, '').replace(/--------------------------------------------------/g, '').trim()}
                          </p>
                        );
                      }

                      if (isSection) {
                        const [label, value] = trimmedLine.split(':').map(s => s.trim());
                        return (
                          <p key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} py-0.5`}>
                            <span className="font-semibold">{label}:</span> {value}
                          </p>
                        );
                      }

                      if (trimmedLine.includes('|') && trimmedLine.includes('-')) {
                        return <div key={index} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} my-1`} />;
                      }

                      if (trimmedLine.includes('|')) {
                        const cols = trimmedLine.split('|').map(c => c.trim()).filter(c => c);
                        return (
                          <div key={index} className={`grid grid-cols-4 gap-2 py-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {cols.map((col, ci) => (
                              <span key={ci} className="truncate">{col}</span>
                            ))}
                          </div>
                        );
                      }

                      if (trimmedLine.startsWith('__________________')) {
                        return (
                          <div key={index} className="mt-4">
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {trimmedLine}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <p key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} py-0.5`}>
                          {trimmedLine}
                        </p>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className={`mt-8 pt-4 border-t text-xs ${isDark ? 'border-gray-700 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
                    <div className="flex justify-between">
                      <span>Document: {document.documentNumber}</span>
                      <span>Generated: {new Date().toLocaleString()}</span>
                      <span>Page 1 of {document.pages}</span>
                    </div>
                  </div>
                </div>

                {/* Page Navigation */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage <= 1}
                    className={`p-2 rounded-lg transition-colors ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Page {currentPage} of {document.pages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(document.pages, currentPage + 1))}
                    disabled={currentPage >= document.pages}
                    className={`p-2 rounded-lg transition-colors ${currentPage >= document.pages ? 'opacity-50 cursor-not-allowed' : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Number</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.documentNumber}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Uploaded By</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.uploadedBy}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Upload Date</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(document.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expiry Date</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {document.expiryDate ? new Date(document.expiryDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>File Type</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.fileType.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pages</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.pages}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Size</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.size}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipment</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.shipmentId}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Required By</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.requiredBy}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Source</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{sourceStyle.label}</p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {document.tags.map((tag, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Document History */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document History</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Document uploaded</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(document.date).toLocaleDateString()} • by {document.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Document viewed</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date().toLocaleDateString()} • by System
                        </p>
                      </div>
                    </div>
                    {document.status === 'pending' && document.source === 'importer' && (
                      <div className="flex items-center gap-3">
                        <Send className="w-4 h-4 text-yellow-500" />
                        <div className="flex-1">
                          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Awaiting from importer</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Request sent - waiting for response
                          </p>
                        </div>
                      </div>
                    )}
                    {document.status === 'pending' && document.source === 'shipping_line' && (
                      <div className="flex items-center gap-3">
                        <Ship className="w-4 h-4 text-cyan-500" />
                        <div className="flex-1">
                          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Awaiting from shipping line</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Request sent - waiting for response
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Verification Tab */}
            {activeTab === 'verification' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Verification Status
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      {verificationStyle.icon}
                      <span className={`text-sm font-medium`} style={{ color: verificationStyle.color }}>
                        {verificationStyle.label}
                      </span>
                    </div>
                    {document.verification?.verifiedBy && (
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        by {document.verification.verifiedBy}
                      </span>
                    )}
                    {document.verification?.date && (
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        on {new Date(document.verification.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {document.verification?.notes && (
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Info className="w-4 h-4 inline mr-2" style={{ color: colors.primary }} />
                        {document.verification.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Verification Checklist
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                      <div>
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Document format valid</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          File is in correct format and readable
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                      <div>
                        <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Document complete</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          All required information is present
                        </p>
                      </div>
                    </div>
                    {document.status === 'received' ? (
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                        <div>
                          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Document verified</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            All information has been verified
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 mt-0.5 text-yellow-500" />
                        <div>
                          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Awaiting verification</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Document needs to be reviewed by {document.requiredBy}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons for verification */}
                {(document.status === 'pending' || document.status === 'in_progress') && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {document.source === 'importer' && (
                      <button
                        onClick={() => setShowRequestModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        style={{
                          backgroundColor: colors.warning + '20',
                          color: colors.warning
                        }}
                      >
                        <Send className="w-4 h-4" />
                        Request from Importer
                      </button>
                    )}
                    {document.source === 'shipping_line' && (
                      <button
                        onClick={() => setShowRequestModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        style={{
                          backgroundColor: colors.info + '20',
                          color: colors.info
                        }}
                      >
                        <Send className="w-4 h-4" />
                        Request from Shipping Line
                      </button>
                    )}
                    {(document.actions.includes('edit') || document.actions.includes('upload')) && (
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: colors.primary,
                          color: 'white'
                        }}
                      >
                        <Upload className="w-4 h-4" />
                        Upload Document
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearingAgentDocumentDetails;