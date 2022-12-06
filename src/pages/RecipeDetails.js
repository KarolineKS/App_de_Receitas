import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RecipeDetails({ match }) {
  const [detailsRecipes, setDetailsRecipe] = useState({
    drinks: [],
    meals: [],
  });

  const [ingredientes, setIngredientes] = useState([]);

  const type = match.path.split('/')[1];
  const FetchUrl = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setDetailsRecipe(data);
    const recipes = Object.keys(data[type][0]).filter((e) => (
      e.includes('strIngredient')
    ));
    const newRecipes = recipes.map((e) => (
      data[type][0][e]
    )).filter((a) => a !== '');
    setIngredientes(newRecipes);
    console.log('newrecipes', newRecipes);
  };

  useEffect(() => {
    const { params: { id } } = match;
    const url = type === 'meals' ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    FetchUrl(url);
  }, []);

  return (
    <div>
      {
        detailsRecipes[type].map((recipe) => (

          <div key={ recipe.idMeal || recipe.idDrink }>
            <h1 data-testid="recipe-title">
              {recipe.strMeal || recipe.srtDrink}
            </h1>
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt=""
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
                    </li>
                  ))
                }
              </ul>
            </div>
            <p data-testid="instructions">
              {recipe.strInstructions}
              {' '}

            </p>
            <iframe

              data-testid="video"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
              title="video youtube"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        ))
      }
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
};

export default RecipeDetails;
