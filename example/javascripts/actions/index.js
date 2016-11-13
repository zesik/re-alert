import { showInformation, showSuccess, showWarning, showError } from '../../..';

export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';
export const UPDATE_AUTO_CLOSE = 'UPDATE_AUTO_CLOSE';
export const UPDATE_AUTO_CLOSE_DELAY = 'UPDATE_AUTO_CLOSE_DELAY';
export const UPDATE_DANGEROUSLY_ALLOW_HTML = 'UPDATE_DANGEROUSLY_ALLOW_HTML';

export function updateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message
  };
}

export function updateLevel(level) {
  return {
    type: UPDATE_LEVEL,
    level
  };
}

export function updateAutoClose(autoClose) {
  return {
    type: UPDATE_AUTO_CLOSE,
    autoClose
  };
}

export function updateAutoCloseDelay(autoCloseDelay) {
  return {
    type: UPDATE_AUTO_CLOSE_DELAY,
    autoCloseDelay
  };
}

export function updateDangerouslyAllowHTML(dangerouslyAllowHTML) {
  return {
    type: UPDATE_DANGEROUSLY_ALLOW_HTML,
    dangerouslyAllowHTML
  };
}

export function showNotification(message, level, autoClose, autoCloseDelay) {
  return dispatch => {
    const delay = autoClose ? autoCloseDelay * 1000 : 0;
    switch (level) {
      case 'info':
        dispatch(showInformation(message, delay));
        break;
      case 'success':
        dispatch(showSuccess(message, delay));
        break;
      case 'warn':
        dispatch(showWarning(message, delay));
        break;
      case 'error':
        dispatch(showError(message, delay));
        break;
    }
  };
}
