import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { DRINKS_MOCK, MEALS_MOCK } from './helpers/mock_recipes';
// import MEALS_CATEGORIES_MOCK from './helpers/mock_categories';

const allCategoriesFilterDTI = 'All-category-filter';
// const fiveCategories = ['All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

describe('Testando o componente Recipes', () => {
  test('Se as renderizações do componente estão presentes', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByText('Meals'));

    const allBtn = screen.findByTestId('All-category-filter');
    const beef = await screen.findByRole('button', { name: /Beef/i });
    const breakfast = screen.findByRole('button', { name: /breakfast/i });
    const chicken = screen.findByRole('button', { name: /chicken/i });
    const goat = screen.findByRole('button', { name: /goat/i });
    const dessert = screen.findByRole('button', { name: 'Dessert' });

    expect(await dessert).toBeInTheDocument();
    expect(await allBtn).toBeInTheDocument();
    expect(await beef).toBeVisible();
    expect(await breakfast).toBeInTheDocument();
    expect(await chicken).toBeInTheDocument();
    expect(await goat).toBeInTheDocument();
  });

  test('A chamada da API - btnAll - Meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByText('Meals'));
    const beef = screen.findByRole('button', { name: /Beef/i });
    userEvent.click(await beef);
    expect(await screen.findByText('Beef and Mustard Pie'));
  });

  test('A chamada da API - btnAll - Breakfast', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByText('Meals'));
    const breakfast = screen.findByRole('button', { name: /breakfast/i });
    userEvent.click(await breakfast);
    expect(await screen.findByText('Breakfast Potatoes'));
  });

  test('A chamada da API - btnAll - Chicken', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByText('Meals'));
    const chicken = screen.findByRole('button', { name: /chicken/i });
    userEvent.click(await chicken);
    expect(await screen.findByText('Ayam Percik'));
  });

  test('A chamada da API - btnAll - Dessert', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByText('Meals'));
    const dessert = screen.findByRole('button', { name: 'Dessert' });
    userEvent.click(await dessert);
    expect(await screen.findByText('Apam balik'));
  });

  test('A chamada da API - btnAll - Goat', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(await screen.findByText('Meals'));
    const goat = screen.findByRole('button', { name: /goat/i });
    userEvent.click(await goat);
    expect(await screen.findByText('Mbuzi Choma (Roasted Goat)'));
  });

  test('A chamada da API - btnAll - Meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MEALS_MOCK),
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(await screen.findByText('Meals'));

    const allBtn = screen.findByTestId(allCategoriesFilterDTI);
    userEvent.click(await allBtn);

    expect(await screen.findByText('Cream Cheese Tart'));

    await waitFor(async () => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    });

    setTimeout(() => {
      for (let i = 0; i < 12; i += 1) {
        const img = screen.findByTestId(`${i}-card-img`);
        expect(img).toBeInTheDocument();
      }
    }, 2000);
  });
  test('A chamada da API - btnAll - Drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(DRINKS_MOCK),
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(await screen.findByText('Drinks'));

    const allBtn = screen.findByTestId(allCategoriesFilterDTI);
    userEvent.click(await allBtn);

    expect(await screen.findByText('California Lemonade'));

    await waitFor(async () => {
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    });

    setTimeout(() => {
      for (let i = 0; i < 12; i += 1) {
        const img = screen.findByTestId(`${i}-card-name`);
        expect(img).toBeInTheDocument();
      }
    }, 2000);
  });
});

// setTimeout(() => {
//   for (let i = 0; i < 5; i += 1) {
//     const mealsCat = screen.findByTestId(`${i}--category-filter`);
//     expect(mealsCat).toBeInTheDocument();
//   }
// }, 2000);
// const fiveCategories = screen.findAllByTestId(`${i.strCategory}-category-filter`);
// (await fiveCategories).forEach((category, i) => {
//   expect(category).toHaveTextContent(MEALS_CATEGORIES_MOCK.categories[i].strCategory);
// });
