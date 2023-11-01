import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { NavArrow } from './component/NavArrow';
import { ScreenSize } from '../../interfaces';

const StyledMainPage = styled('main')`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  flex-grow: 22;

  p {
    font-weight: 300;
    font-size: 1rem;
    color: black;
    line-height: 150%;
  }

  h2 {
    margin: 1rem 0;
  }

  i {
    font-size: 2rem;
    color: rgb(38, 70, 83);
  }

  a {
    color: rgb(42, 157, 143);
  }
`;

export const StyledMainPageBlock = css`
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${ScreenSize.LAPTOPS} {
    padding: 3rem;
  }
`;

const StyledMainPageFirstScreen = styled('div')`
  ${StyledMainPageBlock}
  gap: 2rem;

  h1 {
    margin: 2rem 0;
    color: rgb(231, 111, 81);
  }
`;

const StyledMainPageGamesList = styled('ul')`
  ${StyledMainPageBlock}
  gap: 5rem;
  background-color: rgba(233, 197, 106, 0.1);
`;

const StyledMainPageFeatureList = styled('ul')`
  ${StyledMainPageBlock}
  gap: 2rem;
`;

function MainPage() {
  return (
    <StyledMainPage>
      <NavArrow />
      <StyledMainPageFirstScreen id="section-0">
        <h1>Awesome language learning app</h1>
        <a href="#section-1">Learn English by playing games</a>
      </StyledMainPageFirstScreen>
      <StyledMainPageGamesList id="section-1">
        <li className="feature">
          <NavLink to="/audiocall">
            <h2>Audio Challenge</h2>
            <p>
              Train your ears as well as your eyes to recognise english speech!
            </p>
          </NavLink>
        </li>
        <li className="feature">
          <NavLink to="/sprint">
            <h2>Sprint</h2>
            <p>
              Challenge your wit and knowledge in a fast paced and rewarding
              guessing game!
            </p>
          </NavLink>
        </li>
        <li className="feature">
          <NavLink to="/puzzles">
            <h2>Puzzles</h2>
            <p>
              Make puzzles from a set of words. Score more points in the given
              time.
            </p>
          </NavLink>
        </li>
      </StyledMainPageGamesList>
      <StyledMainPageFeatureList id="section-2">
        <li>
          <h2>
            Use
            <NavLink to="/text-book"> the Textbook </NavLink>
            to understand the meaning of the word
          </h2>
          <p>
            3600 of the most commonly used english words are organised in 6
            sections for a convenient and measured learning experience.
            Don&apos;t hesitate to mark words as &quot;difficult&quot; or
            &quot;learned to better track your progress!&quot;
          </p>
        </li>
        <li>
          <h2>
            Track your progress in{' '}
            <NavLink to="/statistics">Statistics</NavLink>
          </h2>
          <p>
            Your progress is monitored and logged. Be sure to take a look at it
            once in a while to make sure you are on track! Available only for
            authorized users.
          </p>
        </li>
      </StyledMainPageFeatureList>
    </StyledMainPage>
  );
}

export default MainPage;
