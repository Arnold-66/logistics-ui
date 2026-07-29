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
  Ship,
  Box,
  Info
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useParams } from 'react-router-dom';

const ExporterDocumentDetails = () => {
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
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

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
    indigo: '#6366f1'
  };

  const isDark = darkMode

  // Document data - Export documents with preview content
  const documentsData = [
    {
      id: 1,
      name: 'Exporter Details',
      description: 'Company Name, Business Address, Contact Person Details',
      type: 'details',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-05',
      size: '0.5 MB',
      pages: 2,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'ED-2026-001',
      expiryDate: null,
      tags: ['exporter', 'details', 'registration'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `EXPORTER DETAILS
Registration Number: ED-2026-001
Date: 05 July 2026

COMPANY INFORMATION:
--------------------------------------------------
Company Name: ExportFlow Ltd
Business Address: 123 Trade Center, Kampala, Uganda
Phone: +256 712 345 678
Email: info@exportflow.com

REGISTRATION DETAILS:
--------------------------------------------------
TIN Number: 9876543210
Registration Date: 01 January 2020
Export License Number: EXP-2020-456
License Type: General Exporter

CONTACT PERSONS:
--------------------------------------------------
Primary Contact: Jane Smith
Phone: +256 712 345 678
Email: jane@exportflow.com

Authorized Signature:
__________________
Jane Smith
Director of Operations`
    },
    {
      id: 2,
      name: 'Importer Details',
      description: 'Information about the importing company',
      type: 'details',
      source: 'importer',
      status: 'received',
      date: '2026-07-06',
      size: '0.6 MB',
      pages: 2,
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'EXP-001',
      documentNumber: 'ID-2026-001',
      expiryDate: null,
      tags: ['importer', 'details', 'registration'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `IMPORTER DETAILS
Registration Number: ID-2026-001
Date: 06 July 2026

COMPANY INFORMATION:
--------------------------------------------------
Company Name: ImportFlow Ltd
Business Address: Plot 45, Industrial Area, Kampala, Uganda
Phone: +256 712 345 678
Email: info@importflow.com

REGISTRATION DETAILS:
--------------------------------------------------
TIN Number: 1234567890
Registration Date: 01 January 2020
Import License Number: IMP-2020-456
License Type: General Importer

CONTACT PERSONS:
--------------------------------------------------
Primary Contact: John Doe
Phone: +256 712 345 678
Email: john@importflow.com`
    },
    {
      id: 3,
      name: 'Export Items List',
      description: 'Items & Quantities being exported',
      type: 'list',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-08',
      size: '0.8 MB',
      pages: 1,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'EIL-2026-001',
      expiryDate: null,
      tags: ['items', 'export', 'quantity'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `EXPORT ITEMS LIST
Document Number: EIL-2026-001
Date: 08 July 2026

----------------------------------------------------------------
Item Description          | Qty | HS Code      | Unit Price
----------------------------------------------------------------
Electronics Components   | 450 | 8542.31      | 468,750 UGX
Circuit Boards           | 1200| 8534.00      | 187,500 UGX
Power Supplies           | 850 | 8504.40      | 234,375 UGX
----------------------------------------------------------------

SUMMARY:
--------------------------------------------------
Total Items: 3 types
Total Quantity: 2,500 units
Total Value: 635,156,250 UGX

This list is for export declaration purposes.

Authorized Signature:
__________________
Jane Smith
Export Manager`
    },
    {
      id: 4,
      name: 'Packing List',
      description: 'Detailed packing information for the shipment',
      type: 'list',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-10',
      size: '1.2 MB',
      pages: 3,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'PL-2026-001',
      expiryDate: null,
      tags: ['packing', 'list', 'container'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `PACKING LIST
Packing List Number: PL-2026-001
Date: 10 July 2026

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

Authorized Signature:
__________________
Jane Smith
Export Manager`
    },
    {
      id: 5,
      name: 'Commercial Invoice',
      description: 'Commercial invoice for the export shipment',
      type: 'invoice',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-12',
      size: '2.4 MB',
      pages: 3,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'INV-2026-001',
      expiryDate: '2026-12-31',
      tags: ['invoice', 'commercial', 'export'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `COMMERCIAL INVOICE
Invoice Number: INV-2026-001
Date: 12 July 2026

Seller: ExportFlow Ltd
Address: 123 Trade Center, Kampala, Uganda
Phone: +256 712 345 678
Email: info@exportflow.com

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
Delivery Terms: FOB Mombasa
Shipping Method: Sea Freight
Vessel: MV Star Express

This invoice is for export purposes only.
All amounts are in Ugandan Shillings (UGX).

Authorized Signature:
__________________
ExportFlow Ltd`
    },
    {
      id: 6,
      name: 'Bill of Lading',
      description: 'Shipping document from the carrier',
      type: 'shipping',
      source: 'carrier',
      status: 'pending',
      date: '2026-07-15',
      size: '3.2 MB',
      pages: 2,
      uploadedBy: 'MV Star Express',
      shipmentId: 'EXP-001',
      documentNumber: 'BOL-2026-001',
      expiryDate: null,
      tags: ['shipping', 'bill_of_lading', 'carrier'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `BILL OF LADING
BOL Number: BOL-2026-001
Date: 15 July 2026

CARRIER INFORMATION:
--------------------------------------------------
Vessel: MV Star Express
Voyage Number: SE-2026-078
IMO Number: 9876543

SHIPMENT DETAILS:
--------------------------------------------------
Shipper: ExportFlow Ltd
Consignee: ImportFlow Ltd
Notify Party: ImportFlow Ltd

PORT INFORMATION:
--------------------------------------------------
Port of Loading: Mombasa, Kenya
Port of Discharge: Shanghai, China
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
Gross Weight: 6.5 tons
Volume: 33.2 CBM

This is a negotiable Bill of Lading. 
The original must be presented for cargo release.

__________________
Master's Signature
MV Star Express`
    },
    {
      id: 7,
      name: 'Sales Contract',
      description: 'Official sales agreement between parties',
      type: 'contract',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-14',
      size: '1.8 MB',
      pages: 5,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'SC-2026-001',
      expiryDate: '2026-12-31',
      tags: ['contract', 'sales', 'agreement'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `SALES CONTRACT
Contract Number: SC-2026-001
Date: 14 July 2026

This agreement is made on this 14th day of July 2026 between:

1. SELLER:
   Name: ExportFlow Ltd
   Address: 123 Trade Center, Kampala, Uganda
   Registration: UG-2020-1234

2. BUYER:
   Name: ImportFlow Ltd
   Address: Plot 45, Industrial Area, Kampala, Uganda
   Registration: UG-2020-1234

TERMS AND CONDITIONS:

1. GOODS: Electronics Components, Circuit Boards, Power Supplies

2. QUANTITY AND PRICE: As per Commercial Invoice

3. DELIVERY TERMS: FOB Mombasa, Kenya

4. PAYMENT TERMS: 30 days net from invoice date

5. WARRANTY: 12 months from date of delivery

6. GOVERNING LAW: Laws of Uganda

SIGNED:

__________________
For ExportFlow Ltd

__________________
For ImportFlow Ltd`
    },
    {
      id: 8,
      name: 'Proof of Payments',
      description: 'Payment confirmation from importer',
      type: 'payment',
      source: 'importer',
      status: 'received',
      date: '2026-07-20',
      size: '3.1 MB',
      pages: 2,
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'EXP-001',
      documentNumber: 'POP-2026-001',
      expiryDate: null,
      tags: ['payment', 'receipt', 'proof'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `PROOF OF PAYMENT
Reference: POP-2026-001
Date: 20 July 2026

PAYMENT DETAILS:
--------------------------------------------------
Amount: 749,484,375 UGX
Payment Method: Wire Transfer
Reference Number: WT-2026-0789
Bank: Stanbic Bank Uganda
Account Name: ExportFlow Ltd
Account Number: 9030001234567

TRANSACTION STATUS:
--------------------------------------------------
Status: COMPLETED
Transaction ID: TXN-2026-0789
Date: 20 July 2026
Time: 14:32:18 EAT

This document serves as proof of payment
for Commercial Invoice INV-2026-001.

Approved By:
__________________
Finance Department
ImportFlow Ltd`
    },
    {
      id: 9,
      name: 'UNBS Certificate of Conformity',
      description: 'Product quality certification (from importer)',
      type: 'certificate',
      source: 'importer',
      status: 'pending',
      date: '2026-07-25',
      size: '1.2 MB',
      pages: 4,
      uploadedBy: 'Jane Smith (Importer)',
      shipmentId: 'EXP-001',
      documentNumber: 'COC-2026-001',
      expiryDate: '2027-07-25',
      tags: ['unbs', 'certificate', 'quality'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `UNBS CERTIFICATE OF CONFORMITY
Certificate Number: COC-2026-001
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
Manufacturer: ExportFlow Ltd
Country of Origin: Uganda

STANDARDS APPLIED:
--------------------------------------------------
1. US 234:2020 - Electronics Safety Standards
2. US 456:2021 - Quality Management Systems

This certificate is valid for shipments made within the validity period.

Issued By:
__________________
UNBS Authorized Officer
Date: 25 July 2026`
    },
    {
      id: 10,
      name: 'UNBS PVoC Certificate',
      description: 'Pre-export verification (from importer)',
      type: 'certificate',
      source: 'importer',
      status: 'pending',
      date: '2026-07-28',
      size: '0.9 MB',
      pages: 3,
      uploadedBy: 'John Doe (Importer)',
      shipmentId: 'EXP-001',
      documentNumber: 'PVoC-2026-001',
      expiryDate: '2026-10-28',
      tags: ['unbs', 'pvoc', 'verification'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `UNBS PRE-EXPORT VERIFICATION OF CONFORMITY (PVoC)
Certificate Number: PVoC-2026-001
Issue Date: 28 July 2026
Expiry Date: 28 October 2026

This document confirms that the following products have been verified
for export under the Pre-Export Verification of Conformity (PVoC) program.

VERIFICATION DETAILS:
--------------------------------------------------
Product: Electronics Components
Quantity: 450 units
Origin: Uganda
Exporter: ExportFlow Ltd
Importer: ImportFlow Ltd

VERIFICATION RESULTS:
--------------------------------------------------
All products meet the required standards.

This verification is valid for the specified shipment only.

Issued By:
__________________
UNBS Authorized Officer`
    },
    {
      id: 11,
      name: 'Certificate of Origin',
      description: 'Certificate of origin for the goods',
      type: 'certificate',
      source: 'exporter',
      status: 'completed',
      date: '2026-07-30',
      size: '0.7 MB',
      pages: 2,
      uploadedBy: 'You (Exporter)',
      shipmentId: 'EXP-001',
      documentNumber: 'CO-2026-001',
      expiryDate: '2027-07-30',
      tags: ['origin', 'certificate', 'export'],
      fileType: 'pdf',
      importer: 'ImportFlow Ltd',
      previewContent: `CERTIFICATE OF ORIGIN
Certificate Number: CO-2026-001
Issue Date: 30 July 2026
Expiry Date: 30 July 2027

This is to certify that the products described below originate from:

COUNTRY OF ORIGIN:
--------------------------------------------------
Uganda

PRODUCT INFORMATION:
--------------------------------------------------
Product: Electronics Components
Quantity: 450 units
Manufacturer: ExportFlow Ltd

This certificate is issued by the Uganda Chamber of Commerce.

----------------------------------------------------------------
This certifies that the goods described above originate in Uganda.

Issued By:
__________________
Uganda Chamber of Commerce
Date: 30 July 2026`
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const doc = documentsData.find(d => d.id === parseInt(id));
      if (doc) {
        setDocument(doc);
      } else {
        navigate('/exporter-documents');
      }
      setLoading(false);
    }, 300);
  }, [id, navigate]);

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'invoice': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'contract': return <FileSignature className="w-5 h-5 text-purple-500" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'certificate': return <Shield className="w-5 h-5 text-orange-500" />;
      case 'details': return <Building className="w-5 h-5 text-indigo-500" />;
      case 'list': return <Package className="w-5 h-5 text-pink-500" />;
      case 'shipping': return <Ship className="w-5 h-5 text-cyan-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSourceBadge = (source) => {
    const sourceMap = {
        'exporter': {
        backgroundColor: colors.primaryBg,
        color: colors.primary,
        icon: User, // This should be the component reference, not JSX
        label: 'You uploaded this'
        },
        'importer': {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
        icon: Building, // Component reference
        label: 'From Importer'
        },
        'carrier': {
        backgroundColor: colors.info + '20',
        color: colors.info,
        icon: Ship, // Component reference
        label: 'From Carrier'
        }
    };
    return sourceMap[source] || sourceMap['exporter'];
    };

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return {
        backgroundColor: colors.success + '20',
        color: colors.success,
        icon: <CheckCircle className="w-3 h-3" />
      };
    } else if (status === 'received') {
      return {
        backgroundColor: colors.teal + '20',
        color: colors.teal,
        icon: <CheckCircle className="w-3 h-3" />
      };
    } else if (status === 'pending') {
      return {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
        icon: <Clock className="w-3 h-3" />
      };
    } else if (status === 'in_progress') {
      return {
        backgroundColor: colors.info + '20',
        color: colors.info,
        icon: <Clock className="w-3 h-3" />
      };
    } else {
      return {
        backgroundColor: colors.danger + '20',
        color: colors.danger,
        icon: <AlertCircle className="w-3 h-3" />
      };
    }
  };

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
                Shipment: {document.shipmentId} • Source: {document.source === 'importer' ? 'Importer' : 'Carrier'}
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
                  This request will be sent to the {document.source === 'importer' ? 'importer' : 'carrier'}.
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
            onClick={() => navigate('/exporter-documents')}
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
  const SourceIcon = sourceStyle.icon;
  const contentLines = document.previewContent ? document.previewContent.split('\n') : ['No content available'];

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {showShareModal && <ShareModal />}
      {showRequestModal && <RequestModal />}

      <div className="w-full max-w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <button
            onClick={() => navigate('/exporter-documents')}
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
                    {document.status}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{
                    backgroundColor: sourceStyle.backgroundColor,
                    color: sourceStyle.color
                  }}>
                    <SourceIcon className="w-3 h-3" />
                    {sourceStyle.label}
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
              {/* Request Button - Only for docs from importer/carrier */}
              {(document.source === 'importer' || document.source === 'carrier') && document.status !== 'received' && (
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
                onClick={() => navigate('/exporter-documents')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-4 h-4" />
                Close
              </button>
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
              onClick={() => setActiveTab('info')}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                activeTab === 'info'
                  ? 'border-primary text-primary'
                  : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={{ borderColor: activeTab === 'info' ? colors.primary : 'transparent' }}
            >
              <Info className="w-4 h-4 inline mr-2" />
              Document Info
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
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Importer</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{document.importer}</p>
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
                    {document.status === 'pending' && document.source === 'carrier' && (
                      <div className="flex items-center gap-3">
                        <Ship className="w-4 h-4 text-cyan-500" />
                        <div className="flex-1">
                          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Awaiting from carrier</p>
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

            {/* Info Tab */}
            {activeTab === 'info' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Document Source Information
                  </h3>
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full" style={{ backgroundColor: sourceStyle.backgroundColor }}>
                          <SourceIcon className="w-4 h-4" style={{ color: sourceStyle.color }} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {sourceStyle.label}
                          </p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {document.source === 'exporter' && 'You uploaded this document as part of your export documentation.'}
                            {document.source === 'importer' && 'This document needs to be obtained from the importer. Use the "Request" button to send a request.'}
                            {document.source === 'carrier' && 'This document needs to be obtained from the carrier/shipping line. Use the "Request" button to send a request.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Document Checklist
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
                    {document.status === 'completed' || document.status === 'received' ? (
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
                            Document needs to be reviewed
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExporterDocumentDetails;