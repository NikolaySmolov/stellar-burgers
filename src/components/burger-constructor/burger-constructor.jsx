import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorRow } from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';
import { BUN, FILLING } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { SET_TOTALPRICE } from '../../services/actions/order';

export default function BurgerConstructor() {
  const { constructor, totalPrice } = useSelector(store => ({
    constructor: store.burger.constructor,
    totalPrice: store.order.totalPrice,
  }));

  const dispatch = useDispatch();

  React.useEffect(() => {
    const total = constructor.reduce((prev, curr) => {
      curr.type === BUN ? (prev += curr.price * 2) : (prev += curr.price);
      return prev;
    }, 0);

    dispatch({ type: SET_TOTALPRICE, total });
  }, [constructor, dispatch]);

  const orderList = React.useMemo(() => {
    return constructor.map(item => item._id);
  }, [constructor]);

  const inOrder = constructor.reduce(
    (acceptor, curr) => {
      curr.type === BUN ? acceptor[BUN].push(curr) : acceptor[FILLING].push(curr);
      return acceptor;
    },
    { [BUN]: [], [FILLING]: [] }
  );
  const includesBun = !!inOrder[BUN].length;

  const incluedesFilling = !!inOrder[FILLING].length;

  const canOrder = includesBun && incluedesFilling;

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>
        {includesBun ? <ConstructorRow isBun={true} type="top" data={inOrder[BUN][0]} /> : null}
        {incluedesFilling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {inOrder[FILLING].map(item => (
              <ConstructorRow key={item.tempId} data={item} />
            ))}
          </ul>
        ) : null}
        {includesBun ? <ConstructorRow isBun={true} type="bottom" data={inOrder[BUN][0]} /> : null}
      </div>
      <Ordering isDisabled={!canOrder} orderList={orderList} totalPrice={totalPrice} />
    </section>
  );
}
