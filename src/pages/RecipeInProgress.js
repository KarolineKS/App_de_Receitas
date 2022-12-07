import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import DetailsContext from '../context/DetailsContext';

function RecipeInProgress({ history, location }) {
  const { detailsRecipes, ingredientes, pound, FetchUrl } = useContext(DetailsContext);
  const [showCopy, setShowCopy] = useState(false);
  const match = useRouteMatch();
  console.log(match);
  const type = match.path.split('/')[1];
  const { params: { id } } = match;

  useEffect(() => {
    const url = type === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    FetchUrl(url, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <ol>
              {
                ingredientes.map((ing, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    <label
                      htmlFor="key"
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        key={ index }
                        type="checkbox"
                        // onChange={ handleChange }
                      />
                    </label>
                    {ing}
                    {pound[index]}
                  </li>
                ))
              }
            </ol>
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
          <button
            data-testid="finish-recipe-btn"
            type="button"
            style={ { position: 'fixed', bottom: '0' } }
            onClick={ () => history.push(`/${type}/${id}/in-progress`) }
          >
            Finish Recipe
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
          { showCopy && <p>Link copied!</p>}
          <button
            data-testid="favorite-btn"
            type="button"
            style={ { marginLeft: '200px' } }
            onClick={ () => saveFavorites(detailsRecipes[type][0]) }
          >
            Favorite
          </button>
        </div>))}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default RecipeInProgress;
