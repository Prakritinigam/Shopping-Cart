import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { Context } from './Context';
import reportWebVitals from './reportWebVitals';

const initialState = {
  theme: "white"
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case "THEME CHANGED":
      return {
        theme: action.payload,
      }
      default:
        return state;
  }
}
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Context>
        <App />
      </Context>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
