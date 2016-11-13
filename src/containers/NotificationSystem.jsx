import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { removeNotification } from '../actions';
import NotificationItem from '../components/NotificationItem';
import '../stylesheets/notifications.css';

export class NotificationSystem extends React.Component {
  constructor(props) {
    super(props);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
  }

  handleCloseNotification(id) {
    this.props.onCloseNotification(id);
  }

  render() {
    return (
      <div id="notification-container" className={this.props.customClassName}>
        <ReactCSSTransitionGroup
          transitionName="notification-item"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          {this.props.notifications.map(item =>
            <NotificationItem
              id={item.id}
              key={item.id}
              level={item.level}
              message={item.message}
              dangerouslyAllowHTML={this.props.dangerouslyAllowHTML}
              onClose={this.handleCloseNotification}
            />
          )}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

NotificationSystem.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    level: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired
  })).isRequired,
  customClassName: React.PropTypes.string,
  dangerouslyAllowHTML: React.PropTypes.bool,
  onCloseNotification: React.PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notification.notifications,
  customClassName: ownProps.customClassName,
  dangerouslyAllowHTML: ownProps.dangerouslyAllowHTML
});

const mapDispatchToProps = (dispatch) => ({
  onCloseNotification: id => {
    dispatch(removeNotification(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSystem);
