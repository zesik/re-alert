import { showInformation, showSuccess, showWarning, showError } from './src/actions';
import notificationReducer from './src/reducers';
import NotificationSystem from './src/containers/NotificationSystem';

export {
  NotificationSystem as default,
  notificationReducer,
  showInformation,
  showSuccess,
  showWarning,
  showError
};
