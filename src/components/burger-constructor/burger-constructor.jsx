import React from 'react';
import styles from './burger-constructor.module.css';
import ConstructorRow from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';
import { SUM } from '../../utils/constants';
import { totalPriceReducer, totalPriceInitialState } from './utils';
import { ConstructorContext } from '../../services/constructor-context';

export default function BurgerConstructor() {
  const { constructorState } = React.useContext(ConstructorContext);
  const [totalPriceState, totalPriceDispatcher] = React.useReducer(
    totalPriceReducer,
    totalPriceInitialState
  );

  const rowKeyRef = React.useRef(0);

  React.useEffect(() => {
    totalPriceDispatcher({ type: SUM, payload: constructorState.bun });
    constructorState.filling.forEach(item => totalPriceDispatcher({ type: SUM, payload: item }));
  }, [constructorState]);

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>
        <ConstructorRow isBun={true} type="top" data={constructorState.bun} />
        <ul className={`${styles.fills} custom-scroll`}>
          {constructorState.filling.map(filling => (
            <ConstructorRow key={rowKeyRef.current++} data={filling} />
          ))}
        </ul>
        <ConstructorRow isBun={true} type="bottom" data={constructorState.bun} />
      </div>
      <Ordering totalPrice={totalPriceState} />
    </section>
  );
}
