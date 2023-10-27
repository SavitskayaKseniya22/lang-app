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
import TextBookPage from './pages/textBookPage/TextBookPage';
import Game from './pages/game/Game';
import Sprint from './pages/sprint/Sprint';
import Audiocall from './pages/audiocall/Audiocall';
import { GameType } from './interfaces';
import GameResult from './pages/game/GameResult';

import Puzzles from './pages/sentences/Puzzles';

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
        <Route path="/text-book" element={<TextBookPage />} />

        <Route path="/sprint">
          <Route index element={<Game type={GameType.SPRINT} />} />
          <Route path=":group">
            <Route index element={<Sprint />} />
            <Route path="result" element={<GameResult />} />
          </Route>
        </Route>

        <Route path="/puzzles">
          <Route index element={<Game type={GameType.PUZZLES} />} />
          <Route path=":group">
            <Route index element={<Puzzles />} />
            <Route path="result" element={<GameResult />} />
          </Route>
        </Route>

        <Route path="/audiocall">
          <Route index element={<Game type={GameType.AUDIOCALL} />} />
          <Route path=":group">
            <Route index element={<Audiocall />} />
            <Route path="result" element={<GameResult />} />
          </Route>
        </Route>
        <Route path="/statistics" element={<div>d</div>} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
