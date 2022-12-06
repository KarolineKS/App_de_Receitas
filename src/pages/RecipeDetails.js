import React, { useState, useEffect } from 'react';

function RecipeDetails({ history, match }) {
  const [detailsRecipes, setDetailsRecipe] = useState();

  useEffect(() => {
    const type = match.path.split('/')[1];
    const { params: { id } } = match;
    console.log(type);
    const url = type === 'meals' ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    FetchUrl(url);
  }, []);

  const FetchUrl = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setDetailsRecipe(data);
  };

  return (
    <div>RecipeDetails</div>
  );
}

export default RecipeDetails;
