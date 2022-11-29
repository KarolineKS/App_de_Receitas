import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <div>
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Meals } />
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
