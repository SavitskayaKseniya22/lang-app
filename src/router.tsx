import React from 'react';
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Page404 from './pages/404Page/Page404';
import ErrorPage from './pages/errorPage/ErrorPage';
import MainPage from './pages/mainPage/MainPage';
import TextBookPage from './pages/textBookPage/TextBookPage';
import Sprint from './pages/sprint/Sprint';
import Audiocall from './pages/audiocall/Audiocall';
import { GameType } from './interfaces';
import GameResult from './pages/game/GameResult';
import Puzzles from './pages/sentences/Puzzles';
import SidePanel from './components/sideNavigation/SidePanel';
import Footer from './components/footer/Footer';
import GameLayout from './pages/game/components/GameLayout';
import GroupPicker from './pages/game/components/GroupPicker';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} id="root" element={<Outlet />}>
      <Route
        element={
          <>
            <SidePanel />
            <Outlet />
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </>
        }
      >
        <Route index element={<MainPage />} />
        <Route path="/text-book" element={<TextBookPage />} />
        <Route path="/sprint" element={<GameLayout type={GameType.SPRINT} />}>
          <Route index element={<GroupPicker />} />
          <Route path=":group">
            <Route index element={<Sprint />} />
          </Route>
        </Route>
        <Route path="/puzzles" element={<GameLayout type={GameType.PUZZLES} />}>
          <Route index element={<Puzzles />} />
        </Route>
        <Route
          path="/audiocall"
          element={<GameLayout type={GameType.AUDIOCALL} />}
        >
          <Route index element={<GroupPicker />} />
          <Route path=":group">
            <Route index element={<Audiocall />} />
          </Route>
        </Route>
        <Route path="result" element={<GameResult />} />
        <Route path="/statistics" element={<div>d</div>} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
