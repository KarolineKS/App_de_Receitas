import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

export default function SearchBar({ url, history, type }) {
  const { radioSearch, setRadioSearch } = useContext(RecipesContext);

  const [search, setSearch] = useState('');

  const handleButton = async () => {
    try {
      if (radioSearch === 'f' && search.length > 1) {
        const alertMessage = 'Your search must have only 1 (one) character';
        return global.alert(alertMessage);
      }
      const newUrl = radioSearch === 'i'
        ? `${url}filter.php?i=${search}` : `${url}search.php?${radioSearch}=${search}`;
      const response = await fetch(newUrl);
      const data = await response.json();
      setFunc(data);
      if (data[type]?.length === 1) {
        const key = Object.keys(data[type][0]).find((e) => e.includes('id'));
        const urlParam = `${type}/${data[type][0][key]}`;
        history.push(urlParam);
      }
      if (!data[type]) {
        const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';
        global.alert(alertMessage);
      }
    } catch (err) {
      const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';
      global.alert(alertMessage);
    }
  };
  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={ search }
        onChange={ handleChange }
      />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          name="search-radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          value="i"
          checked={ radioSearch === 'i' }
          onChange={ () => setRadioSearch('i') }
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          name="search-radio"
          id="name-search-radio"
          data-testid="name-search-radio"
          value="s"
          checked={ radioSearch === 's' }
          onChange={ () => setRadioSearch('s') }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First letter
        <input
          type="radio"
          name="search-radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          value="f"
          checked={ radioSearch === 'f' }
          onChange={ () => setRadioSearch('f') }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleButton }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  url: PropTypes.string.isRequired,
  // search: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
