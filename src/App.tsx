import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import Spinner from './components/spinner/Spinner';
import GlobalStyle from './styled/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} fallbackElement={<Spinner />} />
    </>
  );
}

export default App;
