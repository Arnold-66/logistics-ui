export const SHIPMENT_STATUSES = {
  PENDING: 'pending',
  IN_TRANSIT: 'in_transit',
  CUSTOMS_CLEARANCE: 'customs_clearance',
  DELIVERED: 'delivered',
  COMPLETED: 'completed'
};

export const DOCUMENT_TYPES = {
  INVOICE: 'invoice',
  CONTRACT: 'contract',
  PAYMENT: 'payment',
  CERTIFICATE: 'certificate',
  DETAILS: 'details',
  LIST: 'list'
};

export const USER_ROLES = {
  IMPORTER: 'importer',
  EXPORTER: 'exporter',
  CLEARING_AGENT: 'clearing_agent',
  FREIGHT_FORWARDER: 'freight_forwarder',
  ADMIN: 'admin'
};

export const PRIORITY_LEVELS = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};