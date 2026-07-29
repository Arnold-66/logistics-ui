import React from 'react';
import { CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';

const StatusBadge = ({ status, size = 'sm' }) => {
  const statusMap = {
    'completed': {
      backgroundColor: '#10b98120',
      color: '#10b981',
      icon: <CheckCircle className="w-3 h-3" />,
      label: 'Completed'
    },
    'pending': {
      backgroundColor: '#f59e0b20',
      color: '#f59e0b',
      icon: <Clock className="w-3 h-3" />,
      label: 'Pending'
    },
    'in_progress': {
      backgroundColor: '#3b82f620',
      color: '#3b82f6',
      icon: <RefreshCw className="w-3 h-3" />,
      label: 'In Progress'
    },
    'overdue': {
      backgroundColor: '#ef444420',
      color: '#ef4444',
      icon: <AlertCircle className="w-3 h-3" />,
      label: 'Overdue'
    }
  };

  const style = statusMap[status] || statusMap['pending'];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span 
      className={`rounded-full flex items-center gap-1 ${sizeClasses}`}
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color
      }}
    >
      {style.icon}
      {style.label}
    </span>
  );
};

export default StatusBadge;