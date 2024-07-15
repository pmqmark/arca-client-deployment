import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/Store.js"
import { Provider } from 'react-redux';
import 'react-calendar/dist/Calendar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <ToastContainer />
      <App />
    </PersistGate>
  </Provider>
);

