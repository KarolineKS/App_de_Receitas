import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [radioSearch, setRadioSearch] = useState('i');
  const [recipes, setRecipes] = useState({
    meals: [],
    drinks: [],
  });

  const value = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    radioSearch,
    setRadioSearch,
    recipes,
    setRecipes,
  }), [email, password, radioSearch, recipes]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;
