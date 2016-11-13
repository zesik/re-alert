# re-alert

[![Build Status](https://travis-ci.org/zesik/re-alert.svg?branch=master)](https://travis-ci.org/zesik/re-alert)
[![Coverage Status](https://coveralls.io/repos/github/zesik/re-alert/badge.svg?branch=master)](https://coveralls.io/github/zesik/re-alert?branch=master)
[![npm version](https://badge.fury.io/js/re-alert.svg)](https://badge.fury.io/js/re-alert)
[![devDependency Status](https://david-dm.org/zesik/re-alert/dev-status.svg)](https://david-dm.org/zesik/re-alert#info=devDependencies)
[![devDependency Status](https://david-dm.org/zesik/re-alert/peer-status.svg)](https://david-dm.org/zesik/re-alert#info=devDependencies)

A light-weight web page notification system for React and Redux.

[Demo](https://zesik.com/re-alert/)

## Dependencies

Re-alert depends on React and Redux. See [package.json](package.json) for more details.

## Installation

```sh
$ npm install --save re-alert
```

## Testing

To run tests, execute `test` script with `npm`.

```sh
$ npm run test
```

To run coverage tests, execute `coverage` script with `npm`.

```sh
$ npm run coverage
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
    }
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

    * To customize styles of notifications, include a custom class name for `NotificationSystem`.

      ```jsx
      <NotificationSystem customClassName="custom-class" />
      ```

      In CSS file, you can override original CSS with `#notification-container.custom-class` selector.
      Refer to the [original stylesheet](src/stylesheets/notifications.css) to see what you can override.

    * To allow HTMLs in all notifications, set `dangerouslyAllowHTML` prop to `true` for `NotificationSystem`.

      ```jsx
      <NotificationSystem dangerouslyAllowHTML={true} />
      ```

      Allowing HTML is risky as it may open your site to [cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) attack.
      Sanitize data before use it directly when allowing HTML.

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

* 0.3.0
  * Support HTML in notifications.
* 0.2.0
  * NPM package now only contains minified JS.
* 0.1.0
  * First proper release.

## License

[MIT](LICENSE)
