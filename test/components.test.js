import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TestUtils from 'react-addons-test-utils';
import NotificationItem from '../src/components/NotificationItem';
import { NotificationSystem } from '../src/containers/NotificationSystem';
import * as constants from '../src/constants';

function setupNotificationItem(id, level, message) {
  const props = { id, level, message, onClose: expect.createSpy() };
  const renderer = TestUtils.createRenderer();
  renderer.render(<NotificationItem {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}

function setupNotificationSystem(notifications, customClassName) {
  const props = { notifications, customClassName, onCloseNotification: expect.createSpy() };
  const renderer = TestUtils.createRenderer();
  renderer.render(<NotificationSystem {...props} />);
  const output = renderer.getRenderOutput();
  return { props, output, renderer };
}

describe('Re-alert component', () => {
  describe('NotificationItem', () => {
    it('should render information notification', () => {
      const { output } = setupNotificationItem(0, constants.NOTIFICATION_INFORMATION, 'test message');

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('notification-item notification-information');

      const [close, content] = output.props.children;

      expect(close.type).toBe('div');
      expect(close.props.className).toBe('notification-close');

      expect(content.type).toBe('div');
      expect(content.props.className).toBe('notification-content');
      expect(content.props.children).toBe('test message');
    });

    it('should render success notification', () => {
      const { output } = setupNotificationItem(0, constants.NOTIFICATION_SUCCESS, 'test message');

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('notification-item notification-success');

      const [close, content] = output.props.children;

      expect(close.type).toBe('div');
      expect(close.props.className).toBe('notification-close');

      expect(content.type).toBe('div');
      expect(content.props.className).toBe('notification-content');
      expect(content.props.children).toBe('test message');
    });

    it('should render warning notification', () => {
      const { output } = setupNotificationItem(0, constants.NOTIFICATION_WARNING, 'test message');

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('notification-item notification-warning');

      const [close, content] = output.props.children;

      expect(close.type).toBe('div');
      expect(close.props.className).toBe('notification-close');

      expect(content.type).toBe('div');
      expect(content.props.className).toBe('notification-content');
      expect(content.props.children).toBe('test message');
    });

    it('should render error notification', () => {
      const { output } = setupNotificationItem(0, constants.NOTIFICATION_ERROR, 'test message');

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('notification-item notification-error');

      const [close, content] = output.props.children;

      expect(close.type).toBe('div');
      expect(close.props.className).toBe('notification-close');

      expect(content.type).toBe('div');
      expect(content.props.className).toBe('notification-content');
      expect(content.props.children).toBe('test message');
    });

    it('should render defalt notification', () => {
      const { output } = setupNotificationItem(0, '', 'test message');

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('notification-item');

      const [close, content] = output.props.children;

      expect(close.type).toBe('div');
      expect(close.props.className).toBe('notification-close');

      expect(content.type).toBe('div');
      expect(content.props.className).toBe('notification-content');
      expect(content.props.children).toBe('test message');
    });

    it('should call onClose method', () => {
      const { output, props } = setupNotificationItem(0, '', 'test message');
      const close = output.props.children[0];
      close.props.onClick();
      expect(props.onClose.calls.length).toBe(1);
    });
  });

  describe('NotificationSystem', () => {
    it('should render notification system', () => {
      const { output } = setupNotificationSystem([]);
      expect(output.type).toBe('div');
      expect(output.props.id).toBe('notification-container');
      expect(output.props.className).toBe(undefined);
      expect(output.props.children.props.children.length).toBe(0);
    });

    it('should render notification system with custom class', () => {
      const { output } = setupNotificationSystem([], 'custom-class');
      expect(output.type).toBe('div');
      expect(output.props.id).toBe('notification-container');
      expect(output.props.className).toBe('custom-class');
      expect(output.props.children.props.children.length).toBe(0);
    });

    it('should render notification system with childrens', () => {
      const { output } = setupNotificationSystem([{ id: 0, message: 'test', level: '' }], 'custom-class');
      expect(output.type).toBe('div');
      expect(output.props.id).toBe('notification-container');
      expect(output.props.className).toBe('custom-class');
      expect(output.props.children.props.children.length).toBe(1);
    });

    it('should call onCloseNotification method', () => {
      const { output, props } = setupNotificationSystem([{ id: 0, message: 'test', level: '' }], 'custom-class');
      expect(output.type).toBe('div');
      expect(output.props.id).toBe('notification-container');
      expect(output.props.className).toBe('custom-class');
      expect(output.props.children.props.children.length).toBe(1);
      output.props.children.props.children[0].props.onClose(0);
      expect(props.onCloseNotification.calls.length).toBe(1);
    });
  });
});
