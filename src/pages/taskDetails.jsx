import React, { useState, useContext, useEffect } from 'react';
import {
  ClipboardList,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  ArrowLeft,
  Home,
  ChevronRight,
  Edit,
  Trash2,
  MessageSquare,
  Paperclip,
  Calendar,
  User,
  FileText,
  Ship,
  Package,
  Truck,
  Container,
  MapPin,
  Flag,
  Building,
  CreditCard,
  Shield,
  FileCheck,
  FileSignature,
  FileBarChart,
  MoreVertical,
  Download,
  RefreshCw,
  Plus,
  Send,
  Eye,
  Tag,
  Users,
  Briefcase,
  Star,
  StarHalf,
  StarOff,
  Award,
  Target,
  Rocket,
  Zap,
  Flame,
  Coffee,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  CheckSquare,
  Square,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Link,
  Copy,
  Printer,
  Share2,
  Save
} from 'lucide-react';
import { ThemeContext } from '../context/themeContext';
import { useNavigate, useParams } from 'react-router-dom';

const TaskDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    category: '',
    dueDate: '',
    assignedTo: '',
    shipmentId: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

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

  // Sample task data - in real app, fetch from API
  const tasksData = {
    1: {
      id: 1,
      title: 'Upload Commercial Invoice for Shipment #458',
      description: 'Upload the commercial invoice matching factory declarations for shipment #458. Ensure all amounts match the factory declarations exactly.',
      status: 'pending',
      priority: 'high',
      category: 'document',
      dueDate: '2026-08-15',
      createdDate: '2026-08-10 09:00:00',
      updatedDate: '2026-08-12 14:30:00',
      assignedTo: 'John Doe',
      assignedBy: 'Jane Smith',
      shipmentId: '#458',
      documentType: 'Commercial Invoice',
      progress: 0,
      comments: [
        { id: 1, user: 'Jane Smith', date: '2026-08-11 14:30', text: 'Please make sure the invoice matches the factory declarations exactly.', isInternal: false },
        { id: 2, user: 'John Doe', date: '2026-08-12 10:00', text: 'I will review and upload by end of day.', isInternal: false },
        { id: 3, user: 'System', date: '2026-08-12 14:30', text: 'Task status updated to In Progress', isInternal: true }
      ],
      attachments: [
        { id: 1, name: 'Factory_Declaration_458.pdf', size: '2.4 MB', type: 'pdf', date: '2026-08-10' },
        { id: 2, name: 'Invoice_Template.xlsx', size: '1.2 MB', type: 'excel', date: '2026-08-10' }
      ],
      tags: ['invoice', 'commercial', 'urgent'],
      subtasks: [
        { id: 1, title: 'Gather invoice details from supplier', completed: true },
        { id: 2, title: 'Verify factory declarations match', completed: false },
        { id: 3, title: 'Upload to system', completed: false }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-10 09:00', user: 'Jane Smith' },
        { action: 'Comment added', date: '2026-08-11 14:30', user: 'Jane Smith' },
        { action: 'Task assigned to John Doe', date: '2026-08-12 09:00', user: 'System' },
        { action: 'Comment added', date: '2026-08-12 10:00', user: 'John Doe' }
      ],
      relatedItems: [
        { type: 'Shipment', id: '#458', link: '/shipment/458' },
        { type: 'Document', id: 'INV-2026-00458', link: '/document/1' }
      ]
    },
    2: {
      id: 2,
      title: 'Submit Sales Contract for Shipment #459',
      description: 'Submit the official sales agreement for shipment #459. Contract must be signed by both parties.',
      status: 'in_progress',
      priority: 'medium',
      category: 'contract',
      dueDate: '2026-08-20',
      createdDate: '2026-08-12 10:00:00',
      updatedDate: '2026-08-13 11:00:00',
      assignedTo: 'Jane Smith',
      assignedBy: 'John Doe',
      shipmentId: '#459',
      documentType: 'Sales Contract',
      progress: 45,
      comments: [
        { id: 1, user: 'John Doe', date: '2026-08-12 11:00', text: 'Contract reviewed and approved internally.', isInternal: false },
        { id: 2, user: 'Jane Smith', date: '2026-08-13 11:00', text: 'Sent to buyer for signature. Awaiting response.', isInternal: false }
      ],
      attachments: [
        { id: 1, name: 'Sales_Contract_459.pdf', size: '1.8 MB', type: 'pdf', date: '2026-08-12' },
        { id: 2, name: 'Contract_Approval.xlsx', size: '0.8 MB', type: 'excel', date: '2026-08-12' }
      ],
      tags: ['contract', 'sales', 'agreement'],
      subtasks: [
        { id: 1, title: 'Review contract terms', completed: true },
        { id: 2, title: 'Get buyer signature', completed: true },
        { id: 3, title: 'Upload signed contract', completed: false }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-12 10:00', user: 'John Doe' },
        { action: 'Contract reviewed', date: '2026-08-12 11:00', user: 'John Doe' },
        { action: 'Sent to buyer', date: '2026-08-13 11:00', user: 'Jane Smith' }
      ],
      relatedItems: [
        { type: 'Shipment', id: '#459', link: '/shipment/459' },
        { type: 'Document', id: 'SC-2026-00458', link: '/document/2' }
      ]
    },
    3: {
      id: 3,
      title: 'Proof of Payments for Shipment #458',
      description: 'Upload payment confirmation and receipts for shipment #458. Include all payment documentation.',
      status: 'completed',
      priority: 'high',
      category: 'payment',
      dueDate: '2026-08-10',
      createdDate: '2026-08-05 09:00:00',
      updatedDate: '2026-08-09 16:00:00',
      assignedTo: 'John Doe',
      assignedBy: 'Jane Smith',
      shipmentId: '#458',
      documentType: 'Proof of Payments',
      progress: 100,
      comments: [
        { id: 1, user: 'Jane Smith', date: '2026-08-06 10:00', text: 'Please ensure all payment receipts are included.', isInternal: false },
        { id: 2, user: 'John Doe', date: '2026-08-08 15:00', text: 'All payments uploaded successfully.', isInternal: false }
      ],
      attachments: [
        { id: 1, name: 'Payment_Receipt_1.pdf', size: '1.2 MB', type: 'pdf', date: '2026-08-08' },
        { id: 2, name: 'Payment_Receipt_2.pdf', size: '0.9 MB', type: 'pdf', date: '2026-08-08' },
        { id: 3, name: 'Bank_Statement.pdf', size: '1.0 MB', type: 'pdf', date: '2026-08-08' }
      ],
      tags: ['payment', 'receipt', 'complete'],
      subtasks: [
        { id: 1, title: 'Get payment confirmation', completed: true },
        { id: 2, title: 'Upload receipts', completed: true },
        { id: 3, title: 'Verify amounts', completed: true }
      ],
      activity: [
        { action: 'Task created', date: '2026-08-05 09:00', user: 'Jane Smith' },
        { action: 'Comment added', date: '2026-08-06 10:00', user: 'Jane Smith' },
        { action: 'Payment uploaded', date: '2026-08-08 15:00', user: 'John Doe' },
        { action: 'Task completed', date: '2026-08-09 16:00', user: 'System' }
      ],
      relatedItems: [
        { type: 'Shipment', id: '#458', link: '/shipment/458' },
        { type: 'Document', id: 'POP-2026-00458', link: '/document/3' }
      ]
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = tasksData[id];
      if (data) {
        setTask(data);
        // Initialize edit form
        setEditForm({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          category: data.category,
          dueDate: data.dueDate,
          assignedTo: data.assignedTo,
          shipmentId: data.shipmentId
        });
      } else {
        navigate('/tasks');
      }
      setLoading(false);
    }, 300);
  }, [id, navigate]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { 
        backgroundColor: colors.warning + '20', 
        color: colors.warning, 
        icon: <Clock className="w-4 h-4" />,
        label: 'Pending'
      },
      'in_progress': { 
        backgroundColor: colors.info + '20', 
        color: colors.info, 
        icon: <RefreshCw className="w-4 h-4" />,
        label: 'In Progress'
      },
      'completed': { 
        backgroundColor: colors.success + '20', 
        color: colors.success, 
        icon: <CheckCircle className="w-4 h-4" />,
        label: 'Completed'
      }
    };
    return statusMap[status] || statusMap['pending'];
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'critical': { backgroundColor: colors.danger + '30', color: colors.danger, label: 'Critical' },
      'high': { backgroundColor: colors.danger + '20', color: colors.danger, label: 'High' },
      'medium': { backgroundColor: colors.warning + '20', color: colors.warning, label: 'Medium' },
      'low': { backgroundColor: colors.info + '20', color: colors.info, label: 'Low' }
    };
    return priorityMap[priority] || priorityMap['medium'];
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'document': <FileText className="w-5 h-5" />,
      'contract': <FileSignature className="w-5 h-5" />,
      'payment': <CreditCard className="w-5 h-5" />,
      'certificate': <Shield className="w-5 h-5" />,
      'invoice': <FileBarChart className="w-5 h-5" />,
      'details': <Building className="w-5 h-5" />,
      'list': <Package className="w-5 h-5" />
    };
    return iconMap[category] || <FileText className="w-5 h-5" />;
  };

  const getCategoryLabel = (category) => {
    const labelMap = {
      'document': 'Document',
      'contract': 'Contract',
      'payment': 'Payment',
      'certificate': 'Certificate',
      'invoice': 'Invoice',
      'details': 'Details',
      'list': 'List'
    };
    return labelMap[category] || category;
  };

  const getFileIcon = (type) => {
    const iconMap = {
      'pdf': <FileText className="w-4 h-4 text-red-500" />,
      'excel': <FileBarChart className="w-4 h-4 text-green-500" />,
      'word': <FileText className="w-4 h-4 text-blue-500" />,
      'image': <FileText className="w-4 h-4 text-purple-500" />
    };
    return iconMap[type] || <FileText className="w-4 h-4" />;
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setTask(prev => ({
        ...prev,
        comments: [...prev.comments, {
          id: Date.now(),
          user: 'John Doe',
          date: new Date().toLocaleString(),
          text: newComment,
          isInternal: false
        }]
      }));
      setNewComment('');
      showToastMessage('Comment added successfully', 'success');
    }
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle Edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    // Update the task with edit form values
    setTask(prev => ({
      ...prev,
      title: editForm.title,
      description: editForm.description,
      status: editForm.status,
      priority: editForm.priority,
      category: editForm.category,
      dueDate: editForm.dueDate,
      assignedTo: editForm.assignedTo,
      shipmentId: editForm.shipmentId,
      updatedDate: new Date().toLocaleString()
    }));
    setIsEditing(false);
    showToastMessage('Task updated successfully', 'success');
  };

  // Handle Edit Form Change
  const handleEditChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle Mark Complete
  const handleMarkComplete = () => {
    setTask(prev => ({
      ...prev,
      status: 'completed',
      progress: 100
    }));
    showToastMessage('Task marked as complete', 'success');
  };

  // Handle Delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      showToastMessage('Task deleted successfully', 'info');
      setTimeout(() => navigate('/tasks'), 1000);
    }
  };

  // Edit Modal Component
  const EditModal = () => {
    if (!isEditing) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className={`relative w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Edit className="w-5 h-5" style={{ color: colors.primary }} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Edit Task
              </h3>
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Title *
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => handleEditChange('title', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  rows="3"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  style={{ focusRingColor: colors.primary }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) => handleEditChange('status', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Priority
                  </label>
                  <select
                    value={editForm.priority}
                    onChange={(e) => handleEditChange('priority', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => handleEditChange('category', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  >
                    <option value="document">Document</option>
                    <option value="contract">Contract</option>
                    <option value="payment">Payment</option>
                    <option value="certificate">Certificate</option>
                    <option value="invoice">Invoice</option>
                    <option value="details">Details</option>
                    <option value="list">List</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={editForm.dueDate}
                    onChange={(e) => handleEditChange('dueDate', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Assigned To */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={editForm.assignedTo}
                    onChange={(e) => handleEditChange('assignedTo', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>

                {/* Shipment ID */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Shipment ID
                  </label>
                  <input
                    type="text"
                    value={editForm.shipmentId}
                    onChange={(e) => handleEditChange('shipmentId', e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ focusRingColor: colors.primary }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-end gap-3 p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setIsEditing(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Toast Component
  const Toast = ({ message, type }) => {
    if (!showToast) return null;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                  type === 'error' ? <AlertCircle className="w-5 h-5" /> : 
                  <Info className="w-5 h-5" />;

    return (
      <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-white ${bgColor} animate-slide-in`}>
        {icon}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={() => setShowToast(false)} className="ml-2 hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Info icon component
  const Info = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading task details...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
        <div className="text-center">
          <ClipboardList className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: isDark ? '#4b5563' : '#9ca3af' }} />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Task not found</h2>
          <button
            onClick={() => navigate('/tasks')}
            className="mt-4 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusBadge(task.status);
  const priorityStyle = getPriorityBadge(task.priority);
  const progressColor = task.progress === 100 ? colors.success : task.progress >= 70 ? colors.primary : task.progress >= 40 ? colors.warning : colors.danger;
  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();

  return (
    <div className="min-h-screen w-full p-4 md:p-6" style={{ backgroundColor: isDark ? '#1a1a2e' : '#f8fafc' }}>
      {/* Toast Notification */}
      <Toast message={toastMessage} type={toastType} />

      {/* Edit Modal */}
      <EditModal />

      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <button
            onClick={() => navigate('/tasks')}
            className={`flex items-center gap-1 hover:underline ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <Home className="w-4 h-4" />
            Tasks
          </button>
          <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <span className={isDark ? 'text-white' : 'text-gray-900'}>Task Details</span>
        </div>

        {/* Header */}
        <div className={`rounded-lg p-6 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: colors.primaryBg }}>
                {getCategoryIcon(task.category)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {task.title}
                  </h1>
                  <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={statusStyle}>
                    {statusStyle.icon}
                    {statusStyle.label}
                  </span>
                  {isOverdue && (
                    <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ backgroundColor: colors.danger + '20', color: colors.danger }}>
                      <AlertCircle className="w-3 h-3" />
                      Overdue
                    </span>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded-full" style={priorityStyle}>
                    {priorityStyle.label}
                  </span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {task.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FileText className="w-3 h-3 inline mr-1" />
                    {getCategoryLabel(task.category)}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Ship className="w-3 h-3 inline mr-1" />
                    {task.shipmentId}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <UserIcon className="w-3 h-3 inline mr-1" />
                    Assigned to: {task.assignedTo}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {task.status !== 'completed' && (
                <button
                  onClick={handleMarkComplete}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: colors.success,
                    color: 'white'
                  }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete
                </button>
              )}
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: colors.primaryBg,
                  color: colors.primary
                }}
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => navigate('/tasks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Task Progress
            </span>
            <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {task.progress}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${task.progress}%`,
                backgroundColor: progressColor
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className={`rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
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
                  <Eye className="w-4 h-4 inline mr-2" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'comments'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'comments' ? colors.primary : 'transparent' }}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Comments ({task.comments.length})
                </button>
                <button
                  onClick={() => setActiveTab('attachments')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'attachments'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'attachments' ? colors.primary : 'transparent' }}
                >
                  <Paperclip className="w-4 h-4 inline mr-2" />
                  Attachments ({task.attachments.length})
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === 'activity'
                      ? 'border-primary text-primary'
                      : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={{ borderColor: activeTab === 'activity' ? colors.primary : 'transparent' }}
                >
                  <ClockIcon className="w-4 h-4 inline mr-2" />
                  Activity
                </button>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Subtasks */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Subtasks ({task.subtasks.filter(s => s.completed).length}/{task.subtasks.length})
                        </h3>
                        <button
                          onClick={() => setShowSubtasks(!showSubtasks)}
                          className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                        >
                          {showSubtasks ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                      {showSubtasks && (
                        <div className="space-y-2">
                          {task.subtasks.map((subtask) => (
                            <div key={subtask.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <input
                                type="checkbox"
                                checked={subtask.completed}
                                onChange={() => {
                                  // Toggle subtask completion
                                  setTask(prev => ({
                                    ...prev,
                                    subtasks: prev.subtasks.map(s => 
                                      s.id === subtask.id ? { ...s, completed: !s.completed } : s
                                    )
                                  }));
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                style={{ accentColor: colors.primary }}
                              />
                              <span className={`text-sm flex-1 ${subtask.completed ? 'line-through' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {subtask.title}
                              </span>
                              {subtask.completed && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Related Items */}
                    <div>
                      <h3 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Related Items
                      </h3>
                      <div className="space-y-2">
                        {task.relatedItems.map((item, idx) => (
                          <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-3">
                              {item.type === 'Shipment' ? <Ship className="w-4 h-4" style={{ color: colors.primary }} /> : <FileText className="w-4 h-4" style={{ color: colors.primary }} />}
                              <div>
                                <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.type}: {item.id}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => navigate(item.link)}
                              className="text-xs px-3 py-1 rounded-lg transition-all duration-200 hover:shadow-md"
                              style={{
                                backgroundColor: colors.primaryBg,
                                color: colors.primary
                              }}
                            >
                              <Eye className="w-3 h-3 inline mr-1" />
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, idx) => (
                          <span key={idx} className={`text-xs px-3 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Comments Tab */}
                {activeTab === 'comments' && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {task.comments.map((comment) => (
                        <div key={comment.id} className={`p-3 rounded-lg ${comment.isInternal ? 'border-l-4' : ''} ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`} 
                             style={{ borderLeftColor: comment.isInternal ? colors.warning : 'transparent' }}>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {comment.user}
                                {comment.isInternal && (
                                  <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.warning + '20', color: colors.warning }}>
                                    Internal
                                  </span>
                                )}
                              </p>
                              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{comment.date}</p>
                            </div>
                          </div>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{comment.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                          className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
                            isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          style={{ focusRingColor: colors.primary }}
                        />
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Attachments Tab */}
                {activeTab === 'attachments' && (
                  <div className="space-y-3">
                    {task.attachments.map((attachment) => (
                      <div key={attachment.id} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          {getFileIcon(attachment.type)}
                          <div>
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{attachment.name}</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {attachment.size} • Uploaded {attachment.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                      style={{
                        backgroundColor: colors.primaryBg,
                        color: colors.primary
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Upload Attachment
                    </button>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div className="space-y-3">
                    {task.activity.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="relative flex items-center justify-center w-6">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                          {idx < task.activity.length - 1 && (
                            <div className="absolute top-4 w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{activity.action}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {activity.date} • by {activity.user}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Task Info */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Task Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status</span>
                  <span className="flex items-center gap-1" style={{ color: statusStyle.color }}>
                    {statusStyle.icon}
                    {statusStyle.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Priority</span>
                  <span className="font-medium" style={{ color: priorityStyle.color }}>
                    {priorityStyle.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Category</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{getCategoryLabel(task.category)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Due Date</span>
                  <span className={`font-medium ${isOverdue ? 'text-red-500' : ''}`}>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Created</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{new Date(task.createdDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Assigned To</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{task.assignedTo}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Assigned By</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{task.assignedBy}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={handleEdit}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md" 
                  style={{ backgroundColor: colors.primaryBg, color: colors.primary }}
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit Task</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md" style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share Task</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md" style={{ backgroundColor: colors.primaryBg, color: colors.primary }}>
                  <Printer className="w-4 h-4" />
                  <span className="text-sm font-medium">Print Task</span>
                </button>
                <button 
                  onClick={handleDelete}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Delete Task</span>
                </button>
              </div>
            </div>

            {/* Progress Stats */}
            <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
              <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Progress Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{task.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${task.progress}%`,
                        backgroundColor: progressColor
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Subtasks</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Comments</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{task.comments.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Attachments</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{task.attachments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;