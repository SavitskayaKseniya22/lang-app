import styled from 'styled-components';

export const StyledMain = styled('main')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  flex-grow: 2;
  min-width: 320px;
  align-items: center;
  position: relative;
  justify-content: space-between;

  .main__title_main {
    align-self: flex-start;
  }
`;

export const StyledGameContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
`;
