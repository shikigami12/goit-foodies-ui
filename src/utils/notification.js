import { toast } from 'react-hot-toast';

export const showNotification = (message, type = 'info', options = {}) => {
  switch (type) {
    case 'success':
      return toast.success(message, options);
    case 'error':
      return toast.error(message, options);
    case 'warning':
      return toast(message, { ...options, icon: '⚠️' });
    default:
      return toast(message, options);
  }
};

export const showError = (message, options) =>
  showNotification(message, 'error', options);

export const showSuccess = (message, options) =>
  showNotification(message, 'success', options);

export const showInfo = (message, options) =>
  showNotification(message, 'info', options);

export const showWarning = (message, options) =>
  showNotification(message, 'warning', options);
