import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as actions from '../src/actions';
import * as constants from '../src/constants';
import expect from 'expect';

const mockStore = configureMockStore([thunkMiddleware]);
let notificationID = 0;
const getNotificationID = () => notificationID++;

describe('Re-alert actions', () => {
  afterEach(() => {
    expect.restoreSpies();
  });

  it('should dispatch different ID for different notification', () => {
    const id1 = getNotificationID();
    const id2 = getNotificationID();
    const store = mockStore({ notifications: [] });
    const expectedActions = [
      {
        type: constants.APPEND_NOTIFICATION,
        id: id1,
        level: constants.NOTIFICATION_INFORMATION,
        message: 'test message'
      },
      {
        type: constants.APPEND_NOTIFICATION,
        id: id2,
        level: constants.NOTIFICATION_INFORMATION,
        message: 'test message 2'
      }
    ];
    store.dispatch(actions.showInformation('test message'));
    store.dispatch(actions.showInformation('test message 2'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch action to show information message', () => {
    const id = getNotificationID();
    const store = mockStore({ notifications: [] });
    const expectedActions = [
      {
        type: constants.APPEND_NOTIFICATION,
        id,
        level: constants.NOTIFICATION_INFORMATION,
        message: 'test message'
      }
    ];
    store.dispatch(actions.showInformation('test message'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch action to show success message', () => {
    const id = getNotificationID();
    const store = mockStore({ notifications: [] });
    const expectedActions = [
      {
        type: constants.APPEND_NOTIFICATION,
        id,
        level: constants.NOTIFICATION_SUCCESS,
        message: 'test message'
      }
    ];
    store.dispatch(actions.showSuccess('test message'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch action to show warning message', () => {
    const id = getNotificationID();
    const store = mockStore({ notifications: [] });
    const expectedActions = [
      {
        type: constants.APPEND_NOTIFICATION,
        id,
        level: constants.NOTIFICATION_WARNING,
        message: 'test message'
      }
    ];
    store.dispatch(actions.showWarning('test message'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch action to show error message', () => {
    const id = getNotificationID();
    const store = mockStore({ notifications: [] });
    const expectedActions = [
      {
        type: constants.APPEND_NOTIFICATION,
        id,
        level: constants.NOTIFICATION_ERROR,
        message: 'test message'
      }
    ];
    store.dispatch(actions.showError('test message'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should not dispatch action to close notification when not requested', () => {
    const id = getNotificationID();
    const store = mockStore({ notifications: [] });
    const spy = expect.spyOn(global, 'setTimeout');
    const expectedActions = [
      {
        type: constants.APPEND_NOTIFICATION,
        id,
        level: constants.NOTIFICATION_ERROR,
        message: 'test message'
      }
    ];
    expect(store.dispatch(actions.showError('test message'))).toEqual(false);
    expect(spy).toNotHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should not dispatch action to close notification when argument is invalid', () => {
    const id = getNotificationID();
    const store = mockStore({ notifications: [] });
    const spy = expect.spyOn(global, 'setTimeout');
    const expectedActions = [
      {
        type: constants.APPEND_NOTIFICATION,
        id,
        level: constants.NOTIFICATION_ERROR,
        message: 'test message'
      }
    ];
    expect(store.dispatch(actions.showError('test message', -1))).toEqual(false);
    expect(spy).toNotHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch action to close notification when requested', done => {
    const id = getNotificationID();
    const store = mockStore({ notifications: [] });
    const spy = expect.spyOn(global, 'setTimeout').andCallThrough();
    const expectedActions = [
      {
        type: constants.APPEND_NOTIFICATION,
        id,
        level: constants.NOTIFICATION_ERROR,
        message: 'test message'
      },
      {
        type: constants.REMOVE_NOTIFICATION,
        id
      }
    ];
    expect(store.dispatch(actions.showError('test message', 50))).toEqual(true);
    expect(spy.calls.length).toEqual(1);
    expect(spy.calls[0].arguments[1]).toEqual(50);
    expect(store.getActions()).toEqual([expectedActions[0]]);
    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 100);
  });
});
