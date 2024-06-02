const Enums = {
  USER_ROLES: {
    USER: 'user',
    SERVICE_PROVIDER: 'service_provider',
  },
  PAYMENT_STATUS: {
    PAID: 'PAID',
    NOT_PAID: 'NOT_PAID',
  },
  LEAVE_STATUS: {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    CANCELLED: 'CANCELLED',
  },
  BOOKING_REQUEST_STATUS: {
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
  },
  BOOKING_STATUS: {
    ACCEPTED: 'ACCEPTED',
    ONGOING: 'ONGOING',
    CLOSED: 'CLOSED',
    COMPLETED: 'COMPLETED',
  },
  SERVICE_PROVIDER_STATUS: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
  },
};

export default Enums;
