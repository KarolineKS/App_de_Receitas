import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Meals({ history }) {
  const { recipes } = useContext(RecipesContext);
  const maxRecipes = 12;
  return (
    <div>
      <Header
        pageTitle="Meals"
        searchBtn
        url="https://www.themealdb.com/api/json/v1/1/"
        history={ history }
      />
      {recipes.meals?.length > 0 && recipes.meals.filter((_e, i) => i < maxRecipes)
        .map((element, index) => (
          <div key={ element.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ element.strMealThumb }
              alt={ element.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              { element.strMeal }
            </p>
          </div>
        ))}
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
