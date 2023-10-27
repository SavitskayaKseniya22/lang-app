import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { gradientBackground } from '../../styled/SharedStyles';
import gitHubLogo from '../../assets/images/png/GitHub_Logo_White.png';

const StyledSideNavigation = styled('nav')`
  ${gradientBackground}
  grid-area: 1 / 1 / 4 / 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    padding: 1rem 0 1rem 1rem;

    li {
      width: 100%;
    }

    a {
      color: white;
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      border-radius: 1.5rem 0 0 1.5rem;
      font-family: 'Poppins', sans-serif;

      i {
        font-size: 1rem;
      }

      &.active {
        background-color: white;
        color: black;
      }
    }
  }

  img {
    width: 4rem;
  }
`;

function SideNavigation() {
  return (
    <StyledSideNavigation>
      <ul className="nav-list">
        <li>
          <NavLink to="/">
            <i className="fa-solid fa-house" />
            Homepage
          </NavLink>
        </li>
        <li>
          <NavLink to="/text-book">
            <i className="fa-solid fa-book" />
            Textbook
          </NavLink>
        </li>
        <li>
          <NavLink to="/sprint">
            <i className="fa-solid fa-stopwatch" />
            Sprint
          </NavLink>
        </li>
        <li>
          <NavLink to="/audiocall">
            <i className="fa-solid fa-music" />
            Audiocall
          </NavLink>
        </li>
        <li>
          <NavLink to="/puzzles">
            <i className="fa-solid fa-puzzle-piece" />
            Puzzles
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics">
            <i className="fa-solid fa-table" />
            Statistics
          </NavLink>
        </li>
      </ul>

      <Link
        className="logo_github"
        to="https://github.com/SavitskayaKseniya22"
        target="blank"
        title="Developer's GitHub"
      >
        <img src={gitHubLogo} alt="gitHub" />
      </Link>
    </StyledSideNavigation>
  );
}

export default SideNavigation;
