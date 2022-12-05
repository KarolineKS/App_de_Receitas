import React from 'react';
import PropTypes from 'prop-types';

function DoneButton({ history }) {
  const handleClick = () => {
    history.push('/done-recipes');
  };

  return (
    <button
      data-testid="profile-done-btn"
      onClick={ handleClick }
      type="button"
    >
      Done Recipes
    </button>
  );
}

DoneButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneButton;
