import React from 'react';
import PropTypes from 'prop-types';

function FavoriteButton({ history }) {
  const handleClick = () => {
    history.push('/favorite-recipes');
  };

  return (
    <button
      data-testid="profile-favorite-btn"
      onClick={ handleClick }
      type="button"
    >
      Favorite Recipes
    </button>
  );
}

FavoriteButton.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default FavoriteButton;
