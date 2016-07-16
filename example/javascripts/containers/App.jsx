import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from '../../..';
import { updateMessage, updateLevel, updateAutoClose, updateAutoCloseDelay, showNotification } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
  }

  showNotification() {
    const { dispatch } = this.props;
    dispatch(showWarning('hello'));
  }

  render() {
    const { message, level, autoClose, autoCloseDelay } = this.props;
    const { onUpdateMessage, onUpdateLevel, onUpdateAutoClose, onUpdateAutoCloseDelay, onShowNotification} = this.props;
    return (
      <div>
        <NotificationSystem />
        <div className="example-container">
          <h1 className="example-title">Re-alert</h1>
          <div className="example-description">A light-weight notification framework for React and Redux.</div>
          <div className="example-settings">
            <div className="setting-line">
              <label className="setting-label" htmlFor="content">Message</label>
              <input type="text" id="content" className="control" value={message} onChange={e => onUpdateMessage(e.target.value)} />
            </div>
            <div className="setting-line">
              <label className="setting-label" htmlFor="level">Level</label>
              <select id="level" value={level} className="control" onChange={e => onUpdateLevel(e.target.value)}>
                <option value="info">Information</option>
                <option value="success">Success</option>
                <option value="warn">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div className="setting-line">
              <div className="setting-label">&nbsp;</div>
              <div className="control">
                <input
                  type="checkbox"
                  id="auto-close"
                  checked={autoClose}
                  onChange={e => onUpdateAutoClose(e.target.checked)}
                />
                <label htmlFor="auto-close">Automatically close after</label>
                <input
                  type="number"
                  min="1"
                  value={autoCloseDelay}
                  className="auto-close-number"
                  disabled={!autoClose}
                  onChange={e => onUpdateAutoCloseDelay(parseInt(e.target.value, 10))}
                />
                <label htmlFor="auto-close">seconds</label>
              </div>
            </div>
            <div className="settings-submit">
              <input
                type="button"
                value="Show Notification"
                onClick={() => onShowNotification(message, level, autoClose, autoCloseDelay)}
              />
            </div>
          </div>
          <div className="example-footer">
            Licensed under MIT
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  message: React.PropTypes.string.isRequired,
  level: React.PropTypes.string.isRequired,
  autoClose: React.PropTypes.bool.isRequired,
  autoCloseDelay: React.PropTypes.number.isRequired,
  onUpdateMessage: React.PropTypes.func.isRequired,
  onUpdateLevel: React.PropTypes.func.isRequired,
  onUpdateAutoClose: React.PropTypes.func.isRequired,
  onUpdateAutoCloseDelay: React.PropTypes.func.isRequired,
  onShowNotification: React.PropTypes.func.isRequired
};

const mapStateToProps = state => state.example;

const mapDispatchToProps = dispatch => ({
  onUpdateMessage: message => {
    dispatch(updateMessage(message));
  },
  onUpdateLevel: level => {
    dispatch(updateLevel(level));
  },
  onUpdateAutoClose: autoClose => {
    dispatch(updateAutoClose(autoClose));
  },
  onUpdateAutoCloseDelay: autoCloseDelay => {
    dispatch(updateAutoCloseDelay(autoCloseDelay));
  },
  onShowNotification: (message, level, autoClose, autoCloseDelay) => {
    dispatch(showNotification(message, level, autoClose, autoCloseDelay));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
