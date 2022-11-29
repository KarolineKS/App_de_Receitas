import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider.';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ Login } />

          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
