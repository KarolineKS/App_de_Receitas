import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getFromLocal, saveOnStorage } from '../services/storage';

export default function RecipeCard({ recipe, index, isDonePage, setFavRecipes }) {
  const [showCopy, setShowCopy] = useState(false);
  const history = useHistory();

  const deleteFavorites = () => {
    const local = typeof getFromLocal('favoriteRecipes') === 'string'
      ? [] : getFromLocal('favoriteRecipes');
    // console.log(local);
    const newLocal = local.filter((e) => e.id !== recipe.id || e.type !== recipe.type);
    saveOnStorage('favoriteRecipes', newLocal);
    setFavRecipes(newLocal);
  };
  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        style={ { maxWidth: '200px' } }
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
        aria-hidden="true"
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
          : `${recipe.alcoholicOrNot}`}
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
        aria-hidden="true"
      >
        {recipe.name}
      </p>
      {isDonePage && (
        <>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          {recipe.tags?.map((e, i) => (
            <p
              data-testid={ `${index}-${e}-horizontal-tag` }
              key={ `${e}=${index}-${i}` }
            >
              {e}
            </p>
          ))}
        </>
      )}
      { showCopy && <p>Link copied!</p>}
      <div>
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => {
            copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
            setShowCopy(true);
          } }
          aria-hidden="true"
        />
      </div>
      {isDonePage || (
        <div>
          <img
            src={ blackHeart }
            alt="heart"
            className="heart-icon"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ deleteFavorites }
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

RecipeCard.defaultProps = {
  isDonePage: false,
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  isDonePage: PropTypes.bool,
  setFavRecipes: PropTypes.func.isRequired,
};
