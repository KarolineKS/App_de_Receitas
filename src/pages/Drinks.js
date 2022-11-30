import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  return (
    <div>
      <header>
        <Header pageTitle="Drinks" searchBtn />

      </header>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
