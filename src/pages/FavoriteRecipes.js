import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  return (
    <div>
      <header>
        <Header
          pageTitle="Favorite Recipes"
          searchBtn={ false }
          url="https://www.themealdb.com/api/json/v1/1/"
          setFunc={ () => true }
        />
      </header>
    </div>
  );
}
