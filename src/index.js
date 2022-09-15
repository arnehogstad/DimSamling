import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/toolCard.css';
import './styles/toolList.css';
import './styles/toolArea.css';
import './styles/topBar.css';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
