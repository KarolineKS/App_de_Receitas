import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { getFromLocal, saveOnStorage } from '../services/storage';
import RecipesContext from '../context/RecipesContext';
import Recommendation from '../components/Recommendation';
import './styles/RecipeDetails.css';

function RecipeDetails({ match, history, location }) {
  const [detailsRecipes, setDetailsRecipe] = useState({
    drinks: [],
    meals: [],
  });

  const { recipes, drinks } = useContext(RecipesContext);

  const [ingredientes, setIngredientes] = useState([]);
  const [pound, setPound] = useState([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
      {
        detailsRecipes[type]?.map((recipe) => (

          <div key={ recipe.idMeal || recipe.idDrink }>
            <h1 data-testid="recipe-title">
              {recipe.strMeal || recipe.strDrink}
            </h1>
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt="recipe"
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-category">
              {recipe.strCategory}
            </p>
            <div>
              <ul>
                {
                  ingredientes.map((ing, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {ing}
                      {pound[index]}
                    </li>
                  ))
                }
              </ul>
            </div>
            <p data-testid="instructions">
              {recipe.strInstructions}
            </p>
            { type === 'meals' && (
              <iframe
                data-testid="video"
                src={ recipe.strYoutube.replace('watch?v=', 'embed/')
                  .replace('youtube, youtube-nocookie') }
                title="video youtube"
                allowFullScreen
                frameBorder="0"
              />
            )}
            { type === 'drinks' && (
              <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
            )}
          </div>
        ))
      }
      <Recommendation
        recipes={ type === 'meals' ? drinks : recipes }
        type={ type === 'meals' ? 'drinks' : 'meals' }
      />

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
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default RecipeDetails;
