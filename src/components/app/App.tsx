import React from 'react';
import './App.css';
import data from '../../utils/data';
import AppHeader from '../appHeader/appHeader';
import BuregerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';

function App() {
  return (
    <>
      <AppHeader />
      <main className='content'>
        <BuregerIngredients />
        <BurgerConstructor />
      </main>
    </>
  )
}

export default App;
