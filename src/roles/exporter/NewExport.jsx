// NewExport.jsx - Complete exporter workflow with two modes (Self-Service / Importer Order)
// Both modes support Local and International export types.
//
// FIXES IN THIS VERSION
// 1. Step index <-> rendered content are now in sync for BOTH modes.
//    Previously self-service injected "mode selection" as case 0, which shifted every
//    step by one (title "Bill of Lading" rendered the Packing List, "Book Local Transport"
//    rendered Finalise Preparation, and the final step was unreachable).
// 2. Self-service step 0 ("Prepare Goods") now shows a compact mode/export-type switcher
//    together with the item preparation table, so step counts stay 7 (intl) / 6 (local).
// 3. "Proceed" buttons use currentStep + 1 instead of hard-coded indexes.
// 4. Nested cell edits (packingList.*, billOfLading.*, customFields.*) actually persist.
// 5. Table / toast / viewer sub-components hoisted out of the component so inputs no
//    longer lose focus on every keystroke.
// 6. Total value auto-calculates from quantity x unit price.
// 7. Document completeness check no longer treats "undefined" as uploaded.

import React, { useState, useContext, useEffect } from 'react';
import {
  Package,
  ClipboardList,
  Send,
  FileSignature,
  ChevronRight,
  ChevronLeft,
  Save,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Download,
  Eye,
  X,
  RefreshCw,
  File,
  Image,
  FileSpreadsheet,
  FileArchive,
  Info,
  Edit2,
  Search,
  UploadCloud,
  PackageCheck,
  ChevronDown,
  ChevronUp,
  Truck,
  Check,
  Copy as CopyIcon,
  FileText,
  ShoppingBag,
  Ship,
  Boxes,
  Layers,
  Briefcase,
  Bus
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import ProgressBar from '../../components/ProgressBar';

// ============================================================================
// THEME - Now built from context, not hardcoded
// ============================================================================
// REMOVED: const COLORS = { ... } - Now built inside the component

// ============================================================================
// MOCK DATA
// ============================================================================
const EXPORTER_PROFILE = {
  id: 'EXP-001',
  companyName: 'Uganda Exporters Ltd',
  businessAddress: 'Plot 25, Kampala Road, Kampala, Uganda',
  contactPerson: 'John Doe',
  contactEmail: 'john@ugandaexporters.com',
  contactPhone: '+256 700 123 456',
  registrationNumber: 'REG-2024-001',
  tinNumber: 'TIN-123456789'
};

const FREIGHT_FORWARDERS = [
  { id: 'FF-001', name: 'Global Freight Logistics', email: 'info@globalfreight.com', phone: '+256 701 234 567' },
  { id: 'FF-002', name: 'East Africa Shipping Co', email: 'info@eastafricashipping.com', phone: '+256 702 345 678' },
  { id: 'FF-003', name: 'Kampala Cargo Services', email: 'info@kampalacargo.com', phone: '+256 703 456 789' }
];

const LOCAL_TRANSPORT_COMPANIES = [
  { id: 'TRP-001', name: 'Kampala Haulage Ltd', email: 'info@kampalahaulage.com', phone: '+256 701 234 567' },
  { id: 'TRP-002', name: 'Uganda Logistics Services', email: 'info@ugandalogistics.com', phone: '+256 702 345 678' },
  { id: 'TRP-003', name: 'East African Transporters', email: 'info@eastafricantransport.com', phone: '+256 703 456 789' }
];

const MOCK_ORDER_REQUESTS = [
  {
    id: 'REQ-001',
    importerName: 'TechGlobal Imports Ltd',
    importerEmail: 'info@techglobalimports.com',
    importerPhone: '+256 701 234 567',
    requestDate: '2024-01-15T10:30:00.000Z',
    items: [
      { id: 1, itemName: 'Laptop Computers', quantity: 50, unitPrice: '1200000', totalValue: '60000000' },
      { id: 2, itemName: 'Desktop Monitors', quantity: 100, unitPrice: '800000', totalValue: '80000000' }
    ],
    status: 'pending',
    notes: 'Urgent delivery required within 30 days',
    responseDate: null,
    responseNotes: ''
  },
  {
    id: 'REQ-002',
    importerName: 'East African Importers',
    importerEmail: 'sales@eaimporters.com',
    importerPhone: '+256 702 345 678',
    requestDate: '2024-01-18T14:20:00.000Z',
    items: [
      { id: 3, itemName: 'Office Chairs', quantity: 200, unitPrice: '300000', totalValue: '60000000' },
      { id: 4, itemName: 'Desk Tables', quantity: 150, unitPrice: '600000', totalValue: '90000000' }
    ],
    status: 'pending',
    notes: 'Need these for new office setup',
    responseDate: null,
    responseNotes: ''
  }
];

// ============================================================================
// HELPERS
// ============================================================================
const ensureItemStructure = (item, mode = 'self') => ({
  ...item,
  status: item.status || 'pending',
  exporterStatus: item.exporterStatus || 'pending',
  exporterNotes: item.exporterNotes || '',
  importerId: item.importerId || '',
  importerName: item.importerName || '',
  importerEmail: item.importerEmail || '',
  importerStatus: item.importerStatus || 'pending',
  importerNotes: item.importerNotes || '',
  importerQuantity: item.importerQuantity || '',
  isImporterOrder: item.isImporterOrder ?? mode === 'importer',
  customFields: item.customFields || {},
  pvoc: {
    certificateNumber: '',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    ...item.pvoc,
    uploadedDocuments: item.pvoc?.uploadedDocuments || []
  },
  coc: {
    certificateNumber: '',
    issueDate: '',
    expiryDate: '',
    status: 'pending',
    ...item.coc,
    uploadedDocuments: item.coc?.uploadedDocuments || []
  },
  packingList: {
    packageType: '',
    numberOfPackages: '',
    weight: '',
    dimensions: '',
    handlingInstructions: '',
    ...item.packingList,
    uploadedDocuments: item.packingList?.uploadedDocuments || []
  },
  billOfLading: {
    billNumber: '',
    portOfLoading: '',
    portOfDischarge: '',
    vesselName: '',
    voyageNumber: '',
    containerNumber: '',
    sealNumber: '',
    ...item.billOfLading,
    uploadedDocuments: item.billOfLading?.uploadedDocuments || []
  },
  commercialInvoice: {
    document: null,
    uploadedAt: null,
    status: 'pending',
    ...item.commercialInvoice
  },
  freightInvoice: {
    invoiceNumber: '',
    amount: '',
    date: '',
    status: 'pending',
    ...item.freightInvoice,
    uploadedDocuments: item.freightInvoice?.uploadedDocuments || []
  },
  travelDocuments: {
    ...item.travelDocuments,
    uploadedDocuments: item.travelDocuments?.uploadedDocuments || []
  }
});

// Read a possibly nested value: getNested(item, 'packingList.weight')
const getNested = (obj, path) => {
  if (!path) return '';
  const parts = String(path).split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return '';
    current = current[part];
  }
  return current ?? '';
};

// Immutably write a possibly nested value: setNested(item, 'packingList.weight', 5)
const setNested = (obj, path, value) => {
  const parts = String(path).split('.');
  if (parts.length === 1) return { ...obj, [parts[0]]: value };
  const [head, ...rest] = parts;
  return { ...obj, [head]: setNested(obj?.[head] || {}, rest.join('.'), value) };
};

const formatCurrency = (amount) => {
  if (!amount) return 'UGX 0';
  return `UGX ${Number(amount).toLocaleString()}`;
};

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileIcon = (fileType) => {
  if (fileType === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
  if (fileType?.includes('image')) return <Image className="w-4 h-4 text-blue-500" />;
  if (fileType?.includes('spreadsheet') || fileType?.includes('excel')) return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
  if (fileType?.includes('zip') || fileType?.includes('rar')) return <FileArchive className="w-4 h-4 text-orange-500" />;
  return <File className="w-4 h-4 text-gray-500" />;
};

const getStatusColor = (status) => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    available: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    unavailable: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    partial: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    accepted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    referred: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    uploaded: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    invoice_received: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
  };
  return map[status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
};

const getOrderStatusDisplay = (status) => {
  const map = {
    draft: 'Draft',
    sent: 'Sent',
    review: 'Under Review',
    confirmed: 'Confirmed',
    finalized: 'Finalized'
  };
  return map[status] || 'Unknown';
};

// Opens a file picker without needing a hidden <input> in the tree
const pickFile = (onPicked, { multiple = false, accept = '.pdf,.doc,.docx,.png,.jpg,.jpeg' } = {}) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.multiple = multiple;
  input.onchange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    onPicked(multiple ? files : files[0]);
  };
  input.click();
};

const readFileAsDocument = (file, index = 0) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () =>
      resolve({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        data: reader.result
      });
    reader.readAsDataURL(file);
  });

// ============================================================================
// HOISTED SUB-COMPONENTS
// (kept outside NewExport so React does not remount them on every keystroke)
// ============================================================================
const Toast = ({ message, type, onClose, themeColors }) => {
  if (!message) return null;
  
  const toastColors = {
    success: { bg: themeColors?.success || '#10b981', icon: <CheckCircle className="w-5 h-5" /> },
    error: { bg: themeColors?.danger || '#ef4444', icon: <AlertCircle className="w-5 h-5" /> },
    info: { bg: themeColors?.info || '#3b82f6', icon: <Info className="w-5 h-5" /> }
  };
  
  const style = toastColors[type] || toastColors.success;

  return (
    <div className={`fixed top-24 right-4 z-[110] flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white`}
         style={{ backgroundColor: style.bg }}>
      {style.icon}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const BulkActionBar = ({ isDark, selectedCount, onDelete, onDuplicate, onExport, onClear, themeColors }) => {
  if (!selectedCount) return null;
  
  const colors = themeColors || {
    primary: '#714b67',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
    danger: '#ef4444'
  };
  
  return (
    <div className={`flex flex-wrap items-center gap-3 p-3 rounded-lg border-2 mb-4 ${isDark ? 'border-blue-700 bg-blue-900/20' : 'border-blue-300 bg-blue-50'}`}>
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4 text-blue-500" />
        <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
          {selectedCount} item(s) selected
        </span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        <button
          onClick={onDuplicate}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{ backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg, color: colors.primary }}
        >
          <CopyIcon className="w-3 h-3" />
          Duplicate
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{ backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg, color: colors.primary }}
        >
          <Download className="w-3 h-3" />
          Export
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:shadow-md"
          style={{ backgroundColor: colors.danger }}
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      </div>
    </div>
  );
};

// OdooTable component - receives themeColors as prop
const OdooTable = ({
  isDark,
  items = [],
  columns = [],
  onCellEdit,
  onRowDelete,
  onRowAdd,
  onAddColumn,
  onRemoveColumn,
  showCheckboxes = true,
  actions = [],
  footer = null,
  showAddRow = true,
  selectedRows = new Set(),
  onRowSelect = null,
  onSelectAll = null,
  emptyMessage = 'No items added yet',
  themeColors
}) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  
  const colors = themeColors || {
    primary: '#714b67',
    primaryBg: '#f5f0f4',
    primaryBgDark: '#2d1f29',
    danger: '#ef4444'
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedItems = [...items];
  if (sortField) {
    sortedItems.sort((a, b) => {
      const aVal = getNested(a, sortField);
      const bVal = getNested(b, sortField);
      if (sortDirection === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }

  const isAllSelected = items.length > 0 && items.every((item) => selectedRows.has(item.id));

  const renderCellContent = (item, col) => {
    if (col.render) return col.render(item);

    const value = getNested(item, col.key);

    if (col.editable === false) {
      return <span className={isDark ? 'text-white' : 'text-gray-900'}>{value === '' ? '-' : value}</span>;
    }

    return (
      <input
        type={col.type || 'text'}
        value={value}
        onChange={(e) => onCellEdit && onCellEdit(item.id, col.key, e.target.value)}
        className={`w-full min-w-[110px] px-2 py-1 rounded border bg-transparent focus:outline-none focus:ring-1 ${
          isDark ? 'border-gray-600 text-white placeholder-gray-500' : 'border-gray-200 text-gray-900 placeholder-gray-400'
        }`}
        placeholder={col.placeholder || ''}
      />
    );
  };

  return (
    <div className={`rounded-lg border overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className={`flex flex-wrap items-center justify-between gap-2 p-3 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{items.length} items</span>
          {selectedRows.size > 0 && (
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>• {selectedRows.size} selected</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onAddColumn && (
            <button
              onClick={onAddColumn}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{ backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg, color: colors.primary }}
            >
              <Plus className="w-3 h-3" />
              Add Column
            </button>
          )}
          {showAddRow && onRowAdd && (
            <button
              onClick={onRowAdd}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: colors.primary }}
            >
              <Plus className="w-3 h-3" />
              Add Item
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              {showCheckboxes && (
                <th className="px-3 py-2 w-8">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={() => onSelectAll && onSelectAll()}
                    className="rounded border-gray-300"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2 text-left text-xs font-medium whitespace-nowrap cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortField === col.key && (sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                    {col.removable && onRemoveColumn && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveColumn(col.removeKey || col.key);
                        }}
                        className="ml-1 p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/20"
                      >
                        <X className="w-3 h-3 text-red-500" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {(actions.length > 0 || onRowDelete) && (
                <th className={`px-3 py-2 text-center text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            {sortedItems.map((item, index) => (
              <tr
                key={item.id}
                className={`${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors ${
                  index % 2 === 0 ? (isDark ? 'bg-gray-800/50' : 'bg-white') : isDark ? 'bg-gray-700/30' : 'bg-gray-50/50'
                }`}
              >
                {showCheckboxes && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => onRowSelect && onRowSelect(item.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={`${item.id}-${col.key}`} className="px-3 py-2 align-middle">
                    {renderCellContent(item, col)}
                  </td>
                ))}
                {(actions.length > 0 || onRowDelete) && (
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => action.onClick(item)}
                          className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${action.className || ''}`}
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      ))}
                      {onRowDelete && (
                        <button
                          onClick={() => onRowDelete(item.id)}
                          className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (showCheckboxes ? 1 : 0) + (actions.length > 0 || onRowDelete ? 1 : 0)}
                  className={`px-4 py-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>{emptyMessage}</p>
                  {showAddRow && onRowAdd && <p className="text-xs mt-1">Click &quot;Add Item&quot; to get started</p>}
                </td>
              </tr>
            )}
          </tbody>
          {footer && <tfoot className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>{footer}</tfoot>}
        </table>
      </div>
    </div>
  );
};

const DocumentViewerPage = ({ isDark, doc, onClose, themeColors }) => {
  if (!doc) return null;
  
  const colors = themeColors || { primary: '#714b67' };

  const download = () => {
    const link = document.createElement('a');
    link.href = doc.data;
    link.download = doc.name;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-gray-900">
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center gap-3 min-w-0">
          {getFileIcon(doc.type)}
          <div className="min-w-0">
            <h3 className={`text-lg font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{doc.name}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatFileSize(doc.size)} • Uploaded {doc.uploadDate ? new Date(doc.uploadDate).toLocaleString() : '-'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={download}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: colors.primary }}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {doc.type?.startsWith('image/') ? (
          <img src={doc.data} alt={doc.name} className="max-w-full max-h-full object-contain mx-auto" />
        ) : doc.type === 'application/pdf' ? (
          <iframe src={doc.data} className="w-full h-full min-h-[600px] rounded-lg border" title={doc.name} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <File className="w-24 h-24 mx-auto mb-4 text-gray-400" />
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Preview not available for this file type</p>
            <button
              onClick={download}
              className="mt-4 px-6 py-3 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// STEP DEFINITIONS
// Step index === rendered content index. No hidden/injected steps.
// ============================================================================
const getSteps = (exportMode, isInternational) => {
  if (exportMode === 'importer') {
    if (isInternational) {
      return [
        { id: 0, key: 'loadOrder', title: 'Load Order', icon: ShoppingBag, description: 'Load order from importer request', required: true },
        { id: 1, key: 'importerReview', title: 'Items Review & Confirm', icon: ClipboardList, description: 'Review items and confirm availability', required: true },
        { id: 2, key: 'salesContract', title: 'Sales Contract & Invoice', icon: FileSignature, description: 'Create sales contract and invoice', required: true },
        { id: 3, key: 'packingList', title: 'Packing List', icon: Boxes, description: 'Create packing list', required: true },
        { id: 4, key: 'billOfLading', title: 'Bill of Lading', icon: Ship, description: 'Create bill of lading', required: true },
        { id: 5, key: 'finalisePreparation', title: 'Finalise Preparation', icon: PackageCheck, description: 'Upload Commercial Invoice and Freight Invoice', required: true },
        { id: 6, key: 'transport', title: 'Send to Freight Forwarder', icon: Truck, description: 'Select freight forwarder and send goods', required: true },
        { id: 7, key: 'orderFinalisation', title: 'Order Finalisation', icon: CheckCircle, description: 'Finalize the export order', required: true }
      ];
    }
    return [
      { id: 0, key: 'loadOrder', title: 'Load Order', icon: ShoppingBag, description: 'Load order from importer request', required: true },
      { id: 1, key: 'importerReview', title: 'Items Review & Confirm', icon: ClipboardList, description: 'Review items and confirm availability', required: true },
      { id: 2, key: 'salesContract', title: 'Sales Contract & Invoice', icon: FileSignature, description: 'Create sales contract and invoice', required: true },
      { id: 3, key: 'packingList', title: 'Packing List', icon: Boxes, description: 'Create packing list', required: true },
      { id: 4, key: 'finalisePreparation', title: 'Finalise Preparation', icon: PackageCheck, description: 'Upload Commercial Invoice and Travel Documents', required: true },
      { id: 5, key: 'transport', title: 'Book Local Transport', icon: Bus, description: 'Select local transport company to send goods', required: true },
      { id: 6, key: 'orderFinalisation', title: 'Order Finalisation', icon: CheckCircle, description: 'Finalize the export order', required: true }
    ];
  }

  // Self-service
  if (isInternational) {
    return [
      { id: 0, key: 'prepareGoods', title: 'Prepare Goods', icon: Package, description: 'Choose export type and add your items', required: true },
      { id: 1, key: 'itemsReview', title: 'Items Review', icon: ClipboardList, description: 'Review and manage your items', required: true },
      { id: 2, key: 'packingList', title: 'Packing List', icon: Boxes, description: 'Create packing list', required: true },
      { id: 3, key: 'billOfLading', title: 'Bill of Lading', icon: Ship, description: 'Create bill of lading', required: true },
      { id: 4, key: 'finalisePreparation', title: 'Finalise Preparation', icon: PackageCheck, description: 'Upload Commercial Invoice and Freight Invoice', required: true },
      { id: 5, key: 'transport', title: 'Send to Freight Forwarder', icon: Truck, description: 'Select freight forwarder and send goods', required: true },
      { id: 6, key: 'orderFinalisation', title: 'Order Finalisation', icon: CheckCircle, description: 'Finalize the export order', required: true }
    ];
  }
  return [
    { id: 0, key: 'prepareGoods', title: 'Prepare Goods', icon: Package, description: 'Choose export type and add your items', required: true },
    { id: 1, key: 'itemsReview', title: 'Items Review', icon: ClipboardList, description: 'Review and manage your items', required: true },
    { id: 2, key: 'packingList', title: 'Packing List', icon: Boxes, description: 'Create packing list', required: true },
    { id: 3, key: 'finalisePreparation', title: 'Finalise Preparation', icon: PackageCheck, description: 'Upload Commercial Invoice and Travel Documents', required: true },
    { id: 4, key: 'transport', title: 'Book Local Transport', icon: Bus, description: 'Select local transport company to send goods', required: true },
    { id: 5, key: 'orderFinalisation', title: 'Order Finalisation', icon: CheckCircle, description: 'Finalize the export order', required: true }
  ];
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const NewExport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // ===== KEY CHANGE: Get theme from context =====
  const { darkMode, theme } = useContext(ThemeContext);
  const isDark = darkMode;

  // ===== KEY CHANGE: Build colors from theme =====
  const colors = {
    primary: theme.primary,
    primaryLight: theme.primary + 'cc',
    primaryDark: theme.primary + '99',
    primaryBg: theme.primary + '20',
    primaryBgDark: theme.primary + '40',
    success: theme.success || '#10b981',
    warning: theme.accent || '#f59e0b',
    danger: theme.danger || '#ef4444',
    info: theme.secondary || '#3b82f6',
    border: theme.border || '#e2e8f0',
    hover: theme.surfaceHover || '#f7fafc'
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  const [viewingDocument, setViewingDocument] = useState(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [showBatchLoadModal, setShowBatchLoadModal] = useState(false);

  const [selectedImporter, setSelectedImporter] = useState('');
  const [importerEmail, setImporterEmail] = useState('');
  const [importerName, setImporterName] = useState('');

  const [selectedFreightForwarder, setSelectedFreightForwarder] = useState('');
  const [freightForwarderName, setFreightForwarderName] = useState('');
  const [freightForwarderEmail, setFreightForwarderEmail] = useState('');

  const [orderStatus, setOrderStatus] = useState('draft');
  const [reviewItems, setReviewItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState('text');
  const [customColumns, setCustomColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [orderRequests] = useState(MOCK_ORDER_REQUESTS);
  const [loadOrderMode, setLoadOrderMode] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [freightResponse, setFreightResponse] = useState(null);

  // Mode + export type
  const [exportMode, setExportMode] = useState('self'); // 'self' | 'importer'
  const [isInternational, setIsInternational] = useState(true);

  const [salesContract, setSalesContract] = useState({
    contractNumber: '',
    contractDate: new Date().toISOString().split('T')[0],
    buyerName: '',
    sellerName: '',
    termsOfDelivery: '',
    paymentTerms: '',
    deliveryDate: '',
    totalValue: '',
    uploadedDocuments: [],
    invoiceDocument: null
  });

  const [freightData, setFreightData] = useState({
    freightForwarder: '',
    freightForwarderEmail: '',
    freightForwarderPhone: '',
    shippingDate: '',
    expectedArrival: '',
    portOfLoading: '',
    portOfDischarge: '',
    vesselName: '',
    containerNumber: '',
    sealNumber: '',
    billOfLadingNumber: '',
    status: 'pending',
    uploadedDocuments: [],
    freightInvoice: { invoiceNumber: '', invoiceDate: '', amount: '', uploadedDocuments: [] },
    billOfLading: { number: '', date: '', portOfLoading: '', portOfDischarge: '', vessel: '', container: '', uploadedDocuments: [] },
    response: null,
    paymentConfirmed: false,
    paymentConfirmedAt: null,
    goodsSent: false,
    goodsSentAt: null
  });

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    importerInvoiceNumber: '',
    totalAmount: '',
    taxAmount: '',
    shippingCost: '',
    notes: '',
    uploadedDocuments: [],
    paymentStatus: 'pending',
    payments: []
  });

  const [importData, setImportData] = useState({
    exporterDetails: { ...EXPORTER_PROFILE },
    items: [
      ensureItemStructure(
        {
          id: Date.now(),
          itemCode: 'ITEM-001',
          itemName: 'Export Product 1',
          itemGroup: 'Electronics',
          stockUOM: 'Pieces',
          barcode: '1234567890',
          standardSellingRate: '1200000',
          quantity: 10,
          unitPrice: '1200000',
          totalValue: '12000000'
        },
        'self'
      )
    ],
    exportNumber: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    progress: 0,
    isLoadOrder: false,
    originalRequestId: null,
    isOrderConfirmed: false,
    freightForwarder: '',
    freightStatus: 'pending',
    exportType: 'international',
    mode: 'self'
  });

  const steps = getSteps(exportMode, isInternational);
  const safeStepIndex = Math.min(currentStep, steps.length - 1);
  const activeStep = steps[safeStepIndex];

  // ------------------------------ toast ------------------------------
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --------------------------- persistence ---------------------------
  const buildDraft = () => ({
    ...importData,
    orderStatus,
    reviewItems,
    selectedImporter,
    importerEmail,
    importerName,
    customColumns,
    isLoadOrder: loadOrderMode,
    isOrderConfirmed,
    salesContract,
    freightData,
    freightResponse,
    invoiceData,
    exportMode,
    isInternational,
    exportType: isInternational ? 'international' : 'local',
    mode: exportMode,
    updatedAt: new Date().toISOString(),
    currentStep: safeStepIndex
  });

  useEffect(() => {
    const savedData = localStorage.getItem('exportDraft');
    if (!savedData) return;
    try {
      const parsed = JSON.parse(savedData);
      const mode = parsed.exportMode || parsed.mode || 'self';
      setExportMode(mode);
      const fixedItems = (parsed.items || []).map((item) => ensureItemStructure(item, mode));
      setImportData((prev) => ({ ...prev, ...parsed, items: fixedItems.length ? fixedItems : prev.items, mode }));
      if (parsed.orderStatus) setOrderStatus(parsed.orderStatus);
      if (parsed.reviewItems) setReviewItems(parsed.reviewItems);
      if (parsed.selectedImporter) setSelectedImporter(parsed.selectedImporter);
      if (parsed.importerEmail) setImporterEmail(parsed.importerEmail);
      if (parsed.importerName) setImporterName(parsed.importerName);
      if (parsed.customColumns) setCustomColumns(parsed.customColumns);
      if (parsed.isLoadOrder) setLoadOrderMode(parsed.isLoadOrder);
      if (parsed.isOrderConfirmed) setIsOrderConfirmed(parsed.isOrderConfirmed);
      if (parsed.salesContract) setSalesContract(parsed.salesContract);
      if (parsed.freightData) setFreightData((prev) => ({ ...prev, ...parsed.freightData }));
      if (parsed.freightResponse) setFreightResponse(parsed.freightResponse);
      if (parsed.invoiceData) setInvoiceData(parsed.invoiceData);
      if (parsed.isInternational !== undefined) setIsInternational(parsed.isInternational);
      if (typeof parsed.currentStep === 'number') {
        const restoredSteps = getSteps(mode, parsed.isInternational ?? true);
        setCurrentStep(Math.min(parsed.currentStep, restoredSteps.length - 1));
      }
      if (parsed.freightData?.freightForwarder) setFreightForwarderName(parsed.freightData.freightForwarder);
      if (parsed.freightData?.freightForwarderEmail) setFreightForwarderEmail(parsed.freightData.freightForwarderEmail);
    } catch (e) {
      console.error('Error loading saved data:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem('exportDraft', JSON.stringify(buildDraft()));
    }, 3000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importData, orderStatus, reviewItems, selectedImporter, importerEmail, importerName, customColumns, salesContract, freightData, invoiceData, exportMode, isInternational, currentStep]);

  const saveProgress = () => {
    setIsSaving(true);
    setTimeout(() => {
      const dataToSave = buildDraft();
      localStorage.setItem('exportDraft', JSON.stringify(dataToSave));

      const exportsList = JSON.parse(localStorage.getItem('allExports') || '[]');
      const existingIndex = exportsList.findIndex((exp) => exp.exportNumber && exp.exportNumber === dataToSave.exportNumber);
      if (existingIndex >= 0) {
        exportsList[existingIndex] = dataToSave;
      } else if (dataToSave.exportNumber) {
        exportsList.push(dataToSave);
      }
      localStorage.setItem('allExports', JSON.stringify(exportsList));

      setIsSaving(false);
      setSavedSuccess(true);
      showToast('Progress saved successfully!', 'success');
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 400);
  };

  // --------------------------- progress calc ---------------------------
  const calculateProgress = () => {
    let progress = 0;
    if (importData.items.length > 0) progress += 10;
    if (orderStatus !== 'draft') progress += 10;
    if (orderStatus === 'sent' || orderStatus === 'review') progress += 10;
    if (orderStatus === 'confirmed') progress += 10;
    if (salesContract.contractNumber) progress += 10;
    if (invoiceData.paymentStatus === 'paid') progress += 10;
    if (freightData.status === 'accepted' || freightData.status === 'completed') progress += 10;
    if (freightData.paymentConfirmed) progress += 10;
    if (orderStatus === 'finalized') progress += 20;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    setImportData((prev) => {
      const progress = calculateProgress();
      return prev.progress === progress ? prev : { ...prev, progress };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importData.items, orderStatus, salesContract, invoiceData, freightData]);

  // ---------------------- load order from request ----------------------
  const loadOrderFromRequest = (request) => {
    if (!request) return;

    const newItems = request.items.map((item, idx) =>
      ensureItemStructure(
        {
          id: Date.now() + idx,
          itemCode: `ITEM-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          itemName: item.itemName,
          itemGroup: '',
          stockUOM: 'Pieces',
          barcode: '',
          standardSellingRate: item.unitPrice || '',
          quantity: item.quantity,
          unitPrice: item.unitPrice || '',
          totalValue: item.totalValue || String((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0)),
          isImporterOrder: true,
          importerId: request.id,
          importerName: request.importerName,
          importerEmail: request.importerEmail
        },
        'importer'
      )
    );

    setImportData((prev) => ({
      ...prev,
      items: newItems,
      isLoadOrder: true,
      originalRequestId: request.id,
      mode: 'importer'
    }));

    setImporterName(request.importerName);
    setImporterEmail(request.importerEmail);
    setSelectedImporter(request.importerId || '');
    setOrderStatus('sent');
    setIsOrderConfirmed(true);
    setExportMode('importer');
    showToast('Order loaded successfully from request!', 'success');
  };

  useEffect(() => {
    const stateData = location.state;
    if (stateData && stateData.requestData) {
      setExportMode('importer');
      loadOrderFromRequest(stateData.requestData);
      setLoadOrderMode(true);
      setCurrentStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // ----------------------------- item CRUD -----------------------------
  const recalcTotal = (item) => {
    const qty = parseFloat(item.quantity);
    const price = parseFloat(item.unitPrice);
    if (Number.isNaN(qty) || Number.isNaN(price)) return item;
    return { ...item, totalValue: String(qty * price) };
  };

  const updateItemField = (itemId, field, value) => {
    setImportData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== itemId) return item;
        let updated = setNested(item, field, value);
        if (field === 'quantity' || field === 'unitPrice') updated = recalcTotal(updated);
        return updated;
      })
    }));
  };

  const addRow = () => {
    const newItem = ensureItemStructure(
      {
        id: Date.now(),
        itemCode: `ITEM-${String(importData.items.length + 1).padStart(3, '0')}`,
        itemName: '',
        itemGroup: '',
        stockUOM: '',
        barcode: '',
        standardSellingRate: '',
        quantity: '',
        unitPrice: '',
        totalValue: '',
        customFields: customColumns.reduce((acc, col) => ({ ...acc, [col.key]: '' }), {})
      },
      exportMode
    );

    setImportData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    showToast('New row added. Fill in the details.', 'success');
  };

  const removeItem = (itemId) => {
    if (importData.items.length <= 1) {
      showToast('You need at least one item', 'error');
      return;
    }
    setImportData((prev) => ({ ...prev, items: prev.items.filter((item) => item.id !== itemId) }));
    showToast('Item removed', 'info');
  };

  const bulkDeleteItems = () => {
    if (selectedRows.size === 0) {
      showToast('No items selected', 'error');
      return;
    }
    if (importData.items.length - selectedRows.size < 1) {
      showToast('Cannot delete all items. Keep at least one item.', 'error');
      return;
    }
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.size} selected item(s)?`)) return;

    const count = selectedRows.size;
    setImportData((prev) => ({ ...prev, items: prev.items.filter((item) => !selectedRows.has(item.id)) }));
    setSelectedRows(new Set());
    showToast(`${count} item(s) deleted successfully!`, 'success');
  };

  const bulkDuplicateItems = () => {
    if (selectedRows.size === 0) {
      showToast('No items selected', 'error');
      return;
    }
    const itemsToDuplicate = importData.items.filter((item) => selectedRows.has(item.id));
    const duplicatedItems = itemsToDuplicate.map((item, idx) =>
      ensureItemStructure(
        {
          ...item,
          id: Date.now() + idx,
          itemCode: `${item.itemCode}-COPY`,
          customFields: { ...item.customFields }
        },
        exportMode
      )
    );
    setImportData((prev) => ({ ...prev, items: [...prev.items, ...duplicatedItems] }));
    setSelectedRows(new Set());
    showToast(`${duplicatedItems.length} item(s) duplicated successfully!`, 'success');
  };

  const buildExportRows = (items) =>
    items.map((item) => {
      const row = {
        'Item Code': item.itemCode,
        'Item Name': item.itemName,
        'Item Group': item.itemGroup,
        'Stock UOM': item.stockUOM,
        Barcode: item.barcode,
        'Standard Selling Rate': item.standardSellingRate,
        Quantity: item.quantity,
        'Unit Price': item.unitPrice,
        'Total Value': item.totalValue
      };
      customColumns.forEach((col) => {
        row[col.name] = item.customFields?.[col.key] || '';
      });
      return row;
    });

  const writeWorkbook = (rows, filename) => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Items');
    XLSX.writeFile(wb, filename);
  };

  const bulkExportItems = () => {
    if (selectedRows.size === 0) {
      showToast('No items selected', 'error');
      return;
    }
    const itemsToExport = importData.items.filter((item) => selectedRows.has(item.id));
    writeWorkbook(buildExportRows(itemsToExport), `Selected_Items_${new Date().toISOString().split('T')[0]}.xlsx`);
    setSelectedRows(new Set());
    showToast(`${itemsToExport.length} item(s) exported successfully!`, 'success');
  };

  const exportAllItems = () => {
    writeWorkbook(buildExportRows(importData.items), `Export_Items_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('Items exported successfully!', 'success');
  };

  const importItemsFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        const newItems = jsonData.map((row, index) =>
          ensureItemStructure(
            {
              id: Date.now() + index,
              itemCode: row['Item Code'] || row.itemCode || `ITEM-${String(index + 1).padStart(3, '0')}`,
              itemName: row['Item Name'] || row.itemName || '',
              itemGroup: row['Item Group'] || row.itemGroup || '',
              stockUOM: row['Stock UOM'] || row.stockUOM || '',
              barcode: row.Barcode || row.barcode || '',
              standardSellingRate: row['Standard Selling Rate'] || row.standardSellingRate || '',
              quantity: row.Quantity || row.quantity || '',
              unitPrice: row['Unit Price'] || row.unitPrice || '',
              totalValue: row['Total Value'] || row.totalValue || ''
            },
            exportMode
          )
        );
        setImportData((prev) => ({ ...prev, items: [...prev.items, ...newItems] }));
        showToast(`Successfully imported ${newItems.length} items!`, 'success');
      } catch (error) {
        showToast('Error importing file', 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // --------------------------- custom columns ---------------------------
  const addCustomColumn = () => {
    if (!newColumnName.trim()) {
      showToast('Please enter a column name', 'error');
      return;
    }
    const columnKey = `custom_${newColumnName.toLowerCase().replace(/\s+/g, '_')}`;
    setCustomColumns((prev) => [...prev, { key: columnKey, name: newColumnName, type: newColumnType }]);
    setImportData((prev) => ({
      ...prev,
      items: prev.items.map((item) => ({ ...item, customFields: { ...item.customFields, [columnKey]: '' } }))
    }));
    setNewColumnName('');
    setNewColumnType('text');
    setShowAddColumnModal(false);
    showToast('Column added successfully!', 'success');
  };

  const removeCustomColumn = (columnKey) => {
    setCustomColumns((prev) => prev.filter((col) => col.key !== columnKey));
    setImportData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        const rest = { ...item.customFields };
        delete rest[columnKey];
        return { ...item, customFields: rest };
      })
    }));
    showToast('Column removed', 'info');
  };

  const customColumnDefs = customColumns.map((col) => ({
    key: `customFields.${col.key}`,
    removeKey: col.key,
    label: col.name,
    type: col.type === 'select' ? 'text' : col.type,
    editable: true,
    removable: true
  }));

  // ---------------------------- uploads ----------------------------
  const appendItemDocuments = async (itemId, section, files, { statusValue } = {}) => {
    const fileArray = Array.isArray(files) ? files : [files];
    const docs = await Promise.all(fileArray.map((file, idx) => readFileAsDocument(file, idx)));
    setImportData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              [section]: {
                ...item[section],
                uploadedDocuments: [...(item[section]?.uploadedDocuments || []), ...docs],
                ...(statusValue ? { status: statusValue } : {})
              }
            }
          : item
      )
    }));
    return docs;
  };

  const handlePVoCUpload = async (itemId, file) => {
    await appendItemDocuments(itemId, 'pvoc', file, { statusValue: 'uploaded' });
    showToast('PVoC document uploaded successfully!', 'success');
  };

  const handleCoCUpload = async (itemId, file) => {
    await appendItemDocuments(itemId, 'coc', file, { statusValue: 'uploaded' });
    showToast('CoC document uploaded successfully!', 'success');
  };

  const handlePackingListUpload = async (itemId, file) => {
    await appendItemDocuments(itemId, 'packingList', file);
    showToast('Packing list document uploaded successfully!', 'success');
  };

  const handleBillOfLadingUpload = async (itemId, file) => {
    await appendItemDocuments(itemId, 'billOfLading', file);
    showToast('Bill of Lading document uploaded successfully!', 'success');
  };

  const handleTravelDocumentsUpload = async (itemId, files) => {
    const docs = await appendItemDocuments(itemId, 'travelDocuments', files);
    showToast(`${docs.length} travel document(s) uploaded!`, 'success');
  };

  const handleFreightInvoiceUpload = async (itemId, file) => {
    const docs = await appendItemDocuments(itemId, 'freightInvoice', file, { statusValue: 'uploaded' });
    setFreightData((prev) => ({
      ...prev,
      freightInvoice: {
        ...prev.freightInvoice,
        uploadedDocuments: [...(prev.freightInvoice?.uploadedDocuments || []), ...docs]
      },
      status: prev.status === 'pending' ? prev.status : 'invoice_received'
    }));
    showToast('Freight Invoice uploaded successfully!', 'success');
  };

  const handleCommercialInvoiceUpload = async (itemId, file) => {
    const doc = await readFileAsDocument(file);
    setImportData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              commercialInvoice: { ...item.commercialInvoice, document: doc, uploadedAt: new Date().toISOString(), status: 'uploaded' }
            }
          : item
      )
    }));
    showToast('Commercial Invoice uploaded successfully!', 'success');
  };

  const openDocument = (doc) => {
    if (!doc) {
      showToast('No documents uploaded', 'info');
      return;
    }
    setViewingDocument(doc);
    setShowDocumentViewer(true);
  };

  // --------------------------- derived values ---------------------------
  const getTotalItemsValue = () => importData.items.reduce((sum, item) => sum + (parseFloat(item.totalValue) || 0), 0);

  const isItemDocsComplete = (item) => {
    const hasInvoice = Boolean(item.commercialInvoice?.document);
    const hasPVoC = (item.pvoc?.uploadedDocuments || []).length > 0;
    const hasCoC = (item.coc?.uploadedDocuments || []).length > 0;
    const hasFreightInvoice = isInternational ? (item.freightInvoice?.uploadedDocuments || []).length > 0 : true;
    const hasTravelDocs = !isInternational ? (item.travelDocuments?.uploadedDocuments || []).length > 0 : true;
    return hasInvoice && hasPVoC && hasCoC && hasFreightInvoice && hasTravelDocs;
  };

  const allDocsUploaded = importData.items.length > 0 && importData.items.every(isItemDocsComplete);
  const isTransportConfirmed = ['sent', 'invoice_received', 'accepted', 'completed'].includes(freightData.status);

  const transportOptions = isInternational ? FREIGHT_FORWARDERS : LOCAL_TRANSPORT_COMPANIES;
  const transportLabel = isInternational ? 'Freight Forwarder' : 'Local Transport Company';

  const goToStepByKey = (key) => {
    const idx = steps.findIndex((s) => s.key === key);
    if (idx >= 0) setCurrentStep(idx);
  };

  const goToNextStep = () => {
    if (safeStepIndex < steps.length - 1) setCurrentStep(safeStepIndex + 1);
  };

  // ------------------------- selection helpers -------------------------
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = (list) => {
    setSelectedRows((prev) => (prev.size === list.length ? new Set() : new Set(list.map((item) => item.id))));
  };

  // ----------------------- importer confirmation -----------------------
  const handleImporterConfirmation = (itemId, status, notes = '', quantity = '') => {
    setReviewItems((prev) => ({ ...prev, [itemId]: { status, notes, quantity } }));
    setImportData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, importerStatus: status, importerNotes: notes, importerQuantity: quantity } : item
      )
    }));

    const allReviewed = importData.items.every(
      (item) =>
        (item.id === itemId && status !== 'pending') ||
        (item.id !== itemId && item.importerStatus && item.importerStatus !== 'pending')
    );

    if (allReviewed) {
      setOrderStatus('confirmed');
      setIsOrderConfirmed(true);
      showToast('All items reviewed! Proceed to Sales Contract.', 'success');
    }
  };

  // --------------------------- transport step ---------------------------
  const handleSendToFreightForwarder = () => {
    if (!selectedFreightForwarder && !freightForwarderName) {
      showToast(`Please select a ${transportLabel.toLowerCase()}`, 'error');
      return;
    }
    setFreightData((prev) => ({ ...prev, status: 'sent', goodsSent: true, goodsSentAt: new Date().toISOString() }));
    saveProgress();
    showToast(
      isInternational ? 'Goods sent to freight forwarder! Awaiting their invoice.' : 'Goods sent to local transport company!',
      'success'
    );
  };

  // ------------------------------ submit ------------------------------
  const handleSubmit = () => {
    const hasValidItems = importData.items.some((item) => item.itemName && item.quantity && item.totalValue);
    if (!hasValidItems) {
      showToast('Please add at least one valid item with name, quantity, and value', 'error');
      setCurrentStep(exportMode === 'self' ? 0 : 1);
      return;
    }

    const completedData = {
      ...importData,
      status: 'complete',
      exportNumber: importData.exportNumber || `EXP-${Date.now().toString().slice(-8)}`,
      completedAt: new Date().toISOString(),
      progress: 100,
      salesContract,
      freightData,
      invoiceData,
      exportMode,
      isInternational,
      exportType: isInternational ? 'international' : 'local'
    };

    const exportsList = JSON.parse(localStorage.getItem('allExports') || '[]');
    exportsList.push(completedData);
    localStorage.setItem('allExports', JSON.stringify(exportsList));
    localStorage.removeItem('exportDraft');

    setImportData(completedData);
    setOrderStatus('finalized');
    showToast(`Export ${completedData.exportNumber} completed successfully!`, 'success');
    setTimeout(() => navigate('/my-exports'), 1500);
  };

  // ========================================================================
  // RENDERERS
  // ======================================================================

  // Compact export type switcher, shared by both modes
  const renderExportTypeSwitcher = () => (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Export Type</h4>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            setIsInternational(false);
            setCurrentStep(0);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            !isInternational ? 'text-white' : isDark ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          style={{ backgroundColor: !isInternational ? colors.primary : undefined }}
        >
          <Bus className="w-4 h-4 inline mr-2" />
          Local Export
        </button>
        <button
          onClick={() => {
            setIsInternational(true);
            setCurrentStep(0);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isInternational ? 'text-white' : isDark ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          style={{ backgroundColor: isInternational ? colors.primary : undefined }}
        >
          <Ship className="w-4 h-4 inline mr-2" />
          International Export
        </button>
      </div>
      <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {isInternational
          ? 'International exports require a Bill of Lading, a Freight Invoice and a freight forwarder.'
          : 'Local exports require a packing list, travel documents and a local transport company.'}
      </p>
    </div>
  );

  const renderModeSwitcher = (variant = 'compact') => {
    const cardBase = 'rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg';
    const cardPadding = variant === 'compact' ? 'p-4' : 'p-6';

    const modeCard = (mode, Icon, title, subtitle, bullets) => (
      <div
        className={`${cardBase} ${cardPadding} ${exportMode === mode ? '' : 'border-gray-300 dark:border-gray-600'}`}
        style={exportMode === mode ? { borderColor: colors.primary, backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg } : undefined}
        onClick={() => {
          setExportMode(mode);
          setCurrentStep(0);
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full" style={{ backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg }}>
            <Icon className="w-7 h-7" style={{ color: colors.primary }} />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
            {variant === 'full' && (
              <ul className={`mt-2 text-xs space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {exportMode === mode && (
          <div className="mt-3 text-sm font-medium" style={{ color: colors.primary }}>
            ✓ Selected
          </div>
        )}
      </div>
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modeCard('self', Briefcase, 'Self-Service Export', 'Create your own export order', [
          'Add items manually or import a sheet',
          'Create packing list',
          ...(isInternational ? ['Bill of Lading', 'Send to freight forwarder'] : ['Travel documents', 'Book local transport'])
        ])}
        {modeCard('importer', ShoppingBag, 'Importer Order', 'Load and fulfil an order from an importer', [
          'Load from importer request',
          'Review and confirm items',
          'Create sales contract',
          'Packing list'
        ])}
      </div>
    );
  };

  const renderLoadOrderModal = () =>
    showBatchLoadModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-4xl max-h-[80vh] rounded-xl shadow-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Load Order Request</h3>
            <button onClick={() => setShowBatchLoadModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {orderRequests.filter((r) => r.status === 'pending').length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>No pending orders</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orderRequests
                  .filter((r) => r.status === 'pending')
                  .map((request) => (
                    <div
                      key={request.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        loadOrderFromRequest(request);
                        setShowBatchLoadModal(false);
                        setCurrentStep(1);
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{request.importerName}</p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {request.items.length} items • {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                          {request.notes && (
                            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Notes: {request.notes}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          <button
                            className="block mt-2 px-4 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.primary }}
                          >
                            Load Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );

  // STEP 0 (importer mode): Load Order
  const renderLoadOrderStep = () => (
    <div className="space-y-6">
      {renderModeSwitcher('full')}
      {renderExportTypeSwitcher()}

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => {
            setShowBatchLoadModal(true);
            setLoadOrderMode(true);
          }}
          className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: colors.primary }}
        >
          <Layers className="w-4 h-4" />
          Load Order Request
        </button>
        <button
          onClick={() => {
            setLoadOrderMode(false);
            setImportData((prev) => ({
              ...prev,
              isLoadOrder: false,
              originalRequestId: null,
              items: prev.items.map((item) => ({
                ...item,
                isImporterOrder: false,
                importerId: '',
                importerName: '',
                importerEmail: '',
                importerStatus: 'pending',
                importerNotes: '',
                importerQuantity: ''
              }))
            }));
            showToast('Starting new importer order', 'info');
            setCurrentStep(1);
          }}
          className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
          style={{ backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg, color: colors.primary }}
        >
          <Plus className="w-4 h-4" />
          Start New Importer Order
        </button>
      </div>

      {importData.isLoadOrder && importerName && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <Info className="w-6 h-6 text-blue-500" />
          <div>
            <h4 className="font-medium text-blue-700 dark:text-blue-400">Order loaded from {importerName}</h4>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              {importData.items.length} item(s) ready for review. Continue to Items Review &amp; Confirm.
            </p>
          </div>
        </div>
      )}

      {renderLoadOrderModal()}
    </div>
  );

  // STEP 0 (self mode): Prepare Goods — setup + item table
  const renderPreparationStep = () => {
    const prepColumns = [
      { key: 'itemCode', label: 'Item Code', type: 'text', placeholder: 'e.g., ITEM-001' },
      { key: 'itemName', label: 'Item Name', type: 'text', placeholder: 'e.g., Export Product' },
      { key: 'itemGroup', label: 'Item Group', type: 'text', placeholder: 'e.g., Electronics' },
      { key: 'stockUOM', label: 'Stock UOM', type: 'text', placeholder: 'e.g., Pieces' },
      { key: 'barcode', label: 'Barcode', type: 'text', placeholder: 'e.g., 1234567890' },
      { key: 'standardSellingRate', label: 'Standard Rate (UGX)', type: 'number', placeholder: 'e.g., 1200000' },
      { key: 'quantity', label: 'Qty', type: 'number', placeholder: 'e.g., 10' },
      { key: 'unitPrice', label: 'Unit Price (UGX)', type: 'number', placeholder: 'e.g., 1200000' },
      { key: 'totalValue', label: 'Total (UGX)', type: 'number', placeholder: 'Auto-calculated', editable: false }
    ];

    const allColumns = [...prepColumns, ...customColumnDefs];
    const labelSpan = allColumns.length; // checkbox col + labels, total cell, actions cell

    const footerRow = (
      <tr>
        <td colSpan={labelSpan} className="px-3 py-2 text-right font-medium">
          Total Value:
        </td>
        <td className="px-3 py-2 text-right font-bold whitespace-nowrap">{formatCurrency(getTotalItemsValue())}</td>
      </tr>
    );

    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4">
          {renderModeSwitcher('compact')}
          {renderExportTypeSwitcher()}
        </div>

        <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg border" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          <div className="flex items-center gap-2">
            <UploadCloud className="w-4 h-4" style={{ color: colors.primary }} />
            <button
              onClick={() => pickFile((file) => importItemsFromFile(file), { accept: '.csv,.xlsx,.xls' })}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: colors.primary }}
            >
              <Upload className="w-3 h-3" />
              Import
            </button>
          </div>
          <button
            onClick={exportAllItems}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{ backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg, color: colors.primary }}
          >
            <Download className="w-3 h-3" />
            Export All
          </button>
          <div className="flex-1" />
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{importData.items.length} items</span>
        </div>

        <BulkActionBar
          isDark={isDark}
          selectedCount={selectedRows.size}
          onDelete={bulkDeleteItems}
          onDuplicate={bulkDuplicateItems}
          onExport={bulkExportItems}
          onClear={() => setSelectedRows(new Set())}
          themeColors={colors}
        />

        <OdooTable
          isDark={isDark}
          items={importData.items}
          columns={allColumns}
          onCellEdit={updateItemField}
          onRowDelete={removeItem}
          onRowAdd={addRow}
          onAddColumn={() => setShowAddColumnModal(true)}
          onRemoveColumn={removeCustomColumn}
          showCheckboxes
          footer={footerRow}
          showAddRow
          selectedRows={selectedRows}
          onRowSelect={toggleRowSelection}
          onSelectAll={() => toggleSelectAll(importData.items)}
          themeColors={colors}
        />

        {showAddColumnModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`relative w-full max-w-md rounded-xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Add Custom Column</h3>
                <button onClick={() => setShowAddColumnModal(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Column Name *</label>
                  <input
                    type="text"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="e.g., Supplier Code"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Column Type</label>
                  <select
                    value={newColumnType}
                    onChange={(e) => setNewColumnType(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                  </select>
                </div>
              </div>
              <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button onClick={() => setShowAddColumnModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                  Cancel
                </button>
                <button
                  onClick={addCustomColumn}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.primary }}
                >
                  Add Column
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // STEP 1 (self mode): Items Review
  const renderItemsReviewStep = () => {
    const filteredItems = importData.items.filter((item) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = item.itemName?.toLowerCase().includes(term) || item.itemCode?.toLowerCase().includes(term);
      const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    const reviewColumns = [
      { key: 'itemCode', label: 'Item Code', type: 'text', placeholder: 'e.g., ITEM-001' },
      { key: 'itemName', label: 'Item Name', type: 'text', placeholder: 'e.g., Export Product' },
      { key: 'itemGroup', label: 'Item Group', type: 'text', placeholder: 'e.g., Electronics' },
      { key: 'quantity', label: 'Qty', type: 'number', placeholder: 'e.g., 10' },
      { key: 'unitPrice', label: 'Unit Price (UGX)', type: 'number', placeholder: 'e.g., 1200000' },
      { key: 'totalValue', label: 'Total (UGX)', type: 'number', placeholder: 'Auto-calculated', editable: false }
    ];

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="partial">Partial</option>
          </select>
        </div>

        <BulkActionBar
          isDark={isDark}
          selectedCount={selectedRows.size}
          onDelete={bulkDeleteItems}
          onDuplicate={bulkDuplicateItems}
          onExport={bulkExportItems}
          onClear={() => setSelectedRows(new Set())}
          themeColors={colors}
        />

        <OdooTable
          isDark={isDark}
          items={filteredItems}
          columns={[...reviewColumns, ...customColumnDefs]}
          onCellEdit={updateItemField}
          onRowDelete={removeItem}
          onRowAdd={addRow}
          showCheckboxes
          showAddRow
          selectedRows={selectedRows}
          onRowSelect={toggleRowSelection}
          onSelectAll={() => toggleSelectAll(filteredItems)}
          emptyMessage="No items match your search"
          themeColors={colors}
        />

        <div className={`p-4 rounded-lg flex flex-wrap items-center justify-between gap-3 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Total value: <strong>{formatCurrency(getTotalItemsValue())}</strong>
          </span>
          <button
            onClick={() => {
              goToStepByKey('packingList');
              saveProgress();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: colors.primary }}
          >
            <Boxes className="w-4 h-4" />
            Continue to Packing List
          </button>
        </div>
      </div>
    );
  };

  // Importer mode: Items Review & Confirm
  const renderImporterReviewStep = () => {
    const filteredItems = importData.items.filter((item) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = item.itemName?.toLowerCase().includes(term) || item.itemCode?.toLowerCase().includes(term);
      const matchesFilter = filterStatus === 'all' || item.importerStatus === filterStatus;
      return matchesSearch && matchesFilter;
    });

    const reviewColumns = [
      { key: 'itemCode', label: 'Item Code', type: 'text', editable: false },
      { key: 'itemName', label: 'Item Name', type: 'text', editable: false },
      { key: 'quantity', label: 'Requested Qty', type: 'text', editable: false },
      { key: 'importerQuantity', label: 'Confirmed Qty', type: 'number', placeholder: 'e.g., 5' },
      {
        key: 'importerStatus',
        label: 'Status',
        editable: false,
        render: (item) => (
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.importerStatus || 'pending')}`}>
            {(item.importerStatus || 'pending').charAt(0).toUpperCase() + (item.importerStatus || 'pending').slice(1)}
          </span>
        )
      },
      { key: 'importerNotes', label: 'Notes', type: 'text', placeholder: 'Exporter notes...' }
    ];

    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Review &amp; Confirm Items</h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Review the importer&apos;s requested items and confirm availability.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="partial">Partial</option>
            </select>
          </div>

          <OdooTable
            isDark={isDark}
            items={filteredItems}
            columns={[...reviewColumns, ...customColumnDefs.map((c) => ({ ...c, editable: false, removable: false }))]}
            onCellEdit={updateItemField}
            showCheckboxes
            showAddRow={false}
            selectedRows={selectedRows}
            onRowSelect={toggleRowSelection}
            onSelectAll={() => toggleSelectAll(filteredItems)}
            actions={[
              {
                label: 'Mark Available',
                icon: <CheckCircle className="w-4 h-4 text-green-500" />,
                onClick: (item) => handleImporterConfirmation(item.id, 'available', item.importerNotes, item.importerQuantity || item.quantity)
              },
              {
                label: 'Mark Partial',
                icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
                onClick: (item) => handleImporterConfirmation(item.id, 'partial', item.importerNotes, item.importerQuantity)
              },
              {
                label: 'Mark Unavailable',
                icon: <X className="w-4 h-4 text-red-500" />,
                onClick: (item) => handleImporterConfirmation(item.id, 'unavailable', item.importerNotes, '0')
              },
              {
                label: 'Reset Status',
                icon: <Edit2 className="w-4 h-4 text-gray-400" />,
                onClick: (item) => handleImporterConfirmation(item.id, 'pending', item.importerNotes, item.importerQuantity)
              }
            ]}
            emptyMessage="No items to review"
            themeColors={colors}
          />

          {orderStatus === 'confirmed' && (
            <div className="mt-6 flex flex-wrap items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="flex-1 min-w-[220px]">
                <h4 className="font-semibold text-green-700 dark:text-green-400">All Items Confirmed!</h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  All items reviewed and confirmed. Proceed to Sales Contract &amp; Invoice.
                </p>
              </div>
              <button
                onClick={() => {
                  goToStepByKey('salesContract');
                  saveProgress();
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: colors.primary }}
              >
                <FileSignature className="w-4 h-4 inline mr-2" />
                Proceed to Contract
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Importer mode: Sales Contract & Invoice
  const renderSalesContractInvoiceStep = () => {
    const totalItemsValue = getTotalItemsValue();
    const taxAmount = totalItemsValue * 0.18;
    const shippingCost = totalItemsValue * 0.05;
    const totalAmount = totalItemsValue + taxAmount + shippingCost;

    const field = (label, value, onChange, { type = 'text', placeholder = '' } = {}) => (
      <div>
        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
            isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>
    );

    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <FileSignature className="w-5 h-5" style={{ color: colors.primary }} />
            Sales Contract &amp; Invoice
          </h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Create the sales contract and send the invoice to the importer.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field('Contract Number', salesContract.contractNumber, (v) => setSalesContract((p) => ({ ...p, contractNumber: v })), { placeholder: 'e.g., SC-2024-001' })}
            {field('Contract Date', salesContract.contractDate, (v) => setSalesContract((p) => ({ ...p, contractDate: v })), { type: 'date' })}
            {field('Buyer (Importer)', salesContract.buyerName || importerName, (v) => setSalesContract((p) => ({ ...p, buyerName: v })), { placeholder: 'Buyer name' })}
            {field('Seller (Exporter)', salesContract.sellerName || EXPORTER_PROFILE.companyName, (v) => setSalesContract((p) => ({ ...p, sellerName: v })), { placeholder: 'Seller name' })}
            {field('Terms of Delivery', salesContract.termsOfDelivery, (v) => setSalesContract((p) => ({ ...p, termsOfDelivery: v })), { placeholder: 'e.g., FOB, CIF, EXW' })}
            {field('Payment Terms', salesContract.paymentTerms, (v) => setSalesContract((p) => ({ ...p, paymentTerms: v })), { placeholder: 'e.g., LC, TT, DP' })}
            {field('Delivery Date', salesContract.deliveryDate, (v) => setSalesContract((p) => ({ ...p, deliveryDate: v })), { type: 'date' })}
            {field('Total Contract Value', salesContract.totalValue || formatCurrency(totalAmount), (v) => setSalesContract((p) => ({ ...p, totalValue: v })), { placeholder: 'Total value' })}
          </div>

          <div className={`mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white border border-gray-200'}`}>
              Goods value: <strong>{formatCurrency(totalItemsValue)}</strong>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white border border-gray-200'}`}>
              VAT (18%): <strong>{formatCurrency(taxAmount)}</strong>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white border border-gray-200'}`}>
              Shipping (5%): <strong>{formatCurrency(shippingCost)}</strong>
            </div>
          </div>

          <div className={`mt-4 p-4 rounded-lg border-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Upload Invoice Document</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {salesContract.invoiceDocument ? '1 document uploaded' : 'No invoice document uploaded'}
                </p>
              </div>
              {!salesContract.invoiceDocument ? (
                <button
                  onClick={() =>
                    pickFile(async (file) => {
                      const doc = await readFileAsDocument(file);
                      setSalesContract((prev) => ({ ...prev, invoiceDocument: doc }));
                      showToast('Invoice document uploaded!', 'success');
                    })
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Upload className="w-4 h-4" />
                  Upload Invoice
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded bg-green-50 dark:bg-green-900/20">
                    <FileText className="w-4 h-4 text-green-500" />
                    <span className="text-sm truncate max-w-[150px]">{salesContract.invoiceDocument.name}</span>
                  </div>
                  <button onClick={() => openDocument(salesContract.invoiceDocument)} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Eye className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    onClick={() => setSalesContract((prev) => ({ ...prev, invoiceDocument: null }))}
                    className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              if (!salesContract.contractNumber) {
                showToast('Please enter a contract number', 'error');
                return;
              }
              setOrderStatus('sent');
              showToast('Sales contract and invoice sent to importer!', 'success');
              goToStepByKey('packingList');
              saveProgress();
            }}
            className="mt-4 flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <Send className="w-4 h-4" />
            Send Contract &amp; Invoice to Importer
          </button>
        </div>
      </div>
    );
  };

  // Packing List (shared)
  const renderPackingListStep = () => {
    const packingColumns = [
      { key: 'itemCode', label: 'Item Code', editable: false },
      { key: 'itemName', label: 'Item Name', editable: false },
      { key: 'quantity', label: 'Qty', editable: false },
      { key: 'packingList.packageType', label: 'Package Type', type: 'text', placeholder: 'e.g., Box, Pallet' },
      { key: 'packingList.numberOfPackages', label: '# Packages', type: 'number', placeholder: 'e.g., 5' },
      { key: 'packingList.weight', label: 'Weight (kg)', type: 'number', placeholder: 'e.g., 50' },
      { key: 'packingList.dimensions', label: 'Dimensions', type: 'text', placeholder: 'e.g., 50x40x30 cm' },
      { key: 'packingList.handlingInstructions', label: 'Handling', type: 'text', placeholder: 'e.g., Fragile' },
      {
        key: 'packingList.uploadedDocuments',
        label: 'Document',
        editable: false,
        render: (item) => {
          const docs = item.packingList?.uploadedDocuments || [];
          return (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(docs.length ? 'uploaded' : 'pending')}`}>
              {docs.length ? `${docs.length} file(s)` : 'None'}
            </span>
          );
        }
      }
    ];

    const packedCount = importData.items.filter((item) => item.packingList?.packageType).length;

    return (
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Boxes className="w-5 h-5" style={{ color: colors.primary }} />
            Packing List
          </h3>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {packedCount} of {importData.items.length} packed
          </span>
        </div>

        <OdooTable
          isDark={isDark}
          items={importData.items}
          columns={packingColumns}
          onCellEdit={updateItemField}
          showCheckboxes={false}
          showAddRow={false}
          actions={[
            {
              label: 'Upload Packing List',
              icon: <Upload className="w-4 h-4" style={{ color: colors.primary }} />,
              onClick: (item) => pickFile((file) => handlePackingListUpload(item.id, file))
            },
            {
              label: 'View',
              icon: <Eye className="w-4 h-4 text-blue-500" />,
              onClick: (item) => openDocument((item.packingList?.uploadedDocuments || [])[0])
            }
          ]}
          themeColors={colors}
        />

        <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={() => {
              goToNextStep();
              saveProgress();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: colors.primary }}
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Bill of Lading (international only)
  const renderBillOfLadingStep = () => {
    if (!isInternational) {
      return (
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Info className="w-6 h-6 text-blue-500" />
            <div>
              <h4 className="font-medium text-blue-700 dark:text-blue-400">Local Export</h4>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                A Bill of Lading is not required for local exports. You can proceed to the next step.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const bolColumns = [
      { key: 'itemCode', label: 'Item Code', editable: false },
      { key: 'itemName', label: 'Item Name', editable: false },
      { key: 'billOfLading.billNumber', label: 'Bill Number', type: 'text', placeholder: 'e.g., BL-001' },
      { key: 'billOfLading.portOfLoading', label: 'Port of Loading', type: 'text', placeholder: 'e.g., Mombasa' },
      { key: 'billOfLading.portOfDischarge', label: 'Port of Discharge', type: 'text', placeholder: 'e.g., Rotterdam' },
      { key: 'billOfLading.vesselName', label: 'Vessel Name', type: 'text', placeholder: 'e.g., MSC Maria' },
      { key: 'billOfLading.containerNumber', label: 'Container #', type: 'text', placeholder: 'e.g., MSCU1234567' },
      { key: 'billOfLading.sealNumber', label: 'Seal #', type: 'text', placeholder: 'e.g., SEAL123' }
    ];

    return (
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Ship className="w-5 h-5" style={{ color: colors.primary }} />
            Bill of Lading
          </h3>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {importData.items.filter((i) => i.billOfLading?.billNumber).length} of {importData.items.length} completed
          </span>
        </div>

        <OdooTable
          isDark={isDark}
          items={importData.items}
          columns={bolColumns}
          onCellEdit={updateItemField}
          showCheckboxes={false}
          showAddRow={false}
          actions={[
            {
              label: 'Upload BOL',
              icon: <Upload className="w-4 h-4" style={{ color: colors.primary }} />,
              onClick: (item) => pickFile((file) => handleBillOfLadingUpload(item.id, file))
            },
            {
              label: 'View',
              icon: <Eye className="w-4 h-4 text-blue-500" />,
              onClick: (item) => openDocument((item.billOfLading?.uploadedDocuments || [])[0])
            }
          ]}
          themeColors={colors}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              goToNextStep();
              saveProgress();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: colors.primary }}
          >
            Continue to Finalise Preparation
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Finalise Preparation (shared)
  const renderFinalisePreparationStep = () => {
    const statusBadge = (label, tone) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(tone)}`}>{label}</span>
    );

    const uploadCell = (item, { hasDoc, label, uploadedLabel, onUpload, onView }) => (
      <div className="flex items-center gap-2">
        <button
          onClick={onUpload}
          className={`px-2 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity flex items-center gap-1 whitespace-nowrap ${
            hasDoc
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}
        >
          {hasDoc ? <CheckCircle className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
          {hasDoc ? uploadedLabel : label}
        </button>
        {hasDoc && (
          <button onClick={onView} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600" title="View document">
            <Eye className="w-3 h-3 text-blue-500" />
          </button>
        )}
      </div>
    );

    const finalisationColumns = [
      { key: 'itemCode', label: 'Item Code', editable: false },
      { key: 'itemName', label: 'Item Name', editable: false },
      {
        key: 'commercialInvoice',
        label: 'Commercial Invoice',
        editable: false,
        render: (item) =>
          uploadCell(item, {
            hasDoc: Boolean(item.commercialInvoice?.document),
            label: 'Upload Invoice',
            uploadedLabel: 'Uploaded',
            onUpload: () => pickFile((file) => handleCommercialInvoiceUpload(item.id, file)),
            onView: () => openDocument(item.commercialInvoice?.document)
          })
      },
      ...(isInternational
        ? [
            {
              key: 'freightInvoice',
              label: 'Freight Invoice',
              editable: false,
              render: (item) => {
                const docs = item.freightInvoice?.uploadedDocuments || [];
                return uploadCell(item, {
                  hasDoc: docs.length > 0,
                  label: 'Upload Freight Invoice',
                  uploadedLabel: `${docs.length} docs`,
                  onUpload: () => pickFile((file) => handleFreightInvoiceUpload(item.id, file)),
                  onView: () => openDocument(docs[0])
                });
              }
            }
          ]
        : [
            {
              key: 'travelDocuments',
              label: 'Travel Documents',
              editable: false,
              render: (item) => {
                const docs = item.travelDocuments?.uploadedDocuments || [];
                return uploadCell(item, {
                  hasDoc: docs.length > 0,
                  label: 'Upload Travel Docs',
                  uploadedLabel: `${docs.length} docs`,
                  onUpload: () => pickFile((files) => handleTravelDocumentsUpload(item.id, files), { multiple: true }),
                  onView: () => openDocument(docs[0])
                });
              }
            }
          ]),
      {
        key: 'pvocStatus',
        label: 'PVoC Status',
        editable: false,
        render: (item) => {
          const docs = item.pvoc?.uploadedDocuments || [];
          const status = docs.length ? item.pvoc?.status || 'uploaded' : 'pending';
          return (
            <button
              onClick={() => pickFile((file) => handlePVoCUpload(item.id, file))}
              className={`px-2 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity flex items-center gap-1 ${getStatusColor(status)}`}
            >
              {docs.length ? <CheckCircle className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {docs.length > 0 && <span className="ml-1">({docs.length})</span>}
            </button>
          );
        }
      },
      {
        key: 'cocStatus',
        label: 'CoC Status',
        editable: false,
        render: (item) => {
          const docs = item.coc?.uploadedDocuments || [];
          const status = docs.length ? item.coc?.status || 'uploaded' : 'pending';
          return (
            <button
              onClick={() => pickFile((file) => handleCoCUpload(item.id, file))}
              className={`px-2 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity flex items-center gap-1 ${getStatusColor(status)}`}
            >
              {docs.length ? <CheckCircle className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {docs.length > 0 && <span className="ml-1">({docs.length})</span>}
            </button>
          );
        }
      },
      {
        key: 'packingDoc',
        label: 'Packing List',
        editable: false,
        render: (item) => {
          const docs = item.packingList?.uploadedDocuments || [];
          return statusBadge(docs.length ? `${docs.length} file(s)` : 'Not uploaded', docs.length ? 'uploaded' : 'pending');
        }
      }
    ];

    const nextStepLabel = isInternational ? 'Send to Freight Forwarder' : 'Book Local Transport';

    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <PackageCheck className="w-5 h-5" style={{ color: colors.primary }} />
            Finalise Preparation
          </h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Upload all required documents for your export shipment.
            {isInternational
              ? ' Make sure to upload the Freight Invoice from your freight forwarder.'
              : ' Travel documents are required for local deliveries.'}
          </p>

          <div className="mb-4">
            <div
              className={`p-4 rounded-lg ${
                allDocsUploaded
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {allDocsUploaded ? <CheckCircle className="w-6 h-6 text-green-500" /> : <AlertCircle className="w-6 h-6 text-yellow-500" />}
                <div>
                  <p className={`font-medium ${allDocsUploaded ? 'text-green-700 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-400'}`}>
                    {allDocsUploaded ? 'All documents uploaded successfully!' : 'Missing required documents'}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {allDocsUploaded ? `Ready to ${nextStepLabel.toLowerCase()}.` : 'Please upload all required documents.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <OdooTable
            isDark={isDark}
            items={importData.items}
            columns={finalisationColumns}
            showCheckboxes={false}
            showAddRow={false}
            actions={[
              {
                label: 'View All Docs',
                icon: <Eye className="w-4 h-4 text-blue-500" />,
                onClick: (item) => {
                  const docs = [];
                  if (item.commercialInvoice?.document) docs.push(item.commercialInvoice.document);
                  docs.push(...(item.freightInvoice?.uploadedDocuments || []));
                  docs.push(...(item.pvoc?.uploadedDocuments || []));
                  docs.push(...(item.coc?.uploadedDocuments || []));
                  docs.push(...(item.packingList?.uploadedDocuments || []));
                  docs.push(...(item.billOfLading?.uploadedDocuments || []));
                  docs.push(...(item.travelDocuments?.uploadedDocuments || []));
                  if (!docs.length) {
                    showToast('No documents uploaded for this item', 'info');
                    return;
                  }
                  openDocument(docs[0]);
                }
              }
            ]}
            themeColors={colors}
          />

          <button
            onClick={() => {
              if (allDocsUploaded) setOrderStatus('confirmed');
              goToStepByKey('transport');
              saveProgress();
              showToast(
                allDocsUploaded ? `All documents uploaded! Proceed to ${nextStepLabel}.` : `Continuing to ${nextStepLabel}. Remember to complete missing documents.`,
                allDocsUploaded ? 'success' : 'info'
              );
            }}
            className="mt-4 flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: allDocsUploaded ? colors.success : colors.primary }}
          >
            <CheckCircle className="w-4 h-4" />
            Proceed to {nextStepLabel}
          </button>
        </div>
      </div>
    );
  };

  // Transport: Send to Freight Forwarder / Book Local Transport
  const renderTransportStep = () => {
    const TransportIcon = isInternational ? Truck : Bus;
    const stepTitle = isInternational ? 'Send to Freight Forwarder' : 'Book Local Transport Company';
    const stepDescription = isInternational
      ? 'Select a freight forwarder to send your goods and await their invoice.'
      : 'Select a local transport company to deliver your goods.';

    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <TransportIcon className="w-5 h-5" style={{ color: colors.primary }} />
            {stepTitle}
          </h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stepDescription}</p>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Select {transportLabel}</label>
              <select
                value={selectedFreightForwarder}
                onChange={(e) => {
                  setSelectedFreightForwarder(e.target.value);
                  const selected = transportOptions.find((t) => t.id === e.target.value);
                  if (selected) {
                    setFreightForwarderName(selected.name);
                    setFreightForwarderEmail(selected.email);
                    setFreightData((prev) => ({
                      ...prev,
                      freightForwarder: selected.name,
                      freightForwarderEmail: selected.email,
                      freightForwarderPhone: selected.phone
                    }));
                  }
                }}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select a {transportLabel.toLowerCase()}...</option>
                {transportOptions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} - {t.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                  OR use your own {transportLabel.toLowerCase()}
                </span>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>External {transportLabel}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={`${transportLabel} Name`}
                  value={freightForwarderName}
                  onChange={(e) => {
                    setFreightForwarderName(e.target.value);
                    setFreightData((prev) => ({ ...prev, freightForwarder: e.target.value }));
                  }}
                  className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                    isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <input
                  type="email"
                  placeholder={`${transportLabel} Email`}
                  value={freightForwarderEmail}
                  onChange={(e) => {
                    setFreightForwarderEmail(e.target.value);
                    setFreightData((prev) => ({ ...prev, freightForwarderEmail: e.target.value }));
                  }}
                  className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                    isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            {!isInternational ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Pickup Date</label>
                  <input
                    type="date"
                    value={freightData.shippingDate}
                    onChange={(e) => setFreightData((prev) => ({ ...prev, shippingDate: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                      isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Delivery Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Kampala, Uganda"
                    value={freightData.portOfDischarge || ''}
                    onChange={(e) => setFreightData((prev) => ({ ...prev, portOfDischarge: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                      isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Port of Loading</label>
                  <input
                    type="text"
                    placeholder="e.g., Mombasa"
                    value={freightData.portOfLoading}
                    onChange={(e) => setFreightData((prev) => ({ ...prev, portOfLoading: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                      isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Expected Arrival</label>
                  <input
                    type="date"
                    value={freightData.expectedArrival}
                    onChange={(e) => setFreightData((prev) => ({ ...prev, expectedArrival: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 ${
                      isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleSendToFreightForwarder}
              disabled={!selectedFreightForwarder && !freightForwarderName}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: colors.primary }}
            >
              <Send className="w-4 h-4" />
              {isInternational ? 'Send Goods to Freight Forwarder' : 'Book Local Transport'}
            </button>
          </div>
        </div>

        {freightData.status !== 'pending' && (
          <div
            className={`p-6 rounded-lg border-2 ${
              freightData.status === 'sent' || freightData.status === 'invoice_received'
                ? isDark
                  ? 'border-blue-700 bg-blue-900/20'
                  : 'border-blue-500 bg-blue-50'
                : freightData.status === 'accepted'
                ? isDark
                  ? 'border-green-700 bg-green-900/20'
                  : 'border-green-500 bg-green-50'
                : freightData.status === 'rejected'
                ? isDark
                  ? 'border-red-700 bg-red-900/20'
                  : 'border-red-500 bg-red-50'
                : isDark
                ? 'border-yellow-700 bg-yellow-900/20'
                : 'border-yellow-500 bg-yellow-50'
            }`}
          >
            <div className="flex flex-wrap items-center gap-3">
              {(freightData.status === 'sent' || freightData.status === 'invoice_received') && <Clock className="w-8 h-8 text-blue-500" />}
              {freightData.status === 'accepted' && <CheckCircle className="w-8 h-8 text-green-500" />}
              {freightData.status === 'rejected' && <X className="w-8 h-8 text-red-500" />}
              <div className="flex-1 min-w-[220px]">
                <h4
                  className={`font-semibold ${
                    freightData.status === 'sent' || freightData.status === 'invoice_received'
                      ? 'text-blue-700 dark:text-blue-400'
                      : freightData.status === 'accepted'
                      ? 'text-green-700 dark:text-green-400'
                      : freightData.status === 'rejected'
                      ? 'text-red-700 dark:text-red-400'
                      : 'text-yellow-700 dark:text-yellow-400'
                  }`}
                >
                  {freightData.status === 'sent'
                    ? isInternational
                      ? 'Goods Sent - Awaiting Freight Invoice'
                      : 'Transport Booked - Awaiting Pickup'
                    : freightData.status === 'invoice_received'
                    ? 'Freight Invoice Received'
                    : freightData.status.charAt(0).toUpperCase() + freightData.status.slice(1)}
                </h4>
                {freightData.freightForwarder && (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {transportLabel}: {freightData.freightForwarder}
                    {freightData.freightForwarderEmail ? ` (${freightData.freightForwarderEmail})` : ''}
                  </p>
                )}
                {freightData.goodsSentAt && (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sent on: {new Date(freightData.goodsSentAt).toLocaleString()}
                  </p>
                )}
                {freightResponse && (
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Response: {freightResponse.notes || 'No additional notes'}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  goToStepByKey('orderFinalisation');
                  saveProgress();
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: colors.primary }}
              >
                Continue to Order Finalisation
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Order Finalisation (shared)
  const renderOrderFinalisationStep = () => {
    const ready = allDocsUploaded && isTransportConfirmed;

    const summaryRow = (label, value, ok) => (
      <div className={`flex items-center justify-between gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white border border-gray-200'}`}>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
        <span className={`text-sm font-medium flex items-center gap-1 ${ok ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
          {ok ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {value}
        </span>
      </div>
    );

    return (
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <CheckCircle className="w-5 h-5" style={{ color: colors.primary }} />
          Order Finalisation
        </h3>

        <div
          className={`p-4 rounded-lg mb-4 ${
            ready
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
          }`}
        >
          <div className="flex items-center gap-3">
            {ready ? <CheckCircle className="w-6 h-6 text-green-500" /> : <AlertCircle className="w-6 h-6 text-yellow-500" />}
            <div>
              <p className={`font-medium ${ready ? 'text-green-700 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-400'}`}>
                {ready ? 'Ready to finalize!' : 'Complete all steps before finalizing'}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {ready
                  ? 'All documents uploaded and transport confirmed. Finalize your export order.'
                  : 'Please complete all previous steps and ensure transport has been arranged.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {summaryRow('Items', `${importData.items.length} item(s) • ${formatCurrency(getTotalItemsValue())}`, importData.items.length > 0)}
          {summaryRow('Export type', isInternational ? 'International' : 'Local', true)}
          {summaryRow('Required documents', allDocsUploaded ? 'Complete' : 'Missing documents', allDocsUploaded)}
          {summaryRow(
            isInternational ? 'Freight forwarder' : 'Local transport',
            isTransportConfirmed ? freightData.freightForwarder || 'Booked' : 'Not arranged',
            isTransportConfirmed
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!ready}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
          style={{ backgroundColor: ready ? colors.success : colors.primary }}
        >
          <CheckCircle className="w-4 h-4" />
          Complete Export
        </button>
      </div>
    );
  };

  // --------------------- step content dispatcher ---------------------
  const renderStepContent = () => {
    switch (activeStep?.key) {
      case 'prepareGoods':
        return renderPreparationStep();
      case 'itemsReview':
        return renderItemsReviewStep();
      case 'loadOrder':
        return renderLoadOrderStep();
      case 'importerReview':
        return renderImporterReviewStep();
      case 'salesContract':
        return renderSalesContractInvoiceStep();
      case 'packingList':
        return renderPackingListStep();
      case 'billOfLading':
        return renderBillOfLadingStep();
      case 'finalisePreparation':
        return renderFinalisePreparationStep();
      case 'transport':
        return renderTransportStep();
      case 'orderFinalisation':
        return renderOrderFinalisationStep();
      default:
        return renderPreparationStep();
    }
  };

  // ------------------------- navigation handlers -------------------------
  const handleNext = () => {
    if (safeStepIndex < steps.length - 1) {
      setCurrentStep(safeStepIndex + 1);
      saveProgress();
    }
  };

  const handlePrevious = () => {
    if (safeStepIndex > 0) setCurrentStep(safeStepIndex - 1);
  };

  // ProgressBar colours are generated from the real number of steps so the bar
  // never runs out of colours when the step count changes with the mode.
  const stepPalette = ['#714b67', '#8b5cf6', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#0ea5e9', '#14b8a6'];
  const stepColors = steps.map((_, i) => stepPalette[i % stepPalette.length]);

  const modeBadge =
    exportMode === 'importer'
      ? { label: 'Importer Order', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' }
      : { label: 'Self-Service', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };

  const typeBadge = isInternational
    ? { label: 'International', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' }
    : { label: 'Local', className: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' };

  // ------------------------------ main view ------------------------------
  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} themeColors={colors} />}

      {showDocumentViewer && viewingDocument && (
        <DocumentViewerPage
          isDark={isDark}
          doc={viewingDocument}
          onClose={() => {
            setShowDocumentViewer(false);
            setViewingDocument(null);
          }}
          themeColors={colors}
        />
      )}

      {renderLoadOrderModal()}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/exporter-dashboard')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Order Preperation</h1>
            <p className={`text-sm flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>
                {importData.items.length} item(s) • {importData.exportNumber || 'Draft'} • Status: {getOrderStatusDisplay(orderStatus)}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${modeBadge.className}`}>{modeBadge.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeBadge.className}`}>{typeBadge.label}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={saveProgress}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50"
              style={{ backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg, color: colors.primary }}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Progress
                </>
              )}
            </button>
            {savedSuccess && <span className="text-sm text-green-500">✓ Saved!</span>}
          </div>
        </div>

        <div className="mb-8">
          <ProgressBar
            steps={steps}
            currentStep={safeStepIndex}
            onStepClick={(step) => {
              setCurrentStep(Math.min(Math.max(step, 0), steps.length - 1));
              saveProgress();
            }}
            stepColors={stepColors}
            theme={isDark ? 'dark' : 'light'}
            size="sm"
            showLabels
            clickable
          />
        </div>

        <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          {/* Title / description come from the SAME step object the dispatcher uses,
              so the header can never describe a different step than the body. */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeStep?.icon && React.createElement(activeStep.icon, { className: 'w-5 h-5', style: { color: colors.primary } })}
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeStep?.title}</h2>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Step {safeStepIndex + 1} of {steps.length}
            </span>
          </div>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{activeStep?.description}</p>

          {renderStepContent()}

          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-6 border-t"
            style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}
          >
            <button
              onClick={handlePrevious}
              disabled={safeStepIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                safeStepIndex === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={saveProgress}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>

              {safeStepIndex === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Complete Export
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExport;