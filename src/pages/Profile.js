import React from 'react';
import PropTypes from 'prop-types';
import DoneButton from '../components/DoneButton';
import FavoriteButton from '../components/FavoriteButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LogoutButton from '../components/LogoutButton';

export default function Profile({ history }) {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <header>

        <Header history={ history } pageTitle="Profile" searchBtn={ false } />
      </header>
      <main>
        <div className="profilePage">
          <div className="user__email">
            <p data-testid="profile-email">{user && user.email}</p>
          </div>
          <DoneButton history={ history } />
          <FavoriteButton history={ history } />
          <LogoutButton history={ history } />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
};
