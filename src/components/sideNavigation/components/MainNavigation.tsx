import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ScreenSize } from '../../../interfaces';
import { useAppSelector } from '../../../store/store';
import SignInControl from '../../auth/components/SignInControl';

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

const StyledNavigationItem = styled('li')`
  &.hidden_mobile {
    display: none;
  }

  span {
    display: none;
  }

  font-size: 1.25rem;

  @media ${ScreenSize.TABLET} {
    &.hidden_mobile {
      display: block;
      font-size: small;
      margin-left: 1rem;

      a {
        color: rgb(42, 157, 143);
      }
    }

    &.hidden_desktop {
      display: none;
    }

    span {
      display: inline;
    }

    font-size: 1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  &.active {
    border-radius: 0 0 1.5rem 1.5rem;
    background-color: white;
    color: rgb(231, 111, 81);
  }

  @media ${ScreenSize.TABLET} {
    &.active {
      border-radius: 1.5rem 0 0 1.5rem;
    }
  }
`;

function MainNavigation() {
  const { user } = useAppSelector((state) => state.persist.auth);

  return (
    <StyledNavigation>
      <StyledNavigationItem>
        <StyledNavLink to="/" title="Homepage">
          <i className="fa-solid fa-house" />
          <span>Homepage</span>
        </StyledNavLink>
      </StyledNavigationItem>
      <StyledNavigationItem>
        <StyledNavLink to="/text-book" title="Textbook">
          <i className="fa-solid fa-book" />
          <span>Textbook</span>
        </StyledNavLink>
      </StyledNavigationItem>
      <StyledNavigationItem>
        <StyledNavLink to="/games" title="Games">
          <i className="fa-solid fa-puzzle-piece" />
          <span>Games</span>
        </StyledNavLink>
      </StyledNavigationItem>
      <StyledNavigationItem className="hidden_mobile">
        <StyledNavLink to="/games/sprint" title="Sprint">
          <i className="fa-solid fa-stopwatch" />
          <span>Sprint</span>
        </StyledNavLink>
      </StyledNavigationItem>

      <StyledNavigationItem className="hidden_mobile">
        <StyledNavLink to="/games/audiocall" title="Audiocall">
          <i className="fa-solid fa-music" />
          <span>Audiocall</span>
        </StyledNavLink>
      </StyledNavigationItem>

      <StyledNavigationItem className="hidden_mobile">
        <StyledNavLink to="/games/puzzles" title="Puzzles">
          <i className="fa-solid fa-puzzle-piece" />
          <span>Puzzles</span>
        </StyledNavLink>
      </StyledNavigationItem>

      <StyledNavigationItem>
        {user ? (
          <StyledNavLink to="/profile" title="Profile">
            <i className="fa-solid fa-user" />
            <span>Profile</span>
          </StyledNavLink>
        ) : (
          <SignInControl />
        )}
      </StyledNavigationItem>

      {user && (
        <>
          <StyledNavigationItem className="hidden_mobile">
            <StyledNavLink to="/profile/collection" title="Collection">
              <i className="fa-regular fa-folder" />
              <span>Collection</span>
            </StyledNavLink>
          </StyledNavigationItem>
          <StyledNavigationItem className="hidden_mobile">
            <StyledNavLink to="/profile/statistics" title="Statistics">
              <i className="fa-solid fa-table" />
              <span>Statistics</span>
            </StyledNavLink>
          </StyledNavigationItem>
        </>
      )}
    </StyledNavigation>
  );
}

export default MainNavigation;
