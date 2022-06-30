import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/constants';
import styles from './burger-constructor.module.css';
import ConstructorRow from '../constructor-row/constructor-row';
import Ordering from '../ordering/ordering';

export default function BurgerConstructor({cart}) {

  const [totalPrice, setTotalPrice] = React.useState(null);

  React.useEffect(() => {
    const sum = cart.reduce((prev, item) => {
      return prev + item.price;
    }, 0);

    setTotalPrice(sum);

  },[cart])

  return (
    <section className={styles.constructor}>
      <div className={styles.elements}>
        <ConstructorRow isBun={true} type='top' data={cart.find(ing => ing.type === 'bun')} />
        <ul className={`${styles.fills} custom-scroll`}>
          {cart.map((ing) => {
            if(ing.type !== 'bun') {
              return (<ConstructorRow key={ing._id} data={ing} />);
            }
            return null;
          })}
        </ul>
        <ConstructorRow isBun={true} type='bottom' data={cart.find(ing => ing.type === 'bun')} />
      </div>
      <Ordering total={totalPrice} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}