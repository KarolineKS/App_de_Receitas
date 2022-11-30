import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div>
      <header>

        <Header pageTitle="Profile" searchBtn={ false } />
      </header>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
