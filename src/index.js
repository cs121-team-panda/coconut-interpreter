// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import CssBaseline from 'material-ui/CssBaseline';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import reducers from './store/reducers';
import sagas from './store/sagas';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();

const createApp = store => (
  <>
    <Helmet>
      <title>Coconut Interpreter</title>
      <meta name="fragment" content="!" />
      <meta name="description" content="Online Coconut interpreter." />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Helmet>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
const initialState = fromJS({});
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers,
  }),
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(sagas);
ReactDOM.render(createApp(store), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
