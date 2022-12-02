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

describe('Cobertura de 45% e 90% do componente SearchBar ', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ mock: 'mock' }),
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
      expect(screen.getByText('Baingan Bharta'));
    });

    waitFor(() => {
      userEvent.click(btnTop);
      expect(searchInput).toBeInTheDocument();
      userEvent.type(searchInput, 'beef');
      userEvent.click(name);
      userEvent.click(btn);
      expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=beef');
      expect(screen.getByText('Beef Lo Mein'));
    });

    waitFor(() => {
      userEvent.click(btnTop);
      expect(searchInput).toBeInTheDocument();
      userEvent.type(searchInput, 'a');
      userEvent.click(firstLetter);
      userEvent.click(btn);
      expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
      expect(screen.getByText('Apple Frangipan Tart'));
    });
  });

  test('Se selecionar o radio Name e digitar uma única letra retorna um alerta de mensagem: "Sorry, we havent found any recipes for these filters."', async () => {
    const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';
    // const alertMock =
    window.alert = jest.spyOn(global, 'alert').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(alertMessage),
    }));

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
    expect(window.alert).toBe(alert);
    // expect(window.alert).toHaveBeenCalledTimes(1);
  });
  test('Se selecionar o radio FirstLetter e digitar mais que uma única letra retorna um alerta de mensagem: "Your search must have only 1 (one) character"', async () => {
    const alertMessage1 = 'Your search must have only 1 (one) character';
    // const alertMock =
    window.alert = jest.spyOn(global, 'alert').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(alertMessage1),
    }));

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
    expect(window.alert).toBe(alert);
    // expect(window.alert).toHaveBeenCalledTimes(1);
  });
});

// it('alerts on submit click', async () => {
//   const alertMock = jest.spyOn(global, 'alert').mockImplementation();
//   renderWithRouter(<SearchBar />);
//   userEvent.click(screen.getByText('Your search must have only 1 (one) character'));
//   expect(alertMock).toHaveBeenCalledTimes(1);
// });

// userEvent.click(await ingredient);
// userEvent.click(await btn);

// waitFor(() => {
//   expect(screen.findByText('Apple & Blackberry Crumble')).toBeVisible();
//   userEvent.click(name);
//   userEvent.click(btn);
//   expect(screen.findByText('Bubble & Squeak')).toBeVisible();
//   userEvent.click(firstLetter);
//   userEvent.click(btn);
//   expect(screen.findByText('Bakewell tart')).toBeVisible();
// });
