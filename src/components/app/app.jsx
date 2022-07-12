import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { API } from '../../utils/constants';
import { ConstructorContext } from '../../services/constructor-context';
import { constructorReducer, constructorInitialState } from './utils';
import ModalError from '../modal-error/modal-error';

export default function App() {
  const [appData, setAppData] = React.useState({ data: [], loading: true });
  const [menuData, setMenuData] = React.useState(null);
  const [inConstructor, setInConstructor] = React.useState(null); // deprecated
  const [construnctorState, constructorDispatcher] = React.useReducer(
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

        setMenuData(
          data.data.reduce((prev, curr) => {
            if (!prev[curr.type]) {
              prev[curr.type] = [curr];
            } else {
              prev[curr.type].push(curr);
            }
            return prev;
          }, {})
        );

        setInConstructor(data.data); //depracated
        constructorDispatcher({
          type: 'addBun',
          payload: data.data.find(ing => ing.type === 'bun'),
        });
        constructorDispatcher({
          type: 'addFilling',
          payload: data.data.filter(ing => ing.type !== 'bun'),
        });

        setAppData(appData => ({ ...appData, loading: false }));
      } catch (err) {
        setAppData(appData => ({ ...appData, loading: false, success: false }));
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
            <BurgerIngredients ingredients={menuData} />
            <ConstructorContext.Provider value={{ construnctorState, constructorDispatcher }}>
              <BurgerConstructor cart={inConstructor} />
            </ConstructorContext.Provider>
          </>
        ) : appData.loading ? null : (
          <ModalError />
        )}
      </main>
    </>
  );
}
