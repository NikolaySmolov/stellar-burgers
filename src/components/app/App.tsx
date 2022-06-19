import React from 'react';
import './App.css';
import data from '../../utils/data';
import AppHeader from '../appHeader/appHeader';
import BuregerIngredients from '../burgerIngredients/burgerIngredients';

function App() {
  return (
    <>
      <AppHeader />
      <main className='content'>
        <BuregerIngredients />
        <BuregerIngredients />
      </main>
    </>
  )
}

export default App;
