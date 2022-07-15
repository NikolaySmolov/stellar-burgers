import React from 'react';
import styles from './burger-constructor.module.css';
import ConstructorRow from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';
import { BUN } from '../../utils/constants';
import { BurgerContext } from '../../services/burger-context';

export default function BurgerConstructor() {
  const { burgerContext } = React.useContext(BurgerContext);

  const [totalPrice, setTotalPrice] = React.useState(0);

  // React.useEffect(() => {
  //   const total = constructorState.reduce(
  //     (prev, curr) => (curr.type === BUN ? (prev += curr.price * 2) : (prev += curr.price)),
  //     0
  //   );

  //   setTotalPrice(total);
  // }, [constructorState]);

  const rowKeyRef = React.useRef(0);

  const bunProps = React.useMemo(() => {
    return burgerContext.find((item) => item.type === BUN && item.count > 0);
  }, [burgerContext]);

  const includesFilling = React.useMemo(() => {
    const result = burgerContext.filter((item) => item.type !== BUN && item.count > 0);
    debugger;
    return result;
  }, [burgerContext]);

  const content = React.useMemo(() => {
    return (
      <>
        {bunProps ? <ConstructorRow isBun={true} type="top" data={bunProps} /> : null}
        {includesFilling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {includesFilling.map((filling) => (
              <ConstructorRow key={rowKeyRef.current++} data={filling} />
            ))}
          </ul>
        ) : null}
        {bunProps ? <ConstructorRow isBun={true} type="bottom" data={bunProps} /> : null}
      </>
    );
  }, [bunProps, includesFilling]);

  const ordering = React.useMemo(() => {
    const disabled = () => {
      if (!bunProps) return false;
      return bunProps && includesFilling.length > 1 ? false : true;
    };

    return <Ordering isDisabled={disabled()} inOrder={[1, 3, 5, 5]} totalPrice={totalPrice} />;
  }, [totalPrice, bunProps, includesFilling]);

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>{content}</div>
      {ordering}
    </section>
  );
}
