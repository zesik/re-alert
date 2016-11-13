import {
  APPEND_NOTIFICATION,
  REMOVE_NOTIFICATION,
  NOTIFICATION_INFORMATION,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_WARNING,
  NOTIFICATION_ERROR
} from '../constants';

let nextNotificationID = 0;

function appendNotification(id, level, message) {
  return {
    type: APPEND_NOTIFICATION,
    id,
    level,
    message
  };
}

export function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id
  };
}

function showNotification(level, message, autoCloseDelay) {
  const id = nextNotificationID++;
  return (dispatch) => {
    dispatch(appendNotification(id, level, message));
    if (autoCloseDelay > 0) {
      setTimeout(() => dispatch(removeNotification(id)), autoCloseDelay);
      return true;
    }
    return false;
  };
}

export function showInformation(message, autoCloseDelay) {
  return showNotification(NOTIFICATION_INFORMATION, message, autoCloseDelay);
}

export function showSuccess(message, autoCloseDelay) {
  return showNotification(NOTIFICATION_SUCCESS, message, autoCloseDelay);
}

export function showWarning(message, autoCloseDelay) {
  return showNotification(NOTIFICATION_WARNING, message, autoCloseDelay);
}

export function showError(message, autoCloseDelay) {
  return showNotification(NOTIFICATION_ERROR, message, autoCloseDelay);
}
