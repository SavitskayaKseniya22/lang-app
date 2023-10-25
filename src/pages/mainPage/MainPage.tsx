import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { gradientBorderContainer } from '../../styled/SharedStyles';

const StyledMainPage = styled('main')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 5rem;

  .feature-list {
    display: flex;
    gap: 2rem;
    width: 100%;

    &.feature-list_first {
      justify-content: flex-start;
      align-items: flex-end;
    }
    &.feature-list_second {
      justify-content: flex-end;
      align-items: flex-start;
    }
  }

  .feature {
    max-width: 25%;
    display: flex;
    ${gradientBorderContainer}

    .feature__link {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 1rem;
      border-radius: 1rem;
      gap: 1rem;
      position: relative;
      color: black;
      text-align: center;

      i {
        color: rgba(0, 0, 0, 0.5);
        position: absolute;
        right: 1rem;
        top: 1rem;
      }
    }
  }
`;

function MainPage() {
  return (
    <StyledMainPage>
      <ul className="feature-list feature-list_first">
        <li className="feature">
          <NavLink to="/audiocall" className="feature__link">
            <i className="fa-solid fa-music" />
            <h3>Audio Challenge</h3>
            <p>
              Train your ears as well as your eyes to recognise english speech!
            </p>
          </NavLink>
        </li>
        <li className="feature">
          <NavLink to="/sprint" className="feature__link">
            <i className="fa-solid fa-stopwatch" />
            <h3>Sprint</h3>
            <p>
              Challenge your wit and knowledge in a fast paced and rewarding
              guessing game!
            </p>
          </NavLink>
        </li>
        <li className="feature">
          <NavLink to="/puzzles" className="feature__link">
            <i className="fa-solid fa-puzzle-piece" />
            <h3>Puzzles</h3>

            <p>
              Make puzzles from a set of words. Score more points in the given
              time.
            </p>
          </NavLink>
        </li>
      </ul>
      <h1>Awesome language learning app</h1>
      <ul className="feature-list feature-list_second">
        <li className="feature">
          <NavLink to="/text-book" className="feature__link">
            <i className="fa-solid fa-book" />
            <h3>Textbook</h3>
            <p>
              3600 of the most commonly used english words are organised in 6
              sections for a convenient and measured learning experience.
              Don&apos;t hesitate to mark words as &quot;difficult&quot; or
              &quot;learned to better track your progress!&quot;
            </p>
          </NavLink>
        </li>

        <li className="feature">
          <NavLink to="/statistics" className="feature__link">
            <i className="fa-solid fa-table" />
            <h3>Statistics</h3>
            <p>
              Your progress is monitored and logged. Be sure to take a look at
              it once in a while to make sure you are on track! Available only
              for authorized users.
            </p>
          </NavLink>
        </li>
      </ul>
    </StyledMainPage>
  );
}

export default MainPage;
