import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { browserHistory } from './history';
import AppRouter from './AppRouter';
import configureStore from "./state/configure_store";

import style from './App.module.scss';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <div className={style.app}>
          <AppRouter />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
