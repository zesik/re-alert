# re-alert

[![Build Status](https://travis-ci.org/zesik/re-alert.svg?branch=master)](https://travis-ci.org/zesik/re-alert)
[![Coverage Status](https://coveralls.io/repos/github/zesik/re-alert/badge.svg?branch=master)](https://coveralls.io/github/zesik/re-alert?branch=master)
[![npm version](https://badge.fury.io/js/re-alert.svg)](https://badge.fury.io/js/re-alert)
[![devDependency Status](https://david-dm.org/zesik/re-alert/dev-status.svg)](https://david-dm.org/zesik/re-alert#info=devDependencies)

A light-weight web page notification system for React and Redux.

[Demo](https://zesik.com/re-alert/)

## Dependencies

Re-alert depends on React, Redux, Babel and webpack.

## Installation

```sh
$ npm install --save re-alert
```

## Integration

1. Include the reducer of notification system into your root reducer.

    ```js
    import { notificationReducer } from 're-alert';

    const rootReducer = combineReducers({
      ...
      notification: notificationReducer
    });

    export default rootReducer;
    ```

2. Since re-alert uses Redux `thunk` middleware to create async operations,
include `thunk` middleware when creating store.

    ```js
    import { createStore, applyMiddleware } from 'redux';
    import thunkMiddleware from 'redux-thunk';
    import rootReducer from './reducers';

    export default function configureStore(initialState) {
      return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
          thunkMiddleware
        )
      );
    };
    ```

3. Include the re-alert component into your application's JSX.

    ```jsx
    import NotificationSystem from 're-alert';

    const App = props => (
      <div>
        <NotificationSystem />
        ...
      </div>
    );
    ```

    To customize styles of notifications, include a custom class name for `NotificationSystem`.

    ```jsx
    <NotificationSystem customClassName="custom-class" />
    ```

    In CSS file, you can overwrite original CSS with `#notification-container.custom-class` selector.
    Refers to the [original stylesheet](src/stylesheets/notifications.css) to see what you can overwrite.

## Quick Example

You can show a success message in your action file like this.

```javascript
import { showSuccess } from 're-alert';

export function updateProfile() {
  return dispatch => {
    ...
    dispatch(showSuccess('Your profile has been updated.', 5000));
  };
}
```

## Available Actions

* `showInformation(message, autoCloseDelay);`
* `showSuccess(message, autoCloseDelay);`
* `showWarning(message, autoCloseDelay);`
* `showError(message, autoCloseDelay);`

These functions display messages with different level, and accept same arguments:

* `message` - The message to display.
* `autoCloseDelay` - Time before the notification automatically closes.
  Set to 0 to prevent notification to be closed automatically.

## Release History

* 0.1.0
  * First proper release.

## License

[MIT](LICENSE)
