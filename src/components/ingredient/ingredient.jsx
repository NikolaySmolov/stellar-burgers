import React from 'react';
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/constants';

export default function Ingredient(props) {
  const [counterState, setCounter] = React.useState(null);

  const handleShowDetails = () => {
    props.handleShowDetails(props);
  };

  return (
    <article className={styles.card} onClick={handleShowDetails}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className={`${styles.price__text} text text_type_digits-default mr-2`}>
          {' '}
          {props.price}{' '}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}> {props.name} </p>
      {counterState && (
        <div className={styles.counter}>
          <Counter count={counterState} size="default" />
        </div>
      )}
    </article>
  );
}

Ingredient.propTypes = ingredientPropTypes.isRequired;
