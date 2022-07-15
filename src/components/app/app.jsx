import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BurgerContext } from '../../services/burger-context';
import ModalError from '../modal-error/modal-error';
import { getIngredients } from '../../utils/api';
import { burgerContextReducer, burgerContextInitState } from './utils';

export default function App() {
  const [appData, setAppData] = React.useState({ loading: true, success: false, ingredients: [] });
  const [burgerContext, burgerContextDispatcher] = React.useReducer(
    burgerContextReducer,
    burgerContextInitState
  );

  React.useEffect(() => {
    getIngredients()
      .then((data) => {
        setAppData({ loading: false, success: true, ingredients: data.data });
        burgerContextDispatcher({ type: 'init', payload: data.data });
      })
      .catch((err) => {
        console.log(err);
        setAppData({ loading: false, success: false, ingredients: [] });
      });
  }, []);
  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        {appData.success ? (
          <BurgerContext.Provider value={{ burgerContext, burgerContextDispatcher }}>
            <BurgerIngredients />
            {/* <BurgerConstructor /> */}
          </BurgerContext.Provider>
        ) : appData.loading ? null : (
          <ModalError />
        )}
      </main>
    </>
  );
}
