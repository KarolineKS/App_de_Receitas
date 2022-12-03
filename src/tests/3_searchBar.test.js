import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import { MEALS_MOCK } from './helpers/mock_recipes';

const searchInputDti = 'search-input';
const firstLetterDti = 'first-letter-search-radio';
const nameDti = 'name-search-radio';
const ingredientsDti = 'ingredient-search-radio';
const btnDti = 'exec-search-btn';
const btnTopDti = 'search-top-btn';

describe('Cobertura de 45% e 90% do componente SearchBar ', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ mock: 'mock_recipes' }),
    });
  });

  test('Verificando as renderizações do componente SearchBar', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    await screen.findByRole('heading', { name: /meals/i });

    const searchInput = screen.queryByTestId(searchInputDti);
    expect(searchInput).toBe(null);

    const name = screen.getByTestId(nameDti);
    const firstLetter = screen.findByTestId(firstLetterDti);
    const btn = screen.findByTestId(btnDti);
    const ingredient = screen.findByTestId(ingredientsDti);

    waitFor(() => {
      expect(name).toBeInTheDocument();
      expect(ingredient).toBeInTheDocument();
      expect(firstLetter).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
    });
  });
  test('Se as APIs são chamadas de forma correta de acordo com as formas de busca disponíveis', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MEALS_MOCK),
    });
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });
    const searchInput = screen.queryByTestId(searchInputDti);
    const btnTop = screen.getByTestId(btnTopDti);
    const ingredient = screen.findByTestId(ingredientsDti);
    const btn = screen.findByTestId(btnDti);
    const name = screen.getByTestId(nameDti);
    const firstLetter = screen.findByTestId(firstLetterDti);

    waitFor(() => {
      userEvent.click(btnTop);
      expect(searchInput).toBeInTheDocument();
      userEvent.type(searchInput, 'egg');
      userEvent.click(ingredient);
      userEvent.click(btn);
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=egg');
      expect(screen.getByText('Baingan Bharta')).toBeVisible();
    });

    waitFor(() => {
      userEvent.click(btnTop);
      expect(searchInput).toBeInTheDocument();
      userEvent.type(searchInput, 'beef');
      userEvent.click(name);
      userEvent.click(btn);
      expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=beef');
      expect(screen.getByText('Beef Lo Mein')).toBeVisible();
    });

    waitFor(() => {
      userEvent.click(btnTop);
      expect(searchInput).toBeInTheDocument();
      userEvent.type(searchInput, 'a');
      userEvent.click(firstLetter);
      userEvent.click(btn);
      expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
      expect(screen.getByText('Apple Frangipan Tart')).toBeVisible();
    });
  });

  test('Se selecionar o radio Name e digitar uma única letra retorna um alerta de mensagem: "Sorry, we havent found any recipes for these filters."', async () => {
    const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';
    global.alert = jest.fn();

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchInput = screen.queryByTestId(searchInputDti);
    const btnTop = screen.getByTestId(btnTopDti);
    const name = screen.getByTestId(nameDti);
    const btn = await screen.findByTestId(btnDti);

    userEvent.click(btnTop);
    waitFor(() => {
      expect(searchInput).toBeVisible();
    });
    userEvent.type(searchInput, 'a');
    userEvent.click(name);
    userEvent.click(btn);

    waitFor(() => {
      expect(global.alert).toBeCalledWith(alertMessage);
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('Se selecionar o radio FirstLetter e digitar mais que uma única letra retorna um alerta de mensagem: "Your search must have only 1 (one) character"', async () => {
    global.alert = jest.fn();

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchInput = screen.queryByTestId(searchInputDti);
    const btnTop = screen.getByTestId(btnTopDti);
    const firstLetter = await screen.findByTestId(firstLetterDti);
    const btn = await screen.findByTestId(btnDti);

    userEvent.click(btnTop);
    waitFor(() => {
      expect(searchInput).toBeVisible();
    });
    userEvent.click(firstLetter);
    userEvent.type(searchInput, 'aa');
    userEvent.click(btn);

    waitFor(() => {
      expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });
  // testando API drinks
  test('Se selecionar o radio FirstLetter e digitar mais que uma única letra retorna um alerta de mensagem: "Your search must have only 1 (one) character"', async () => {
    const alertMessage1 = 'Your search must have only 1 (one) character';
    global.alert = jest.fn();

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await screen.findByRole('heading', { name: /Drinks/i });

    const searchInput = screen.queryByTestId(searchInputDti);
    const btnTop = screen.getByTestId(btnTopDti);
    const btn = await screen.findByTestId(btnDti);
    const firstLetter = screen.findByTestId(firstLetterDti);

    userEvent.click(btnTop);
    waitFor(() => {
      expect(searchInput).toBeVisible();
      userEvent.click(firstLetter);
    });
    userEvent.type(searchInput, 'aa');
    userEvent.click(btn);

    waitFor(() => {
      expect(global.alert).toBeCalledWith(alertMessage1);
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });
});
// https://stackoverflow.com/questions/55933105/how-to-mock-or-assert-whether-window-alert-has-fired-in-react-jest-with-typesc
// global.alert = jest.fn();
// expect(global.alert).toHaveBeenCalledTimes(1);
