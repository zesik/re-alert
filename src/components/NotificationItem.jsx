import React from 'react';
import { NOTIFICATION_INFORMATION, NOTIFICATION_SUCCESS, NOTIFICATION_WARNING, NOTIFICATION_ERROR } from '../constants';

function NotificationItem(props) {
  let classes = '';
  switch (props.level) {
    case NOTIFICATION_INFORMATION:
      classes = 'notification-item notification-information';
      break;
    case NOTIFICATION_SUCCESS:
      classes = 'notification-item notification-success';
      break;
    case NOTIFICATION_WARNING:
      classes = 'notification-item notification-warning';
      break;
    case NOTIFICATION_ERROR:
      classes = 'notification-item notification-error';
      break;
    default:
      classes = 'notification-item';
      break;
  }
  return (
    <div className={classes}>
      <button className="notification-close" onClick={() => props.onClose(props.id)} />
      {
        props.dangerouslyAllowHTML ?
          <div className="notification-content" dangerouslySetInnerHTML={{ __html: props.message }} /> :
          <div className="notification-content">{props.message}</div>
      }
    </div>
  );
}

NotificationItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  level: React.PropTypes.string.isRequired,
  message: React.PropTypes.string.isRequired,
  dangerouslyAllowHTML: React.PropTypes.bool,
  onClose: React.PropTypes.func.isRequired
};

export default NotificationItem;
