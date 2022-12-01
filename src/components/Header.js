import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header(props) {
  const history = useHistory();
  const { searchBtn, pageTitle, url, setFunc } = props;
  const [specificHeader, setSpecificHeader] = useState(false);
  const [search, setSearch] = useState('');

  const handleClick = () => {
    history.push('/profile');
  };

  const itsSpecific = () => {
    setSpecificHeader(!specificHeader);
  };

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };
  return (

    <section>
      <button // sempre presente
        data-testid="profile-top-btn"
        type="button"
        src={ profileIcon }
        onClick={ handleClick }
      >
        <img src={ profileIcon } alt="profile" />
      </button>

      { !searchBtn ? ''
        : (
          <button // presente somente em algumas páginas
            data-testid="search-top-btn"
            type="button"
            src={ searchIcon }
            onClick={ itsSpecific }
          >
            <img src={ searchIcon } alt="search" />
          </button>
        )}
      <div>
        <h1 data-testid="page-title">{pageTitle}</h1>
        <SearchBar
          url={ url }
          search={ search }
          type={ pageTitle.toLowerCase() }
          history={ history }
          setFunc={ setFunc }
        />
        { !specificHeader ? ''
          : (
            <input
              data-testid="search-input"
              type="text"
              value={ search }
              onChange={ handleChange }
            />
          )}
      </div>

    </section>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  searchBtn: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  setFunc: PropTypes.func.isRequired,
};