import React from 'react';

import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Page404 from './pages/404Page/Page404';
import ErrorPage from './pages/errorPage/ErrorPage';
import MainPage from './pages/mainPage/MainPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SideNavigation from './components/sideNavigation/SideNavigation';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} id="root" element={<Outlet />}>
      <Route
        element={
          <>
            <SideNavigation />
            <Header />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route index element={<MainPage />} />
        <Route path="/text-book" element={<div>a</div>} />
        <Route path="/sprint" element={<div>b</div>} />
        <Route path="/audio-challenge" element={<div>c</div>} />
        <Route path="/statistics" element={<div>d</div>} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
