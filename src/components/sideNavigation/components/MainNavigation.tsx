import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ScreenSize } from '../../../interfaces';
import { useAppSelector } from '../../../store/store';
import SignInControl from './SignInControl';

const StyledNavigation = styled('ul')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem 1rem 1rem;
  font-size: 1.25rem;

  span {
    display: none;
  }

  @media ${ScreenSize.TABLET} {
    flex-direction: column;
    padding: 1rem 0 1rem 1rem;
    font-size: 1rem;

    span {
      display: inline;
    }
  }
`;

const StyledNavigationSub = styled('ul')`
  display: none;

  @media ${ScreenSize.TABLET} {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0.5rem 0 0.5rem 1rem;
    gap: 0.5rem;
    font-size: 0.8rem;
  }
`;

const StyledNavLink = styled(NavLink)<{ $type?: 'SUB' }>`
  color: ${(props) => (props.$type === 'SUB' ? 'rgb(42, 157, 143)' : 'white')};
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;

  &.active {
    border-radius: 0 0 0.5rem 0.5rem;
    background-color: ${(props) =>
      props.$type === 'SUB' ? 'rgb(42, 157, 143)' : 'white'};
    color: ${(props) =>
      props.$type === 'SUB' ? 'white' : 'rgb(231, 111, 81)'};
  }

  @media ${ScreenSize.TABLET} {
    &.active {
      border-radius: 0.5rem 0 0 0.5rem;
    }
  }
`;

function MainNavigation() {
  const { user } = useAppSelector((state) => state.persist.auth);

  return (
    <StyledNavigation>
      <li>
        <StyledNavLink to="/" title="Homepage">
          <i className="fa-solid fa-house" />
          <span>Homepage</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/text-book" title="Textbook">
          <i className="fa-solid fa-book" />
          <span>Textbook</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/games" title="Games">
          <i className="fa-solid fa-puzzle-piece" />
          <span>Games</span>
        </StyledNavLink>
        <StyledNavigationSub>
          <li>
            <StyledNavLink to="/games/sprint" title="Sprint" $type="SUB">
              <i className="fa-solid fa-stopwatch" />
              <span>Sprint</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/games/audiocall" title="Audiocall" $type="SUB">
              <i className="fa-solid fa-music" />
              <span>Audiocall</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/games/puzzles" title="Puzzles" $type="SUB">
              <i className="fa-solid fa-puzzle-piece" />
              <span>Puzzles</span>
            </StyledNavLink>
          </li>
        </StyledNavigationSub>
      </li>

      <li>
        {user ? (
          <>
            <StyledNavLink to="/profile" title="Profile">
              <i className="fa-solid fa-user" />
              <span>Profile</span>
            </StyledNavLink>

            <StyledNavigationSub>
              <li>
                <StyledNavLink
                  to="/profile/collection"
                  title="Collection"
                  $type="SUB"
                >
                  <i className="fa-regular fa-folder" />
                  <span>Collection</span>
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink
                  to="/profile/statistics"
                  title="Statistics"
                  $type="SUB"
                >
                  <i className="fa-solid fa-table" />
                  <span>Statistics</span>
                </StyledNavLink>
              </li>
            </StyledNavigationSub>
          </>
        ) : (
          <SignInControl />
        )}
      </li>
    </StyledNavigation>
  );
}

export default MainNavigation;
