import React, { useEffect, useState } from 'react';
import FiltersBtns from '../components/FiltersBtns';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { getFromLocal } from '../services/storage';

export default function DoneRecipes() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [filterParam, setFilterParam] = useState('');
  useEffect(() => {
    const local = typeof getFromLocal('doneRecipes') === 'string' ? []
      : getFromLocal('doneRecipes');
    setFavRecipes(local);
  }, []);
  return (
    <div>
      <header>
        <Header pageTitle="Done Recipes" searchBtn={ false } />
      </header>
      <FiltersBtns setFilterParam={ setFilterParam } />
      {favRecipes.filter((e) => e.type.includes(filterParam)).map((e, index) => (
        <RecipeCard
          key={ `${e.name}-${e.type}-${e.id}` }
          recipe={ e }
          index={ index }
          setFavRecipes={ setFavRecipes }
          isDonePage
        />
      ))}
    </div>
  );
}
