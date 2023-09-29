import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import gitHubLogo from '../../assets/images/png/GitHub_Logo_White.png';

const StyledFooter = styled('footer')`
  grid-area: 3 / 2 / 4 / 3;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    padding: 0;
    align-self: normal;
  }

  .logo_github {
    width: 100%;
  }

  span {
    white-space: nowrap;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <Link
        className="logo_github"
        to="https://github.com/SavitskayaKseniya22"
        target="blank"
        title="Developer's GitHub"
      >
        <img src={gitHubLogo} alt="gitHub" />
      </Link>
      <span>&#169; 2023</span>
    </StyledFooter>
  );
}

export default Footer;
