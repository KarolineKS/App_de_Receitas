import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Drinks({ history }) {
  const { recipes } = useContext(RecipesContext);
  const maxRecipes = 12;
  return (
    <div>
      <Header
        pageTitle="Drinks"
        searchBtn
        url="https://www.thecocktaildb.com/api/json/v1/1/"
        history={ history }
      />
      {recipes.drinks?.length > 0 && recipes.drinks.filter((_e, i) => i < maxRecipes)
        .map((element, index) => (
          <div key={ element.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              { element.strDrink }
            </p>
          </div>
        ))}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
