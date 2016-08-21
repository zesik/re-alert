import expect from 'expect';
import reducer from '../src/reducers';
import * as constants from '../src/constants';

describe('Re-alert reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ notifications: [] });
  });

  it('should handle APPEND_NOTIFICATION', () => {
    expect(
      reducer({ notifications: [] }, {
        type: constants.APPEND_NOTIFICATION,
        id: 0,
        level: constants.NOTIFICATION_INFORMATION,
        message: 'test message'
      }))
    .toEqual({
      notifications: [
        {
          id: 0,
          level: constants.NOTIFICATION_INFORMATION,
          message: 'test message'
        }
      ]
    });

    expect(
      reducer({
        notifications: [
          {
            id: 0,
            level: constants.NOTIFICATION_INFORMATION,
            message: 'original message'
          }
        ]
      }, {
        type: constants.APPEND_NOTIFICATION,
        id: 1,
        level: constants.NOTIFICATION_INFORMATION,
        message: 'new message'
      }))
    .toEqual({
      notifications: [
        {
          id: 0,
          level: constants.NOTIFICATION_INFORMATION,
          message: 'original message'
        },
        {
          id: 1,
          level: constants.NOTIFICATION_INFORMATION,
          message: 'new message'
        }
      ]
    });
  });

  it('should handle REMOVE_NOTIFICATION', () => {
    expect(
      reducer({
        notifications: [
          {
            id: 0,
            level: constants.NOTIFICATION_INFORMATION,
            message: 'message 1'
          },
          {
            id: 1,
            level: constants.NOTIFICATION_INFORMATION,
            message: 'message 2'
          }
        ]
      }, { type: constants.REMOVE_NOTIFICATION, id: 0 }))
    .toEqual({
      notifications: [
        {
          id: 1,
          level: constants.NOTIFICATION_INFORMATION,
          message: 'message 2'
        }
      ]
    });

    expect(
      reducer({
        notifications: [
          {
            id: 0,
            level: constants.NOTIFICATION_INFORMATION,
            message: 'message 1'
          },
          {
            id: 1,
            level: constants.NOTIFICATION_INFORMATION,
            message: 'message 2'
          }
        ]
      }, { type: constants.REMOVE_NOTIFICATION, id: 2 }))
    .toEqual({
      notifications: [
        {
          id: 0,
          level: constants.NOTIFICATION_INFORMATION,
          message: 'message 1'
        },
        {
          id: 1,
          level: constants.NOTIFICATION_INFORMATION,
          message: 'message 2'
        }
      ]
    });

    expect(
      reducer({ notifications: [] }, {
        type: constants.REMOVE_NOTIFICATION,
        id: 0
      }))
    .toEqual({ notifications: [] });
  });
});
