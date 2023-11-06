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
import ModalProvider from './components/modal/ModalProvider';
import Collection from './pages/collection/Collection';
import ResultContextProvider from './pages/sprint/components/ResultContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} id="root" element={<Outlet />}>
      <Route
        element={
          <ModalProvider>
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
          </ModalProvider>
        }
      >
        <Route index element={<MainPage />} />
        <Route path="/text-book" element={<TextBookPage />} />
        <Route path="/sprint">
          <Route
            index
            element={
              <GameLayout type={GameType.SPRINT}>
                <GroupPicker />
              </GameLayout>
            }
          />
          <Route path="game" element={<ResultContextProvider />}>
            <Route index element={<Sprint />} />
            <Route path="result" element={<GameResult />} />
          </Route>
        </Route>

        <Route path="/puzzles">
          <Route
            index
            element={
              <GameLayout type={GameType.PUZZLES}>
                <GroupPicker />
              </GameLayout>
            }
          />
          <Route path="game" element={<ResultContextProvider />}>
            <Route index element={<Puzzles />} />
            <Route path="result" element={<div>result</div>} />
          </Route>
        </Route>

        <Route path="/audiocall">
          <Route
            index
            element={
              <GameLayout type={GameType.AUDIOCALL}>
                <GroupPicker />
              </GameLayout>
            }
          />
          <Route path=":group">
            <Route index element={<Audiocall />} />
          </Route>
        </Route>

        <Route path="/statistics" element={<div>d</div>} />
        <Route path="/collection" element={<Collection />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Route>
  )
);

export default router;
