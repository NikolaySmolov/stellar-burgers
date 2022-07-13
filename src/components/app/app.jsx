import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { API, ADD_BUN, ADD_FILLING } from '../../utils/constants';
import { ConstructorContext } from '../../services/constructor-context';
import { constructorReducer, constructorInitialState } from './utils';
import ModalError from '../modal-error/modal-error';

export default function App() {
  const [appData, setAppData] = React.useState({ data: [], loading: true });
  const [constructorState, constructorDispatcher] = React.useReducer(
    constructorReducer,
    constructorInitialState
  );

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(API);

        if (!res.ok) {
          throw new Error(`res.ok: ${res.ok}, res.status: ${res.status}`);
        }

        const data = await res.json();

        setAppData({ ...data, loading: true });

        constructorDispatcher({
          type: ADD_BUN,
          payload: data.data.find((ingredient) => ingredient.type === 'bun'),
        });

        constructorDispatcher({
          type: ADD_FILLING,
          payload: data.data.filter((ingredient, index) => ingredient.type !== 'bun' && index < 6),
        });

        setAppData((appData) => ({ ...appData, loading: false }));
      } catch (err) {
        setAppData((appData) => ({
          ...appData,
          loading: false,
          success: false,
        }));
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        {appData.success ? (
          <>
            <BurgerIngredients ingredients={appData.data} />
            <ConstructorContext.Provider value={{ constructorState, constructorDispatcher }}>
              <BurgerConstructor />
            </ConstructorContext.Provider>
          </>
        ) : appData.loading ? null : (
          <ModalError />
        )}
      </main>
    </>
  );
}
