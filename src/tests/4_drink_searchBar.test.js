import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const searchInputDti = 'search-input';
const firstLetterDti = 'first-letter-search-radio';
const nameDti = 'name-search-radio';
const ingredientsDti = 'ingredient-search-radio';
const btnDti = 'exec-search-btn';
const btnTopDti = 'search-top-btn';

describe('Testando componente Drinks', () => {
  test('Verifique a busca por Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(await screen.findByRole('heading', { name: /meals/i }));

    const mealBtnIcon = screen.getByTestId('meals-bottom-btn');
    const drinkBtnIcon = screen.getByTestId('drinks-bottom-btn');

    expect(mealBtnIcon).toBeInTheDocument();
    expect(drinkBtnIcon).toBeInTheDocument();
  });
  test('Se o iconDrinks redireciona para a pág. de drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const drinkBtnIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtnIcon).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    userEvent.click(drinkBtnIcon);
    expect(history.location.pathname).toBe('/drinks');
  });

  test('Se o iconMeals redireciona para a pág. de meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const mealBtnIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealBtnIcon).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
    userEvent.click(mealBtnIcon);
    expect(history.location.pathname).toBe('/meals');
  });
  test('O campo de pesquisa para os Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await screen.findByRole('heading', { name: /Drinks/i });

    const searchInput = screen.queryByTestId(searchInputDti);
    const name = screen.getByTestId(nameDti);
    const btnTop = screen.getByTestId(btnTopDti);
    const btn = await screen.findByTestId(btnDti);
    const ingredient = screen.findByTestId(ingredientsDti);
    const firstLetter = screen.findByTestId(firstLetterDti);

    userEvent.click(btnTop);
    waitFor(() => {
      expect(searchInput).toBeVisible();
    });
    userEvent.type(searchInput, 'Cuba Libre');
    userEvent.click(name);
    userEvent.click(btn);

    waitFor(() => {
      expect(screen.getByText('Cuba Libre')).toBeVisible();
    });

    waitFor(() => {
      userEvent.clear(searchInput);
      userEvent.type(searchInput, 'Lemon');
      userEvent.click(ingredient);

      expect(screen.getByText('California Lemonade')).toBeVisible();
    });

    userEvent.click(btn);

    userEvent.type(searchInput, 'l');

    waitFor(() => {
      userEvent.click(firstLetter);
      userEvent.click(btn);
      expect(screen.getByText('Limeade')).toBeVisible();
    });
  });
});
