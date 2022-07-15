import React from 'react';
import styles from './burger-constructor.module.css';
import ConstructorRow from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';
import { BUN } from '../../utils/constants';
import { BurgerContext } from '../../services/burger-context';
import { constructorReducer, constructorInitialState, findBun } from './utils';

export default function BurgerConstructor() {
  const ingredients = React.useContext(BurgerContext);

  const [constructorState, constructorDispatcher] = React.useReducer(
    constructorReducer,
    constructorInitialState
  );

  const [totalPrice, setTotalPrice] = React.useState(0);

  //for tests
  React.useEffect(() => {
    const testInitArr = [];

    for (let i = 0, ing; i < 5; testInitArr.push(ing), i++) {
      !testInitArr.some(findBun) ? (ing = ingredients.find(findBun)) : (ing = ingredients[i]);
    }

    constructorDispatcher({
      type: 'testInit',
      payload: testInitArr,
    });
  }, [ingredients]);

  React.useEffect(() => {
    const total = constructorState.reduce(
      (prev, curr) => (curr.type === BUN ? (prev += curr.price * 2) : (prev += curr.price)),
      0
    );

    setTotalPrice(total);
  }, [constructorState]);

  const rowKeyRef = React.useRef(0);

  const bunProps = React.useMemo(() => {
    return constructorState.find(findBun);
  }, [constructorState]);

  const includesFilling = React.useMemo(() => {
    return constructorState.some(ing => ing.type !== BUN);
  }, [constructorState]);

  const content = React.useMemo(() => {
    return (
      <>
        {bunProps ? <ConstructorRow isBun={true} type="top" data={bunProps} /> : null}
        {includesFilling ? (
          <ul className={`${styles.fills} custom-scroll`}>
            {constructorState.map(filling =>
              filling.type !== BUN ? (
                <ConstructorRow key={rowKeyRef.current++} data={filling} />
              ) : null
            )}
          </ul>
        ) : null}
        {bunProps ? <ConstructorRow isBun={true} type="bottom" data={bunProps} /> : null}
      </>
    );
  }, [constructorState, bunProps, includesFilling]);

  const ordering = React.useMemo(() => {
    const disabled = () => {
      return bunProps && includesFilling ? false : true;
    };

    const ingIdList = () => {
      return constructorState.length > 0 ? constructorState.map(ing => ing._id) : [];
    };

    return <Ordering isDisabled={disabled()} inOrder={ingIdList()} totalPrice={totalPrice} />;
  }, [constructorState, totalPrice, bunProps, includesFilling]);

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>{content}</div>
      {ordering}
    </section>
  );
}
