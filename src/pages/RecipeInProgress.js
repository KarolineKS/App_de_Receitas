import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import DetailsContext from '../context/DetailsContext';
import '../App.css';
import { saveOnStorage, getFromLocal } from '../services/storage';

function RecipeInProgress({ history, location }) {
  const { detailsRecipes, checked,
    ingredientes, pound, setChecked, FetchUrl } = useContext(DetailsContext);
  const [showCopy, setShowCopy] = useState(false);
  const match = useRouteMatch();

  const type = match.path.split('/')[1];
  const { params: { id } } = match;

  useEffect(() => {
    const url = type === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    FetchUrl(url, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChecked = (index) => {
    setChecked({ ...checked,
      [`checked${index}`]:
    !checked[`checked${index}`] });
    const salveChecked = { ...checked,
      [`checked${index}`]:
  !checked[`checked${index}`] };
    const local = typeof getFromLocal('inProgressRecipes')
    === 'string' ? [] : getFromLocal('inProgressRecipes');
    const localfiltered = local.filter((e) => (e.id !== id && e.type !== type));
    const newlocal = [...localfiltered,
      { ...salveChecked,
        id,
        type },
    ];
    saveOnStorage('inProgressRecipes', newlocal);
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
            <ol>
              {
                ingredientes.map((ing, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    name={ ing }
                    className={ checked[`checked${index}`]
                      ? 'recipeChecked' : 'recipeNoChecked' }
                  >
                    <label
                      htmlFor={ index }
                      data-testid={ `${index}-ingredient-step` }
                      className={ checked[`checked${index}`]
                        ? 'recipeChecked' : 'recipeNoChecked' }
                    >
                      <input
                        key={ index }
                        type="checkbox"
                        name={ ing }
                        // onChange={ handleChange }
                        id="ingredientes-checked"
                        onChange={ () => handleChecked(index) }
                        checked={ checked[`checked${index}`] }
                      />
                      {ing}
                      {pound[index]}
                    </label>
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
