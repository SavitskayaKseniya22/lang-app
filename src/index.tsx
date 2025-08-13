import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { init, backButton } from '@telegram-apps/sdk-react';
import App from './App';
import Spinner from './components/spinner/Spinner';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';



import { store } from './store/store';

init();

// Mount the Back Button, so we will work with 
// the actual component properties.
backButton.mount();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Suspense fallback={<Spinner />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
