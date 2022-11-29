import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { saveOnStorage } from '../services/storage';

function Login({ history }) {
  const { email, password, setEmail, setPassword } = useContext(RecipesContext);

  const isDisabled = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minPasswordLength = 6;
    return !(emailRegex.test(email)) || password.length <= minPasswordLength;
  };

  const handleButton = () => {
    const user = {
      email,
    };
    saveOnStorage('user', user);
    history.push('/meals');
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          email
          <input
            type="text"
            id="email"
            placeholder="digite seu email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="password">
          password
          <input
            type="text"
            id="password"
            placeholder="digite sua senha"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }

          />
        </label>

        <button
          type="button"
          disabled={ isDisabled() }
          data-testid="login-submit-btn"
          onClick={ handleButton }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {}.isRequired;

export default Login;
