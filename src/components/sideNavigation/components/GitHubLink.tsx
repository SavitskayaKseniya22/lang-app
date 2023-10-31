import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import gitHubLogoBlack from '../../../assets/images/png/GitHub_Logo.png';

const StyledGitHubLink = styled(Link)`
  display: block;
  width: 5rem;
  padding: 0.5rem;

  img {
    width: 100%;
  }
`;

function GitHubLink() {
  return (
    <StyledGitHubLink
      to="https://github.com/SavitskayaKseniya22"
      target="blank"
      title="Developer's GitHub"
    >
      <img src={gitHubLogoBlack} alt="gitHub" />
    </StyledGitHubLink>
  );
}

export default GitHubLink;
