import React from 'react';
import PropTypes from 'prop-types';

export default function FiltersBtns({ setFilterParam }) {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterParam('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilterParam('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterParam('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

FiltersBtns.propTypes = {
  setFilterParam: PropTypes.func.isRequired,
};
