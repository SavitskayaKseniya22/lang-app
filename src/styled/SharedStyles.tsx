import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { NumberDivisibility } from '../interfaces';

export const gradientBackground = css`
  background: linear-gradient(
    -30deg,
    rgb(38, 70, 83) 20%,
    rgb(42, 157, 143) 40%,
    rgb(244, 162, 97) 60%,
    rgb(231, 111, 81) 80%,
    rgb(233, 196, 106) 100%
  );
`;

export const StyledMain = styled('main')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  flex-grow: 2;
  min-width: 320px;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const StyledParagraph = styled('p')<{ $type?: NumberDivisibility }>`
  font-weight: 300;
  line-height: 150%;
`;

export const StyledSpan = styled('span')<{ $type?: NumberDivisibility }>`
  font-weight: 300;
  line-height: 150%;
  color: ${(props) =>
    props.$type === NumberDivisibility.ODD
      ? 'rgb(42, 157, 143)'
      : 'rgb(233, 196, 106)'};
`;

export const StyledLink = styled('a')`
  color: rgb(42, 157, 143);
`;

export const StyledNavLink = styled(NavLink)`
  color: rgb(42, 157, 143);
`;
