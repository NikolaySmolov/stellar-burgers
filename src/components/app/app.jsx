import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BurgerContext } from '../../services/burger-context';
import ModalError from '../modal-error/modal-error';
import { getIngredients } from '../../utils/api';

export default function App() {
  const [data, setData] = React.useState([]);
  const [appState, setAppState] = React.useState({ loading: true, success: false });

  React.useEffect(() => {
    getIngredients()
      .then((data) => {
        setData(data.data);

        setAppState({ loading: false, success: true });
      })
      .catch((err) => {
        console.log(err);
        setAppState({ loading: false, success: false });
      });
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        {appState.success ? (
          <BurgerContext.Provider value={data}>
            <BurgerIngredients />
            <BurgerConstructor />
          </BurgerContext.Provider>
        ) : appState.loading ? null : (
          <ModalError />
        )}
      </main>
    </>
  );
}
