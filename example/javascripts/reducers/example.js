import {
  UPDATE_MESSAGE,
  UPDATE_LEVEL,
  UPDATE_AUTO_CLOSE,
  UPDATE_AUTO_CLOSE_DELAY,
  UPDATE_DANGEROUSLY_ALLOW_HTML
} from '../actions';

const initialState = {
  message: 'Hello from notification!',
  level: 'info',
  autoClose: true,
  autoCloseDelay: 10,
  dangerouslyAllowHTML: false
};

function exampleAppReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return Object.assign({}, state, {
        message: action.message
      });
    case UPDATE_LEVEL:
      return Object.assign({}, state, {
        level: action.level
      });
    case UPDATE_AUTO_CLOSE:
      return Object.assign({}, state, {
        autoClose: action.autoClose
      });
    case UPDATE_AUTO_CLOSE_DELAY:
      return Object.assign({}, state, {
        autoCloseDelay: action.autoCloseDelay
      });
    case UPDATE_DANGEROUSLY_ALLOW_HTML:
      return Object.assign({}, state, {
        dangerouslyAllowHTML: action.dangerouslyAllowHTML
      });
    default:
      return state;
  }
}

export default exampleAppReducer;
