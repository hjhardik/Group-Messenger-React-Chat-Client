import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import 'typeface-roboto/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import './index.css';

const rootEl = document.getElementById('root');

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootEl,
  );
};

render(App);

// Hot Module Replacement (or HMR) is one of the most useful features offered by webpack
// It allows all kinds of modules to be updated at runtime without the need for a full refresh
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}

registerServiceWorker();
