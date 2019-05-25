import React from 'react';
import { Router } from 'react-router-dom';

import logo from './logo.svg';
import { browserHistory } from './history';
import AppRouter from './AppRouter';

import style from './App.module.scss';

function App() {
  return (
    <Router history={browserHistory}>
      <div className={style.app}>
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
