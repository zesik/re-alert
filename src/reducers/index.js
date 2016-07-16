import { APPEND_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants';

const initialState = {
  notifications: []
};

function notificationCenterReducer(state = initialState, action) {
  switch (action.type) {
    case APPEND_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: [
          ...state.notifications,
          { id: action.id, level: action.level, message: action.message }
        ]
      });
    case REMOVE_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: state.notifications.filter(item => item.id !== action.id)
      });
    default:
      return state;
  }
}

export default notificationCenterReducer;
