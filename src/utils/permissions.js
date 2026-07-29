import { USER_ROLES } from './constants';

export const hasPermission = (userRole, requiredRoles) => {
  if (!userRole) return false;
  if (!requiredRoles || requiredRoles.length === 0) return true;
  return requiredRoles.includes(userRole);
};

export const canViewShipment = (userRole) => {
  return hasPermission(userRole, [
    USER_ROLES.IMPORTER,
    USER_ROLES.EXPORTER,
    USER_ROLES.CLEARING_AGENT,
    USER_ROLES.FREIGHT_FORWARDER,
    USER_ROLES.ADMIN
  ]);
};

export const canEditShipment = (userRole) => {
  return hasPermission(userRole, [
    USER_ROLES.IMPORTER,
    USER_ROLES.CLEARING_AGENT,
    USER_ROLES.ADMIN
  ]);
};

export const canViewDocuments = (userRole) => {
  return hasPermission(userRole, [
    USER_ROLES.IMPORTER,
    USER_ROLES.EXPORTER,
    USER_ROLES.CLEARING_AGENT,
    USER_ROLES.FREIGHT_FORWARDER,
    USER_ROLES.ADMIN
  ]);
};

export const canUploadDocuments = (userRole) => {
  return hasPermission(userRole, [
    USER_ROLES.IMPORTER,
    USER_ROLES.EXPORTER,
    USER_ROLES.CLEARING_AGENT,
    USER_ROLES.ADMIN
  ]);
};