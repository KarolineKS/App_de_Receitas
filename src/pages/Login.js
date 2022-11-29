import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const { email, password, setEmail, setPassword } = useContext(RecipesContext);

  const isDisabled = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minPasswordLength = 6;
    return !(emailRegex.test(email)) || password.length <= minPasswordLength;
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
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
