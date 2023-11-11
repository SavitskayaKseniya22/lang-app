import React from 'react';
import { Link } from 'react-router-dom';
import { StyledMain } from '../../styled/SharedStyles';
import { useAppDispatch } from '../../store/store';
import { resetUser } from '../../store/auth/authSlice';

function Profile() {
  const dispatch = useAppDispatch();

  return (
    <StyledMain>
      <ul>
        <li>
          <Link to="collection">Collection</Link>
        </li>
        <li>
          <Link to="statistics">Statistics</Link>
        </li>
      </ul>
      <button
        type="button"
        onClick={() => {
          dispatch(resetUser());
        }}
      >
        Sign Out
      </button>
    </StyledMain>
  );
}

export default Profile;
