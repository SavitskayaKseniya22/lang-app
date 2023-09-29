import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { gradientBackground } from '../../styled/SharedStyles';

const StyledSideNavigation = styled('nav')`
  ${gradientBackground}
  grid-area: 1 / 1 / 4 / 2;
  padding: 0.5rem;

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;

function SideNavigation() {
  return (
    <StyledSideNavigation>
      <ul className="nav-list">
        <li>
          <NavLink to="/">
            <i className="fa-solid fa-house" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/text-book">
            <i className="fa-solid fa-book" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/sprint">
            <i className="fa-solid fa-stopwatch" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/audio-challenge">
            <i className="fa-solid fa-music" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics">
            <i className="fa-solid fa-table" />
          </NavLink>
        </li>
      </ul>
    </StyledSideNavigation>
  );
}

export default SideNavigation;
