import React from 'react';
import PropTypes from 'prop-types';

function LogoutButton({ history }) {
  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <button
      data-testid="profile-logout-btn"
      onClick={ handleClick }
      type="button"
    >
      Logout
    </button>
  );
}

LogoutButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default LogoutButton;
