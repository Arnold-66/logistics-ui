// NewImport.jsx - Complete workflow with Odoo-style tables (FIXED with bulk actions)
import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Package,
  ClipboardList,
  Send,
  FileCheck,
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
  Mail,
  Edit2,
  MoreVertical,
  Search,
  Filter,
  DownloadCloud,
  UploadCloud,
  AlertTriangle,
  PackageCheck,
  Shield,
  ChevronDown,
  ChevronUp,
  Copy,
  Printer,
  ExternalLink,
  Users,
  UserCheck,
  UserX,
  Calendar,
  DollarSign,
  Truck,
  Check,
  Minus,
  Copy as CopyIcon,
  FileText
} from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

// Mock user profile data
const USER_PROFILE = {
  id: 'USR-001',
  companyName: 'Uganda Importers Ltd',
  businessAddress: 'Plot 25, Kampala Road, Kampala, Uganda',
  contactPerson: 'John Doe',
  contactEmail: 'john@ugandaimporters.com',
  contactPhone: '+256 700 123 456',
  registrationNumber: 'REG-2024-001',
  tinNumber: 'TIN-123456789',
};

// Mock suppliers data
const SYSTEM_SUPPLIERS = [
  { id: 'SUP-001', name: 'TechGlobal Supplies Ltd', email: 'info@techglobal.com', phone: '+256 701 234 567' },
  { id: 'SUP-002', name: 'East African Traders', email: 'sales@eatraders.com', phone: '+256 702 345 678' },
  { id: 'SUP-003', name: 'Kampala Distributors Ltd', email: 'info@kampaladist.com', phone: '+256 703 456 789' },
];

// Helper function to ensure item has all required properties
const ensureItemStructure = (item) => {
  return {
    ...item,
    pvoc: {
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      status: 'pending',
      uploadedDocuments: [],
      ...item.pvoc,
      uploadedDocuments: item.pvoc?.uploadedDocuments || []
    },
    coc: {
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      status: 'pending',
      uploadedDocuments: [],
      ...item.coc,
      uploadedDocuments: item.coc?.uploadedDocuments || []
    }
  };
};

const NewImport = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [toast, setToast] = useState(null);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [orderStatus, setOrderStatus] = useState('draft');
  const [reviewItems, setReviewItems] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPVoCModal, setShowPVoCModal] = useState(false);
  const [showCoCModal, setShowCoCModal] = useState(false);
  const [activePVoCItem, setActivePVoCItem] = useState(null);
  const [activeCoCItem, setActiveCoCItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingCell, setEditingCell] = useState(null);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState('text');
  const [customColumns, setCustomColumns] = useState([]);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [addingRow, setAddingRow] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    supplierInvoiceNumber: '',
    totalAmount: '',
    taxAmount: '',
    shippingCost: '',
    notes: '',
    uploadedDocuments: [],
    paymentStatus: 'pending', // pending, paid, partially_paid
    payments: []
  });

  const [importData, setImportData] = useState({
    importerDetails: { ...USER_PROFILE },
    items: [
      ensureItemStructure({
        id: Date.now(),
        itemCode: 'ITEM-001',
        itemName: 'Laptop Computer',
        itemGroup: 'Electronics',
        stockUOM: 'Pieces',
        barcode: '1234567890',
        standardSellingRate: '1200000',
        quantity: 10,
        unitPrice: '1200000',
        totalValue: '12000000',
        status: 'pending',
        supplierStatus: 'pending',
        supplierNotes: '',
        supplierQuantity: '',
        customFields: {}
      })
    ],
    importNumber: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    progress: 0,
  });



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
    border: '#e2e8f0',
    hover: '#f7fafc',
  };

  const isDark = darkMode;

  // Define steps
  const steps = [
    {
      id: 0,
      title: 'Preparation of Goods',
      icon: Package,
      description: 'Add items manually or import from CSV/Excel',
      required: true,
    },
    {
      id: 1,
      title: 'Items Review',
      icon: ClipboardList,
      description: 'Review and manage your items list',
      required: true,
    },
    {
      id: 2,
      title: 'Send to Supplier',
      icon: Send,
      description: 'Send item list to supplier for confirmation',
      required: true,
    },
    {
      id: 3,
      title: 'Supplier Confirmation',
      icon: FileCheck,
      description: 'Review supplier confirmation and availability',
      required: true,
    },
    {
      id: 4,
      title: 'Invoice & Payment',
      icon: DollarSign,
      description: 'Review supplier invoice and make payment',
      required: true,
    },
    {
      id: 5,
      title: 'Order Finalisation',
      icon: FileSignature,
      description: 'Request and attach UNBS documents',
      required: true,
    }
  ];


  // Auto-save effect
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      autoSave();
    }, 3000);

    return () => clearTimeout(saveTimeout);
  }, [importData, orderStatus, reviewItems, selectedSupplier, supplierEmail, supplierName, customColumns]);

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem('importDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const fixedItems = (parsed.items || []).map(item => ensureItemStructure(item));
        setImportData({
          ...parsed,
          items: fixedItems
        });
        if (parsed.orderStatus) setOrderStatus(parsed.orderStatus);
        if (parsed.reviewItems) setReviewItems(parsed.reviewItems);
        if (parsed.selectedSupplier) setSelectedSupplier(parsed.selectedSupplier);
        if (parsed.supplierEmail) setSupplierEmail(parsed.supplierEmail);
        if (parsed.supplierName) setSupplierName(parsed.supplierName);
        if (parsed.customColumns) setCustomColumns(parsed.customColumns);
        // Expand all items
        const allIds = new Set(fixedItems.map(item => item.id));
        setExpandedItems(allIds);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  const autoSave = () => {
    const dataToSave = {
      ...importData,
      orderStatus,
      reviewItems,
      selectedSupplier,
      supplierEmail,
      supplierName,
      customColumns,
      updatedAt: new Date().toISOString(),
      currentStep
    };
    localStorage.setItem('importDraft', JSON.stringify(dataToSave));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveProgress = () => {
    setIsSaving(true);
    setTimeout(() => {
      const dataToSave = {
        ...importData,
        orderStatus,
        reviewItems,
        selectedSupplier,
        supplierEmail,
        supplierName,
        customColumns,
        updatedAt: new Date().toISOString(),
        currentStep
      };
      localStorage.setItem('importDraft', JSON.stringify(dataToSave));
      
      const importsList = JSON.parse(localStorage.getItem('allImports') || '[]');
      const existingIndex = importsList.findIndex(imp => imp.importNumber === dataToSave.importNumber);
      if (existingIndex >= 0) {
        importsList[existingIndex] = dataToSave;
      } else if (dataToSave.importNumber) {
        importsList.push(dataToSave);
      }
      localStorage.setItem('allImports', JSON.stringify(importsList));
      
      setIsSaving(false);
      setSavedSuccess(true);
      showToast('Progress saved successfully!', 'success');
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 500);
  };

  const calculateProgress = () => {
    let progress = 0;
    if (importData.items.length > 0) progress += 16;
    if (orderStatus !== 'draft') progress += 16;
    if (orderStatus === 'sent' || orderStatus === 'review') progress += 16;
    if (orderStatus === 'confirmed') progress += 16;
    if (invoiceData.paymentStatus === 'paid') progress += 16;
    if (orderStatus === 'finalized') progress += 20;
    return progress;
  };

  useEffect(() => {
    const progress = calculateProgress();
    setImportData(prev => ({ ...prev, progress }));
  }, [importData.items, orderStatus]);

  // Handle invoice upload
  const handleInvoiceUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newDocument = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        data: reader.result,
      };

      setInvoiceData(prev => ({
        ...prev,
        uploadedDocuments: [...(prev.uploadedDocuments || []), newDocument]
      }));
      showToast(`Invoice document uploaded successfully!`, 'success');
    };
    reader.readAsDataURL(file);
  };

  const removeInvoiceDocument = (docId) => {
    setInvoiceData(prev => ({
      ...prev,
      uploadedDocuments: (prev.uploadedDocuments || []).filter(doc => doc.id !== docId)
    }));
    showToast('Document removed', 'info');
  };

  // Handle payment recording
  const addPayment = () => {
    setInvoiceData(prev => ({
      ...prev,
      payments: [
        ...(prev.payments || []),
        {
          id: Date.now(),
          paymentDate: new Date().toISOString().split('T')[0],
          amount: '',
          method: 'bank_transfer',
          reference: '',
          notes: ''
        }
      ]
    }));
  };

  const updatePayment = (index, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      payments: (prev.payments || []).map((payment, i) =>
        i === index ? { ...payment, [field]: value } : payment
      )
    }));
  };

  const removePayment = (index) => {
    setInvoiceData(prev => ({
      ...prev,
      payments: (prev.payments || []).filter((_, i) => i !== index)
    }));
  };

  // Mark invoice as paid
  const markAsPaid = () => {
    if ((invoiceData.payments || []).length === 0) {
      showToast('Please add payment details first', 'error');
      return;
    }
    setInvoiceData(prev => ({ ...prev, paymentStatus: 'paid' }));
    setOrderStatus('confirmed');
    showToast('Invoice marked as paid!', 'success');
  };


  // Add a new empty row directly
  const addRow = () => {
    const newItem = ensureItemStructure({
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
      status: 'pending',
      supplierStatus: 'pending',
      supplierNotes: '',
      supplierQuantity: '',
      customFields: {}
    });
    
    setImportData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
    setExpandedItems(prev => new Set(prev).add(newItem.id));
    showToast('New row added! Fill in the details.', 'success');
  };

  const removeItem = (itemId) => {
    if (importData.items.length <= 1) {
      showToast('You need at least one item', 'error');
      return;
    }
    setImportData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
    showToast('Item removed', 'info');
  };

  // Bulk delete items
  const bulkDeleteItems = () => {
    if (selectedRows.size === 0) {
      showToast('No items selected', 'error');
      return;
    }
    if (importData.items.length - selectedRows.size < 1) {
      showToast('Cannot delete all items. Keep at least one item.', 'error');
      return;
    }
    
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedRows.size} selected item(s)?`);
    if (confirmDelete) {
      setImportData(prev => ({
        ...prev,
        items: prev.items.filter(item => !selectedRows.has(item.id))
      }));
      setSelectedRows(new Set());
      showToast(`${selectedRows.size} item(s) deleted successfully!`, 'success');
    }
  };

  // Bulk duplicate items
  const bulkDuplicateItems = () => {
    if (selectedRows.size === 0) {
      showToast('No items selected', 'error');
      return;
    }
    
    const itemsToDuplicate = importData.items.filter(item => selectedRows.has(item.id));
    const duplicatedItems = itemsToDuplicate.map(item => {
      const newId = Date.now() + Math.random();
      return ensureItemStructure({
        ...item,
        id: newId,
        itemCode: `${item.itemCode}-COPY`,
        customFields: { ...item.customFields }
      });
    });
    
    setImportData(prev => ({
      ...prev,
      items: [...prev.items, ...duplicatedItems]
    }));
    setSelectedRows(new Set());
    showToast(`${duplicatedItems.length} item(s) duplicated successfully!`, 'success');
  };

  // Bulk export selected items
  const bulkExportItems = () => {
    if (selectedRows.size === 0) {
      showToast('No items selected', 'error');
      return;
    }
    
    const itemsToExport = importData.items.filter(item => selectedRows.has(item.id));
    const exportData = itemsToExport.map(item => ({
      'Item Code': item.itemCode,
      'Item Name': item.itemName,
      'Item Group': item.itemGroup,
      'Stock UOM': item.stockUOM,
      'Barcode': item.barcode,
      'Standard Selling Rate': item.standardSellingRate,
      'Quantity': item.quantity,
      'Unit Price': item.unitPrice,
      'Total Value': item.totalValue,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Items');
    XLSX.writeFile(wb, `Selected_Items_${new Date().toISOString().split('T')[0]}.xlsx`);
    setSelectedRows(new Set());
    showToast(`${itemsToExport.length} item(s) exported successfully!`, 'success');
  };

  const updateItemField = (itemId, field, value) => {
    setImportData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateCustomField = (itemId, field, value) => {
    setImportData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? {
          ...item,
          customFields: { ...item.customFields, [field]: value }
        } : item
      )
    }));
  };

  const addCustomColumn = () => {
    if (!newColumnName.trim()) {
      showToast('Please enter a column name', 'error');
      return;
    }
    const columnKey = `custom_${newColumnName.toLowerCase().replace(/\s+/g, '_')}`;
    setCustomColumns([...customColumns, { 
      key: columnKey, 
      name: newColumnName, 
      type: newColumnType 
    }]);
    // Add the field to all existing items
    setImportData(prev => ({
      ...prev,
      items: prev.items.map(item => ({
        ...item,
        customFields: { ...item.customFields, [columnKey]: '' }
      }))
    }));
    setNewColumnName('');
    setNewColumnType('text');
    setShowAddColumnModal(false);
    showToast('Column added successfully!', 'success');
  };

  const removeCustomColumn = (columnKey) => {
    setCustomColumns(customColumns.filter(col => col.key !== columnKey));
    setImportData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        const { [columnKey]: removed, ...rest } = item.customFields;
        return { ...item, customFields: rest };
      })
    }));
    showToast('Column removed', 'info');
  };

  const updatePVoCField = (itemId, field, value) => {
    setImportData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? {
          ...item,
          pvoc: { 
            ...item.pvoc, 
            uploadedDocuments: item.pvoc?.uploadedDocuments || [],
            [field]: value 
          }
        } : item
      )
    }));
  };

  const updateCoCField = (itemId, field, value) => {
    setImportData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? {
          ...item,
          coc: { 
            ...item.coc, 
            uploadedDocuments: item.coc?.uploadedDocuments || [],
            [field]: value 
          }
        } : item
      )
    }));
  };

  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        const newItems = jsonData.map((row, index) => ensureItemStructure({
          id: Date.now() + index,
          itemCode: row['Item Code'] || row['itemCode'] || `ITEM-${String(index + 1).padStart(3, '0')}`,
          itemName: row['Item Name'] || row['itemName'] || '',
          itemGroup: row['Item Group'] || row['itemGroup'] || '',
          stockUOM: row['Stock UOM'] || row['stockUOM'] || '',
          barcode: row['Barcode'] || row['barcode'] || '',
          standardSellingRate: row['Standard Selling Rate'] || row['standardSellingRate'] || '',
          quantity: row['Quantity'] || row['quantity'] || '',
          unitPrice: row['Unit Price'] || row['unitPrice'] || '',
          totalValue: row['Total Value'] || row['totalValue'] || '',
          status: 'pending',
          supplierStatus: 'pending',
          supplierNotes: '',
          supplierQuantity: '',
          customFields: {}
        }));

        // Detect custom columns from imported data
        const allKeys = Object.keys(jsonData[0] || {});
        const standardKeys = ['Item Code', 'itemCode', 'Item Name', 'itemName', 'Item Group', 'itemGroup', 'Stock UOM', 'stockUOM', 'Barcode', 'barcode', 'Standard Selling Rate', 'standardSellingRate', 'Quantity', 'quantity', 'Unit Price', 'unitPrice', 'Total Value', 'totalValue'];
        const customKeys = allKeys.filter(key => !standardKeys.includes(key));
        
        const newCustomColumns = customKeys.map(key => ({
          key: `custom_${key.toLowerCase().replace(/\s+/g, '_')}`,
          name: key,
          type: 'text'
        }));
        
        setCustomColumns([...customColumns, ...newCustomColumns]);

        setImportData(prev => ({
          ...prev,
          items: [...prev.items, ...newItems]
        }));
        setUploadingFile(false);
        showToast(`Successfully imported ${newItems.length} items!`, 'success');
      } catch (error) {
        setUploadingFile(false);
        showToast('Error importing file. Please check the format.', 'error');
        console.error('Import error:', error);
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = '';
  };

  const handleExport = () => {
    const standardHeaders = {
      'Item Code': 'itemCode',
      'Item Name': 'itemName',
      'Item Group': 'itemGroup',
      'Stock UOM': 'stockUOM',
      'Barcode': 'barcode',
      'Standard Selling Rate': 'standardSellingRate',
      'Quantity': 'quantity',
      'Unit Price': 'unitPrice',
      'Total Value': 'totalValue',
    };

    const customHeaders = customColumns.reduce((acc, col) => {
      acc[col.name] = col.key;
      return acc;
    }, {});

    const allHeaders = { ...standardHeaders, ...customHeaders };

    const exportData = importData.items.map(item => {
      const row = {};
      Object.entries(allHeaders).forEach(([displayName, field]) => {
        if (field.startsWith('custom_')) {
          row[displayName] = item.customFields?.[field] || '';
        } else {
          row[displayName] = item[field] || '';
        }
      });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Items');
    XLSX.writeFile(wb, `Import_Items_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('Items exported successfully!', 'success');
  };

  const handleSendToSupplier = () => {
    if (!selectedSupplier && !supplierEmail) {
      showToast('Please select a supplier or enter email', 'error');
      return;
    }

    setOrderStatus('sent');
    saveProgress();
    showToast('Item list sent to supplier successfully!', 'success');
  };

  const handleSupplierConfirmation = (itemId, status, notes = '', quantity = '') => {
    setReviewItems(prev => ({
      ...prev,
      [itemId]: { status, notes, quantity }
    }));

    setImportData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, supplierStatus: status, supplierNotes: notes, supplierQuantity: quantity } : item
      )
    }));

    // Check if all items are reviewed
    const allItems = importData.items;
    const allReviewed = allItems.every(item => 
      (reviewItems[item.id] && reviewItems[item.id].status !== 'pending') || 
      (item.id === itemId && status !== 'pending')
    );

    if (allReviewed) {
      setOrderStatus('confirmed');
      showToast('All items reviewed by supplier!', 'success');
    }
  };

  const handleConfirmOrder = () => {
    setShowConfirmModal(true);
  };

  const finalizeOrder = () => {
    setOrderStatus('finalized');
    setShowConfirmModal(false);
    const importNumber = `IMP-${Date.now().toString().slice(-8)}`;
    setImportData(prev => ({ ...prev, importNumber }));
    showToast(`Order ${importNumber} finalized successfully!`, 'success');
  };

  const handlePVoCUpload = (itemId, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newDocument = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        data: reader.result,
      };

      setImportData(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.id === itemId ? {
            ...item,
            pvoc: {
              ...item.pvoc,
              uploadedDocuments: [...(item.pvoc?.uploadedDocuments || []), newDocument]
            }
          } : item
        )
      }));
      showToast(`PVoC document uploaded successfully!`, 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleCoCUpload = (itemId, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newDocument = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        data: reader.result,
      };

      setImportData(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.id === itemId ? {
            ...item,
            coc: {
              ...item.coc,
              uploadedDocuments: [...(item.coc?.uploadedDocuments || []), newDocument]
            }
          } : item
        )
      }));
      showToast(`CoC document uploaded successfully!`, 'success');
    };
    reader.readAsDataURL(file);
  };

  const removeDocument = (itemId, docType, docId) => {
    setImportData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? {
          ...item,
          [docType]: {
            ...item[docType],
            uploadedDocuments: (item[docType]?.uploadedDocuments || []).filter(doc => doc.id !== docId)
          }
        } : item
      )
    }));
    showToast('Document removed', 'info');
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'UGX 0';
    return `UGX ${Number(amount).toLocaleString()}`;
  };

  const getTotalItemsValue = () => {
    return importData.items.reduce((sum, item) => sum + (parseFloat(item.totalValue) || 0), 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'available': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'unavailable': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'partial': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'confirmed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getOrderStatusDisplay = (status) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'sent': return 'Sent to Supplier';
      case 'review': return 'Under Review';
      case 'confirmed': return 'Confirmed';
      case 'finalized': return 'Finalized';
      default: return 'Unknown';
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
    if (fileType?.includes('image')) return <Image className="w-4 h-4 text-blue-500" />;
    if (fileType?.includes('spreadsheet') || fileType?.includes('excel')) return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
    if (fileType?.includes('zip') || fileType?.includes('rar')) return <FileArchive className="w-4 h-4 text-orange-500" />;
    return <File className="w-4 h-4 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const Toast = ({ message, type }) => {
    if (!message) return null;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                  type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
                  <Info className="w-5 h-5" />;

    return (
      <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white ${bgColor}`}>
        {icon}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Render Invoice & Payment Step
  const renderInvoicePaymentStep = () => {
    const totalItemsValue = getTotalItemsValue();
    const taxAmount = totalItemsValue * 0.18; // 18% VAT
    const shippingCost = totalItemsValue * 0.05; // 5% shipping
    const totalAmount = totalItemsValue + taxAmount + shippingCost;

    return (
      <div className="space-y-6">
        {/* Invoice Summary */}
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Invoice Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Subtotal</p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(totalItemsValue)}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tax (18%)</p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(taxAmount)}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Shipping</p>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(shippingCost)}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-white'}`} style={{ borderLeft: `4px solid ${colors.primary}` }}>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Amount</p>
              <p className={`text-lg font-bold`} style={{ color: colors.primary }}>
                {formatCurrency(totalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Invoice Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Invoice Number
              </label>
              <input
                type="text"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
                placeholder="e.g., INV-2024-001"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Supplier Invoice Number
              </label>
              <input
                type="text"
                value={invoiceData.supplierInvoiceNumber}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, supplierInvoiceNumber: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
                placeholder="Supplier's invoice number"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Invoice Date
              </label>
              <input
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Due Date
              </label>
              <input
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Notes
            </label>
            <textarea
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
              rows="3"
              className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
              placeholder="Additional notes..."
            />
          </div>

          {/* Invoice Document Upload */}
          <div className={`mt-4 p-4 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Upload Invoice Document
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {(invoiceData.uploadedDocuments || []).length} document(s)
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                className="hidden"
                id="invoiceUpload"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleInvoiceUpload(file);
                  }
                  e.target.value = '';
                }}
              />
              <button
                onClick={() => document.getElementById('invoiceUpload').click()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: colors.primary }}
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
            {(invoiceData.uploadedDocuments || []).map((doc) => (
              <div key={doc.id} className={`mt-2 p-2 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-50'} flex items-center justify-between`}>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {getFileIcon(doc.type)}
                  <span className="text-sm truncate">{doc.name}</span>
                  <span className="text-xs text-gray-500 flex-shrink-0">{formatFileSize(doc.size)}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => {
                      setViewingDocument(doc);
                      setShowDocumentViewer(true);
                    }}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Eye className="w-3 h-3 text-blue-500" />
                  </button>
                  <button
                    onClick={() => removeInvoiceDocument(doc.id)}
                    className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Payment Details
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              invoiceData.paymentStatus === 'paid' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : invoiceData.paymentStatus === 'partially_paid'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
            }`}>
              {invoiceData.paymentStatus.charAt(0).toUpperCase() + invoiceData.paymentStatus.slice(1)}
            </span>
          </div>

          <button
            onClick={addPayment}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md mb-4"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus className="w-4 h-4" />
            Add Payment
          </button>

          {(invoiceData.payments || []).map((payment, index) => (
            <div key={payment.id} className={`p-4 rounded-lg mb-3 ${isDark ? 'bg-gray-600' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Payment #{index + 1}
                </span>
                <button
                  onClick={() => removePayment(index)}
                  className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={payment.paymentDate}
                    onChange={(e) => updatePayment(index, 'paymentDate', e.target.value)}
                    className={`w-full px-3 py-1.5 rounded border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Amount (UGX)
                  </label>
                  <input
                    type="number"
                    value={payment.amount}
                    onChange={(e) => updatePayment(index, 'amount', e.target.value)}
                    className={`w-full px-3 py-1.5 rounded border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Payment Method
                  </label>
                  <select
                    value={payment.method}
                    onChange={(e) => updatePayment(index, 'method', e.target.value)}
                    className={`w-full px-3 py-1.5 rounded border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="wire_transfer">Wire Transfer</option>
                    <option value="letter_of_credit">Letter of Credit</option>
                    <option value="cash">Cash</option>
                    <option value="mobile_money">Mobile Money</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Reference Number
                  </label>
                  <input
                    type="text"
                    value={payment.reference}
                    onChange={(e) => updatePayment(index, 'reference', e.target.value)}
                    className={`w-full px-3 py-1.5 rounded border text-sm focus:outline-none focus:ring-2 ${
                      isDark ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                    placeholder="Reference number"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Notes
                </label>
                <input
                  type="text"
                  value={payment.notes || ''}
                  onChange={(e) => updatePayment(index, 'notes', e.target.value)}
                  className={`w-full px-3 py-1.5 rounded border text-sm focus:outline-none focus:ring-2 ${
                    isDark ? 'bg-gray-500 border-gray-400 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                  placeholder="Payment notes..."
                />
              </div>
            </div>
          ))}

          {(invoiceData.payments || []).length > 0 && invoiceData.paymentStatus !== 'paid' && (
            <button
              onClick={markAsPaid}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg mt-4"
              style={{ backgroundColor: colors.success }}
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Paid
            </button>
          )}
        </div>
      </div>
    );
  };

  // Full page document viewer
  const DocumentViewerPage = ({ doc, onClose }) => {
    if (!doc) return null;

    return (
      <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center gap-3 min-w-0">
            {getFileIcon(doc.type)}
            <div className="min-w-0">
              <h3 className={`text-lg font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {doc.name}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadDate).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = doc.data;
                link.download = doc.name;
                link.click();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: colors.primary }}
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Document Content */}
        <div className="flex-1 p-6 overflow-auto">
          {doc.type?.startsWith('image/') ? (
            <img src={doc.data} alt={doc.name} className="max-w-full max-h-full object-contain mx-auto" />
          ) : doc.type === 'application/pdf' ? (
            <iframe 
              src={doc.data} 
              className="w-full h-full min-h-[600px] rounded-lg border"
              title={doc.name}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <File className="w-24 h-24 mx-auto mb-4 text-gray-400" />
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Preview not available for this file type
              </p>
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = doc.data;
                  link.download = doc.name;
                  link.click();
                }}
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

  // Bulk Action Bar Component
  const BulkActionBar = ({ selectedCount, onDelete, onDuplicate, onExport, onClear }) => {
    if (selectedCount === 0) return null;

    return (
      <div className={`flex items-center gap-3 p-3 rounded-lg border-2 mb-4 ${
        isDark ? 'border-blue-700 bg-blue-900/20' : 'border-blue-300 bg-blue-50'
      }`}>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-blue-500" />
          <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            {selectedCount} item(s) selected
          </span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDuplicate}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
              color: colors.primary
            }}
          >
            <CopyIcon className="w-3 h-3" />
            Duplicate
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
              color: colors.primary
            }}
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

  // Odoo-style table component
  const OdooTable = ({ 
    items, 
    columns, 
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
    bulkActions = null
  }) => {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

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
        const aVal = a[sortField] || '';
        const bVal = b[sortField] || '';
        if (sortDirection === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    const toggleRow = (id) => {
      if (onRowSelect) {
        onRowSelect(id);
      }
    };

    const toggleAll = () => {
      if (onSelectAll) {
        onSelectAll();
      }
    };

    const isAllSelected = items.length > 0 && items.every(item => selectedRows.has(item.id));

    return (
      <div className={`rounded-lg border overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* Table Toolbar */}
        <div className={`flex items-center justify-between p-3 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center gap-2">
            {showCheckboxes && (
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleAll}
                className="rounded border-gray-300"
              />
            )}
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {items.length} items
            </span>
            {selectedRows.size > 0 && (
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                • {selectedRows.size} selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onAddColumn && (
              <button
                onClick={onAddColumn}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                  color: colors.primary
                }}
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

        {/* Bulk Actions */}
        {bulkActions}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                {showCheckboxes && (
                  <th className="px-3 py-2 w-8">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th 
                    key={col.key}
                    className={`px-3 py-2 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortField === col.key && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                      {col.removable && onRemoveColumn && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveColumn(col.key);
                          }}
                          className="ml-1 p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                          <X className="w-3 h-3 text-red-500" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                {actions.length > 0 && (
                  <th className="px-3 py-2 text-center text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              {sortedItems.map((item, index) => (
                <tr key={item.id} className={`${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors ${index % 2 === 0 ? (isDark ? 'bg-gray-800/50' : 'bg-white') : (isDark ? 'bg-gray-700/30' : 'bg-gray-50/50')}`}>
                  {showCheckboxes && (
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(item.id)}
                        onChange={() => toggleRow(item.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={`${item.id}-${col.key}`} className="px-3 py-2">
                      {col.editable !== false ? (
                        <input
                          type={col.type || 'text'}
                          value={col.key.startsWith('custom_') 
                            ? (item.customFields?.[col.key] || '') 
                            : (item[col.key] || '')}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (col.key.startsWith('custom_')) {
                              updateCustomField(item.id, col.key, value);
                            } else {
                              updateItemField(item.id, col.key, value);
                            }
                          }}
                          className={`w-full px-2 py-1 rounded border focus:outline-none focus:ring-2 bg-transparent ${
                            isDark ? 'border-gray-600 text-white focus:border-gray-400' : 'border-gray-200 text-gray-900 focus:border-gray-400'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                          placeholder={col.placeholder || ''}
                        />
                      ) : col.render ? (
                        col.render(item)
                      ) : (
                        <span className={isDark ? 'text-white' : 'text-gray-900'}>
                          {col.key.startsWith('custom_') 
                            ? (item.customFields?.[col.key] || '-') 
                            : (item[col.key] || '-')}
                        </span>
                      )}
                    </td>
                  ))}
                  {actions.length > 0 && (
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
                  <td colSpan={columns.length + (showCheckboxes ? 1 : 0) + (actions.length > 0 ? 1 : 0)} 
                      className={`px-4 py-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No items added yet</p>
                    <p className="text-xs mt-1">Click "Add Item" to get started</p>
                  </td>
                </tr>
              )}
            </tbody>
            {footer && (
              <tfoot className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                {footer}
              </tfoot>
            )}
          </table>
        </div>
      </div>
    );
  };

  // Render Preparation Step with Odoo-style table
  const renderPreparationStep = () => {
    // Define columns for preparation step
    const prepColumns = [
      { key: 'itemCode', label: 'Item Code', type: 'text', placeholder: 'e.g., ITEM-001' },
      { key: 'itemName', label: 'Item Name', type: 'text', placeholder: 'e.g., Laptop Computer' },
      { key: 'itemGroup', label: 'Item Group', type: 'text', placeholder: 'e.g., Electronics' },
      { key: 'stockUOM', label: 'Stock UOM', type: 'text', placeholder: 'e.g., Pieces' },
      { key: 'barcode', label: 'Barcode', type: 'text', placeholder: 'e.g., 1234567890' },
      { key: 'standardSellingRate', label: 'Standard Rate (UGX)', type: 'number', placeholder: 'e.g., 1200000' },
      { key: 'quantity', label: 'Qty', type: 'number', placeholder: 'e.g., 10' },
      { key: 'unitPrice', label: 'Unit Price (UGX)', type: 'number', placeholder: 'e.g., 1200000' },
      { key: 'totalValue', label: 'Total (UGX)', type: 'number', placeholder: 'Auto-calculated', editable: false },
    ];

    // Add custom columns
    const allColumns = [...prepColumns, ...customColumns.map(col => ({
      ...col,
      label: col.name,
      type: col.type,
      editable: true,
      removable: true
    }))];

    const footerRow = (
      <tr>
        <td colSpan="7" className="px-3 py-2 text-right font-medium">Total Value:</td>
        <td className="px-3 py-2 text-right font-bold">{formatCurrency(getTotalItemsValue())}</td>
        <td></td>
      </tr>
    );

    // Handle row selection
    const handleRowSelect = (id) => {
      const newSet = new Set(selectedRows);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      setSelectedRows(newSet);
    };

    const handleSelectAll = () => {
      if (selectedRows.size === importData.items.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(importData.items.map(item => item.id)));
      }
    };

    return (
      <div className="space-y-4">
        {/* Import/Export Toolbar */}
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg border" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
          <div className="flex items-center gap-2">
            <UploadCloud className="w-4 h-4" style={{ color: colors.primary }} />
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileImport}
              className="hidden"
              id="fileInput"
            />
            <button
              onClick={() => document.getElementById('fileInput').click()}
              disabled={uploadingFile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:shadow-md disabled:opacity-50"
              style={{ backgroundColor: colors.primary }}
            >
              {uploadingFile ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="w-3 h-3" />
                  Import
                </>
              )}
            </button>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
              color: colors.primary
            }}
          >
            <Download className="w-3 h-3" />
            Export All
          </button>
          <div className="flex-1"></div>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {importData.items.length} items
          </span>
        </div>

        {/* Bulk Action Bar */}
        <BulkActionBar 
          selectedCount={selectedRows.size}
          onDelete={bulkDeleteItems}
          onDuplicate={bulkDuplicateItems}
          onExport={bulkExportItems}
          onClear={() => setSelectedRows(new Set())}
        />

        {/* Odoo-style Table */}
        <OdooTable
          items={importData.items}
          columns={allColumns}
          onCellEdit={updateItemField}
          onRowDelete={removeItem}
          onRowAdd={addRow}
          onAddColumn={() => setShowAddColumnModal(true)}
          onRemoveColumn={removeCustomColumn}
          showCheckboxes={true}
          footer={footerRow}
          actions={[]}
          showAddRow={true}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
        />

        {/* Add Column Modal */}
        {showAddColumnModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`relative w-full max-w-md rounded-xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Add Custom Column
                </h3>
                <button
                  onClick={() => setShowAddColumnModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Column Name *
                    </label>
                    <input
                      type="text"
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                      placeholder="e.g., Supplier Code"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Column Type
                    </label>
                    <select
                      value={newColumnType}
                      onChange={(e) => setNewColumnType(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                      style={{ focusRingColor: colors.primary }}
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                      <option value="select">Select</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => setShowAddColumnModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
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

  // Render Items Review Step
  const renderItemsReviewStep = () => {
    const filteredItems = importData.items.filter(item => {
      const matchesSearch = item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.itemCode?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    const reviewColumns = [
      { key: 'itemCode', label: 'Item Code', type: 'text', placeholder: 'e.g., ITEM-001' },
      { key: 'itemName', label: 'Item Name', type: 'text', placeholder: 'e.g., Laptop Computer' },
      { key: 'itemGroup', label: 'Item Group', type: 'text', placeholder: 'e.g., Electronics' },
      { key: 'quantity', label: 'Qty', type: 'number', placeholder: 'e.g., 10' },
      { key: 'unitPrice', label: 'Unit Price (UGX)', type: 'number', placeholder: 'e.g., 1200000' },
      { key: 'totalValue', label: 'Total (UGX)', type: 'number', placeholder: 'Auto-calculated', editable: false },
    ];

    const allReviewColumns = [...reviewColumns, ...customColumns.map(col => ({
      ...col,
      label: col.name,
      type: col.type,
      editable: true,
      removable: true
    }))];

    // Handle row selection for review step
    const handleRowSelectReview = (id) => {
      const newSet = new Set(selectedRows);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      setSelectedRows(newSet);
    };

    const handleSelectAllReview = () => {
      if (selectedRows.size === filteredItems.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(filteredItems.map(item => item.id)));
      }
    };

    return (
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            style={{ focusRingColor: colors.primary }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="partial">Partial</option>
          </select>
        </div>

        {/* Bulk Action Bar for Review Step */}
        <BulkActionBar 
          selectedCount={selectedRows.size}
          onDelete={bulkDeleteItems}
          onDuplicate={bulkDuplicateItems}
          onExport={bulkExportItems}
          onClear={() => setSelectedRows(new Set())}
        />

        <OdooTable
          items={filteredItems}
          columns={allReviewColumns}
          onCellEdit={updateItemField}
          onRowDelete={removeItem}
          onRowAdd={addRow}
          showCheckboxes={true}
          footer={null}
          actions={[]}
          showAddRow={true}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelectReview}
          onSelectAll={handleSelectAllReview}
        />
      </div>
    );
  };

  // Render Send to Supplier Step
  const renderSendToSupplierStep = () => (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Send Item List to Supplier
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Select System Supplier
            </label>
            <select
              value={selectedSupplier}
              onChange={(e) => {
                setSelectedSupplier(e.target.value);
                const supplier = SYSTEM_SUPPLIERS.find(s => s.id === e.target.value);
                if (supplier) {
                  setSupplierEmail(supplier.email);
                  setSupplierName(supplier.name);
                }
              }}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              style={{ focusRingColor: colors.primary }}
            >
              <option value="">Select a supplier...</option>
              {SYSTEM_SUPPLIERS.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} - {supplier.email}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                OR
              </span>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Send to External Supplier
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Supplier Name"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
              <input
                type="email"
                placeholder="Supplier Email"
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
                className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                  isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
                style={{ focusRingColor: colors.primary }}
              />
            </div>
          </div>

          <button
            onClick={handleSendToSupplier}
            disabled={!selectedSupplier && !supplierEmail}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
            style={{ backgroundColor: colors.primary }}
          >
            <Send className="w-4 h-4" />
            Send to Supplier
          </button>
        </div>
      </div>

      {orderStatus === 'sent' && (
        <div className={`p-6 rounded-lg border-2 ${isDark ? 'border-green-700 bg-green-900/20' : 'border-green-500 bg-green-50'}`}>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Items Sent Successfully!
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {importData.items.length} items sent to {supplierName || 'supplier'} at {supplierEmail}
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Waiting for supplier confirmation...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render Supplier Confirmation Step
  const renderSupplierConfirmationStep = () => {
    const confirmationColumns = [
      { key: 'itemCode', label: 'Item Code', type: 'text', editable: false },
      { key: 'itemName', label: 'Item Name', type: 'text', editable: false },
      { key: 'quantity', label: 'Requested Qty', type: 'text', editable: false },
      { key: 'supplierQuantity', label: 'Available Qty', type: 'number', placeholder: 'e.g., 5' },
      { key: 'supplierStatus', label: 'Status', type: 'text', editable: false },
      { key: 'supplierNotes', label: 'Notes', type: 'text', placeholder: 'Supplier notes...' },
    ];

    const allConfirmationColumns = [...confirmationColumns, ...customColumns.map(col => ({
      ...col,
      label: col.name,
      type: col.type,
      editable: false
    }))];

    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Supplier Confirmation Status
          </h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Review supplier's response for each item
          </p>

          <OdooTable
            items={importData.items}
            columns={allConfirmationColumns}
            onCellEdit={updateItemField}
            onRowDelete={null}
            showCheckboxes={true}
            footer={null}
            actions={[
              {
                label: 'Update Status',
                icon: <Edit2 className="w-3 h-3" />,
                onClick: (item) => {
                  const status = prompt('Enter status (available/unavailable/partial):', item.supplierStatus || 'pending');
                  if (status && ['available', 'unavailable', 'partial', 'pending'].includes(status)) {
                    handleSupplierConfirmation(item.id, status, item.supplierNotes, item.supplierQuantity);
                  }
                }
              }
            ]}
            showAddRow={false}
            selectedRows={new Set()}
            onRowSelect={() => {}}
            onSelectAll={() => {}}
          />

          {orderStatus === 'confirmed' && (
            <div className="mt-6 flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="flex-1">
                <h4 className="font-semibold text-green-700 dark:text-green-400">All Items Confirmed!</h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Supplier has reviewed all items. You can now proceed to order finalisation.
                </p>
              </div>
              <button
                onClick={handleConfirmOrder}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: colors.primary }}
              >
                Finalize Order
              </button>
            </div>
          )}
        </div>

        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`relative w-full max-w-md rounded-xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Confirm Order
                </h3>
              </div>
              <div className="p-6">
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Are you sure you want to finalize this order? This action cannot be undone.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <input type="checkbox" id="confirmCheck" className="rounded border-gray-300" />
                  <label htmlFor="confirmCheck" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    I confirm that all items have been reviewed and approved
                  </label>
                </div>
              </div>
              <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={finalizeOrder}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.primary }}
                >
                  Confirm & Finalize
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Order Finalisation Step
  const renderOrderFinalisationStep = () => {
    const getDocCount = (item, type) => {
      if (!item || !item[type]) return 0;
      return (item[type].uploadedDocuments || []).length;
    };

    const getStatus = (item, type) => {
      if (!item || !item[type]) return 'pending';
      return item[type].status || 'pending';
    };

    const finalisationColumns = [
      { key: 'itemCode', label: 'Item Code', type: 'text', editable: false },
      { key: 'itemName', label: 'Item Name', type: 'text', editable: false },
      { 
        key: 'pvocStatus', 
        label: 'PVoC Status', 
        type: 'text', 
        editable: false,
        render: (item) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getStatus(item, 'pvoc'))}`}>
            {getStatus(item, 'pvoc').charAt(0).toUpperCase() + getStatus(item, 'pvoc').slice(1)}
          </span>
        )
      },
      { 
        key: 'pvocDocs', 
        label: 'PVoC Docs', 
        type: 'text', 
        editable: false,
        render: (item) => (
          <span className="text-sm">
            {getDocCount(item, 'pvoc')} document(s)
          </span>
        )
      },
      { 
        key: 'cocStatus', 
        label: 'CoC Status', 
        type: 'text', 
        editable: false,
        render: (item) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getStatus(item, 'coc'))}`}>
            {getStatus(item, 'coc').charAt(0).toUpperCase() + getStatus(item, 'coc').slice(1)}
          </span>
        )
      },
      { 
        key: 'cocDocs', 
        label: 'CoC Docs', 
        type: 'text', 
        editable: false,
        render: (item) => (
          <span className="text-sm">
            {getDocCount(item, 'coc')} document(s)
          </span>
        )
      },
    ];

    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            UNBS Documentation
          </h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Request and attach UNBS PVoC and CoC documents for each item
          </p>

          <OdooTable
            items={importData.items}
            columns={finalisationColumns}
            onCellEdit={null}
            onRowDelete={null}
            showCheckboxes={true}
            footer={null}
            actions={[
              {
                label: 'Manage PVoC',
                icon: <Shield className="w-3 h-3" />,
                onClick: (item) => {
                  setActivePVoCItem(item.id);
                  setShowPVoCModal(true);
                }
              },
              {
                label: 'Manage CoC',
                icon: <FileCheck className="w-3 h-3" />,
                onClick: (item) => {
                  setActiveCoCItem(item.id);
                  setShowCoCModal(true);
                }
              },
              {
                label: 'View Documents',
                icon: <Eye className="w-3 h-3 text-blue-500" />,
                onClick: (item) => {
                  const docs = [...(item.pvoc?.uploadedDocuments || []), ...(item.coc?.uploadedDocuments || [])];
                  if (docs.length > 0) {
                    setViewingDocument(docs[0]);
                    setShowDocumentViewer(true);
                  } else {
                    showToast('No documents uploaded for this item', 'info');
                  }
                }
              }
            ]}
            showAddRow={false}
            selectedRows={new Set()}
            onRowSelect={() => {}}
            onSelectAll={() => {}}
          />
        </div>

        {/* PVoC Modal */}
        {showPVoCModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`relative w-full max-w-2xl rounded-xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  UNBS PVoC - {importData.items.find(i => i.id === activePVoCItem)?.itemName || 'Item'}
                </h3>
                <button
                  onClick={() => setShowPVoCModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {activePVoCItem && (() => {
                  const item = importData.items.find(i => i.id === activePVoCItem);
                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Certificate Number
                          </label>
                          <input
                            type="text"
                            value={item?.pvoc?.certificateNumber || ''}
                            onChange={(e) => updatePVoCField(activePVoCItem, 'certificateNumber', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                            placeholder="Enter certificate number"
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Status
                          </label>
                          <select
                            value={item?.pvoc?.status || 'pending'}
                            onChange={(e) => updatePVoCField(activePVoCItem, 'status', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Issue Date
                          </label>
                          <input
                            type="date"
                            value={item?.pvoc?.issueDate || ''}
                            onChange={(e) => updatePVoCField(activePVoCItem, 'issueDate', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Expiry Date
                          </label>
                          <input
                            type="date"
                            value={item?.pvoc?.expiryDate || ''}
                            onChange={(e) => updatePVoCField(activePVoCItem, 'expiryDate', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                      </div>

                      <div className={`mt-4 p-4 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              Upload PVoC Document
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {(item?.pvoc?.uploadedDocuments || []).length} document(s)
                            </p>
                          </div>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            className="hidden"
                            id="pvocUpload"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file && activePVoCItem) {
                                handlePVoCUpload(activePVoCItem, file);
                              }
                              e.target.value = '';
                            }}
                          />
                          <button
                            onClick={() => document.getElementById('pvocUpload').click()}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.primary }}
                          >
                            <Upload className="w-4 h-4" />
                            Upload
                          </button>
                        </div>
                        {(item?.pvoc?.uploadedDocuments || []).map((doc) => (
                          <div key={doc.id} className={`mt-2 p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              {getFileIcon(doc.type)}
                              <span className="text-sm truncate">{doc.name}</span>
                              <span className="text-xs text-gray-500 flex-shrink-0">{formatFileSize(doc.size)}</span>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => {
                                  setViewingDocument(doc);
                                  setShowDocumentViewer(true);
                                  setShowPVoCModal(false);
                                }}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                <Eye className="w-3 h-3 text-blue-500" />
                              </button>
                              <button
                                onClick={() => removeDocument(activePVoCItem, 'pvoc', doc.id)}
                                className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-3 h-3 text-red-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => setShowPVoCModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowPVoCModal(false);
                    showToast('PVoC details saved!', 'success');
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.primary }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CoC Modal */}
        {showCoCModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`relative w-full max-w-2xl rounded-xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  UNBS CoC - {importData.items.find(i => i.id === activeCoCItem)?.itemName || 'Item'}
                </h3>
                <button
                  onClick={() => setShowCoCModal(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {activeCoCItem && (() => {
                  const item = importData.items.find(i => i.id === activeCoCItem);
                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Certificate Number
                          </label>
                          <input
                            type="text"
                            value={item?.coc?.certificateNumber || ''}
                            onChange={(e) => updateCoCField(activeCoCItem, 'certificateNumber', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                            placeholder="Enter certificate number"
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Status
                          </label>
                          <select
                            value={item?.coc?.status || 'pending'}
                            onChange={(e) => updateCoCField(activeCoCItem, 'status', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Issue Date
                          </label>
                          <input
                            type="date"
                            value={item?.coc?.issueDate || ''}
                            onChange={(e) => updateCoCField(activeCoCItem, 'issueDate', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Expiry Date
                          </label>
                          <input
                            type="date"
                            value={item?.coc?.expiryDate || ''}
                            onChange={(e) => updateCoCField(activeCoCItem, 'expiryDate', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            style={{ focusRingColor: colors.primary }}
                          />
                        </div>
                      </div>

                      <div className={`mt-4 p-4 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              Upload CoC Document
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {(item?.coc?.uploadedDocuments || []).length} document(s)
                            </p>
                          </div>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            className="hidden"
                            id="cocUpload"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file && activeCoCItem) {
                                handleCoCUpload(activeCoCItem, file);
                              }
                              e.target.value = '';
                            }}
                          />
                          <button
                            onClick={() => document.getElementById('cocUpload').click()}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: colors.primaryDark }}
                          >
                            <Upload className="w-4 h-4" />
                            Upload
                          </button>
                        </div>
                        {(item?.coc?.uploadedDocuments || []).map((doc) => (
                          <div key={doc.id} className={`mt-2 p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              {getFileIcon(doc.type)}
                              <span className="text-sm truncate">{doc.name}</span>
                              <span className="text-xs text-gray-500 flex-shrink-0">{formatFileSize(doc.size)}</span>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => {
                                  setViewingDocument(doc);
                                  setShowDocumentViewer(true);
                                  setShowCoCModal(false);
                                }}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                <Eye className="w-3 h-3 text-blue-500" />
                              </button>
                              <button
                                onClick={() => removeDocument(activeCoCItem, 'coc', doc.id)}
                                className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="w-3 h-3 text-red-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                  onClick={() => setShowCoCModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowCoCModal(false);
                    showToast('CoC details saved!', 'success');
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: colors.primaryDark }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      saveProgress();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const hasValidItems = importData.items.some(item => 
      item.itemName && item.quantity && item.totalValue
    );
    
    if (!hasValidItems) {
      showToast('Please add at least one valid item with name, quantity, and value', 'error');
      setCurrentStep(1);
      return;
    }

    const completedData = {
      ...importData,
      status: 'complete',
      importNumber: `IMP-${Date.now().toString().slice(-8)}`,
      completedAt: new Date().toISOString(),
      progress: 100
    };
    
    const importsList = JSON.parse(localStorage.getItem('allImports') || '[]');
    importsList.push(completedData);
    localStorage.setItem('allImports', JSON.stringify(importsList));
    localStorage.removeItem('importDraft');
    
    setImportData(completedData);
    showToast(`Import ${completedData.importNumber} completed successfully! 🎉`, 'success');
    setTimeout(() => navigate('/my-imports'), 1500);
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {showDocumentViewer && viewingDocument && (
        <DocumentViewerPage 
          doc={viewingDocument} 
          onClose={() => {
            setShowDocumentViewer(false);
            setViewingDocument(null);
          }} 
        />
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <button
              onClick={() => navigate('/importer-dashboard')}
              className={`flex items-center gap-2 text-sm hover:underline mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              New Import Documentation
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {importData.items.length} item(s) • {importData.importNumber || 'Draft'} • Status: {getOrderStatusDisplay(orderStatus)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={saveProgress}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50"
              style={{
                backgroundColor: isDark ? colors.primaryBgDark : colors.primaryBg,
                color: colors.primary
              }}
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
            {savedSuccess && (
              <span className="text-sm text-green-500 animate-fade-in">✓ Saved!</span>
            )}
          </div>
        </div>

        {/* Progress Bar with Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Overall Progress
            </span>
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {importData.progress}%
            </span>
          </div>
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${importData.progress}%`,
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight}, ${colors.success})`
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setCurrentStep(index);
                    saveProgress();
                  }}
                  className={`flex flex-col items-center transition-all duration-200 ${
                    isActive ? 'scale-110' : ''
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : isCompleted 
                      ? 'text-white' 
                      : isDark ? 'text-gray-400 bg-gray-600' : 'text-gray-500 bg-gray-200'
                  }`}
                  style={{
                    backgroundColor: isActive ? colors.primary : isCompleted ? colors.success : undefined
                  }}>
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`text-xs mt-1 ${isActive ? 'font-bold' : ''} ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`rounded-lg p-4 md:p-6 transition-all duration-300 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            {React.createElement(steps[currentStep].icon, {
              className: "w-5 h-5",
              style: { color: colors.primary }
            })}
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {steps[currentStep].title}
            </h2>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {steps[currentStep].description}
          </p>

          {currentStep === 0 && renderPreparationStep()}
          {currentStep === 1 && renderItemsReviewStep()}
          {currentStep === 2 && renderSendToSupplierStep()}
          {currentStep === 3 && renderSupplierConfirmationStep()}
          {currentStep === 4 && renderInvoicePaymentStep()}
          {currentStep === 5 && renderOrderFinalisationStep()}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-6 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
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

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Complete Import
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

export default NewImport;