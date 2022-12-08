import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

// const mealsEndPoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-da-receita}';
// const driknsEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-da-receita}';
const mealsID = '/meals/52977';
const startBtnDTI = 'start-recipe-btn';

describe('Testando a tela recipeDetails', () => {
  test('Se a requisição para a API de comidas foi realizada', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/meals'); });

    await screen.findByRole('heading', { name: /meals/i });

    const recipeCard = screen.findByTestId('0-recipe-card');
    const allBtn = screen.findByTestId('All-category-filter');
    userEvent.click(await allBtn);
    expect(await recipeCard).toBeVisible();
    userEvent.click(await recipeCard);
    await waitFor(() => {
      expect(history.location.pathname).toBe(mealsID);
    });
  });
  test('Se renderiza os elementos do card', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(mealsID); });

    const recipeTitle = screen.findByTestId('recipe-title');
    expect(await recipeTitle).toBeInTheDocument();

    const img = screen.findByTestId('recipe-photo');
    expect(await img).toBeInTheDocument();

    const category = screen.findByTestId('recipe-category');
    expect(await category).toBeInTheDocument();

    const ingredients = screen.findByTestId('0-ingredient-name-and-measure');
    expect(await ingredients).toBeInTheDocument();

    const instructions = screen.findByTestId('instructions');
    expect(await instructions).toBeInTheDocument();

    const video = screen.findByTestId('video');
    expect(await video).toBeInTheDocument();

    const startBtn = screen.findByTestId(startBtnDTI);
    expect(await startBtn).toBeInTheDocument();

    const shareBtn = screen.findByTestId('share-btn');
    expect(await shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.findByTestId('favorite-btn');
    expect(await favoriteBtn).toBeInTheDocument();
  });
  test('Se renderiza os elementos do card', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push(mealsID); });

    const recipeTitle = screen.findByTestId('recipe-title');
    expect(await recipeTitle).toBeInTheDocument();
    expect(await screen.findByText('Corba'));
    expect(await screen.findByText('Lentils 1 cup'));
    await waitFor(() => {
      expect(screen.findByText('Pick through your lentils for any foreign debris.'));
    });
  });
  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/53060');
    });
    expect(screen.findByRole('heading', { name: /Burek/i, level: 1 }));
    const startBtn = screen.findByTestId(startBtnDTI);
    userEvent.click(await startBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53060/in-progress');
    });
  });
  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/53060');
    });
    expect(screen.findByRole('heading', { name: /Burek/i, level: 1 }));
    const shareBtn = screen.findByTestId('share-btn');
    userEvent.click(await shareBtn);
    expect(await screen.findByText('Link copied!'));
  });
});

describe('Testando recipeDetails: drink', () => {
  test('A renderização dos elementos na pag drinks/:id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/drinks/13501'); });

    expect(screen.findByRole('heading', { name: /ABC/i, level: 1 }));

    const img = screen.findByTestId('recipe-photo');
    expect(await img).toBeInTheDocument();

    expect(screen.findByText('Shot'));

    expect(screen.findByRole('list', { name: 'Amareto 1/3' }));
    expect(screen.findByRole('list', { name: 'Baileys irish cream 1/3' }));
    expect(screen.findByRole('list', { name: 'Cognac 1/3' }));

    // expect(await screen.findByText('Layered in a shot glass'));
    const startBtn = screen.findByTestId(startBtnDTI);
    expect(await startBtn).toBeInTheDocument();

    const shareBtn = screen.findByTestId('share-btn');
    expect(await shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.findByTestId('favorite-btn');
    expect(await favoriteBtn).toBeInTheDocument();
  });
});
//   RecipeDetails.js   |   78.94 |    40.62 |   73.33 |   78.94 | 45-57,115-135
