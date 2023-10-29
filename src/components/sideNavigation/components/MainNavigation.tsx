import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ScreenSize } from '../../../interfaces';

const StyledNavigation = styled('ul')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem 1rem 1rem;

  @media ${ScreenSize.TABLET} {
    flex-direction: column;
    padding: 1rem 0 1rem 1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
  align-items: center;
  font-family: 'Poppins', sans-serif;

  &.active {
    border-radius: 0 0 1.5rem 1.5rem;
    background-color: white;
    color: black;
  }

  span {
    display: none;
  }

  @media ${ScreenSize.TABLET} {
    &.active {
      border-radius: 1.5rem 0 0 1.5rem;
    }

    span {
      display: inline;
    }
  }
`;

function MainNavigation() {
  return (
    <StyledNavigation>
      <li>
        <StyledNavLink to="/" className="nav__link" title="Homepage">
          <i className="fa-solid fa-house" />
          <span>Homepage</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/text-book" className="nav__link" title="Textbook">
          <i className="fa-solid fa-book" />
          <span>Textbook</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/sprint" className="nav__link" title="Sprint">
          <i className="fa-solid fa-stopwatch" />
          <span>Sprint</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/audiocall" className="nav__link" title="Audiocall">
          <i className="fa-solid fa-music" />
          <span>Audiocall</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/puzzles" className="nav__link" title="Puzzles">
          <i className="fa-solid fa-puzzle-piece" />
          <span>Puzzles</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink
          to="/statistics"
          className="nav__link"
          title="Statistics"
        >
          <i className="fa-solid fa-table" />
          <span>Statistics</span>
        </StyledNavLink>
      </li>
    </StyledNavigation>
  );
}

export default MainNavigation;
