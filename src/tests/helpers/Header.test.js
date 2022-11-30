import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../../components/Header';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente Header, 45% e 90% de cobertura', () => {
  test('Verifique as renderizações dos elementos', async () => {
    renderWithRouter(<Header />);

    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();

    const profileBtn = await screen.findByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
  test('', () => {
    // const searchBtn = await screen.findByTestId('search-input');
    // expect(searchBtn).toBeInTheDocument();

  });
});
