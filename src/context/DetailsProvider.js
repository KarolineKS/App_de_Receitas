import { useMemo, useState } from 'react';
import DetailsContext from './DetailsContext';

export default function DetailsProvider({ children }) {
  const [detailsRecipes, setDetailsRecipe] = useState({
    drinks: [],
    meals: [],
  });

  const [ingredientes, setIngredientes] = useState([]);
  const [pound, setPound] = useState([]);

  const FetchUrl = async (url, type) => {
    const response = await fetch(url);
    const data = await response.json();
    setDetailsRecipe(data);
    const recipes = Object.keys(data[type][0]).filter((e) => e.includes('strIngredient'));
    const newRecipes = recipes
      .map((e) => data[type][0][e])
      .filter((a) => a !== '' && a !== null);
    const ingredientPounds = Object.keys(data[type][0])
      .filter((e) => e.includes('strMeasure'));
    const newPound = ingredientPounds
      .map((e) => data[type][0][e])
      .filter((a) => a !== '' && a !== null);
    setIngredientes(newRecipes);
    setPound(newPound);
  };

  const value = useMemo(() => ({
    ingredientes,
    setIngredientes,
    pound,
    setPound,
    detailsRecipes,
    setDetailsRecipe,
    FetchUrl,
  }), [ingredientes, pound, detailsRecipes]);

  return (
    <DetailsContext.Provider
      value={ value }
    >
      {children}
    </DetailsContext.Provider>
  );
}
DetailsProvider.propTypes = {}.isRequired;
