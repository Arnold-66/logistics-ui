import React, { useState, useContext, useEffect } from 'react';
import {
  FileText,
  FileCheck,
  FileSignature,
  CreditCard,
  Shield,
  FileBarChart,
  Search,
  Filter,
  X,
  Download,
  Eye,
  Share2,
  Mail,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Upload,
  MoreVertical,
  Calendar,
  User,
  Building,
  Package,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit,
  Copy,
  Printer,
  Link,
  MessageSquare,
  Users,
  Globe,
  ExternalLink,
  Home,
  ChevronRight,
  File,
  Image as ImageIcon,
  Table,
  Archive,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  RotateCw,
  RotateCcw,
  Printer as PrinterIcon
} from 'lucide-react';
import { ThemeContext } from '../context/themeContext';
import { useNavigate, useParams } from 'react-router-dom';

const Documents = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [expandedDoc, setExpandedDoc] = useState(null);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);

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

  const isDark = theme === 'dark';

  // Document data with rich preview content
  const documents = [
    {
      id: 1,
      name: 'Commercial Invoice',
      description: 'Matching Factory Declarations Explicitly',
      type: 'invoice',
      status: 'completed',
      date: '2026-07-15',
      size: '2.4 MB',
      pages: 3,
      uploadedBy: 'John Doe',
      shipmentId: '#458',
      documentNumber: 'INV-2026-00458',
      expiryDate: '2026-12-31',
      tags: ['invoice', 'commercial', 'import'],
      fileType: 'pdf',
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
Port of Loading: Shanghai, China
Port of Discharge: Mombasa, Kenya

This invoice is for customs clearance purposes only.
All amounts are in Ugandan Shillings (UGX).

Authorized Signature:
__________________
TechImport Ltd`
    },
    {
      id: 2,
      name: 'Sales Contract',
      description: 'Official sales agreement between parties',
      type: 'contract',
      status: 'completed',
      date: '2026-07-10',
      size: '1.8 MB',
      pages: 5,
      uploadedBy: 'Jane Smith',
      shipmentId: '#458',
      documentNumber: 'SC-2026-00458',
      expiryDate: '2026-12-31',
      tags: ['contract', 'sales', 'agreement'],
      fileType: 'pdf',
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

1. GOODS:
   Electronics Components, Circuit Boards, Power Supplies
   As described in the attached specifications.

2. QUANTITY AND PRICE:
   As per Commercial Invoice INV-2026-00458

3. DELIVERY TERMS:
   FOB Shanghai, China

4. PAYMENT TERMS:
   30 days net from invoice date

5. WARRANTY:
   12 months from date of delivery

6. GOVERNING LAW:
   Laws of Uganda

7. DISPUTE RESOLUTION:
   Arbitration in Kampala, Uganda

SIGNED:

__________________
For and on behalf of TechImport Ltd
Date: 10 July 2026

__________________
For and on behalf of ImportFlow Ltd
Date: 10 July 2026`
    },
    {
      id: 3,
      name: 'Proof of Payments',
      description: 'Payment confirmation and receipts',
      type: 'payment',
      status: 'completed',
      date: '2026-07-20',
      size: '3.1 MB',
      pages: 2,
      uploadedBy: 'John Doe',
      shipmentId: '#458',
      documentNumber: 'POP-2026-00458',
      expiryDate: null,
      tags: ['payment', 'receipt', 'proof'],
      fileType: 'pdf',
      previewContent: `PROOF OF PAYMENT
Reference: POP-2026-00458
Date: 20 July 2026

PAYMENT DETAILS:
--------------------------------------------------
Amount: 749,484,375 UGX
Payment Method: Wire Transfer
Reference Number: WT-2026-0789
Bank: Stanbic Bank Uganda
Branch: Kampala Main
Account Name: ImportFlow Ltd
Account Number: 9030001234567

TRANSACTION STATUS:
--------------------------------------------------
Status: COMPLETED
Transaction ID: TXN-2026-0789
Date: 20 July 2026
Time: 14:32:18 EAT

SUPPORTING DOCUMENTS:
--------------------------------------------------
1. Bank Transfer Confirmation (Attachment 1)
2. Bank Statement Extract (Attachment 2)
3. Payment Receipt (Attachment 3)

This document serves as proof of payment
for Commercial Invoice INV-2026-00458.

Approved By:
__________________
Finance Department
ImportFlow Ltd`
    },
    {
      id: 4,
      name: 'UNBS Certificate of Conformity',
      description: 'Product quality certification',
      type: 'certificate',
      status: 'pending',
      date: '2026-07-25',
      size: '1.2 MB',
      pages: 4,
      uploadedBy: 'Jane Smith',
      shipmentId: '#459',
      documentNumber: 'COC-2026-00459',
      expiryDate: '2027-07-25',
      tags: ['unbs', 'certificate', 'quality'],
      fileType: 'pdf',
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
Batch Number: BATCH-2026-078

STANDARDS APPLIED:
--------------------------------------------------
1. US 234:2020 - Electronics Safety Standards
2. US 456:2021 - Quality Management Systems
3. US 789:2022 - Environmental Compliance

TEST RESULTS:
--------------------------------------------------
All test results are within acceptable limits.
Refer to attached test report for detailed results.

This certificate is valid for shipments made within the validity period.
Any alterations to this document render it invalid.

Issued By:
__________________
UNBS Authorized Officer
Date: 25 July 2026`
    },
    {
      id: 5,
      name: 'UNBS Pre-Export Verification',
      description: 'Pre-shipment quality verification',
      type: 'certificate',
      status: 'pending',
      date: '2026-07-28',
      size: '0.9 MB',
      pages: 3,
      uploadedBy: 'John Doe',
      shipmentId: '#459',
      documentNumber: 'PVoC-2026-00459',
      expiryDate: '2026-10-28',
      tags: ['unbs', 'pvoc', 'verification'],
      fileType: 'pdf',
      previewContent: `UNBS PRE-EXPORT VERIFICATION OF CONFORMITY (PVoC)
Certificate Number: PVoC-2026-00459
Issue Date: 28 July 2026
Expiry Date: 28 October 2026

This document confirms that the following products have been verified
for export to Uganda under the Pre-Export Verification of Conformity
(PVoC) program.

VERIFICATION DETAILS:
--------------------------------------------------
Product: Electronics Components
Quantity: 450 units
Origin: China
Exporter: TechImport Ltd
Importer: ImportFlow Ltd

VERIFICATION STANDARDS:
--------------------------------------------------
1. US 234:2020 - Electronics Safety
2. US 456:2021 - Quality Management

VERIFICATION RESULTS:
--------------------------------------------------
All products meet the required standards.
Inspection conducted at manufacturer's premises.

This verification is valid for the specified shipment only.
The consignee must present this certificate at the port of entry.

Issued By:
__________________
UNBS Authorized Officer
Date: 28 July 2026`
    },
    {
      id: 6,
      name: 'Freight Invoice',
      description: 'Required by URA for customs value calculation',
      type: 'invoice',
      status: 'completed',
      date: '2026-07-22',
      size: '4.2 MB',
      pages: 6,
      uploadedBy: 'Jane Smith',
      shipmentId: '#458',
      documentNumber: 'FI-2026-00458',
      expiryDate: null,
      tags: ['freight', 'invoice', 'ura'],
      fileType: 'pdf',
      previewContent: `FREIGHT INVOICE
Invoice Number: FI-2026-00458
Date: 22 July 2026

CARRIER INFORMATION:
--------------------------------------------------
Carrier: MV Star Express
Voyage Number: SE-2026-078
IMO Number: 9876543
Flag State: Liberia

ROUTE INFORMATION:
--------------------------------------------------
Origin: Shanghai, China
Destination: Port of Mombasa, Kenya
Transshipment: None (Direct)

FREIGHT CHARGES:
--------------------------------------------------
Base Freight:         12,500.00 USD
Insurance:             2,500.00 USD
Fuel Surcharge:        1,200.00 USD
Documentation Fee:       300.00 USD
Port Handling Fee:       800.00 USD
Security Fee:            200.00 USD
--------------------------------------------------
Total Freight:        17,500.00 USD

EXCHANGE RATE: 1 USD = 3,750 UGX
Total in UGX: 65,625,000 UGX

SHIPPING DETAILS:
--------------------------------------------------
Container: MSKU-458921
Seal Number: SEAL-2026-078
Gross Weight: 12.5 tons
Volume: 45 CBM

This invoice is required by URA for customs value calculation.
All charges are subject to verification by customs authorities.

Authorized Signature:
__________________
MV Star Express
Date: 22 July 2026`
    },
    {
      id: 7,
      name: 'Importer Details',
      description: 'Company Name, Business Address, Contact Person Details',
      type: 'details',
      status: 'completed',
      date: '2026-07-05',
      size: '0.5 MB',
      pages: 2,
      uploadedBy: 'John Doe',
      shipmentId: '#458',
      documentNumber: 'ID-2026-00458',
      expiryDate: null,
      tags: ['importer', 'details', 'registration'],
      fileType: 'pdf',
      previewContent: `IMPORTER DETAILS
Registration Number: ID-2026-00458
Date: 05 July 2026

COMPANY INFORMATION:
--------------------------------------------------
Company Name: ImportFlow Ltd
Business Address: Plot 45, Industrial Area, Kampala, Uganda
Postal Address: P.O. Box 5678, Kampala, Uganda
Phone: +256 712 345 678
Email: info@importflow.com
Website: www.importflow.com

REGISTRATION DETAILS:
--------------------------------------------------
TIN Number: 1234567890
Registration Date: 01 January 2020
License Number: IMP-2020-456
License Type: General Importer

CONTACT PERSONS:
--------------------------------------------------
1. Primary Contact:
   Name: John Doe
   Title: Director of Operations
   Phone: +256 712 345 678
   Email: john@importflow.com

2. Secondary Contact:
   Name: Jane Smith
   Title: Procurement Manager
   Phone: +256 713 456 789
   Email: jane@importflow.com

BANKING DETAILS:
--------------------------------------------------
Bank: Stanbic Bank Uganda
Account Name: ImportFlow Ltd
Account Number: 9030001234567
Swift Code: SBICUGKX

This document is valid for all import operations.
Any changes must be reported to the relevant authorities.

Authorized Signature:
__________________
John Doe
Director of Operations
ImportFlow Ltd`
    },
    {
      id: 8,
      name: 'Import Items List',
      description: 'Items & Quantities being imported',
      type: 'list',
      status: 'completed',
      date: '2026-07-08',
      size: '0.8 MB',
      pages: 1,
      uploadedBy: 'Jane Smith',
      shipmentId: '#458',
      documentNumber: 'IIL-2026-00458',
      expiryDate: null,
      tags: ['items', 'import', 'quantity'],
      fileType: 'pdf',
      previewContent: `IMPORT ITEMS LIST
Document Number: IIL-2026-00458
Date: 08 July 2026

----------------------------------------------------------------
Item Description          | Qty | HS Code      | Unit | Unit Price
----------------------------------------------------------------
Electronics Components   | 450 | 8542.31      | Unit | 468,750 UGX
Circuit Boards           | 1200| 8534.00      | Unit | 187,500 UGX
Power Supplies           | 850 | 8504.40      | Unit | 234,375 UGX
----------------------------------------------------------------

SUMMARY:
--------------------------------------------------
Total Items: 3 types
Total Quantity: 2,500 units
Total Value: 635,156,250 UGX

ITEM DETAILS:
--------------------------------------------------
1. Electronics Components
   - Model: EC-2024-XL
   - Country of Origin: China
   - Warranty: 12 months

2. Circuit Boards
   - Model: CB-2024-PRO
   - Country of Origin: China
   - Warranty: 24 months

3. Power Supplies
   - Model: PS-2024-500W
   - Country of Origin: China
   - Warranty: 12 months

PACKAGING:
--------------------------------------------------
All items are packed in export-quality cartons.
Total packages: 150 cartons

This list is for customs declaration purposes.
All items meet the required import standards.

Authorized Signature:
__________________
Jane Smith
Procurement Manager
ImportFlow Ltd`
    }
  ];

  // Check if we're viewing a specific document
  useEffect(() => {
    if (id) {
      const doc = documents.find(d => d.id === parseInt(id));
      if (doc) {
        setSelectedDocument(doc);
      } else {
        navigate('/documents');
      }
    }
  }, [id, navigate]);

  // Get document icon based on type
  const getDocumentIcon = (type) => {
    switch(type) {
      case 'invoice': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'contract': return <FileSignature className="w-5 h-5 text-purple-500" />;
      case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
      case 'certificate': return <Shield className="w-5 h-5 text-orange-500" />;
      case 'details': return <Building className="w-5 h-5 text-indigo-500" />;
      case 'list': return <Package className="w-5 h-5 text-pink-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return {
        backgroundColor: colors.success + '20',
        color: colors.success,
        icon: <CheckCircle className="w-3 h-3" />
      };
    } else if (status === 'pending') {
      return {
        backgroundColor: colors.warning + '20',
        color: colors.warning,
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

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.shipmentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique document types for filter
  const documentTypes = ['all', ...new Set(documents.map(d => d.type))];
  const statusOptions = ['all', 'completed', 'pending', 'rejected'];

  // Toggle document expansion
  const toggleExpand = (docId) => {
    if (expandedDoc === docId) {
      setExpandedDoc(null);
    } else {
      setExpandedDoc(docId);
    }
  };

  // Navigate to document details
  const viewDocument = (doc) => {
    navigate(`/document/${doc.id}`);
  };

  // Handle share
  const handleShare = () => {
    alert(`Document "${selectedDocument?.name}" shared with ${shareEmail || 'application users'}`);
    setShowShareModal(false);
    setShareEmail('');
    setShareMessage('');
  };

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(Math.min(200, zoomLevel + 10));
  const handleZoomOut = () => setZoomLevel(Math.max(50, zoomLevel - 10));
  const handleRotate = () => setRotation((rotation + 90) % 360);

  // Document Preview Component - Full screen document viewer
  const DocumentPreview = ({ doc }) => {
    if (!doc) return null;

    const contentLines = doc.previewContent ? doc.previewContent.split('\n') : ['No content available'];

    return (
      <div className="space-y-4">
        {/* Toolbar */}
        <div className={`flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <FileText className="w-4 h-4 inline mr-2" />
              {doc.name}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
              Page {currentPage} of {doc.pages}
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
              <PrinterIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const blob = new Blob([doc.previewContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${doc.name.replace(/\s+/g, '_')}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              style={{ color: colors.primary }}
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Content - Full width */}
        <div 
          className={`p-8 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-900' : 'border-gray-200 bg-white'} shadow-inner min-h-[500px] overflow-auto transition-all duration-300`}
          style={{ 
            transform: `scale(${zoomLevel/100}) rotate(${rotation}deg)`, 
            transformOrigin: 'top left',
            width: isFullscreen ? '100vw' : '100%',
            height: isFullscreen ? 'calc(100vh - 200px)' : 'auto'
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
              const isBold = trimmedLine.includes('**') || trimmedLine.includes('__');

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
                // Table header or divider
                return <div key={index} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} my-1`} />;
              }

              if (trimmedLine.includes('|')) {
                // Table row
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
                <p key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} ${isBold ? 'font-bold' : ''} py-0.5`}>
                  {trimmedLine}
                </p>
              );
            })}
          </div>

          {/* Watermark/Footer */}
          <div className={`mt-8 pt-4 border-t text-xs ${isDark ? 'border-gray-700 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
            <div className="flex justify-between">
              <span>Document: {doc.documentNumber}</span>
              <span>Generated: {new Date().toLocaleString()}</span>
              <span>Page 1 of {doc.pages}</span>
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
            Page {currentPage} of {doc.pages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(doc.pages, currentPage + 1))}
            disabled={currentPage >= doc.pages}
            className={`p-2 rounded-lg transition-colors ${currentPage >= doc.pages ? 'opacity-50 cursor-not-allowed' : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Document Details Page - Full width
  const DocumentDetails = ({ doc }) => {
    if (!doc) return null;

    const statusStyle = getStatusBadge(doc.status);

    return (
      <div className="w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <button
            onClick={() => navigate('/documents')}
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
                {getDocumentIcon(doc.type)}
              </div>
              <div>
                <h1 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {doc.name}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {doc.description}
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
                    {doc.status}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {doc.shipmentId}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {doc.fileType.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
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
                onClick={() => navigate('/documents')}
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

        {/* Tabs - Simplified */}
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
          </div>

          <div className="p-4">
            {/* Preview Tab - Full width document viewer */}
            {activeTab === 'preview' && (
              <DocumentPreview doc={doc} />
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Number</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.documentNumber}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Uploaded By</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.uploadedBy}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Upload Date</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(doc.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expiry Date</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>File Type</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.fileType.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pages</p>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.pages}</p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {doc.tags.map((tag, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Share Modal
  const ShareModal = ({ doc, onClose }) => {
    if (!doc) return null;

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
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className={`p-3 rounded-lg mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                {getDocumentIcon(doc.type)}
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.shipmentId}</p>
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

  // If viewing a specific document, show details page - FULL WIDTH
  if (selectedDocument) {
    return (
      <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        {showShareModal && (
          <ShareModal 
            doc={selectedDocument} 
            onClose={() => setShowShareModal(false)} 
          />
        )}
        <div className="w-full">
          <DocumentDetails doc={selectedDocument} />
        </div>
      </div>
    );
  }

  // Otherwise show the document list
  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {showShareModal && selectedDocument && (
        <ShareModal 
          doc={selectedDocument} 
          onClose={() => setShowShareModal(false)} 
        />
      )}

        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Documents
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage all your import documentation
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: 'white'
              }}
              onClick={() => navigate('/new-import')}
            >
              <Plus className="w-4 h-4" />
              New Document
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: colors.primary }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{documents.length}</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: colors.success }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {documents.filter(d => d.status === 'completed').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: colors.warning }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {documents.filter(d => d.status === 'pending').length}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: colors.danger }} />
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Action Required</span>
            </div>
            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {documents.filter(d => d.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-lg p-4 mb-6 transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}33`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`pl-10 pr-8 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 appearance-none ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                >
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setFilterType('all');
                }}
                className={`px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                  isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocuments.map((doc) => {
            const isExpanded = expandedDoc === doc.id;
            const statusStyle = getStatusBadge(doc.status);

            return (
              <div
                key={doc.id}
                className={`rounded-lg transition-all duration-300 ${
                  isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
                } ${isExpanded ? 'p-4 md:p-6' : 'p-3 md:p-4'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => toggleExpand(doc.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 
                            className={`font-bold cursor-pointer hover:underline ${isDark ? 'text-white' : 'text-gray-900'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              viewDocument(doc);
                            }}
                          >
                            {doc.name}
                          </h3>
                          <span 
                            className="text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1"
                            style={{
                              backgroundColor: statusStyle.backgroundColor,
                              color: statusStyle.color
                            }}
                          >
                            {statusStyle.icon}
                            {doc.status}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            {doc.shipmentId}
                          </span>
                        </div>
                        <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewDocument(doc)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="View Document"
                    >
                      <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDocument(doc);
                        setShowShareModal(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Share Document"
                    >
                      <Share2 className="w-4 h-4" style={{ color: colors.primary }} />
                    </button>
                    <button
                      onClick={() => toggleExpand(doc.id)}
                      className={`p-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700`}
                      style={{ color: colors.primary }}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Document Number</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.documentNumber}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Size</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.size}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pages</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.pages}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Uploaded By</p>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.uploadedBy}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => viewDocument(doc)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: colors.primary,
                          color: 'white'
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View Document
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDocument(doc);
                          setShowShareModal(true);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredDocuments.length === 0 && (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No documents found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;