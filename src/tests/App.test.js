import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Req1. atingir 90% de cobertura em todo o teste', () => {
  test('Testando pagina de login', async () => {
    // const { history } =
    render(<App />);
    const email = screen.getByPlaceholderText(/Digite seu email/i);
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId('password-input');
    userEvent.type(password, '1234567');

    const buttonLogin = screen.getByRole('button', { name: /enter/i });
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();

    userEvent.type(email, 'test@gmail.com');

    expect(buttonLogin).not.toBeDisabled();
    userEvent.click(buttonLogin);
    // const { pathname } = history.location;
    // expect(pathname).toBe('/');
  });
});
