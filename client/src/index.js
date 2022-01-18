import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SetPaginate } from "./components/context/SetPaginate"
ReactDOM.render(
  <React.StrictMode>
    <SetPaginate>
      <Provider store={store}>
        <App />
      </Provider>
    </SetPaginate>
  </React.StrictMode>,
  document.getElementById('root')
);

