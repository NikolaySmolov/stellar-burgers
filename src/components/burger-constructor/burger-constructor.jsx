import React from 'react';
import styles from './burger-constructor.module.css';
import ConstructorRow from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';
import { BurgerContext } from '../../services/burger-context';
import { BUN, CALC, RESET } from '../../utils/constants';

const totalInitState = 0;

function reducer(state, action) {
  if (action.payload.length === 0) return totalInitState;

  switch (action.type) {
    case CALC:
      return action.payload.reduce((prev, curr) => {
        curr.type === BUN ? (prev += curr.price * 2) : (prev += curr.price);
        return prev;
      }, 0);
    case RESET:
      return totalInitState;
    default:
      return totalInitState;
  }
}

export default function BurgerConstructor() {
  const {
    burgerContext: {
      inConstructor: { bun, filling },
    },
  } = React.useContext(BurgerContext);

  const [total, totalDispatcher] = React.useReducer(reducer, totalInitState);

  const includesBun = bun.length;

  const incluedesFilling = filling.length;

  const canOrder = !(bun.length > 0 && filling.length > 0);

  const orderList = React.useMemo(() => {
    return [...bun, ...filling].map(item => item._id);
  }, [bun, filling]);

  React.useEffect(() => {
    totalDispatcher({ type: CALC, payload: [...bun, ...filling] });
  }, [bun, filling, total]);

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>
        {includesBun ? <ConstructorRow isBun={true} type="top" data={bun[0]} /> : null}
        {incluedesFilling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {filling.map(item => (
              <ConstructorRow key={item.tempId} data={item} />
            ))}
          </ul>
        ) : null}
        {includesBun ? <ConstructorRow isBun={true} type="bottom" data={bun[0]} /> : null}
      </div>
      <Ordering isDisabled={canOrder} orderList={orderList} totalPrice={total} />
    </section>
  );
}
