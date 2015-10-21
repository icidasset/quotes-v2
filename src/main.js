import 'babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import store from './main-store';
import App from './containers/App';


// const debugPanel = (
//   <DebugPanel top right bottom>
//     <DevTools store={store} monitor={LogMonitor} />
//   </DebugPanel>
// );


store.subscribe(() => {
  const state = store.getState();
  const windowPath = window.location.pathname.replace(/\/*$/, '');

  if (state.routing.path && windowPath !== state.routing.path) {
    window.history.pushState({}, document.title, state.routing.path + '/');
  }
});


render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
