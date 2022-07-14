import React from 'react';
import styles from './burger-constructor.module.css';
import ConstructorRow from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';
import { ADD_FILLING, ADD_BUN } from '../../utils/constants';
import { BurgerContext } from '../../services/burger-context';
import { constructorReducer, constructorInitialState } from './utils';

export default function BurgerConstructor() {
  const ingredients = React.useContext(BurgerContext);

  const [constructorState, constructorDispatcher] = React.useReducer(
    constructorReducer,
    constructorInitialState
  );

  const [orderState, setOrderState] = React.useState({ orderList: null, totalPrice: 0 });

  // for tests
  React.useEffect(() => {
    constructorDispatcher({
      type: ADD_BUN,
      payload: ingredients.find((ingredient) => ingredient.type === 'bun'),
    });

    constructorDispatcher({
      type: ADD_FILLING,
      payload: ingredients.filter((ingredient, index) => ingredient.type !== 'bun' && index < 6),
    });
  }, [ingredients]);

  const rowKeyRef = React.useRef(0);

  const content = React.useMemo(() => {
    return (
      <>
        {constructorState.bun ? (
          <ConstructorRow isBun={true} type="top" data={constructorState.bun} />
        ) : null}
        {constructorState.filling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {constructorState.filling.map((filling) => (
              <ConstructorRow key={rowKeyRef.current++} data={filling} />
            ))}
          </ul>
        ) : null}
        {constructorState.bun ? (
          <ConstructorRow isBun={true} type="bottom" data={constructorState.bun} />
        ) : null}
      </>
    );
  }, [constructorState]);

  const ordering = React.useMemo(() => {
    const isReady = () => {
      const result = constructorState.bun && constructorState.filling ? false : true;
      return result;
    };

    return (
      <Ordering
        isReady={isReady()}
        inOrder={orderState.orderList}
        totalPrice={orderState.totalPrice}
      />
    );
  }, [constructorState, orderState]);

  React.useEffect(() => {
    const idList = [];
    let total = 0;
    console.log(constructorState);
    for (let value of Object.values(constructorState)) {
      if (value == null) {
        continue;
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          idList.push(item._id);

          total += item.price;
        });
      } else {
        idList.push(value._id);
        total += value.price;
      }
    }

    setOrderState({ orderList: idList, totalPrice: total });
  }, [constructorState]);

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>{content}</div>
      {ordering}
    </section>
  );
}
