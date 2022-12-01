import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando a Header 45 e 90% de cobertura', () => {
  test('Renderização de elementos', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'test@gmail.com');
    const password = screen.getByTestId('password-input');
    userEvent.type(password, '1234567');
    const buttonLogin = screen.getByRole('button', { name: /enter/i });
    userEvent.click(buttonLogin);
    history.push('/meals');

    screen.getByText('Meals');

    const btnPro = screen.getByTestId('profile-top-btn');
    expect(btnPro).toBeInTheDocument();
    userEvent.click(btnPro);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    act(async () => {
      expect(await screen.findByTestId('search-input')).not.toBeInTheDocument();
      expect(await screen.findByTestId('search-top-btn')).toBeInTheDocument();
      userEvent.click(await screen.findByTestId('search-top-btn'));
      userEvent.type(await screen.findByTestId('search-input', 'chiken'));
    });
  });
});
