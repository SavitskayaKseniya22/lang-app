import React from 'react';
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ErrorPage from './pages/errorPage/ErrorPage';
import MainPage from './pages/mainPage/MainPage';
import TextBookPage from './pages/textBookPage/TextBookPage';
import Sprint from './pages/sprint/Sprint';
import Audiocall from './pages/audiocall/Audiocall';
import { GameDifficultyType, GameType } from './interfaces';
import GameResult from './pages/game/components/GameResult';
import Puzzles from './pages/sentences/Puzzles';
import SidePanel from './components/sideNavigation/SidePanel';
import ModalProvider from './components/modal/ModalProvider';
import Collection from './pages/collection/Collection';
import GitHubLink from './components/sideNavigation/components/GitHubLink';
import Profile from './pages/Profile/Profile';
import Games from './pages/Games/Games';
import PrivateRoute from './components/PrivateRoute';
import GameStartScreen, {
  GameInitialData,
} from './pages/sentences/components/GameStartScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} id="root" element={<Outlet />}>
      <Route
        element={
          <ModalProvider>
            <SidePanel />
            <Outlet />
            <GitHubLink />
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
          </ModalProvider>
        }
      >
        <Route index element={<MainPage />} />
        <Route path="/text-book" element={<TextBookPage />} />

        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
          <Route path="statistics" element={<div>statistics</div>} />
          <Route path="collection" element={<Collection />} />
        </Route>

        <Route path="/games">
          <Route index element={<Games />} />
          <Route path="sprint" element={<GameInitialData />}>
            <Route
              index
              element={
                <GameStartScreen
                  value={GameDifficultyType.SPRINT}
                  type={GameType.SPRINT}
                />
              }
            />
            <Route path="game" element={<Sprint />} />
            <Route path="result" element={<GameResult />} />
          </Route>

          <Route path="puzzles" element={<GameInitialData />}>
            <Route
              index
              element={
                <GameStartScreen
                  value={GameDifficultyType.PUZZLES}
                  type={GameType.PUZZLES}
                />
              }
            />
            <Route path="game" element={<Puzzles />} />
            <Route path="result" element={<div>result</div>} />
          </Route>

          <Route path="audiocall">
            <Route
              index
              element={
                <GameStartScreen
                  value={GameDifficultyType.AUDIOCALL}
                  type={GameType.AUDIOCALL}
                />
              }
            />
            <Route path=":group">
              <Route index element={<Audiocall />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Route>
  )
);

export default router;
