import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import '@mac/shared-ui/dist/style.css';

import App from './App';
import { StoreProvider } from '@/stores';

class RootComponent extends Component {
  render = () => (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
}

const domElementGetter = () => {
  let el = document.getElementById('app-core');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app-core';
    document.body.appendChild(el);
  }

  return el;
};

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: RootComponent,
  domElementGetter
});
