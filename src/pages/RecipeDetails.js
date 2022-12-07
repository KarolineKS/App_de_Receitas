import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { getFromLocal, saveOnStorage } from '../services/storage';
import DetailsContext from '../context/DetailsContext';

function RecipeDetails({ history, location, match }) {
  const [showCopy, setShowCopy] = useState(false);
  const {
    ingredientes,
    pound,
    detailsRecipes,
    FetchUrl,
  } = useContext(DetailsContext);

  const type = match.path.split('/')[1];

  const {
    params: { id },
  } = match;

  useEffect(() => {
    const url = type === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    FetchUrl(url, type);
  }, []);

  const saveFavorites = (recipe) => {
    const obj = {
      id: recipe.idMeal || recipe.idDrink,
      type: type === 'meals' ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    const local = getFromLocal('favoriteRecipes');
    const newLocal = typeof local === 'string' ? [obj] : [...local, obj];
    saveOnStorage('favoriteRecipes', newLocal);
  };

  return (
    <div>
      {detailsRecipes[type].map((recipe) => (
        <div key={ recipe.idMeal || recipe.idDrink }>
          <h1 data-testid="recipe-title">
            {recipe.strMeal || recipe.strDrink}
          </h1>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt=""
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <div>
            <ul>
              {ingredientes.map((ing, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ing}
                  {pound[index]}
                </li>
              ))}
            </ul>
          </div>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          {type === 'meals' && (
            <iframe
              data-testid="video"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
              title="video youtube"
              allowFullScreen
              frameBorder="0"
            />
          )}
          {type === 'drinks' && (
            <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
          )}
        </div>
      ))}
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { position: 'fixed', bottom: '0' } }
        onClick={ () => history.push(`/${type}/${id}/in-progress`) }
      >
        Start Recipe
      </button>
      <button
        data-testid="share-btn"
        type="button"
        style={ { marginLeft: '200px' } }
        onClick={ () => {
          copy(`http://localhost:3000${location.pathname}`);
          setShowCopy(true);
        } }
      >
        Share
      </button>
      {showCopy && <p>Link copied!</p>}
      <button
        data-testid="favorite-btn"
        type="button"
        style={ { marginLeft: '200px' } }
        onClick={ () => saveFavorites(detailsRecipes[type][0]) }
      >
        Favorite
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.func }).isRequired,
};

export default RecipeDetails;
